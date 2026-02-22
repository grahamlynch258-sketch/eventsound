import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

const isIndexable = process.env.VITE_INDEXABLE === "true";

// Single-knob robots toggle.
// Beta (default): noindex everywhere except /admin/* (which is always noindex).
// Live: set VITE_INDEXABLE=true in Netlify env vars — removes global noindex.
const robotsPlugin = {
  name: "robots-toggle",

  // Inject the correct robots meta tag into index.html at build/dev time.
  transformIndexHtml(html: string): string {
    const content = isIndexable
      ? "index,follow,max-image-preview:large"
      : "noindex,nofollow,noarchive";
    return html.replace(
      /<meta\s+name="robots"[^>]*>/,
      `<meta name="robots" content="${content}" />`
    );
  },

  // Rewrite dist/_headers so the HTTP X-Robots-Tag matches the build mode.
  // /admin/* is always noindex; the /* rule is only added in beta builds.
  closeBundle() {
    const headersPath = path.resolve(__dirname, "dist/_headers");
    if (!fs.existsSync(headersPath)) return;
    const adminRule =
      "# Always block /admin/* — keep even after going live.\n" +
      "/admin/*\n" +
      "  X-Robots-Tag: noindex, nofollow, noarchive\n";
    const siteRule =
      "# Beta noindex — removed when VITE_INDEXABLE=true.\n" +
      "/*\n" +
      "  X-Robots-Tag: noindex, nofollow, noarchive\n\n";
    fs.writeFileSync(headersPath, isIndexable ? adminRule : siteRule + adminRule);
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), robotsPlugin],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
});