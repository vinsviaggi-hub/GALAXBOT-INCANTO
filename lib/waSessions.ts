// app/lib/waSessions.ts
import { createClient } from "@supabase/supabase-js";

// Struttura dello stato per ogni conversazione WhatsApp
export interface BookingState {
  step: "idle" | "collecting" | "completed";
  service?: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  lastCompletedAt?: number;
}

// Connessione a Supabase usando le env del progetto
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Tabella che memorizza le sessioni
const TABLE = "wa_sessions";

/**
 * Recupera o crea una sessione per un numero WhatsApp.
 */
export async function getSessionForPhone(phone: string): Promise<BookingState> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("phone", phone)
    .maybeSingle();

  if (error) {
    console.error("[waSessions] Errore getSession:", error);
    return { step: "idle" };
  }

  if (!data) {
    const emptyState: BookingState = { step: "idle", phone };
    await supabase.from(TABLE).insert([{ phone, state: emptyState }]);
    return emptyState;
  }

  try {
    return typeof data.state === "string" ? JSON.parse(data.state) : data.state;
  } catch {
    return { step: "idle" };
  }
}

/**
 * Salva o aggiorna la sessione per un numero.
 */
export async function saveSessionForPhone(
  phone: string,
  state: BookingState
): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .upsert([{ phone, state }], { onConflict: "phone" });

  if (error) console.error("[waSessions] Errore saveSession:", error);
}
