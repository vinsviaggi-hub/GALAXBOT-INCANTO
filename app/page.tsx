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

// 🔹 Sezione prenotazione veloce – collegata a /api/bookings
function FastBookingSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(""); // ✅ ORARIO PREFERITO (indicativo)
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
          time, // 👈 orario preferito (indicativo)
          notes,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        if (res.status === 409 || data?.conflict) {
          setStatus("conflict");
          setMessage(
            data?.error ||
              "C'è già una richiesta simile per quella data/orario. Prova a scegliere un altro orario indicativo."
          );
          return;
        }

        setStatus("error");
        setMessage(
          data?.error ||
            "Si è verificato un errore durante l’invio della richiesta."
        );
        return;
      }

      setStatus("success");
      setMessage(
        data?.message ||
          "Richiesta inviata! Ti ricontatteremo per confermare l’orario in base alla durata del trattamento. 💅"
      );

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
      <p style={helperTextStyle}>
        Inserisci i dati principali. <strong>L’orario è indicativo</strong>:
        verrà confermato in base alla durata del trattamento.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <label style={labelStyle}>
          Nome <span style={{ color: "#b91c1c" }}>*</span>
          <input
            type="text"
            autoComplete="name"
            placeholder="Es. Nome e cognome"
            value={name}
            onChange={(e) => {
              resetMessages();
              setName(e.target.value);
            }}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Telefono <span style={{ color: "#b91c1c" }}>*</span>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="Es. +39 000 000 0000"
            value={phone}
            onChange={(e) => {
              resetMessages();
              setPhone(e.target.value);
            }}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Trattamento desiderato <span style={{ color: "#b91c1c" }}>*</span>
          <input
            type="text"
            placeholder="Es. manicure, epilazione, trattamento viso..."
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
            Orario preferito (indicativo){" "}
            <span style={{ color: "#b91c1c" }}>*</span>
            <input
              type="time"
              value={time}
              step={900}
              onChange={(e) => {
                resetMessages();
                setTime(e.target.value);
              }}
              style={inputStyle}
            />
          </label>
        </div>

        <label style={labelStyle}>
          Note (facoltative)
          <textarea
            rows={3}
            placeholder="Es. preferisco mattina/pomeriggio, pelle sensibile, prima volta..."
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

        {message && status !== "success" && (
          <p style={{ marginTop: 10, fontSize: "0.8rem", color: "#b91c1c" }}>
            {message}
          </p>
        )}
        {message && status === "success" && (
          <p style={{ marginTop: 10, fontSize: "0.8rem", color: "#15803d" }}>
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
      {/* ✅ keyframes qui dentro così funziona anche su Vercel */}
      <style jsx global>{`
        @keyframes floaty {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-4px) rotate(-4deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
      `}</style>

      <div style={{ maxWidth: 960, margin: "0 auto" }}>
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
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {DEMO_BUSINESS_NAME}
            <span style={floatingIconStyle}>💅</span>
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
          <ul style={listStyle}>
            <li>Centro estetico &amp; nail art</li>
            <li>{DEMO_ADDRESS}</li>
            <li>Telefono: {DEMO_PHONE}</li>
            <li>
              Trattamenti viso, corpo, unghie, epilazione e percorsi
              personalizzati.
            </li>
          </ul>
        </section>

        {/* Mini sezione */}
        <section style={cardStyle}>
          <h2 style={sectionTitleStyle}>Trattamenti in evidenza</h2>
          <p style={helperTextStyle}>
            Esempio di menu (demo). Il bot può rispondere a domande su durata,
            preparazione e consigli.
          </p>
          <ul style={listStyle}>
            <li>Manicure / Semipermanente / Ricostruzione</li>
            <li>Pulizia viso / Idratazione / Anti-age</li>
            <li>Epilazione (zone singole o complete)</li>
            <li>Trattamenti corpo (relax, drenante, scrub)</li>
          </ul>
          <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 10 }}>
            * Prezzi e durata variano: vengono confermati dopo la richiesta.
          </p>
        </section>

        {/* Chat assistente */}
        <section style={cardStyle}>
          <h2 style={sectionTitleStyle}>Chat assistente virtuale 💬</h2>
          <p style={helperTextStyle}>
            Fai una domanda come farebbe una cliente: trattamenti, tempi,
            consigli di bellezza, promozioni…
          </p>
          <ChatBox sector="estetica" />
        </section>

        {/* Disponibilità e conferma */}
        <section style={cardStyle}>
          <h2 style={sectionTitleStyle}>Disponibilità e conferma</h2>
          <ul style={listStyle}>
            <li>Indica una data e un orario preferito (indicativo).</li>
            <li>
              La durata varia in base al trattamento, quindi l’orario finale
              viene confermato dopo la richiesta.
            </li>
            <li>Se hai urgenza, scrivici su WhatsApp.</li>
          </ul>
        </section>

        {/* Prenotazione */}
        <FastBookingSection />

        {/* ✅ Annulla prenotazione: UNA SOLA VOLTA (il titolo lo fa già il componente) */}
        <CancelBookingForm />
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

const helperTextStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "#6b7280",
  marginBottom: 12,
};

const listStyle: CSSProperties = {
  margin: 0,
  paddingLeft: "1.2rem",
  fontSize: "0.9rem",
  color: "#374151",
  lineHeight: 1.6,
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

const floatingIconStyle: CSSProperties = {
  display: "inline-block",
  animation: "floaty 2.2s ease-in-out infinite",
  transformOrigin: "center",
};