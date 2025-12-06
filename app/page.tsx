// app/page.tsx
import ChatBox from "@/app/components/chatbox";
import FastBookingForm from "@/app/components/FastBookingForm";
import type { CSSProperties } from "react";

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

        {/* Prenotazione veloce – usa FastBookingForm collegata a /api/bookings */}
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

          <FastBookingForm />
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
  boxShadow: "0 8px 24px rgba(244,114,182,0.15)",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 700,
  color: "#9d174d",
  marginBottom: 8,
};