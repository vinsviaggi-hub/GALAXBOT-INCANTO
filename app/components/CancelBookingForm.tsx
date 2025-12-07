// app/components/CancelBookingForm.tsx
"use client";

import React, { useState, type FormEvent, type CSSProperties } from "react";

type CancelStatus = "idle" | "loading" | "success" | "notFound" | "error";

// Slot orari validi: 08:30–12:30 e 15:00–20:00
const TIME_SLOTS: string[] = [
  "08:30","08:45",
  "09:00","09:15","09:30","09:45",
  "10:00","10:15","10:30","10:45",
  "11:00","11:15","11:30","11:45",
  "12:00","12:15","12:30",
  "15:00","15:15","15:30","15:45",
  "16:00","16:15","16:30","16:45",
  "17:00","17:15","17:30","17:45",
  "18:00","18:15","18:30","18:45",
  "19:00","19:15","19:30","19:45",
  "20:00",
];

export default function CancelBookingForm() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [status, setStatus] = useState<CancelStatus>("idle");
  const [message, setMessage] = useState("");

  function resetMessages() {
    setStatus("idle");
    setMessage("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    resetMessages();

    if (!phone || !name || !service || !date || !time) {
      setStatus("error");
      setMessage("Servono almeno nome, servizio, telefono, data e ora.");
      return;
    }

    if (!TIME_SLOTS.includes(time)) {
      setStatus("error");
      setMessage("Seleziona un orario valido tra quelli del barbiere.");
      return;
    }

    try {
      setStatus("loading");

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "cancel_booking",
          phone,
          name,
          service,
          date,
          time,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        if (res.status === 404 || data?.notFound) {
          setStatus("notFound");
          setMessage(
            data?.error ||
              "Non abbiamo trovato una prenotazione con questi dati. Controlla di aver inserito tutto correttamente."
          );
          return;
        }

        setStatus("error");
        setMessage(
          data?.error || "Errore durante l'annullamento. Riprova più tardi."
        );
        return;
      }

      setStatus("success");
      setMessage(
        data?.message ||
          "Prenotazione annullata correttamente. Lo slot è stato liberato."
      );

      setPhone("");
      setName("");
      setService("");
      setDate("");
      setTime("");
    } catch (err) {
      console.error("[CANCEL BOOKING] Errore:", err);
      setStatus("error");
      setMessage(
        "Errore di connessione con il pannello prenotazioni. Riprova tra qualche minuto."
      );
    }
  }

  return (
    <section style={cardStyle}>
      <h2 style={titleStyle}>
        Annulla prenotazione <span style={{ fontSize: "1.3rem" }}>❌</span>
      </h2>
      <p style={subtitleStyle}>
        Inserisci il <strong>telefono</strong>, il <strong>nome</strong>, il{" "}
        <strong>servizio</strong>, la <strong>data</strong> e l{"'"}{" "}
        <strong>ora</strong> della prenotazione che vuoi annullare.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <label style={labelStyle}>
          Telefono <span style={{ color: "#f97373" }}>*</span>
          <input
            type="tel"
            placeholder="Es. 333 123 4567"
            value={phone}
            onChange={(e) => {
              resetMessages();
              setPhone(e.target.value);
            }}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Nome <span style={{ color: "#f97373" }}>*</span>
          <input
            type="text"
            placeholder="Es. Marco"
            value={name}
            onChange={(e) => {
              resetMessages();
              setName(e.target.value);
            }}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Servizio <span style={{ color: "#f97373" }}>*</span>
          <input
            type="text"
            placeholder="Es. taglio, barba, sfumatura..."
            value={service}
            onChange={(e) => {
              resetMessages();
              setService(e.target.value);
            }}
            style={inputStyle}
          />
        </label>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <label style={{ ...labelStyle, flex: 1, minWidth: 140 }}>
            Data <span style={{ color: "#f97373" }}>*</span>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                resetMessages();
                setDate(e.target.value);
              }}
              style={inputStyle}
            />
          </label>

          <label style={{ ...labelStyle, flex: 1, minWidth: 140 }}>
            Ora <span style={{ color: "#f97373" }}>*</span>
            <select
              value={time}
              onChange={(e) => {
                resetMessages();
                setTime(e.target.value);
              }}
              style={{ ...inputStyle, paddingRight: "28px" }}
            >
              <option value="">Seleziona un orario</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            marginTop: 8,
            borderRadius: 9999,
            border: "none",
            padding: "10px 16px",
            fontSize: "0.95rem",
            fontWeight: 600,
            background:
              status === "loading"
                ? "#f97373"
                : "linear-gradient(to right, #ef4444, #991b1b)",
            color: "#fff",
            cursor: status === "loading" ? "default" : "pointer",
          }}
        >
          {status === "loading"
            ? "Annullamento in corso…"
            : "Annulla prenotazione"}
        </button>

        {message && (
          <p
            style={{
              marginTop: 10,
              fontSize: "0.8rem",
              color:
                status === "success"
                  ? "#4ade80"
                  : status === "notFound"
                  ? "#facc15"
                  : "#f87171",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
}

// ---------- STILI BASE ----------

const cardStyle: CSSProperties = {
  backgroundColor: "#111827",
  borderRadius: 16,
  padding: "14px 18px 16px",
  marginBottom: 16,
  border: "1px solid #374151",
  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
};

const titleStyle: CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "#f97373",
  marginBottom: 8,
};

const subtitleStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "#9ca3af",
  marginBottom: 12,
  lineHeight: 1.5,
};

const labelStyle: CSSProperties = {
  fontSize: "0.82rem",
  color: "#e5e7eb",
  fontWeight: 600,
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const inputStyle: CSSProperties = {
  borderRadius: 9999,
  border: "1px solid #4b5563",
  padding: "8px 12px",
  fontSize: "0.9rem",
  color: "#e5e7eb",
  outline: "none",
  backgroundColor: "#1f2937",
};