import { NextRequest, NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz0W7HTl3FYsaY0q7di83Ujx1boiqNM577DasWSmGm711tRoZ86hTYaczMeQuMNUKg/exec";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const date = (body?.date || "").trim();

    if (!date) {
      return NextResponse.json(
        { success: false, error: "Data mancante." },
        { status: 400 }
      );
    }

    const payload = {
      action: "get_booked_times",
      date,
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
      console.error("Risposta NON JSON da Apps Script (availability):", text);
      return NextResponse.json(
        {
          success: false,
          error: "Errore nel collegamento al foglio prenotazioni.",
        },
        { status: 502 }
      );
    }

    if (!gsRes.ok || !data.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            data?.error ||
            data?.message ||
            "Non è stato possibile leggere gli orari disponibili.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        bookedTimes: Array.isArray(data.bookedTimes)
          ? data.bookedTimes
          : [],
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Errore API /api/availability:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Errore interno del server.",
      },
      { status: 500 }
    );
  }
}