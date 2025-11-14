// app/demos/pasticceria/page.tsx

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #ffb5e8 0, #7b3ea7 45%, #050816 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 720, textAlign: "center" }}>
        <h1 style={{ fontSize: "2.4rem", marginBottom: "0.5rem" }}>
          GalaxBot AI × Pasticceria 🧁
        </h1>

        <p
          style={{
            opacity: 0.9,
            lineHeight: 1.6,
            marginBottom: "1.6rem",
          }}
        >
          Demo di un chatbot pensato per pasticcerie e bakery. Risponde ai
          clienti, raccoglie ordini personalizzati e promuove i dolci del
          giorno in automatico.
        </p>

        <ul
          style={{
            textAlign: "left",
            margin: "0 auto 1.5rem",
            maxWidth: 460,
            paddingLeft: "1.2rem",
            fontSize: "0.96rem",
            opacity: 0.95,
          }}
        >
          <li>🎂 Prenotazioni di torte personalizzate con gusti, scritte e data</li>
          <li>📲 Ordini da asporto via WhatsApp, sito o Instagram</li>
          <li>🍩 Promozione di prodotti in evidenza e offerte speciali</li>
        </ul>

        <p
          style={{
            fontSize: "0.9rem",
            opacity: 0.85,
            marginBottom: "1.2rem",
          }}
        >
          Questo è solo un esempio. Nel progetto reale inseriamo il tuo listino,
          le regole della tua pasticceria e il tuo stile di comunicazione.
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
              color: "#5b21ff",
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
            Voglio un chatbot per la mia pasticceria
          </a>
        </div>
      </div>
    </main>
  );
}