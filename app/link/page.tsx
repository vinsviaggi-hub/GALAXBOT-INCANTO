// app/link/page.tsx

const links = {
  main: [
    {
      label: "Sito principale GalaxBot AI",
      href: "https://galaxbot-ai-site.vercel.app/",
      description: "Pagina di presentazione generale del progetto."
    },
  ],
  demos: [
    {
      label: "Demo completo con chat · Barbiere / Parrucchiere",
      href: "/demos/barbiere",
    },
    { label: "Demo Pizzeria", href: "/demos/pizzeria" },
    { label: "Demo Abbigliamento / Fashion", href: "/demos/abbigliamento" },
    { label: "Demo Centri estetici & Beauty", href: "/demos/estetica" },
    { label: "Demo Negozi & E-commerce", href: "/demos/ecommerce" },
    { label: "Demo Gelateria", href: "/demos/gelateria" },
    { label: "Demo Pasticceria", href: "/demos/pasticceria" },
    { label: "Demo Ristorante", href: "/demos/ristorante" },
    { label: "Demo Hotel / B&B", href: "/demos/hotel" },
    { label: "Demo Palestra & Fitness", href: "/demos/palestra" },
    { label: "Demo Salone Parrucchiera", href: "/demos/parrucchiera" },
    { label: "Demo Agenzia Immobiliare", href: "/demos/immobiliare" },
    { label: "Demo Studi medici / Professionisti", href: "/demos/studiomedico" },
    { label: "Demo Veterinario", href: "/demos/veterinario" },
  ],
  business: [
    {
      label: "Pagamento abbonamento mensile (Stripe)",
      href: "https://buy.stripe.com/5kQ4gzbY30Vi6sP6uab3q02",
      description: "Abbonamento GalaxBot AI: 29€/mese (con PROMO10 pagano 10€ il primo mese).",
    },
    {
      label: "Instagram @galaxbot_ai",
      href: "https://www.instagram.com/galaxbot_ai?igsh=MW9zNmNlcmtuMHE3cA%3D%3D&utm_source=qr",
      description: "Scrivimi qui per demo personalizzati e domande veloci.",
    },
  ],
};

export default function LinksPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #4f46e5 0, #020617 55%, #020617 100%)",
        color: "#ffffff",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "32px 16px 40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 960 }}>
        {/* HEADER */}
        <header style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-block",
              padding: "4px 14px",
              borderRadius: 9999,
              background: "rgba(15,23,42,0.8)",
              border: "1px solid rgba(255,255,255,0.16)",
              fontSize: "0.78rem",
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            GalaxBot AI · Tutti i link
          </div>

          <h1
            style={{
              fontSize: "2.1rem",
              marginBottom: "8px",
              letterSpacing: 0.2,
            }}
          >
            Tutte le pagine e i demo in un posto solo
          </h1>

          <p
            style={{
              opacity: 0.9,
              lineHeight: 1.6,
              maxWidth: 640,
              margin: "0 auto",
              fontSize: "0.96rem",
            }}
          >
            Salva questo link e usalo quando parli con i clienti: puoi aprire al
            volo il demo giusto, il pagamento dell’abbonamento o il contatto
            Instagram.
          </p>
        </header>

        {/* SEZIONE SITO PRINCIPALE */}
        <section style={{ marginBottom: 26 }}>
          <h2
            style={{
              fontSize: "1rem",
              textTransform: "uppercase",
              letterSpacing: 1,
              opacity: 0.8,
              marginBottom: 10,
            }}
          >
            Sito principale
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
              gap: 10,
            }}
          >
            {links.main.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "12px 16px",
                  borderRadius: 16,
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))",
                  border: "1px solid rgba(148,163,184,0.8)",
                  textDecoration: "none",
                  color: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span style={{ fontWeight: 600 }}>{link.label}</span>
                {link.description && (
                  <span style={{ fontSize: "0.84rem", opacity: 0.85 }}>
                    {link.description}
                  </span>
                )}
              </a>
            ))}
          </div>
        </section>

        {/* SEZIONE DEMO */}
        <section style={{ marginBottom: 26 }}>
          <h2
            style={{
              fontSize: "1rem",
              textTransform: "uppercase",
              letterSpacing: 1,
              opacity: 0.8,
              marginBottom: 10,
            }}
          >
            Demo per settori
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 10,
            }}
          >
            {links.demos.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  padding: "11px 14px",
                  borderRadius: 16,
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.88))",
                  border: "1px solid rgba(55,65,81,0.9)",
                  textDecoration: "none",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <span>{link.label}</span>
                <span style={{ opacity: 0.6, fontSize: "0.8rem" }}>Apri ↗️</span>
              </a>
            ))}
          </div>
        </section>

        {/* SEZIONE BUSINESS */}
        <section>
          <h2
            style={{
              fontSize: "1rem",
              textTransform: "uppercase",
              letterSpacing: 1,
              opacity: 0.8,
              marginBottom: 10,
            }}
          >
            Abbonamento & contatti
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
              gap: 10,
            }}
          >
            {links.business.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "12px 16px",
                  borderRadius: 16,
                  background:
                    "linear-gradient(135deg, rgba(22,163,74,0.95), rgba(5,46,22,0.95))",
                  border: "1px solid rgba(74,222,128,0.9)",
                  textDecoration: "none",
                  color: "#f9fafb",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span style={{ fontWeight: 650 }}>{link.label}</span>
                {link.description && (
                  <span style={{ fontSize: "0.84rem", opacity: 0.95 }}>
                    {link.description}
                  </span>
                )}
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}