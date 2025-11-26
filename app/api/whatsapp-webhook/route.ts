// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// URL della Web App di Google Apps Script per le prenotazioni
const BOOKING_WEBAPP_URL = process.env.BOOKING_WEBAPP_URL;

// ========== VERIFICA WEBHOOK (GET) ==========
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN) {
    console.log("[WA] Webhook verificato correttamente.");
    return new Response(challenge ?? "", { status: 200 });
  }

  console.warn("[WA] Tentativo di verifica non valido.");
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// ========== GESTIONE MESSAGGI (POST) ==========
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("[WA] Webhook body:", JSON.stringify(body, null, 2));

  const entries = body.entry ?? [];

  if (!entries.length) {
    console.log("[WA] Nessuna entry nel webhook.");
    return NextResponse.json({ status: "no_entries" });
  }

  for (const entry of entries) {
    const changes = entry.changes ?? [];
    for (const change of changes) {
      const value = change.value;
      const messages = value.messages ?? [];

      if (!messages.length) {
        console.log("[WA] Nessun messaggio nel change.");
        continue;
      }

      for (const message of messages) {
        const from = message.from;
        const msgText: string = message.text?.body ?? "";

        if (!msgText) {
          console.log("[WA] Nessun messaggio testuale da processare");
          continue;
        }

        console.log("[WA] Messaggio ricevuto da", from, ":", msgText);

        // 1) Se il messaggio è una PRENOTAZIONE strutturata, la salviamo sul foglio
        if (msgText.toLowerCase().trim().startsWith("prenotazione:")) {
          await handleWhatsappBooking(msgText, from);
          // In questo caso NON chiamo l'AI: la risposta la genero io in modo “statico”
          continue;
        }

        // 2) Altrimenti passo tutto alla chat interna (AI)
        const reply = await callInternalChat({
          input: msgText,
          sector: "barbiere",
        });

        if (reply) {
          await sendWhatsappMessage(from, reply);
        }
      }
    }
  }

  return NextResponse.json({ status: "ok" });
}

// ========== FUNZIONE: GESTIONE PRENOTAZIONE DA WHATSAPP ==========
type ParsedBooking = {
  name: string;
  service: string;
  dateIso: string; // yyyy-mm-dd
  dateHuman: string; // per il messaggio di risposta
  time: string; // HH:MM
  phone: string;
};

async function handleWhatsappBooking(rawText: string, to: string) {
  try {
    if (!BOOKING_WEBAPP_URL) {
      console.error("[WA-BOOKING] BOOKING_WEBAPP_URL non configurato.");
      await sendWhatsappMessage(
        to,
        "Al momento non riesco a registrare la prenotazione nel gestionale. Riprova più tardi o contattami via telefono, per favore."
      );
      return;
    }

    const parsed = parseBookingFromText(rawText);
    if (!parsed) {
      await sendWhatsappMessage(
        to,
        "Per registrare la prenotazione scrivi ad esempio:\n\n" +
          "Prenotazione: Mario Rossi, Taglio uomo, 28/11/2025, 10:00, 3331234567"
      );
      return;
    }

    console.log("[WA-BOOKING] Prenotazione parsata:", parsed);

    // Chiamata diretta alla Web App di Google Apps Script
    const res = await fetch(BOOKING_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create_booking",
        name: parsed.name,
        phone: parsed.phone,
        service: parsed.service,
        date: parsed.dateIso, // Apps Script si aspetta yyyy-mm-dd
        time: parsed.time,
        notes: "Prenotazione ricevuta da WhatsApp bot",
      }),
    });

    const data = await res.json().catch(() => null);
    console.log("[WA-BOOKING] Risposta Apps Script:", data);

    if (!res.ok || !data?.success) {
      const errMsg =
        data?.error || "Errore sconosciuto registrando la prenotazione.";
      console.error("[WA-BOOKING] Errore:", errMsg);

      await sendWhatsappMessage(
        to,
        "Ho provato a registrare la prenotazione ma c'è stato un problema tecnico. " +
          "Per sicurezza, contattami direttamente o riprova più tardi."
      );
      return;
    }

    // ✅ Prenotazione salvata: risposta di conferma “umana”
    const confirmation =
      `Ciao ${parsed.name}! Ti confermo la tua prenotazione per ` +
      `${parsed.service} il ${parsed.dateHuman} alle ${parsed.time}. ` +
      `Se hai bisogno di ulteriori informazioni o modifiche, non esitare a contattarmi! 😊✂️`;

    await sendWhatsappMessage(to, confirmation);
  } catch (err) {
    console.error("[WA-BOOKING] Errore generale:", err);
    await sendWhatsappMessage(
      to,
      "Al momento non riesco a registrare la prenotazione. Riprova tra qualche minuto oppure contattami direttamente."
    );
  }
}

