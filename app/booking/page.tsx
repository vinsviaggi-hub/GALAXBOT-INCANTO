"use client";

import { useState, FormEvent } from "react";

export default function FastBookingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [treatment, setTreatment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !phone || !treatment || !date || !time) return alert("Compila tutti i campi obbligatori ✨");

    setSuccess(true);
    setName("");
    setPhone("");
    setTreatment("");
    setDate("");
    setTime("");
    setNotes("");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#fce7f3",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 16px",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          backgroundColor: "white",
          borderRadius: 16,
          padding: "20px 24px",
          boxShadow: "0 4px 30px rgba(255,192,203,0.4)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#9d174d",
            fontSize: "1.3rem",
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Prenotazione veloce ✨
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: "0.85rem",
            marginBottom: 14,
          }}
        >
          Compila il modulo per richiedere un appuntamento al centro estetico.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <label style={labelStyle}>
            Nome *
            <input
              type="text"
              placeholder="Es. Aurora"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Telefono *
            <input
              type="tel"
              placeholder="Es. 389 561 7880"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Trattamento desiderato *
            <input
              type="text"
              placeholder="Es. trattamento viso, manicure, ceretta..."
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              style={inputStyle}
            />
          </label>

          <div style={{ display: "flex", gap: 10 }}>
            <label style={{ ...labelStyle, flex: 1 }}>
              Data *
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={inputStyle}
              />
            </label>

            <label style={{ ...labelStyle, flex: 1 }}>
              Ora *
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={inputStyle}
              />
            </label>
          </div>

          <label style={labelStyle}>
            Note (facoltative)
            <textarea
              rows={3}
              placeholder="Es. preferisco al mattino, trattamento rilassante..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ ...inputStyle, borderRadius: 12, resize: "vertical" }}
            />
          </label>

          <button
            type="submit"
            style={{
              marginTop: 10,
              borderRadius: 9999,
              border: "none",
              padding: "10px 16px",
              fontSize: "0.95rem",
              fontWeight: 600,
              backgroundColor: "#db2777",
              color: "white",
              cursor: "pointer",
            }}
          >
            Invia richiesta 💖
          </button>

          {success && (
            <p
              style={{
                marginTop: 12,
                color: "#16a34a",
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              Prenotazione inviata con successo! Ti ricontatteremo per confermare 💅
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#9d174d",
  fontWeight: 600,
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const inputStyle: React.CSSProperties = {
  border: "1px solid #f9a8d4",
  borderRadius: 9999,
  padding: "8px 12px",
  fontSize: "0.9rem",
  color: "#374151",
  outline: "none",
};