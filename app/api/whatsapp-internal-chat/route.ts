// app/api/whatsapp-internal-chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  BookingState,
  getSessionForPhone,
  saveSessionForPhone,
} from "@/lib/waSessions";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const FALLBACK_REPLY =
  "Al momento il bot non è disponibile. Riprova tra qualche minuto.";

// --- utility ---

function isThanks(text: string): boolean {
  const t = text.toLowerCase();
  return (
    t === "grazie" ||
    t.includes("grazie mille") ||
    t === "ok grazie" ||
    t === "ok" ||
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

// --- parsing helper ---

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

  // 23/12/2025, 23-12-2025
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

  // 2025-12-23
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

  // 16:30 / 16.30
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

  // "alle 9", "per le 18"
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

  // recupera o crea sessione
  let session: BookingState = await getSessionForPhone(from);

  // se era una prenotazione vecchia completata, riparti pulito
  if (session.step === "completed") {
    session = { step: "idle" } as BookingState;
  }

  if (session.step === "idle") {
    session.step = "collecting";
  }

  // aggiorna solo se il campo è vuoto e il testo contiene qualcosa
  const newService = extractService(textLower);
  if (!session.service && newService) session.service = newService;

  const newDate = extractDate(textLower);
  if (!session.date && newDate) session.date = newDate;

  const newTime = extractTime(textLower);
  if (!session.time && newTime) session.time = newTime;

  const newName = extractName(input, waName);
  if (!session.name && newName) session.name = newName;

  const phoneParsed = extractPhone(from, input);
  if (!session.phone && phoneParsed) session.phone = phoneParsed;

  // controlla cosa manca
  const missing: Array<keyof BookingState> = [];
  if (!session.name) missing.push("name");
  if (!session.service) missing.push("service");
  if (!session.date) missing.push("date");
  if (!session.time) missing.push("time");

  // se mancano dati → chiedi uno per volta
  if (missing.length > 0) {
    await saveSessionForPhone(from, session);
    const first = missing[0];

    switch (first) {
      case "name":
        return "Per iniziare, come ti chiami?";
      case "service":
        return "Perfetto! Quale servizio vuoi prenotare? (es. taglio uomo, barba, taglio + barba)";
      case "date":
        return 'Ottimo 👍 Per che giorno vuoi fissare l\'appuntamento? (es. domani oppure 28/12/2025)';
      case "time":
        return "Perfetto. A che ora preferisci venire? (es. 16:00 oppure alle 9)";
      default:
        return "Per completare la prenotazione ho bisogno ancora di qualche dettaglio su nome, servizio, giorno e ora.";
    }
  }

  // se tutti i dati ci sono → salva sul foglio tramite /api/bookings
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

    // orario già occupato → chiedi un nuovo orario, ma NON buttare via gli altri dati
    if (data?.conflict) {
      session.time = null;
      await saveSessionForPhone(from, session);

      const niceDate = session.date
        ? formatDateItalian(session.date)
        : "la data scelta";

      return `Mi dispiace, ma ${niceDate} alle ${params.input
        .match(/(\d{1,2}[:\.]\d{2}|\d{1,2})/i)?.[0] ?? "l'orario indicato"
        } è già occupato. Scegli un altro orario libero per lo stesso giorno e te lo registro subito. ✂️`;
    }

    if (!res.ok || !data?.success) {
      console.error(
        "[INTERNAL-CHAT] Errore salvataggio prenotazione:",
        res.status,
        data
      );
      session.step = "completed";
      session.lastCompletedAt = Date.now();
      await saveSessionForPhone(from, session);
      return "Ho preso nota dei tuoi dati, ma non sono riuscito a registrare la prenotazione nel gestionale. Ti ricontatteremo per conferma. ✂️";
    }
  } catch (err) {
    console.error("[INTERNAL-CHAT] Errore chiamando /api/bookings:", err);
    session.step = "completed";
    session.lastCompletedAt = Date.now();
    await saveSessionForPhone(from, session);
    return "Ho preso nota dei tuoi dati, ma c'è stato un errore tecnico nel salvataggio. Ti ricontatteremo per confermare. ✂️";
  }

  // risposta finale chiara e naturale
  const niceDate = session.date
    ? formatDateItalian(session.date)
    : "la data richiesta";
  const timeStr = session.time || "l'orario richiesto";
  const serviceStr = session.service || "il servizio richiesto";
  const nameStr = session.name || "il cliente";

  session.step = "completed";
  session.lastCompletedAt = Date.now();
  await saveSessionForPhone(from, session);

  return `✅ Prenotazione registrata per ${serviceStr} il ${niceDate} alle ${timeStr}. Ti contatteremo al numero fornito per conferma. Grazie ${nameStr}! 💈`;
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

  const lower = input.toLowerCase();

  // gestione "grazie / ok" semplice
  if (isThanks(lower)) {
    return NextResponse.json(
      {
        reply:
          "Prego! Se hai bisogno di altre informazioni o vuoi modificare la prenotazione, scrivimi pure. 😊",
      },
      { status: 200 }
    );
  }

  // 🔑 NUOVO: controlla se c'è una prenotazione "in corso" per questo numero
  let currentSession: BookingState | null = null;
  if (from) {
    currentSession = await getSessionForPhone(from);
  }

  const inBookingFlow =
    !!from &&
    (hasBookingKeyword(lower) ||
      (currentSession && currentSession.step === "collecting"));

  // se è/era nel flusso prenotazione → usa SEMPRE la logica con sessione
  if (inBookingFlow) {
    const reply = await handleBookingFlow({ req, input, from, waName });
    return NextResponse.json({ reply }, { status: 200 });
  }

  // se non è una prenotazione → OpenAI per info generiche
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
- Se l'utente chiede di prenotare, invitalo a scrivere qualcosa come "voglio prenotare" e lascia che il sistema tecnico faccia le domande sui dettagli.
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