// Parsiamo stringhe tipo:
// "Prenotazione: Enzo, Taglio uomo, 28/11/2025, 10:00, 3331234567"
function parseBookingFromText(text: string): ParsedBooking | null {
  const withoutPrefix = text.replace(/prenotazione:/i, "").trim();
  const parts = withoutPrefix.split(",").map((p) => p.trim());

  if (parts.length < 5) {
    console.warn("[WA-BOOKING] Formato prenotazione non valido:", text);
    return null;
  }

  const [name, service, dateRaw, timeRaw, phone] = parts;

  const dateIso = italianDateToIso(dateRaw);
  if (!dateIso) {
    console.warn("[WA-BOOKING] Data non valida:", dateRaw);
    return null;
  }

  const time = normalizeTime(timeRaw);
  if (!time) {
    console.warn("[WA-BOOKING] Ora non valida:", timeRaw);
    return null;
  }

  const dateHuman = dateRaw.trim(); // usiamo la forma italiana originale nel messaggio

  return {
    name,
    service,
    dateIso,
    dateHuman,
    time,
    phone,
  };
}

function italianDateToIso(input: string): string | null {
  const cleaned = input.trim();
  const parts = cleaned.split(/[\/\-]/);
  if (parts.length !== 3) return null;

  const [dd, mm, yyyy] = parts;
  if (!dd || !mm || !yyyy) return null;

  const day = dd.padStart(2, "0");
  const month = mm.padStart(2, "0");
  const year = yyyy.length === 2 ? `20${yyyy}` : yyyy;

  if (!/^\d{4}$/.test(year)) return null;

  return `${year}-${month}-${day}`;
}

function normalizeTime(input: string): string | null {
  const cleaned = input.trim();
  const match = cleaned.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;

  let hour = parseInt(match[1], 10);
  const minutes = match[2];

  if (hour < 0 || hour > 23) return null;
  const hh = hour.toString().padStart(2, "0");

  return `${hh}:${minutes}`;
}

// ========== CHIAMATA ALLA CHAT INTERNA ==========
async function callInternalChat(params: { input: string; sector: string }) {
  try {
    const res = await fetch(
      `${process.env.INTERNAL_CHAT_URL || ""}/api/whatsapp-internal-chat`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      }
    );

    if (!res.ok) {
      console.error("[WA-INTERNAL] /api/whatsapp-internal-chat non ok:", res.status);
      return "Al momento non riesco a rispondere dal bot. Puoi riprovare tra poco.";
    }

    const data = await res.json();
    return data.reply || "Al momento non riesco a rispondere dal bot. Puoi riprovare tra poco.";
  } catch (err) {
    console.error("[WA-INTERNAL] Errore chiamando la chat interna:", err);
    return "Al momento non riesco a rispondere dal bot. Puoi riprovare tra poco.";
  }
}

// ========== INVIO MESSAGGIO WHATSAPP ==========
async function sendWhatsappMessage(to: string, body: string) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.error("[WA] Token o phone number id mancanti.");
    return;
  }

  const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.error("[WA] Errore nell'invio del messaggio:", res.status, data);
    } else {
      console.log("[WA] Messaggio WhatsApp inviato con successo:", data);
    }
  } catch (err) {
    console.error("[WA] Errore di rete inviando il messaggio:", err);
  }
}