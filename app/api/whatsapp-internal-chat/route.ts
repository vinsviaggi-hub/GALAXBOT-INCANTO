// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

// ====== ENV VARS (da .env.local) ======
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const INTERNAL_CHAT_URL =
  process.env.INTERNAL_CHAT_URL ||
  "http://localhost:3000/api/whatsapp-internal-chat";
const BOOKING_WEBAPP_URL = process.env.BOOKING_WEBAPP_URL;

// Settore di default per la chat interna
const DEFAULT_SECTOR = "barbiere";

// Risposta di fallback se qualcosa va storto
const FALLBACK_REPLY =
  "Al momento non riesco a rispondere dal bot. Puoi riprovare tra poco.";

// ====== STATO IN MEMORIA PER LE PRENOTAZIONI (per numero) ======

type BookingState = {
  mode: "idle" | "collecting";
  name?: string;
  service?: string;
  dateIso?: string; // yyyy-mm-dd
  time?: string; // HH:MM
};

const bookingStates = new Map<string, BookingState>();

function getBookingState(phone: string): BookingState {
  const existing = bookingStates.get(phone);
  if (existing) return existing;
  const fresh: BookingState = { mode: "idle" };
  bookingStates.set(phone, fresh);
  return fresh;
}

function resetBookingState(phone: string) {
  bookingStates.set(phone, { mode: "idle" });
}

// ====== UTILI WHATSAPP ======

async function sendWhatsAppText(opts: { to: string; text: string }) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.error(
      "[WA] Manca WHATSAPP_TOKEN o WHATSAPP_PHONE_NUMBER_ID nelle variabili ambiente"
    );
    return;
  }

  const url = `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: opts.to,
    type: "text",
    text: {
      body: opts.text,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    console.error("[WA] Errore nell'invio del messaggio:", res.status, data);
  } else {
    console.log("[WA] Messaggio WhatsApp inviato con successo");
  }
}

function extractTextMessage(body: any): {
  from: string | null;
  name: string | null;
  text: string | null;
} {
  try {
    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const messages = value?.messages;
    const message = messages?.[0];

    if (!message) return { from: null, name: null, text: null };
    if (message.type !== "text")
      return { from: message.from ?? null, name: null, text: null };

    const from = message.from ?? null;
    const text = message.text?.body ?? null;

    const contactName =
      value?.contacts?.[0]?.profile?.name ??
      value?.contacts?.[0]?.profile?.first_name ??
      null;

    return { from, name: contactName, text };
  } catch (err) {
    console.error("[WA] Errore estraendo il messaggio:", err);
    return { from: null, name: null, text: null };
  }
}

// ====== CHAT INTERNA (OPENAI via /api/whatsapp-internal-chat) ======

async function callInternalChat(input: string, sector: string) {
  try {
    const res = await fetch(INTERNAL_CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, sector }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.reply) {
      console.error(
        "[WA-INTERNAL] Errore chiamando la chat interna:",
        res.status,
        data
      );
      return FALLBACK_REPLY;
    }

    return String(data.reply);
  } catch (err) {
    console.error("[WA-INTERNAL] Errore chiamando la chat interna:", err);
    return FALLBACK_REPLY;
  }
}

// ====== LOGICA PRENOTAZIONI ======

function looksLikeBookingIntent(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("prenot") ||
    lower.includes("appuntamento") ||
    lower.includes("taglio") ||
    lower.includes("barba")
  );
}

function parseService(text: string): string | undefined {
  const t = text.toLowerCase();
  if (t.includes("taglio + barba") || t.includes("taglio e barba"))
    return "Taglio + barba";
  if (t.includes("taglio uomo") || t.includes("taglio")) return "Taglio uomo";
  if (t.includes("barba")) return "Barba";
  if (t.includes("colore") || t.includes("tinta")) return "Colorazione";
  return undefined;
}

function parseTime(text: string): string | undefined {
  const match = text.match(
    /\b(alle|per le|per le ore|ore)?\s*(\d{1,2})(?:[:\.](\d{2}))?/i
  );
  if (!match) return undefined;
  let hour = parseInt(match[2], 10);
  let minute = match[3] ? parseInt(match[3], 10) : 0;
  if (isNaN(hour) || hour < 7 || hour > 21) return undefined;
  if (isNaN(minute) || minute < 0 || minute > 59) minute = 0;
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
}

// converte "28/12/2025", "28-12-25", "28 12 25", ecc. + parole tipo "domani"
function parseDate(text: string): string | undefined {
  const lower = text.toLowerCase().trim();
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (lower.includes("oggi")) {
    return formatDateIso(now);
  }

  if (lower.includes("domani")) {
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    return formatDateIso(d);
  }

  const m = lower.match(
    /(\d{1,2})[\/\-\.\s](\d{1,2})[\/\-\.\s](\d{2,4})/
  );
  if (!m) return undefined;

  let day = parseInt(m[1], 10);
  let month = parseInt(m[2], 10);
  let year = parseInt(m[3], 10);

  if (year < 100) year += 2000;
  if (month < 1 || month > 12 || day < 1 || day > 31) return undefined;

  const dt = new Date(year, month - 1, day);
  if (isNaN(dt.getTime())) return undefined;

  return formatDateIso(dt);
}

function formatDateIso(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  const dd = d.getDate().toString().padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatItalianDate(dateIso: string): string {
  const [year, monthStr, dayStr] = dateIso.split("-");
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);

  const mesi = [
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre",
  ];
  const nomeMese = mesi[month - 1] || "";
  if (!nomeMese) return dateIso;
  return `${day} ${nomeMese} ${year}`;
}

async function createBookingOnSheet(opts: {
  name: string;
  phone: string;
  service: string;
  dateIso: string;
  time: string;
}) {
  if (!BOOKING_WEBAPP_URL) {
    console.error(
      "[BOOKING] BOOKING_WEBAPP_URL mancante: non posso salvare sul foglio"
    );
    return;
  }

  try {
    const payload = {
      action: "create_booking",
      name: opts.name,
      phone: opts.phone,
      service: opts.service,
      date: opts.dateIso,
      time: opts.time,
      notes: "",
    };

    const res = await fetch(BOOKING_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
      console.error(
        "[BOOKING] Errore dal web app prenotazioni:",
        res.status,
        data
      );
    } else {
      console.log("[BOOKING] Prenotazione salvata correttamente", data);
    }
  } catch (err) {
    console.error("[BOOKING] Errore di rete verso il server prenotazioni:", err);
  }
}

async function handleBookingFlow(params: {
  from: string;
  name: string | null;
  text: string;
}): Promise<string> {
  const { from, name, text } = params;
  const state = getBookingState(from);

  // aggiorno sempre i dati possibili dal messaggio attuale
  const service = parseService(text) || state.service;
  const dateIso = parseDate(text) || state.dateIso;
  const time = parseTime(text) || state.time;

  state.mode = "collecting";
  state.service = service;
  state.dateIso = dateIso;
  state.time = time;
  state.name = state.name || name || "Cliente";

  // manca ancora qualcosa? faccio le domande
  if (!state.service) {
    return `Ciao${
      state.name ? ` ${state.name}` : ""
    }! Per prenotare un appuntamento, ho bisogno di sapere quale servizio desideri (es. taglio uomo, barba, taglio + barba) e quando vorresti venire.`;
  }

  if (!state.dateIso) {
    return `Ciao${
      state.name ? ` ${state.name}` : ""
    }! Ho capito che vuoi prenotare *${state.service}*. Per quale data vorresti l'appuntamento? Puoi scrivere ad esempio "28/12/2025" oppure "domani".`;
  }

  if (!state.time) {
    const dataIt = formatItalianDate(state.dateIso);
    return `Ciao${
      state.name ? ` ${state.name}` : ""
    }! Ho preso nota di *${state.service}* per il ${dataIt}. A che ora preferisci venire?`;
  }

  // qui abbiamo tutto: salvo la prenotazione
  await createBookingOnSheet({
    name: state.name || "Cliente",
    phone: from,
    service: state.service,
    dateIso: state.dateIso,
    time: state.time,
  });

  const dataIt = formatItalianDate(state.dateIso);

  const conferma = `Ho registrato la tua prenotazione per *${state.service}* il ${dataIt} alle ${state.time}. Ti contatteremo al numero fornito se necessario. ✂️`;

  // reset stato per questo numero
  resetBookingState(from);

  return conferma;
}

