import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  event_date: string;
  venue: string;
  message: string;
  honeypot: string;
}

const EMPTY: FormState = {
  name: "", email: "", phone: "", company: "",
  event_date: "", venue: "", message: "", honeypot: "",
};

export function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    const scriptId = "turnstile-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const renderWidget = () => {
      if (
        turnstileRef.current &&
        window.turnstile &&
        turnstileRef.current.childElementCount === 0
      ) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(""),
        });
      }
    };

    const interval = setInterval(() => {
      if (window.turnstile) {
        renderWidget();
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      toast({ title: "Please complete the CAPTCHA", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken }),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm(EMPTY);
      } else {
        const data = await res.json().catch(() => ({}));
        toast({ title: "Error sending message", description: data.error || "Please try again or email us directly.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", description: "Please try again or email us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-border/50 bg-card p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">Message sent!</h3>
        <p className="text-muted-foreground">Thanks for getting in touch. We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="text" name="honeypot" value={form.honeypot} onChange={set("honeypot")}
        tabIndex={-1} aria-hidden="true" className="hidden" />

      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" value={form.name} onChange={set("name")} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" value={form.email} onChange={set("email")} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" value={form.phone} onChange={set("phone")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" value={form.company} onChange={set("company")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="event_date">Event Date</Label>
        <Input id="event_date" type="date" value={form.event_date} onChange={set("event_date")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="venue">Venue</Label>
        <Input id="venue" value={form.venue} onChange={set("venue")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea id="message" rows={5} value={form.message} onChange={set("message")} required />
      </div>

      {TURNSTILE_SITE_KEY && (
        <div ref={turnstileRef} className="flex justify-center" />
      )}

      <Button type="submit" size="lg" className="w-full" disabled={submitting || (!!TURNSTILE_SITE_KEY && !turnstileToken)}>
        {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
