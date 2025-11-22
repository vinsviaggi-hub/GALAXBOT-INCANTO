"use client";

import React, { useState, FormEvent } from "react";
import ChatBox from "@/app/components/chatbox";

type BookingFormState = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  note: string;
};

export default function BarberDemoPage() {
  const [form, setForm] = useState<BookingFormState>({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    field: keyof BookingFormState,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          service: form.service.trim(),
          date: form.date.trim(),
          time: form.time.trim(),
          note: form.note.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Errore durante la prenotazione dal bot.");
      }

      setSuccessMsg("Prenotazione inviata e salvata nel foglio Google ✅");
      setForm({
        name: "",
        phone: "",
        service: "",
        date: "",
        time: "",
        note: "",
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "Non sono riuscito a salvare la prenotazione. Riprova tra poco."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1d2b64 0, #020617 55%, #000000 100%)",
        color: "#e5e7eb",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "32px 16px 48px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1160,
        }}
      >
        {/* HEADER */}
        <header
          style={{
            marginBottom: 22,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 12px",
              borderRadius: 9999,
              background: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(148,163,184,0.85)",
              fontSize: "0.74rem",
              letterSpacing: 1.1,
              textTransform: "uppercase",
              color: "#e5e7eb",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "999px",
                background:
                  "radial-gradient(circle at 30% 0, #22c55e, #16a34a)",
              }}
            />
            <span>Demo bot avanzato per barber shop</span>
          </div>

          <h1
            style={{
              fontSize: "2rem",
              lineHeight: 1.2,
              marginBottom: 6,
            }}
          >
            Prenotazioni Barbiere BOT AVANZATO 💈
          </h1>

          <p
            style={{
              fontSize: "0.95rem",
              maxWidth: 740,
              lineHeight: 1.7,
              color: "#e5e7eb",
              opacity: 0.9,
            }}
          >
            Prova il chatbot in tempo reale. Puoi fare domande sui servizi
            oppure prenotare direttamente con il box{" "}
            <strong>“Prenotazione veloce dal bot”</strong> sotto la chat.
            Le prenotazioni di prova finiscono in un foglio Google, come
            succederebbe per il barbiere reale.
          </p>
        </header>

        {/* RIGA SPIEGAZIONI IN ALTO */}
        <section
          style={{
            marginBottom: 18,
            borderRadius: 22,
            border: "1px solid rgba(148,163,184,0.6)",
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.8))",
            padding: "14px 18px",
          }}
        >
          <p
            style={{
              fontSize: "0.86rem",
              marginBottom: 6,
            }}
          >
            <strong>Come provare questa demo di prenotazione:</strong>
          </p>
          <ul
            style={{
              paddingLeft: "1rem",
              margin: 0,
              fontSize: "0.84rem",
              lineHeight: 1.6,
              color: "#cbd5f5",
            }}
          >
            <li>
              Fai una domanda al bot nella chat in alto (orari, servizi,
              prezzi).
            </li>
            <li>
              Per registrare una prenotazione di prova usa il box{" "}
              <strong>“Prenotazione veloce dal bot”</strong> sotto la chat.
            </li>
            <li>
              Se scegli una data passata o un orario già occupato, il sistema
              ti avvisa e non salva la prenotazione.
            </li>
          </ul>
        </section>

        {/* LAYOUT DUE COLONNE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
            gap: 20,
          }}
        >
          {/* COLONNA SINISTRA: CHAT + PRENOTAZIONE */}
          <section
            style={{
              borderRadius: 24,
              background:
                "radial-gradient(circle at top left, #020617 0, #020617 35%, #020617 100%)",
              border: "1px solid rgba(51,65,85,0.9)",
              boxShadow: "0 22px 55px rgba(15,23,42,0.9)",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* Banner: come provare la chat */}
            <div
              style={{
                borderRadius: 18,
                border: "1px solid rgba(148,163,184,0.6)",
                padding: "10px 12px",
                background:
                  "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.8))",
                fontSize: "0.82rem",
                color: "#e5e7eb",
              }}
            >
              <strong>Prova il chatbot in tempo reale 💬</strong>
              <br />
              <span style={{ color: "#cbd5f5" }}>
                Esempi di domande: “Posso prenotare un taglio domani?”,
                “Avete posto sabato pomeriggio?”, “Quanto costa taglio +
                barba?”.
              </span>
            </div>

            {/* CHAT */}
            <div
              style={{
                borderRadius: 22,
                border: "1px solid rgba(75,85,99,0.9)",
                background:
                  "radial-gradient(circle at top, #020617 0, #020617 100%)",
                padding: 12,
              }}
            >
              <ChatBox />
            </div>

            {/* BOX PRENOTAZIONE VELOCE */}
            <div
              style={{
                marginTop: 8,
                borderRadius: 22,
                border: "1px solid rgba(96,165,250,0.8)",
                background:
                  "radial-gradient(circle at top, #020617 0, #020617 100%)",
                padding: 16,
              }}
            >
              <h2
                style={{
                  fontSize: "1rem",
                  marginBottom: 4,
                }}
              >
                Prenotazione veloce dal bot 📅
              </h2>
              <p
                style={{
                  fontSize: "0.84rem",
                  color: "#cbd5f5",
                  marginBottom: 10,
                  lineHeight: 1.6,
                }}
              >
                Compila questi campi e il sistema salva la prenotazione
                direttamente nel pannello del barbiere (foglio Google di
                test). I messaggi scritti nella chat{" "}
                <strong>non</strong> creano prenotazioni.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Riga nome + telefono */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <InputField
                    label="Nome"
                    value={form.name}
                    onChange={(v) => handleChange("name", v)}
                  />
                  <InputField
                    label="Telefono"
                    value={form.phone}
                    onChange={(v) => handleChange("phone", v)}
                  />
                </div>

                {/* Servizio */}
                <div style={{ marginBottom: 8 }}>
                  <InputField
                    label="Servizio (es. Taglio uomo)"
                    value={form.service}
                    onChange={(v) => handleChange("service", v)}
                  />
                </div>

                {/* Data + ora */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <InputField
                    label="Data"
                    type="date"
                    value={form.date}
                    onChange={(v) => handleChange("date", v)}
                  />
                  <InputField
                    label="Ora"
                    type="time"
                    value={form.time}
                    onChange={(v) => handleChange("time", v)}
                  />
                </div>

                {/* Note */}
                <div style={{ marginBottom: 10 }}>
                  <InputField
                    label="Note (opzionale)"
                    value={form.note}
                    onChange={(v) => handleChange("note", v)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    borderRadius: 999,
                    border: "none",
                    padding: "11px 14px",
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    letterSpacing: 0.3,
                    textTransform: "uppercase",
                    cursor: loading ? "default" : "pointer",
                    background:
                      "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "#022c22",
                    boxShadow:
                      "0 14px 32px rgba(22,163,74,0.7), 0 0 0 1px rgba(21,128,61,0.9)",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Invio in corso…" : "Invia prenotazione"}
                </button>

                {successMsg && (
                  <p
                    style={{
                      marginTop: 8,
                      fontSize: "0.8rem",
                      color: "#4ade80",
                    }}
                  >
                    {successMsg}
                  </p>
                )}
                {errorMsg && (
                  <p
                    style={{
                      marginTop: 8,
                      fontSize: "0.8rem",
                      color: "#fca5a5",
                    }}
                  >
                    {errorMsg}
                  </p>
                )}

                <p
                  style={{
                    marginTop: 8,
                    fontSize: "0.78rem",
                    color: "#9ca3af",
                    lineHeight: 1.5,
                  }}
                >
                  Questo è solo un esempio. Nel progetto reale colleghiamo
                  GalaxBot AI al tuo WhatsApp Business, Instagram o sito web
                  e lo adattiamo al tuo settore (barbiere, pizzeria, studio
                  medico, negozio, ecc.), così il bot si occupa dei messaggi
                  e delle prenotazioni al posto tuo.
                </p>
              </form>
            </div>
          </section>

          {/* COLONNA DESTRA: SPIEGAZIONE + CTA ISCRIZIONE */}
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* Come puoi usare questo bot */}
            <div
              style={{
                borderRadius: 22,
                border: "1px solid rgba(148,163,184,0.7)",
                background:
                  "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,23,42,0.96))",
                padding: "16px 18px",
              }}
            >
              <h2
                style={{
                  fontSize: "1rem",
                  marginBottom: 8,
                }}
              >
                Come puoi usare questo bot nel tuo negozio
              </h2>
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "1.1rem",
                  margin: 0,
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  color: "#e5e7eb",
                }}
              >
                <li>
                  I clienti ti scrivono su WhatsApp, Instagram o dal sito e
                  il bot risponde subito al posto tuo.
                </li>
                <li>
                  Le richieste di appuntamento finiscono in un foglio Google
                  che puoi controllare quando vuoi.
                </li>
                <li>
                  Possiamo adattare lo stesso sistema a pizzerie, bar,
                  pasticcerie, hotel, studi medici, negozi di abbigliamento
                  e altri settori.
                </li>
              </ul>
            </div>

            {/* Card iscrizione + abbonamento */}
            <div
              style={{
                borderRadius: 22,
                border: "1px solid rgba(52,211,153,0.6)",
                background:
                  "linear-gradient(180deg, #022c22, #064e3b 60%, #111827 100%)",
                padding: "16px 18px 14px",
              }}
            >
              <p
                style={{
                  fontSize: "0.9rem",
                  marginBottom: 8,
                  color: "#d1fae5",
                  lineHeight: 1.7,
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
                  fontSize: "0.8rem",
                  marginBottom: 12,
                  color: "#a7f3d0",
                  lineHeight: 1.5,
                }}
              >
                Quando clicchi sui pulsanti qui sotto, vai alla pagina
                iscrizione GalaxBot AI. Da lì puoi compilare il modulo
                ufficiale su Google, scegliere il piano che preferisci e
                attivare l&apos;abbonamento via Stripe. In ogni momento puoi
                chiudere la scheda e tornare al sito.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <a
                  href="/iscriviti"
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px 14px",
                    borderRadius: 999,
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    letterSpacing: 0.3,
                    textTransform: "uppercase",
                    background:
                      "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "#022c22",
                    boxShadow:
                      "0 14px 32px rgba(16,185,129,0.7), 0 0 0 1px rgba(5,150,105,0.9)",
                  }}
                >
                  Compila il modulo per il tuo bot
                </a>

                <a
                  href="/iscriviti"
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px 14px",
                    borderRadius: 999,
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    letterSpacing: 0.3,
                    textTransform: "uppercase",
                    background:
                      "linear-gradient(135deg, #f97316, #ea580c)",
                    color: "#111827",
                    boxShadow:
                      "0 14px 32px rgba(234,88,12,0.75), 0 0 0 1px rgba(180,83,9,0.95)",
                  }}
                >
                  Vedi prezzi e attiva l’abbonamento
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* ---------- COMPONENTI INTERNI ---------- */

type InputFieldProps = {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
};

function InputField({
  label,
  value,
  type = "text",
  onChange,
}: InputFieldProps) {
  return (
    <label
      style={{
        display: "block",
        fontSize: "0.78rem",
      }}
    >
      <span
        style={{
          display: "block",
          marginBottom: 4,
          color: "#e5e7eb",
        }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          borderRadius: 999,
          border: "1px solid rgba(55,65,81,0.9)",
          backgroundColor: "#020617",
          padding: "9px 12px",
          fontSize: "0.86rem",
          color: "#f9fafb",
          outline: "none",
        }}
      />
    </label>
  );
}