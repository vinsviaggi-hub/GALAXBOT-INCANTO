// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN ?? "";
const WHATSAPP_API_VERSION =
  process.env.WHATSAPP_API_VERSION ?? "v21.0";
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN ?? "";

type TestBody = {
  text?: string;
  sector?: string;
};

/**
 * Chiede una risposta al nostro /api/chat interno.
 */
async function askInternalChat(
  req: NextRequest,
  text: string,
  sector: string
): Promise<string> {
  const baseUrl = new URL("/api/chat", req.nextUrl.origin);

  const chatRes = await fetch(baseUrl.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ sender: "user", text }],
      sector,
    }),
  });

  const data = (await chatRes.json().catch(() => null)) as
    | { reply?: string }
    | null;

  return (
    data?.reply ??
    "Al momento non riesco a rispondere dal bot. Puoi riprovare tra poco?"
  );
}

/**
 * GET → usato da Meta solo per la verifica del webhook:
 * deve restituire esattamente hub.challenge se il token combacia.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN && challenge) {
    return new Response(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // fallback: health-check normale
  return NextResponse.json(
    {
      ok: true,
      message: "Webhook WhatsApp GalaxBot AI attivo.",
    },
    { status: 200 }
  );
}

/**
 * POST → per ora usato in "test mode" con JSON semplice:
 * { "text": "...", "sector": "barbiere" }
 * In futuro qui leggeremo il payload vero di WhatsApp Cloud.
 */
export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") ?? "";

  // --- TEST JSON SEMPLICE (curl / Postman) ---
  if (contentType.includes("application/json")) {
    const body = (await req.json().catch(() => null)) as TestBody | null;

    if (!body || !body.text) {
      return NextResponse.json(
        { success: false, error: "Campo 'text' mancante nel body." },
        { status: 400 }
      );
    }

    const sector =
      body.sector && body.sector.trim()
        ? body.sector.trim()
        : "barbiere";

    const reply = await askInternalChat(req, body.text, sector);

    return NextResponse.json(
      {
        success: true,
        mode: "test",
        input: body.text,
        sector,
        reply,
      },
      { status: 200 }
    );
  }

  // --- PLACEHOLDER per payload reale WhatsApp Cloud (da fare dopo) ---
  return NextResponse.json(
    {
      success: true,
      mode: "whatsapp",
      message:
        "Richiesta WhatsApp ricevuta. Il mapping completo del payload verrà aggiunto in seguito.",
    },
    { status: 200 }
  );
}