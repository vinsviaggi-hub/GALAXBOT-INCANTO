// app/api/availability/route.ts
import { NextRequest, NextResponse } from "next/server";

// STESSO URL dello script che usi in /api/bookings
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz0W7HTl3FYsaY0q7di83Ujx1boiqNM577DasWSmGm711tRoZ86hTYaczMeQuMNUKg/exec";

// Orari di lavoro del barbiere (puoi cambiarli quando vuoi)
const WORKING_SLOTS: string[] = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];

type AvailabilityBody = {
  date?: string; // YYYY-MM-DD
};

async function getAvailability(date: string) {
  // chiedo allo script quali orari sono occupati
  const payload = {
    action: "get_busy_slots",
    date: date,
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
    console.error("[AVAILABILITY] Risposta NON JSON da Apps Script:", text);
    throw new Error("Errore nel collegamento al foglio prenotazioni.");
  }

  if (!data.success) {
    console.error("[AVAILABILITY] Errore Apps Script:", data);
    throw new Error(
      data.error || "Errore nel recupero degli orari occupati."
    );
  }

  const busyTimes: string[] = Array.isArray(data.busyTimes)
    ? data.busyTimes.map((t: any) => String(t))
    : [];

  // filtra gli slot di lavoro togliendo quelli occupati
  const availableTimes = WORKING_SLOTS.filter(
    (slot) => !busyTimes.includes(slot)
  );

  return { busyTimes, availableTimes };
}

// POST /api/availability  { date: "2025-12-29" }
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as AvailabilityBody | null;

    if (!body?.date) {
      return NextResponse.json(
        {
          success: false,
          error: "Parametro 'date' mancante (YYYY-MM-DD).",
        },
        { status: 400 }
      );
    }

    const date = String(body.date).trim();

    const { busyTimes, availableTimes } = await getAvailability(date);

    return NextResponse.json(
      {
        success: true,
        date,
        busyTimes,
        availableTimes,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[AVAILABILITY] Errore API:", err);
    return NextResponse.json(
      {
        success: false,
        error:
          err?.message || "Errore interno nel calcolo della disponibilità.",
      },
      { status: 500 }
    );
  }
}

// opzionale: GET /api/availability?date=2025-12-29
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      {
        success: false,
        error: "Parametro 'date' mancante (YYYY-MM-DD).",
      },
      { status: 400 }
    );
  }

  try {
    const { busyTimes, availableTimes } = await getAvailability(date);
    return NextResponse.json(
      {
        success: true,
        date,
        busyTimes,
        availableTimes,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[AVAILABILITY][GET] Errore API:", err);
    return NextResponse.json(
      {
        success: false,
        error:
          err?.message || "Errore interno nel calcolo della disponibilità.",
      },
      { status: 500 }
    );
  }
}