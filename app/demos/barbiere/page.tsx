// app/demos/barbiere/page.tsx
"use client";

import { useEffect, useState } from "react";
import ChatBox from "../../components/chatbox";

// Link diretto al Google Form di iscrizione
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdovcqFp8fcpmeq5ukeY7Qw4u4Xy7IGzzaYyyHmHQduJCj5Ew/viewform?usp=dialog";

const STRIPE_URL = "https://buy.stripe.com/5kQ4gzbY30Vi6sP6uab3q02";

export default function BarbiereDemoPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: isMobile ? "24px 8px 32px" : "40px 16px 60px",
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
          maxWidth: isMobile ? 480 : 1040, // 🔎 stringiamo tutto su mobile
        }}
      >
        {/* HEADER */}
        <header
          style={{
            marginBottom: isMobile ? 18 : 24,
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
              fontSize: isMobile ? "1.5rem" : "2rem",
              fontWeight: 800,
              marginBottom: 6,
            }}
          >
            Prenotazioni Barbiere BOT AVANZATO 💈
          </h1>

          <p
            style={{
              fontSize: "0.9rem",
              maxWidth: 640,
              margin: "0 auto",
              opacity: 0.88,
              lineHeight: 1.6,
            }}
          >
            Prova il chatbot in tempo reale. Puoi fare domande sui servizi
            oppure usare il box sotto per inviare una prenotazione automatica.
            Nel progetto reale lo colleghiamo al tuo WhatsApp, Instagram o sito.
          </p>

          {/* CTA: modulo + abbonamento */}
          <div
            style={{
              marginTop: 16,
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <a
              href={FORM_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "9px 16px",
                borderRadius: 9999,
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                background:
                  "linear-gradient(135deg, #22c55e, #a3e635)",
                color: "#022c22",
                boxShadow: "0 12px 26px rgba(22,163,74,0.55)",
                whiteSpace: "nowrap",
              }}
            >
              Compila subito il modulo per la tua attività
            </a>

            <a
              href={STRIPE_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "9px 16px",
                borderRadius: 9999,
                fontSize: "0.9rem",
                fontWeight: 700,
                textDecoration: "none",
                background:
                  "linear-gradient(135deg, #f97316, #facc15)",
                color: "#111827",
                boxShadow: "0 12px 26px rgba(234,88,12,0.6)",
                whiteSpace: "nowrap",
              }}
            >
              Attiva subito l&apos;abbonamento
            </a>
          </div>
        </header>

        {/* CONTENUTO PRINCIPALE */}
        <section
          style={{
            display: isMobile ? "flex" : "grid",
            flexDirection: isMobile ? "column" : undefined,
            gridTemplateColumns: isMobile
              ? undefined
              : "minmax(0,1.5fr) minmax(0,1fr)",
            gap: 20,
          }}
        >
          {/* CHAT + PRENOTAZIONE */}
          <div
            style={{
              background:
                "radial-gradient(circle at top, rgba(15,23,42,0.95), rgba(15,23,42,0.98))",
              borderRadius: 24,
              padding: isMobile ? 10 : 18,
              border: "1px solid rgba(148,163,184,0.7)",
              boxShadow: "0 20px 55px rgba(15,23,42,0.95)",
            }}
          >
            <div
              style={{
                marginBottom: 8,
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
                    fontSize: "0.78rem",
                    opacity: 0.8,
                  }}
                >
                  Esempi: “Posso prenotare un taglio domani?”, “Avete posto
                  sabato pomeriggio?”, “Quanto costa taglio + barba?”.
                </div>
              </div>
            </div>

            {/* 🔎 Limitiamo la larghezza della chat su mobile */}
            <div
              style={{
                maxWidth: isMobile ? 420 : 840,
                margin: "0 auto",
              }}
            >
              <ChatBox />
            </div>
          </div>

          {/* TESTO LATERALE (sotto su mobile) */}
          <aside
            style={{
              background: "rgba(15,23,42,0.98)",
              borderRadius: 24,
              padding: isMobile ? 10 : 16,
              border: "1px solid rgba(148,163,184,0.5)",
              fontSize: "0.84rem",
              boxShadow: "0 18px 45px rgba(15,23,42,0.9)",
            }}
          >
            <h2
              style={{
                fontSize: "0.98rem",
                margin: 0,
                marginBottom: 6,
                fontWeight: 700,
              }}
            >
              Come puoi usare questo bot nel tuo negozio
            </h2>
            <ul
              style={{
                paddingLeft: 18,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                lineHeight: 1.5,
              }}
            >
              <li>
                I clienti ti scrivono su WhatsApp, Instagram o dal sito e il
                bot risponde subito al posto tuo.
              </li>
              <li>
                Le richieste di appuntamento finiscono in un foglio che puoi
                controllare quando vuoi.
              </li>
              <li>
                Possiamo adattare lo stesso sistema a pizzerie, bar,
                pasticcerie, hotel, studi medici, negozi di abbigliamento e
                altri settori.
              </li>
            </ul>

            <p
              style={{
                marginTop: 10,
                fontSize: "0.78rem",
                opacity: 0.75,
              }}
            >
              Compilando il modulo ti preparo una versione personalizzata del
              bot sulla tua attività. Se ti piace, puoi attivare l&apos;
              abbonamento e usarlo tutti i giorni con i tuoi clienti.
            </p>
          </aside>
        </section>

        <footer
          style={{
            marginTop: 24,
            fontSize: "0.75rem",
            opacity: 0.6,
            textAlign: "center",
          }}
        >
          Questo è solo un esempio. Nel progetto reale colleghiamo GalaxBot AI
          al tuo WhatsApp Business, Instagram o sito web e lo adattiamo al tuo
          settore (barbiere, pizzeria, bar, studio medico, negozio, ecc.),
          così il bot si occupa di messaggi e prenotazioni al posto tuo.
        </footer>
      </div>
    </main>
  );
}