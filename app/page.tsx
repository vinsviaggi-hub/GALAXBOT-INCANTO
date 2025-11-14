"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background:
          "radial-gradient(circle at 30% -10%, rgba(94,231,255,0.15), transparent 60%), radial-gradient(circle at 110% 0%, rgba(168,85,247,0.18), transparent 60%), #0b1020",
        color: "#ffffff",
        padding: "1.5rem",
      }}
    >
      {/* Logo */}
      <Image
        src="/galaxbot-ai.png"
        alt="GalaxBot AI Logo"
        width={110}
        height={110}
        style={{
          borderRadius: 16,
          marginBottom: "1rem",
          boxShadow: "0 12px 28px rgba(0,0,0,0.45)",
        }}
        priority
      />

      {/* Titolo */}
      <h1
        style={{
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 800,
          margin: 0,
          letterSpacing: "0.3px",
          color: "#d7e9ff",
          textShadow: "0 2px 18px rgba(55,135,255,0.25)",
        }}
      >
        GalaxBot AI <span style={{ filter: "drop-shadow(0 0 6px #fff2)" }}>🚀</span>
      </h1>

      {/* Sottotitolo */}
      <p
        style={{
          fontSize: "clamp(14px, 2.2vw, 18px)",
          color: "#b8c6d9",
          maxWidth: 720,
          lineHeight: 1.6,
          margin: "12px 0 22px",
        }}
      >
        Creiamo assistenti virtuali e app smart per aziende e professionisti.
        Automatizza risposte, prenotazioni e vendite con l’intelligenza
        artificiale.
      </p>

      {/* CTA */}
      <a
        href="#demo"
        style={{
          background: "linear-gradient(180deg, #1380ff, #0064e9)",
          color: "#fff",
          padding: "13px 26px",
          borderRadius: 10,
          textDecoration: "none",
          fontWeight: 700,
          boxShadow: "0 10px 26px rgba(0,118,255,0.35)",
          transition: "transform .08s ease, box-shadow .2s ease",
        }}
        onMouseDown={(e) =>
          ((e.target as HTMLElement).style.transform = "translateY(1px)")
        }
        onMouseUp={(e) =>
          ((e.target as HTMLElement).style.transform = "translateY(0)")
        }
      >
        Prova una demo gratuita
      </a>

      {/* Footer */}
      <p
        style={{
          marginTop: 18,
          fontSize: 13,
          color: "#8796aa",
          opacity: 0.9,
        }}
      >
        Disponibile 24/7 — powered by GalaxBot AI
      </p>
    </main>
  );
}