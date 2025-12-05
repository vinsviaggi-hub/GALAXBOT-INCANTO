// app/page.tsx
"use client";

import { useState, type FormEvent, type CSSProperties } from "react";
import ChatBox from "./components/chatbox";

// 🔹 Sezione prenotazione veloce (solo front-end per ora)
function FastBookingSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [treatment, setTreatment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name || !phone || !treatment || !date || !time) {
      alert("Compila tutti i campi obbligatori ✨");
      return;
    }

    // 👉 Qui in futuro collegheremo il foglio Google di Incanto
    setSuccess(true);

    // Pulizia campi
    setName("");
    setPhone("");
    setTreatment("");
    setDate("");
    setTime("");
    setNotes("");
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
        Richiedi un appuntamento indicando i dati principali. Ti ricontatteremo
        per confermare giorno e orario.
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
            placeholder="Es. trattamento viso, manicure, epilazione..."
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            style={inputStyle}
          />
        </label>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <label style={{ ...labelStyle, flex: 1, minWidth: 140 }}>
            Data *
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle}
            />
          </label>

          <label style={{ ...labelStyle, flex: 1, minWidth: 140 }}>
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
            placeholder="Es. preferisco il mattino, pelle sensibile, trattamento rilassante..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ ...inputStyle, borderRadius: 12, resize: "vertical" }}
          />
        </label>

        <button
          type="submit"
          style={{
            marginTop: 8,
            borderRadius: 9999,
            border: "none",
            padding: "10px 16px",
            fontSize: "0.95rem",
            fontWeight: 600,
            backgroundColor: "#db2777",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Invia richiesta 💖
        </button>

        {success && (
          <p
            style={{
              marginTop: 10,
              textAlign: "center",
              fontSize: "0.9rem",
              color: "#16a34a",
            }}
          >
            Prenotazione inviata con successo! Ti ricontatteremo per confermare
            l&apos;appuntamento 💅
          </p>
        )}
      </form>
    </section>
  );
}

export default function IncantoPage() {
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
            GalaxBot AI · Centro estetico
          </div>
          <h1
            style={{
              fontSize: "1.7rem",
              fontWeight: 700,
              color: "#4a044e",
              marginBottom: 6,
            }}
          >
            Incanto di Aurora D&apos;Ignazio
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
            <li>
              Via Strada Statale 150, n°114 – Pianura di Guardia Vomano
            </li>
            <li>Telefono: 389 561 7880</li>
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
  boxShadow: "0 8px 24px rgba(244,114,182,0.15)",
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