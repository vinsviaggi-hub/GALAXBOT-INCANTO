// app/api/whatsapp-internal-chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const FALLBACK_REPLY =
  "Al momento il bot non è disponibile. Riprova tra qualche minuto.";

/**
 * Endpoint usato dal webhook WhatsApp.
 * Riceve { input, sector } e restituisce { reply }.
 */
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

  if (!OPENAI_API_KEY) {
    console.error("[INTERNAL-CHAT] OPENAI_API_KEY mancante");
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }

  // === GESTIONE MESSAGGI DI RINGRAZIAMENTO / CHIUSURA ===
  // Se il messaggio è solo un "grazie", "ok grazie", "grazie mille" ecc.
  // rispondiamo qui direttamente con un saluto e NON parliamo di appuntamenti.
  const normalized = input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim();

  const isThanksOnly =
    normalized.length > 0 &&
    /grazie|ti ringrazio|thank you|thx/.test(normalized) &&
    !/(prenot|appunt|taglio|barba|colore|rasatura|orario|data)/.test(
      normalized
    );

  if (isThanksOnly) {
    return NextResponse.json(
      {
        reply:
          "Non c'è di che, è un piacere aiutarti! Se ti servirà altro, scrivimi pure. 👋",
      },
      { status: 200 }
    );
  }

  // === PROMPT DI SISTEMA ===
  const systemPrompt =
    sector === "barbiere"
      ? `
Sei il bot WhatsApp di un barber shop.

REGOLE IMPORTANTI:
- Rispondi sempre e solo in ITALIANO.
- Tono chiaro, amichevole, professionale ma semplice.
- Puoi parlare di servizi (taglio, barba, colore, trattamenti), prezzi, durata media dei trattamenti, orari di apertura, come arrivare, ecc.
- NON dire mai che "non riesci a registrare la prenotazione" o che "non hai accesso al gestionale".
- Se il cliente parla di prenotazioni o appuntamenti, puoi:
  - confermare che il sistema può occuparsi delle prenotazioni,
  - ricordare in modo breve che ti servono nome, servizio, data e orario preferiti se non sono stati indicati.
- Non dare mai istruzioni su telefonare al negozio al posto del bot.
- Le frasi di cortesia tipo "ok grazie", "grazie mille" vengono gestite dal codice PRIMA di arrivare a te:
  evita quindi di proporre subito un nuovo appuntamento se il messaggio è solo un ringraziamento.
- Mantieni le risposte compatte: massimo 3–4 frasi, niente papiri.

Comportati come un vero assistente digitale del barbiere.
`.trim()
      : `
Sei un assistente per un'attività locale.
Rispondi sempre in italiano, in modo chiaro, utile e amichevole.
Non dire di non poter aiutare: dai sempre una risposta concreta e sintetica.
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