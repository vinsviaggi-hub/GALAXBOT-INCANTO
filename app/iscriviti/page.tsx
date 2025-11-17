// app/iscriviti/page.tsx

export default function IscrivitiPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1d2948 0, #020617 55%, #020617 100%)",
        color: "#0f172a",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "32px 16px 48px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1220 }}>
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
                background: "rgba(248,250,252,0.85)",
                border: "1px solid rgba(148,163,184,0.9)",
                fontSize: "0.75rem",
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "999px",
                  background:
                    "radial-gradient(circle, #16a34a 0, #166534 55%, transparent 100%)",
                  boxShadow: "0 0 10px rgba(22,163,74,0.9)",
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
                color: "#f9fafb",
              }}
            >
              Attiva GalaxBot AI per la tua attività 🚀
            </h1>

            <p
              style={{
                opacity: 0.95,
                lineHeight: 1.7,
                maxWidth: 820,
                margin: "0 auto",
                fontSize: "0.98rem",
                color: "#e5e7eb",
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
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            {[
              {
                step: "Passo 1",
                title: "Scegli il tuo settore",
                text: "Apri il demo più vicino alla tua attività: barbiere, pizzeria, bar, studio medico, ecc.",
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
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  borderRadius: 18,
                  padding: "12px 14px",
                  background: "rgba(248,250,252,0.96)",
                  border: "1px solid rgba(148,163,184,0.9)",
                  boxShadow: "0 14px 30px rgba(15,23,42,0.45)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.78rem",
                    opacity: 0.8,
                    marginBottom: 4,
                    color: "#4b5563",
                  }}
                >
                  {item.step}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    marginBottom: 4,
                    color: "#0f172a",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: "0.88rem",
                    opacity: 0.9,
                    color: "#111827",
                    lineHeight: 1.55,
                  }}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* CONTENUTO A 3 COLONNE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.1fr) minmax(0, 0.9fr)",
            gap: 18,
          }}
        >
          {/* COLONNA SINISTRA – MODULO */}
          <section>
            <h2
              style={{
                fontSize: "1.1rem",
                marginBottom: 8,
                color: "#f9fafb",
              }}
            >
              2️⃣ Compila il modulo con i dati del tuo negozio
            </h2>
            <p
              style={{
                fontSize: "0.88rem",
                opacity: 0.9,
                marginBottom: 10,
                color: "#e5e7eb",
                maxWidth: 520,
              }}
            >
              Inserisci i dati principali: nome attività, contatti, orari,
              servizi e richieste specifiche. Usiamo queste informazioni per
              preparare il tuo GalaxBot AI.
            </p>

            <div
              style={{
                borderRadius: 20,
                padding: 8,
                background: "#f9fafb",
                boxShadow: "0 20px 50px rgba(15,23,42,0.65)",
                border: "1px solid rgba(148,163,184,0.9)",
              }}
            >
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScaXQvokbWoOWdBtvbj4PZFt10saZ3k_GNi4qF13T41777fIg/viewform?embedded=true"
                width="100%"
                height="520"
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
                fontSize: "0.8rem",
                opacity: 0.8,
                marginTop: 6,
                color: "#e5e7eb",
              }}
            >
              Dopo l&apos;invio del modulo ti contatteremo via email o WhatsApp
              per confermare i dettagli del bot.
            </p>
          </section>

          {/* COLONNA CENTRALE – DEMO SETTORI */}
          <section>
            <h2
              style={{
                fontSize: "1.1rem",
                marginBottom: 8,
                color: "#f9fafb",
              }}
            >
              1️⃣ Scegli il settore della tua attività
            </h2>
            <p
              style={{
                fontSize: "0.88rem",
                opacity: 0.9,
                marginBottom: 10,
                color: "#e5e7eb",
              }}
            >
              Apri il demo del tuo settore per vedere come GalaxBot AI può
              lavorare per te. I contenuti saranno poi personalizzati sul tuo
              locale.
            </p>

            <div
              style={{
                borderRadius: 20,
                padding: "12px 12px 10px",
                background: "rgba(248,250,252,0.96)",
                border: "1px solid rgba(148,163,184,0.9)",
                boxShadow: "0 18px 40px rgba(15,23,42,0.5)",
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
                  { label: "Barbiere / Parrucchiere", href: "/demos/barbiere" },
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
                      fontSize: "0.84rem",
                      fontWeight: 500,
                      textDecoration: "none",
                      color: "#0f172a",
                      background:
                        "linear-gradient(135deg, #e5e7eb, #ffffff)",
                      border: "1px solid rgba(148,163,184,0.9)",
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
                  color: "#4b5563",
                }}
              >
                Non trovi il tuo settore? Nel modulo a sinistra puoi
                descriverlo: adatteremo il bot al tuo caso specifico.
              </p>
            </div>
          </section>

          {/* COLONNA DESTRA – ABBONAMENTO + INFO */}
          <aside
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* ABBONAMENTO STRIPE */}
            <section
              style={{
                borderRadius: 22,
                padding: "18px 18px 16px",
                background: "rgba(248,250,252,0.98)",
                border: "1px solid rgba(250,204,21,0.95)",
                boxShadow: "0 20px 50px rgba(15,23,42,0.65)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.05rem",
                  marginBottom: 6,
                  color: "#111827",
                }}
              >
                3️⃣ Attiva il tuo abbonamento GalaxBot AI
              </h2>

              <p
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.9,
                  marginBottom: 10,
                  color: "#111827",
                }}
              >
                Prezzo standard: <strong>29€/mese</strong>.
                <br />
                Nessun vincolo annuale: puoi gestire carta, fatture e disdetta
                dal portale clienti Stripe che riceverai dopo l&apos;attivazione.
              </p>

              <div style={{ marginBottom: 10 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 11px",
                    borderRadius: 9999,
                    background:
                      "linear-gradient(135deg, rgba(250,204,21,0.12), rgba(252,211,77,0.35))",
                    border: "1px solid rgba(250,204,21,0.95)",
                    fontSize: "0.8rem",
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
                  marginBottom: 6,
                  borderRadius: 9999,
                  padding: "11px 22px",
                  background:
                    "linear-gradient(135deg, #facc15, #fde68a)",
                  color: "#111827",
                  fontWeight: 800,
                  fontSize: "0.94rem",
                  textDecoration: "none",
                  boxShadow: "0 14px 38px rgba(15,23,42,0.6)",
                }}
              >
                Attiva ora il tuo abbonamento
              </a>

              <p
                style={{
                  fontSize: "0.78rem",
                  opacity: 0.82,
                  marginTop: 6,
                  color: "#4b5563",
                }}
              >
                Nel checkout Stripe inserisci il codice{" "}
                <strong>PROMO10</strong> nel campo &quot;Codice promozionale&quot;
                per applicare lo sconto sul primo mese.
              </p>
            </section>

            {/* COME FUNZIONA */}
            <section
              style={{
                borderRadius: 22,
                padding: "14px 16px",
                background: "rgba(248,250,252,0.98)",
                border: "1px solid rgba(148,163,184,0.9)",
                boxShadow: "0 16px 36px rgba(15,23,42,0.5)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.98rem",
                  marginBottom: 6,
                  color: "#111827",
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
                  color: "#374151",
                }}
              >
                <li>Compili il modulo con i dati della tua attività.</li>
                <li>
                  Completi il pagamento sicuro su Stripe con carta o wallet
                  supportati.
                </li>
                <li>
                  Configuriamo il tuo GalaxBot AI su WhatsApp, Instagram o sito
                  e ti inviamo i link pronti.
                </li>
                <li>
                  Puoi gestire abbonamento, carta, fatture e disdetta dal tuo
                  portale clienti Stripe personale.
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
                color: "#e5e7eb",
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