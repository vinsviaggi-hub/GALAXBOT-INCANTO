// app/api/whatsapp-internal-chat/route.ts
import { NextRequest, NextResponse } from "next/server";

type Body = {
  input?: string;
  sector?: string;
};

const FALLBACK_REPLY =
  "Al momento non riesco a rispondere dal bot. Puoi riprovare tra poco.";

/**
 * Endpoint interno usato SOLO dal webhook WhatsApp.
 * Riceve: { input, sector }
 * Risponde: { reply }
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;
    const input = body.input?.trim();
    const sector = body.sector?.trim() || "generico";

    if (!input) {
      return NextResponse.json(
        { reply: "Non ho ricevuto nessun messaggio da elaborare." },
        { status: 400 }
      );
    }

    // Prompt diverso se è barbiere
    const systemPrompt =
      sector === "barbiere"
        ? `Sei il bot di un barber shop.
- Rispondi SEMPRE in italiano, in modo chiaro e amichevole.
- Aiuta il cliente a prenotare tagli di capelli, barba, trattamenti.
- Se il cliente chiede un orario specifico, conferma la richiesta e chiedi nome e numero di telefono (o contatto WhatsApp / Instagram) per completare la prenotazione.
- Non parlare di come funzionano le API o la tecnologia, parla sempre come un assistente del negozio.`
        : `Sei un assistente virtuale gentile e professionale.
- Rispondi SEMPRE in italiano.
- Dai risposte brevi, chiare e utili all'utente.
- Non parlare di API o codice, parla come un normale assistente umano.`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("[WA-INTERNAL] OPENAI_API_KEY mancante");
      return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 500 });
    }

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: input },
          ],
          temperature: 0.6,
          max_tokens: 350,
        }),
      }
    );

    if (!openaiRes.ok) {
      const text = await openaiRes.text().catch(() => "");
      console.error(
        "[WA-INTERNAL] Errore chiamando OpenAI:",
        openaiRes.status,
        text
      );
      return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 500 });
    }

    const data = (await openaiRes.json()) as any;
    const reply: string | undefined =
      data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.error("[WA-INTERNAL] Nessuna reply da OpenAI", data);
      return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 500 });
    }

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err) {
    console.error("[WA-INTERNAL] Errore interno:", err);
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 500 });
  }
}