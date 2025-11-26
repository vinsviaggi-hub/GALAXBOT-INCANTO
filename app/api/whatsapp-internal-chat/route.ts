// app/api/whatsapp-internal-chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const FALLBACK_REPLY =
  "Al momento il bot non è disponibile. Riprova tra qualche minuto.";

/**
 * Endpoint interno chiamato dal webhook WhatsApp.
 * Deve restituire SEMPRE una risposta testuale già pronta
 * da inviare al cliente.
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

OBIETTIVO PRINCIPALE:
- Se l'utente scrive che vuole prenotare (parole tipo "prenotare", "appuntamento", "fissare un taglio", "domani alle", "voglio un taglio alle", ecc.),
  DEVI AIUTARLO A FARE LA PRENOTAZIONE, non dire di chiamare il barbiere o passare in negozio.

DATI CHE SERVONO PER PRENOTARE:
- Nome del cliente
- Servizio (es: taglio uomo, barba, colore, ecc.)
- Data (in futuro)
- Ora
- Numero di telefono

REGOLE:

1. Rispondi sempre e solo in ITALIANO.
2. Se nel messaggio ci sono già tutti i dati (nome, servizio, data, ora, telefono),
   rispondi così:
   - prima una frase breve di conferma, ad esempio:
     "Ho registrato la tua prenotazione per [SERVIZIO] il [DATA] alle [ORA]. Ti contatteremo al numero che hai fornito."
   - NON dire di chiamare il negozio, NON dire che non riesci a registrare la prenotazione.
3. Se manca qualche dato, NON inventarlo.
   - Spiega in modo semplice cosa ti manca e fai UNA domanda alla volta.
   - Esempio:
     "Per poterti prenotare mi serve anche il tuo numero di telefono. Inviami il numero e poi procedo con la prenotazione."
4. Dopo che l'utente ti ha dato i dati mancanti, riassumi e conferma la prenotazione come al punto 2.
5. Per tutte le altre domande (servizi, prezzi, orari, informazioni generali) rispondi in modo chiaro, amichevole e sintetico, come un vero barbiere digitale.
6. Non suggerire mai di chiamare il barbiere o andare in negozio, a meno che l'utente lo chieda esplicitamente.
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