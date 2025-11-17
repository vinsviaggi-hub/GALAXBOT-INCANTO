"use client";

// app/iscriviti/page.tsx

export default function IscrivitiPage() {
  return (
    <>
      <main
        className="iscr-main"
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top, #e5e7eb 0, #c7d2fe 35%, #e5e7eb 100%)",
          color: "#0f172a",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          padding: "32px 16px 48px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 1180 }}>
          {/* HEADER */}
          <header style={{ marginBottom: 24, textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 14px",
                borderRadius: 9999,
                background: "#f9fafb",
                border: "1px solid #d1d5db",
                fontSize: "0.74rem",
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#4b5563",
                marginBottom: 10,
              }}
            >
              Iscrizione servizio · GalaxBot AI
            </div>

            <h1
              style={{
                fontSize: "2.3rem",
                lineHeight: 1.15,
                marginBottom: 6,
                fontWeight: 800,
                color: "transparent",
                backgroundImage:
                  "linear-gradient(90deg,#111827,#1d4ed8,#6366f1,#111827)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              Attiva GalaxBot AI per la tua attività
            </h1>

            <p
              style={{
                opacity: 0.9,
                lineHeight: 1.7,
                maxWidth: 760,
                margin: "0 auto",
                fontSize: "0.96rem",
                color: "#374151",
              }}
            >
              Da questa pagina fai tutto: ci dai i dati del tuo negozio, guardi
              un demo del tuo settore e attivi l&apos;abbonamento mensile.
              <br />
              Noi configuriamo il chatbot su WhatsApp, Instagram o sito e ti
              inviamo i link pronti da usare.
            </p>

            {/* link alle recensioni */}
            <div
              style={{
                marginTop: 14,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <a
                href="/recensioni"
                style={{
                  fontSize: "0.86rem",
                  textDecoration: "none",
                  color: "#2563eb",
                  borderBottom: "1px solid rgba(37,99,235,0.35)",
                }}
              >
                Vuoi vedere cosa dicono le altre attività? Guarda le recensioni →
              </a>
            </div>
          </header>

          {/* MICRO STEP SOTTO IL TITOLO */}
          <section
            className="steps-row"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            {[
              {
                n: "1",
                t: "Compila il modulo",
                d: "Nome attività, contatti e orari.",
              },
              {
                n: "2",
                t: "Scegli il tuo demo",
                d: "Barbiere, pizzeria, studio, ecc.",
              },
              {
                n: "3",
                t: "Attiva l’abbonamento",
                d: "Pagamento Stripe, disdetta quando vuoi.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="step-pill"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 12px",
                  borderRadius: 9999,
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  fontSize: "0.82rem",
                  color: "#374151",
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "999px",
                    background: "#111827",
                    color: "#f9fafb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                  }}
                >
                  {step.n}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{step.t}</div>
                  <div style={{ fontSize: "0.78rem", opacity: 0.8 }}>
                    {step.d}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* LAYOUT 3 COLONNE */}
          <div className="iscr-grid">
            {/* COLONNA SINISTRA – MODULO */}
            <section className="iscr-col iscr-col-form">
              <h2
                style={{
                  fontSize: "1.02rem",
                  marginBottom: 6,
                }}
              >
                1. Compila il modulo per il tuo negozio
              </h2>
              <p
                style={{
                  fontSize: "0.86rem",
                  opacity: 0.9,
                  marginBottom: 10,
                  color: "#4b5563",
                  maxWidth: 480,
                }}
              >
                Inserisci i dati principali: nome attività, contatti, settore,
                orari e cosa vuoi che faccia il bot. Usiamo queste informazioni
                per preparare GalaxBot AI su misura per te.
              </p>

              <div
                className="form-card"
                style={{
                  borderRadius: 18,
                  padding: 10,
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 16px 40px rgba(15,23,42,0.15)",
                  maxWidth: 380,
                }}
              >
                {/* EMBED SOLO DESKTOP/TABLET */}
                <div className="form-embed">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLScaXQvokbWoOWdBtvbj4PZFt10saZ3k_GNi4qF13T41777fIg/viewform?embedded=true"
                    width="100%"
                    height="420"
                    style={{
                      border: "none",
                      borderRadius: 10,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    Caricamento…
                  </iframe>
                </div>

                {/* LINK SEMPRE VISIBILE (SU MOBILE È L’UNICO) */}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScaXQvokbWoOWdBtvbj4PZFt10saZ3k_GNi4qF13T41777fIg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="form-open-link"
                  style={{
                    display: "block",
                    marginTop: 8,
                    textAlign: "center",
                    fontSize: "0.82rem",
                    textDecoration: "none",
                    color: "#2563eb",
                  }}
                >
                  Compila il modulo a schermo intero →
                </a>
              </div>

              <p
                style={{
                  fontSize: "0.78rem",
                  opacity: 0.8,
                  marginTop: 6,
                  color: "#4b5563",
                }}
              >
                Dopo l&apos;invio del modulo ti contattiamo via email o WhatsApp
                per confermare i dettagli e mostrarti la demo personalizzata.
              </p>
            </section>

            {/* COLONNA CENTRALE – DEMO SETTORI */}
            <section className="iscr-col iscr-col-demo">
              <h2
                style={{
                  fontSize: "1.02rem",
                  marginBottom: 6,
                }}
              >
                2. Guarda il demo del tuo settore
              </h2>
              <p
                style={{
                  fontSize: "0.86rem",
                  opacity: 0.9,
                  marginBottom: 10,
                  color: "#4b5563",
                }}
              >
                Apri il demo più vicino alla tua attività per vedere come
                potrebbe lavorare il bot. I testi saranno poi adattati al tuo
                locale.
              </p>

              <div
                style={{
                  borderRadius: 18,
                  padding: "12px 12px 10px",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 16px 40px rgba(15,23,42,0.15)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 8,
                  }}
                >
                  {[
                    {
                      label: "Barbiere / Parrucchiere",
                      href: "/demos/barbiere",
                    },
                    { label: "Pizzeria", href: "/demos/pizzeria" },
                    { label: "Bar / Caffetteria", href: "/demos/bar" },
                    { label: "Ristorante", href: "/demos/ristorante" },
                    {
                      label: "Pasticceria / Bakery",
                      href: "/demos/pasticceria",
                    },
                    { label: "Gelateria", href: "/demos/gelateria" },
                    {
                      label: "Centro estetico / Beauty",
                      href: "/demos/estetica",
                    },
                    {
                      label: "Parrucchiera donna",
                      href: "/demos/parrucchiera",
                    },
                    {
                      label: "Studio medico / Professionisti",
                      href: "/demos/studiomedico",
                    },
                    { label: "Dentista", href: "/demos/dentista" },
                    { label: "Veterinario", href: "/demos/veterinario" },
                    { label: "Immobiliare", href: "/demos/immobiliare" },
                    {
                      label: "Negozio / E-commerce",
                      href: "/demos/ecommerce",
                    },
                    { label: "Hotel / B&B", href: "/demos/hotel" },
                    { label: "Palestra / Fitness", href: "/demos/palestra" },
                    {
                      label: "Abbigliamento / Moda",
                      href: "/demos/abbigliamento",
                    },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        padding: "8px 10px",
                        borderRadius: 9999,
                        textAlign: "center",
                        fontSize: "0.84rem",
                        fontWeight: 500,
                        textDecoration: "none",
                        color: "#0f172a",
                        background: "#ffffff",
                        border: "1px solid #e5e7eb",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <p
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.85,
                    marginTop: 8,
                    color: "#4b5563",
                  }}
                >
                  Non ti ritrovi in nessuna categoria? Nel modulo a sinistra
                  puoi descrivere la tua attività: il motore è lo stesso,
                  cambiano testi e regole.
                </p>
              </div>
            </section>

            {/* COLONNA DESTRA – ABBONAMENTO + INFO LEGALI */}
            <aside className="iscr-col iscr-col-right">
              {/* ABBONAMENTO STRIPE */}
              <section
                style={{
                  borderRadius: 18,
                  padding: "16px 18px 14px",
                  background: "#fefce8",
                  border: "1px solid #facc15",
                  boxShadow: "0 16px 40px rgba(15,23,42,0.18)",
                  marginBottom: 14,
                }}
              >
                <h2
                  style={{
                    fontSize: "1rem",
                    marginBottom: 6,
                    color: "#111827",
                  }}
                >
                  3. Attiva l&apos;abbonamento GalaxBot AI
                </h2>

                <p
                  style={{
                    fontSize: "0.88rem",
                    opacity: 0.95,
                    marginBottom: 8,
                    color: "#111827",
                  }}
                >
                  Prezzo standard: <strong>29€/mese</strong>.
                  <br />
                  Gestisci carta, fatture e disdetta in autonomia dal portale
                  clienti Stripe che riceverai dopo il primo pagamento.
                </p>

                <div style={{ marginBottom: 10 }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: 9999,
                      background: "#fef9c3",
                      border: "1px solid #facc15",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "#854d0e",
                    }}
                  >
                    PROMO LANCIO: codice{" "}
                    <span style={{ letterSpacing: 1 }}>PROMO10</span> →
                    <strong> 10€ il primo mese</strong>, poi 29€/mese.
                  </span>
                </div>

                <a
                  href="https://buy.stripe.com/5kQ4gzbY30Vi6sP6uab3q02"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 4,
                    borderRadius: 9999,
                    padding: "10px 20px",
                    background: "#facc15",
                    color: "#111827",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    boxShadow: "0 14px 30px rgba(15,23,42,0.3)",
                  }}
                >
                  Attiva ora il tuo abbonamento
                </a>

                <p
                  style={{
                    fontSize: "0.76rem",
                    opacity: 0.85,
                    marginTop: 6,
                    color: "#4b5563",
                  }}
                >
                  Nel checkout Stripe inserisci il codice{" "}
                  <strong>PROMO10</strong> nel campo &quot;Codice
                  promozionale&quot; per pagare solo 10€ il primo mese.
                </p>
              </section>

              {/* COSA INCLUDE */}
              <section
                style={{
                  borderRadius: 18,
                  padding: "12px 14px",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 14px 32px rgba(15,23,42,0.18)",
                  marginBottom: 14,
                }}
              >
                <h3
                  style={{
                    fontSize: "0.94rem",
                    marginBottom: 4,
                    color: "#111827",
                  }}
                >
                  Cosa include l&apos;abbonamento
                </h3>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "1.1rem",
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                    color: "#374151",
                  }}
                >
                  <li>Configurazione iniziale del bot sulla tua attività.</li>
                  <li>
                    Collegamento a WhatsApp Business, Instagram o sito (dove
                    possibile).
                  </li>
                  <li>Gestione messaggi, richieste info e appuntamenti 24/7.</li>
                  <li>Accesso al foglio con le richieste / prenotazioni.</li>
                </ul>
              </section>

              {/* TERMINI / PRIVACY */}
              <section
                style={{
                  borderRadius: 16,
                  padding: "9px 12px",
                  background: "rgba(15,23,42,0.96)",
                  border: "1px solid rgba(75,85,99,0.9)",
                  fontSize: "0.76rem",
                  color: "#e5e7eb",
                }}
              >
                <div style={{ marginBottom: 3 }}>
                  Proseguendo accetti le condizioni del servizio GalaxBot AI.
                </div>
                <div>
                  Leggi{" "}
                  <a
                    href="/termini"
                    style={{ color: "#38bdf8", textDecoration: "none" }}
                  >
                    Termini d&apos;uso
                  </a>{" "}
                  e{" "}
                  <a
                    href="/privacy"
                    style={{ color: "#38bdf8", textDecoration: "none" }}
                  >
                    Informativa privacy
                  </a>
                  .
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>

      {/* STILI RESPONSIVE */}
      <style jsx>{`
        .iscr-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.05fr) minmax(
              0,
              0.9fr
            );
          gap: 18px;
          align-items: flex-start;
        }

        .iscr-col {
          min-width: 0;
        }

        /* Tablet / desktop OK così, cambiamo solo sotto i 960px */
        @media (max-width: 960px) {
          .iscr-main {
            padding: 24px 12px 32px;
          }

          .iscr-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 20px;
          }

          .iscr-col-form {
            order: 1;
          }
          .iscr-col-demo {
            order: 2;
          }
          .iscr-col-right {
            order: 3;
          }

          .form-card {
            max-width: 100%;
          }
        }

        /* Mobile piccolo */
        @media (max-width: 640px) {
          .steps-row {
            flex-direction: column;
            align-items: stretch;
          }

          .step-pill {
            width: 100%;
          }

          /* Su mobile nascondiamo l'iframe e facciamo usare solo il link */
          .form-embed {
            display: none;
          }

          .form-open-link {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}