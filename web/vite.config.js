import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Serve index.html for any *.html route (e.g. /products.html) so pages use real .html URLs.
const htmlRoutes = () => {
  const mw = (req, _res, next) => {
    const p = req.url.split("?")[0];
    if (p.endsWith(".html") && p !== "/index.html") req.url = "/index.html" + (req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "");
    next();
  };
  return { name: "html-routes", configureServer: (s) => s.middlewares.use(mw), configurePreviewServer: (s) => s.middlewares.use(mw) };
};

export default defineConfig({
  plugins: [htmlRoutes(), react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: true,
    proxy: { "/api": `http://localhost:${process.env.API_PORT || 4000}` },
  },
});
