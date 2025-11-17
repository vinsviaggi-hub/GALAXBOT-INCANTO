// app/iscriviti/page.tsx

import React from "react";

export default function IscrivitiPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #e0edff 0, #c7d2fe 22%, #0f172a 100%)",
        color: "#0f172a",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "24px 12px 40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1120 }}>
        {/* BADGE SOPRA TITOLO */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: 9999,
              background: "rgba(15,23,42,0.85)",
              color: "#e5e7eb",
              border: "1px solid rgba(148,163,184,0.8)",
            }}
          >
            Iscrizione servizio · GalaxBot AI
          </span>
        </div>

        {/* TITOLO + SOTTOTITOLO */}
        <header
          style={{
            textAlign: "center",
            marginBottom: 20,
            paddingInline: 8,
          }}
        >
          <h1
            style={{
              fontSize: "1.9rem",
              marginBottom: 6,
              fontWeight: 750,
              letterSpacing: 0.5,
              color: "#020617",
              textShadow: "0 0 14px rgba(15,23,42,0.35)",
            }}
          >
            Attiva <span style={{ color: "#2563eb" }}>GalaxBot AI</span> per la
            tua attività 🚀
          </h1>

          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.55,
              color: "#0f172a",
              maxWidth: 640,
              margin: "0 auto",
              opacity: 0.95,
            }}
          >
            Da questa pagina fai tutto: ci dai i dati del tuo negozio, guardi il{" "}
            <strong>demo del tuo settore</strong> e attivi l&apos;abbonamento
            mensile. Noi configuriamo il chatbot su WhatsApp, Instagram o sito e
            ti inviamo i link pronti da usare.
          </p>

          {/* LINK RECENSIONI */}
          <p
            style={{
              marginTop: 10,
              fontSize: "0.9rem",
            }}
          >
            Vuoi vedere cosa dicono altre attività?{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdKA4gx4djL3YUH1rNXjHIqP_MpjSX-m_0jXC8vMRxIWR4sWw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#2563eb",
                textDecoration: "underline",
                fontWeight: 500,
              }}
            >
              Guarda le recensioni →
            </a>
          </p>
        </header>

        {/* STEP PICCOLI IN ORIZZONTALE (MA SCORRONO BENE SU MOBILE) */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
            marginBottom: 22,
          }}
        >
          <StepPill
            number={1}
            title="Compila il modulo"
            subtitle="Nome attività, contatti e orari."
          />
          <StepPill
            number={2}
            title="Scegli il tuo demo"
            subtitle="Barbiere, pizzeria, studio, ecc."
          />
          <StepPill
            number={3}
            title="Attiva l’abbonamento"
            subtitle="Pagamento Stripe, disdetta autonoma."
          />
        </div>

        {/* CONTENUTO PRINCIPALE: LAYOUT MOBILE-FIRST */}
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            alignItems: "flex-start",
          }}
        >
          {/* COLONNA 1 – MODULO GOOGLE */}
          <div
            style={{
              flex: "1 1 310px",
              minWidth: 0,
              background: "rgba(255,255,255,0.98)",
              borderRadius: 18,
              padding: 14,
              boxShadow: "0 18px 45px rgba(15,23,42,0.40)",
              border: "1px solid rgba(148,163,184,0.6)",
            }}
          >
            <h2
              style={{
                fontSize: "0.98rem",
                marginBottom: 4,
                fontWeight: 650,
              }}
            >
              1. Compila il modulo per il tuo negozio
            </h2>
            <p
              style={{
                fontSize: "0.84rem",
                color: "#475569",
                marginBottom: 10,
              }}
            >
              Inserisci i dati principali: nome attività, contatti, settore,
              orari e cosa vuoi che faccia il bot. Usiamo queste informazioni per
              preparare GalaxBot AI su misura per te.
            </p>

            <div
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(148,163,184,0.7)",
                backgroundColor: "#f8fafc",
              }}
            >
              <iframe
                title="Modulo iscrizione GalaxBot AI"
                src="https://docs.google.com/forms/d/e/1FAIpQLScaXQvokbWoOWdBtvbj4PZFt10saZ3k_GNi4qF13T41777fIg/viewform?embedded=true"
                width="100%"
                height="520"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
              >
                Caricamento…
              </iframe>
            </div>

            <p
              style={{
                fontSize: "0.78rem",
                color: "#64748b",
                marginTop: 8,
              }}
            >
              Dopo l&apos;invio del modulo ti contattiamo via email o WhatsApp
              per confermare i dettagli e mostrarti il demo personalizzato.
            </p>
          </div>

          {/* COLONNA 2 – SETTORI / DEMO */}
          <div
            style={{
              flex: "1 1 260px",
              minWidth: 0,
              background: "rgba(15,23,42,0.90)",
              color: "#e5e7eb",
              borderRadius: 18,
              padding: 14,
              boxShadow: "0 18px 45px rgba(15,23,42,0.55)",
              border: "1px solid rgba(15,23,42,0.9)",
            }}
          >
            <h2
              style={{
                fontSize: "0.98rem",
                marginBottom: 4,
                fontWeight: 650,
              }}
            >
              2. Guarda il demo del tuo settore
            </h2>
            <p
              style={{
                fontSize: "0.84rem",
                color: "#cbd5f5",
                marginBottom: 10,
              }}
            >
              Apri il demo più vicino alla tua attività per vedere come potrebbe
              lavorare il bot nel tuo locale. Nel modulo di iscrizione, se vuoi,
              puoi descrivere un settore diverso o più specifico.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 6,
              }}
            >
              {/* PRIMA RIGA */}
              <DemoButton href="/demos/barbiere" label="Barbiere / Parrucchiere" />
              <DemoButton href="/demos/bar" label="Bar / Caffetteria" />
              <DemoButton href="/demos/pizzeria" label="Pizzeria" />
              <DemoButton href="/demos/ristorante" label="Ristorante" />
              {/* SECONDA RIGA */}
              <DemoButton href="/demos/pasticceria" label="Pasticceria / Bakery" />
              <DemoButton href="/demos/gelateria" label="Gelateria" />
              <DemoButton href="/demos/estetica" label="Centro estetico / Beauty" />
              <DemoButton href="/demos/parrucchiera" label="Parrucchiera donna" />
              {/* TERZA RIGA */}
              <DemoButton href="/demos/studiomedico" label="Studio medico / Professionisti" />
              <DemoButton href="/demos/dentista" label="Dentista" />
              <DemoButton href="/demos/veterinario" label="Veterinario" />
              <DemoButton href="/demos/hotel" label="Hotel / B&B" />
              {/* QUARTA RIGA */}
              <DemoButton href="/demos/ecommerce" label="Negozi / E-commerce" />
              <DemoButton href="/demos/palestra" label="Palestra / Fitness" />
              <DemoButton href="/demos/immobiliare" label="Immobiliare" />
              <DemoButton href="/demos/abbigliamento" label="Abbigliamento / Moda" />
            </div>

            <p
              style={{
                fontSize: "0.78rem",
                color: "#9ca3af",
                marginTop: 4,
              }}
            >
              Hai un&apos;attività diversa? Nel modulo puoi descrivere il bot e
              il tuo settore: il motore è lo stesso, cambiano testi, orari,
              regole e collegamenti.
            </p>
          </div>

          {/* COLONNA 3 – ABBONAMENTO STRIPE */}
          <div
            style={{
              flex: "0 1 260px",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.98)",
                borderRadius: 18,
                padding: 14,
                boxShadow: "0 18px 45px rgba(15,23,42,0.35)",
                border: "1px solid rgba(148,163,184,0.7)",
              }}
            >
              <h2
                style={{
                  fontSize: "0.98rem",
                  marginBottom: 4,
                  fontWeight: 650,
                }}
              >
                3. Attiva l’abbonamento GalaxBot AI
              </h2>
              <p
                style={{
                  fontSize: "0.84rem",
                  color: "#4b5563",
                  marginBottom: 6,
                }}
              >
                Prezzo standard: <strong>29€/mese</strong>. Nessun vincolo
                annuale: puoi gestire carta, fatture e disdetta in autonomia dal
                portale clienti Stripe che riceverai dopo l&apos;attivazione.
              </p>

              <div
                style={{
                  fontSize: "0.8rem",
                  marginBottom: 8,
                  padding: "6px 8px",
                  borderRadius: 10,
                  background:
                    "linear-gradient(135deg, rgba(250,204,21,0.9), rgba(251,113,133,0.9))",
                  color: "#1f2937",
                  fontWeight: 600,
                }}
              >
                PROMO LANCIO: codice{" "}
                <span style={{ fontWeight: 800 }}>PROMO10</span> →{" "}
                <strong>10€ il primo mese</strong>, poi 29€/mese.
              </div>

              <a
                href="https://buy.stripe.com/5kQ4gzbY30Vi6sP6uab3q02"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 9999,
                  background:
                    "linear-gradient(135deg, #facc15, #f97316)",
                  color: "#111827",
                  fontWeight: 750,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  boxShadow: "0 14px 35px rgba(15,23,42,0.45)",
                  marginBottom: 4,
                }}
              >
                Attiva ora il tuo abbonamento
              </a>

              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#4b5563",
                }}
              >
                Nel checkout Stripe inserisci il codice{" "}
                <strong>PROMO10</strong> nel campo &quot;Codice promozionale&quot; per
                pagare solo <strong>10€ il primo mese</strong>. Dopo il
                pagamento ti contatto e configuro il bot sulla tua attività.
              </p>
            </div>

            <div
              style={{
                background: "rgba(15,23,42,0.96)",
                color: "#e5e7eb",
                borderRadius: 18,
                padding: 12,
                boxShadow: "0 18px 45px rgba(15,23,42,0.65)",
                border: "1px solid rgba(15,23,42,0.9)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.94rem",
                  marginBottom: 4,
                  fontWeight: 650,
                }}
              >
                Cosa include l’abbonamento
              </h3>
              <ul
                style={{
                  paddingLeft: 18,
                  margin: 0,
                  fontSize: "0.82rem",
                  lineHeight: 1.55,
                  color: "#cbd5f5",
                }}
              >
                <li>Configurazione iniziale del bot sulla tua attività.</li>
                <li>
                  Collegamento a WhatsApp Business, Instagram o sito (dove possibile).
                </li>
                <li>Gestione messaggi, richieste info e appuntamenti 24/7.</li>
                <li>
                  Accesso al foglio con le richieste / prenotazioni per tenere
                  tutto in ordine.
                </li>
              </ul>
            </div>

            <div
              style={{
                marginTop: 4,
                padding: "8px 10px",
                borderRadius: 14,
                background: "rgba(15,23,42,0.90)",
                color: "#e5e7eb",
                fontSize: "0.76rem",
              }}
            >
              Proseguendo accetti le condizioni del servizio GalaxBot AI. <br />
              Leggi{" "}
              <a
                href="/termini"
                style={{
                  color: "#60a5fa",
                  textDecoration: "underline",
                }}
              >
                Termini d’uso
              </a>{" "}
              e{" "}
              <a
                href="/privacy"
                style={{
                  color: "#60a5fa",
                  textDecoration: "underline",
                }}
              >
                Informativa privacy
              </a>
              .
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/** PICCOLI COMPONENTI DI SUPPORTO */

function StepPill(props: {
  number: number;
  title: string;
  subtitle: string;
}) {
  const { number, title, subtitle } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 9999,
        background: "rgba(15,23,42,0.86)",
        color: "#e5e7eb",
        boxShadow: "0 6px 18px rgba(15,23,42,0.55)",
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "999px",
          background: "#facc15",
          color: "#111827",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 800,
        }}
      >
        {number}
      </div>
      <div style={{ lineHeight: 1.25 }}>
        <div style={{ fontSize: 11, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 10, opacity: 0.85 }}>{subtitle}</div>
      </div>
    </div>
  );
}

function DemoButton(props: { href: string; label: string }) {
  const { href, label } = props;
  return (
    <a
      href={href}
      style={{
        flex: "1 1 120px",
        textDecoration: "none",
        fontSize: "0.78rem",
        padding: "7px 10px",
        borderRadius: 9999,
        textAlign: "center" as const,
        background: "rgba(15,23,42,0.9)",
        border: "1px solid rgba(148,163,184,0.8)",
        color: "#e5e7eb",
        whiteSpace: "nowrap" as const,
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {label}
    </a>
  );
}