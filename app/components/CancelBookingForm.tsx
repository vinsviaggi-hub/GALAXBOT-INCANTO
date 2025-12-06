"use client";

import React, {
  useState,
  type FormEvent,
  type CSSProperties,
} from "react";

type CancelStatus = "idle" | "loading" | "success" | "notFound" | "error";

// Stessi slot orari del negozio (come nel form di prenotazione)
const TIME_SLOTS: string[] = [
  "08:00","08:15","08:30","08:45",
  "09:00","09:15","09:30","09:45",
  "10:00","10:15","10:30","10:45",
  "11:00","11:15","11:30","11:45",
  "12:00","12:15","12:30","12:45",
  "15:00","15:15","15:30","15:45",
  "16:00","16:15","16:30","16:45",
  "17:00","17:15","17:30","17:45",
  "18:00","18:15","18:30","18:45",
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
      setMessage("Servono almeno nome, trattamento, telefono, data e ora.");
      return;
    }

    if (!TIME_SLOTS.includes(time)) {
      setStatus("error");
      setMessage("Seleziona un orario valido tra quelli del negozio.");
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
              "Non abbiamo trovato una prenotazione con questi dati. Controlla di aver inserito tutto uguale alla prenotazione."
          );
          return;
        }

        setStatus("error");
        setMessage(
          data?.error ||
            "Errore durante l'annullamento. Riprova più tardi."
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

  const titleStyle: CSSProperties = {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#b91c1c",
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  const subtitleStyle: CSSProperties = {
    fontSize: "0.9rem",
    color: "#6b7280",
    marginBottom: 16,
    lineHeight: 1.5,
  };

  return (
    <section style={cardStyle}>
      <h2 style={titleStyle}>
        Annulla prenotazione <span style={{ fontSize: "1.4rem" }}>❌</span>
      </h2>
      <p style={subtitleStyle}>
        Inserisci il <strong>telefono</strong>, il <strong>nome</strong>, il{" "}
        <strong>trattamento</strong>, la <strong>data</strong> e l{"'"}{" "}
        <strong>ora</strong> della prenotazione che vuoi annullare. Il sistema
        aggiornerà il pannello e libererà lo slot.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <label style={labelStyle}>
          Telefono usato in prenotazione <span style={{ color: "#b91c1c" }}>*</span>
          <input
            type="tel"
            placeholder="Es. 389 561 7880"
            value={phone}
            onChange={(e) => {
              resetMessages();
              setPhone(e.target.value);
            }}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Nome in prenotazione <span style={{ color: "#b91c1c" }}>*</span>
          <input
            type="text"
            placeholder="Es. Aurora"
            value={name}
            onChange={(e) => {
              resetMessages();
              setName(e.target.value);
            }}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Trattamento prenotato <span style={{ color: "#b91c1c" }}>*</span>
          <input
            type="text"
            placeholder="Es. viso, manicure, epilazione..."
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
            Data prenotazione <span style={{ color: "#b91c1c" }}>*</span>
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
            Ora prenotazione <span style={{ color: "#b91c1c" }}>*</span>
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
                ? "linear-gradient(to right, #f97373, #f97373)"
                : "linear-gradient(to right, #f97373, #f97316)",
            color: "#fff",
            cursor: status === "loading" ? "default" : "pointer",
          }}
        >
          {status === "loading" ? "Annullamento in corso…" : "Annulla prenotazione"}
        </button>

        {message && status === "success" && (
          <p
            style={{
              marginTop: 10,
              fontSize: "0.8rem",
              color: "#15803d",
            }}
          >
            {message}
          </p>
        )}

        {message && status !== "success" && (
          <p
            style={{
              marginTop: 10,
              fontSize: "0.8rem",
              color: status === "notFound" ? "#b45309" : "#b91c1c",
            }}
          >
            {message}
          </p>
        )}

        <p
          style={{
            marginTop: 8,
            fontSize: "0.75rem",
            color: "#6b7280",
          }}
        >
          Suggerimento: copia i dati direttamente dal messaggio di conferma o
          dal tuo calendario, così eviti errori.
        </p>
      </form>
    </section>
  );
}

// Stili identici alla pagina principale, così la grafica resta uguale
const cardStyle: CSSProperties = {
  backgroundColor: "#fdf2f8",
  borderRadius: 16,
  padding: "14px 18px 16px",
  marginBottom: 16,
  border: "1px solid #f9a8d4",
  boxShadow: "0 8px 24px rgba(244,114,182,0.15)",
};

const labelStyle: CSSProperties = {
  fontSize: "0.82rem",
  color: "#9d174d",
  fontWeight: 600,
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const inputStyle: CSSProperties = {
  borderRadius: 9999,
  border: "1px solid #f9a8d4",
  padding: "8px 12px",
  fontSize: "0.9rem",
  color: "#374151",
  outline: "none",
  backgroundColor: "#fff",
};