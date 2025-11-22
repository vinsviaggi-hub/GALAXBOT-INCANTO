"use client";

import React, { useState, FormEvent } from "react";
import ChatBox from "@/app/components/chatbox";

type BookingState = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
};

type BookingResult = {
  success: boolean;
  message?: string;
  error?: string;
  conflict?: boolean;
};

export const metadata = {
  title: "Demo barbiere con prenotazione veloce | GalaxBot AI",
  description:
    "Prova il chatbot per barber shop con prenotazione veloce collegata al foglio Google. Demo avanzata di GalaxBot AI.",
};

export default function BarberDemoPage() {
  const [form, setForm] = useState<BookingState>({
    name: "",
    phone: "",
    service: "Taglio uomo",
    date: "",
    time: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [lastBooking, setLastBooking] = useState<BookingState | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "create_booking",
          ...form,
        }),
      });

      const data = (await res.json()) as BookingResult & {
        rowNumber?: number;
      };

      if (data.success) {
        setResult({
          success: true,
          message: data.message ?? "Prenotazione creata con successo.",
        });
        setLastBooking(form);
      } else {
        setResult({
          success: false,
          error:
            data.error ??
            "Non è stato possibile salvare la prenotazione. Riprova tra poco.",
          conflict: data.conflict,
        });
      }
    } catch (err) {
      console.error(err);
      setResult({
        success: false,
        error:
          "Si è verificato un errore imprevisto. Controlla la connessione e riprova.",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleChange<K extends keyof BookingState>(
    key: K,
    value: BookingState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #020617 0, #020617 55%, #000000 100%)",
        color: "#e5e7eb",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "32px 16px 48px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1160 }}>
        {/* HEADER */}
        <header style={{ marginBottom: 22 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 12px",
              borderRadius: 9999,
              background: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(148,163,184,0.9)",
              fontSize: "0.74rem",
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "#e5e7eb",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 0, #22c55e, #16a34a)",
              }}
            />
            Demo bot avanzato per barber shop
          </div>

          <h1
            style={{
              fontSize: "2.1rem",
              lineHeight: 1.2,
              marginBottom: 6,
            }}
          >
            Prenotazioni Barbiere BOT AVANZATO 💈
          </h1>
          <p
            style={{
              maxWidth: 760,
              fontSize: "0.98rem",
              lineHeight: 1.7,
              color: "#e5e7eb",
              opacity: 0.9,
            }}
          >
            Prova il chatbot in tempo reale. Puoi fare domande sui servizi
            oppure prenotare direttamente con il box{" "}
            <strong>“Prenotazione veloce dal bot”</strong> sotto la chat. Le
            prenotazioni di prova finiscono in un foglio Google, come
            succederebbe per il barbiere reale.
          </p>
        </header>

        {/* BARRA ISTRUZIONI */}
        <section
          style={{
            marginBottom: 20,
            borderRadius: 20,
            padding: "12px 16px",
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.98))",
            border: "1px solid rgba(55,65,81,0.9)",
            fontSize: "0.86rem",
            lineHeight: 1.6,
          }}
        >
          <div
            style={{
              fontWeight: 600,
              marginBottom: 4,
              color: "#bfdbfe",
            }}
          >
            Come provare questo demo di prenotazione
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.1rem",
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <li>Fai una domanda al bot nella chat in alto (orari, servizi, prezzi).</li>
            <li>
              Per registrare una <strong>prenotazione di prova</strong> usa il
              box “Prenotazione veloce dal bot” sotto la chat.
            </li>
            <li>
              Se scegli una data passata o un orario già occupato, il sistema ti
              avvisa e non salva la prenotazione.
            </li>
          </ul>
        </section>

        {/* LAYOUT DUE COLONNE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 1fr)",
            gap: 20,
            alignItems: "flex-start",
          }}
        >
          {/* COLONNA SINISTRA – CHAT + PRENOTAZIONE */}
          <section>
            {/* CARD CHAT */}
            <div
              style={{
                borderRadius: 22,
                padding: "14px 16px 16px",
                background: "rgba(15,23,42,0.96)",
                border: "1px solid rgba(51,65,85,0.95)",
                boxShadow: "0 22px 55px rgba(15,23,42,0.9)",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                Prova il chatbot in tempo reale 💬
              </div>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "#cbd5f5",
                  lineHeight: 1.6,
                  marginBottom: 10,
                }}
              >
                Esempi di domande: “Posso prenotare un taglio domani?”, “Avete
                posto sabato pomeriggio?”, “Quanto costa taglio + barba?”.
              </p>

              <div
                style={{
                  borderRadius: 18,
                  padding: 10,
                  background:
                    "radial-gradient(circle at top left, #0f172a, #020617)",
                  border: "1px solid rgba(30,64,175,0.9)",
                  boxShadow:
                    "0 0 0 1px rgba(37,99,235,0.35), 0 30px 60px rgba(15,23,42,0.9)",
                }}
              >
                <ChatBox />
              </div>
            </div>

            {/* CARD PRENOTAZIONE */}
            <div
              style={{
                borderRadius: 22,
                padding: "16px 16px 14px",
                background: "rgba(15,23,42,0.98)",
                border: "1px solid rgba(37,99,235,0.7)",
                boxShadow:
                  "0 26px 70px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Cornici decorative */}
              <div
                style={{
                  position: "absolute",
                  inset: 10,
                  borderRadius: 18,
                  border: "1px solid rgba(30,64,175,0.7)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 20,
                  borderRadius: 18,
                  border: "1px solid rgba(15,23,42,0.9)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  maxWidth: 520,
                  margin: "0 auto",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.05rem",
                    marginBottom: 4,
                  }}
                >
                  Prenotazione veloce dal bot 📅
                </h2>
                <p
                  style={{
                    fontSize: "0.83rem",
                    color: "#cbd5f5",
                    lineHeight: 1.6,
                    marginBottom: 10,
                  }}
                >
                  Compila questi campi e il sistema salva la prenotazione
                  direttamente nel pannello del barbiere. I messaggi scritti
                  nella chat <strong>non</strong> creano prenotazioni.
                </p>

                {/* ESITO ULTIMA PRENOTAZIONE */}
                {lastBooking && result?.success && (
                  <div
                    style={{
                      marginBottom: 10,
                      borderRadius: 14,
                      padding: "10px 12px",
                      background:
                        "linear-gradient(135deg, #022c22, #064e3b, #065f46)",
                      border: "1px solid rgba(16,185,129,0.9)",
                      fontSize: "0.8rem",
                      color: "#e5f9f0",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: 4,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span>✅ Ho registrato la tua richiesta di prenotazione</span>
                    </div>
                    <div>
                      <div>Nome: {lastBooking.name}</div>
                      <div>Servizio: {lastBooking.service}</div>
                      <div>Data: {lastBooking.date}</div>
                      <div>Ora: {lastBooking.time}</div>
                      {lastBooking.phone && (
                        <div>Telefono: {lastBooking.phone}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* MESSAGGIO ERRORE / CONFLITTO */}
                {result && !result.success && (
                  <div
                    style={{
                      marginBottom: 10,
                      borderRadius: 14,
                      padding: "8px 10px",
                      background:
                        result.conflict === true
                          ? "rgba(250,204,21,0.08)"
                          : "rgba(239,68,68,0.08)",
                      border:
                        result.conflict === true
                          ? "1px solid rgba(234,179,8,0.7)"
                          : "1px solid rgba(239,68,68,0.7)",
                      fontSize: "0.8rem",
                      color:
                        result.conflict === true
                          ? "#fbbf24"
                          : "rgba(248,113,113,0.95)",
                    }}
                  >
                    {result.error}
                  </div>
                )}

                {/* FORM */}
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {/* Nome + Telefono */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
                      gap: 8,
                    }}
                  >
                    <BookingInput
                      label="Nome"
                      value={form.name}
                      onChange={(v) => handleChange("name", v)}
                      required
                    />
                    <BookingInput
                      label="Telefono"
                      value={form.phone}
                      onChange={(v) => handleChange("phone", v)}
                      required
                    />
                  </div>

                  {/* Servizio */}
                  <BookingInput
                    label="Servizio"
                    value={form.service}
                    onChange={(v) => handleChange("service", v)}
                    required
                  />

                  {/* Data + Ora */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                      gap: 8,
                    }}
                  >
                    <BookingInput
                      label="Data"
                      type="date"
                      value={form.date}
                      onChange={(v) => handleChange("date", v)}
                      required
                    />
                    <BookingInput
                      label="Ora"
                      type="time"
                      value={form.time}
                      onChange={(v) => handleChange("time", v)}
                      required
                    />
                  </div>

                  {/* Note */}
                  <BookingInput
                    label="Note (opzionale)"
                    value={form.notes}
                    onChange={(v) => handleChange("notes", v)}
                    multiline
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      marginTop: 6,
                      border: "none",
                      borderRadius: 999,
                      padding: "11px 16px",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      letterSpacing: 0.3,
                      textTransform: "uppercase",
                      cursor: loading ? "default" : "pointer",
                      background:
                        "linear-gradient(90deg, #22c55e, #16a34a, #22c55e)",
                      color: "#022c22",
                      boxShadow:
                        "0 22px 45px rgba(22,163,74,0.75), 0 0 0 1px rgba(6,95,70,0.9)",
                      opacity: loading ? 0.75 : 1,
                    }}
                  >
                    {loading ? "Invio in corso…" : "Invia prenotazione"}
                  </button>

                  <p
                    style={{
                      marginTop: 6,
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      lineHeight: 1.5,
                    }}
                  >
                    Questo è solo un esempio. Nel progetto reale colleghiamo
                    GalaxBot AI al tuo WhatsApp Business, Instagram o sito web
                    e lo adattiamo al tuo settore (barbiere, pizzeria, studio
                    medico, negozio, ecc.): il bot si occupa dei messaggi e
                    delle prenotazioni al posto tuo.
                  </p>
                </form>
              </div>
            </div>
          </section>

          {/* COLONNA DESTRA – SPIEGAZIONE + CTA */}
          <section>
            {/* COME USARE IL BOT */}
            <div
              style={{
                borderRadius: 22,
                padding: "16px 18px 14px",
                background: "rgba(15,23,42,0.98)",
                border: "1px solid rgba(51,65,85,0.95)",
                boxShadow: "0 22px 55px rgba(15,23,42,0.9)",
                marginBottom: 14,
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
                  margin: 0,
                  paddingLeft: "1.1rem",
                  fontSize: "0.86rem",
                  lineHeight: 1.7,
                  color: "#e5e7eb",
                }}
              >
                <li>
                  I clienti ti scrivono su WhatsApp, Instagram o dal sito e il
                  bot risponde subito al posto tuo.
                </li>
                <li>
                  Le richieste di appuntamento finiscono in un{" "}
                  <strong>foglio Google</strong> che puoi controllare quando
                  vuoi.
                </li>
                <li>
                  Possiamo adattare lo stesso sistema a{" "}
                  <strong>
                    pizzerie, bar, pasticcerie, hotel, studi medici, negozi di
                    abbigliamento
                  </strong>{" "}
                  e altri settori.
                </li>
              </ul>
            </div>

            {/* CTA MODULO + ABBONAMENTO */}
            <div
              style={{
                borderRadius: 22,
                padding: "16px 18px 14px",
                background:
                  "linear-gradient(145deg, #ecfccb, #fef9c3, #ffedd5)",
                border: "1px solid rgba(250,204,21,0.9)",
                boxShadow:
                  "0 22px 55px rgba(180,83,9,0.25), 0 0 0 1px rgba(251,191,36,0.7)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.98rem",
                  marginBottom: 6,
                  color: "#78350f",
                }}
              >
                Attiva GalaxBot AI sulla tua attività
              </h3>
              <p
                style={{
                  fontSize: "0.84rem",
                  lineHeight: 1.6,
                  color: "#854d0e",
                  marginBottom: 10,
                }}
              >
                Compilando il modulo di iscrizione ti preparo una versione
                personalizzata del bot per la tua attività. Se ti piace, puoi
                attivare l’abbonamento e collegarlo a WhatsApp Business, sito o
                solo come app con link + QR code.
              </p>

              <p
                style={{
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                  color: "#92400e",
                  marginBottom: 10,
                }}
              >
                Quando clicchi sui pulsanti qui sotto, vieni portato alla pagina{" "}
                <strong>“Attiva GalaxBot AI”</strong> dove:
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.1rem",
                  fontSize: "0.8rem",
                  lineHeight: 1.6,
                  color: "#92400e",
                  marginBottom: 10,
                }}
              >
                <li>compili il modulo ufficiale su Google;</li>
                <li>scegli il piano (base, app + chat, WhatsApp, Instagram);</li>
                <li>attivi il pagamento mensile tramite Stripe.</li>
              </ul>

              <a
                href="/iscriviti"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  padding: "9px 14px",
                  borderRadius: 999,
                  fontSize: "0.86rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  background:
                    "linear-gradient(90deg, #22c55e, #16a34a, #22c55e)",
                  color: "#022c22",
                  boxShadow:
                    "0 18px 38px rgba(22,163,74,0.7), 0 0 0 1px rgba(21,128,61,0.9)",
                  marginBottom: 8,
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
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 999,
                  fontSize: "0.86rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  background:
                    "linear-gradient(90deg, #f97316, #f59e0b, #f97316)",
                  color: "#172554",
                  boxShadow:
                    "0 20px 40px rgba(217,119,6,0.75), 0 0 0 1px rgba(180,83,9,0.9)",
                }}
              >
                Vedi prezzo e attiva l&apos;abbonamento
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* ----------------- COMPONENTE INPUT PRENOTAZIONE ----------------- */

type BookingInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "date" | "time";
  required?: boolean;
  multiline?: boolean;
};

function BookingInput({
  label,
  value,
  onChange,
  type = "text",
  required,
  multiline,
}: BookingInputProps) {
  const baseStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 999,
    border: "1px solid rgba(30,64,175,0.9)",
    background: "rgba(15,23,42,0.95)",
    color: "#e5e7eb",
    fontSize: "0.86rem",
    padding: "9px 13px",
    outline: "none",
    boxShadow:
      "0 0 0 1px rgba(15,23,42,1), 0 12px 24px rgba(15,23,42,0.9)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.78rem",
    color: "#cbd5f5",
    marginBottom: 4,
    paddingLeft: 4,
  };

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          style={{
            ...baseStyle,
            borderRadius: 14,
            resize: "vertical",
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete="off"
          style={baseStyle}
        />
      )}
    </div>
  );
}