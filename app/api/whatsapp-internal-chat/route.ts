// app/api/whatsapp-internal-chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  BookingState,
  getSessionForPhone,
  saveSessionForPhone,
} from "@/lib/waSessions";

const FALLBACK_REPLY =
  "Non ho capito bene. Se vuoi prenotare scrivimi servizio, giorno e orario (es. taglio domani alle 18).";

// ----------------- UTIL -----------------

function isThanks(text: string): boolean {
  const t = text.toLowerCase().trim();
  return (
    t === "grazie" ||
    t === "grazie mille" ||
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
    t.includes("barba") ||
    t.includes("colore")
  );
}

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

  // 31/12/2025 o 31-12-2025
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

  // 2025-12-31
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
  if (m1) return m1[1].trim();

  const re2 = /sono\s+([a-zA-ZÀ-ÿ'\s]+)/i;
  const m2 = t.match(re2);
  if (m2) return m2[1].trim();

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

// ----------------- LOGICA PRENOTAZIONE -----------------

async function handleBookingFlow(params: {
  req: NextRequest;
  input: string;
  from: string;
  waName?: string;
  session: BookingState;
}): Promise<string> {
  const { req, input, from, waName, session } = params;
  const baseUrl = getBaseUrl(req);
  const lower = input.toLowerCase();

  // se era "completed" e l'utente torna a parlare di prenotazione, riparti pulito
  if (session.step === "completed" && hasBookingKeyword(lower)) {
    session.step = "idle";
    session.service = undefined;
    session.date = undefined;
    session.time = undefined;
    session.name = undefined;
    session.lastCompletedAt = undefined;
  }

  // se siamo fermi e c'è parola da prenotazione → inizia flusso
  if (session.step === "idle" && hasBookingKeyword(lower)) {
    session.step = "collecting";
  }

  // se ancora non siamo in collecting → chiedi in modo esplicito
  if (session.step !== "collecting") {
    return "Posso aiutarti a prenotare un appuntamento. Scrivimi per esempio: 'voglio prenotare un taglio domani alle 18'.";
  }

  // Aggiorno i dati che mancano, solo se non sono già presenti
  const newService = extractService(lower);
  if (!session.service && newService) session.service = newService;

  const newDate = extractDate(lower);
  if (!session.date && newDate) session.date = newDate;

  const newTime = extractTime(lower);
  if (!session.time && newTime) session.time = newTime;

  const newName = extractName(input, waName);
  if (!session.name && newName) session.name = newName;

  const phoneParsed = extractPhone(from, input);
  if (!session.phone && phoneParsed) session.phone = phoneParsed;

  // cosa manca?
  const missing: Array<keyof BookingState> = [];
  if (!session.service) missing.push("service");
  if (!session.date) missing.push("date");
  if (!session.time) missing.push("time");
  if (!session.name) missing.push("name");

  if (missing.length > 0) {
    await saveSessionForPhone(from, session);
    const first = missing[0];

    switch (first) {
      case "service":
        return "Perfetto! Quale servizio vuoi prenotare? (es. taglio uomo, barba, taglio + barba)";
      case "date":
        return "Ottimo 👍 Per che giorno vuoi fissare l'appuntamento? (es. domani oppure 28/12/2025)";
      case "time":
        return "Perfetto. A che ora preferisci venire? (es. 16:00 oppure alle 9)";
      case "name":
        return "Ultima cosa: come ti chiami?";
      default:
        return "Per completare la prenotazione ho bisogno ancora di qualche dettaglio su servizio, giorno e ora.";
    }
  }

  // abbiamo tutto → prova a salvare nel foglio tramite /api/bookings
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

    if (!res.ok || !data?.success) {
      // se è conflitto orario occupato
      if (data?.conflict) {
        // tengo servizio/data, svuoto l'orario così l'utente sceglie un altro
        session.time = undefined;
        await saveSessionForPhone(from, session);
        return "Per questa data e ora c'è già una prenotazione. Scegli un altro orario o un altro giorno 😉";
      }

      console.error(
        "[INTERNAL-CHAT] Errore salvataggio prenotazione:",
        res.status,
        data
      );
      session.step = "completed";
      session.lastCompletedAt = Date.now();
      await saveSessionForPhone(from, session);
      return "Ho ricevuto i tuoi dati ma c'è stato un errore nel salvataggio. Ti ricontatteremo per conferma. ✂️";
    }
  } catch (err) {
    console.error("[INTERNAL-CHAT] Errore chiamando /api/bookings:", err);
    session.step = "completed";
    session.lastCompletedAt = Date.now();
    await saveSessionForPhone(from, session);
    return "Ho ricevuto i tuoi dati ma c'è stato un errore tecnico. Ti ricontatteremo per confermare. ✂️";
  }

  const niceDate = session.date
    ? formatDateItalian(session.date)
    : "la data richiesta";
  const timeStr = session.time || "l'orario richiesto";
  const serviceStr = session.service || "il servizio richiesto";

  session.step = "completed";
  session.lastCompletedAt = Date.now();
  await saveSessionForPhone(from, session);

  return `✅ Prenotazione registrata per ${serviceStr} il ${niceDate} alle ${timeStr}. Ti contatteremo al numero fornito per conferma. Grazie ${session.name}! 💈`;
}

// ----------------- HANDLER PRINCIPALE -----------------

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const input = body?.input?.toString().trim() ?? "";
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
    console.error("[INTERNAL-CHAT] Nessun mittente (from) nel body:", body);
    return NextResponse.json(
      {
        reply:
          "C'è stato un problema nel leggere il tuo numero. Riprova più tardi.",
      },
      { status: 200 }
    );
  }

  const lower = input.toLowerCase();

  // risposta semplice a "grazie / ok"
  if (isThanks(lower)) {
    return NextResponse.json(
      {
        reply:
          "Prego! Se hai bisogno di modificare o fissare un altro appuntamento, scrivimi pure. 😊",
      },
      { status: 200 }
    );
  }

  // recupero/creo la sessione
  const session = await getSessionForPhone(from);

  const inBookingFlow =
    session.step === "collecting" || hasBookingKeyword(lower);

  if (inBookingFlow) {
    const reply = await handleBookingFlow({
      req,
      input,
      from,
      waName,
      session,
    });
    return NextResponse.json({ reply }, { status: 200 });
  }

  // qui NESSUN OpenAI: risposta statica
  const reply =
    "Sono il bot del barber shop. Posso darti informazioni su servizi, orari o aiutarti a prenotare un appuntamento. " +
    "Se vuoi prenotare scrivimi, ad esempio: 'voglio prenotare un taglio domani alle 18'.";
  return NextResponse.json({ reply }, { status: 200 });
}