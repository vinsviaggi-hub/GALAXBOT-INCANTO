// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";

// URL della tua Web App di Google Apps Script (quella che finisce con /exec)
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz0W7HTl3FYsaY0q7di83Ujx1boiqNM577DasWSmGm711tRoZ86hTYaczMeQuMNUKg/exec";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Richiesta non valida (corpo mancante o non JSON).",
        },
        { status: 400 }
      );
    }

    const { name, service, date, time, phone, notes } = body as {
      name?: string;
      service?: string;
      date?: string;
      time?: string;
      phone?: string;
      notes?: string;
    };

    // Controllo minimo sui campi
    if (!name || !service || !date || !time) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Per prenotare servono almeno nome, servizio, data e ora.",
        },
        { status: 400 }
      );
    }

    // Payload inviato allo script Google (azione create_booking)
    const payload = {
      action: "create_booking",
      name: String(name).trim(),
      service: String(service).trim(),
      date: String(date).trim(), // es: "2025-11-21"
      time: String(time).trim(), // es: "12:30"
      phone: phone ? String(phone).trim() : "",
      notes: notes ? String(notes).trim() : "",
    };

    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Leggo prima come testo, poi provo a convertirlo in JSON
    const text = await res.text();
    let data: any;

    try {
      data = JSON.parse(text);
    } catch {
      console.error("Risposta NON JSON da Apps Script:", text);
      return NextResponse.json(
        {
          success: false,
          error: "Errore nel collegamento al foglio prenotazioni.",
        },
        { status: 502 }
      );
    }

    // Se Apps Script ha segnalato un problema (orario occupato, data passata, ecc.)
    if (!res.ok || !data.success) {
      const errorMessage: string =
        data?.error ||
        data?.message ||
        "Non è stato possibile salvare la prenotazione.";

      // Se dallo script arriva conflict: true → 409 (conflitto orario)
      const status = data?.conflict ? 409 : 400;

      return NextResponse.json(
        {
          success: false,
          conflict: Boolean(data?.conflict),
          error: errorMessage,
        },
        { status }
      );
    }

    // Tutto OK
    return NextResponse.json(
      {
        success: true,
        rowNumber: data.rowNumber ?? null,
        message:
          data.message ?? "Prenotazione salvata correttamente.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Errore API /api/bookings:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Errore interno del server.",
      },
      { status: 500 }
    );
  }
}