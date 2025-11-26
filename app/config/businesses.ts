// app/config/businesses.ts

export type BusinessSector =
  | "barbiere"
  | "pizzeria"
  | "ristorante"
  | "estetica"
  | "hotel"
  | "ecommerce"
  | "altro";

export type BusinessConfig = {
  /** ID interno che usi tu, solo per riferimento */
  id: string;
  /** Nome attività, solo descrittivo */
  name: string;
  /** Settore, usato per dire al bot come parlare */
  sector: BusinessSector;
  /** phone_number_id di WhatsApp Business (quello lungo numerico) */
  whatsappPhoneNumberId: string;
};

/**
 * Qui dentro metti tutte le attività che useranno il bot WhatsApp.
 * Per ora abbiamo solo la demo barbiere.
 */
export const BUSINESSES: BusinessConfig[] = [
  {
    id: "barber-demo",
    name: "Barbiere Demo GalaxBot",
    sector: "barbiere",
    // usa la variabile che hai già in .env.local
    whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID ?? "",
  },
  // Esempio per il futuro:
  // {
  //   id: "pizzeria-demo",
  //   name: "Pizzeria Demo",
  //   sector: "pizzeria",
  //   whatsappPhoneNumberId: "123456789012345",
  // },
];

/**
 * Ritorna la config in base al phone_number_id che arriva da Meta
 */
export function getBusinessByPhoneNumberId(
  phoneNumberId: string
): BusinessConfig | undefined {
  if (!phoneNumberId) return undefined;
  return BUSINESSES.find(
    (b) => b.whatsappPhoneNumberId === phoneNumberId
  );
}