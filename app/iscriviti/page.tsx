// app/iscriviti/page.tsx

export default function IscrivitiPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #111827 0, #020617 55%, #020617 100%)",
        color: "#0f172a",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "32px 16px 48px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1180 }}>
        {/* HEADER SEMPLICE */}
        <header style={{ marginBottom: 28 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 14px",
                borderRadius: 9999,
                background: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(148,163,184,0.8)",
                fontSize: "0.74rem",
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#e5e7eb",
                marginBottom: 10,
              }}
            >
              Attivazione GalaxBot AI · Servizio professionale
            </div>

            <h1
              style={{
                fontSize: "2.35rem",
                lineHeight: 1.2,
                marginBottom: 6,
                letterSpacing: 0.3,
                color: "#f9fafb",
              }}
            >
              Attiva GalaxBot AI per la tua attività 🚀
            </h1>

            <p
              style={{
                opacity: 0.9,
                lineHeight: 1.7,
                maxWidth: 800,
                margin: "0 auto",
                fontSize: "0.98rem",
                color: "#e5e7eb",
              }}
            >
              In pratica: scegli il settore, compili il modulo con i dati del
              tuo negozio e attivi l&apos;abbonamento mensile.
              <br />
              Noi configuriamo il chatbot su WhatsApp, Instagram o sito e ti
              inviamo i link pronti da usare.
            </p>
          </div>
        </header>

        {/* LAYOUT A 3 COLONNE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1.05fr) minmax(0, 0.9fr)",
            gap: 20,
          }}
        >
          {/* COLONNA SINISTRA – MODULO */}
          <section>
            <h2
              style={{
                fontSize: "1.02rem",
                marginBottom: 6,
                color: "#f9fafb",
              }}
            >
              1. Compila il modulo con i dati del tuo negozio
            </h2>
            <p
              style={{
                fontSize: "0.86rem",
                opacity: 0.9,
                marginBottom: 10,
                color: "#e5e7eb",
                maxWidth: 480,
              }}
            >
              Nome attività, contatti, orari, servizi e cosa vuoi che faccia il
              bot. Usiamo queste informazioni per preparare il tuo GalaxBot AI.
            </p>

            <div
              style={{
                borderRadius: 18,
                padding: 10,
                background: "#f9fafb",
                boxShadow: "0 18px 40px rgba(15,23,42,0.65)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div style={{ maxWidth: 420, margin: "0 auto" }}>
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLScaXQvokbWoOWdBtvbj4PZFt10saZ3k_GNi4qF13T41777fIg/viewform?embedded=true"
                  width="100%"
                  height="460"
                  style={{
                    border: "none",
                    borderRadius: 10,
                    backgroundColor: "#ffffff",
                  }}
                >
                  Caricamento…
                </iframe>
              </div>
            </div>

            <p
              style={{
                fontSize: "0.78rem",
                opacity: 0.8,
                marginTop: 6,
                color: "#e5e7eb",
              }}
            >
              Dopo l&apos;invio del modulo ti contattiamo via email o WhatsApp
              per confermare i dettagli e mostrarti la demo personalizzata.
            </p>
          </section>

          {/* COLONNA CENTRALE – DEMO SETTORI */}
          <section>
            <h2
              style={{
                fontSize: "1.02rem",
                marginBottom: 6,
                color: "#f9fafb",
              }}
            >
              2. Guarda il demo del tuo settore
            </h2>
            <p
              style={{
                fontSize: "0.86rem",
                opacity: 0.9,
                marginBottom: 10,
                color: "#e5e7eb",
              }}
            >
              Apri il demo più vicino alla tua attività per vedere come potrebbe
              lavorare il bot. I testi saranno poi adattati al tuo locale.
            </p>

            <div
              style={{
                borderRadius: 18,
                padding: "12px 12px 10px",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                boxShadow: "0 18px 40px rgba(15,23,42,0.55)",
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
                  opacity: 0.8,
                  marginTop: 8,
                  color: "#4b5563",
                }}
              >
                Non rientri in nessuna categoria? Nel modulo a sinistra puoi
                spiegare la tua attività: il motore è lo stesso, cambiano solo
                testi e regole.
              </p>
            </div>
          </section>

          {/* COLONNA DESTRA – ABBONAMENTO + INFO LEGALI */}
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
                borderRadius: 18,
                padding: "16px 18px 14px",
                background: "#fefce8",
                border: "1px solid #facc15",
                boxShadow: "0 18px 40px rgba(15,23,42,0.55)",
              }}
            >
              <h2
                style={{
                  fontSize: "1rem",
                  marginBottom: 6,
                  color: "#0f172a",
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
                Puoi gestire carta, fatture e disdetta in autonomia dal portale
                clienti Stripe che ti invieremo dopo il primo pagamento.
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
                  boxShadow: "0 14px 30px rgba(15,23,42,0.55)",
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
                <strong>PROMO10</strong> nel campo &quot;Codice promozionale&quot;
                per pagare solo 10€ il primo mese.
              </p>
            </section>

            {/* COME FUNZIONA */}
            <section
              style={{
                borderRadius: 18,
                padding: "12px 14px",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                boxShadow: "0 14px 30px rgba(15,23,42,0.5)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.94rem",
                  marginBottom: 4,
                  color: "#111827",
                }}
              >
                In pratica cosa succede
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
                <li>Compili il modulo con i dati della tua attività.</li>
                <li>Completi il pagamento sicuro su Stripe.</li>
                <li>
                  Configuriamo il tuo GalaxBot AI e ti inviamo i link per
                  WhatsApp / Instagram / sito.
                </li>
                <li>
                  Dal portale clienti Stripe puoi scaricare fatture, cambiare
                  carta o disdire quando vuoi.
                </li>
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
  );
}