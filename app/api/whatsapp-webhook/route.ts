import { NextRequest, NextResponse } from "next/server";

// === CONFIG WhatsApp / OpenAI ===
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION ?? "v21.0";
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const FALLBACK_REPLY =
  "Al momento non riesco a rispondere dal bot. Puoi riprovare tra poco.";

// URL dell'endpoint interno che parla con OpenAI
const INTERNAL_CHAT_URL =
  process.env.INTERNAL_CHAT_URL ||
  `${
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  }/api/whatsapp-internal-chat`;

// ========== GET: VERIFICA WEBHOOK (META) ==========
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json(
    { ok: false, message: "Verification token mismatch" },
    { status: 403 }
  );
}

// ========== FUNZIONE: CHIAMA CHAT INTERNA ==========
async function callInternalChat(input: string): Promise<string> {
  try {
    const res = await fetch(INTERNAL_CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input,
        sector: "barbiere", // per ora fisso
      }),
    });

    const data = await res.json().catch(() => ({} as any));

    if (!res.ok) {
      console.error(
        "[WA-INTERNAL] Risposta non ok:",
        res.status,
        JSON.stringify(data)
      );
      return FALLBACK_REPLY;
    }

    if (typeof data.reply === "string" && data.reply.trim().length > 0) {
      return data.reply.trim();
    }

    return FALLBACK_REPLY;
  } catch (err) {
    console.error("[WA-INTERNAL] Errore chiamando la chat interna:", err);
    return FALLBACK_REPLY;
  }
}

// ========== FUNZIONE: INVIARE MESSAGGIO WHATSAPP ==========
async function sendWhatsappMessage(to: string, body: string) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.error(
      "[WA] Token o PHONE_NUMBER_ID mancanti. Controlla le variabili d'ambiente."
    );
    return;
  }

  const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
      }),
    });

    const data = await res.json().catch(() => ({} as any));

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

// ========== POST: WEBHOOK WHATSAPP ==========
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    console.error("[WA] Payload non valido");
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }

  console.log("[WA] Webhook payload:", JSON.stringify(body, null, 2));

  const entry = body.entry?.[0];
  const changes = (entry?.changes || []) as any[];

  if (!changes.length) {
    console.log("[WA] Nessuna change nel payload");
    return NextResponse.json(
      { reply: "Nessun messaggio nel payload." },
      { status: 200 }
    );
  }

  // 🔧 FIX IMPORTANTE:
  // cerca la change con field === "messages" e con almeno 1 messaggio
  const messageChange = changes.find(
    (c) => c.field === "messages" && c.value?.messages?.length
  );

  const value = messageChange?.value;
  const waMessage = value?.messages?.[0];

  if (!waMessage) {
    console.log("[WA] Nessun messaggio testuale da processare", body);
    return NextResponse.json(
      { reply: "Nessun messaggio da elaborare." },
      { status: 200 }
    );
  }

  const from: string = waMessage.from;
  let text: string = "";

  if (waMessage.type === "text") {
    text = waMessage.text?.body ?? "";
  } else if (waMessage.type === "button") {
    text = waMessage.button?.text ?? "";
  }

  text = text.trim();

  if (!text) {
    console.log("[WA] Messaggio senza testo utile", waMessage);
    await sendWhatsappMessage(from, FALLBACK_REPLY);
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }

  // Chiamo la nostra chat interna (OpenAI)
  const reply = await callInternalChat(text);

  // Rispondo su WhatsApp
  await sendWhatsappMessage(from, reply);

  return NextResponse.json({ success: true }, { status: 200 });
}