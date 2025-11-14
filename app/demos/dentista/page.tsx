// app/demos/dentista/page.tsx

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #38bdf8 0, #0f172a 45%, #020617 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#e5f3ff",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 760, textAlign: "center" }}>
        <h1 style={{ fontSize: "2.4rem", marginBottom: "0.5rem" }}>
          GalaxBot AI × Studio Dentistico 😷
        </h1>

        <p
          style={{
            opacity: 0.92,
            lineHeight: 1.6,
            marginBottom: "1.6rem",
          }}
        >
          Demo di un chatbot per studi dentistici. Aiuta a filtrare le richieste,
          gestire appuntamenti e fornire informazioni base ai pazienti.
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
          <li>📅 Richiesta appuntamenti per visite, igiene e controlli</li>
          <li>ℹ️ Info su orari, convenzioni e servizi disponibili</li>
          <li>📍 Come raggiungere lo studio e dove parcheggiare</li>
        </ul>

        <p
          style={{
            fontSize: "0.9rem",
            opacity: 0.85,
            marginBottom: "1.2rem",
          }}
        >
          Questo è un demo. Nel progetto reale il chatbot non dà diagnosi, ma
          organizza meglio il flusso di richieste.
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
              background: "#e0f2fe",
              color: "#0f172a",
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
            Voglio un chatbot per il mio studio
          </a>
        </div>
      </div>
    </main>
  );
}