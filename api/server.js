import express from "express";

const app = express();
const port = Number(process.env.API_PORT || 4000);

app.get("/api/health", (_req, res) => res.json({ status: "ok", alloy: process.env.IS_ALLOY === "true" }));
app.get("/api/services", (_req, res) =>
  res.json([
    { id: 1, name: "Care Coordination", description: "Personalized plans connecting patients with the right providers." },
    { id: 2, name: "Telehealth", description: "Secure virtual visits with licensed clinicians across the USA." },
    { id: 3, name: "Wellness Programs", description: "Evidence-based programs for long-term health and wellbeing." },
  ])
);

app.listen(port, "0.0.0.0", () => console.log(`API listening on :${port}`));
