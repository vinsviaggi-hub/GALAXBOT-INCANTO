import { NextRequest, NextResponse } from "next/server";

const SCRIPT_URL = process.env.BOOKING_WEBAPP_URL || "";

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
      console.error("[BOOKINGS] BOOKING_WEBAPP_URL non impostata");
      return NextResponse.json(
        {
          success: false,
          error:
            "Configurazione mancante: contatta l'amministratore del sito.",
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

    // VALIDAZIONI
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

    if (!gsRes.ok || !data?.success) {
      const errorMessage: string =
        data?.error ||
        data?.message ||
        "Operazione non riuscita sul foglio prenotazioni.";

      // Distingo i casi particolari
      if (data?.conflict) {
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

    // ✅ Tutto ok
    return NextResponse.json(
      {
        success: true,
        rowNumber: data.rowNumber ?? null,
        conflict: false,
        notFound: false,
        message:
          data.message ||
          (action === "cancel_booking"
            ? "Prenotazione annullata correttamente."
            : "Prenotazione salvata correttamente nel pannello Incanto."),
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