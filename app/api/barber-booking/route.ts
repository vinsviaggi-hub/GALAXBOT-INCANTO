// app/api/barber-booking/route.ts
import { NextRequest, NextResponse } from "next/server";

const BOOKING_WEBAPP_URL = process.env.BOOKING_WEBAPP_URL;

/**
 * Questa API fa da ponte tra il sito (o il bot WhatsApp)
 * e lo script Google Apps Script che salva le prenotazioni.
 *
 * Accetta JSON con:
 *  - action: "create_booking" | "get_availability"
 *  - campi aggiuntivi in base all'azione
 */
export async function POST(req: NextRequest) {
  if (!BOOKING_WEBAPP_URL) {
    console.error("[BOOKING] BOOKING_WEBAPP_URL non configurata");
    return NextResponse.json(
      {
        success: false,
        error:
          "Variabile BOOKING_WEBAPP_URL non configurata sul server. Controlla .env.local / Vercel.",
      },
      { status: 500 }
    );
  }

  let payload: any;

  try {
    payload = await req.json();
  } catch (err) {
    console.error("[BOOKING] Body JSON non valido:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Body JSON non valido.",
      },
      { status: 400 }
    );
  }

  const action = payload?.action;

  if (action !== "create_booking" && action !== "get_availability") {
    return NextResponse.json(
      {
        success: false,
        error:
          'Azione non valida. Usa "create_booking" o "get_availability".',
      },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(BOOKING_WEBAPP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // passo tutto il payload così com’è allo script Apps Script
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: any;

    try {
      data = JSON.parse(text);
    } catch {
      // in teoria Apps Script risponde sempre JSON, ma nel dubbio
      data = { raw: text };
    }

    if (!res.ok) {
      console.error(
        "[BOOKING] Errore da Apps Script:",
        res.status,
        res.statusText,
        data
      );
      return NextResponse.json(
        {
          success: false,
          error: "Errore dal server prenotazioni (Apps Script).",
          details: data,
        },
        { status: 500 }
      );
    }

    // Tutto ok: rimando la risposta di Apps Script così com’è
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[BOOKING] Errore di rete verso Apps Script:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Errore di rete verso il server prenotazioni.",
      },
      { status: 500 }
    );
  }
}