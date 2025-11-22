"use client";

import React, {
  useState,
  useRef,
  useEffect,
  type FormEvent,
  type KeyboardEvent,
} from "react";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

type BookingState = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  note: string;
};

const initialBooking: BookingState = {
  name: "",
  phone: "",
  service: "Taglio uomo",
  date: "",
  time: "",
  note: "",
};

export default function BarberDemoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text:
        "Ciao! 👋 Sono il bot del barber shop. Puoi farmi domande sui servizi oppure usare il box «Prenotazione veloce dal bot» qui sotto per registrare un appuntamento di prova.",
    },
  ]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const [booking, setBooking] = useState<BookingState>(initialBooking);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<null | "ok" | "error">(
    null
  );
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  async function handleChatSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || chatLoading) return;

    const userMsg: ChatMessage = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setChatLoading(true);

    try {
      // Demo: risposta finta, NON chiama API reali.
      await new Promise((r) => setTimeout(r, 800));
      const reply =
        "Questo è un esempio di risposta del bot. Nel progetto reale collego GalaxBot AI al tuo WhatsApp Business, Instagram o sito e il bot risponde da solo ai clienti 24/7. ✂️";

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Ops, qualcosa è andato storto nel demo. Riprova tra poco oppure contattami da GalaxBot AI. 🙏",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  function handleChatKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // fingo submit
      const form = (e.currentTarget as HTMLInputElement).form;
      if (form) form.requestSubmit();
    }
  }

  async function handleBookingSubmit(e: FormEvent) {
    e.preventDefault();
    if (bookingLoading) return;

    setBookingLoading(true);
    setBookingStatus(null);
    setBookingMessage(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (!res.ok) {
        throw new Error("Errore risposta API");
      }

      const data = await res.json();

      setBookingStatus("ok");
      setBookingMessage(
        data?.message ||
          "Prenotazione inviata al pannello del barbiere (foglio di prova)."
      );

      // aggiungo messaggio di conferma nella chat
      const summary =
        `Ho registrato la tua richiesta di prenotazione ✅\n\n` +
        `Nome: ${booking.name || "—"}\n` +
        `Servizio: ${booking.service || "—"}\n` +
        `Data: ${booking.date || "—"}\n` +
        `Ora: ${booking.time || "—"}\n` +
        `Telefono: ${booking.phone || "—"}`;

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: summary },
      ]);

      setBooking((prev) => ({
        ...initialBooking,
        service: prev.service, // lascio il servizio scelto
      }));
    } catch {
      setBookingStatus("error");
      setBookingMessage(
        "Non sono riuscito a salvare la prenotazione di prova. Riprova tra poco."
      );
    } finally {
      setBookingLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1d2448 0, #020617 55%, #000000 100%)",
        color: "#e5e7eb",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "32px 16px 48px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1180 }}>
        {/* BADGE + TITOLO */}
        <header style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 12px",
              borderRadius: 999,
              background: "rgba(15,23,42,0.85)",
              border: "1px solid rgba(148,163,184,0.9)",
              fontSize: "0.75rem",
              letterSpacing: 0.8,
              textTransform: "uppercase",
              marginBottom: 8,
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
            <span>Demo bot avanzato per barber shop</span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <div style={{ maxWidth: 640 }}>
              <h1
                style={{
                  fontSize: "2.1rem",
                  fontWeight: 800,
                  marginBottom: 6,
                  color: "#f9fafb",
                }}
              >
                Prenotazioni Barbiere BOT AVANZATO 💈
              </h1>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: "#e5e7eb",
                  opacity: 0.95,
                }}
              >
                Prova il chatbot in tempo reale. Puoi fare domande sui servizi
                oppure prenotare direttamente con il box{" "}
                <strong>“Prenotazione veloce dal bot”</strong> sotto la chat.
                Le prenotazioni di prova finiscono in un foglio Google, come
                succederebbe per il barbiere reale.
              </p>
            </div>

            <div
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                background:
                  "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,1))",
                border: "1px solid rgba(148,163,184,0.9)",
                fontSize: "0.78rem",
                maxWidth: 320,
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>
                GalaxBot AI × Barber Shop ✂️
              </div>
              <div style={{ opacity: 0.9 }}>
                Chat + prenotazioni automatiche da WhatsApp, Instagram o sito.
                Lo stesso sistema si adatta anche a pizzerie, bar, studi medici,
                negozi e altri settori.
              </div>
            </div>
          </div>
        </header>

        {/* LAYOUT DUE COLONNE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
            gap: 18,
          }}
        >
          {/* COLONNA SINISTRA: CHAT + UN SOLO MODULO PRENOTAZIONE */}
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* Istruzioni */}
            <div
              style={{
                borderRadius: 18,
                padding: "10px 14px",
                background:
                  "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.98))",
                border: "1px solid rgba(51,65,85,0.95)",
                fontSize: "0.8rem",
                lineHeight: 1.6,
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  marginBottom: 4,
                  color: "#e5e7eb",
                }}
              >
                Come provare questa demo di prenotazione
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.1rem",
                  color: "#e5e7eb",
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
                  Se scegli una data passata o un orario già occupato, il
                  sistema ti avvisa e non salva la prenotazione.
                </li>
              </ul>
            </div>

            {/* Card chat */}
            <div
              style={{
                borderRadius: 22,
                padding: "14px 14px 12px",
                background:
                  "radial-gradient(circle at top left, #020617 0, #020617 45%, #020617 100%)",
                border: "1px solid rgba(51,65,85,0.95)",
                boxShadow: "0 24px 60px rgba(15,23,42,0.9)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                minHeight: 260,
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  marginBottom: 4,
                }}
              >
                Prova il chatbot in tempo reale 💬
              </div>

              <div
                style={{
                  flex: 1,
                  borderRadius: 18,
                  background:
                    "radial-gradient(circle at top, #020617 0, #020617 60%, #020617 100%)",
                  border: "1px solid rgba(55,65,81,0.9)",
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    paddingRight: 4,
                  }}
                >
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent:
                          msg.sender === "user" ? "flex-end" : "flex-start",
                        marginBottom: 6,
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "82%",
                          padding: "8px 11px",
                          borderRadius:
                            msg.sender === "user"
                              ? "999px 999px 0 999px"
                              : "999px 999px 999px 0",
                          background:
                            msg.sender === "user"
                              ? "linear-gradient(135deg,#38bdf8,#0ea5e9)"
                              : "rgba(15,23,42,0.95)",
                          color: msg.sender === "user" ? "#0f172a" : "#e5e7eb",
                          fontSize: "0.85rem",
                          lineHeight: 1.5,
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                <form
                  onSubmit={handleChatSubmit}
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 4,
                  }}
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleChatKeyDown}
                    placeholder="Scrivi qui il tuo messaggio..."
                    style={{
                      flex: 1,
                      borderRadius: 999,
                      border: "1px solid rgba(148,163,184,0.9)",
                      padding: "9px 13px",
                      fontSize: "0.9rem",
                      outline: "none",
                      backgroundColor: "#020617",
                      color: "#e5e7eb",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={chatLoading}
                    style={{
                      padding: "9px 16px",
                      borderRadius: 999,
                      border: "none",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      background:
                        "linear-gradient(135deg,#0ea5e9,#38bdf8,#22c55e)",
                      color: "#020617",
                      opacity: chatLoading ? 0.7 : 1,
                    }}
                  >
                    {chatLoading ? "..." : "Invia"}
                  </button>
                </form>
              </div>
            </div>

            {/* UNICO box prenotazione veloce */}
            <div
              style={{
                borderRadius: 22,
                padding: "14px 16px 16px",
                marginTop: 4,
                background:
                  "radial-gradient(circle at top, #020617 0, #020617 55%, #020617 100%)",
                border: "1px solid rgba(55,65,81,0.95)",
                boxShadow: "0 24px 60px rgba(15,23,42,0.9)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <h2
                  style={{
                    fontSize: "0.98rem",
                    margin: 0,
                    color: "#f9fafb",
                  }}
                >
                  Prenotazione veloce dal bot 📅
                </h2>
              </div>

              <p
                style={{
                  fontSize: "0.82rem",
                  lineHeight: 1.6,
                  color: "#e5e7eb",
                  marginBottom: 10,
                }}
              >
                Compila questi campi e il sistema salva la prenotazione
                direttamente nel pannello del barbiere (foglio Google di test).
                I messaggi scritti nella chat <strong>non</strong> creano
                prenotazioni.
              </p>

              <form
                onSubmit={handleBookingSubmit}
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
                    gridTemplateColumns: "1.1fr 1fr",
                    gap: 8,
                  }}
                >
                  <InputField
                    label="Nome"
                    value={booking.name}
                    onChange={(v) =>
                      setBooking((b) => ({ ...b, name: v }))
                    }
                  />
                  <InputField
                    label="Telefono"
                    value={booking.phone}
                    onChange={(v) =>
                      setBooking((b) => ({ ...b, phone: v }))
                    }
                  />
                </div>

                <InputField
                  label="Servizio (es. Taglio uomo)"
                  value={booking.service}
                  onChange={(v) =>
                    setBooking((b) => ({ ...b, service: v }))
                  }
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.1fr 1fr",
                    gap: 8,
                  }}
                >
                  <InputField
                    label="Data"
                    type="date"
                    value={booking.date}
                    onChange={(v) =>
                      setBooking((b) => ({ ...b, date: v }))
                    }
                  />
                  <InputField
                    label="Ora"
                    type="time"
                    value={booking.time}
                    onChange={(v) =>
                      setBooking((b) => ({ ...b, time: v }))
                    }
                  />
                </div>

                <InputField
                  label="Note (opzionale)"
                  value={booking.note}
                  onChange={(v) =>
                    setBooking((b) => ({ ...b, note: v }))
                  }
                />

                {bookingStatus && bookingMessage && (
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: "0.78rem",
                      padding: "6px 8px",
                      borderRadius: 999,
                      background:
                        bookingStatus === "ok"
                          ? "rgba(22,163,74,0.16)"
                          : "rgba(239,68,68,0.16)",
                      color:
                        bookingStatus === "ok" ? "#bbf7d0" : "#fecaca",
                    }}
                  >
                    {bookingMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={bookingLoading}
                  style={{
                    marginTop: 6,
                    padding: "9px 14px",
                    borderRadius: 999,
                    border: "none",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    background:
                      "linear-gradient(135deg,#22c55e,#16a34a,#15803d)",
                    color: "#022c22",
                    boxShadow: "0 16px 30px rgba(22,163,74,0.6)",
                    opacity: bookingLoading ? 0.7 : 1,
                  }}
                >
                  {bookingLoading ? "Invio in corso..." : "Invia prenotazione"}
                </button>
              </form>

              <p
                style={{
                  marginTop: 8,
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                }}
              >
                Questo è solo un esempio. Nel progetto reale colleghiamo
                GalaxBot AI al tuo WhatsApp Business, Instagram o sito web e lo
                adattiamo al tuo settore (barbiere, pizzeria, studio medico,
                negozio, ecc.), così il bot si occupa di messaggi e prenotazioni
                al posto tuo.
              </p>
            </div>
          </section>

          {/* COLONNA DESTRA: SPIEGAZIONE + BOTTONI VERSO ISCRIVITI */}
          <section
            style={{
              borderRadius: 22,
              padding: "16px 16px 18px",
              background:
                "radial-gradient(circle at top, #022c22 0, #022c22 40%, #020617 100%)",
              border: "1px solid rgba(22,163,74,0.9)",
              boxShadow: "0 24px 60px rgba(15,23,42,0.95)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                margin: 0,
                color: "#ecfdf5",
              }}
            >
              Come puoi usare questo bot nel tuo negozio
            </h2>

            <ul
              style={{
                margin: 0,
                paddingLeft: "1.1rem",
                fontSize: "0.88rem",
                lineHeight: 1.6,
                color: "#d1fae5",
              }}
            >
              <li>
                I clienti ti scrivono su WhatsApp, Instagram o dal sito e il bot
                risponde subito al posto tuo.
              </li>
              <li>
                Le richieste di appuntamento finiscono in un foglio Google che
                puoi controllare quando vuoi.
              </li>
              <li>
                Possiamo adattare lo stesso sistema a pizzerie, bar,
                pasticcerie, hotel, studi medici, negozi di abbigliamento e
                altri settori.
              </li>
            </ul>

            <p
              style={{
                marginTop: 4,
                fontSize: "0.8rem",
                lineHeight: 1.6,
                color: "#bbf7d0",
              }}
            >
              Compilando il modulo di iscrizione ti preparo una versione
              personalizzata del bot per la tua attività. Se ti piace, puoi
              attivare l’abbonamento e collegarlo a WhatsApp Business, sito o
              solo come app con link + QR code.
            </p>

            <p
              style={{
                fontSize: "0.78rem",
                lineHeight: 1.5,
                color: "#a7f3d0",
              }}
            >
              Quando clicchi sui pulsanti qui sotto, vai alla pagina iscrizione
              GalaxBot AI. Da lì puoi compilare il modulo ufficiale su Google
              (che rimane collegato al foglio con le risposte) e scegliere il
              piano che preferisci. In ogni momento puoi chiudere la scheda e
              tornare al sito.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 6,
              }}
            >
              <a
                href="/iscriviti#modulo"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "9px 12px",
                  borderRadius: 999,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  background:
                    "linear-gradient(135deg,#22c55e,#a3e635,#facc15)",
                  color: "#022c22",
                  boxShadow: "0 18px 40px rgba(22,163,74,0.7)",
                }}
              >
                Compila il modulo per il tuo bot
              </a>

              <a
                href="/iscriviti#piani"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "9px 12px",
                  borderRadius: 999,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  background:
                    "linear-gradient(135deg,#f97316,#ea580c,#e11d48)",
                  color: "#111827",
                  boxShadow: "0 18px 40px rgba(249,115,22,0.7)",
                }}
              >
                Vedi prezzi e attiva l’abbonamento
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* --- Componenti interni --- */

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

function InputField({ label, value, onChange, type = "text" }: InputFieldProps) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        fontSize: "0.78rem",
        color: "#e5e7eb",
      }}
    >
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          borderRadius: 999,
          border: "1px solid rgba(148,163,184,0.9)",
          padding: "7px 11px",
          fontSize: "0.86rem",
          backgroundColor: "#020617",
          color: "#e5e7eb",
          outline: "none",
        }}
      />
    </label>
  );
}