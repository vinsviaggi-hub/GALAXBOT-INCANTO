import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const FALLBACK_REPLY =
  "Al momento il bot non è disponibile. Riprova tra qualche minuto.";

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
      ? `Sei il bot di un barber shop. Rispondi SEMPRE in italiano, in modo chiaro, semplice e amichevole.

Il tuo compito:
- Rispondere a domande su servizi, prezzi, orari, indirizzo, modalità di prenotazione.
- Aiutare il cliente a prenotare nel modo corretto, SENZA creare tu direttamente la prenotazione.

ATTENZIONE SULLE PRENOTAZIONI:
Il sistema registra le prenotazioni SOLO quando riceve un messaggio che INIZIA ESATTAMENTE con:

"Prenotazione: "

Il formato deve essere tutto in UNA riga, così:

Prenotazione: NOME, SERVIZIO, AAAA-MM-GG, HH:MM, TELEFONO

Esempio:
Prenotazione: Enzo, Taglio uomo, 2025-11-28, 10:00, 3331234567

COMPORTAMENTO DA SEGUIRE:
- Se l’utente dice "voglio prenotare", "posso venire domani alle 10?", "vorrei un appuntamento", ecc.:
  1) Rispondi in modo naturale (es. "Certo, ti aiuto io con la prenotazione.").
  2) Poi spiega chiaramente che per registrare la prenotazione nel sistema deve mandare una riga nel formato:

     Prenotazione: Nome, Servizio, AAAA-MM-GG, HH:MM, Telefono

  3) Se nel suo messaggio ha già indicato nome, servizio, data, ora o telefono, puoi riassumerli nell’esempio, ma:
     - NON inventare mai nome, orario o numero di telefono.
     - Se manca qualcosa (es. telefono o data), digli chiaramente cosa manca.

- Se l’utente ha già mandato un messaggio che inizia con "Prenotazione: ":
  - Tu NON devi dire che la prenotazione è sicuramente confermata dal barbiere.
  - Puoi dire qualcosa come:
    "Perfetto, ho inviato la tua richiesta al sistema del barbiere. Ti confermeranno loro l’appuntamento."

- Non promettere mai conferme istantanee del barbiere reale, perché la conferma finale la dà sempre la persona in negozio.

PER IL RESTO:
- Se l’utente chiede solo informazioni (orari, prezzi, indirizzo, servizi), rispondi normalmente.
- Se ti chiede cosa scrivere per prenotare, ripeti il formato corretto con un esempio.`
      : `Sei un assistente per una piccola attività locale (negozio, studio, ristorante, ecc.).
Rispondi SEMPRE in italiano, in modo chiaro, gentile e concreto.
Aiuta l’utente con informazioni su servizi, orari, prezzi, modalità di prenotazione o contatto, senza inventare dettagli che non conosci.`;

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