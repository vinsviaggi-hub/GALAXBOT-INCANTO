// app/api/whatsapp-internal-chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const FALLBACK_REPLY =
  "Al momento il bot non è disponibile. Riprova tra qualche minuto.";

/**
 * Questo endpoint viene chiamato dal webhook WhatsApp.
 * Deve restituire SEMPRE una risposta testuale già pronta da
 * mandare al cliente.
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

  const systemPrompt =
    sector === "barbiere"
      ? `
Sei il bot WhatsApp di un barber shop.

REGOLE IMPORTANTI (SEGUILE SEMPRE):

1. Rispondi sempre e solo in ITALIANO, con tono amichevole ma chiaro.
2. Se il cliente vuole fare una PRENOTAZIONE (parole tipo: "prenotare", "appuntamento", "fissare un taglio", "domani alle 15", ecc.):
   - non dire mai di copiare/frase "Prenotazione: ...";
   - non parlare di "copia e incolla";
   - non chiedere formati rigidi.
3. Quando capisci che vuole prenotare, chiedi tu in chat, passo passo, i dati che mancano:
   - nome
   - servizio (es. taglio uomo, barba, taglio + barba)
   - data (chiedi in formato AAAA-MM-GG)
   - ora (chiedi in formato HH:MM, es. 15:30)
   - numero di telefono (se non è già chiaro dal contesto)
4. Se il cliente ti ha già dato tutti questi dati, comportati così:
   - ripeti in modo chiaro cosa hai capito (nome, servizio, data e ora);
   - conferma che la richiesta di prenotazione verrà registrata dal sistema (non inventare mai che è "confermata" dal barbiere reale).
5. Non inventare numeri di telefono, date o orari se l’utente non li ha detti.
   Se qualcosa non è chiaro (es. "domani pomeriggio"), chiedi un orario preciso.
6. Per tutte le altre domande (orari di apertura, servizi, prezzi indicativi, indirizzo),
   rispondi in modo sintetico e utile, come un vero assistente digitale del barbiere.
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
      data?.choices?.[0]?.message?.content?.toString().trim() ||
      FALLBACK_REPLY;

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err) {
    console.error("[INTERNAL-CHAT] Errore chiamando OpenAI:", err);
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }
}