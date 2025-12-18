// app/components/chatbox.tsx
"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

type Sector =
  | "barbiere"
  | "bar"
  | "pasticceria"
  | "estetica"
  | "studiomedico"
  | "veterinario"
  | "ecommerce"
  | "palestra"
  | "pizzeria"
  | "ristorante"
  | "gelateria"
  | "parrucchiera"
  | "hotel"
  | "immobiliare"
  | "abbigliamento"
  | "altro";

type ChatBoxProps = {
  sector: Sector;
};

export default function ChatBox({ sector }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        "Ciao! 👋 Sono il bot. Puoi farmi domande sui servizi.\n\n⚠️ Per registrare una prenotazione usa il box sotto la chat (se presente).",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 👉 contenitore dei messaggi, per fare scroll interno
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // focus iniziale sull'input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ogni volta che arriva un nuovo messaggio, scrolla in basso SOLO nel box
  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userText = input.trim();

    const newMessages: Message[] = [...messages, { sender: "user", text: userText }];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          sector, // 👉 passiamo il settore all'API
        }),
      });

      if (!res.ok) {
        throw new Error("Errore nella chiamata API");
      }

      const data = await res.json();

      const botText =
        data.reply ||
        "Mi dispiace, qualcosa è andato storto. Puoi riprovare tra qualche secondo?";

      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Mi dispiace, c'è stato un problema di connessione con il server. Riprova tra poco.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  const isSendDisabled = loading || !input.trim();

  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.35)",
        borderRadius: "24px",
        padding: "16px 16px 12px",
        border: "1px solid rgba(255,255,255,0.1)",
        maxWidth: 840,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* AREA CHAT */}
      <div
        ref={messagesRef}
        style={{
          maxHeight: 260,
          minHeight: 180,
          overflowY: "auto",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              whiteSpace: "pre-line",
              background:
                msg.sender === "user"
                  ? "linear-gradient(135deg, #1aa3ff, #4f8dff)"
                  : "rgba(15,23,42,0.85)",
              color: "#ffffff",
              padding: "10px 14px",
              borderRadius:
                msg.sender === "user"
                  ? "16px 16px 4px 16px"
                  : "16px 16px 16px 4px",
              maxWidth: "75%",
              fontSize: "0.95rem",
              lineHeight: 1.5,
            }}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div
            style={{
              alignSelf: "flex-start",
              background: "rgba(15,23,42,0.85)",
              color: "#ffffff",
              padding: "8px 12px",
              borderRadius: "16px 16px 16px 4px",
              fontSize: "0.9rem",
              opacity: 0.8,
            }}
          >
            Sto scrivendo…
          </div>
        )}
      </div>

      {/* INPUT CHAT */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "8px",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Scrivi qui il tuo messaggio..."
          autoComplete="off"
          aria-label="Scrivi un messaggio"
          style={{
            flex: 1,
            borderRadius: 9999,
            border: "none",
            padding: "10px 16px",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={isSendDisabled}
          style={{
            borderRadius: 9999,
            border: "none",
            padding: "10px 18px",
            fontWeight: 600,
            fontSize: "0.95rem",
            background: isSendDisabled ? "#64748b" : "#16a3ff",
            color: "#ffffff",
            cursor: isSendDisabled ? "default" : "pointer",
            minWidth: 80,
          }}
        >
          Invia
        </button>
      </div>
    </div>
  );
}