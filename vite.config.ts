import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

const isIndexable = process.env.VITE_INDEXABLE === "true";

const robotsPlugin = {
  name: "robots-toggle",
  transformIndexHtml(html: string): string {
    const content = isIndexable
      ? "index,follow,max-image-preview:large"
      : "noindex,nofollow,noarchive";
    return html.replace(
      /<meta\s+name="robots"[^>]*>/,
      `<meta name="robots" content="${content}" />`
    );
  },
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

export default defineConfig({
  server: { host: "::", port: 8080, hmr: { overlay: false } },
  plugins: [react(), robotsPlugin],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
});
