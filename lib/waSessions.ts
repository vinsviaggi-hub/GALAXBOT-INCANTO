// lib/waSessions.ts

// Step possibili del flusso di prenotazione
export type BookingStep =
  | "idle"
  | "collecting_name"
  | "collecting_service"
  | "collecting_date"
  | "collecting_time"
  | "completed";

// Stato della prenotazione per un numero WhatsApp
export interface BookingState {
  step: BookingStep;
  name?: string | null;
  service?: string | null;
  date?: string | null; // yyyy-mm-dd
  time?: string | null; // HH:mm
  lastCompletedAt?: number | null;
}

// Memoria in RAM per le sessioni WhatsApp
const sessions = new Map<string, BookingState>();

// Recupera o crea una sessione
export async function getSessionForPhone(phone: string): Promise<BookingState> {
  let session = sessions.get(phone);

  if (!session) {
    session = { step: "idle" };
    sessions.set(phone, session);
  }

  return session;
}

// Salva/aggiorna la sessione
export async function saveSessionForPhone(
  phone: string,
  state: BookingState
): Promise<void> {
  sessions.set(phone, state);
}

// Resetta la sessione (quando completata o nuova prenotazione)
export async function resetSessionForPhone(phone: string): Promise<void> {
  sessions.set(phone, { step: "idle" });
}