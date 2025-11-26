// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const FALLBACK_REPLY =
  "Al momento il bot non riesce a gestire la richiesta. Riprova tra qualche minuto oppure contatta direttamente il barbiere.";

// ---------- WEBHOOK VERIFY (GET) ----------
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN) {
    console.log("[WA] Webhook verificato correttamente");
    return new NextResponse(challenge || "", { status: 200 });
  }

  console.warn("[WA] Verifica webhook fallita", { mode, token });
  return new NextResponse("Verifica fallita", { status: 403 });
}

// ---------- HELPERS ----------
async function sendWhatsAppMessage(to: string, body: string) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.error(
      "[WA] Impossibile inviare: WHATSAPP_TOKEN o WHATSAPP_PHONE_NUMBER_ID mancanti"
    );
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
        "Content-Type": "application/json",
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error(
        "[WA] Errore nell'invio del messaggio:",
        res.status,
        JSON.stringify(data)
      );
    } else {
      console.log("[WA] Messaggio WhatsApp inviato con successo:", data);
    }
  } catch (err) {
    console.error("[WA] Errore di rete inviando il messaggio:", err);
  }
}

function cleanJsonFromMarkdown(raw: string): string {
  let text = raw.trim();
  if (text.startsWith("```")) {
    const firstNewline = text.indexOf("\n");
    const lastFence = text.lastIndexOf("```");
    if (firstNewline !== -1 && lastFence !== -1) {
      text = text.slice(firstNewline + 1, lastFence).trim();
    }
  }
  return text;
}

