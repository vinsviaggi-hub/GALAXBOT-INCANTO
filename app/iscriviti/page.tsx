// app/iscriviti/page.tsx

import React from "react";

export const metadata = {
  title: "Iscrizione GalaxBot AI",
  description:
    "Attiva GalaxBot AI per il tuo negozio o studio: compila il modulo, guarda il demo e attiva l’abbonamento.",
};

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdovcqFp8fcpmeq5ukeY7Qw4u4Xy7IGzzaYyyHmHQduJCj5Ew/viewform?embedded=true";

const recensioniUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdKA4gx4djL3YUH1rNXjHIqP_MpjSX-m_0jXC8vMRxIWR4sWw/viewform";

// 👉 LINK STRIPE (sostituisci # con i tuoi link reali quando li hai)
const STRIPE_BASE_URL = "#"; // Piano Base – solo bot info
const STRIPE_APP_CHAT_URL =
  "https://buy.stripe.com/5kQ4gzbY30Vi6sP6uab3q02"; // Piano App + Chat (29€/mese)
const STRIPE_WHATSAPP_URL = "#"; // TODO: inserisci link checkout WhatsApp
const STRIPE_INSTAGRAM_URL = "#"; // TODO: inserisci link checkout Instagram

const demoSettori: { label: string; href: string }[] = [
  { label: "Barbiere / Parrucchiere", href: "/demos/barbiere" },
  { label: "Bar / Caffetteria", href: "/demos/bar" },
  { label: "Pasticceria / Bakery", href: "/demos/pasticceria" },
  { label: "Centro estetico / Beauty", href: "/demos/estetica" },
  { label: "Studio medico / Dentista", href: "/demos/studiomedico" },
  { label: "Veterinario", href: "/demos/veterinario" },
  { label: "Negozi / E-commerce", href: "/demos/ecommerce" },
  { label: "Palestra / Fitness", href: "/demos/palestra" },
  { label: "Pizzeria", href: "/demos/pizzeria" },
  { label: "Ristorante", href: "/demos/ristorante" },
  { label: "Gelateria", href: "/demos/gelateria" },
  { label: "Parrucchiera donna", href: "/demos/parrucchiera" },
  { label: "Hotel / B&B", href: "/demos/hotel" },
  { label: "Immobiliare", href: "/demos/immobiliare" },
  { label: "Abbigliamento / Moda", href: "/demos/abbigliamento" },
  { label: "Altro settore", href: "/demos/app" },
];

