// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "GalaxBot Demo 🚀",
    template: "%s · GalaxBot Demo",
  },
  description:
    "Demo: assistente virtuale + prenotazioni smart per aziende e professionisti. Prova chat e modulo prenotazione in tempo reale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b1020" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}