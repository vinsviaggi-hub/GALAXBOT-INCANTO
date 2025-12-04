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

// ---------- Utility di testo ----------

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
    t.includes("fissare") ||
    t.includes("vorrei un taglio") ||
    t.includes("voglio un taglio") ||
    t.includes("taglio") ||
    t.includes("barba")
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

  // Formato tipo 21/12/2025
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

  // Formato tipo 2025-12-21
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

  // 16:30 oppure 16.30
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
  if (m1) return m1[1].trim();

  const re2 = /sono\s+([a-zA-ZÀ-ÿ'\s]+)/i;
  const m2 = t.match(re2);
  if (m2) return m2[1].trim();

  // se manda solo il nome ("Luca")
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
    req.headers.get("host") || process.env.VERCEL_URL || "localhost:3000";

  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");
  const protocol = isLocalhost ? "http" : "https";

  return `${protocol}://${host}`;
}

// ---------- Flusso prenotazione con sessioni ----------

async function handleBookingFlow(params: {
  req: NextRequest;
  input: string;
  from: string;
  waName?: string;
  session: BookingState;
}): Promise<string> {
  const { req, input, from, waName, session } = params;
  const baseUrl = getBaseUrl(req);
  const textLower = input.toLowerCase();

  let currentSession: BookingState = { ...session };

  // Se la vecchia prenotazione è completata, ripartiamo da zero
  if (currentSession.step === "completed") {
    currentSession = { step: "idle" };
  }

  if (currentSession.step === "idle") {
    currentSession.step = "collecting";
  }

  // aggiorna i campi solo se vuoti
  const newService = extractService(textLower);
  if (!currentSession.service && newService) currentSession.service = newService;

  const newDate = extractDate(textLower);
  if (!currentSession.date && newDate) currentSession.date = newDate;

  const newTime = extractTime(textLower);
  if (!currentSession.time && newTime) currentSession.time = newTime;

  const newName = extractName(input, waName);
  if (!currentSession.name && newName) currentSession.name = newName;

  const phoneParsed = extractPhone(from, input);
  if (!currentSession.phone && phoneParsed) currentSession.phone = phoneParsed;

  // cosa manca?
  const missing: Array<keyof BookingState> = [];
  if (!currentSession.name) missing.push("name");
  if (!currentSession.service) missing.push("service");
  if (!currentSession.date) missing.push("date");
  if (!currentSession.time) missing.push("time");

  if (missing.length > 0) {
    await saveSessionForPhone(from, currentSession);
    const first = missing[0];

    switch (first) {
      case "name":
        return "Per iniziare, come ti chiami?";
      case "service":
        return "Perfetto. Che servizio ti serve? (es. taglio uomo, barba, taglio + barba)";
      case "date":
        return "Ottimo 👍 Per che giorno vuoi fissare l'appuntamento? (es. domani oppure 28/12/2025)";
      case "time":
        return "Perfetto. A che ora preferisci venire? (es. 16:00 oppure alle 9)";
      default:
        return "Per completare la prenotazione ho bisogno ancora di nome, servizio, giorno e ora.";
    }
  }

  // abbiamo tutto → salvo sul foglio tramite /api/bookings
  try {
    const res = await fetch(`${baseUrl}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: currentSession.name,
        phone: currentSession.phone,
        service: currentSession.service,
        date: currentSession.date,
        time: currentSession.time,
        notes: `Prenotazione via WhatsApp (${from})`,
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
      console.error(
        "[INTERNAL-CHAT] Errore salvataggio prenotazione:",
        res.status,
        data
      );

      const conflict = Boolean(data?.conflict);

      if (conflict) {
        // orario occupato → resto in "collecting" e faccio cambiare solo l'ora
        currentSession.time = null;
        currentSession.step = "collecting";
        await saveSessionForPhone(from, currentSession);

        return "Per quella data e ora c'è già un appuntamento. Scegli un altro orario e scrivimi solo l'ora (es. 16:30 oppure alle 9).";
      }

      currentSession.step = "completed";
      currentSession.lastCompletedAt = Date.now();
      await saveSessionForPhone(from, currentSession);

      return "Ho preso nota dei tuoi dati, ma non sono riuscito a registrare la prenotazione nel gestionale. Ti ricontatteremo per conferma. ✂️";
    }
  } catch (err) {
    console.error("[INTERNAL-CHAT] Errore chiamando /api/bookings:", err);
    currentSession.step = "completed";
    currentSession.lastCompletedAt = Date.now();
    await saveSessionForPhone(from, currentSession);
    return "Ho preso nota dei tuoi dati, ma c'è stato un errore tecnico nel salvataggio. Ti ricontatteremo per confermare. ✂️";
  }

  // risposta finale
  const niceDate = currentSession.date
    ? formatDateItalian(currentSession.date)
    : "la data richiesta";
  const timeStr = currentSession.time || "l'orario richiesto";
  const serviceStr = currentSession.service || "il servizio richiesto";
  const nameStr = currentSession.name || "";

  currentSession.step = "completed";
  currentSession.lastCompletedAt = Date.now();
  await saveSessionForPhone(from, currentSession);

  return `✅ Prenotazione registrata per ${serviceStr} il ${niceDate} alle ${timeStr}. Ti contatteremo al numero fornito per conferma. Grazie ${nameStr}! 💈`;
}

// ---------- OpenAI per le risposte generiche ----------

async function callOpenAI(systemPrompt: string, userText: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    console.error("[INTERNAL-CHAT] OPENAI_API_KEY mancante");
    return FALLBACK_REPLY;
  }

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
          { role: "user", content: userText },
        ],
        temperature: 0.4,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[INTERNAL-CHAT] Errore OpenAI:", res.status, data);
      return FALLBACK_REPLY;
    }

    const reply =
      data?.choices?.[0]?.message?.content?.toString().trim() || FALLBACK_REPLY;
    return reply;
  } catch (err) {
    console.error("[INTERNAL-CHAT] Errore chiamando OpenAI:", err);
    return FALLBACK_REPLY;
  }
}

// ---------- Handler principale ----------

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

  // Risposta veloce a "grazie", "ok", ecc.
  if (isThanks(lower)) {
    return NextResponse.json(
      {
        reply:
          "Prego! Se hai bisogno di altre informazioni o vuoi modificare la prenotazione, scrivimi pure. 😊",
      },
      { status: 200 }
    );
  }

  // Recupero sessione per capire se siamo già in un flusso di prenotazione
  const session = await getSessionForPhone(from);
  const inBookingFlow = session.step === "collecting";

  // Se il messaggio parla di prenotare OPPURE siamo già nel flusso → gestisco prenotazione
  if (from && (hasBookingKeyword(lower) || inBookingFlow)) {
    const reply = await handleBookingFlow({
      req,
      input,
      from,
      waName,
      session,
    });
    return NextResponse.json({ reply }, { status: 200 });
  }

  // Altrimenti → risposta generale con OpenAI
  const systemPrompt =
    sector === "barbiere"
      ? `
Sei il bot WhatsApp di un barber shop.

REGOLE:
- Rispondi SEMPRE in italiano.
- Rispondi in modo breve, chiaro e amichevole.
- Puoi parlare di servizi (taglio, barba, colore), orari di apertura, prezzi indicativi, promo, come funziona la prenotazione.
- Non dire mai che stai salvando tu la prenotazione: di' solo che il sistema tecnico registra i dati e il barbiere conferma.
- Se l'utente accenna a "prenotare", puoi spiegare che per prenotare servono nome, servizio, giorno e ora, ma lascia che il sistema ti faccia le domande quando serve.
`.trim()
      : `
Sei un assistente per un'attività locale.
Rispondi sempre in italiano, in modo chiaro, utile e amichevole.
`.trim();

  const reply = await callOpenAI(systemPrompt, input);
  return NextResponse.json({ reply }, { status: 200 });
}