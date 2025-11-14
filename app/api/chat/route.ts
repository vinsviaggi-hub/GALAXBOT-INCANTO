import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type IncomingMessage = {
  sender: "user" | "bot";
  text: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: IncomingMessage[] = body.messages || [];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Sei GalaxBot AI, un assistente virtuale per un BARBIERE / PARRUCCHIERE.

Tono:
- professionale, gentile, moderno, leggermente informale
- risposte brevi e chiare (massimo 5 frasi)
- usa al massimo 1 emoji a risposta.

Obiettivi:
- rispondere a domande su tagli, barba, trattamenti, prodotti e prezzi in modo GENERICO
- aiutare a fissare appuntamenti
- spiegare in modo semplice come il chatbot può aiutare il negozio (prenotazioni automatiche, gestione messaggi, promozioni).

Gestione appuntamenti:
- se il cliente VUOLE prenotare ma mancano dati, chiedi:
  - giorno
  - orario
  - nome
  - contatto (telefono o Instagram).
- se il cliente ha già dato giorno, orario, nome E contatto, NON chiedere di nuovo:
  - limita la risposta a un riepilogo chiaro della prenotazione e, se serve, una sola domanda di conferma.
- non inventare prezzi, indirizzi o orari reali: parla in modo generico (es. "in base all'organizzazione del tuo salone...").

Puoi rispondere anche a domande più generali, ma cerca sempre di collegare la risposta al contesto del salone/barbiere.`,
        },
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
      headers: {
        "Content-Type": "application/json",
      },
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
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}