// ====== HANDLER GET (VERIFICA META) ======

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN && challenge) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

// ====== HANDLER POST (WEBHOOK WHATSAPP) ======

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    console.error("[WA] Nessun payload JSON nel webhook");
    return NextResponse.json({ status: "no_body" }, { status: 200 });
  }

  const { from, name, text } = extractTextMessage(body);

  if (!from || !text) {
    console.log("[WA] Nessun messaggio testuale da processare", body);
    return NextResponse.json(
      { status: "no_text_message" },
      { status: 200 }
    );
  }

  const messageText = text.trim();
  console.log("[WA] Messaggio in arrivo da", from, ":", messageText);

  // ====== 1) HANDLING SPECIALE "GRAZIE / OK" ======
  const thanksOnly = messageText.toLowerCase();

  const isThanks =
    thanksOnly === "grazie" ||
    thanksOnly === "ok grazie" ||
    thanksOnly === "grazie mille" ||
    thanksOnly === "ok perfetto" ||
    thanksOnly === "perfetto" ||
    thanksOnly === "va bene" ||
    thanksOnly === "tutto ok" ||
    thanksOnly === "a posto così" ||
    thanksOnly === "a posto cosi";

  if (isThanks) {
    // chiudo eventuale stato di prenotazione e rispondo in modo neutro
    resetBookingState(from);

    await sendWhatsAppText({
      to: from,
      text: "Prego, a presto! 👋",
    });

    return NextResponse.json(
      { status: "thanks_reply_sent" },
      { status: 200 }
    );
  }

  // ====== 2) SE C'È UNA PRENOTAZIONE IN CORSO O INTENTO DI PRENOTARE ======
  const currentState = getBookingState(from);
  const alreadyInBooking = currentState.mode === "collecting";
  const newBookingIntent = looksLikeBookingIntent(messageText);

  if (alreadyInBooking || newBookingIntent) {
    const reply = await handleBookingFlow({
      from,
      name,
      text: messageText,
    });

    await sendWhatsAppText({ to: from, text: reply });

    return NextResponse.json(
      { status: "booking_flow_handled" },
      { status: 200 }
    );
  }

  // ====== 3) ALTRIMENTI PASSO ALLA CHAT INTERNA (INFORMAZIONI GENERALI) ======

  const reply = await callInternalChat(messageText, DEFAULT_SECTOR);

  await sendWhatsAppText({
    to: from,
    text: reply,
  });

  return NextResponse.json(
    { status: "ok" },
    { status: 200 }
  );
}