// app/demos/pizzeria/page.tsx

export default function PizzeriaDemo() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #ff9a3c 0, #1a0b2e 55%, #050816 100%)",
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
        <header style={{ textAlign: "center", marginBottom: "26px" }}>
          <h1
            style={{
              fontSize: "2.3rem",
              marginBottom: "8px",
              letterSpacing: 0.4,
            }}
          >
            GalaxBot AI × Pizzeria 🍕
          </h1>
          <p
            style={{
              opacity: 0.9,
              lineHeight: 1.6,
              maxWidth: 640,
              margin: "0 auto",
              fontSize: "0.98rem",
            }}
          >
            Esempio di come GalaxBot AI può lavorare per una pizzeria: risponde
            ai clienti, gestisce prenotazioni, ordini e info su consegne in
            automatico, 24 ore su 24.
          </p>
        </header>

        {/* 3 CARDS */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "14px",
            marginBottom: "24px",
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
              🍕 Ordini e prenotazioni
            </div>
            <div style={{ opacity: 0.9 }}>
              Il bot prende ordini, prenota tavoli e conferma in automatico,
              senza chiamate perse.
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
              📍 Info rapide ai clienti
            </div>
            <div style={{ opacity: 0.9 }}>
              Orari, indirizzo, consegna a domicilio, coperto, allergeni e
              promozioni spiegati dal bot in modo chiaro.
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
              📲 WhatsApp, Instagram o sito
            </div>
            <div style={{ opacity: 0.9 }}>
              Il bot risponde dove scrivono davvero i tuoi clienti: WhatsApp,
              Instagram DM o sito web.
            </div>
          </div>
        </section>

        {/* SPIEGAZIONE */}
        <section
          style={{
            marginBottom: "22px",
            padding: "16px 14px",
            borderRadius: 18,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.6))",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <h2
            style={{
              fontSize: "1.15rem",
              marginBottom: "8px",
            }}
          >
            Cosa potrebbe fare nella tua pizzeria?
          </h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.1rem",
              fontSize: "0.92rem",
              lineHeight: 1.7,
            }}
          >
            <li>Gestire richieste su menù, impasti, glutine e allergeni.</li>
            <li>Prendere ordini d’asporto e indicare tempi di consegna.</li>
            <li>Gestire prenotazioni tavoli e conferme automatiche.</li>
            <li>Comunicare promozioni, serate speciali e novità.</li>
          </ul>
          <p
            style={{
              marginTop: "10px",
              fontSize: "0.85rem",
              opacity: 0.8,
            }}
          >
            Questo è un esempio statico. Il chatbot effettivo sarà collegato ai
            tuoi orari, alle tue regole e al tuo menù.
          </p>
        </section>

        {/* CTA */}
        <section
          style={{
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          <p
            style={{
              fontSize: "0.92rem",
              opacity: 0.9,
              marginBottom: "14px",
            }}
          >
            Vuoi vedere la chat in azione? Guarda il demo completo per
            barbieri (stesso motore, adattato al tuo settore) oppure
            scrivimi direttamente.
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
              href="/demos/barbiere"
              style={{
                borderRadius: 9999,
                padding: "11px 22px",
                background: "#16a3ff",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
              }}
            >
              👀 Guarda il demo con chat
            </a>

            <a
              href="https://www.instagram.com/galaxbot_ai"
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
                background: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(6px)",
              }}
            >
              🍕 Scrivimi su Instagram
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}