// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

const WA_TOKEN = process.env.WHATSAPP_TOKEN;
const WA_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WA_API_VERSION = process.env.WHATSAPP_API_VERSION ?? "v21.0";
const VERIFY_TOKEN =
  process.env.WHATSAPP_VERIFY_TOKEN ?? "GALAXBOT_WHATSAPP_TOKEN";

const FALLBACK_REPLY =
  "Al momento non riesco a rispondere dal bot. Puoi riprovare tra poco.";

// ✅ VERIFICA WEBHOOK (setup da Meta)
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

  return NextResponse.json({ error: "Invalid verify token" }, { status: 403 });
}

// Tipo minimale per non far esplodere TS
type WaChange = {
  value?: {
    messages?: Array<{
      from: string;
      type: string;
      text?: { body?: string };
    }>;
  };
};

// ✅ GESTIONE MESSAGGI IN ARRIVO DA WHATSAPP
export async function POST(req: NextRequest) {
  let payload: any;
  try {
    payload = await req.json();
  } catch {
    payload = null;
  }

  console.log("[WA] Webhook payload:", JSON.stringify(payload));

  if (!payload || payload.object !== "whatsapp_business_account") {
    console.log("[WA] Payload non rilevante.");
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const entry = payload.entry?.[0];
  const change: WaChange | undefined = entry?.changes?.[0];

  const messages = change?.value?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    console.log("[WA] Nessun messaggio testuale da processare");
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const msg = messages[0];
  if (msg.type !== "text") {
    console.log("[WA] Messaggio non testuale, type:", msg.type);
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const from = msg.from;
  const text = msg.text?.body?.trim();
  if (!from || !text) {
    console.log("[WA] Mancano from o text");
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // 🔁 1) Chiamo la chat interna del sito
  let reply = FALLBACK_REPLY;

  try {
    // uso l'origin della richiesta, così funziona sia in locale che su Vercel
    const origin = new URL(req.url).origin;
    const internalUrl = `${origin}/api/whatsapp-internal-chat`;

    const internalRes = await fetch(internalUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: text,
        sector: "barbiere",
      }),
    });

    const internalData = await internalRes.json().catch(() => null);

    if (!internalRes.ok) {
      console.error(
        "[WA-INTERNAL] Risposta non OK dalla chat interna:",
        internalRes.status,
        internalData
      );
    } else {
      reply =
        internalData?.reply?.toString().trim() ||
        FALLBACK_REPLY;
    }
  } catch (err) {
    console.error("[WA-INTERNAL] Errore chiamando la chat interna:", err);
  }

  // 🔁 2) Mando la risposta su WhatsApp
  try {
    await sendWhatsAppMessage(from, reply);
  } catch (err) {
    console.error("[WA] Errore nell'invio del messaggio:", err);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

// Helper per inviare messaggi WhatsApp
async function sendWhatsAppMessage(to: string, body: string) {
  if (!WA_TOKEN || !WA_PHONE_NUMBER_ID) {
    console.error("[WA] Token o phone number ID mancanti");
    return;
  }

  const url = `https://graph.facebook.com/${WA_API_VERSION}/${WA_PHONE_NUMBER_ID}/messages`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WA_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body },
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("[WA] Errore nell'invio del messaggio:", res.status, data);
  } else {
    console.log("[WA] Messaggio WhatsApp inviato con successo:", data);
  }
}