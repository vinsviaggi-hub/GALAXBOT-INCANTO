// app/components/FastBookingForm.tsx
"use client";

import React, { useState, type FormEvent, type CSSProperties } from "react";

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

  function resetMessages() {
    setStatus("idle");
    setMessage("");
  }

  // converte "HH:MM" in minuti
  function timeToMinutes(t: string): number | null {
    if (!t || t.length < 4) return null;
    const [h, m] = t.split(":").map((x) => parseInt(x, 10));
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    return h * 60 + m;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    resetMessages();

    if (!name || !phone || !service || !date || !time) {
      setStatus("error");
      setMessage("Compila tutti i campi obbligatori contrassegnati con *.");
      return;
    }

    // ✅ Controllo fasce orarie: 08:00–13:00 oppure 15:00–19:00
    const minutes = timeToMinutes(time);
    if (minutes === null) {
      setStatus("error");
      setMessage("Inserisci un orario valido.");
      return;
    }

    const fromMorning = 8 * 60;
    const toMorning = 13 * 60;
    const fromAfternoon = 15 * 60;
    const toAfternoon = 19 * 60;

    const inMorning = minutes >= fromMorning && minutes <= toMorning;
    const inAfternoon = minutes >= fromAfternoon && minutes <= toAfternoon;

    if (!inMorning && !inAfternoon) {
      setStatus("error");
      setMessage(
        "Gli orari prenotabili sono 8:00–13:00 e 15:00–19:00, come indicato nella sezione Orari di apertura."
      );
      return;
    }

    try {
      setStatus("loading");

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
              "Per questa data e ora c'è già una prenotazione. Scegli un altro orario."
          );
          return;
        }

        setStatus("error");
        setMessage(
          data?.error ||
            "Si è verificato un errore durante il salvataggio della prenotazione."
        );
        return;
      }

      // ✅ Tutto ok
      setStatus("success");
      setMessage(
        data?.message ||
          "Prenotazione inviata con successo! Ti ricontatteremo per confermare l'appuntamento. 💅"
      );

      // Pulisco i campi
      setName("");
      setPhone("");
      setService("");
      setDate("");
      setTime("");
      setNotes("");
    } catch (err) {
      console.error("[FAST BOOKING] Errore:", err);
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
    boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
    border: "1px solid rgba(244,114,182,0.35)",
    color: "#4b5563",
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

  const textareaStyle: CSSProperties = {
    ...inputStyle,
    borderRadius: 14,
    resize: "vertical",
    minHeight: 70,
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
        Prenotazione veloce ✨
      </h2>
      <p style={helperStyle}>
        Richiedi un appuntamento indicando i dati principali. Ti ricontatteremo
        per confermare giorno e orario.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        {/* Nome */}
        <div>
          <label style={labelStyle}>
            Nome <span style={{ color: "#b91c1c" }}>*</span>
          </label>
          <input
            style={inputStyle}
            value={name}
            onChange={(e) => {
              resetMessages();
              setName(e.target.value);
            }}
            placeholder="Es. Aurora"
          />
        </div>

        {/* Telefono */}
        <div>
          <label style={labelStyle}>
            Telefono <span style={{ color: "#b91c1c" }}>*</span>
          </label>
          <input
            style={inputStyle}
            value={phone}
            onChange={(e) => {
              resetMessages();
              setPhone(e.target.value);
            }}
            placeholder="Es. 389 561 7880"
          />
        </div>

        {/* Trattamento */}
        <div>
          <label style={labelStyle}>
            Trattamento desiderato <span style={{ color: "#b91c1c" }}>*</span>
          </label>
          <input
            style={inputStyle}
            value={service}
            onChange={(e) => {
              resetMessages();
              setService(e.target.value);
            }}
            placeholder="Es. trattamento viso, manicure, epilazione…"
          />
        </div>

        {/* Data + Ora */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
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
              Ora <span style={{ color: "#b91c1c" }}>*</span>
            </label>
            <input
              type="time"
              style={inputStyle}
              value={time}
              min="08:00"
              max="19:00"
              step={900} // 15 minuti
              onChange={(e) => {
                resetMessages();
                setTime(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Note */}
        <div>
          <label style={labelStyle}>Note (facoltative)</label>
          <textarea
            style={textareaStyle}
            value={notes}
            onChange={(e) => {
              resetMessages();
              setNotes(e.target.value);
            }}
            placeholder="Es. preferisco il mattino, pelle sensibile, trattamento rilassante…"
          />
        </div>

        {/* Bottone */}
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
                ? "linear-gradient(90deg,#f9a8d4,#f97373)"
                : "linear-gradient(90deg,#ec4899,#f97316)",
            color: "#fff",
            cursor: status === "loading" ? "default" : "pointer",
            boxShadow: "0 14px 30px rgba(236,72,153,0.45)",
          }}
        >
          {status === "loading" ? "Invio in corso…" : "Invia richiesta 💅"}
        </button>

        {/* Messaggio dinamico */}
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