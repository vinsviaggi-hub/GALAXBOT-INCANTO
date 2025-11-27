// app/api/whatsapp-internal-chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const FALLBACK_REPLY =
  "Al momento il bot non è disponibile. Riprova tra qualche minuto.";

type BookingStep = "idle" | "collecting" | "completed";

type BookingState = {
  step: BookingStep;
  service?: string;
  date?: string; // ISO: yyyy-mm-dd
  time?: string; // HH:mm
  name?: string;
  phone?: string;
  lastCompletedAt?: number;
};

// Memoria in RAM (demo)
const sessions = new Map<string, BookingState>();

function getSession(phone: string): BookingState {
  const existing = sessions.get(phone);
  if (existing) return existing;
  const fresh: BookingState = { step: "idle" };
  sessions.set(phone, fresh);
  return fresh;
}

function saveSession(phone: string, state: BookingState) {
  sessions.set(phone, state);
}

function isThanks(text: string): boolean {
  const t = text.toLowerCase().trim();
  return (
    t === "grazie" ||
    t === "grazie mille" ||
    t === "ok" ||
    t === "ok grazie" ||
    t.includes("perfetto, grazie") ||
    t.includes("ti ringrazio")
  );
}

function hasBookingKeyword(text: string): boolean {
  const t = text.toLowerCase();
  return (
    t.includes("prenot") ||
    t.includes("appuntamento") ||
    t.includes("appuntamenti") ||
    t.includes("fissare") ||
    t.includes("taglio") ||
    t.includes("barba")
  );
}

// --- helper parsing ---

function extractPhone(from: string, text: string): string {
  const digitsInText = text.replace(/\D/g, "");
  if (digitsInText.length >= 8 && digitsInText.length <= 13) {
    return digitsInText;
  }
  return from.replace(/\D/g, "") || from;
}

function extractService(text: string): string | undefined {
  const t = text.toLowerCase();
  if (t.includes("taglio + barba") || t.includes("taglio e barba")) {
    return "taglio + barba";
  }
  if (t.includes("taglio uomo") || t.includes("taglio")) {
    return "taglio uomo";
  }
  if (t.includes("barba")) {
    return "barba";
  }
  if (t.includes("colore") || t.includes("colorazione")) {
    return "colorazione capelli";
  }
  return undefined;
}

function extractDate(text: string): string | undefined {
  const t = text.toLowerCase();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (t.includes("oggi")) {
    return today.toISOString().slice(0, 10);
  }
  if (t.includes("domani")) {
    const d = new Date(today);
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }
  if (t.includes("dopodomani")) {
    const d = new Date(today);
    d.setDate(d.getDate() + 2);
    return d.toISOString().slice(0, 10);
  }

  // dd/mm/yyyy o dd-mm-yyyy
  const re1 = /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/;
  const m1 = t.match(re1);
  if (m1) {
    let day = parseInt(m1[1], 10);
    let month = parseInt(m1[2], 10);
    let year = parseInt(m1[3], 10);
    if (year < 100) year += 2000;
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      const d = new Date(year, month - 1, day);
      return d.toISOString().slice(0, 10);
    }
  }

  // yyyy-mm-dd
  const re2 = /(\d{4})[\/\-](\d{2})[\/\-](\d{2})/;
  const m2 = t.match(re2);
  if (m2) {
    const year = parseInt(m2[1], 10);
    const month = parseInt(m2[2], 10);
    const day = parseInt(m2[3], 10);
    const d = new Date(year, month - 1, day);
    return d.toISOString().slice(0, 10);
  }

  return undefined;
}

function extractTime(text: string): string | undefined {
  const t = text.toLowerCase();

  // hh:mm
  const re1 = /(\d{1,2})[:\.](\d{2})/;
  const m1 = t.match(re1);
  if (m1) {
    const hh = parseInt(m1[1], 10);
    const mm = parseInt(m1[2], 10);
    if (hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59) {
      return `${hh.toString().padStart(2, "0")}:${mm
        .toString()
        .padStart(2, "0")}`;
    }
  }

  // "alle 16" / "per le 9"
  const re2 = /(alle|per le)\s+(\d{1,2})\b/;
  const m2 = t.match(re2);
  if (m2) {
    const hh = parseInt(m2[2], 10);
    if (hh >= 0 && hh <= 23) {
      return `${hh.toString().padStart(2, "0")}:00`;
    }
  }

  return undefined;
}

