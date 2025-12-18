// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";

// URL della Web App di Google Script, letto da variabile ambiente Vercel
const SCRIPT_URL = process.env.BOOKING_WEBAPP_URL || "";

type BookingBody = {
  mode?: "create" | "cancel"; // 👈 tipo operazione (default: create)
  name?: string;
  phone?: string;
  service?: string;
  date?: string; // YYYY-MM-DD
  time?: string; // HH:MM
  notes?: string;
};

export async function POST(req: NextRequest) {
  try {
    if (!SCRIPT_URL) {
      console.error("[BOOKINGS] BOOKING_WEBAPP_URL non impostata");
      return NextResponse.json(
        {
          success: false,
          error: "Configurazione mancante: contatta l'amministratore del sito.",
        },
        { status: 500 }
      );
    }

    const body = (await req.json().catch(() => null)) as BookingBody | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Richiesta non valida: corpo mancante o non in JSON.",
        },
        { status: 400 }
      );
    }

    const { mode = "create", name, phone, service, date, time, notes } = body;

    //
    // 1️⃣ MODALITÀ CANCELLAZIONE PRENOTAZIONE
    //
    if (mode === "cancel") {
      if (!phone || !date || !time) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Per annullare servono telefono, data e ora della prenotazione.",
          },
          { status: 400 }
        );
      }

      const payload = {
        action: "cancel_booking",
        phone: String(phone).trim(),
        date: String(date).trim(),
        time: String(time).trim(),
      };

      const gsRes = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await gsRes.text();
      let data: any;

      try {
        data = JSON.parse(text);
      } catch {
        console.error("[BOOKINGS CANCEL] Risposta NON JSON da Apps Script:", text);
        return NextResponse.json(
          {
            success: false,
            error: "Errore nel collegamento al foglio prenotazioni.",
          },
          { status: 502 }
        );
      }

      if (!gsRes.ok || !data?.success) {
        const errorMessage: string =
          data?.error ||
          data?.message ||
          "Non è stato possibile annullare la prenotazione.";

        return NextResponse.json(
          {
            success: false,
            error: errorMessage,
          },
          { status: 400 }
        );
      }

      // ✅ Annullamento ok
      return NextResponse.json(
        {
          success: true,
          rowNumber: data.rowNumber ?? null,
          message:
            data.message || "Prenotazione annullata correttamente dal pannello.",
        },
        { status: 200 }
      );
    }

    //
    // 2️⃣ MODALITÀ CREAZIONE PRENOTAZIONE
    //
    if (!name || !service || !date || !time) {
      return NextResponse.json(
        {
          success: false,
          error: "Per prenotare servono almeno nome, trattamento, data e ora.",
        },
        { status: 400 }
      );
    }

    // Payload che mandiamo ad Apps Script
    const payload = {
      action: "create_booking",
      name: String(name).trim(),
      phone: phone ? String(phone).trim() : "",
      service: String(service).trim(),
      date: String(date).trim(),
      time: String(time).trim(),
      notes: notes ? String(notes).trim() : "",
    };

    const gsRes = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await gsRes.text();
    let data: any;

    try {
      data = JSON.parse(text);
    } catch {
      console.error("[BOOKINGS CREATE] Risposta NON JSON da Apps Script:", text);
      return NextResponse.json(
        {
          success: false,
          error: "Errore nel collegamento al foglio prenotazioni.",
        },
        { status: 502 }
      );
    }

    if (!gsRes.ok || !data?.success) {
      const errorMessage: string =
        data?.error ||
        data?.message ||
        "Non è stato possibile salvare la prenotazione.";

      const statusCode = data?.conflict ? 409 : 400;

      return NextResponse.json(
        {
          success: false,
          conflict: Boolean(data?.conflict),
          error: errorMessage,
        },
        { status: statusCode }
      );
    }

    // ✅ Tutto ok (creazione)
    return NextResponse.json(
      {
        success: true,
        rowNumber: data.rowNumber ?? null,
        message:
          data.message ||
          "Prenotazione salvata correttamente nel pannello demo.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[BOOKINGS] Errore API /api/bookings:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Errore interno del server.",
      },
      { status: 500 }
    );
  }
}