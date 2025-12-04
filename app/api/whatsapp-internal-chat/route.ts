import { NextRequest, NextResponse } from "next/server";
import { getSessionForPhone, saveSessionForPhone, resetSessionForPhone } from "@/lib/waSessions";

// URL del Web App di Google Script
const BOOKING_WEBAPP_URL = process.env.BOOKING_WEBAPP_URL;

// Funzione per convertire "domani" in data ISO
function parseItalianDate(input: string): string | null {
  const today = new Date();
  if (/domani/i.test(input)) {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }
  const match = input.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (match) {
    const [_, day, month, year] = match;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return null;
}

// Funzione per estrarre l’orario (tipo “alle 10”, “10:30”, ecc.)
function parseTime(text: string): string | null {
  const match = text.match(/(\d{1,2})([:.,](\d{2}))?/);
  if (match) {
    const hours = match[1].padStart(2, "0");
    const minutes = match[3] ? match[3].padStart(2, "0") : "00";
    return `${hours}:${minutes}`;
  }
  return null;
}

export async function POST(req: NextRequest) {
  const { phone, message } = await req.json();

  if (!phone || !message) {
    return NextResponse.json({ success: false, reply: "Messaggio non valido." });
  }

  const session = await getSessionForPhone(phone);
  const msg = message.trim().toLowerCase();

  // STEP 1 — IDLE → inizio conversazione
  if (session.step === "idle") {
    if (/prenota|appuntamento|ciao|salve/.test(msg)) {
      session.step = "collecting_name";
      await saveSessionForPhone(phone, session);
      return NextResponse.json({
        success: true,
        reply:
          "Ciao! Ti aiuto subito a prenotare 💈\nCome ti chiami?",
      });
    } else {
      return NextResponse.json({
        success: true,
        reply:
          "Ciao! Vuoi prenotare un appuntamento? Scrivi 'voglio prenotare' per iniziare ✂️",
      });
    }
  }

  // STEP 2 — Nome
  if (session.step === "collecting_name") {
    const name = msg.replace(/mi chiamo|sono|io mi chiamo/g, "").trim();
    if (name.length < 2) {
      return NextResponse.json({
        success: true,
        reply: "Non ho capito il nome 😅. Puoi riscriverlo?",
      });
    }
    session.name = name.charAt(0).toUpperCase() + name.slice(1);
    session.step = "collecting_service";
    await saveSessionForPhone(phone, session);
    return NextResponse.json({
      success: true,
      reply: `Perfetto ${session.name}! ✂️\nChe servizio vuoi prenotare? (es. taglio uomo, barba, taglio + barba)`,
    });
  }

  // STEP 3 — Servizio
  if (session.step === "collecting_service") {
    session.service = message;
    session.step = "collecting_date";
    await saveSessionForPhone(phone, session);
    return NextResponse.json({
      success: true,
      reply: `Ottimo 👍\nPer che giorno vuoi prenotare? (es. domani oppure 12/12/2025)`,
    });
  }

  // STEP 4 — Data
  if (session.step === "collecting_date") {
    const parsed = parseItalianDate(msg);
    if (!parsed) {
      return NextResponse.json({
        success: true,
        reply: "Non ho capito la data 😅. Puoi scriverla tipo 'domani' o '12/12/2025'?",
      });
    }
    session.date = parsed;
    session.step = "collecting_time";
    await saveSessionForPhone(phone, session);
    return NextResponse.json({
      success: true,
      reply: `Perfetto! A che ora vuoi prenotare per il ${new Date(parsed).toLocaleDateString(
        "it-IT",
        { day: "numeric", month: "long", year: "numeric" }
      )}? (es. 10:00 oppure 15:30)`,
    });
  }

  // STEP 5 — Ora
  if (session.step === "collecting_time") {
    const time = parseTime(msg);
    if (!time) {
      return NextResponse.json({
        success: true,
        reply: "Non ho capito l’orario 😅. Puoi scriverlo tipo 'alle 10' o '15:30'?",
      });
    }
    session.time = time;

    // Invio al Google Script
    try {
      const res = await fetch(BOOKING_WEBAPP_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_booking",
          name: session.name,
          service: session.service,
          date: session.date,
          time: session.time,
          phone,
          notes: "Prenotazione via WhatsApp",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.conflict) {
          return NextResponse.json({
            success: true,
            reply: `Mi dispiace, ma ${session.date} alle ${session.time} è già prenotato 😕. Dimmi un altro orario libero.`,
          });
        }
        throw new Error(data.error || "Errore nella prenotazione.");
      }

      await resetSessionForPhone(phone);

      return NextResponse.json({
        success: true,
        reply: `✅ Prenotazione registrata per ${session.service} il ${new Date(
          session.date!
        ).toLocaleDateString("it-IT", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })} alle ${session.time}. Ti contatteremo per conferma. Grazie ${session.name}! 💈`,
      });
    } catch (err) {
      console.error("Errore prenotazione:", err);
      return NextResponse.json({
        success: false,
        reply:
          "Errore nel salvataggio della prenotazione. Riprova tra poco 🙏",
      });
    }
  }

  // Caso generico
  return NextResponse.json({
    success: true,
    reply:
      "Ciao! Vuoi prenotare un appuntamento? Scrivi 'voglio prenotare' e ti aiuterò passo passo 💈",
  });
}