// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "";
const WA_TOKEN = process.env.WHATSAPP_TOKEN || "";
const WA_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || "";
const WA_API_VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const BOOKING_WEBAPP_URL = process.env.BOOKING_WEBAPP_URL || "";

const FALLBACK_REPLY =
  "Al momento non riesco a rispondere dal bot. Puoi riprovare tra poco.";

// Stato di prenotazione per ogni numero WhatsApp (solo in memoria, demo)
type BookingState = {
  name?: string;
  service?: string;
  date?: string; // YYYY-MM-DD
  time?: string; // HH:MM
  phone?: string;
};

const bookingSessions = new Map<string, BookingState>();

// ====================== VERIFICA WEBHOOK (GET) ======================

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("[WA] Webhook verificato con successo");
    return new NextResponse(challenge ?? "", { status: 200 });
  }

  console.warn("[WA] Verifica webhook fallita");
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// ====================== GESTIONE MESSAGGI (POST) ======================

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    console.error("[WA] Body non valido:", err);
    return NextResponse.json({ status: "invalid_body" }, { status: 200 });
  }

  // Log leggero
  console.log("[WA] Payload in ingresso:", JSON.stringify(body).slice(0, 2000));

  const entry = body?.entry?.[0];
  const change = entry?.changes?.[0];
  const value = change?.value;
  const messages = value?.messages as any[] | undefined;

  if (!messages || messages.length === 0) {
    console.log("[WA] Nessun messaggio nel payload.");
    return NextResponse.json({ status: "no_message" }, { status: 200 });
  }

  // Gestisco tutti i messaggi ricevuti
  for (const msg of messages) {
    const from = msg.from as string | undefined;
    if (!from) continue;

    if (msg.type !== "text") {
      await sendWhatsAppText(
        from,
        "Per ora posso gestire solo messaggi di testo 😊"
      );
      continue;
    }

    const text: string = msg.text?.body?.toString().trim() ?? "";
    if (!text) {
      await sendWhatsAppText(
        from,
        "Non ho ricevuto nessun testo nel messaggio. Riprova scrivendo cosa ti serve 🙂"
      );
      continue;
    }

    const reply = await handleIncomingText(from, text);
    await sendWhatsAppText(from, reply);
  }

  return NextResponse.json({ status: "ok" }, { status: 200 });
}

// ====================== LOGICA PRINCIPALE ======================

async function handleIncomingText(
  from: string,
  text: string
): Promise<string> {
  if (!OPENAI_API_KEY) {
    console.error("[WA] OPENAI_API_KEY mancante");
    return FALLBACK_REPLY;
  }

  const previousState: BookingState = bookingSessions.get(from) || {};
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  try {
    const plannerResult = await callBookingPlanner(previousState, text, today);

    const mergedState: BookingState = {
      ...previousState,
      ...(plannerResult.booking_state || {}),
    };

    // Se manca il telefono, uso quello di WhatsApp
    if (!mergedState.phone) {
      mergedState.phone = from;
    }

    bookingSessions.set(from, mergedState);

    // Se il planner dice che possiamo finalizzare e abbiamo tutti i dati, salvo la prenotazione
    if (
      plannerResult.should_finalize_booking &&
      mergedState.name &&
      mergedState.service &&
      mergedState.date &&
      mergedState.time &&
      mergedState.phone
    ) {
      const bookingOk = await createBookingViaAppsScript(mergedState);

      if (bookingOk) {
        // Pulisco la sessione perché abbiamo finito
        bookingSessions.delete(from);

        const niceDate = formatItalianDate(mergedState.date);
        return `Ho registrato la tua prenotazione per ${mergedState.service} il ${niceDate} alle ${mergedState.time}. Ti contatteremo al numero che hai fornito se necessario. ✂️`;
      } else {
        return (
          plannerResult.reply ||
          "Ho capito la tua richiesta, ma non sono riuscito a registrare la prenotazione nel gestionale. Il barbiere ti contatterà per confermarla."
        );
      }
    }

    // Altrimenti mando la risposta testuale del planner (domande, conferme, ecc.)
    return plannerResult.reply || FALLBACK_REPLY;
  } catch (err) {
    console.error("[WA] Errore in handleIncomingText:", err);
    return FALLBACK_REPLY;
  }
}

type PlannerResponse = {
  reply?: string;
  booking_state?: BookingState;
  should_finalize_booking?: boolean;
};

