import { useEffect, useState } from "react";

export default function App() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("checking…");

  useEffect(() => {
    fetch("/api/health").then((r) => r.json()).then((d) => setStatus(d.status)).catch(() => setStatus("offline"));
    fetch("/api/services").then((r) => r.json()).then(setServices).catch(() => {});
  }, []);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: 32 }}>
      <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h1 style={{ margin: 0, fontSize: 40, color: "#0b4f8a" }}>Thinkwell USA</h1>
        <p style={{ margin: 0, fontSize: 18, color: "#425066" }}>Adaptive care, thoughtfully delivered.</p>
        <span style={{ fontSize: 14, color: "#425066" }}>API status: <strong>{status}</strong></span>
      </header>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {services.map((s) => (
          <article key={s.id} style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,.08)" }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 20, color: "#0b4f8a" }}>{s.name}</h2>
            <p style={{ margin: 0, color: "#425066", lineHeight: 1.5 }}>{s.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
