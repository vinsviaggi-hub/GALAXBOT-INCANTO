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
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              Prenotazioni Barbiere BOT AVANZATO 💈
            </h1>
            <p
              style={{
                fontSize: "0.95rem",
                opacity: 0.8,
                maxWidth: 640,
              }}
            >
              Prova il chatbot in tempo reale. Puoi fare domande sui servizi
              oppure prenotare direttamente con il box{" "}
              <strong>“Prenotazione veloce dal bot”</strong> sotto la chat.
              Le prenotazioni di prova finiscono in un foglio Google, come
              succederebbe per il barbiere reale.
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

        {/* BANNER ISTRUZIONI */}
        <section
          style={{
            marginBottom: 20,
            padding: "10px 14px",
            borderRadius: 16,
            background: "rgba(15,23,42,0.9)",
            border: "1px solid rgba(148,163,184,0.5)",
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
              Fai una domanda al bot nella chat in alto (orari, servizi,
              prezzi).
            </li>
            <li>
              Per registrare una{" "}
              <strong>prenotazione di prova</strong> usa il box{" "}
              <strong>“Prenotazione veloce dal bot”</strong> sotto la chat.
            </li>
            <li>
              Se scegli una data passata o un orario già occupato, il sistema
              ti avvisa e non salva la prenotazione.
            </li>
          </ul>
        </section>

        {/* CARD PRINCIPALE: CHAT + MODULO + INFO */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)",
            gap: 20,
            alignItems: "flex-start",
          }}
        >
          {/* COLONNA SINISTRA: CHAT + PRENOTAZIONE */}
          <div
            style={{
              background: "rgba(15,23,42,0.95)",
              borderRadius: 24,
              padding: 16,
              border: "1px solid rgba(148,163,184,0.6)",
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
                  Esempi di domande: “Posso prenotare un taglio domani?”,
                  “Avete posto sabato pomeriggio?”, “Quanto costa taglio +
                  barba?”.
                </div>
              </div>
            </div>

            {/* Qui dentro c’è sia CHAT che PRENOTAZIONE VELOCE */}
            <ChatBox />
          </div>

          {/* COLONNA DESTRA: RIASSUNTO VANTAGGI + CTA */}
          <aside
            style={{
              background: "rgba(15,23,42,0.95)",
              borderRadius: 24,
              padding: 16,
              border: "1px solid rgba(148,163,184,0.5)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              fontSize: "0.85rem",
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
                I clienti ti scrivono su WhatsApp, Instagram o dal sito e il
                bot risponde subito al posto tuo.
              </li>
              <li>
                Le richieste di appuntamento finiscono in un foglio Google che
                puoi controllare quando vuoi.
              </li>
              <li>
                Possiamo adattare questo sistema a pizzerie, bar, pasticcerie,
                hotel, studi medici, negozi di abbigliamento e altri settori.
              </li>
            </ul>

            {/* CARD VERDE: ISCRIZIONE + ABBONAMENTO */}
            <div
              style={{
                marginTop: 8,
                padding: "10px 12px 12px",
                borderRadius: 18,
                background:
                  "linear-gradient(135deg, rgba(34,197,94,0.18), rgba(59,130,246,0.16))",
                border: "1px solid rgba(74,222,128,0.5)",
                fontSize: "0.8rem",
                lineHeight: 1.5,
              }}
            >
              <p
                style={{
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                Compilando il{" "}
                <strong>modulo di iscrizione</strong> ti preparo una versione
                personalizzata del bot per la tua attività. Se ti piace, puoi
                attivare l&apos;abbonamento e collegarlo a WhatsApp Business,
                sito o solo come app con link + QR code.
              </p>

              <p
                style={{
                  margin: 0,
                  marginBottom: 8,
                  opacity: 0.9,
                }}
              >
                Quando clicchi sul pulsante, vai alla pagina{" "}
                <strong>Iscrizione GalaxBot AI</strong>. Da lì puoi aprire il{" "}
                <strong>modulo ufficiale su Google</strong>, che si apre in
                una nuova scheda: compili, invii e poi puoi semplicemente
                chiudere la scheda per tornare al sito.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginTop: 4,
                }}
              >
                {/* Bottone 1: va alla pagina /iscriviti */}
                <a
                  href="/iscriviti"
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "9px 12px",
                    borderRadius: 999,
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    background:
                      "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "#022c22",
                    boxShadow: "0 12px 30px rgba(22,163,74,0.55)",
                  }}
                >
                  Compila il modulo per il tuo bot
                </a>

                {/* Bottone 2: va direttamente al checkout Stripe */}
                <a
                  href="https://buy.stripe.com/5kQ4gzbY30Vi6sP6uab3q02"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "9px 12px",
                    borderRadius: 999,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    background:
                      "linear-gradient(135deg, #facc15, #f97316)",
                    color: "#1f2937",
                    boxShadow: "0 10px 24px rgba(245,158,11,0.55)",
                  }}
                >
                  Vedi prezzo e attiva l&apos;abbonamento
                </a>
              </div>
            </div>
          </aside>
        </section>

        {/* FOOTER DEMO */}
        <footer
          style={{
            marginTop: 32,
            fontSize: "0.75rem",
            opacity: 0.55,
            textAlign: "center",
          }}
        >
          Questo è solo un esempio. Nel progetto reale colleghiamo GalaxBot AI
          al tuo WhatsApp Business, Instagram o sito web e lo adattiamo al tuo
          settore (barbiere, pizzeria, bar, studio medico, negozio, ecc.),
          gestendo per te messaggi, appuntamenti e prenotazioni.
        </footer>
      </div>
    </main>
  );
}