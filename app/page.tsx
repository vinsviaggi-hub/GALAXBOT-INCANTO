// app/page.tsx
"use client";

import React, {
  useState,
  type FormEvent,
  type CSSProperties,
} from "react";
import ChatBox from "./components/chatbox";
import CancelBookingForm from "./components/CancelBookingForm";

type Status = "idle" | "loading" | "success" | "conflict" | "error";

/**
 * Slot orari validi per IDEE PER LA TESTA:
 *  - Mattina 8:30–12:30
 *  - Pomeriggio 15:00–20:00
 *  ogni 15 minuti
 */
const TIME_SLOTS: string[] = [
  "08:30", "08:45",
  "09:00", "09:15", "09:30", "09:45",
  "10:00", "10:15", "10:30", "10:45",
  "11:00", "11:15", "11:30", "11:45",
  "12:00", "12:15", "12:30",
  "15:00", "15:15", "15:30", "15:45",
  "16:00", "16:15", "16:30", "16:45",
  "17:00", "17:15", "17:30", "17:45",
  "18:00", "18:15", "18:30", "18:45",
  "19:00", "19:15", "19:30", "19:45",
  "20:00",
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
        "Gli orari prenotabili sono 8:30–12:30 e 15:00–20:00, come indicato nella sezione Orari di apertura."
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
          "Prenotazione inviata con successo! Ti ricontatteremo per confermare l'appuntamento. ✂️"
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
          fontSize: "0.9rem",
          color: "#e5e7eb",
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
        {/* Nome */}
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

        {/* Telefono */}
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

        {/* Servizio */}
        <label style={labelStyle}>
          Servizio richiesto <span style={{ color: "#f97373" }}>*</span>
          <input
            type="text"
            placeholder="Es. taglio uomo, barba, sfumatura, bimbo..."
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
            placeholder="Es. preferisco il pomeriggio, vengo con un bimbo, ecc..."
            value={notes}
            onChange={(e) => {
              resetMessages();
              setNotes(e.target.value);
            }}
            style={{
              ...inputStyle,
              borderRadius: 14,
              resize: "vertical",
              minHeight: 70,
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
            background:
              status === "loading"
                ? "linear-gradient(90deg,#f97373,#f97373)"
                : "linear-gradient(90deg,#ef4444,#2563eb)",
            color: "#fff",
            cursor: status === "loading" ? "default" : "pointer",
            boxShadow: "0 14px 30px rgba(15,23,42,0.9)",
          }}
        >
          {status === "loading" ? "Invio in corso…" : "Invia richiesta ✂️"}
        </button>

        {/* Messaggi dinamici */}
        {message && status !== "success" && (
          <p
            style={{
              marginTop: 10,
              fontSize: "0.85rem",
              color: "#fecaca",
            }}
          >
            {message}
          </p>
        )}

        {message && status === "success" && (
          <p
            style={{
              marginTop: 10,
              fontSize: "0.85rem",
              color: "#bbf7d0",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
}

export default function BarberPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "28px 12px 40px",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background:
          "radial-gradient(circle at top, rgba(37,99,235,0.35), transparent 55%), linear-gradient(to bottom, #020617, #020617 35%, #020617 100%)",
        color: "#e5e7eb",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 10px",
              borderRadius: 9999,
              background:
                "linear-gradient(90deg,#ef4444,#ffffff,#2563eb,#ef4444)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0f172a",
            }}
          >
            GalaxBot AI · Barber Shop
          </div>

          <h1
            style={{
              fontSize: "1.9rem",
              fontWeight: 800,
              color: "#f9fafb",
              marginTop: 10,
              marginBottom: 6,
            }}
          >
            Idee per la Testa 💈
          </h1>

          <p
            style={{
              fontSize: "0.95rem",
              color: "#cbd5f5",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Un assistente virtuale che gestisce richieste, prenotazioni e
            cancellazioni per il tuo barber shop, 24 ore su 24.
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
              color: "#e5e7eb",
              lineHeight: 1.6,
            }}
          >
            <li>Barber Shop uomo</li>
            <li>Castelnuovo Vomano (TE)</li>
            <li>Servizi: taglio, barba, sfumature, styling, bimbi…</li>
            <li>Telefono: 333 123 4567</li>
          </ul>
        </section>

        {/* Chat assistente */}
        <section style={cardStyle}>
          <h2 style={sectionTitleStyle}>Chat assistente virtuale 💬</h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#e5e7eb",
              marginBottom: 8,
            }}
          >
            Fai una domanda come farebbe un cliente: orari, disponibilità, servizi,
            tempi per taglio o barba…
          </p>

          <ChatBox sector="barbiere" />
        </section>

        {/* Orari */}
        <section style={cardStyle}>
          <h2 style={sectionTitleStyle}>Orari di apertura</h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.2rem",
              fontSize: "0.9rem",
              color: "#e5e7eb",
              lineHeight: 1.6,
            }}
          >
            <li>Lunedì–Sabato: 8:30–12:30 e 15:00–20:00</li>
            <li>Domenica: chiuso</li>
          </ul>
        </section>

        {/* Prenotazione veloce */}
        <FastBookingSection />

        {/* Annulla prenotazione – lascio la grafica del componente così com'è */}
        <section style={{ marginTop: 4 }}>
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#f97373",
              margin: "10px 0 8px",
            }}
          >
            Annulla prenotazione ❌
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#e5e7eb",
              marginBottom: 10,
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
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,64,175,0.92))",
  borderRadius: 20,
  padding: "16px 18px 18px",
  marginBottom: 18,
  border: "1px solid rgba(148,163,184,0.7)",
  boxShadow: "0 18px 40px rgba(15,23,42,0.85)",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 700,
  color: "#f97373",
  marginBottom: 8,
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
  border: "1px solid rgba(148,163,184,0.7)",
  padding: "8px 12px",
  fontSize: "0.9rem",
  color: "#0f172a",
  outline: "none",
  backgroundColor: "#f9fafb",
};