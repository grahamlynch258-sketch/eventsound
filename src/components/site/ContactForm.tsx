import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  event_date: string;
  venue: string;
  event_type: string;
  audience_size: string;
  budget_range: string;
  message: string;
  honeypot: string;
}

const EMPTY: FormState = {
  name: "", email: "", phone: "", company: "",
  event_date: "", venue: "", event_type: "", audience_size: "",
  budget_range: "", message: "", honeypot: "",
};

const SERVICES_OPTIONS = [
  "Sound / PA Systems",
  "LED Video Walls",
  "Lighting Design",
  "Staging & Drape",
  "Event Production Management",
  "Video Production & Streaming",
  "Virtual / Hybrid Events",
];

const STEPS = ["Your Details", "Event Info", "Services & Budget"];

export function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [servicesNeeded, setServicesNeeded] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);

  // Load Turnstile script (runs once)
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
  }, []);

  // Render Turnstile widget when step 3 is active
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || step !== 3) return;

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

    if (window.turnstile) {
      renderWidget();
      return;
    }

    const interval = setInterval(() => {
      if (window.turnstile) {
        renderWidget();
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [step]);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const toggleService = (service: string) => {
    setServicesNeeded((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const nextStep = () => {
    if (step === 1 && (!form.name || !form.email)) {
      toast({ title: "Please fill in your name and email", variant: "destructive" });
      return;
    }
    setStep((s) => s + 1);
  };

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
        body: JSON.stringify({
          ...form,
          services_needed: servicesNeeded.join(", "),
          turnstileToken,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm(EMPTY);
        setServicesNeeded([]);
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
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
        <h3 className="text-xl font-semibold mb-2">Message sent!</h3>
        <p className="text-muted-foreground">Thanks for getting in touch. We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="text" name="honeypot" value={form.honeypot} onChange={set("honeypot")}
        tabIndex={-1} aria-hidden="true" className="hidden" />

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          {STEPS.map((label, i) => (
            <span
              key={label}
              className={i + 1 <= step ? "text-accent font-medium" : "text-muted-foreground"}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="relative h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-right">Step {step} of {STEPS.length}</p>
      </div>

      {/* STEP 1: Your Details */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" value={form.name} onChange={set("name")} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={form.email} onChange={set("email")} required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={set("phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company / Organisation</Label>
              <Input id="company" value={form.company} onChange={set("company")} />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Event Info */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event_type">Event Type</Label>
              <select
                id="event_type"
                value={form.event_type}
                onChange={set("event_type")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value="">Select event type...</option>
                <option>Conference / Corporate</option>
                <option>Concert / Live Music</option>
                <option>Exhibition / Expo</option>
                <option>Awards / Gala Dinner</option>
                <option>Festival / Outdoor</option>
                <option>Virtual / Hybrid</option>
                <option>Product Launch</option>
                <option>Community / Council Event</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience_size">Estimated Audience Size</Label>
              <select
                id="audience_size"
                value={form.audience_size}
                onChange={set("audience_size")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value="">Select audience size...</option>
                <option>Under 50</option>
                <option>50 - 200</option>
                <option>200 - 500</option>
                <option>500 - 2,000</option>
                <option>2,000+</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event_date">Event Date</Label>
              <Input id="event_date" type="date" value={form.event_date} onChange={set("event_date")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input id="venue" value={form.venue} onChange={set("venue")} />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Services & Budget */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Services Needed</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICES_OPTIONS.map((service) => (
                <label
                  key={service}
                  className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                    servicesNeeded.includes(service)
                      ? "border-accent bg-accent/5"
                      : "border-border"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={servicesNeeded.includes(service)}
                    onChange={() => toggleService(service)}
                    className="rounded border-input"
                  />
                  <span className="text-sm">{service}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget_range">Budget Range</Label>
            <select
              id="budget_range"
              value={form.budget_range}
              onChange={set("budget_range")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            >
              <option value="">Select budget range...</option>
              <option>Under €1,000</option>
              <option>€1,000 - €3,000</option>
              <option>€3,000 - €5,000</option>
              <option>€5,000 - €10,000</option>
              <option>€10,000 - €20,000</option>
              <option>€20,000+</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Additional Details *</Label>
            <Textarea id="message" rows={4} value={form.message} onChange={set("message")} required />
          </div>
          {TURNSTILE_SITE_KEY && (
            <div ref={turnstileRef} className="flex justify-center" />
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : (
          <div />
        )}
        {step < STEPS.length ? (
          <Button type="button" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            size="lg"
            disabled={submitting || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
          >
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitting ? "Sending..." : "Send Message"}
          </Button>
        )}
      </div>

      {step === STEPS.length && (
        <p className="text-sm text-muted-foreground text-center">We typically respond within 24 hours.</p>
      )}
    </form>
  );
}
