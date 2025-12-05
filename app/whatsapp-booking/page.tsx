// app/whatsapp-booking/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";

type FreeSlot = string;

export default function WhatsappBookingPage() {
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

      // ✅ PRENOTAZIONE ANDATA A BUON FINE
      setSuccessMessage("Prenotazione inviata correttamente! ✅");

      // pulisco i campi (lascio la data così se vogliono fare un’altra prenotazione)
      setName("");
      setPhone("");
      setService("");
      setNotes("");
      setTime("");

      // ricarico gli slot liberi per quel giorno
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
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-slate-900/80 border border-slate-700/70 px-5 py-6 shadow-xl">
          <h1 className="text-center text-base font-semibold mb-1">
            Prenotazione dal bot WhatsApp 💬✂️
          </h1>
          <p className="text-[11px] text-slate-300 text-center mb-4 leading-snug">
            Compila i campi qui sotto. Le prenotazioni vengono salvate
            direttamente nel foglio Google del barbiere.
          </p>

          {/* MESSAGGI */}
          {errorMessage && (
            <div className="mb-3 rounded-md border border-red-400 bg-red-50 px-3 py-2 text-xs text-red-700">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mb-3 rounded-md border border-emerald-400 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2.5">
            {/* NOME */}
            <div className="space-y-0.5 text-xs">
              <label className="font-medium">Nome cliente *</label>
              <input
                type="text"
                className="w-full rounded-md border border-slate-600 bg-slate-950/60 px-3 py-1.5 text-xs outline-none"
                placeholder="Es. Marco"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* TELEFONO */}
            <div className="space-y-0.5 text-xs">
              <label className="font-medium">Telefono</label>
              <input
                type="tel"
                className="w-full rounded-md border border-slate-600 bg-slate-950/60 px-3 py-1.5 text-xs outline-none"
                placeholder="Es. 3331234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* SERVIZIO */}
            <div className="space-y-0.5 text-xs">
              <label className="font-medium">Servizio *</label>
              <input
                type="text"
                className="w-full rounded-md border border-slate-600 bg-slate-950/60 px-3 py-1.5 text-xs outline-none"
                placeholder="Es. Taglio uomo, barba..."
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
            </div>

            {/* DATA */}
            <div className="space-y-0.5 text-xs">
              <label className="font-medium">Data *</label>
              <input
                type="date"
                className="w-full rounded-md border border-slate-600 bg-slate-950/60 px-3 py-1.5 text-xs outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* ORARIO */}
            <div className="space-y-0.5 text-xs">
              <label className="font-medium">Orario *</label>

              {loadingSlots ? (
                <p className="text-[10px] text-slate-300">
                  Caricamento orari disponibili...
                </p>
              ) : freeSlots.length === 0 && date ? (
                <p className="text-[10px] text-slate-300">
                  Nessun orario libero per questa data.
                </p>
              ) : null}

              <select
                className="mt-0.5 w-full rounded-md border border-slate-600 bg-slate-950/60 px-3 py-1.5 text-xs outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
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

            {/* NOTE */}
            <div className="space-y-0.5 text-xs">
              <label className="font-medium">Note (facoltative)</label>
              <textarea
                className="w-full rounded-md border border-slate-600 bg-slate-950/60 px-3 py-1.5 text-xs outline-none"
                rows={3}
                placeholder="Es. Preferenze, indicazioni particolari..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* BOTTONE */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 disabled:opacity-60"
            >
              {submitting
                ? "Invio prenotazione..."
                : "Conferma prenotazione"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}