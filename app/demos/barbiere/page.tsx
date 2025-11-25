// app/demos/barbiere/page.tsx
"use client";

import { useState, FormEvent, type CSSProperties } from "react";
import ChatBox from "@/app/components/chatbox";

// Orari disponibili dalle 08:00 alle 19:00 ogni 30 minuti
const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];

export default function BarberDemoPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Taglio uomo");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    null | { type: "ok" | "error"; message: string }
  >(null);

  async function handleBooking(e: FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!name.trim() || !phone.trim() || !service.trim() || !date || !time) {
      setStatus({
        type: "error",
        message: "Compila almeno nome, telefono, servizio, data e ora.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service,
          date,
          time,
          notes,
        }),
      });

      if (!res.ok) {
        throw new Error("Errore nella richiesta");
      }

      setStatus({
        type: "ok",
        message: "✅ Prenotazione inviata alla demo del barbiere.",
      });
      setName("");
      setPhone("");
      setService("Taglio uomo");
      setDate("");
      setTime("");
      setNotes("");
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message:
          "Si è verificato un problema nel salvare la prenotazione di prova. Riprova tra poco.",
      });
    } finally {
      setLoading(false);
    }
  }

  function goToIscriviti() {
    window.location.href = "/iscriviti";
  }

  return (
    <>
      <main
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top, #020617 0, #020617 55%, #000000 100%)",
          color: "#e5e7eb",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          padding: "32px 16px 40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 1120 }}>
          {/* HEADER */}
          <header style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 12px",
                borderRadius: 9999,
                border: "1px solid rgba(74,222,128,0.7)",
                background: "rgba(22,163,74,0.1)",
                fontSize: "0.75rem",
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#bbf7d0",
                marginBottom: 10,
              }}
            >
              Demo bot avanzato per barber shop 💈
            </div>

            <h1
              style={{
                fontSize: "2rem",
                marginBottom: 6,
                color: "#f9fafb",
              }}
            >
              Prenotazioni Barbiere BOT AVANZATO
            </h1>

            <p
              style={{
                fontSize: "0.95rem",
                color: "#e5e7eb",
                opacity: 0.9,
                maxWidth: 780,
                lineHeight: 1.7,
              }}
            >
              Prova il chatbot in tempo reale. Puoi fare domande sui servizi
              oppure registrare una prenotazione di prova con il box{" "}
              <strong>“Prenotazione veloce dal bot”</strong> qui sotto. Le
              prenotazioni di prova finiscono in un foglio Google, come
              succederebbe per il barbiere reale.
            </p>
          </header>

          {/* LAYOUT RESPONSIVE: SU MOBILE IN COLONNA, SU DESKTOP DUE COLONNE */}
          <div className="barber-layout">
            {/* COLONNA SINISTRA – CHAT + PRENOTAZIONE */}
            <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Box istruzioni */}
              <div
                style={{
                  borderRadius: 20,
                  border: "1px solid rgba(51,65,85,0.9)",
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,23,42,1))",
                  padding: "12px 16px 10px",
                  fontSize: "0.86rem",
                  lineHeight: 1.7,
                  color: "#e5e7eb",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: 6,
                    fontSize: "0.9rem",
                  }}
                >
                  Come provare questa demo di prenotazione
                </div>
                <ul style={{ paddingLeft: "1.1rem", margin: 0 }}>
                  <li>
                    Fai una domanda al bot nella chat in alto (orari, servizi,
                    prezzi).
                  </li>
                  <li>
                    Per registrare una prenotazione di prova usa il box
                    “Prenotazione veloce dal bot” sotto la chat.
                  </li>
                  <li>
                    Se scegli una data passata o un orario già occupato, il
                    sistema ti avvisa e non salva la prenotazione.
                  </li>
                </ul>
              </div>

              {/* CHATBOX */}
              <ChatBox sector="barbiere" />

              {/* PRENOTAZIONE VELOCE – UN SOLO BLOCCO */}
              <div
                style={{
                  borderRadius: 24,
                  border: "1px solid rgba(148,163,184,0.5)",
                  background:
                    "radial-gradient(circle at top left, rgba(56,189,248,0.16), rgba(15,23,42,1) 55%)",
                  padding: "14px 16px 12px",
                  boxShadow: "0 26px 60px rgba(15,23,42,0.9)",
                  marginTop: 4,
                }}
              >
                <div
                  style={{
                    fontSize: "0.98rem",
                    fontWeight: 600,
                    color: "#f9fafb",
                    marginBottom: 4,
                  }}
                >
                  Prenotazione veloce dal bot 📅💈
                </div>
                <p
                  style={{
                    fontSize: "0.84rem",
                    color: "#e5e7eb",
                    opacity: 0.9,
                    marginBottom: 10,
                    lineHeight: 1.6,
                  }}
                >
                  Compila questi campi e il sistema salva la prenotazione
                  direttamente nel pannello del barbiere (foglio Google di test).
                  I messaggi scritti nella chat <strong>non</strong> creano
                  prenotazioni.
                </p>

                <form
                  onSubmit={handleBooking}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    fontSize: "0.86rem",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.1fr 1.1fr",
                      gap: 8,
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: 4,
                          fontSize: "0.78rem",
                          color: "#cbd5f5",
                        }}
                      >
                        Nome
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Es. Marco"
                        style={inputFieldStyle}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: 4,
                          fontSize: "0.78rem",
                          color: "#cbd5f5",
                        }}
                      >
                        Telefono
                      </label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Es. 3331234567"
                        style={inputFieldStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: 4,
                        fontSize: "0.78rem",
                        color: "#cbd5f5",
                      }}
                    >
                      Servizio
                    </label>
                    <input
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      style={inputFieldStyle}
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.1fr 1.1fr",
                      gap: 8,
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: 4,
                          fontSize: "0.78rem",
                          color: "#cbd5f5",
                        }}
                      >
                        Data
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={inputFieldStyle}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: 4,
                          fontSize: "0.78rem",
                          color: "#cbd5f5",
                        }}
                      >
                        Ora
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        style={{
                          ...inputFieldStyle,
                          cursor: "pointer",
                          backgroundColor: "#020617",
                        }}
                      >
                        <option value="">Seleziona un orario</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: 4,
                        fontSize: "0.78rem",
                        color: "#cbd5f5",
                      }}
                    >
                      Note (opzionale)
                    </label>
                    <input
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Es. preferisco la macchinetta"
                      style={inputFieldStyle}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      marginTop: 6,
                      borderRadius: 9999,
                      padding: "10px 16px",
                      border: "none",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      backgroundColor: loading ? "#16a34a99" : "#16a34a",
                      color: "#022c22",
                      cursor: loading ? "default" : "pointer",
                    }}
                  >
                    {loading ? "Invio in corso..." : "Invia prenotazione"}
                  </button>

                  {status && (
                    <p
                      style={{
                        marginTop: 6,
                        fontSize: "0.8rem",
                        color: status.type === "ok" ? "#bbf7d0" : "#fecaca",
                      }}
                    >
                      {status.message}
                    </p>
                  )}
                </form>

                <p
                  style={{
                    marginTop: 8,
                    fontSize: "0.72rem",
                    color: "#9ca3af",
                  }}
                >
                  Questo è solo un esempio. Nel progetto reale colleghiamo
                  GalaxBot AI al foglio del barbiere e il bot lavora sulle
                  richieste vere dei clienti.
                </p>
              </div>
            </section>

            {/* COLONNA DESTRA – SPIEGAZIONE + BOTTONI */}
            <section>
              <div
                style={{
                  borderRadius: 24,
                  border: "1px solid rgba(34,197,94,0.75)",
                  background:
                    "linear-gradient(135deg, rgba(22,163,74,0.18), rgba(8,47,73,1))",
                  padding: "16px 18px 14px",
                  boxShadow: "0 28px 70px rgba(0,0,0,0.85)",
                }}
              >
                <h2
                  style={{
                    fontSize: "1rem",
                    marginBottom: 6,
                    color: "#f9fafb",
                  }}
                >
                  Come puoi usare questo bot nel tuo negozio
                </h2>

                <ul
                  style={{
                    paddingLeft: "1.1rem",
                    margin: "0 0 10px 0",
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
                    Le richieste di appuntamento finiscono in un foglio Google
                    che puoi controllare quando vuoi.
                  </li>
                  <li>
                    Possiamo adattare lo stesso sistema a pizzerie, bar,
                    pasticcerie, hotel, studi medici, negozi di abbigliamento e
                    altri settori.
                  </li>
                </ul>

                <p
                  style={{
                    fontSize: "0.84rem",
                    color: "#d1fae5",
                    marginBottom: 12,
                  }}
                >
                  Compilando il modulo di iscrizione ti preparo una versione
                  personalizzata del bot per la tua attività. Se ti piace, puoi
                  attivare l&apos;abbonamento e collegarlo a WhatsApp Business,
                  sito o solo come app con link + QR code.
                </p>

                <button
                  type="button"
                  onClick={goToIscriviti}
                  style={{
                    width: "100%",
                    borderRadius: 9999,
                    marginBottom: 8,
                    padding: "10px 14px",
                    border: "none",
                    background: "linear-gradient(135deg, #22c55e, #a3e635)",
                    color: "#052e16",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Compila il modulo per il tuo bot
                </button>

                <button
                  type="button"
                  onClick={goToIscriviti}
                  style={{
                    width: "100%",
                    borderRadius: 9999,
                    padding: "10px 14px",
                    border: "none",
                    background: "linear-gradient(135deg, #f97316, #ef4444)",
                    color: "#111827",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Vedi prezzi e attiva l&apos;abbonamento
                </button>

                <p
                  style={{
                    marginTop: 10,
                    fontSize: "0.72rem",
                    color: "#d1fae5",
                  }}
                >
                  Quando clicchi su questi pulsanti si apre la pagina iscrizione
                  GalaxBot AI in una nuova scheda. Da lì puoi compilare il
                  modulo ufficiale su Google e scegliere il piano che preferisci
                  su Stripe. In ogni momento puoi chiudere la scheda e tornare
                  al sito.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* CSS per layout responsive */}
      <style jsx>{`
        .barber-layout {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        @media (min-width: 960px) {
          .barber-layout {
            display: grid;
            grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
            gap: 24px;
            align-items: flex-start;
          }
        }

        @media (max-width: 640px) {
          .barber-layout {
            gap: 16px;
          }
        }
      `}</style>
    </>
  );
}

const inputFieldStyle: CSSProperties = {
  width: "100%",
  borderRadius: 9999,
  border: "1px solid rgba(148,163,184,0.75)",
  padding: "8px 12px",
  fontSize: "0.85rem",
  backgroundColor: "#020617",
  color: "#e5e7eb",
  outline: "none",
};