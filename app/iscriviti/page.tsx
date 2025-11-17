export default function IscrivitiPage() {
  const formSrc =
    "https://docs.google.com/forms/d/e/1FAIpQLSdovcqFp8fcpmeq5ukeY7Qw4u4Xy7IGzzaYyyHmHQduJCj5Ew/viewform?embedded=true";

  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "40px 16px 64px",
        background:
          "radial-gradient(circle at top, #e0f2fe 0, #e5e7eb 40%, #e5e7eb 100%)",
        fontFamily:
          '-apple-system, system-ui, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        color: "#0f172a",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1180,
        }}
      >
        {/* Badge in alto */}
        <div
          style={{
            display: "inline-flex",
            padding: "4px 12px",
            borderRadius: 999,
            background: "rgba(15,23,42,0.06)",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Iscrizione servizio · GalaxBot AI
        </div>

        {/* Titolo + descrizione */}
        <header
          style={{
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              fontSize: 28,
              lineHeight: 1.2,
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Attiva GalaxBot AI per la tua attività 🚀
          </h1>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.5,
              color: "#1f2933",
              maxWidth: 720,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            Da questa pagina fai tutto: ci dai i dati del tuo negozio, guardi un
            demo del tuo settore e attivi l&apos;abbonamento mensile.
            <br />
            Noi configuriamo il chatbot su WhatsApp, Instagram o sito e ti
            inviamo i link pronti da usare.
          </p>

          <p
            style={{
              fontSize: 13,
              marginTop: 10,
              textAlign: "center",
            }}
          >
            Vuoi vedere cosa dicono altre attività?{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdKA4gx4djL3YUH1rNXjHIqP_MpjSX-m_0jXC8vMRxIWR4sWw/viewform"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "underline",
                fontWeight: 500,
              }}
            >
              Guarda le recensioni →
            </a>
          </p>
        </header>

        {/* Step indicator */}
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          {[
            {
              n: 1,
              title: "Compila il modulo",
              subtitle: "Nome attività, contatti e orari.",
            },
            {
              n: 2,
              title: "Scegli il tuo demo",
              subtitle: "Barbiere, pizzeria, studio, ecc.",
            },
            {
              n: 3,
              title: "Attiva l’abbonamento",
              subtitle: "Pagamento Stripe, disdetta autonoma.",
            },
          ].map((step) => (
            <div
              key={step.n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 14px",
                borderRadius: 999,
                background: "#020617",
                color: "white",
                boxShadow: "0 14px 40px rgba(15,23,42,0.35)",
                maxWidth: 260,
                width: "100%",
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "999px",
                  background:
                    "linear-gradient(135deg, #facc15 0%, #fb923c 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#0f172a",
                  flexShrink: 0,
                }}
              >
                {step.n}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    lineHeight: 1.1,
                  }}
                >
                  {step.title}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    opacity: 0.85,
                  }}
                >
                  {step.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Layout principale */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.95fr) minmax(0, 0.95fr)",
            gap: 20,
          }}
        >
          {/* Colonna 1: Modulo */}
          <section
            style={{
              background: "rgba(255,255,255,0.96)",
              borderRadius: 24,
              padding: 18,
              boxShadow: "0 22px 60px rgba(15,23,42,0.20)",
              border: "1px solid rgba(148,163,184,0.25)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <h2
              style={{
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 2,
              }}
            >
              1. Compila il modulo per il tuo negozio
            </h2>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                color: "#4b5563",
              }}
            >
              Inserisci i dati principali: nome attività, contatti, settore,
              orari e cosa vuoi che faccia il bot. Usiamo queste informazioni per
              preparare GalaxBot AI su misura per te.
            </p>

            <div
              style={{
                marginTop: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: 480,
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 18px 45px rgba(15,23,42,0.25)",
                  border: "1px solid rgba(148,163,184,0.45)",
                  backgroundColor: "#f9fafb",
                }}
              >
                <iframe
                  src={formSrc}
                  width="100%"
                  height="640"
                  style={{
                    border: "none",
                  }}
                  loading="lazy"
                >
                  Caricamento…
                </iframe>
              </div>
            </div>

            <p
              style={{
                fontSize: 11,
                marginTop: 6,
                color: "#6b7280",
              }}
            >
              Dopo l’invio del modulo ti contattiamo via email o WhatsApp per
              confermare i dettagli e mostrarti la demo personalizzata.
            </p>
          </section>

          {/* Colonna 2: Settori / demo */}
          <section
            style={{
              background: "rgba(248,250,252,0.98)",
              borderRadius: 24,
              padding: 18,
              boxShadow: "0 18px 50px rgba(15,23,42,0.18)",
              border: "1px solid rgba(148,163,184,0.3)",
            }}
          >
            <h2
              style={{
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              2. Guarda il demo del tuo settore
            </h2>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.45,
                color: "#4b5563",
                marginBottom: 12,
              }}
            >
              Apri il demo più vicino alla tua attività per vedere come GalaxBot
              AI potrebbe lavorare per te. Nel modulo di iscrizione potrai
              descrivere il bot su misura per il tuo locale.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 8,
                marginBottom: 10,
              }}
            >
              {[
                ["Barbiere / Parrucchiere", "/demos/barbiere"],
                ["Pizzeria", "/demos/pizzeria"],
                ["Bar / Caffetteria", "/demos/bar"],
                ["Gelateria", "/demos/gelateria"],
                ["Pasticceria / Bakery", "/demos/pasticceria"],
                ["Ristorante", "/demos/ristorante"],
                ["Centro estetico / Beauty", "/demos/estetica"],
                ["Parrucchiera donna", "/demos/parruchiera"],
                ["Studio medico / Dentista", "/demos/studiomedico"],
                ["Dentista", "/demos/dentista"],
                ["Veterinario", "/demos/veterinario"],
                ["Hotel / B&B", "/demos/hotel"],
                ["Negozi / E-commerce", "/demos/ecommerce"],
                ["Palestra / Fitness", "/demos/palestra"],
                ["Abbigliamento / Moda", "/demos/abbigliamento"],
                ["Altro settore", "/demos/link"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href as string}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(148,163,184,0.7)",
                    fontSize: 12,
                    fontWeight: 500,
                    background: "white",
                    textDecoration: "none",
                    color: "#0f172a",
                    textAlign: "center",
                    boxShadow: "0 6px 16px rgba(15,23,42,0.08)",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>

            <p
              style={{
                fontSize: 11,
                color: "#6b7280",
              }}
            >
              Hai un’attività diversa? Nel modulo puoi descrivere il bot che ti
              serve: lo adatteremo noi ai tuoi servizi e alle tue regole.
            </p>
          </section>

          {/* Colonna 3: Abbonamento */}
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(145deg, #fefce8 0%, #fffbeb 50%, #fef9c3 100%)",
                borderRadius: 22,
                padding: 18,
                boxShadow: "0 18px 50px rgba(15,23,42,0.25)",
                border: "1px solid rgba(234,179,8,0.65)",
              }}
            >
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#78350f",
                  marginBottom: 6,
                }}
              >
                3. Attiva l’abbonamento GalaxBot AI
              </h2>

              <p
                style={{
                  fontSize: 13,
                  marginBottom: 8,
                  color: "#854d0e",
                }}
              >
                Prezzo standard: <strong>29€/mese</strong>.  
                Nessun vincolo annuale: puoi gestire carta, fatture e disdetta
                dal portale clienti Stripe che riceverai dopo l’attivazione.
              </p>

              <div
                style={{
                  padding: 10,
                  borderRadius: 16,
                  border: "1px dashed rgba(234,179,8,0.9)",
                  background:
                    "linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)",
                  fontSize: 13,
                  marginBottom: 10,
                }}
              >
                <strong>PROMO LANCIO:</strong> usa il codice{" "}
                <strong>PROMO10</strong> per pagare{" "}
                <strong>10€ il primo mese</strong>, poi 29€/mese.
              </div>

              <a
                href="https://buy.stripe.com/5k4qzbv30Vi6sPcuba3q02" // <-- qui il tuo link Stripe
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  padding: "11px 16px",
                  borderRadius: 999,
                  background:
                    "linear-gradient(135deg, #facc15 0%, #f97316 50%, #ea580c 100%)",
                  color: "#0f172a",
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  boxShadow: "0 16px 40px rgba(234,88,12,0.6)",
                  marginBottom: 8,
                }}
              >
                Attiva ora il tuo abbonamento
              </a>

              <p
                style={{
                  fontSize: 11,
                  color: "#854d0e",
                }}
              >
                Nel checkout Stripe inserisci il codice{" "}
                <strong>PROMO10</strong> nel campo{" "}
                <strong>&quot;Codice promozionale&quot;</strong> per applicare
                lo sconto sul primo mese.
              </p>
            </div>

            <div
              style={{
                background: "#020617",
                color: "white",
                borderRadius: 22,
                padding: 16,
                boxShadow: "0 18px 50px rgba(15,23,42,0.6)",
                border: "1px solid rgba(148,163,184,0.35)",
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Cosa include l’abbonamento
              </h3>
              <ul
                style={{
                  fontSize: 12,
                  lineHeight: 1.5,
                  paddingLeft: 18,
                  margin: 0,
                }}
              >
                <li>
                  Configurazione iniziale del bot sulla tua attività
                  (settore, servizi, regole, orari, copy).
                </li>
                <li>
                  Collegamento a WhatsApp Business, Instagram o sito (dove
                  possibile).
                </li>
                <li>
                  Gestione messaggi, richieste info e prenotazioni 24/7.
                </li>
                <li>
                  Accesso al foglio con le richieste / prenotazioni per tenere
                  tutto sotto controllo.
                </li>
              </ul>

              <p
                style={{
                  fontSize: 11,
                  marginTop: 10,
                  opacity: 0.85,
                }}
              >
                Proseguendo accetti le condizioni del servizio GalaxBot AI.  
                Leggi{" "}
                <a
                  href="/termini"
                  style={{
                    color: "#e5e7eb",
                    textDecoration: "underline",
                  }}
                >
                  Termini d’uso
                </a>{" "}
                e{" "}
                <a
                  href="/privacy"
                  style={{
                    color: "#e5e7eb",
                    textDecoration: "underline",
                  }}
                >
                  Informativa privacy
                </a>
                .
              </p>
            </div>
          </section>
        </div>

        {/* Responsive semplice per mobile */}
        <style>{`
          @media (max-width: 960px) {
            main {
              padding: 24px 12px 40px !important;
            }
          }
          @media (max-width: 960px) {
            div[style*="grid-template-columns"] {
              display: flex !important;
              flex-direction: column !important;
            }
          }
        `}</style>
      </div>
    </main>
  );
}