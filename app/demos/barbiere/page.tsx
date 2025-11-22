// app/demos/barbiere/page.tsx
"use client";

import ChatBox from "../../components/chatbox";

const ISCRIVITI_URL = "/iscriviti";
const STRIPE_URL = "https://buy.stripe.com/5kQ4gzbY30Vi6sP6uab3q02";

export default function BarbiereDemoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 16px 60px",
        background:
          "radial-gradient(circle at top, #1d4ed8 0, #020617 55%, #000000 100%)",
        color: "#e5e7eb",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1040,
        }}
      >
        {/* BADGE + TITOLO */}
        <header
          style={{
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 14px",
              borderRadius: 9999,
              background: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(148,163,184,0.85)",
              fontSize: "0.75rem",
              letterSpacing: 1.1,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Demo bot avanzato per barber shop
          </div>

          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              marginBottom: 6,
            }}
          >
            Prenotazioni Barbiere BOT AVANZATO 💈
          </h1>

          <p
            style={{
              fontSize: "0.95rem",
              maxWidth: 640,
              margin: "0 auto",
              opacity: 0.88,
              lineHeight: 1.6,
            }}
          >
            Prova il chatbot in tempo reale. Puoi fare domande sui servizi oppure
            usare il box sotto per inviare una prenotazione automatica.
            Nel progetto reale lo colleghiamo al tuo WhatsApp, Instagram o sito.
          </p>

          {/* PULSANTI: COMPILA MODULO + ATTIVA ABBONAMENTO */}
          <div
            style={{
              marginTop: 18,
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <a
              href={ISCRIVITI_URL}
              style={{
                padding: "10px 18px",
                borderRadius: 9999,
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                background:
                  "linear-gradient(135deg, #22c55e, #a3e635)",
                color: "#022c22",
                boxShadow: "0 14px 30px rgba(22,163,74,0.55)",
                whiteSpace: "nowrap",
              }}
            >
              Compila il modulo per la tua attività
            </a>

            <a
              href={STRIPE_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "10px 18px",
                borderRadius: 9999,
                fontSize: "0.9rem",
                fontWeight: 700,
                textDecoration: "none",
                background:
                  "linear-gradient(135deg, #f97316, #facc15)",
                color: "#111827",
                boxShadow: "0 14px 30px rgba(234,88,12,0.6)",
                whiteSpace: "nowrap",
              }}
            >
              Attiva subito l&apos;abbonamento
            </a>
          </div>
        </header>

        {/* CARD PRINCIPALE: CHAT + PRENOTAZIONE */}
        <section>
          <div
            style={{
              background:
                "radial-gradient(circle at top, rgba(15,23,42,0.9), rgba(15,23,42,0.98))",
              borderRadius: 28,
              padding: 18,
              border: "1px solid rgba(148,163,184,0.7)",
              boxShadow: "0 24px 60px rgba(15,23,42,0.95)",
            }}
          >
            <div
              style={{
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  Prova il chatbot in tempo reale
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.8,
                  }}
                >
                  Esempi di domande: “Posso prenotare un taglio domani?”,
                  “Avete posto sabato pomeriggio?”, “Quanto costa taglio +
                  barba?”.
                </div>
              </div>
            </div>

            {/* Qui dentro c’è la chat + il modulo “Prenotazione veloce dal bot” */}
            <ChatBox />
          </div>

          <p
            style={{
              marginTop: 10,
              fontSize: "0.78rem",
              opacity: 0.6,
              textAlign: "center",
              maxWidth: 640,
              marginInline: "auto",
            }}
          >
            Questo è solo un esempio. Nel progetto reale colleghiamo GalaxBot AI
            al tuo WhatsApp Business, Instagram o sito web e lo adattiamo al tuo
            settore (barbiere, pizzeria, bar, studio medico, negozio, ecc.),
            così il bot si occupa di messaggi e prenotazioni al posto tuo.
          </p>
        </section>
      </div>
    </main>
  );
}