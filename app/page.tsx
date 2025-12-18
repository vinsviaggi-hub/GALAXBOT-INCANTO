// app/page.tsx
"use client";

import React, { useState, type FormEvent, type CSSProperties } from "react";
import ChatBox from "./components/chatbox";
import CancelBookingForm from "./components/CancelBookingForm";

type Status = "idle" | "loading" | "success" | "conflict" | "error";

// ✅ DATI DEMO (cambia solo questi quando vuoi)
const DEMO_BUSINESS_LABEL = "GalaxBot AI · Centro estetico";
const DEMO_BUSINESS_NAME = "Centro Estetico Demo";
const DEMO_ADDRESS = "Via Esempio 123 – Città (IT)";
const DEMO_PHONE = "+39 000 000 0000";

// Slot orari validi: 08:00–13:00 e 15:00–19:00 ogni 15 minuti
const TIME_SLOTS: string[] = [
  "08:00", "08:15", "08:30", "08:45",
  "09:00", "09:15", "09:30", "09:45",
  "10:00", "10:15", "10:30", "10:45",
  "11:00", "11:15", "11:30", "11:45",
  "12:00", "12:15", "12:30", "12:45",
  "15:00", "15:15", "15:30", "15:45",
  "16:00", "16:15", "16:30", "16:45",
  "17:00", "17:15", "17:30", "17:45",
  "18:00", "18:15", "18:30", "18:45",
];

// 🔹 Sezione prenotazione veloce – collegata a /api/bookings
function FastBookingSection() {
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    resetMessages();

    if (!name || !phone || !service || !date || !time) {
      setStatus("error");
      setMessage("Compila tutti i campi obbligatori contrassegnati con *.");
      return;
    }

    // ✅ Controllo che l'orario sia tra quelli consentiti
    if (!TIME_SLOTS.includes(time)) {
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

      // ✅ Tutto ok: salvato su Google Sheet
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

  return (
    <section style={cardStyle}>
      <h2 style={sectionTitleStyle}>Prenotazione veloce ✨</h2>
      <p
        style={{
          fontSize: "0.85rem",
          color: "#6b7280",
          marginBottom: 12,
        }}
      >
        Richiedi un appuntamento indicando i dati principali. Ti
        ricontatteremo per confermare giorno e orario.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        {/* Nome */}
        <label style={labelStyle}>
          Nome <span style={{ color: "#b91c1c" }}>*</span>
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

        {/* Telefono */}
        <label style={labelStyle}>
          Telefono <span style={{ color: "#b91c1c" }}>*</span>
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

        {/* Trattamento */}
        <label style={labelStyle}>
          Trattamento desiderato{" "}
          <span style={{ color: "#b91c1c" }}>*</span>
          <input
            type="text"
            placeholder="Es. trattamento viso, manicure, epilazione..."
            value={service}
            onChange={(e) => {
              resetMessages();
              setService(e.target.value);
            }}
            style={inputStyle}
          />
        </label>

        {/* Data + Ora */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <label style={{ ...labelStyle, flex: 1, minWidth: 140 }}>
            Data <span style={{ color: "#b91c1c" }}>*</span>
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
            Ora <span style={{ color: "#b91c1c" }}>*</span>
            {/* SELECT con soli orari validi */}
            <select
              value={time}
              onChange={(e) => {
                resetMessages();
                setTime(e.target.value);
              }}
              style={{
                ...inputStyle,
                paddingRight: "28px",
              }}
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

        {/* Note */}
        <label style={labelStyle}>
          Note (facoltative)
          <textarea
            rows={3}
            placeholder="Es. preferisco il mattino, pelle sensibile, trattamento rilassante..."
            value={notes}
            onChange={(e) => {
              resetMessages();
              setNotes(e.target.value);
            }}
            style={{
              ...inputStyle,
              borderRadius: 12,
              resize: "vertical",
            }}
          />
        </label>

        {/* Bottone */}
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
            backgroundColor: status === "loading" ? "#f97373" : "#db2777",
            color: "#fff",
            cursor: status === "loading" ? "default" : "pointer",
          }}
        >
          {status === "loading" ? "Invio in corso…" : "Invia richiesta 💅"}
        </button>

        {/* Messaggi dinamici */}
        {message && status !== "success" && (
          <p
            style={{
              marginTop: 10,
              fontSize: "0.8rem",
              color: "#b91c1c",
            }}
          >
            {message}
          </p>
        )}

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
      </form>
    </section>
  );
}

export default function DemoEsteticaPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #fdf2f8, #fce7f3)",
        padding: "32px 12px 40px",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#9d174d",
              marginBottom: 4,
            }}
          >
            {DEMO_BUSINESS_LABEL}
          </div>
          <h1
            style={{
              fontSize: "1.7rem",
              fontWeight: 700,
              color: "#4a044e",
              marginBottom: 6,
            }}
          >
            {DEMO_BUSINESS_NAME}
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#6b7280",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Un assistente virtuale che accoglie le clienti, risponde 24/7 e
            gestisce le prenotazioni con semplicità ed eleganza.
          </p>
        </header>

        {/* Info principali */}
        <section style={cardStyle}>
          <h2 style={sectionTitleStyle}>Informazioni principali</h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.2rem",
              fontSize: "0.9rem",
              color: "#374151",
              lineHeight: 1.6,
            }}
          >
            <li>Centro estetico &amp; nail art</li>
            <li>{DEMO_ADDRESS}</li>
            <li>Telefono: {DEMO_PHONE}</li>
            <li>
              Trattamenti viso, corpo, unghie, epilazione e percorsi
              personalizzati.
            </li>
          </ul>
        </section>

        {/* Chat assistente */}
        <section style={cardStyle}>
          <h2 style={sectionTitleStyle}>Chat assistente virtuale 💬</h2>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#6b7280",
              marginBottom: 8,
            }}
          >
            Fai una domanda come farebbe una cliente: trattamenti, tempi,
            consigli di bellezza, promozioni…
          </p>

          <ChatBox sector="estetica" />
        </section>

        {/* Orari */}
        <section style={cardStyle}>
          <h2 style={sectionTitleStyle}>Orari di apertura</h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.2rem",
              fontSize: "0.9rem",
              color: "#374151",
              lineHeight: 1.6,
            }}
          >
            <li>Lunedì–Sabato: 8:00–13:00 e 15:00–19:00</li>
            <li>Domenica: chiuso</li>
          </ul>
        </section>

        {/* Prenotazione veloce */}
        <FastBookingSection />

        {/* Annulla prenotazione */}
        <section style={cardStyle}>
          <h2 style={sectionTitleStyle}>Annulla prenotazione ❌</h2>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#6b7280",
              marginBottom: 12,
            }}
          >
            Non puoi più venire all&apos;appuntamento? Inserisci i dati della
            prenotazione che vuoi annullare (stesso nome, stessa data e stessa
            ora). Il sistema aggiornerà il pannello e libererà lo slot.
          </p>

          <CancelBookingForm />
        </section>
      </div>
    </main>
  );
}

// ---------- STILI BASE ----------

const cardStyle: CSSProperties = {
  backgroundColor: "#fdf2f8",
  borderRadius: 16,
  padding: "14px 18px 16px",
  marginBottom: 16,
  border: "1px solid #f9a8d4",
  boxShadow: "0 8px 24px rgba(244, 114, 182, 0.15)",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 700,
  color: "#9d174d",
  marginBottom: 8,
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