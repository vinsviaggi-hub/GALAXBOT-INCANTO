// app/demos/abbigliamento/page.tsx

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #a855f7 0, #312e81 45%, #020617 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#f9fafb",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 760, textAlign: "center" }}>
        <h1 style={{ fontSize: "2.4rem", marginBottom: "0.5rem" }}>
          GalaxBot AI × Negozio di Abbigliamento 👗
        </h1>

        <p
          style={{
            opacity: 0.9,
            lineHeight: 1.6,
            marginBottom: "1.6rem",
          }}
        >
          Demo di un chatbot per boutique e negozi di abbigliamento. Aiuta i
          clienti a trovare il prodotto giusto, capire le taglie e scoprire
          promozioni attive.
        </p>

        <ul
          style={{
            textAlign: "left",
            margin: "0 auto 1.5rem",
            maxWidth: 480,
            paddingLeft: "1.2rem",
            fontSize: "0.96rem",
            opacity: 0.95,
          }}
        >
          <li>🧥 Info su taglie, vestibilità e colori disponibili</li>
          <li>🛍️ Suggerimenti di outfit e abbinamenti</li>
          <li>📲 Link a prodotti sul sito o Instagram shop</li>
        </ul>

        <p
          style={{
            fontSize: "0.9rem",
            opacity: 0.85,
            marginBottom: "1.2rem",
          }}
        >
          Questo è un demo. Nel progetto reale colleghiamo il bot al tuo
          e-commerce o lo usiamo solo come assistente per DM e WhatsApp.
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
              background: "#ffffff",
              color: "#6d28d9",
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
            Voglio un chatbot per il mio negozio
          </a>
        </div>
      </div>
    </main>
  );
}