async function callBookingPlanner(
  previous: BookingState,
  message: string,
  today: string
): Promise<PlannerResponse> {
  const systemPrompt = `
Sei l'assistente prenotazioni di un barber shop su WhatsApp.

Il tuo compito è:
- capire se il messaggio parla di prenotazioni
- aggiornare i dati di prenotazione del cliente
- decidere se la prenotazione è completa e si può confermare
- rispondere SEMPRE in italiano, in modo chiaro e semplice

I DATI DI PRENOTAZIONE che gestisci sono:
- name: nome del cliente
- service: servizio (es. "taglio uomo", "barba", "taglio + barba")
- date: data nel formato "YYYY-MM-DD"
- time: orario nel formato "HH:MM" (24 ore, es. 16:30)
- phone: numero di telefono (se l'utente non lo scrive puoi anche usare quello di WhatsApp)

Oggi è ${today}. Se l'utente usa parole tipo "domani", "dopodomani", "lunedì prossimo", cerca di trasformarle in una data "YYYY-MM-DD".
Se non sei sicuro della data o dell'orario, lascia il campo vuoto (null) e chiedi all'utente.

DEVI RESTITUIRE SOLO JSON con questa struttura:

{
  "reply": "testo della risposta da mandare al cliente",
  "booking_state": {
    "name": "... oppure null",
    "service": "... oppure null",
    "date": "YYYY-MM-DD oppure null",
    "time": "HH:MM oppure null",
    "phone": "... oppure null"
  },
  "should_finalize_booking": true oppure false
}

Linee guida:

- Se nel messaggio l'utente ti chiede chiaramente di prenotare (parole tipo "prenotare", "appuntamento", "mi segni", "mi prenoti"), imposta i campi della prenotazione che riesci a capire.
- Se mancano solo 1 o 2 dati (es. il servizio o l'orario), chiedili in modo diretto.
- Se l'utente ti dà tutti i dati (nome, servizio, data, ora, telefono o numero WhatsApp), imposta "should_finalize_booking": true.
- Se i dati sono incompleti, imposta "should_finalize_booking": false e fai domande mirate solo su ciò che manca.
- Per domande generiche (orari, servizi, prezzi) rispondi normalmente e lascia "should_finalize_booking": false.
`.trim();

  const userContent = `
STATO_PRECEDENTE (JSON):
${JSON.stringify(previous)}

MESSAGGIO_UTENTE:
"${message}"
`.trim();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.2,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("[WA-PLANNER] Errore OpenAI:", res.status, data);
    return { reply: FALLBACK_REPLY, booking_state: previous };
  }

  let parsed: any;
  try {
    const content = data?.choices?.[0]?.message?.content || "{}";
    parsed = JSON.parse(content);
  } catch (err) {
    console.error("[WA-PLANNER] Errore nel parse JSON:", err);
    return { reply: FALLBACK_REPLY, booking_state: previous };
  }

  const booking_state: BookingState = {
    name: sanitizeString(parsed?.booking_state?.name),
    service: sanitizeString(parsed?.booking_state?.service),
    date: sanitizeString(parsed?.booking_state?.date),
    time: sanitizeString(parsed?.booking_state?.time),
    phone: sanitizeString(parsed?.booking_state?.phone),
  };

  const reply =
    typeof parsed?.reply === "string" && parsed.reply.trim()
      ? parsed.reply.trim()
      : undefined;

  const should_finalize_booking = Boolean(parsed?.should_finalize_booking);

  return {
    reply,
    booking_state,
    should_finalize_booking,
  };
}

function sanitizeString(value: any): string | undefined {
  if (!value) return undefined;
  const s = String(value).trim();
  return s.length ? s : undefined;
}

// ====================== CHIAMATA A GOOGLE APPS SCRIPT ======================

async function createBookingViaAppsScript(
  booking: BookingState
): Promise<boolean> {
  if (!BOOKING_WEBAPP_URL) {
    console.error("[WA-BOOKING] BOOKING_WEBAPP_URL mancante");
    return false;
  }

  try {
    const payload = {
      action: "create_booking",
      name: booking.name,
      phone: booking.phone,
      service: booking.service,
      date: booking.date,
      time: booking.time,
      notes: "Prenotazione da WhatsApp",
    };

    const res = await fetch(BOOKING_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
      console.error(
        "[WA-BOOKING] Errore Apps Script:",
        res.status,
        data || "no body"
      );
      return false;
    }

    return true;
  } catch (err) {
    console.error("[WA-BOOKING] Errore chiamando Apps Script:", err);
    return false;
  }
}

// ====================== INVIO MESSAGGI WHATSAPP ======================

async function sendWhatsAppText(to: string, text: string) {
  if (!WA_TOKEN || !WA_PHONE_ID) {
    console.error("[WA] Token o phone_id mancanti");
    return;
  }

  const url = `https://graph.facebook.com/${WA_API_VERSION}/${WA_PHONE_ID}/messages`;

  const body = {
    messaging_product: "whatsapp",
    to,
    text: { body: text },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WA_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("[WA] Errore nell'invio del messaggio:", res.status, data);
    } else {
      console.log("[WA] Messaggio WhatsApp inviato con successo:", data?.messages?.[0]?.id);
    }
  } catch (err) {
    console.error("[WA] Errore di rete nell'invio del messaggio:", err);
  }
}

// ====================== UTILITY FORMATO DATA ======================

function formatItalianDate(dateStr: string): string {
  // dateStr: "YYYY-MM-DD"
  const [year, month, day] = dateStr.split("-").map((p) => parseInt(p, 10));
  if (!year || !month || !day) return dateStr;

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
  if (!nomeMese) return dateStr;

  return `${day} ${nomeMese} ${year}`;
}