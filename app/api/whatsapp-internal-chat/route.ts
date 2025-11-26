// app/api/whatsapp-internal-chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const FALLBACK_REPLY =
  "Al momento il bot non è disponibile. Riprova tra qualche minuto.";

// Messaggi brevi di ringraziamento: risposta fissa, senza parlare di nuove prenotazioni
const THANK_YOU_REGEX =
  /(grazie mille|ok grazie|ok, grazie|ti ringrazio|grazie|thank you)/i;

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const input = body?.input?.toString().trim() ?? "";
  const sector = body?.sector?.toString().trim() ?? "barbiere";

  if (!input) {
    console.error("[INTERNAL-CHAT] Nessun input nel body:", body);
    return NextResponse.json(
      { reply: "Non ho ricevuto nessun messaggio da elaborare." },
      { status: 400 }
    );
  }

  // 🔒 Caso speciale: solo ringraziamenti / chiusura conversazione
  if (THANK_YOU_REGEX.test(input) && input.length <= 80) {
    const reply =
      "Non c'è di che! 😊 Se hai bisogno di modificare la prenotazione o hai altre domande, scrivimi pure.";
    return NextResponse.json({ reply }, { status: 200 });
  }

  if (!OPENAI_API_KEY) {
    console.error("[INTERNAL-CHAT] OPENAI_API_KEY mancante");
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }

  const systemPrompt =
    sector === "barbiere"
      ? `
Sei il bot WhatsApp di un barber shop.

REGOLE IMPORTANTI (SEMPRE):

1. Rispondi solo in ITALIANO, tono amichevole ma professionale.
2. Aiuta il cliente a:
   - chiedere informazioni su servizi, orari, prezzi;
   - fare una prenotazione;
   - modificare o cancellare una prenotazione già fatta.
3. Quando il cliente vuole prenotare:
   - chiedi con domande brevi e chiare:
     • nome
     • servizio (taglio, barba, taglio + barba, ecc.)
     • giorno (data)
     • orario
     • telefono se non è chiaro dal contesto
   - riassumi SEMPRE prima di confermare:
     "Perfetto, ti ho prenotato per [SERVIZIO] il [DATA] alle [ORA]."
4. Non parlare di "gestionale", "sistema interno" o cose tecniche.
5. Dopo aver confermato una prenotazione:
   - non proporre subito di fare un altro appuntamento;
   - chiudi con una frase semplice, tipo:
     "Se hai bisogno di modificare qualcosa o hai altre domande, scrivimi pure."
6. Non inventare prezzi reali o politiche del negozio: se servono dettagli precisi, dì di chiedere direttamente in negozio.

Per tutte le altre domande rispondi in modo chiaro, sintetico e utile, come un vero barbiere digitale.
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
      data?.choices?.[0]?.message?.content?.toString().trim() || FALLBACK_REPLY;

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err) {
    console.error("[INTERNAL-CHAT] Errore chiamando OpenAI:", err);
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }
}