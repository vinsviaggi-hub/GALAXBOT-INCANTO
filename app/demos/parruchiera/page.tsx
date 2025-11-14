// app/demos/parrucchiera/page.tsx

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #ec4899 0, #4c1d95 45%, #020617 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fdf2f8",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 760, textAlign: "center" }}>
        <h1 style={{ fontSize: "2.4rem", marginBottom: "0.5rem" }}>
          GalaxBot AI × Salone Parrucchiera 💇‍♀️
        </h1>

        <p
          style={{
            opacity: 0.92,
            lineHeight: 1.6,
            marginBottom: "1.6rem",
          }}
        >
          Demo di un chatbot per saloni di parrucchieri. Gestisce prenotazioni,
          risponde alle domande e promuove trattamenti e pacchetti.
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
          <li>📅 Prenotazioni con giorno, orario e servizio richiesto</li>
          <li>✨ Presentazione di servizi: colore, piega, trattamenti, ecc.</li>
          <li>📲 Link diretto al profilo Instagram con foto prima/dopo</li>
        </ul>

        <p
          style={{
            fontSize: "0.9rem",
            opacity: 0.85,
            marginBottom: "1.2rem",
          }}
        >
          Questo è un demo. Nel progetto reale personalizziamo listino,
          disponibilità e stile del tuo salone.
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
              background: "#f9a8d4",
              color: "#4a044e",
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
            Voglio un chatbot per il mio salone
          </a>
        </div>
      </div>
    </main>
  );
}