function extractName(text: string, waName?: string): string | undefined {
  const t = text.trim();

  const re1 = /mi chiamo\s+([a-zA-ZÀ-ÿ'\s]+)/i;
  const m1 = t.match(re1);
  if (m1) {
    return m1[1].trim();
  }

  const re2 = /sono\s+([a-zA-ZÀ-ÿ'\s]+)/i;
  const m2 = t.match(re2);
  if (m2) {
    return m2[1].trim();
  }

  if (t.split(" ").length === 1 && t.length <= 20) {
    return t;
  }

  if (waName && waName.length > 0) return waName;

  return undefined;
}

function formatDateItalian(dateIso: string): string {
  const [yearStr, monthStr, dayStr] = dateIso.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

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

function getBaseUrl(req: NextRequest): string {
  const host =
    req.headers.get("host") ||
    process.env.VERCEL_URL ||
    "localhost:3000";

  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");
  const protocol = isLocalhost ? "http" : "https";

  return `${protocol}://${host}`;
}

// --- logica prenotazione ---

async function handleBookingFlow(params: {
  req: NextRequest;
  input: string;
  from: string;
  waName?: string;
}): Promise<string> {
  const { req, input, from, waName } = params;
  const baseUrl = getBaseUrl(req);
  const textLower = input.toLowerCase();

  const session = getSession(from);

  if (session.step === "idle") {
    session.step = "collecting";
  }

  // aggiorno i dati con quello che trovo nel messaggio attuale
  session.service = session.service || extractService(textLower);
  session.date = session.date || extractDate(textLower);
  session.time = session.time || extractTime(textLower);
  session.name = session.name || extractName(input, waName);
  session.phone = session.phone || extractPhone(from, input);

  // cosa manca?
  const missing: Array<keyof BookingState> = [];
  if (!session.service) missing.push("service");
  if (!session.date) missing.push("date");
  if (!session.time) missing.push("time");
  if (!session.name) missing.push("name");

  if (missing.length > 0) {
    saveSession(from, session);

    const first = missing[0];
    switch (first) {
      case "service":
        return "Perfetto! Per prenotare ho bisogno di sapere che servizio desideri (es. taglio uomo, barba, taglio + barba).";
      case "date":
        return "Ottimo! Per quale giorno vuoi prenotare? Puoi scrivere qualcosa tipo 28/12/2025 oppure \"domani\".";
      case "time":
        return "Perfetto. A che ora preferisci venire? (es. 16:00 oppure alle 9).";
      case "name":
        return "Ultima cosa: come ti chiami?";
      default:
        return "Per completare la prenotazione ho bisogno ancora di qualche dettaglio. Riprova indicandomi servizio, giorno e ora.";
    }
  }

  // abbiamo tutto: salvo la prenotazione
  const previousTime = session.time || "l'orario richiesto";

  try {
    const res = await fetch(`${baseUrl}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: session.name,
        phone: session.phone,
        service: session.service,
        date: session.date,
        time: session.time,
        notes: `Prenotazione via WhatsApp (${from})`,
      }),
    });

    const data = await res.json().catch(() => null);

    // caso orario occupato (409 + conflict)
    if (res.status === 409 && data?.conflict) {
      const niceDate = session.date
        ? formatDateItalian(session.date)
        : "quel giorno";

      // chiedo solo un nuovo orario, mantengo servizio + data
      session.time = undefined;
      session.step = "collecting";
      saveSession(from, session);

      return `Per ${niceDate} alle ${previousTime} c'è già una prenotazione. Dimmi un altro orario per lo stesso giorno (es. 15:00).`;
    }

    if (!res.ok || !data?.success) {
      console.error(
        "[INTERNAL-CHAT] Errore salvataggio prenotazione:",
        res.status,
        data
      );
      session.step = "completed";
      session.lastCompletedAt = Date.now();
      saveSession(from, session);
      return "Ho preso nota dei tuoi dati, ma non sono riuscito a registrare la prenotazione nel gestionale. Il barbiere ti ricontatterà per conferma.";
    }
  } catch (err) {
    console.error("[INTERNAL-CHAT] Errore chiamando /api/bookings:", err);
    session.step = "completed";
    session.lastCompletedAt = Date.now();
    saveSession(from, session);
    return "Ho preso nota dei tuoi dati, ma c'è stato un errore tecnico nel salvataggio. Il barbiere ti ricontatterà per confermare.";
  }

  const niceDate = session.date ? formatDateItalian(session.date) : "la data richiesta";
  const timeStr = session.time || previousTime;
  const serviceStr = session.service || "il servizio richiesto";

  session.step = "completed";
  session.lastCompletedAt = Date.now();
  saveSession(from, session);

  return `Ho registrato la tua prenotazione per ${serviceStr} il ${niceDate} alle ${timeStr}. Ti contatteremo al numero che hai fornito se necessario. ✂️`;
}

// --- handler principale ---

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const input = body?.input?.toString().trim() ?? "";
  const sector = body?.sector?.toString().trim() ?? "barbiere";
  const from = body?.from?.toString().trim() ?? "";
  const waName = body?.waName?.toString().trim() ?? "";

  if (!input) {
    console.error("[INTERNAL-CHAT] Nessun input nel body:", body);
    return NextResponse.json(
      { reply: "Non ho ricevuto nessun messaggio da elaborare." },
      { status: 400 }
    );
  }

  if (!from) {
    console.error("[INTERNAL-CHAT] from (numero WhatsApp) mancante nel body.");
  }

  const lower = input.toLowerCase();

  // 1) gestione "grazie / ok" dopo una prenotazione
  if (isThanks(lower)) {
    if (from) {
      const session = getSession(from);
      if (session.step === "collecting" || session.step === "completed") {
        return NextResponse.json(
          {
            reply:
              "Prego! Se hai bisogno di altre informazioni o vuoi modificare la prenotazione, scrivimi pure. 😊",
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      {
        reply:
          "Prego! Se ti servono informazioni su servizi, prezzi o prenotazioni, sono qui. 😊",
      },
      { status: 200 }
    );
  }

  // 2) se parliamo di prenotazioni → flusso dedicato
  if (from && (hasBookingKeyword(lower) || getSession(from).step === "collecting")) {
    const reply = await handleBookingFlow({ req, input, from, waName });
    return NextResponse.json({ reply }, { status: 200 });
  }

  // 3) altrimenti, uso OpenAI per risposte generiche (servizi, orari, info)
  if (!OPENAI_API_KEY) {
    console.error("[INTERNAL-CHAT] OPENAI_API_KEY mancante");
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }

  const systemPrompt =
    sector === "barbiere"
      ? `
Sei il bot WhatsApp di un barber shop.

REGOLE:
- Rispondi SEMPRE in italiano.
- Rispondi in modo breve, chiaro e amichevole.
- Puoi parlare di servizi (taglio, barba, colore), orari, prezzi indicativi, modalità di prenotazione in generale.
- NON dire che registri direttamente le prenotazioni: questo lo gestisce il sistema.
- Se l'utente chiede di prenotare, rispondi in modo gentile ma lascia che il sistema tecnico faccia le domande sui dettagli.
`.trim()
      : `
Sei un assistente per un'attività locale.
Rispondi sempre in italiano, in modo chiaro, utile e amichevole.
`.trim();

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input },
        ],
        temperature: 0.4,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[INTERNAL-CHAT] Errore OpenAI:", res.status, data);
      return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
    }

    const reply =
      data?.choices?.[0]?.message?.content?.toString().trim() ||
      FALLBACK_REPLY;

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err) {
    console.error("[INTERNAL-CHAT] Errore chiamando OpenAI:", err);
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }
}