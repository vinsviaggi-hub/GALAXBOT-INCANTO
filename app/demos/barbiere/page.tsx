// app/demos/barbiere/page.tsx
"use client";

import ChatBox from "../../components/chatbox";

export default function BarbiereDemoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 16px 60px",
        background:
          "radial-gradient(circle at top, rgba(56,189,248,0.25), transparent 50%), radial-gradient(circle at bottom, rgba(147,51,234,0.35), #020617 70%)",
        color: "#e5e7eb",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
        }}
      >
        {/* HEADER */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 10px",
                borderRadius: 999,
                background: "rgba(15,23,42,0.85)",
                border: "1px solid rgba(148,163,184,0.7)",
                fontSize: 11,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 30% 0, #22c55e, #16a34a)",
                }}
              />
              <span>Demo bot avanzato per barber shop</span>
            </div>

            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              Prenotazioni Barbiere BOT AVANZATO 💈
            </h1>
            <p
              style={{
                fontSize: "0.95rem",
                opacity: 0.86,
                maxWidth: 620,
              }}
            >
              Prova il chatbot in tempo reale. Puoi fare domande sui servizi
              oppure prenotare direttamente con il box{" "}
              <strong>“Prenotazione veloce dal bot”</strong>. Le prenotazioni
              di prova finiscono in un foglio Google, come succederebbe per il
              barbiere reale.
            </p>
          </div>

          <div
            style={{
              padding: "10px 16px",
              borderRadius: 9999,
              border: "1px solid rgba(148,163,184,0.5)",
              background: "rgba(15,23,42,0.9)",
              fontSize: "0.8rem",
              textAlign: "right",
              lineHeight: 1.4,
              minWidth: 220,
            }}
          >
            <div style={{ fontWeight: 600 }}>GalaxBot AI x Barber Shop</div>
            <div style={{ opacity: 0.8 }}>
              Chat + prenotazioni automatiche da WhatsApp, Instagram o sito.
            </div>
          </div>
        </header>

        {/* SEZIONE ISTRUZIONI */}
        <section
          style={{
            marginBottom: 20,
            padding: "10px 14px",
            borderRadius: 16,
            background: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(148,163,184,0.6)",
            fontSize: "0.85rem",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div style={{ fontWeight: 600 }}>
            Come provare questa demo di prenotazione
          </div>
          <ul
            style={{
              paddingLeft: 18,
              margin: 0,
              opacity: 0.9,
              lineHeight: 1.5,
            }}
          >
            <li>
              Fai una domanda al bot nella{" "}
              <strong>chat in alto nella card</strong> (orari, servizi, prezzi).
            </li>
            <li>
              Per registrare una <strong>prenotazione di prova</strong> usa il
              box <strong>“Prenotazione veloce dal bot”</strong> sotto la chat.
            </li>
            <li>
              Se scegli una <strong>data passata</strong> o un{" "}
              <strong>orario già occupato</strong>, il sistema ti avvisa e non
              salva la prenotazione.
            </li>
          </ul>
        </section>

        {/* LAYOUT DUE COLONNE */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)",
            gap: 20,
          }}
        >
          {/* COLONNA SINISTRA: CHAT + PRENOTAZIONE */}
          <div
            style={{
              background: "rgba(15,23,42,0.96)",
              borderRadius: 24,
              padding: 16,
              border: "1px solid rgba(148,163,184,0.7)",
              boxShadow: "0 18px 50px rgba(15,23,42,0.9)",
            }}
          >
            <div
              style={{
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  Prova il chatbot in tempo reale
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.8,
                  }}
                >
                  Esempi: “Posso prenotare un taglio domani?”, “Avete posto
                  sabato pomeriggio?”, “Quanto costa taglio + barba?”.
                </div>
              </div>
            </div>

            {/* Qui dentro c’è sia CHAT che PRENOTAZIONE VELOCE */}
            <ChatBox />
          </div>

          {/* COLONNA DESTRA: SPIEGAZIONE + CTA */}
          <aside
            style={{
              background: "rgba(15,23,42,0.97)",
              borderRadius: 24,
              padding: 16,
              border: "1px solid rgba(148,163,184,0.6)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              fontSize: "0.86rem",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                margin: 0,
                fontWeight: 700,
              }}
            >
              Come puoi usare questo bot nel tuo negozio
            </h2>

            <ul
              style={{
                paddingLeft: 18,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                lineHeight: 1.5,
              }}
            >
              <li>
                I clienti ti scrivono su{" "}
                <strong>WhatsApp, Instagram o dal sito</strong> e il bot
                risponde subito al posto tuo.
              </li>
              <li>
                Le richieste di appuntamento finiscono in un{" "}
                <strong>foglio Google</strong> che puoi controllare quando vuoi.
              </li>
              <li>
                Possiamo adattare questo sistema a{" "}
                <strong>pizzerie, bar, pasticcerie, hotel, studi medici,
                negozi di abbigliamento</strong> e altri settori.
              </li>
            </ul>

            <div
              style={{
                marginTop: 8,
                padding: "10px 12px",
                borderRadius: 16,
                background:
                  "linear-gradient(135deg, rgba(34,197,94,0.18), rgba(59,130,246,0.18))",
                border: "1px solid rgba(74,222,128,0.45)",
                fontSize: "0.8rem",
                lineHeight: 1.5,
              }}
            >
              Compilando il modulo di iscrizione ti preparo una versione
              personalizzata del bot per la tua attività. Se ti piace, puoi
              attivare l’abbonamento e collegarlo a WhatsApp Business, sito o
              solo come app con link + QR code.
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 4,
              }}
            >
              <a
                href="/iscriviti"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 9999,
                  padding: "9px 14px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  background:
                    "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "#052e16",
                  boxShadow: "0 14px 30px rgba(34,197,94,0.5)",
                }}
              >
                Compila il modulo per il tuo bot
              </a>
              <a
                href="/iscriviti#abbonamento"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 9999,
                  padding: "8px 14px",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  border: "1px solid rgba(148,163,184,0.8)",
                  background: "rgba(15,23,42,0.6)",
                  color: "#e5e7eb",
                }}
              >
                Vedi prezzo e attiva l’abbonamento
              </a>
            </div>
          </aside>
        </section>

        {/* FOOTER DEMO */}
        <footer
          style={{
            marginTop: 30,
            fontSize: "0.75rem",
            opacity: 0.6,
            textAlign: "center",
          }}
        >
          Questa è solo una demo. Nel progetto reale colleghiamo GalaxBot AI al
          tuo WhatsApp Business, Instagram o sito web e lo adattiamo al tuo
          settore (barbiere, pizzeria, bar, studio medico, negozio, ecc.),
          gestendo per te messaggi, appuntamenti e prenotazioni.
        </footer>
      </div>
    </main>
  );
}