// app/api/availability/route.ts
import { NextRequest, NextResponse } from "next/server";

// stessa URL che usi in /api/bookings
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz0W7HTl3FYsaY0q7di83Ujx1boiqNM577DasWSmGm711tRoZ86hTYaczMeQuMNUKg/exec";

type AvailabilityBody = {
  date?: string; // "YYYY-MM-DD"
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as AvailabilityBody | null;

    if (!body || !body.date) {
      return NextResponse.json(
        {
          success: false,
          error: "Data mancante per availability.",
        },
        { status: 400 }
      );
    }

    const payload = {
      action: "get_availability",
      date: String(body.date).trim(),
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
      console.error("Risposta NON JSON da Apps Script (availability):", text);
      return NextResponse.json(
        {
          success: false,
          error:
            "Errore nel collegamento al foglio prenotazioni (availability).",
        },
        { status: 502 }
      );
    }

    if (!gsRes.ok || !data.success) {
      const errorMessage: string =
        data?.error ||
        data?.message ||
        "Non è stato possibile leggere la disponibilità.";

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        { status: 400 }
      );
    }

    // OK: ritorno solo gli slot liberi
    return NextResponse.json(
      {
        success: true,
        date: data.date,
        freeSlots: Array.isArray(data.freeSlots) ? data.freeSlots : [],
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Errore API /api/availability:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Errore interno del server availability.",
      },
      { status: 500 }
    );
  }
}