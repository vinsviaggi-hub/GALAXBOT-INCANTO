// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";

// 🔗 Web App URL di Google Apps Script per
// "GalaxBot - Idee per la Testa" (BARBIERE)
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxZrsGAlCw9fweBfAqYTZ-scfEcvR_fpEvD094znv0Q0oDAxAcFxxvu21j8OG3nUQk/exec";

type BookingBody = {
  action?: "create_booking" | "cancel_booking";
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
      console.error("[BOOKINGS] SCRIPT_URL non impostata");
      return NextResponse.json(
        {
          success: false,
          error:
            "Configurazione mancante del pannello prenotazioni. Contatta l'amministratore del sito.",
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

    const {
      action = "create_booking",
      name,
      phone,
      service,
      date,
      time,
      notes,
    } = body;

    // ✅ VALIDAZIONI BASE
    if (action === "create_booking") {
      if (!name || !service || !date || !time) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Per prenotare servono almeno nome, trattamento, data e ora.",
          },
          { status: 400 }
        );
      }
    } else if (action === "cancel_booking") {
      if (!phone || !name || !service || !date || !time) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Per annullare servono telefono, nome, trattamento, data e ora.",
          },
          { status: 400 }
        );
      }
    }

    const payload = {
      action,
      name: name ? String(name).trim() : "",
      phone: phone ? String(phone).trim() : "",
      service: service ? String(service).trim() : "",
      date: date ? String(date).trim() : "",
      time: time ? String(time).trim() : "",
      notes: notes ? String(notes).trim() : "",
    };

    // 🔄 CHIAMATA ALLO SCRIPT GOOGLE
    const gsRes = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await gsRes.text();
    let data: any;

    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("[BOOKINGS] Risposta NON JSON da Apps Script:", text);
      return NextResponse.json(
        {
          success: false,
          error: "Errore nel collegamento al foglio prenotazioni.",
        },
        { status: 502 }
      );
    }

    // ❌ ERRORE DALLO SCRIPT
    if (!gsRes.ok || !data?.success) {
      const errorMessage: string =
        data?.error ||
        data?.message ||
        "Operazione non riuscita sul foglio prenotazioni.";

      if (data?.conflict) {
        // slot già occupato
        return NextResponse.json(
          {
            success: false,
            conflict: true,
            error: errorMessage,
          },
          { status: 409 }
        );
      }

      if (data?.notFound) {
        // prenotazione non trovata per annullamento
        return NextResponse.json(
          {
            success: false,
            notFound: true,
            error: errorMessage,
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        { status: 400 }
      );
    }

    // ✅ TUTTO OK
    return NextResponse.json(
      {
        success: true,
        rowNumber: data.rowNumber ?? null,
        conflict: false,
        notFound: false,
        message:
          data.message ||
          (action === "cancel_booking"
            ? "Prenotazione annullata correttamente. Lo slot è stato liberato."
            : "Prenotazione salvata correttamente nel pannello Idee per la Testa."),
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