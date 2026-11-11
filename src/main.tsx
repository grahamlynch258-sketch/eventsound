// prerenderBoot must stay the first import: it wraps fetch before the
// Supabase client (imported by App) is created.
import { mountBehindSnapshot, whenSettled } from "./lib/prerenderBoot";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;
const hasFullSnapshot = rootElement.dataset.prerender === "full" && rootElement.childElementCount > 0;

if (hasFullSnapshot) {
  // The build shipped this page fully rendered. Keep it on screen while the
  // app boots behind it, then swap, so visitors never see a blank flash.
  mountBehindSnapshot(rootElement, (container) => createRoot(container).render(<App />));
} else {
  // Short static shell or empty root (admin, landing pages, 404, capture run).
  createRoot(rootElement).render(<App />);
  whenSettled(rootElement).then(() => {
    window.__APP_READY__ = true;
  });
}
