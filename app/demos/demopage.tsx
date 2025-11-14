// app/demopage.tsx

export type DemoConfig = {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  gradient: string;
  accentColor: string;
  instagramText?: string;
};

const INSTAGRAM_URL =
  "https://www.instagram.com/galaxbot_ai?igsh=MW9zNmNlcmtuMHE3cA%3D%3D&utm_source=qr";

export default function DemoPage({ config }: { config: DemoConfig }) {
  const {
    title,
    subtitle,
    description,
    points,
    gradient,
    accentColor,
    instagramText = "Scrivimi su Instagram per avere questo chatbot su misura",
  } = config;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#f9fafb",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          textAlign: "center",
          padding: "32px 24px",
          borderRadius: 32,
          background: "rgba(5, 10, 25, 0.55)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
          border: "1px solid rgba(148,163,184,0.25)",
          backdropFilter: "blur(16px)",
        }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            marginBottom: "0.5rem",
            letterSpacing: "0.03em",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: "1rem",
            opacity: 0.9,
            marginBottom: "0.8rem",
          }}
        >
          {subtitle}
        </p>

        <p
          style={{
            fontSize: "0.98rem",
            opacity: 0.9,
            marginBottom: "1.3rem",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>

        <ul
          style={{
            textAlign: "left",
            margin: "0 auto 1.6rem",
            maxWidth: 480,
            paddingLeft: "1.1rem",
            fontSize: "0.95rem",
            opacity: 0.95,
          }}
        >
          {points.map((punto) => (
            <li key={punto} style={{ marginBottom: "0.35rem" }}>
              {punto}
            </li>
          ))}
        </ul>

        <p
          style={{
            fontSize: "0.9rem",
            opacity: 0.85,
            marginBottom: "1.4rem",
          }}
        >
          Questo è un demo: nel progetto reale personalizziamo nome, regole e
          contenuti in base alla tua attività.
        </p>

        {/* Bottoni */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              borderRadius: 9999,
              padding: "11px 24px",
              background: accentColor,
              color: "#0b1220",
              fontWeight: 600,
              fontSize: "0.96rem",
              textDecoration: "none",
              boxShadow: "0 14px 40px rgba(15,23,42,0.65)",
              border: "1px solid rgba(15,23,42,0.4)",
            }}
          >
            Voglio un chatbot come questo
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              borderRadius: 9999,
              padding: "11px 22px",
              background: "transparent",
              color: "#e5e7eb",
              fontWeight: 500,
              fontSize: "0.92rem",
              textDecoration: "none",
              border: "1px solid rgba(148,163,184,0.6)",
            }}
          >
            {instagramText}
          </a>
        </div>

        <p
          style={{
            fontSize: "0.82rem",
            opacity: 0.7,
          }}
        >
          GalaxBot AI — assistenti virtuali e app smart per aziende 🚀
        </p>
      </div>
    </main>
  );
}