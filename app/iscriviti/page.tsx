// app/iscriviti/page.tsx

export default function IscrivitiPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #0b1120 0, #020617 50%, #000000 100%)",
        color: "#f9fafb",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "32px 16px 48px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1120 }}>
        {/* HEADER */}
        <header style={{ marginBottom: 28 }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 14px",
                borderRadius: 9999,
                background: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(148,163,184,0.7)",
                fontSize: "0.75rem",
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "999px",
                  background:
                    "radial-gradient(circle, #22c55e 0, #14532d 60%, transparent 100%)",
                  boxShadow: "0 0 12px rgba(34,197,94,0.8)",
                }}
              />
              Attivazione GalaxBot AI · Servizio professionale
            </div>

            <h1
              style={{
                fontSize: "2.4rem",
                lineHeight: 1.2,
                marginBottom: 8,
                letterSpacing: 0.3,
              }}
            >
              Attiva GalaxBot AI per la tua attività 🚀
            </h1>

            <p
              style={{
                opacity: 0.9,
                lineHeight: 1.7,
                maxWidth: 760,
                margin: "0 auto",
                fontSize: "0.96rem",
              }}
            >
              Da qui fai tutto: scegli il settore, compili i dati del tuo
              negozio e attivi l&apos;abbonamento mensile.
              <br />
              Poi configuriamo il tuo chatbot su WhatsApp, Instagram o sito e ti
              inviamo i link pronti da usare.
            </p>
          </div>

          {/* RIASSUNTO 3 STEP */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            {[
              {
                step: "Passo 1",
                title: "Scegli il tuo settore",
                text: "Guarda il demo più vicino alla tua attività (barbiere, pizzeria, bar, studio medico, ecc.).",
              },
              {
                step: "Passo 2",
                title: "Compila il modulo",
                text: "Inserisci nome del locale, contatti, orari e cosa vuoi che faccia il bot.",
              },
              {
                step: "Passo 3",
                title: "Attiva l’abbonamento",
                text: "Paghi con Stripe in modo sicuro, senza vincoli annuali. Puoi disdire dal portale clienti.",
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                style={{
                  borderRadius: 18,
                  padding: "12px 14px",
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))",
                  border: `1px solid ${
                    idx === 0
                      ? "rgba(59,130,246,0.7)"
                      : idx === 1
                      ? "rgba(45,212,191,0.7)"
                      : "rgba(250,204,21,0.7)"
                  }`,
                }}
              >
                <div
                  style={{
                    fontSize: "0.78rem",
                    opacity: 0.9,
                    marginBottom: 4,
                  }}
                >
                  {item.step}
                </div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  {item.title}
                </div>
                <div
                  style={{ fontSize: "0.86rem", opacity: 0.85, lineHeight: 1.55 }}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* CONTENUTO PRINCIPALE: 2 COLONNE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
            gap: 22,
          }}
        >
          {/* COLONNA SINISTRA: SETTORI + MODULO */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* STEP 1 – SETTORI */}
            <section>
              <h2
                style={{
                  fontSize: "1.1rem",
                  marginBottom: 8,
                }}
              >
                1️⃣ Scegli il settore della tua attività
              </h2>
              <p
                style={{
                  fontSize: "0.88rem",
                  opacity: 0.85,
                  marginBottom: 10,
                }}
              >
                Apri il demo del tuo settore per capire come GalaxBot AI può
                lavorare per te. I testi e le regole saranno poi adattati al tuo
                locale.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(170px, 1fr))",
                  gap: 8,
                }}
              >
                {[
                  { label: "Barbiere / Parrucchiere", href: "/demos/barbiere" },
                  { label: "Pizzeria", href: "/demos/pizzeria" },
                  { label: "Bar / Caffetteria", href: "/demos/bar" },
                  { label: "Ristorante", href: "/demos/ristorante" },
                  { label: "Pasticceria / Bakery", href: "/demos/pasticceria" },
                  { label: "Gelateria", href: "/demos/gelateria" },
                  { label: "Centro estetico / Beauty", href: "/demos/estetica" },
                  { label: "Parrucchiera donna", href: "/demos/parrucchiera" },
                  {
                    label: "Studio medico / Professionisti",
                    href: "/demos/studiomedico",
                  },
                  { label: "Dentista", href: "/demos/dentista" },
                  { label: "Veterinario", href: "/demos/veterinario" },
                  { label: "Immobiliare", href: "/demos/immobiliare" },
                  { label: "Negozio / E-commerce", href: "/demos/ecommerce" },
                  { label: "Hotel / B&B", href: "/demos/hotel" },
                  { label: "Palestra / Fitness", href: "/demos/palestra" },
                  { label: "Abbigliamento / Moda", href: "/demos/abbigliamento" },
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
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      textDecoration: "none",
                      color: "#e5e7eb",
                      background:
                        "linear-gradient(135deg, rgba(15,23,42,0.97), rgba(15,23,42,0.9))",
                      border: "1px solid rgba(148,163,184,0.85)",
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
                  opacity: 0.8,
                  marginTop: 8,
                }}
              >
                Hai un&apos;attività diversa? Nel modulo qui sotto puoi
                descriverla: adatteremo il bot al tuo caso.
              </p>
            </section>

            {/* STEP 2 – MODULO GOOGLE EMBED (ALTEZZA RIDOTTA) */}
            <section>
              <h2
                style={{
                  fontSize: "1.1rem",
                  marginBottom: 8,
                }}
              >
                2️⃣ Compila il modulo con i dati del tuo negozio
              </h2>
              <p
                style={{
                  fontSize: "0.88rem",
                  opacity: 0.86,
                  marginBottom: 10,
                  maxWidth: 720,
                }}
              >
                Inserisci i dati principali: nome attività, contatti, orari,
                servizi e richieste specifiche. Useremo queste informazioni per
                preparare il tuo GalaxBot AI.
              </p>

              <div
                style={{
                  borderRadius: 18,
                  padding: 8,
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,0.97), rgba(15,23,42,0.9))",
                  boxShadow: "0 18px 42px rgba(0,0,0,0.7)",
                  border: "1px solid rgba(148,163,184,0.9)",
                }}
              >
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLScaXQvokbWoOWdBtvbj4PZFt10saZ3k_GNi4qF13T41777fIg/viewform?embedded=true"
                  width="100%"
                  height="620"
                  style={{
                    border: "none",
                    borderRadius: 12,
                    backgroundColor: "#ffffff",
                  }}
                >
                  Caricamento…
                </iframe>
              </div>

              <p
                style={{
                  fontSize: "0.78rem",
                  opacity: 0.78,
                  marginTop: 6,
                }}
              >
                Dopo l&apos;invio del modulo ti contatteremo via email o
                WhatsApp per eventuali chiarimenti e per confermare i dettagli.
              </p>
            </section>
          </div>

          {/* COLONNA DESTRA: ABBONAMENTO + INFO LEGALI */}
          <aside
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* ABBONAMENTO STRIPE */}
            <section
              style={{
                borderRadius: 22,
                padding: "18px 18px 16px",
                background:
                  "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(15,23,42,0.9))",
                border: "1px solid rgba(250,204,21,0.85)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.75)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.05rem",
                  marginBottom: 6,
                }}
              >
                3️⃣ Attiva il tuo abbonamento GalaxBot AI
              </h2>

              <p
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.9,
                  marginBottom: 10,
                }}
              >
                Prezzo standard: <strong>29€/mese</strong>.
                <br />
                Nessun vincolo annuale: puoi disdire in autonomia dal portale
                clienti Stripe che ti invieremo dopo l&apos;attivazione.
              </p>

              <div
                style={{
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 11px",
                    borderRadius: 9999,
                    background:
                      "linear-gradient(135deg, rgba(250,204,21,0.12), rgba(252,211,77,0.3))",
                    border: "1px solid rgba(250,204,21,0.9)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
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
                  marginBottom: 6,
                  borderRadius: 9999,
                  padding: "11px 22px",
                  background:
                    "linear-gradient(135deg, #facc15, #fde68a)",
                  color: "#111827",
                  fontWeight: 700,
                  fontSize: "0.94rem",
                  textDecoration: "none",
                  boxShadow: "0 14px 40px rgba(0,0,0,0.7)",
                }}
              >
                Attiva ora il tuo abbonamento
              </a>

              <p
                style={{
                  fontSize: "0.78rem",
                  opacity: 0.8,
                  marginTop: 6,
                }}
              >
                Nel checkout Stripe inserisci il codice{" "}
                <strong>PROMO10</strong> nel campo &quot;Codice promozionale&quot;
                per applicare lo sconto del primo mese.
              </p>
            </section>

            {/* COME FUNZIONA */}
            <section
              style={{
                borderRadius: 22,
                padding: "14px 16px",
                background:
                  "linear-gradient(145deg, rgba(15,23,42,0.97), rgba(15,23,42,0.9))",
                border: "1px solid rgba(148,163,184,0.8)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.98rem",
                  marginBottom: 6,
                }}
              >
                Come funziona l&apos;attivazione
              </h3>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.1rem",
                  fontSize: "0.82rem",
                  lineHeight: 1.6,
                  opacity: 0.9,
                }}
              >
                <li>Compili il modulo con i dati della tua attività.</li>
                <li>
                  Completi il pagamento sicuro su Stripe con carta o wallet
                  supportati.
                </li>
                <li>
                  Configuriamo il tuo GalaxBot AI su WhatsApp, Instagram o sito
                  e ti inviamo i link.
                </li>
                <li>
                  Puoi gestire il tuo abbonamento (carta, fatture, disdetta)
                  dal portale clienti Stripe personale.
                </li>
              </ul>
            </section>

            {/* TERMINI / PRIVACY */}
            <section
              style={{
                borderRadius: 18,
                padding: "10px 14px",
                background: "rgba(15,23,42,0.96)",
                border: "1px solid rgba(75,85,99,0.9)",
                fontSize: "0.78rem",
                opacity: 0.9,
              }}
            >
              <div style={{ marginBottom: 4 }}>
                Continuando accetti le condizioni del servizio GalaxBot AI.
              </div>
              <div>
                Leggi{" "}
                <a
                  href="/termini"
                  style={{
                    color: "#38bdf8",
                    textDecoration: "none",
                  }}
                >
                  Termini d&apos;uso
                </a>{" "}
                e{" "}
                <a
                  href="/privacy"
                  style={{
                    color: "#38bdf8",
                    textDecoration: "none",
                  }}
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
  );
}