// ---------- POST: MESSAGGI IN ARRIVO ----------
export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    console.error("[WA] Body JSON non valido:", err);
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Estraggo il messaggio WhatsApp
  const entry = body?.entry?.[0];
  const changes = entry?.changes?.[0];
  const value = changes?.value;
  const messages = value?.messages;

  const message = Array.isArray(messages) ? messages[0] : null;

  if (!message) {
    console.log("[WA] Nessun messaggio nel payload:", JSON.stringify(body));
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (message.type !== "text" || !message.text?.body) {
    console.log("[WA] Nessun messaggio testuale da processare", message);
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const from = message.from; // numero cliente
  const userText: string = message.text.body.trim();

  console.log("[WA] Messaggio testuale ricevuto:", { from, userText });

  if (!OPENAI_API_KEY) {
    console.error("[WA] OPENAI_API_KEY mancante");
    await sendWhatsAppMessage(from, FALLBACK_REPLY);
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // ---------- 1. Chiedo a OpenAI di capire se è prenotazione ----------
  const SYSTEM_PROMPT = `
Sei l'assistente di un barber shop che parla con i clienti su WhatsApp.

IL TUO SCOPO:

1. Se il messaggio riguarda UNA PRENOTAZIONE (es. "vorrei prenotare domani alle 15 un taglio", "mi prenoti un taglio venerdì alle 18?"):
   - prova a capire nome, servizio, data, orario, telefono e eventuali note.
   - Se TUTTI i dati per creare la prenotazione ci sono (nome + telefono + data + ora + servizio), imposta "mode": "booking".
   - Se manca qualcosa, fai domande o spiega cosa manca, ma usa "mode": "answer_only".

2. Se NON è una prenotazione (domande su prezzi, orari, servizi, ecc.) rispondi normalmente con "mode": "answer_only".

DEVI SEMPRE RESTITUIRE SOLO JSON VALIDO, SENZA TESTO AGGIUNTIVO, con questa struttura ESATTA:

{
  "mode": "booking" | "answer_only",
  "reply": "testo di risposta per l'utente, in italiano, già pronto da inviare su WhatsApp",
  "booking": {
    "name": string | null,
    "phone": string | null,
    "service": string | null,
    "date": string | null,  // formato YYYY-MM-DD
    "time": string | null,  // formato HH:MM a 24 ore
    "notes": string | null
  }
}

REGOLE IMPORTANTI:
- Rispondi sempre in italiano, tono amichevole e professionale.
- Se riconosci che l'utente sta prenotando e HAI tutti i dati (nome + telefono + data + ora + servizio) usa "mode": "booking".
- Se il telefono non è nel messaggio, puoi lasciare "phone": null (il sistema userà il suo numero WhatsApp).
- Per parole come "domani", "dopodomani", "venerdì prossimo" scegli una data precisa nel formato YYYY-MM-DD.
- Nel campo "reply" spiega sempre cosa hai fatto o cosa ti serve (es.
  - "Ho registrato la tua prenotazione..."
  - oppure "Mi manca solo l'orario, a che ora preferisci?").

NON AGGIUNGERE TESTO FUORI DAL JSON.
`;

  let aiJson: any = null;
  let replyText: string = FALLBACK_REPLY;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content:
              `Messaggio utente: """${userText}"""\nNumero WhatsApp: ${from}`,
          },
        ],
        temperature: 0.2,
      }),
    });

    const openaiData = await openaiRes.json().catch(() => null);

    if (!openaiRes.ok) {
      console.error(
        "[WA] Errore OpenAI:",
        openaiRes.status,
        JSON.stringify(openaiData)
      );
    } else {
      const rawContent: string =
        openaiData?.choices?.[0]?.message?.content?.toString() || "";

      const cleaned = cleanJsonFromMarkdown(rawContent);
      aiJson = JSON.parse(cleaned);
      replyText =
        aiJson?.reply?.toString().trim() || "Ho ricevuto il messaggio, grazie!";

      console.log("[WA] Risposta strutturata OpenAI:", aiJson);
    }
  } catch (err) {
    console.error("[WA] Errore chiamando OpenAI:", err);
  }

  // Se non sono riuscito a parsare il JSON → rispondo e basta.
  if (!aiJson || typeof aiJson !== "object") {
    await sendWhatsAppMessage(from, replyText);
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // ---------- 2. Se NON è una prenotazione strutturata ----------
  if (aiJson.mode !== "booking") {
    await sendWhatsAppMessage(from, replyText);
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // ---------- 3. È una prenotazione: chiamo /api/barber-booking ----------
  const booking = aiJson.booking || {};
  const name: string = booking.name || "Cliente WhatsApp";
  const phone: string = booking.phone || from;
  const service: string =
    booking.service || "Taglio / servizio non specificato";
  const date: string | null = booking.date || null;
  const time: string | null = booking.time || null;
  const notes: string = booking.notes || "";

  if (!date || !time) {
    // Manca qualcosa di fondamentale → non provo a salvare, rispondo solo.
    console.warn(
      "[WA] Booking incompleto, manca data o ora. Booking:",
      booking
    );
    await sendWhatsAppMessage(from, replyText);
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const bookingPayload = {
    action: "create_booking",
    name,
    phone,
    service,
    date,
    time,
    notes,
  };

  const bookingUrl = `${req.nextUrl.origin}/api/barber-booking`;

  try {
    const bookingRes = await fetch(bookingUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload),
    });

    const bookingData = await bookingRes.json().catch(() => null);

    if (!bookingRes.ok || !bookingData?.success) {
      console.error(
        "[WA] Errore create_booking:",
        bookingRes.status,
        JSON.stringify(bookingData)
      );
      await sendWhatsAppMessage(
        from,
        "Ho capito la tua richiesta, ma non sono riuscito a registrare la prenotazione nel gestionale. Il barbiere ti contatterà per confermarla oppure puoi chiamarlo direttamente."
      );
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    console.log("[WA] Prenotazione salvata con successo da WhatsApp:", {
      bookingPayload,
      bookingData,
    });

    const confirmText =
      replyText ||
      `Perfetto, ho registrato la tua prenotazione: ${service} il ${date} alle ${time}. Se hai bisogno di modifiche, scrivimi pure qui.`;

    await sendWhatsAppMessage(from, confirmText);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(
      "[WA] Errore di rete chiamando /api/barber-booking:",
      err
    );
    await sendWhatsAppMessage(
      from,
      "Ho capito la tua richiesta ma al momento non riesco a registrare la prenotazione. Riprova tra poco oppure contatta direttamente il barbiere."
    );
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}