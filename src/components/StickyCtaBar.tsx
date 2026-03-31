import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

interface StickyCtaBarProps {
  quoteFormId?: string;
  phoneNumber?: string;
  ctaText?: string;
}

export function StickyCtaBar({
  quoteFormId = "quote-form",
  phoneNumber = "+353863520476",
  ctaText = "Get a Quote",
}: StickyCtaBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const formEl = document.getElementById(quoteFormId);
    if (!formEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(formEl);
    return () => observer.disconnect();
  }, [quoteFormId]);

  const handleScrollToForm = () => {
    const formEl = document.getElementById(quoteFormId);
    if (formEl) formEl.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const shouldShow = isVisible && !formInView;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        shouldShow ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl shadow-lg px-3 py-2.5 flex gap-2">
        <button
          onClick={handleScrollToForm}
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-semibold text-xs transition-colors"
        >
          {ctaText}
        </button>
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center justify-center gap-1.5 px-3 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors"
        >
          <Phone className="h-3.5 w-3.5" />
          Call
        </a>
      </div>
    </div>
  );
}
