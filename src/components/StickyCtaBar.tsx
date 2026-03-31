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
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        shouldShow ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3 flex gap-3">
        <button
          onClick={handleScrollToForm}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground py-3 rounded-lg font-semibold text-sm transition-colors"
        >
          {ctaText}
        </button>
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center justify-center gap-2 px-5 py-3 border border-border rounded-lg font-semibold text-sm hover:bg-muted transition-colors"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
      </div>
    </div>
  );
}
