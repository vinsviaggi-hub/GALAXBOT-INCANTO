"use client";

import { useState, type FormEvent, type CSSProperties } from "react";

type BookingForm = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
};

export default function BarbiereDemoPage() {
  const [form, setForm] = useState<BookingForm>({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  function updateField<K extends keyof BookingForm>(
    key: K,
    value: BookingForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setStatusMessage(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          (data && (data.error || data.message)) ||
            "Errore durante la prenotazione"
        );
      }

      setStatus("success");
      setStatusMessage(
        "Prenotazione di prova registrata nel foglio Google del barbiere demo. Nel progetto reale useremo il foglio collegato al tuo negozio."
      );
    } catch (err: any) {
      setStatus("error");
      setStatusMessage(
        err?.message ||
          "Non sono riuscito a salvare la prenotazione di prova. Riprova tra qualche secondo."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #0f172a 0, #020617 55%, #000000 100%)",
        color: "#e5e7eb",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "32px 16px 48px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1120 }}>
        {/* BADGE */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 12px",
            borderRadius: 9999,
            background: "rgba(15,23,42,0.9)",
            border: "1px solid rgba(148,163,184,0.85)",
            fontSize: "0.74rem",
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#e5e7eb",
            marginBottom: 10,
          }}
        >
          Demo bot avanzato per barber shop 💈
        </div>

        {/* HEADER */}
        <header style={{ marginBottom: 22 }}>
          <h1
            style={{
              fontSize: "2rem",
              lineHeight: 1.2,
              marginBottom: 6,
            }}
          >
            Prenotazioni Barbiere BOT AVANZATO
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              opacity: 0.9,
              maxWidth: 780,
              lineHeight: 1.7,
            }}
          >
            Prova il chatbot in tempo reale. Puoi fare domande sui servizi
            oppure prenotare direttamente con il box{" "}
            <strong>“Prenotazione veloce dal bot”</strong> sotto la chat. Le
            prenotazioni di prova finiscono in un foglio Google, come
            succederebbe per il barbiere reale.
          </p>
        </header>

        {/* LAYOUT DUE COLONNE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
            gap: 20,
          }}
        >
          {/* COLONNA SINISTRA */}
          <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* ISTRUZIONI */}
            <div
              style={{
                borderRadius: 18,
                padding: "14px 16px",
                background: "rgba(15,23,42,0.97)",
                border: "1px solid rgba(55,65,81,0.9)",
                fontSize: "0.85rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.9rem",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                Come provare questa demo di prenotazione
              </div>
              <ul style={{ paddingLeft: "1.05rem", margin: 0, lineHeight: 1.7 }}>
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

            {/* CHAT FINTA (SOLO ESTETICA) */}
            <div
              style={{
                borderRadius: 22,
                padding: "14px 14px 12px",
                background:
                  "radial-gradient(circle at top left, #020617 0, #020617 55%, #020617 100%)",
                border: "1px solid rgba(51,65,85,0.95)",
                boxShadow: "0 22px 55px rgba(15,23,42,0.9)",
              }}
            >
              <div
                style={{
                  fontSize: "0.86rem",
                  marginBottom: 8,
                  color: "#e5e7eb",
                }}
              >
                Prova il chatbot in tempo reale 💬
              </div>

              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "88%",
                    padding: "10px 12px",
                    borderRadius: 18,
                    borderTopLeftRadius: 4,
                    background:
                      "linear-gradient(135deg, rgba(31,41,55,1), rgba(30,64,175,1))",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                  }}
                >
                  Ciao! 👋 Sono il bot del barber shop. Puoi farmi domande sui
                  servizi oppure usare il box{" "}
                  <strong>«Prenotazione veloce dal bot»</strong> qui sotto per
                  registrare un appuntamento di prova.
                </div>
              </div>

              {/* INPUT FINT0 */}
              <div
                style={{
                  marginTop: 6,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    borderRadius: 9999,
                    background: "#020617",
                    border: "1px solid rgba(75,85,99,0.9)",
                    padding: "8px 14px",
                    fontSize: "0.86rem",
                    color: "#9ca3af",
                  }}
                >
                  Scrivi qui il tuo messaggio…
                </div>
                <button
                  type="button"
                  style={{
                    borderRadius: 9999,
                    border: "none",
                    padding: "8px 16px",
                    fontSize: "0.86rem",
                    fontWeight: 600,
                    cursor: "default",
                    background: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
                    color: "#0b1120",
                    boxShadow: "0 0 0 1px rgba(15,23,42,0.6)",
                  }}
                >
                  Invia
                </button>
              </div>
            </div>

            {/* MODULO PRENOTAZIONE */}
            <div
              style={{
                borderRadius: 22,
                padding: "16px 16px 14px",
                background: "rgba(15,23,42,0.97)",
                border: "1px solid rgba(55,65,81,0.95)",
                boxShadow: "0 22px 55px rgba(15,23,42,0.9)",
                marginTop: 6,
              }}
            >
              <h2
                style={{
                  fontSize: "0.98rem",
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Prenotazione veloce dal bot <span>📅</span>
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
                direttamente nel pannello del barbiere (foglio Google di test).
                I messaggi scritti nella chat{" "}
                <strong>non creano prenotazioni</strong>.
              </p>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {/* NOME + TELEFONO */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <input
                    type="text"
                    placeholder="Nome"
                    required
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    style={fieldStyle}
                  />
                  <input
                    type="tel"
                    placeholder="Telefono"
                    required
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    style={fieldStyle}
                  />
                </div>

                {/* SERVIZIO */}
                <input
                  type="text"
                  placeholder="Servizio (es. Taglio uomo)"
                  required
                  value={form.service}
                  onChange={(e) => updateField("service", e.target.value)}
                  style={fieldStyle}
                />

                {/* DATA + ORA */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    style={fieldStyle}
                  />
                  <input
                    type="time"
                    required
                    value={form.time}
                    onChange={(e) => updateField("time", e.target.value)}
                    style={fieldStyle}
                  />
                </div>

                {/* NOTE */}
                <input
                  type="text"
                  placeholder="Note (opzionale)"
                  value={form.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  style={fieldStyle}
                />

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: 6,
                    borderRadius: 9999,
                    border: "none",
                    padding: "10px 16px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: loading ? "default" : "pointer",
                    background: "linear-gradient(135deg, #22c55e, #4ade80)",
                    color: "#052e16",
                    boxShadow: "0 14px 35px rgba(22,163,74,0.45)",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Invio in corso…" : "Invia prenotazione"}
                </button>

                {status !== "idle" && statusMessage && (
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: "0.8rem",
                      color: status === "success" ? "#4ade80" : "#f97373",
                    }}
                  >
                    {statusMessage}
                  </p>
                )}
              </form>

              <p
                style={{
                  marginTop: 10,
                  fontSize: "0.78rem",
                  color: "#9ca3af",
                  lineHeight: 1.6,
                }}
              >
                Questo è solo un esempio. Nel progetto reale colleghiamo
                GalaxBot AI al tuo WhatsApp Business, Instagram o sito web e lo
                adattiamo al tuo settore (barbiere, pizzeria, studio medico,
                negozio, ecc.), così il bot si occupa di messaggi e
                prenotazioni al posto tuo.
              </p>
            </div>
          </section>

          {/* COLONNA DESTRA */}
          <section>
            <div
              style={{
                borderRadius: 22,
                padding: "18px 18px 16px",
                background: "rgba(15,23,42,0.97)",
                border: "1px solid rgba(148,163,184,0.85)",
                boxShadow: "0 22px 55px rgba(15,23,42,0.9)",
                color: "#e5e7eb",
                fontSize: "0.9rem",
                lineHeight: 1.7,
              }}
            >
              <h2
                style={{
                  fontSize: "1rem",
                  marginBottom: 8,
                  color: "#f9fafb",
                }}
              >
                Come puoi usare questo bot nel tuo negozio
              </h2>
              <ul
                style={{
                  paddingLeft: "1.1rem",
                  margin: "0 0 10px",
                }}
              >
                <li>
                  I clienti ti scrivono su WhatsApp, Instagram o dal sito e il
                  bot risponde subito al posto tuo.
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
                  fontSize: "0.84rem",
                  marginBottom: 14,
                  color: "#cbd5f5",
                }}
              >
                Compilando il modulo di iscrizione ti preparo una versione
                personalizzata del bot per la tua attività. Se ti piace, puoi
                attivare l&apos;abbonamento e collegarlo a WhatsApp Business,
                sito o solo come app con link + QR code.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a
                  href="/iscriviti"
                  style={{
                    textDecoration: "none",
                    borderRadius: 9999,
                    textAlign: "center",
                    padding: "10px 14px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #22c55e, #4ade80)",
                    color: "#052e16",
                    boxShadow: "0 14px 35px rgba(22,163,74,0.5)",
                  }}
                >
                  Compila il modulo per il tuo bot
                </a>

                <a
                  href="/iscriviti#piani"
                  style={{
                    textDecoration: "none",
                    borderRadius: 9999,
                    textAlign: "center",
                    padding: "10px 14px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #f97316, #fb923c)",
                    color: "#7c2d12",
                    boxShadow: "0 14px 35px rgba(249,115,22,0.5)",
                  }}
                >
                  Vedi prezzi e attiva l&apos;abbonamento
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

const fieldStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
  borderRadius: 9999,
  border: "1px solid rgba(75,85,99,0.95)",
  padding: "8px 12px",
  fontSize: "0.86rem",
  background: "#020617",
  color: "#f9fafb",
  outline: "none",
};