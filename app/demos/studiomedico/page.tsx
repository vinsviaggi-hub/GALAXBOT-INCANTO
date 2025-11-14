// app/demos/studiomediaco/page.tsx

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #22c1c3 0, #1e293b 45%, #020617 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#e0f2f1",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 760, textAlign: "center" }}>
        <h1 style={{ fontSize: "2.4rem", marginBottom: "0.5rem" }}>
          GalaxBot AI × Studio Medico 🩺
        </h1>

        <p
          style={{
            opacity: 0.92,
            lineHeight: 1.6,
            marginBottom: "1.6rem",
          }}
        >
          Demo di un chatbot per studi medici e poliambulatori. Aiuta a
          organizzare richieste e appuntamenti senza sostituire il medico.
        </p>

        <ul
          style={{
            textAlign: "left",
            margin: "0 auto 1.5rem",
            maxWidth: 480,
            paddingLeft: "1.2rem",
            fontSize: "0.96rem",
            opacity: 0.96,
          }}
        >
          <li>📅 Richieste di appuntamento per visite e controlli</li>
          <li>ℹ️ Informazioni su orari, recapiti, referti e documenti</li>
          <li>📍 Indicazioni pratiche per raggiungere lo studio</li>
        </ul>

        <p
          style={{
            fontSize: "0.9rem",
            opacity: 0.85,
            marginBottom: "1.2rem",
          }}
        >
          Questo è un demo. Nel progetto reale definiamo bene cosa può fare il
          bot e cosa va sempre lasciato al medico.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://www.instagram.com/galaxbot_ai?igsh=MW9zNmNlcmtuMHE3cA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            style={{
              borderRadius: 9999,
              padding: "11px 24px",
              background: "#ccfbf1",
              color: "#022c22",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
          >
            Scrivimi su Instagram
          </a>

          <a
            href="https://www.instagram.com/galaxbot_ai?igsh=MW9zNmNlcmtuMHE3cA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            style={{
              borderRadius: 9999,
              padding: "11px 24px",
              background: "#16a3ff",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
          >
            Voglio un chatbot per il mio studio medico
          </a>
        </div>
      </div>
    </main>
  );
}