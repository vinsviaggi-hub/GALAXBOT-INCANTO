"use client";

import React, { useState, type FormEvent, type CSSProperties } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function CancelBookingForm() {
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  function resetMessages() {
    setStatus("idle");
    setMessage("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    resetMessages();

    if (!phone || !date || !time) {
      setStatus("error");
      setMessage("Compila telefono, data e orario indicato per annullare.");
      return;
    }

    try {
      setStatus("loading");

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "cancel",
          phone,
          date,
          time,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setStatus("error");
        setMessage(
          data?.error ||
            "Non sono riuscito ad annullare la richiesta. Controlla i dati."
        );
        return;
      }

      setStatus("success");
      setMessage(
        data?.message ||
          "Richiesta annullata correttamente. Ti aspettiamo quando vuoi! 💖"
      );

      setPhone("");
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

  const cardStyle: CSSProperties = {
    backgroundColor: "#ffe4f2",
    borderRadius: 18,
    padding: "16px 18px 18px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.05)",
    border: "1px solid rgba(244,114,182,0.35)",
    color: "#4b5563",
    marginTop: 12,
  };

  const labelStyle: CSSProperties = {
    display: "block",
    fontSize: "0.78rem",
    marginBottom: 4,
    color: "#9b1239",
    fontWeight: 600,
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    borderRadius: 9999,
    border: "1px solid rgba(248,113,181,0.6)",
    padding: "9px 14px",
    fontSize: "0.86rem",
    backgroundColor: "#fff",
    color: "#374151",
    outline: "none",
  };

  const helperStyle: CSSProperties = {
    fontSize: "0.8rem",
    color: "#6b7280",
    marginBottom: 10,
  };

  const errorTextStyle: CSSProperties = {
    fontSize: "0.8rem",
    color: "#b91c1c",
    marginTop: 8,
  };

  const successTextStyle: CSSProperties = {
    fontSize: "0.8rem",
    color: "#15803d",
    marginTop: 8,
  };

  return (
    <section style={cardStyle}>
      <h2
        style={{
          fontSize: "1.05rem",
          fontWeight: 700,
          marginBottom: 4,
          color: "#be123c",
        }}
      >
        Annulla prenotazione ❌
      </h2>

      <p style={helperStyle}>
        Inserisci <strong>telefono, data e orario indicato</strong> nella
        richiesta. Il sistema aggiornerà il pannello.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <div>
          <label style={labelStyle}>
            Telefono <span style={{ color: "#b91c1c" }}>*</span>
          </label>
          <input
            type="tel"
            autoComplete="tel"
            style={inputStyle}
            value={phone}
            onChange={(e) => {
              resetMessages();
              setPhone(e.target.value);
            }}
            placeholder="Es. +39 000 000 0000"
          />
        </div>

        <div>
          <label style={labelStyle}>
            Data <span style={{ color: "#b91c1c" }}>*</span>
          </label>
          <input
            type="date"
            style={inputStyle}
            value={date}
            onChange={(e) => {
              resetMessages();
              setDate(e.target.value);
            }}
          />
        </div>

        <div>
          <label style={labelStyle}>
            Orario indicato <span style={{ color: "#b91c1c" }}>*</span>
          </label>
          <input
            type="time"
            style={inputStyle}
            value={time}
            step={900}
            onChange={(e) => {
              resetMessages();
              setTime(e.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            marginTop: 4,
            width: "100%",
            borderRadius: 9999,
            border: "none",
            padding: "10px 18px",
            fontSize: "0.95rem",
            fontWeight: 700,
            background:
              status === "loading"
                ? "linear-gradient(90deg,#fecaca,#f97373)"
                : "linear-gradient(90deg,#dc2626,#fb7185)",
            color: "#fff",
            cursor: status === "loading" ? "default" : "pointer",
            boxShadow: "0 14px 30px rgba(220,38,38,0.45)",
          }}
        >
          {status === "loading"
            ? "Annullamento in corso…"
            : "Annulla prenotazione"}
        </button>

        {message && status !== "success" && (
          <p style={errorTextStyle}>{message}</p>
        )}
        {message && status === "success" && (
          <p style={successTextStyle}>{message}</p>
        )}
      </form>
    </section>
  );
}