export default function IscrivitiPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #eef2ff 0, #dfe7fd 25%, #cfd9f9 50%, #c7d2fe 75%, #e5e7eb 100%)",
        padding: "32px 12px 56px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
        }}
      >
        {/* BADGE */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 12px",
            borderRadius: 999,
            background: "rgba(15,23,42,0.06)",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 0.3,
            textTransform: "uppercase",
            marginBottom: 10,
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
          <span>Iscrizione servizio · GalaxBot AI</span>
        </div>

        {/* TITOLO + INTRO */}
        <h1
          style={{
            fontSize: "clamp(1.9rem, 3vw, 2.35rem)",
            lineHeight: 1.1,
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: 8,
          }}
        >
          Attiva GalaxBot AI per la tua attività 🚀
        </h1>

        <p
          style={{
            maxWidth: 680,
            fontSize: 15,
            lineHeight: 1.6,
            color: "#1f2937",
            marginBottom: 8,
          }}
        >
          Da questa pagina fai tutto: ci dai i dati del tuo negozio, guardi un
          demo del tuo settore e scegli il piano di abbonamento.
          <br />
          Noi configuriamo il chatbot su WhatsApp, Instagram, sito{" "}
          <strong>oppure solo come app dedicata (link + QR code)</strong> e ti
          inviamo i link pronti da usare.
        </p>

        <a
          href={recensioniUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            color: "#2563eb",
            textDecoration: "none",
            marginTop: 4,
            marginBottom: 20,
          }}
        >
          Vuoi vedere cosa dicono altre attività?{" "}
          <span
            style={{
              textDecoration: "underline",
            }}
          >
            Guarda le recensioni →
          </span>
        </a>

        {/* STEP 1-2-3 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 22,
          }}
        >
          <StepPill
            step={1}
            title="Compila il modulo"
            subtitle="Nome attività, contatti, orari."
          />
          <StepPill
            step={2}
            title="Guarda il demo"
            subtitle="Barbiere, pizzeria, studio, ecc."
          />
          <StepPill
            step={3}
            title="Scegli il piano"
            subtitle="Bot base, App+Chat, WhatsApp, Instagram."
          />
        </div>

        {/* LAYOUT 3 SEZIONI */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {/* COLONNA 1: MODULO GOOGLE FORM */}
          <section
            style={{
              flex: "1 1 360px",
              minWidth: 0,
              background: "rgba(255,255,255,0.95)",
              borderRadius: 24,
              padding: 18,
              boxShadow:
                "0 18px 45px rgba(15,23,42,0.12), 0 0 0 1px rgba(148,163,184,0.18)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2
              style={{
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 6,
                color: "#0f172a",
              }}
            >
              1. Compila il modulo per il tuo negozio
            </h2>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: "#4b5563",
                marginBottom: 10,
              }}
            >
              Inserisci i dati principali: nome attività, contatti, settore,
              orari, link social e dove vuoi usare il bot (WhatsApp, Instagram,
              sito o solo app). Puoi anche caricare il tuo listino o menù (PDF o
              foto): lo usiamo per preparare GalaxBot AI su misura per te.
            </p>

            <div
              style={{
                flex: 1,
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid rgba(148,163,184,0.7)",
                background: "#f9fafb",
              }}
            >
              <iframe
                src={FORM_URL}
                width="100%"
                height="520"
                style={{
                  border: "none",
                  background: "white",
                }}
                loading="lazy"
              >
                Caricamento modulo…
              </iframe>
            </div>

            <p
              style={{
                marginTop: 8,
                fontSize: 11,
                color: "#6b7280",
              }}
            >
              Se vedi una schermata che chiede di{" "}
              <strong>accettare i cookie di Google</strong>, conferma e poi
              compila il modulo: è la procedura standard di Google Forms.
            </p>

            <p
              style={{
                marginTop: 4,
                fontSize: 11,
                color: "#6b7280",
              }}
            >
              Dopo l&apos;invio del modulo ti contattiamo via email o WhatsApp
              per confermare i dettagli e mostrarti una demo personalizzata del
              tuo bot.
            </p>
          </section>

          {/* COLONNA 2: DEMO SETTORI */}
          <section
            style={{
              flex: "1 1 300px",
              minWidth: 0,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,0.96))",
              borderRadius: 24,
              padding: 18,
              boxShadow:
                "0 18px 45px rgba(15,23,42,0.08), 0 0 0 1px rgba(148,163,184,0.16)",
            }}
          >
            <h2
              style={{
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 6,
                color: "#0f172a",
              }}
            >
              2. Guarda il demo del tuo settore
            </h2>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: "#4b5563",
                marginBottom: 12,
              }}
            >
              Apri il demo più vicino alla tua attività per vedere come GalaxBot
              AI potrebbe lavorare per te. Le pagine demo mostrano esempi di
              messaggi e flussi: la chat in tempo reale è attiva come esempio
              completo sul demo barbiere.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 8,
                marginBottom: 8,
              }}
            >
              {demoSettori.map((settore) => (
                <a
                  key={settore.href}
                  href={settore.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "9px 10px",
                    borderRadius: 999,
                    fontSize: 13,
                    lineHeight: 1.2,
                    textDecoration: "none",
                    color: "#0f172a",
                    background:
                      "linear-gradient(135deg, #ffffff, #e5e7eb)",
                    boxShadow:
                      "0 0 0 1px rgba(148,163,184,0.45), 0 12px 24px rgba(15,23,42,0.06)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {settore.label}
                </a>
              ))}
            </div>

            <p
              style={{
                fontSize: 12,
                color: "#6b7280",
                lineHeight: 1.5,
              }}
            >
              Non trovi il tuo settore? Nel modulo puoi descrivere il tuo caso:
              adatteremo il bot ai tuoi servizi e alle tue regole. Il canone
              rimane lo stesso, cambia solo il piano che scegli (base, app+chat,
              WhatsApp, Instagram).
            </p>

            <div
              style={{
                marginTop: 12,
              }}
            >
              <a
                href="/demos/barbiere"
                style={{
                  display: "inline-flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 999,
                  padding: "10px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  background:
                    "linear-gradient(135deg, #020617, #0f172a)",
                  color: "#f9fafb",
                  boxShadow: "0 16px 32px rgba(15,23,42,0.55)",
                }}
              >
                👀 Prova la chat demo (barbiere)
              </a>
              <p
                style={{
                  marginTop: 6,
                  fontSize: 11,
                  color: "#6b7280",
                  lineHeight: 1.4,
                }}
              >
                La chat in tempo reale è un esempio già pronto per barbieri: il
                bot che riceverai sarà adattato al tuo settore (pizzeria,
                estetica, studio, ecc.) con i tuoi testi, orari e servizi.
              </p>
            </div>
          </section>

          {/* COLONNA 3: PIANI + SPIEGAZIONE */}
          <section
            style={{
              flex: "1 1 300px",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* PIANO BASE */}
            <div
              style={{
                background: "linear-gradient(180deg,#fef9c3,#fffbeb)",
                borderRadius: 24,
                padding: 16,
                boxShadow:
                  "0 18px 45px rgba(180,83,9,0.18), 0 0 0 1px rgba(252,211,77,0.8)",
              }}
            >
              <h2
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  marginBottom: 4,
                  color: "#78350f",
                }}
              >
                Piano Base · Solo bot informazioni{" "}
                <span style={{ float: "right" }}>19€/mese</span>
              </h2>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#92400e",
                  marginBottom: 8,
                }}
              >
                Bot base per rispondere alle domande dei clienti (orari,
                servizi, indirizzo, domande frequenti) senza gestione diretta
                delle prenotazioni. Ideale se vuoi partire in modo semplice.
              </p>

              <a
                href={STRIPE_BASE_URL}
                target={STRIPE_BASE_URL === "#" ? undefined : "_blank"}
                rel={
                  STRIPE_BASE_URL === "#" ? undefined : "noreferrer"
                }
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: 999,
                  border: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 0.2,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  textDecoration: "none",
                  background:
                    "radial-gradient(circle at 0 0, #facc15, #eab308)",
                  color: "#111827",
                  boxShadow:
                    "0 18px 40px rgba(202,138,4,0.55)",
                  marginTop: 4,
                }}
              >
                Attiva il Piano Base
              </a>

              <p
                style={{
                  marginTop: 6,
                  fontSize: 11,
                  lineHeight: 1.4,
                  color: "#92400e",
                }}
              >
                Quando avrai i link Stripe definitivi per questo piano, basta
                sostituire il link qui sopra: il testo dei prezzi sul sito non
                cambia automaticamente da Stripe.
              </p>
            </div>

            {/* PIANO APP + CHAT */}
            <div
              style={{
                background:
                  "linear-gradient(180deg,#fed7aa,#fdba74)",
                borderRadius: 24,
                padding: 16,
                boxShadow:
                  "0 18px 45px rgba(234,88,12,0.3), 0 0 0 1px rgba(248,171,94,0.9)",
              }}
            >
              <h2
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  marginBottom: 4,
                  color: "#7c2d12",
                }}
              >
                Piano App + Chat · Prenotazioni{" "}
                <span style={{ float: "right" }}>29€/mese</span>
              </h2>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#7c2d12",
                  marginBottom: 8,
                }}
              >
                Include app / pagina dedicata con chat, modulo prenotazioni
                collegato al foglio Google e demo personalizzata per il tuo
                settore (barbiere, pizzeria, estetica, studio medico, ecc.).
              </p>
              <p
                style={{
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: "#7c2d12",
                  marginBottom: 10,
                }}
              >
                Usa il codice{" "}
                <strong style={{ letterSpacing: 0.3 }}>PROMO10</strong> al
                checkout Stripe per pagare{" "}
                <strong>solo 10€ il primo mese</strong>, poi 29€/mese.
              </p>

              <a
                href={STRIPE_APP_CHAT_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: 999,
                  border: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 0.2,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  textDecoration: "none",
                  background:
                    "radial-gradient(circle at 0 0, #f97316, #ea580c)",
                  color: "#111827",
                  boxShadow:
                    "0 18px 40px rgba(194,65,12,0.55)",
                }}
              >
                Attiva il Piano App + Chat
              </a>
            </div>

            {/* PIANO WHATSAPP */}
            <div
              style={{
                background:
                  "linear-gradient(180deg,#dcfce7,#bbf7d0)",
                borderRadius: 24,
                padding: 16,
                boxShadow:
                  "0 18px 45px rgba(22,163,74,0.3), 0 0 0 1px rgba(34,197,94,0.9)",
              }}
            >
              <h2
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  marginBottom: 4,
                  color: "#14532d",
                }}
              >
                Piano WhatsApp Business{" "}
                <span style={{ float: "right" }}>39€/mese</span>
              </h2>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#14532d",
                  marginBottom: 8,
                }}
              >
                Come il Piano App + Chat, ma collegato anche a{" "}
                <strong>WhatsApp Business</strong>: il bot risponde ai messaggi,
                raccoglie richieste e prenotazioni e scrive tutto sul foglio
                Google.
              </p>
              <p
                style={{
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: "#14532d",
                  marginBottom: 10,
                }}
              >
                Ideale se i tuoi clienti scrivono quasi sempre su WhatsApp per
                chiedere informazioni o prenotare.
              </p>

              <a
                href={STRIPE_WHATSAPP_URL}
                target={STRIPE_WHATSAPP_URL === "#" ? undefined : "_blank"}
                rel={
                  STRIPE_WHATSAPP_URL === "#" ? undefined : "noreferrer"
                }
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: 999,
                  border: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 0.2,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  textDecoration: "none",
                  background:
                    "radial-gradient(circle at 0 0, #22c55e, #16a34a)",
                  color: "#022c22",
                  boxShadow:
                    "0 18px 40px rgba(22,163,74,0.55)",
                }}
              >
                Attiva il Piano WhatsApp Business
              </a>
            </div>

            {/* PIANO INSTAGRAM */}
            <div
              style={{
                background:
                  "linear-gradient(180deg,#ffe4f3,#fbcfe8)",
                borderRadius: 24,
                padding: 16,
                boxShadow:
                  "0 18px 45px rgba(236,72,153,0.3), 0 0 0 1px rgba(244,114,182,0.9)",
              }}
            >
              <h2
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  marginBottom: 4,
                  color: "#831843",
                }}
              >
                Piano Instagram Direct{" "}
                <span style={{ float: "right" }}>39€/mese</span>
              </h2>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#831843",
                  marginBottom: 8,
                }}
              >
                Come il Piano App + Chat, ma collegato ai{" "}
                <strong>messaggi Direct di Instagram</strong>: il bot risponde
                alle domande, raccoglie contatti e prenotazioni e scrive tutto
                nel foglio Google.
              </p>
              <p
                style={{
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: "#831843",
                  marginBottom: 10,
                }}
              >
                Ideale per profili Instagram attivi che ricevono molti messaggi
                in DM e vogliono automatizzare le risposte.
              </p>

              <a
                href={STRIPE_INSTAGRAM_URL}
                target={STRIPE_INSTAGRAM_URL === "#" ? undefined : "_blank"}
                rel={
                  STRIPE_INSTAGRAM_URL === "#" ? undefined : "noreferrer"
                }
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: 999,
                  border: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 0.2,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  textDecoration: "none",
                  background:
                    "radial-gradient(circle at 0 0, #ec4899, #db2777)",
                  color: "#fdf2f8",
                  boxShadow:
                    "0 18px 40px rgba(219,39,119,0.55)",
                }}
              >
                Attiva il Piano Instagram Direct
              </a>
            </div>

            {/* CARD NERA: SPIEGA COME FUNZIONA */}
            <div
              style={{
                flex: 1,
                background: "linear-gradient(180deg, #020617, #020617)",
                borderRadius: 24,
                padding: 18,
                color: "#e5e7eb",
                boxShadow:
                  "0 18px 45px rgba(15,23,42,0.75), 0 0 0 1px rgba(15,23,42,1)",
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Come funziona l’abbonamento GalaxBot AI
              </h3>

              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#cbd5f5",
                  marginBottom: 10,
                }}
              >
                In base al piano che scegli (solo bot, app + chat, WhatsApp,
                Instagram) GalaxBot AI può includere queste funzioni:
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.6,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <LiPoint>
                  Bot personalizzato sulla tua attività: testi, servizi, regole,
                  orari e tono di voce.
                </LiPoint>
                <LiPoint>
                  Collegamento ai canali previsti dal piano scelto (WhatsApp
                  Business, Instagram, sito oppure solo app dedicata con link +
                  QR code).
                </LiPoint>
                <LiPoint>
                  Gestione automatica di messaggi e richieste di informazioni;
                  dove previsto dal piano, anche appuntamenti e prenotazioni.
                </LiPoint>
                <LiPoint>
                  Accesso al foglio con le richieste / prenotazioni per tenere
                  tutto sotto controllo.
                </LiPoint>
                <LiPoint>
                  Supporto via email per piccole modifiche al bot durante il
                  mese (testi, orari, servizi).
                </LiPoint>
              </ul>

              <p
                style={{
                  marginTop: 12,
                  fontSize: 10,
                  lineHeight: 1.4,
                  color: "#9ca3af",
                }}
              >
                Proseguendo accetti le condizioni del servizio GalaxBot AI.
                <br />
                Leggi{" "}
                <a
                  href="/termini"
                  style={{
                    color: "#bfdbfe",
                    textDecoration: "underline",
                  }}
                >
                  Termini d’uso
                </a>{" "}
                e{" "}
                <a
                  href="/privacy"
                  style={{
                    color: "#bfdbfe",
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
      </div>
    </main>
  );
}

/* --- Componenti interni --- */

type StepProps = {
  step: number;
  title: string;
  subtitle: string;
};

function StepPill({ step, title, subtitle }: StepProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 14px",
        background: "linear-gradient(135deg, #020617, #0f172a)",
        borderRadius: 999,
        boxShadow: "0 16px 30px rgba(15,23,42,0.55)",
        color: "white",
        minWidth: 0,
      }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: "999px",
          background:
            "radial-gradient(circle at 30% 0, #facc15, #f97316)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        {step}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: 11,
            opacity: 0.85,
            lineHeight: 1.25,
            whiteSpace: "nowrap",
          }}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
}

function LiPoint({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
      }}
    >
      <span
        style={{
          marginTop: 4,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 0, #38bdf8, #0ea5e9)",
          flexShrink: 0,
        }}
      />
      <span>{children}</span>
    </li>
  );
}