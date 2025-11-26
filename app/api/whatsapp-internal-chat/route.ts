// app/api/whatsapp-internal-chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const FALLBACK_REPLY =
  "Al momento il bot non è disponibile. Riprova tra qualche minuto.";

/**
 * Endpoint interno chiamato dal webhook WhatsApp.
 * Deve restituire SEMPRE una risposta testuale pronta da mandare al cliente.
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

1. Rispondi sempre e solo in ITALIANO, tono amichevole e professionale.

2. Riconosci quando l'utente vuole fare una PRENOTAZIONE
   (parole tipo: "prenotare", "appuntamento", "mi prenoti", "vorrei un taglio domani alle", ecc.).
   Il tuo obiettivo è raccogliere:
   - nome
   - servizio
   - data
   - orario
   - numero di telefono (se non è già evidente dal contesto).

3. Se ti mancano dei dati per completare la prenotazione:
   - fai DOMANDE CHIARE, UNA ALLA VOLTA
   - riassumi velocemente cosa hai capito prima di chiedere la prossima cosa
   - esempio:
     "Ok, ho capito che vuoi un taglio domani. A che ora preferisci venire?"

4. Quando hai tutti i dati necessari:
   - conferma la prenotazione in modo chiaro, ad esempio:
     "Ho registrato la tua prenotazione per TAGLIO, DATA, ORA. Ti contatteremo al numero NUMERO se necessario."
   - dopo la conferma considera la prenotazione CHIUSA, a meno che l'utente non chieda modifiche.

5. MESSAGGI DI RINGRAZIAMENTO / CHIUSURA
   - Se il messaggio dell'utente è solo qualcosa tipo:
     "grazie", "ok grazie", "perfetto", "va bene", "a posto così",
     "grazie mille", "ok grazie buona serata" ecc.
     rispondi con una frase di saluto BREVE, ad esempio:
     "Prego, a presto! 👋"
     oppure
     "Di niente, buona giornata! 🙂"
   - In questi casi NON proporre una nuova prenotazione,
     NON dire di nuovo "se vuoi prenotare fammi sapere" e simili.
     Considera la conversazione chiusa, a meno che l'utente non riapra con una nuova domanda.

6. Per tutte le altre domande (orari, servizi, prezzi, info generali):
   - rispondi in modo chiaro, sintetico e utile
   - se serve, puoi proporre di prenotare, ma senza essere insistente.

Comportati come un vero assistente digitale per un barber shop: educato, veloce e pratico.
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