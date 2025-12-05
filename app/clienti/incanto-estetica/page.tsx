// app/page.tsx
import ChatBox from "@/app/components/chatbox";
import FastBookingForm from "@/app/components/FastBookingForm";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #fde2e4, #f9d5ec, #f8f0fa)",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#3d0a27",
        padding: "24px 12px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1000,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* HEADER */}
        <header style={{ textAlign: "center" }}>
          <h4
            style={{
              color: "#8b006b",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontSize: "0.9rem",
            }}
          >
            GALAXBOT AI · CENTRO ESTETICO
          </h4>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              marginTop: 4,
              color: "#3d0a27",
            }}
          >
            Incanto di Aurora D&apos;Ignazio
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "#5b0f3a",
              marginTop: 8,
              maxWidth: 600,
              marginInline: "auto",
              lineHeight: 1.5,
            }}
          >
            Un assistente virtuale che accoglie le clienti, risponde 24/7 e gestisce le prenotazioni
            con semplicità ed eleganza.
          </p>
        </header>

        {/* INFORMAZIONI PRINCIPALI */}
        <section
          style={{
            background: "rgba(255,255,255,0.8)",
            borderRadius: 16,
            padding: "16px 20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: 6,
              color: "#8b006b",
            }}
          >
            Informazioni principali
          </h2>
          <ul
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              listStyle: "disc",
              paddingLeft: 20,
            }}
          >
            <li>Centro estetico &amp; nail art</li>
            <li>Via Strada Statale 150, n°114 – Pianura di Guardia Vomano</li>
            <li>Telefono: 389 561 7880</li>
            <li>Trattamenti viso, corpo, unghie, epilazione e percorsi personalizzati</li>
          </ul>
        </section>

        {/* CHAT */}
        <section
          style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: 16,
            padding: "16px 20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: 6,
              color: "#8b006b",
            }}
          >
            Chat assistente virtuale 💬
          </h2>
          <ChatBox sector="estetica" />
        </section>

        {/* ORARI */}
        <section
          style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: 16,
            padding: "16px 20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: 6,
              color: "#8b006b",
            }}
          >
            Orari di apertura
          </h2>
          <ul
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              paddingLeft: 20,
            }}
          >
            <li>Lunedì–Sabato: 8:00–13:00 e 15:00–19:00</li>
            <li>Domenica: chiuso</li>
          </ul>
        </section>

        {/* PRENOTAZIONE VELOCE */}
        <section
          style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: 16,
            padding: "16px 20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: 6,
              color: "#8b006b",
            }}
          >
            Prenotazione veloce ✨
          </h2>
          <FastBookingForm />
        </section>
      </div>
    </main>
  );
}