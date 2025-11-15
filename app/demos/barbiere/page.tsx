// app/demos/barbiere/page.tsx

import ChatBox from "../../components/chatbox";

export default function BarbiereDemo() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #c048ff 0, #1a0b2e 55%, #050816 100%)",
        color: "#ffffff",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "32px 16px 40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 960 }}>
        {/* TITOLO */}
        <header style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "2.4rem",
              marginBottom: "8px",
              letterSpacing: 0.4,
            }}
          >
            GalaxBot AI × Barber Shop 💈✂️
          </h1>
          <p
            style={{
              opacity: 0.9,
              lineHeight: 1.6,
              maxWidth: 620,
              margin: "0 auto",
              fontSize: "0.98rem",
            }}
          >
            Questo è un demo interattivo del chatbot per barbieri e parrucchieri.
            Risponde ai clienti, gestisce prenotazioni, orari, listino servizi e ti libera dal telefono.
            Provalo qui sotto come se fosse il tuo salone.
          </p>
        </header>

        {/* CARDS SERVIZI */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "14px",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(0,0,0,0.2))",
              boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.22)",
              fontSize: "0.9rem",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              📅 Prenotazioni automatiche
            </div>
            <div style={{ opacity: 0.9 }}>
              Il bot raccoglie richieste di appuntamento e ti evita ore al telefono.
            </div>
          </div>

          <div
            style={{
              padding: "14px 16px",
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(0,0,0,0.2))",
              boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.22)",
              fontSize: "0.9rem",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              💇 Info chiare per i clienti
            </div>
            <div style={{ opacity: 0.9 }}>
              Spiega trattamenti, durata e prezzi in modo professionale e sempre uguale.
            </div>
          </div>

          <div
            style={{
              padding: "14px 16px",
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(0,0,0,0.2))",
              boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.22)",
              fontSize: "0.9rem",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              🕒 Sempre disponibile 24/7
            </div>
            <div style={{ opacity: 0.9 }}>
              Risponde anche quando sei pieno, chiuso o in ferie. Nessun messaggio rimane senza risposta.
            </div>
          </div>
        </section>

        {/* AVVISO DEMO + PULSANTI */}
        <section
          style={{
            textAlign: "center",
            marginBottom: "26px",
          }}
        >
          <p
            style={{
              fontSize: "0.86rem",
              opacity: 0.78,
              marginBottom: "14px",
            }}
          >
            Nella versione completa personalizziamo tutto sul tuo salone.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://www.instagram.com/galaxbot_ai?igsh=MW9zNmNlcmtuMHE3cA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderRadius: 9999,
                padding: "11px 22px",
                background: "#16a3ff",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              }}
            >
              Voglio un chatbot per il mio salone
            </a>

            <a
              href="https://www.instagram.com/galaxbot_ai?igsh=MW9zNmNlcmtuMHE3cA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderRadius: 9999,
                padding: "11px 22px",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "#ffffff",
                fontWeight: 500,
                fontSize: "0.95rem",
                textDecoration: "none",
                backdropFilter: "blur(6px)",
                background: "rgba(0,0,0,0.25)",
              }}
            >
              Scrivimi su Instagram
            </a>

            {/* BOTTONE ABBONAMENTO */}
            <a
              href="https://buy.stripe.com/5kQ4gzbY30Vi6sP6uab3q02"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderRadius: 9999,
                padding: "11px 22px",
                background: "#ffdd00",
                color: "#000000",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                display: "inline-block",
              }}
            >
              Attiva l’abbonamento (10€ il primo mese)
            </a>
          </div>

          {/* TESTO PROMO */}
          <p
            style={{
              fontSize: "0.85rem",
              opacity: 0.9,
              marginTop: "8px",
            }}
          >
            👉 Usa il codice promo <strong>PROMO10</strong> e paghi solo <strong>10€</strong> il primo mese.
          </p>
        </section>

        {/* TITOLO CHAT */}
        <section style={{ textAlign: "center", marginBottom: "10px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              marginBottom: "4px",
            }}
          >
            Prova il chatbot in tempo reale 💬
          </h2>
          <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
            Esempi: “Posso prenotare un taglio domani?”, “Avete posto sabato?”, “Quanto costa taglio + barba?”
          </p>
        </section>

        {/* BOX CHAT */}
        <section style={{ marginTop: "10px", marginBottom: "8px" }}>
          <div
            style={{
              padding: "2px",
              borderRadius: 28,
              background:
                "linear-gradient(135deg, rgba(255,80,80,0.9), rgba(80,160,255,0.9))",
            }}
          >
            <div
              style={{
                borderRadius: 24,
                background:
                  "radial-gradient(circle at top, #12142b 0, #050816 60%)",
                padding: "18px 18px 20px",
              }}
            >
              <ChatBox />
            </div>
          </div>
        </section>

        {/* NOTA FINALE */}
        <p
          style={{
            fontSize: "0.78rem",
            opacity: 0.7,
            textAlign: "center",
            marginTop: "8px",
          }}
        >
          Questo è solo un esempio. Nel progetto reale il bot si collega al tuo WhatsApp Business e Instagram,
          con pannello per gestire servizi, prezzi, orari, ferie e appuntamenti.
        </p>
      </div>
    </main>
  );
}