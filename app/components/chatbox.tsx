"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        "Ciao! Come posso aiutarti oggi? Se hai domande sui servizi del negozio o se desideri prenotare un appuntamento, fammi sapere! 💈",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ogni volta che arrivano nuovi messaggi, scrolla in basso
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    // aggiungo il messaggio dell’utente in coda alla conversazione
    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: input.trim() },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
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
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.35)",
        borderRadius: "24px",
        padding: "16px 16px 12px",
        border: "1px solid rgba(255,255,255,0.1)",
        maxWidth: 840,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          maxHeight: 260,
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

        <div ref={bottomRef} />
      </div>

      <div
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "8px",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Scrivi qui il tuo messaggio..."
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
          disabled={loading}
          style={{
            borderRadius: 9999,
            border: "none",
            padding: "10px 18px",
            fontWeight: 600,
            fontSize: "0.95rem",
            background: loading ? "#64748b" : "#16a3ff",
            color: "#ffffff",
            cursor: loading ? "default" : "pointer",
            minWidth: 80,
          }}
        >
          Invia
        </button>
      </div>
    </div>
  );
}