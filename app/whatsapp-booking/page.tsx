// app/whatsapp-booking/page.tsx
"use client";

import { useState, useEffect, FormEvent, type CSSProperties } from "react";

type FreeSlot = string;

export default function WhatsAppBookingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [freeSlots, setFreeSlots] = useState<FreeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Quando cambia la data, carico gli orari disponibili
  useEffect(() => {
    if (!date) return;
    void loadAvailability(date);
  }, [date]);

  async function loadAvailability(selectedDate: string) {
    try {
      setLoadingSlots(true);
      setErrorMessage("");
      setSuccessMessage("");
      setFreeSlots([]);
      setTime("");

      const res = await fetch("/api/barber-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "get_availability",
          date: selectedDate,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Errore nel recupero degli orari.");
      }

      setFreeSlots(data.freeSlots || []);
    } catch (err: any) {
      console.error("[BOOKING] Errore get_availability:", err);
      setErrorMessage(
        err?.message || "Errore inatteso durante il recupero degli orari."
      );
    } finally {
      setLoadingSlots(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name || !service || !date || !time) {
      setErrorMessage("Compila almeno nome, servizio, data e ora.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/barber-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_booking",
          name,
          phone,
          service,
          date,
          time,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.conflict) {
          setErrorMessage(
            "Questo orario non è disponibile. Scegli un altro slot libero."
          );
        } else {
          setErrorMessage(data.error || "Errore durante la prenotazione.");
        }
        return;
      }

      // ✅ Messaggio chiaro quando va a buon fine
      setSuccessMessage("Prenotazione confermata! ✅");

      // Pulisco i campi
      setName("");
      setPhone("");
      setService("");
      setNotes("");
      setTime("");

      // Ricarico gli slot liberi per quella data
      if (date) {
        void loadAvailability(date);
      }
    } catch (err: any) {
      console.error("[BOOKING] Errore create_booking:", err);
      setErrorMessage(
        err?.message || "Errore inatteso durante la prenotazione."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "24px 12px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#0b1120",
          borderRadius: 20,
          padding: "16px 16px 18px",
          border: "1px solid rgba(148,163,184,0.5)",
          boxShadow: "0 24px 60px rgba(15,23,42,0.9)",
          color: "#e5e7eb",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            marginBottom: 6,
            color: "#f9fafb",
            textAlign: "center",
          }}
        >
          Prenotazione veloce WhatsApp 💈
        </h1>
        <p
          style={{
            fontSize: "0.8rem",
            color: "#9ca3af",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Compila i campi qui sotto per inviare la tua prenotazione al
          barbiere. Vedrai solo gli orari ancora liberi per il giorno scelto.
        </p>

        {/* Messaggi */}
        {errorMessage && (
          <div
            style={{
              marginBottom: 8,
              borderRadius: 8,
              border: "1px solid rgba(248,113,113,0.8)",
              background: "rgba(254,242,242,0.08)",
              padding: "6px 8px",
              fontSize: "0.78rem",
              color: "#fecaca",
            }}
          >
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            style={{
              marginBottom: 8,
              borderRadius: 8,
              border: "1px solid rgba(34,197,94,0.8)",
              background: "rgba(22,163,74,0.15)",
              padding: "6px 8px",
              fontSize: "0.78rem",
              color: "#bbf7d0",
            }}
          >
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {/* Nome */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: 3,
                fontSize: "0.78rem",
                color: "#cbd5f5",
              }}
            >
              Nome cliente *
            </label>
            <input
              type="text"
              placeholder="Es. Marco"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Telefono */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: 3,
                fontSize: "0.78rem",
                color: "#cbd5f5",
              }}
            >
              Telefono
            </label>
            <input
              type="tel"
              placeholder="Es. 3331234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Servizio */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: 3,
                fontSize: "0.78rem",
                color: "#cbd5f5",
              }}
            >
              Servizio *
            </label>
            <input
              type="text"
              placeholder="Es. Taglio uomo, barba..."
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Data */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: 3,
                fontSize: "0.78rem",
                color: "#cbd5f5",
              }}
            >
              Data *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Orario */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: 3,
                fontSize: "0.78rem",
                color: "#cbd5f5",
              }}
            >
              Orario *
            </label>

            {loadingSlots && (
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  marginBottom: 3,
                }}
              >
                Caricamento orari disponibili…
              </div>
            )}

            {!loadingSlots && date && freeSlots.length === 0 && (
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  marginBottom: 3,
                }}
              >
                Nessun orario libero per questa data.
              </div>
            )}

            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={inputStyle}
              disabled={loadingSlots || freeSlots.length === 0}
            >
              <option value="">Seleziona un orario</option>
              {freeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Note */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: 3,
                fontSize: "0.78rem",
                color: "#cbd5f5",
              }}
            >
              Note (facoltative)
            </label>
            <textarea
              rows={3}
              placeholder="Es. preferenze, indicazioni particolari…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                ...inputStyle,
                borderRadius: 12,
                resize: "vertical",
              }}
            />
          </div>

          {/* Bottone */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              marginTop: 6,
              width: "100%",
              borderRadius: 9999,
              border: "none",
              padding: "10px 16px",
              fontSize: "0.9rem",
              fontWeight: 600,
              backgroundColor: submitting ? "#16a34a99" : "#16a34a",
              color: "#022c22",
              cursor: submitting ? "default" : "pointer",
            }}
          >
            {submitting
              ? "Invio prenotazione..."
              : "Conferma prenotazione"}
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle: CSSProperties = {
  width: "100%",
  borderRadius: 9999,
  border: "1px solid rgba(148,163,184,0.75)",
  padding: "8px 12px",
  fontSize: "0.85rem",
  backgroundColor: "#020617",
  color: "#e5e7eb",
  outline: "none",
};