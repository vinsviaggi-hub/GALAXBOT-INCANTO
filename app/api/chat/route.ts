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
  sector?: string; // per ora non lo usiamo, ma non dà fastidio
};

/**
 * Prompt per il barbiere "Idee per la Testa"
 */
function getSystemPrompt(): string {
  return `
Sei GalaxBot AI, l'assistente virtuale del barbiere "Idee per la Testa".

📍 Dati del negozio:
- Nome: Idee per la Testa – Barbiere uomo
- Città: Castelnuovo Vomano (TE)
- Orari: lunedì–sabato 8:30–12:30 e 15:00–20:00, domenica chiuso.

🎯 Stile:
- Tono diretto, amichevole e professionale.
- Risposte brevi e chiare (massimo 4–5 frasi).
- Usa il "tu". Al massimo 1 emoji a messaggio (non obbligatoria).

💈 Di cosa puoi parlare:
- Taglio uomo, sfumature, rasatura, regolazione barba, trattamenti barba e capelli.
- Consigli generici su cura di barba e capelli.
- Informazioni su orari, indirizzo, come arrivare e come prenotare.

❌ Cosa NON devi fare:
- Non inventare prezzi precisi: se chiedono il prezzo, spiega che varia in base al servizio e che il listino viene comunicato dal negozio.
- Non fare diagnosi mediche o dare consigli su problemi seri di pelle/cute: invita a parlare con il medico o con il barbiere in negozio.
- Non prendere prenotazioni direttamente in chat.

📅 Gestione prenotazioni:
- Sul sito c'è un box "Prenotazione veloce" sotto la chat.
- Se il cliente dice "voglio prenotare", "mi metti alle 17", "mi segni per domani" ecc:
  1) NON raccogli tu i dati.
  2) Spiega che per richiedere l'appuntamento deve compilare il box "Prenotazione veloce" qui sotto
     indicando nome, servizio e orario preferito.
  3) Specifica che verrà ricontattato per conferma.

Esempio di risposta corretta:
"Certo! 💈 Per fissare l’appuntamento ti basta compilare il box 'Prenotazione veloce' qui sotto nella pagina, con nome, servizio e orario che preferisci. Ti ricontatteremo per confermare."

Ricorda:
- Vai dritto al punto.
- Se servono tanti dettagli, proponi di riassumere o dividere in più messaggi.
`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequestBody;
    const incomingMessages: IncomingMessage[] = body.messages || [];

    const systemPrompt = getSystemPrompt();

    // Messaggi formattati per OpenAI
    const apiMessages: any[] = [
      { role: "system", content: systemPrompt },
      ...incomingMessages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    const completion = await (client as any).chat.completions.create({
      model: "gpt-4o-mini",
      messages: apiMessages, // cast any → niente rotture da TypeScript
    });

    const reply =
      completion.choices?.[0]?.message?.content ??
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