// app/api/whatsapp-internal-chat/route.ts
import { NextRequest, NextResponse } from "next/server";

// 🔗 URL della pagina di prenotazione collegata al foglio Google
const BOOKING_URL =
  "https://galaxbot-ai-site.vercel.app/whatsapp-booking";

// Normalizza testo
function normalizeText(value: unknown): string {
  if (!value) return "";
  return String(value).trim().toLowerCase();
}

// Intenzioni possibili
type Intent = "booking" | "hours" | "prices" | "thanks" | "greeting" | "other";

function detectIntent(text: string): Intent {
  const t = text.toLowerCase();

  const hasBooking =
    t.includes("prenot") ||
    t.includes("appunt") ||
    t.includes("fissare") ||
    t.includes("prendere un appuntamento") ||
    t.includes("voglio venire") ||
    t.includes("vorrei venire") ||
    t.includes("voglio fissare") ||
    t.includes("prenotarmi");

  const hasPrices =
    t.includes("prezzo") ||
    t.includes("costa") ||
    t.includes("tariff") ||
    t.includes("quanto") ||
    t.includes("listino");

  const hasHours =
    t.includes("orari") ||
    t.includes("orario") ||
    t.includes("aperti") ||
    t.includes("chiusi") ||
    t.includes("quando siete aperti") ||
    t.includes("a che ora");

  const hasThanks =
    t.includes("grazie") ||
    t.includes("ti ringrazio") ||
    t.includes("grazie mille");

  const hasGreeting =
    t.includes("ciao") ||
    t.includes("buongiorno") ||
    t.includes("buonasera") ||
    t.includes("salve");

  if (hasThanks && !hasBooking && !hasPrices && !hasHours) return "thanks";
  if (hasBooking) return "booking";
  if (hasPrices) return "prices";
  if (hasHours) return "hours";
  if (hasGreeting) return "greeting";
  return "other";
}

// Messaggi pronti

function buildBookingReply(): string {
  return [
    "Perfetto, ti aiuto subito con la prenotazione. ✂️",
    "",
    "👉 Per scegliere giorno, orario e servizio tra gli slot liberi usa questo link:",
    BOOKING_URL,
    "",
    "Lì vedi solo gli orari disponibili e puoi inviare la prenotazione in pochi secondi. ✅",
  ].join("\n");
}

function buildHoursReply(): string {
  return [
    "Gli orari di esempio del barber shop sono:",
    "• Martedì – Venerdì: 8:30–12:30 e 15:30–20:00",
    "• Sabato: orario continuato",
    "• Domenica e lunedì: chiuso",
    "",
    "Se vuoi fissare un appuntamento ti mando il link di prenotazione:",
    BOOKING_URL,
  ].join("\n");
}

function buildPricesReply(): string {
  return [
    "Qui trovi dei prezzi indicativi di esempio:",
    "• Taglio uomo: da 15€",
    "• Barba: da 10€",
    "• Taglio + barba: da 22€",
    "",
    "Per fissare subito un appuntamento puoi usare il link di prenotazione:",
    BOOKING_URL,
  ].join("\n");
}

function buildThanksReply(): string {
  return "Prego! 😊 Se hai bisogno di altre informazioni o vuoi fissare un appuntamento, scrivimi pure.";
}

function buildGreetingReply(): string {
  return [
    "Ciao! 👋 Sono il bot del barber shop.",
    "Posso darti informazioni su servizi, orari e prezzi,",
    "oppure aiutarti a fissare un appuntamento.",
    "",
    'Per prenotare puoi dirmi, ad esempio: "voglio prenotare" oppure "mi serve un appuntamento".',
  ].join("\n");
}

function buildDefaultReply(): string {
  return [
    "Ciao! Sono il bot del barber shop. 💈",
    "Posso aiutarti con informazioni su servizi, orari, prezzi",
    "oppure con la prenotazione di un appuntamento.",
    "",
    'Se vuoi prenotare, scrivimi per esempio: "voglio prenotare domani pomeriggio".',
  ].join("\n");
}

// Handler principale
export async function POST(req: NextRequest) {
  try {
    const body: any = await req.json().catch(() => null);

    const rawText: unknown =
      body?.input ??
      body?.text ??
      body?.message ??
      body?.lastUserMessage ??
      body?.body ??
      (Array.isArray(body?.history)
        ? body.history[body.history.length - 1]?.content
        : "");

    const text = normalizeText(rawText);

    let reply: string;

    if (!text) {
      reply = buildDefaultReply();
    } else {
      const intent = detectIntent(text);

      switch (intent) {
        case "booking":
          reply = buildBookingReply();
          break;
        case "hours":
          reply = buildHoursReply();
          break;
        case "prices":
          reply = buildPricesReply();
          break;
        case "thanks":
          reply = buildThanksReply();
          break;
        case "greeting":
          reply = buildGreetingReply();
          break;
        default:
          reply = buildDefaultReply();
      }
    }

    return NextResponse.json(
      {
        success: true,
        reply,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[whatsapp-internal-chat] Errore:", err);
    const fallback =
      "C'è stato un problema tecnico nel rispondere ora. Riprova tra qualche minuto, per favore. 🙏";

    return NextResponse.json(
      {
        success: false,
        reply: fallback,
      },
      { status: 500 }
    );
  }
}