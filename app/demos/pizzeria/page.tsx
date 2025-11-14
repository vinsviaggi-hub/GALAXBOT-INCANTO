// app/demos/pizzeria/page.tsx

export default function Page() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #ff9a3c 0, #17062b 55%, #050816 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 680, textAlign: "center" }}>
        <h1 style={{ fontSize: "2.4rem", marginBottom: "0.5rem" }}>
          GalaxBot AI × Pizzeria 🍕
        </h1>

        <p
          style={{
            opacity: 0.9,
            lineHeight: 1.6,
            marginBottom: "1.5rem",
            fontSize: "1rem",
          }}
        >
          Esempio di chatbot per pizzerie. Risponde ai clienti, prende ordini,
          gestisce prenotazioni e suggerisce combo e offerte del giorno in modo
          automatico.
        </p>

        <ul
          style={{
            textAlign: "left",
            margin: "0 auto 1.5rem",
            maxWidth: 420,
            paddingLeft: "1.2rem",
            fontSize: "0.96rem",
            opacity: 0.95,
          }}
        >
          <li>💬 Risposte su orari, menu e consegne</li>
          <li>📲 Ordini da WhatsApp, sito o Instagram</li>
          <li>🍕 Suggerimenti automatici di pizze e bevande</li>
        </ul>

        <p
          style={{
            fontSize: "0.9rem",
            opacity: 0.85,
            marginBottom: "1.2rem",
          }}
        >
          Questo è un demo. Nel progetto reale personalizziamo nome pizzeria,
          menù, prezzi e regole su misura.
        </p>

        <a
          href="https://www.instagram.com/galaxbot_ai?utm_source=qr"
          target="_blank"
          style={{
            display: "inline-block",
            borderRadius: 9999,
            padding: "12px 26px",
            background: "#16a3ff",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "0.98rem",
            textDecoration: "none",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          }}
        >
          Voglio un chatbot come questo
        </a>
      </div>
    </div>
  );
}