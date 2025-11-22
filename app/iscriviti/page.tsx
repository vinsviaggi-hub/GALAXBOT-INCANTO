// app/iscriviti/page.tsx

import React from "react";

export const metadata = {
  title: "Iscrizione GalaxBot AI",
  description:
    "Attiva GalaxBot AI per il tuo negozio o studio: compila il modulo, scegli il piano e attiva l’abbonamento.",
};

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdovcqFp8fcpmeq5ukeY7Qw4u4Xy7IGzzaYyyHmHQduJCj5Ew/viewform?embedded=true";

// 👉 Sostituisci questi 3 link con i tuoi Payment Link reali su Stripe
const STRIPE_BASE_URL =
  "https://buy.stripe.com/BASE_LINK_DA_SOSTITUIRE"; // Piano Base · Solo bot info

const STRIPE_APP_CHAT_URL =
  "https://buy.stripe.com/5kQ4gzbY30Vi6sP6uab3q02"; // Piano App + Chat (quello che già usi)

const STRIPE_WHATSAPP_URL =
  "https://buy.stripe.com/WHATSAPP_LINK_DA_SOSTITUIRE"; // Piano WhatsApp Business

const STRIPE_INSTAGRAM_URL =
  "https://buy.stripe.com/INSTAGRAM_LINK_DA_SOSTITUIRE"; // Piano Instagram DM

const recensioniUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdKA4gx4djL3YUH1rNXjHIqP_MpjSX-m_0jXC8vMRxIWR4sWw/viewform";

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
          demo del tuo settore e scegli il piano che preferisci.  
          Puoi avere solo il bot informativo, il bot con prenotazioni su foglio
          oppure le integrazioni anche con WhatsApp Business e Instagram.
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
            subtitle="Dati attività, contatti, settore."
          />
          <StepPill
            step={2}
            title="Guarda il demo"
            subtitle="Barbiere, pizzeria, studio, ecc."
          />
          <StepPill
            step={3}
            title="Scegli e attiva il piano"
            subtitle="Pagamento mensile online, senza vincoli."
          />
        </div>

        {/* LAYOUT 3 SEZIONI - RESPONSIVE CON FLEX WRAP */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {/* COLONNA 1: MODULO */}
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
              sito o solo app). Usiamo queste informazioni per preparare
              GalaxBot AI su misura per te.
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
              Il modulo è ospitato su Google Forms. Se ti viene chiesto di
              accettare i cookie o di cliccare su{" "}
              <strong>“Compila modulo”</strong>, conferma e poi compila tutte
              le domande. Dopo l&apos;invio ti contattiamo via email o WhatsApp
              per i dettagli.
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
              AI può lavorare per te. La chat completa con prenotazioni di
              prova è attiva sul demo barbiere; gli altri demo mostrano testi e
              flussi adattati ai vari settori.
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
              rimane quello del piano che scegli.
            </p>

            {/* CTA mobile: vedi il demo */}
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

          {/* COLONNA 3: ABBONAMENTO – 4 PIANI */}
          <section
            id="abbonamento"
            style={{
              flex: "1 1 300px",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* Card piani e prezzi */}
            <div
              style={{
                background: "linear-gradient(180deg, #fef9c3, #fffbeb)",
                borderRadius: 24,
                padding: 18,
                boxShadow:
                  "0 18px 45px rgba(180,83,9,0.18), 0 0 0 1px rgba(252,211,77,0.8)",
              }}
            >
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  marginBottom: 6,
                  color: "#78350f",
                }}
              >
                3. Scegli e attiva il tuo piano
              </h2>

              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#92400e",
                  marginBottom: 10,
                }}
              >
                Tutti i piani sono mensili, senza vincoli annuali. Paghi online
                con carta e puoi disdire quando vuoi, al termine del mese in
                corso.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginTop: 6,
                }}
              >
                {/* Piano Base */}
                <div
                  style={{
                    borderRadius: 16,
                    padding: 10,
                    background: "#fefce8",
                    border: "1px solid rgba(234,179,8,0.5)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#713f12",
                      }}
                    >
                      Piano Base · Solo bot info
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#92400e",
                      }}
                    >
                      19€/mese
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: "#854d0e",
                      marginBottom: 8,
                    }}
                  >
                    Bot solo informativo: risponde alle domande frequenti
                    (orari, servizi, indirizzo, listino semplice){" "}
                    <strong>senza</strong> gestire prenotazioni né scrivere su
                    fogli Google.
                  </p>

                  <a
                    href={STRIPE_BASE_URL}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 0.2,
                      textDecoration: "none",
                      background:
                        "linear-gradient(135deg, #facc15, #eab308)",
                      color: "#1f2937",
                    }}
                  >
                    Attiva il Piano Base
                  </a>
                </div>

                {/* Piano App + Chat – prenotazioni su foglio */}
                <div
                  style={{
                    borderRadius: 16,
                    padding: 10,
                    background:
                      "linear-gradient(135deg, #facc15, #f97316)",
                    border: "1px solid rgba(217,119,6,0.8)",
                    boxShadow: "0 12px 28px rgba(217,119,6,0.45)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#78350f",
                      }}
                    >
                      Piano App + Chat · Prenotazioni
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 900,
                        color: "#7c2d12",
                      }}
                    >
                      29€/mese
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: "#7c2d12",
                      marginBottom: 8,
                    }}
                  >
                    Include app / pagina dedicata con chat, modulo prenotazioni
                    collegato al foglio Google e demo personalizzata per il tuo
                    settore (barbiere, pizzeria, estetica, studio medico, ecc.).
                  </p>

                  <div
                    style={{
                      fontSize: 11,
                      lineHeight: 1.5,
                      marginBottom: 8,
                    }}
                  >
                    Usa il codice{" "}
                    <strong>PROMO10</strong> al checkout Stripe per pagare{" "}
                    <strong>solo 10€ il primo mese</strong>, poi 29€/mese.
                  </div>

                  <a
                    href={STRIPE_APP_CHAT_URL}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      padding: "9px 14px",
                      borderRadius: 999,
                      border: "none",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: 0.2,
                      textTransform: "uppercase",
                      cursor: "pointer",
                      textDecoration: "none",
                      background:
                        "radial-gradient(circle at 0 0, #f97316, #ea580c)",
                      color: "#111827",
                    }}
                  >
                    Attiva il Piano App + Chat
                  </a>
                </div>

                {/* Piano WhatsApp Business */}
                <div
                  style={{
                    borderRadius: 16,
                    padding: 10,
                    background: "#fffbeb",
                    border: "1px solid rgba(52,211,153,0.6)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#064e3b",
                      }}
                    >
                      Piano WhatsApp Business
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#047857",
                      }}
                    >
                      39€/mese
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: "#065f46",
                      marginBottom: 6,
                    }}
                  >
                    Come il Piano App + Chat, ma collegato anche a{" "}
                    <strong>WhatsApp Business</strong>: il bot risponde ai
                    messaggi, raccoglie richieste e prenotazioni e scrive tutto
                    sul foglio Google.
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      lineHeight: 1.5,
                      color: "#047857",
                      marginBottom: 8,
                    }}
                  >
                    È ideale se i tuoi clienti scrivono quasi sempre su
                    WhatsApp per chiedere informazioni o prenotare.
                  </p>

                  <a
                    href={STRIPE_WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 0.2,
                      textDecoration: "none",
                      background:
                        "linear-gradient(135deg, #22c55e, #16a34a)",
                      color: "#022c22",
                    }}
                  >
                    Attiva il Piano WhatsApp Business
                  </a>
                </div>

                {/* Piano Instagram */}
                <div
                  style={{
                    borderRadius: 16,
                    padding: 10,
                    background: "#fdf2ff",
                    border: "1px solid rgba(236,72,153,0.6)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#831843",
                      }}
                    >
                      Piano Instagram Direct
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#db2777",
                      }}
                    >
                      39€/mese
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: "#9d174d",
                      marginBottom: 6,
                    }}
                  >
                    Come il Piano App + Chat, ma collegato ai{" "}
                    <strong>messaggi Direct di Instagram</strong>: il bot
                    risponde alle domande, raccoglie contatti e prenotazioni e
                    scrive tutto nel foglio Google.
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      lineHeight: 1.5,
                      color: "#be185d",
                      marginBottom: 8,
                    }}
                  >
                    Ideale per profili Instagram attivi che ricevono molti
                    messaggi in DM e vogliono automatizzare le risposte.
                  </p>

                  <a
                    href={STRIPE_INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 0.2,
                      textDecoration: "none",
                      background:
                        "linear-gradient(135deg, #ec4899, #a855f7)",
                      color: "#fdf2ff",
                    }}
                  >
                    Attiva il Piano Instagram Direct
                  </a>
                </div>
              </div>
            </div>

            {/* Card cosa include – generica per tutti i piani */}
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
                  marginBottom: 10,
                }}
              >
                Cosa include GalaxBot AI
              </h3>
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
                  Configurazione iniziale del bot sulla tua attività (settore,
                  servizi, regole, orari, copy).
                </LiPoint>
                <LiPoint>
                  Collegamento a app / sito dedicato e, per i piani superiori,
                  al foglio Google e ai canali WhatsApp Business / Instagram.
                </LiPoint>
                <LiPoint>
                  Gestione messaggi e richieste info 24/7, con prenotazioni o
                  ordini a seconda del piano scelto.
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