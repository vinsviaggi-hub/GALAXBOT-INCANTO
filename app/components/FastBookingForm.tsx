// app/components/FastBookingForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import type React from "react";

type Status = "idle" | "loading" | "success" | "conflict" | "error";

export default function FastBookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name || !service || !date || !time) {
      setStatus("error");
      setMessage("Compila almeno nome, trattamento, data e ora.");
      return;
    }

    setStatus("loading");
    setMessage("");

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

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        if (res.status === 409 || data?.conflict) {
          setStatus("conflict");
          setMessage(
            data?.error ||
              "Questo orario non è disponibile. Scegli un altro orario libero."
          );
          return;
        }

        setStatus("error");
        setMessage(
          data?.error ||
            "C'è stato un errore nel salvataggio della prenotazione. Riprova tra poco."
        );
        return;
      }

      setStatus("success");
      setMessage(
        "Prenotazione inviata correttamente! ✅ Ti ricontatteremo per confermare."
      );

      // pulisco i campi
      setName("");
      setService("");
      setDate("");
      setTime("");
      setNotes("");
    } catch (err) {
      console.error("[FAST BOOKING] Errore:", err);
      setStatus("error");
      setMessage(
        "Errore nel collegamento al pannello prenotazioni. Riprova tra poco."
      );
    }
  }

  const messageStyle: React.CSSProperties = {
    marginTop: 6,
    fontSize: 12,
    color:
      status === "success"
        ? "#16a34a" // verde
        : "#dc2626", // rosso
  };

  // layout semplice: su mobile una colonna, su desktop ci pensa il browser a allargare
  const rowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 8,
    marginBottom: 8,
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Nome + Telefono */}
      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Nome *</label>
          <input
            style={inputStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Es. Giulia"
          />
        </div>
        <div>
          <label style={labelStyle}>Telefono</label>
          <input
            style={inputStyle}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Es. 389 561 7880"
          />
        </div>
      </div>

      {/* Trattamento */}
      <div style={{ marginBottom: 8 }}>
        <label style={labelStyle}>Trattamento desiderato *</label>
        <input
          style={inputStyle}
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Es. trattamento viso, manicure, epilazione..."
        />
      </div>

      {/* Data + Ora */}
      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Data *</label>
          <input
            type="date"
            style={inputStyle}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>Ora *</label>
          <input
            type="time"
            style={inputStyle}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      {/* Note */}
      <div style={{ marginBottom: 10 }}>
        <label style={labelStyle}>Note (opzionale)</label>
        <input
          style={inputStyle}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Es. preferenze sul trattamento, zone da trattare…"
        />
      </div>

      {/* Bottone */}
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          width: "100%",
          borderRadius: 9999,
          border: "none",
          padding: "10px 16px",
          fontSize: 14,
          fontWeight: 600,
          backgroundColor: status === "loading" ? "#fb7185" : "#f9739b",
          color: "#ffffff",
          cursor: status === "loading" ? "default" : "pointer",
        }}
      >
        {status === "loading"
          ? "Invio prenotazione..."
          : "Conferma prenotazione"}
      </button>

      {/* Messaggio dinamico */}
      {message && <p style={messageStyle}>{message}</p>}

      {/* Testo finale */}
      <p
        style={{
          marginTop: 6,
          fontSize: 11,
          color: "#6b7280",
        }}
      >
        Dopo l&apos;invio, il centro ti ricontatterà per confermare giorno, ora e
        trattamento.
      </p>
    </form>
  );
}

// --- STILI BASE ---

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 4,
  fontSize: 12,
  fontWeight: 600,
  color: "#4b5563",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  padding: "7px 10px",
  fontSize: 13,
  boxSizing: "border-box",
  backgroundColor: "#ffffff",
};