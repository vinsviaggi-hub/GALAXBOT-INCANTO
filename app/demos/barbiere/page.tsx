// app/demos/barbiere/page.tsx

import ChatBox from "../../components/chatbox";

export default function BarbiereDemo() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #c048ff 0, #1a0b2e 55%, #050816 100%)",
        color: "#ffffff",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "32px 16px 40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 960 }}>
        {/* BADGE + TITOLO */}
        <header style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "4px 14px",
              borderRadius: 9999,
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.14)",
              fontSize: "0.78rem",
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Demo per barbieri e parrucchieri · GalaxBot AI
          </div>

          <h1
            style={{
              fontSize: "2.6rem",
              marginBottom: "10px",
              letterSpacing: 0.4,
            }}
          >
            GalaxBot AI × Barber Shop 💈✂️
          </h1>

          <p
            style={{
              opacity: 0.98,
              lineHeight: 1.7,
              maxWidth: 680,
              margin: "0 auto",
              fontSize: "1.05rem",
            }}
          >
            Un assistente intelligente che risponde ai clienti, gestisce
            appuntamenti, listino servizi e messaggi 24/7 direttamente su
            WhatsApp, Instagram o dal sito.
            <br />
            <strong>
              Lo stesso sistema può essere adattato anche a bar, pizzerie,
              studi medici, negozi, centri estetici e altre attività locali.
            </strong>
          </p>
        </header>

        {/* TRE CARDS SERVIZI */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "14px",
            marginBottom: "24px",
          }}
        >
          {/* CARD 1 */}
          <div
            style={{
              padding: "14px 16px",
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.32))",
              boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.28)",
              fontSize: "0.92rem",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                marginBottom: 4,
                color: "#ffffff",
              }}
            >
              📅 Prenotazioni automatiche
            </div>
            <div style={{ opacity: 0.9, color: "#ffffff" }}>
              Il bot raccoglie richieste di appuntamento e conferma gli orari in
              automatico, così tu pensi solo a tagliare.
            </div>
          </div>

          {/* CARD 2 */}
          <div
            style={{
              padding: "14px 16px",
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.32))",
              boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.28)",
              fontSize: "0.92rem",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                marginBottom: 4,
                color: "#ffffff",
              }}
            >
              💇 Info su tagli e trattamenti
            </div>
            <div style={{ opacity: 0.9, color: "#ffffff" }}>
              Spiega listino prezzi, durata dei trattamenti, servizi extra e
              regole del salone sempre allo stesso modo, senza dimenticare
              nulla.
            </div>
          </div>

          {/* CARD 3 */}
          <div
            style={{
              padding: "14px 16px",
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.32))",
              boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.28)",
              fontSize: "0.92rem",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                marginBottom: 4,
                color: "#ffffff",
              }}
            >
              📲 WhatsApp & Instagram
            </div>
            <div style={{ opacity: 0.9, color: "#ffffff" }}>
              Risponde ai clienti dove scrivono davvero: WhatsApp Business,
              Instagram DM o sito web, anche quando il negozio è chiuso.
            </div>
          </div>
        </section>

        {/* CTA + MODULO + ABBONAMENTO */}
        <section
          style={{
            textAlign: "center",
            marginBottom: "26px",
          }}
        >
          <p
            style={{
              fontSize: "0.98rem",
              opacity: 0.94,
              marginBottom: "16px",
              maxWidth: 720,
              marginInline: "auto",
            }}
          >
            👉{" "}
            <strong>
              Vuoi un chatbot come questo per il tuo barber shop o per un altro
              tipo di attività?
            </strong>{" "}
            Compila il modulo o scrivimi: ti preparo una demo personalizzata e,
            se ti piace, puoi attivare l&apos;abbonamento con l&apos;offerta di
            lancio.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "12px",
            }}
          >
            {/* BOTTONE MODULO GOOGLE */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdovcqFp8fcpmeq5ukeY7Qw4u4Xy7IGzzaYyyHmHQduJCj5Ew/viewform"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderRadius: 9999,
                padding: "11px 22px",
                background: "#22c55e",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              }}
            >
              Compila il modulo per la tua attività
            </a>

            {/* INSTAGRAM */}
            <a
              href="https://www.instagram.com/galaxbot_ai?igsh=MW9zNmNlcmtuMHE3cA%3D%3D&utm_source=qr"
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
                backdropFilter: "blur(6px)",
                background: "rgba(0,0,0,0.25)",
              }}
            >
              Scrivimi su Instagram
            </a>

            {/* STRIPE ABBONAMENTO */}
            <a
              href="https://buy.stripe.com/5kQ4gzbY30Vi6sP6uab3q02"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderRadius: 9999,
                padding: "11px 22px",
                background: "#ffdd00",
                color: "#000000",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                display: "inline-block",
              }}
            >
              Attiva subito l&apos;abbonamento
            </a>
          </div>

          <p
            style={{
              fontSize: "0.9rem",
              opacity: 0.9,
              marginTop: "4px",
              maxWidth: 720,
              marginInline: "auto",
            }}
          >
            💡 Abbonamento: <strong>29€/mese</strong>. Con il codice{" "}
            <span
              style={{
                fontWeight: 700,
                color: "#ffeb7a",
                textShadow: "0 0 6px rgba(255,235,122,0.7)",
                whiteSpace: "nowrap",
              }}
            >
              PROMO10
            </span>{" "}
            nel checkout paghi solo <strong>10€ il primo mese</strong>. Dopo il
            pagamento ti contatto io e configuro il bot sulla tua attività.
          </p>
        </section>

        {/* TITOLO CHAT */}
        <section style={{ textAlign: "center", marginBottom: "10px" }}>
          <h2
            style={{
              fontSize: "1.3rem",
              marginBottom: "6px",
            }}
          >
            Prova il chatbot in tempo reale 💬
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              opacity: 0.85,
            }}
          >
            Esempi di domande:{" "}
            <span style={{ opacity: 0.95 }}>
              “Posso prenotare un taglio domani?”, “Avete posto sabato
              pomeriggio?”, “Quanto costa taglio + barba?”, “Fate trattamenti
              per capelli ricci?”.
            </span>
          </p>
        </section>

        {/* BOX CHAT CON CORNICE */}
        <section
          style={{
            marginTop: "10px",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              padding: "2px",
              borderRadius: 28,
              background:
                "linear-gradient(135deg, rgba(255,80,80,0.9), rgba(80,160,255,0.9))",
            }}
          >
            <div
              style={{
                borderRadius: 24,
                background:
                  "radial-gradient(circle at top, #12142b 0, #050816 60%)",
                padding: "18px 18px 20px",
              }}
            >
              <ChatBox />
            </div>
          </div>
        </section>

        {/* NOTA FINALE */}
        <p
          style={{
            fontSize: "0.8rem",
            opacity: 0.7,
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          Questo è solo un esempio. Nel progetto reale colleghiamo GalaxBot AI
          al tuo WhatsApp Business, Instagram o sito web e lo adattiamo al tuo
          settore (barbiere, pizzeria, bar, studio medico, negozio, ecc.),
          gestendo per te messaggi, appuntamenti e prenotazioni.
        </p>
      </div>
    </main>
  );
}