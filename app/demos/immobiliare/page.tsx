// app/demos/immobiliare/page.tsx

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #22d3ee 0, #0f172a 45%, #020617 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#e0f2fe",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 760, textAlign: "center" }}>
        <h1 style={{ fontSize: "2.4rem", marginBottom: "0.5rem" }}>
          GalaxBot AI × Agenzia Immobiliare 🏠
        </h1>

        <p
          style={{
            opacity: 0.92,
            lineHeight: 1.6,
            marginBottom: "1.6rem",
          }}
        >
          Demo di un chatbot per agenzie immobiliari. Qualifica i contatti,
          risponde alle domande base e raccoglie richieste su immobili in
          vendita o affitto.
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
          <li>📌 Raccoglie richieste di affitto, acquisto o valutazione</li>
          <li>💬 Filtra per zona, budget, tipo di immobile</li>
          <li>📲 Invia i dati del lead all’agenzia per il contatto diretto</li>
        </ul>

        <p
          style={{
            fontSize: "0.9rem",
            opacity: 0.85,
            marginBottom: "1.2rem",
          }}
        >
          Questo è un demo. Nel progetto reale integriamo il bot con il tuo
          gestionale o CRM, se lo utilizzi.
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
            Voglio un chatbot per la mia agenzia
          </a>
        </div>
      </div>
    </main>
  );
}