import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN!;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN!;
const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION ?? "v21.0";
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID!;

type WaTextMessage = {
  from: string;
  id: string;
  timestamp: string;
  type: "text";
  text?: {
    body: string;
  };
};

type WaWebhookBody = {
  entry?: Array<{
    changes?: Array<{
      value?: {
        messages?: WaTextMessage[];
        contacts?: { wa_id: string }[];
      };
    }>;
  }>;
};

// -------------------- UTILITY --------------------

function extractTextMessage(body: WaWebhookBody): { from: string; text: string } | null {
  const entry = body.entry?.[0];
  const change = entry?.changes?.[0];
  const value = change?.value;
  const msg = value?.messages?.[0];

  if (!msg) {
    console.log("[WA] Nessun messaggio nel payload.");
    return null;
  }

  if (msg.type === "text" && msg.text?.body) {
    console.log("[WA] Messaggio testuale ricevuto:", msg.text.body);
    return {
      from: msg.from,
      text: msg.text.body,
    };
  }

  console.log("[WA] Messaggio non testuale, type:", msg.type);
  return null;
}

async function sendWhatsappMessage(to: string, body: string) {
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
        text: { body },
      }),
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

async function askInternalChat(origin: string, text: string, sector: string) {
  try {
    const url = `${origin}/api/whatsapp-internal-chat`;

    const chatRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, sector }),
    });

    const data = (await chatRes.json().catch(() => null)) as
      | { reply?: string }
      | null;

    if (!chatRes.ok) {
      console.error(
        "[WA] /api/whatsapp-internal-chat non ok:",
        chatRes.status,
        data
      );
      return null;
    }

    if (!data?.reply) {
      console.log("[WA] Nessuna reply dal bot interno.");
      return null;
    }

    console.log("[WA] Reply dal bot interno:", data.reply);
    return data.reply;
  } catch (err) {
    console.error("[WA] Errore chiamando internal chat:", err);
    return null;
  }
}

// -------------------- HANDLER VERIFICA (GET) --------------------

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json(
    { ok: true, message: "Webhook WhatsApp GalaxBot AI attivo." },
    { status: 200 }
  );
}

// -------------------- HANDLER MESSAGGI (POST) --------------------

export async function POST(req: NextRequest) {
  // 1) Leggiamo il body
  const rawBody = await req.json().catch(() => null);
  console.log("[WA] Webhook body:", JSON.stringify(rawBody, null, 2));

  // Se è il body di test (quando usiamo curl in locale)
  if (rawBody && typeof rawBody.text === "string" && rawBody.sector) {
    const reply =
      (await askInternalChat(req.nextUrl.origin, rawBody.text, rawBody.sector)) ??
      "Al momento non riesco a rispondere dal bot. Puoi riprovare tra poco.";

    return NextResponse.json(
      {
        success: true,
        mode: "test",
        input: rawBody.text,
        sector: rawBody.sector,
        reply,
      },
      { status: 200 }
    );
  }

  // 2) Payload vero di WhatsApp
  const body = rawBody as WaWebhookBody | null;

  if (!body) {
    console.error("[WA] Body mancante o non valido.");
    return NextResponse.json(
      {
        success: false,
        reply:
          "Al momento non riesco a rispondere dal bot. Puoi riprovare tra poco.",
      },
      { status: 200 }
    );
  }

  const message = extractTextMessage(body);

  if (!message) {
    return NextResponse.json(
      {
        success: true,
        reply:
          "Al momento non riesco a rispondere dal bot. Puoi riprovare tra poco.",
      },
      { status: 200 }
    );
  }

  const sector = "barbiere"; // per ora fisso

  const reply =
    (await askInternalChat(req.nextUrl.origin, message.text, sector)) ??
    "Al momento non riesco a rispondere dal bot. Puoi riprovare tra poco.";

  // 3) Rispondiamo su WhatsApp
  await sendWhatsappMessage(message.from, reply);

  return NextResponse.json(
    {
      success: true,
      input: message.text,
      sector,
      reply,
    },
    { status: 200 }
  );
}