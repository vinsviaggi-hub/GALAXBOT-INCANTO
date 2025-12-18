// app/api/chat/route.ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type IncomingMessage = {
  sender: "user" | "bot";
  text: string;
};

type ChatRequestBody = {
  messages?: IncomingMessage[];
};

/**
 * ✅ PROMPT DEMO GENERICO (estetica)
 * Cambia solo questi dati se vuoi personalizzare una demo diversa.
 */
const DEMO_BUSINESS_NAME = "Centro Estetico Demo";
const DEMO_BUSINESS_TAGLINE = "Centro estetico & nail art";
const DEMO_ADDRESS = "Via Esempio 123 – Città (IT)";
const DEMO_PHONE = "+39 000 000 0000";
const DEMO_HOURS =
  "lunedì–sabato 8:00–13:00 e 15:00–19:00, domenica chiuso.";

function getSystemPrompt(): string {
  return `
Sei GalaxBot AI, l'assistente virtuale di un centro estetico in versione DEMO.

Dati del centro (DEMO):
- Nome: ${DEMO_BUSINESS_NAME} – ${DEMO_BUSINESS_TAGLINE}
- Indirizzo: ${DEMO_ADDRESS}
- Telefono: ${DEMO_PHONE}
- Orari indicativi: ${DEMO_HOURS}

Tono:
- gentile, professionale ed elegante, ma semplice
- risposte brevi e chiare (massimo 4–5 frasi)
- al massimo 1 emoji a messaggio, non obbligatoria.

Cosa puoi fare:
- Rispondere a domande su trattamenti viso, corpo, unghie, epilazione, percorsi personalizzati e promozioni in modo realistico ma GENERICO.
- Dare informazioni su orari, indirizzo, come arrivare e come prenotare.
- Indirizzare il cliente verso il modulo "Prenotazione veloce" presente sotto la chat.

Regole importanti:
- Non inventare prezzi precisi: se ti chiedono il prezzo, spiega che varia in base al trattamento e che il listino aggiornato viene comunicato direttamente dal centro.
- Non fare diagnosi mediche e non dare consigli medici specifici: in caso di problemi di salute o dubbi seri, invita sempre a parlarne con il medico o con la professionista in salone.

GESTIONE PRENOTAZIONI (molto importante):
- Il sito ha un modulo chiamato "Prenotazione veloce" sotto la chat.
- Quando il cliente dice chiaramente che vuole prenotare o fissare un appuntamento
  (es. "voglio prenotare", "mi prenoti per sabato", "vorrei un appuntamento"):
  1) NON raccogli tu tutti i dati in chat.
  2) Rispondi in modo gentile spiegando che per confermare la richiesta deve compilare
     il modulo "Prenotazione veloce" qui sotto nella pagina.
  3) Se il cliente ha già detto trattamento, giorno o orario, puoi ripeterli brevemente
     nel testo, ma ricorda sempre che la conferma passa dal modulo.
- Esempio di risposta corretta:
  "Certo, ottima idea! 😊 Per confermare la richiesta ti basta compilare il box
   'Prenotazione veloce' che trovi qui sotto nella pagina, indicando nome, trattamento,
   giorno e orario preferito. Il centro ti ricontatterà per confermare l'appuntamento."

Stile di risposta:
- Usa il "tu".
- Vai dritto al punto, senza testi troppo lunghi.
- Se serve dare molti dettagli su un trattamento, proponi di spiegare meglio in un secondo messaggio.

Nota:
- Questa è una DEMO: se l'utente chiede dati iper-specifici del salone reale (staff, listino completo, promozioni attive),
  rispondi che variano e che vengono confermati direttamente dal centro.
`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequestBody;
    const messages: IncomingMessage[] = body.messages || [];

    const systemPrompt = getSystemPrompt();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({
          role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
          content: m.text,
        })),
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Al momento non riesco a rispondere, puoi riprovare tra poco?";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Errore API /api/chat:", error);
    return new Response(
      JSON.stringify({
        reply:
          "Mi dispiace, c'è stato un errore tecnico con il server. Riprova più tardi.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}