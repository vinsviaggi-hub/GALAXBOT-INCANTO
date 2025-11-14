// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "GalaxBot AI 🚀",
  description:
    "Creiamo assistenti virtuali e app smart per aziende e professionisti. Automatizza risposte, prenotazioni e vendite con l’intelligenza artificiale.",
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