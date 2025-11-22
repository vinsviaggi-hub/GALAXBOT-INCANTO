// app/booking-test/page.tsx
"use client";

import { useState } from "react";

type Status =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export default function BookingTestPage() {
  const [name, setName] = useState("");
  const [service, setService] = useState("Taglio uomo");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setStatus({ type: "idle", message: "" });

    if (!name.trim() || !service.trim() || !date.trim() || !time.trim()) {
      setStatus({
        type: "error",
        message: "Compila almeno nome, servizio, data e ora.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          service: service.trim(),
          date: date.trim(),
          time: time.trim(),
          phone: phone.trim(),
          notes: notes.trim(),
        }),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // se il server risponde con HTML o testo strano
        setStatus({
          type: "error",
          message:
            "Risposta non valida dal server. Controlla lo script e riprova.",
        });
        return;
      }

      // Se qualcosa NON va bene
      if (!res.ok || !data?.success) {
        const serverMessage: string | undefined =
          data?.error || data?.message || undefined;

        // Caso orario già occupato (status 409 o flag conflict)
        if (res.status === 409 || data?.conflict) {
          setStatus({
            type: "error",
            message:
              serverMessage ||
              "Questo orario è già occupato. Scegli un altro orario.",
          });
          return;
        }

        // Altri errori (es. data nel passato, problemi vari)
        if (serverMessage) {
          setStatus({
            type: "error",
            message: serverMessage,
          });
        } else {
          setStatus({
            type: "error",
            message:
              "Errore nel salvataggio della prenotazione. Riprova tra poco.",
          });
        }
        return;
      }

      // TUTTO OK ✅
      setStatus({
        type: "success",
        message:
          data?.message ||
          (data?.rowNumber
            ? `Prenotazione creata! Riga n° ${data.rowNumber}.`
            : "Prenotazione creata con successo."),
      });

      // reset form (se vuoi tenerli, commenta queste righe)
      setName("");
      setService("Taglio uomo");
      setDate("");
      setTime("");
      setPhone("");
      setNotes("");
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message:
          "Errore di rete o del server. Controlla che il progetto sia in esecuzione.",
      });
    } finally {
      setLoading(false);
    }
  }

  const statusColor =
    status.type === "success"
      ? "#16a34a" // verde
      : status.type === "error"
      ? "#f97316" // arancione/rosso
      : "transparent";

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1a1f4a 0, #020617 50%, #000 100%)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 16px",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          background: "rgba(15,23,42,0.95)",
          borderRadius: 24,
          padding: 24,
          boxShadow: "0 25px 60px rgba(0,0,0,0.65)",
          border: "1px solid rgba(148,163,184,0.35)",
        }}
      >
        <h1
          style={{
            fontSize: "1.6rem",
            fontWeight: 800,
            marginBottom: 4,
            color: "#f9fafb",
          }}
        >
          Test prenotazioni → Google Sheets
        </h1>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#cbd5f5",
            marginBottom: 20,
          }}
        >
          Compila questo form: la richiesta passa da{" "}
          <code style={{ fontFamily: "monospace" }}>/api/bookings</code> e
          finisce sul foglio <b>Prenotazioni Barbiere BOT</b>.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Nome */}
          <div style={{ marginBottom: 12 }}>
            <label
              style={{ display: "block", marginBottom: 4, fontSize: "0.9rem" }}
            >
              Nome cliente
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Es: Mario Rossi"
              style={inputStyle}
            />
          </div>

          {/* Servizio */}
          <div style={{ marginBottom: 12 }}>
            <label
              style={{ display: "block", marginBottom: 4, fontSize: "0.9rem" }}
            >
              Servizio
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={inputStyle}
            >
              <option>Taglio uomo</option>
              <option>Taglio + barba</option>
              <option>Barba</option>
              <option>Altro</option>
            </select>
          </div>

          {/* Data */}
          <div style={{ marginBottom: 12, display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 4,
                  fontSize: "0.9rem",
                }}
              >
                Data
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Ora */}
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 4,
                  fontSize: "0.9rem",
                }}
              >
                Ora
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Telefono */}
          <div style={{ marginBottom: 12 }}>
            <label
              style={{ display: "block", marginBottom: 4, fontSize: "0.9rem" }}
            >
              Telefono
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+393331234567"
              style={inputStyle}
            />
          </div>

          {/* Note */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{ display: "block", marginBottom: 4, fontSize: "0.9rem" }}
            >
              Note
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Es: Prenotazione di prova dal sito"
              rows={3}
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: 70,
              }}
            />
          </div>

          {/* Pulsante */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              borderRadius: 9999,
              padding: "12px 20px",
              border: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: loading ? "default" : "pointer",
              background: loading
                ? "linear-gradient(90deg,#94a3b8,#64748b)"
                : "linear-gradient(90deg,#22c55e,#16a34a)",
              color: "#0f172a",
              boxShadow: "0 0 30px rgba(34,197,94,0.4)",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
            }}
          >
            {loading ? "Invio in corso..." : "Invia prenotazione di test"}
          </button>
        </form>

        {/* Messaggio di stato */}
        {status.type !== "idle" && (
          <div
            style={{
              marginTop: 14,
              padding: "8px 12px",
              borderRadius: 9999,
              background: statusColor,
              color: "#0f172a",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 9999,
  border: "1px solid rgba(148,163,184,0.5)",
  background: "rgba(15,23,42,0.9)",
  color: "#e5e7eb",
  padding: "10px 14px",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
};