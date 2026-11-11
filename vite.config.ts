import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: { host: "::", port: 8080, hmr: { overlay: false } },
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  build: {
    // The prerender step reads the manifest to preload each page's own chunk.
    manifest: true,
    rollupOptions: {
      output: {
        // Group only the libraries every public page needs. Everything else
        // (admin-only Radix widgets, form and icon code) is split by Rollup
        // according to which pages import it, so public pages don't download it.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|@remix-run[\\/]router)[\\/]/.test(id)) return "vendor-react";
          if (/[\\/]node_modules[\\/]@tanstack[\\/]/.test(id)) return "vendor-query";
          if (/[\\/]node_modules[\\/]@supabase[\\/]/.test(id)) return "vendor-supabase";
          if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return "vendor-motion";
          return undefined;
        },
      },
    },
  },
});
