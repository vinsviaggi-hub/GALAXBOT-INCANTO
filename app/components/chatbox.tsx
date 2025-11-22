"use client";

import {
  useState,
  useRef,
  useEffect,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        "Ciao! 👋 Sono il bot del barber shop. Puoi farmi domande sui servizi.\n\n⚠️ Per prenotare davvero un appuntamento usa il box qui sotto: «Prenotazione veloce dal bot» 💈",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Stato per la prenotazione
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  const [booking, setBooking] = useState({
    name: "",
    service: "Taglio uomo",
    date: "",
    time: "",
    phone: "",
    notes: "",
  });

  // ogni volta che arrivano nuovi messaggi, scrolla in basso
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userText = input.trim();

    // aggiungo il messaggio dell’utente in coda alla conversazione
    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: userText },
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

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  // 🔗 Invio prenotazione verso /api/bookings
  async function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBookingStatus(null);

    // controlli minimi
    if (!booking.name || !booking.date || !booking.time) {
      setBookingStatus("⚠️ Inserisci almeno nome, data e ora.");
      return;
    }

    setBookingLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_booking",
          name: booking.name,
          service: booking.service,
          date: booking.date,
          time: booking.time,
          phone: booking.phone,
          notes: booking.notes,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error("Errore prenotazione:", data);
        setBookingStatus(
          "❌ Errore nel salvataggio della prenotazione. Riprova tra poco."
        );
        return;
      }

      // Messaggio di conferma nella chat
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Ho registrato la tua richiesta di prenotazione ✅\n\nNome: ${booking.name}\nServizio: ${booking.service}\nData: ${booking.date}\nOra: ${booking.time}\nTelefono: ${
            booking.phone || "n/d"
          }`,
        },
      ]);

      setBookingStatus("✅ Prenotazione inviata! È stata salvata nel sistema.");

      // reset del form
      setBooking({
        name: "",
        service: "Taglio uomo",
        date: "",
        time: "",
        phone: "",
        notes: "",
      });
    } catch (err) {
      console.error(err);
      setBookingStatus(
        "❌ Errore di rete, non sono riuscito a salvare la prenotazione."
      );
    } finally {
      setBookingLoading(false);
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
      {/* AREA CHAT */}
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

        <div ref={bottomRef} />
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

      {/* MODULO PRENOTAZIONE VELOCE */}
      <div
        style={{
          marginTop: 14,
          padding: "12px 12px 10px",
          borderRadius: 18,
          background: "rgba(15,23,42,0.9)",
          border: "1px solid rgba(148,163,184,0.5)",
        }}
      >
        <div
          style={{
            fontSize: "0.9rem",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          Prenotazione veloce dal bot 📅
        </div>
        <p
          style={{
            fontSize: "0.8rem",
            opacity: 0.8,
            marginBottom: 10,
          }}
        >
          Compila questi campi e il sistema salva la prenotazione direttamente
          nel pannello del barbiere.  
          I messaggi scritti nella chat **non** creano prenotazioni.
        </p>

        <form
          onSubmit={handleBookingSubmit}
          style={{
            display: "grid",
            gap: 6,
            fontSize: "0.8rem",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <input
              style={fieldStyle}
              placeholder="Nome"
              value={booking.name}
              onChange={(e) =>
                setBooking((b) => ({ ...b, name: e.target.value }))
              }
              required
            />
            <input
              style={fieldStyle}
              placeholder="Telefono"
              value={booking.phone}
              onChange={(e) =>
                setBooking((b) => ({ ...b, phone: e.target.value }))
              }
            />
          </div>

          <input
            style={fieldStyle}
            placeholder="Servizio (es. Taglio + barba)"
            value={booking.service}
            onChange={(e) =>
              setBooking((b) => ({ ...b, service: e.target.value }))
            }
          />

          <div style={{ display: "flex", gap: 6 }}>
            <input
              style={fieldStyle}
              type="date"
              value={booking.date}
              onChange={(e) =>
                setBooking((b) => ({ ...b, date: e.target.value }))
              }
              required
            />
            <input
              style={fieldStyle}
              type="time"
              value={booking.time}
              onChange={(e) =>
                setBooking((b) => ({ ...b, time: e.target.value }))
              }
              required
            />
          </div>

          <input
            style={fieldStyle}
            placeholder="Note (opzionale)"
            value={booking.notes}
            onChange={(e) =>
              setBooking((b) => ({ ...b, notes: e.target.value }))
            }
          />

          <button
            type="submit"
            disabled={bookingLoading}
            style={{
              marginTop: 4,
              borderRadius: 9999,
              border: "none",
              padding: "8px 14px",
              fontSize: "0.85rem",
              fontWeight: 600,
              background: bookingLoading ? "#64748b" : "#22c55e",
              color: "#020617",
              cursor: bookingLoading ? "default" : "pointer",
            }}
          >
            {bookingLoading ? "Invio prenotazione..." : "Invia prenotazione"}
          </button>
        </form>

        {bookingStatus && (
          <p
            style={{
              marginTop: 6,
              fontSize: "0.8rem",
              opacity: 0.9,
            }}
          >
            {bookingStatus}
          </p>
        )}
      </div>
    </div>
  );
}

// piccolo stile riusabile per i campi
const fieldStyle: CSSProperties = {
  flex: 1,
  borderRadius: 9999,
  border: "1px solid rgba(148,163,184,0.8)",
  padding: "6px 10px",
  fontSize: "0.8rem",
  background: "#020617",
  color: "#e5e7eb",
};