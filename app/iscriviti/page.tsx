// app/iscriviti/page.tsx

export default function IscrivitiPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #c048ff 0, #1a0b2e 55%, #050816 100%)",
        color: "#ffffff",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "32px 16px 48px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 980 }}>
        {/* HEADER */}
        <header style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-block",
              padding: "4px 14px",
              borderRadius: 9999,
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.18)",
              fontSize: "0.75rem",
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Attiva il tuo assistente · GalaxBot AI
          </div>

          <h1
            style={{
              fontSize: "2.3rem",
              lineHeight: 1.2,
              marginBottom: 8,
              letterSpacing: 0.4,
            }}
          >
            Attiva GalaxBot AI per la tua attività 🚀
          </h1>

          <p
            style={{
              opacity: 0.9,
              lineHeight: 1.7,
              maxWidth: 720,
              margin: "0 auto",
              fontSize: "0.97rem",
            }}
          >
            In questa pagina fai tutto: scegli il settore, compili i dati del
            tuo negozio e attivi l&apos;abbonamento.
            <br />
            GalaxBot AI risponde ai clienti, prende prenotazioni e gestisce le
            richieste 24/7 via WhatsApp, Instagram o sito.
          </p>
        </header>

        {/* STEP 1 – SETTORE */}
        <section style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontSize: "1.2rem",
              marginBottom: 10,
            }}
          >
            1️⃣ Scegli il settore della tua attività
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              opacity: 0.85,
              marginBottom: 12,
            }}
          >
            Apri il demo del tuo settore per vedere come potrebbe lavorare il
            bot per te. I testi e i dettagli verranno poi personalizzati sul tuo
            negozio.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 10,
            }}
          >
            {[
              { label: "Barbiere / Parrucchiere", href: "/demos/barbiere" },
              { label: "Pizzeria", href: "/demos/pizzeria" },
              { label: "Bar", href: "/demos/bar" },
              { label: "Ristorante", href: "/demos/ristorante" },
              { label: "Pasticceria / Bakery", href: "/demos/pasticceria" },
              { label: "Gelateria", href: "/demos/gelateria" },
              { label: "Centro estetico / Beauty", href: "/demos/estetica" },
              { label: "Parrucchiera donna", href: "/demos/parruchiera" },
              { label: "Studio medico / Dentista", href: "/demos/studiomedico" },
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
                  padding: "10px 12px",
                  borderRadius: 9999,
                  textAlign: "center",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "#ffffff",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(0,0,0,0.2))",
                  border: "1px solid rgba(255,255,255,0.24)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  backdropFilter: "blur(8px)",
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
            Hai un&apos;attività diversa? Nessun problema: nel modulo qui sotto
            puoi descriverla e adatteremo il bot al tuo caso.
          </p>
        </section>

        {/* STEP 2 – MODULO GOOGLE EMBED */}
        <section style={{ marginBottom: 32 }}>
          <h2
            style={{
              fontSize: "1.2rem",
              marginBottom: 10,
            }}
          >
            2️⃣ Compila il modulo con i dati del tuo negozio
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              opacity: 0.86,
              marginBottom: 12,
              maxWidth: 720,
            }}
          >
            Qui ci lasci le informazioni base: nome attività, contatti,
            orari, servizi principali e cosa vuoi che GalaxBot AI faccia per
            te. Useremo questi dati per configurare il tuo chatbot.
          </p>

          <div
            style={{
              borderRadius: 24,
              padding: 10,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(0,0,0,0.45))",
              boxShadow: "0 18px 45px rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScaXQvokbWoOWdBtvbj4PZFt10saZ3k_GNi4qF13T41777fIg/viewform?embedded=true"
              width="100%"
              height="760"
              style={{
                border: "none",
                borderRadius: 16,
                backgroundColor: "#ffffff",
              }}
            >
              Caricamento…
            </iframe>
          </div>

          <p
            style={{
              fontSize: "0.78rem",
              opacity: 0.75,
              marginTop: 8,
            }}
          >
            Dopo l&apos;invio del modulo ti contatteremo via email o WhatsApp
            per eventuali chiarimenti e per confermare l&apos;attivazione.
          </p>
        </section>

        {/* STEP 3 – ABBONAMENTO STRIPE */}
        <section style={{ marginBottom: 18, textAlign: "center" }}>
          <h2
            style={{
              fontSize: "1.2rem",
              marginBottom: 8,
            }}
          >
            3️⃣ Attiva il tuo abbonamento GalaxBot AI
          </h2>

          <p
            style={{
              fontSize: "0.92rem",
              opacity: 0.9,
              marginBottom: 10,
            }}
          >
            Prezzo standard: <strong>29€/mese</strong>.  
            <br />
            <span
              style={{
                display: "inline-block",
                marginTop: 4,
                padding: "4px 10px",
                borderRadius: 9999,
                background:
                  "linear-gradient(135deg, rgba(250,204,21,0.18), rgba(252,211,77,0.4))",
                border: "1px solid rgba(250,204,21,0.8)",
                fontSize: "0.82rem",
                fontWeight: 600,
              }}
            >
              PROMO: con il codice <span style={{ letterSpacing: 1 }}>PROMO10</span>{" "}
              paghi <strong>10€ il primo mese</strong>, poi 29€/mese.
            </span>
          </p>

          <a
            href="https://buy.stripe.com/5kQ4gzbY30Vi6sP6uab3q02"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: 6,
              marginBottom: 6,
              borderRadius: 9999,
              padding: "12px 26px",
              background:
                "linear-gradient(135deg, #facc15, #fde68a)", // giallo soft
              color: "#1f2933",
              fontWeight: 700,
              fontSize: "0.98rem",
              textDecoration: "none",
              boxShadow: "0 14px 40px rgba(0,0,0,0.55)",
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

        {/* NOTA FINALE */}
        <section style={{ marginTop: 10 }}>
          <p
            style={{
              fontSize: "0.78rem",
              opacity: 0.75,
              textAlign: "center",
              maxWidth: 760,
              margin: "0 auto",
            }}
          >
            Dopo il pagamento e l&apos;invio del modulo, configuriamo il tuo
            GalaxBot AI sul tuo canale principale (WhatsApp Business, Instagram
            o sito) e ti inviamo tutti i link utili, compreso quello per
            gestire autonomamente il tuo abbonamento (carta di pagamento,
            fatture, disdetta).
          </p>
        </section>
      </div>
    </main>
  );
}