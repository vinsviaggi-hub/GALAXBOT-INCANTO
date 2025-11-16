// app/demos/pizzeria/page.tsx

export default function PizzeriaDemo() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #f97316 0, #0f172a 45%, #020617 100%)",
        color: "#f9fafb",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "32px 16px 40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 980 }}>
        {/* HEADER */}
        <header
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "6px 14px",
              borderRadius: 9999,
              fontSize: "0.78rem",
              letterSpacing: 1,
              textTransform: "uppercase",
              background: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(248,250,252,0.16)",
              marginBottom: 12,
              opacity: 0.9,
            }}
          >
            Demo settore pizzeria · GalaxBot AI
          </div>

          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "10px",
              letterSpacing: 0.4,
              textShadow: "0 18px 40px rgba(0,0,0,0.7)",
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
            ai clienti, gestisce prenotazioni, ordini e informazioni su consegne
            in automatico, 24 ore su 24. Tu pensi solo ad infornare.
          </p>
        </header>

        {/* 3 CARDS SERVIZI */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "14px",
            marginBottom: "26px",
          }}
        >
          {/* CARD 1 */}
          <div
            style={{
              padding: "16px 16px",
              borderRadius: 18,
              background:
                "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(30,64,175,0.9))",
              boxShadow: "0 18px 40px rgba(0,0,0,0.6)",
              border: "1px solid rgba(248,250,252,0.16)",
              fontSize: "0.9rem",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 9999,
                  background: "rgba(248,250,252,0.12)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                }}
              >
                🍕
              </span>
              <span>Ordini e prenotazioni</span>
            </div>
            <div style={{ opacity: 0.9 }}>
              Il bot prende ordini d&apos;asporto, prenota tavoli e conferma in
              automatico, senza telefonate perse.
            </div>
          </div>

          {/* CARD 2 */}
          <div
            style={{
              padding: "16px 16px",
              borderRadius: 18,
              background:
                "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(190,24,93,0.9))",
              boxShadow: "0 18px 40px rgba(0,0,0,0.6)",
              border: "1px solid rgba(248,250,252,0.16)",
              fontSize: "0.9rem",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 9999,
                  background: "rgba(248,250,252,0.12)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                }}
              >
                📍
              </span>
              <span>Info rapide ai clienti</span>
            </div>
            <div style={{ opacity: 0.9 }}>
              Orari, indirizzo, coperto, consegna a domicilio, allergeni e
              promozioni: tutto spiegato dal bot in pochi secondi.
            </div>
          </div>

          {/* CARD 3 */}
          <div
            style={{
              padding: "16px 16px",
              borderRadius: 18,
              background:
                "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(22,163,74,0.9))",
              boxShadow: "0 18px 40px rgba(0,0,0,0.6)",
              border: "1px solid rgba(248,250,252,0.16)",
              fontSize: "0.9rem",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 9999,
                  background: "rgba(248,250,252,0.12)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                }}
              >
                📲
              </span>
              <span>WhatsApp, Instagram o sito</span>
            </div>
            <div style={{ opacity: 0.9 }}>
              Il bot risponde dove scrivono davvero i tuoi clienti: WhatsApp,
              Instagram DM o direttamente dal sito web.
            </div>
          </div>
        </section>

        {/* BOX GRANDE SPIEGAZIONE */}
        <section
          style={{
            marginBottom: "26px",
            padding: "18px 18px",
            borderRadius: 22,
            background:
              "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.92))",
            border: "1px solid rgba(148,163,184,0.4)",
            boxShadow: "0 24px 70px rgba(0,0,0,0.75)",
          }}
        >
          <h2
            style={{
              fontSize: "1.15rem",
              marginBottom: "10px",
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
            <li>Prendere ordini d&apos;asporto e indicare i tempi di consegna.</li>
            <li>Gestire prenotazioni tavoli e inviare conferme automatiche.</li>
            <li>
              Comunicare promozioni, serate speciali, menù fisso, formule
              &quot;all you can eat&quot; e serate evento.
            </li>
          </ul>
          <p
            style={{
              marginTop: "12px",
              fontSize: "0.85rem",
              opacity: 0.8,
            }}
          >
            Questo è un esempio statico. Nel progetto reale il chatbot viene
            collegato ai tuoi orari, alle tue regole, al tuo menù e – se vuoi –
            al gestionale o a un foglio ordini.
          </p>
        </section>

        {/* CTA FINALE */}
        <section
          style={{
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.94rem",
              opacity: 0.9,
              marginBottom: "16px",
            }}
          >
            Vuoi vedere una chat che risponde davvero da sola? Guarda il{" "}
            <span style={{ fontWeight: 600 }}>demo completo per barbieri</span>{" "}
            (stesso motore, adattato al tuo settore) oppure scrivimi su
            Instagram.
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
                padding: "11px 24px",
                background: "#16a3ff",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 18px 40px rgba(15,118,230,0.8)",
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
                padding: "11px 24px",
                border: "1px solid rgba(148,163,184,0.9)",
                color: "#e5e7eb",
                fontWeight: 500,
                fontSize: "0.95rem",
                textDecoration: "none",
                background:
                  "linear-gradient(145deg, rgba(15,23,42,0.9), rgba(15,23,42,0.7))",
                backdropFilter: "blur(8px)",
              }}
            >
              ✉️ Scrivimi su Instagram
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}