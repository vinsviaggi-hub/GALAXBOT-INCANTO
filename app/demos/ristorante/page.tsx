export default function RistoranteDemo() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #ffb347 0, #1e0840 55%, #050816 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: "2.4rem", marginBottom: "0.5rem" }}>
          GalaxBot AI × Ristorante 🍽️
        </h1>

        <p
          style={{
            opacity: 0.9,
            lineHeight: 1.6,
            marginBottom: "1.5rem",
            fontSize: "1rem",
          }}
        >
          Chatbot pensato per ristoranti. Gestisce prenotazioni, domande sul
          menù, allergie, orari e richieste speciali senza farti perdere tempo.
        </p>

        <ul
          style={{
            textAlign: "left",
            margin: "0 auto 1.5rem",
            maxWidth: 440,
            paddingLeft: "1.2rem",
            fontSize: "0.96rem",
            opacity: 0.95,
          }}
        >
          <li>📅 Prenotazioni automatiche con conferma istantanea</li>
          <li>🥗 Info su menù, allergeni, piatti del giorno</li>
          <li>📲 Integrazione con sito, Instagram e WhatsApp</li>
        </ul>

        <p
          style={{
            fontSize: "0.9rem",
            opacity: 0.85,
            marginBottom: "1.4rem",
          }}
        >
          Questo è un demo. Nel progetto reale inseriamo il tuo menù, le tue
          regole di prenotazione e il tono di voce del locale.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              border: "none",
              borderRadius: 9999,
              padding: "12px 26px",
              background: "#16a3ff",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.98rem",
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
          >
            Voglio un chatbot come questo
          </button>

          <a
            href="https://www.instagram.com/galaxbot_ai?igsh=MW9zNmNlcmtuMHE3cA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              borderRadius: 9999,
              padding: "12px 24px",
              border: "1px solid rgba(255,255,255,0.5)",
              color: "#ffffff",
              fontWeight: 500,
              fontSize: "0.96rem",
              textDecoration: "none",
              backdropFilter: "blur(6px)",
              background: "rgba(0,0,0,0.25)",
            }}
          >
            Scrivimi su Instagram
          </a>
        </div>
      </div>
    </div>
  );
}