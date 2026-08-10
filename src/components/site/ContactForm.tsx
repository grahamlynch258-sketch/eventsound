import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { captureLeadAttribution } from "@/lib/leadAttribution";
import { trackConversion, trackEvent } from "@/utils/trackConversion";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  contact_preference: string;
  event_date: string;
  event_date_tbc: boolean;
  venue: string;
  event_type: string;
  audience_size: string;
  budget_range: string;
  decision_deadline: string;
  lead_source: string;
  message: string;
  honeypot: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  contact_preference: "Email",
  event_date: "",
  event_date_tbc: false,
  venue: "",
  event_type: "",
  audience_size: "",
  budget_range: "",
  decision_deadline: "",
  lead_source: "",
  message: "",
  honeypot: "",
};

const SERVICES_OPTIONS = [
  "AV Equipment & Production",
  "Conference AV & Full Production",
  "Sound / PA Systems",
  "LED Video Walls",
  "Lighting Design",
  "Staging & Drape",
  "Video Production & Streaming",
  "Virtual / Hybrid Events",
];

const STEPS = ["Your details", "Event basics", "Scope & budget"];

interface ContactFormProps {
  defaultServices?: string[];
  formContext?: string;
}

export function ContactForm({ defaultServices = [], formContext = "General enquiry" }: ContactFormProps) {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [servicesNeeded, setServicesNeeded] = useState<string[]>(defaultServices.filter(Boolean));
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [step, setStep] = useState(1);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  const availableServices = useMemo(
    () => Array.from(new Set([...SERVICES_OPTIONS, ...defaultServices.filter(Boolean)])),
    [defaultServices],
  );

  useEffect(() => {
    setServicesNeeded((current) => Array.from(new Set([...current, ...defaultServices.filter(Boolean)])));
  }, [defaultServices]);

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

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || step !== 3) return;

    const renderWidget = () => {
      if (turnstileRef.current && window.turnstile && turnstileRef.current.childElementCount === 0) {
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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("quote_form_start", { form_context: formContext });
  };

  const showValidationError = (message: string, fieldGroup: string) => {
    trackEvent("quote_form_validation_error", { form_context: formContext, step, field_group: fieldGroup });
    toast({ title: message, variant: "destructive" });
  };

  const toggleService = (service: string) => {
    setServicesNeeded((previous) =>
      previous.includes(service) ? previous.filter((item) => item !== service) : [...previous, service],
    );
  };

  const nextStep = () => {
    if (step === 1 && (!form.name.trim() || !form.email.trim())) {
      showValidationError("Please enter your name and email", "contact_details");
      return;
    }
    if (step === 2 && (!form.event_type || !form.venue.trim() || (!form.event_date && !form.event_date_tbc))) {
      showValidationError("Please add the event type, venue or town, and date (or mark it not confirmed)", "event_basics");
      return;
    }

    trackEvent("quote_form_step_complete", { form_context: formContext, step });
    setStep((current) => current + 1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.message.trim() || servicesNeeded.length === 0) {
      showValidationError("Please select at least one service and add a few event details", "scope");
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      showValidationError("Please complete the CAPTCHA", "captcha");
      return;
    }

    setSubmitting(true);
    trackEvent("quote_form_submit_attempt", { form_context: formContext });

    try {
      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          services_needed: servicesNeeded.join(", "),
          form_context: formContext,
          attribution: captureLeadAttribution(),
          turnstileToken,
        }),
      });

      if (response.ok) {
        trackEvent("quote_form_submit", { form_context: formContext, services_count: servicesNeeded.length });
        trackConversion("QUOTE_FORM");
        setSubmitted(true);
        setForm(EMPTY);
        setServicesNeeded([]);
      } else {
        const data = await response.json().catch(() => ({}));
        trackEvent("quote_form_submit_error", { form_context: formContext, status: response.status });
        toast({
          title: "Error sending enquiry",
          description: data.error || "Please try again or call us directly.",
          variant: "destructive",
        });
      }
    } catch {
      trackEvent("quote_form_submit_error", { form_context: formContext, status: "network" });
      toast({
        title: "Network error",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-border/50 bg-card p-8 text-center" role="status">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
        <h3 className="mb-2 text-xl font-semibold">Enquiry received</h3>
        <p className="text-muted-foreground">Our team will review the brief and normally reply within 24 hours with the next practical step.</p>
        <a href={`tel:${siteConfig.phone}`} className="mt-5 inline-flex items-center gap-2 font-semibold text-accent hover:underline">
          <Phone className="h-4 w-4" /> Need to speak sooner? Call {siteConfig.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocusCapture={markStarted} className="space-y-6" noValidate>
      <input type="text" name="honeypot" value={form.honeypot} onChange={set("honeypot")} tabIndex={-1} aria-hidden="true" className="hidden" />

      {defaultServices.filter(Boolean).length > 0 && (
        <p className="rounded-lg border border-accent/25 bg-accent/5 px-4 py-3 text-sm">
          <span className="text-muted-foreground">Enquiring about:</span>{" "}
          <strong className="text-foreground">{defaultServices.filter(Boolean).join(", ")}</strong>
        </p>
      )}

      <div className="space-y-2" aria-label={`Step ${step} of ${STEPS.length}`}>
        <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
          {STEPS.map((label, index) => (
            <span key={label} className={index + 1 <= step ? "font-medium text-accent" : "text-muted-foreground"}>{label}</span>
          ))}
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-muted">
          <div className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all duration-300" style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />
        </div>
        <p className="text-right text-xs text-muted-foreground">Step {step} of {STEPS.length}</p>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="name">Name *</Label><Input id="name" name="name" value={form.name} onChange={set("name")} required autoComplete="name" /></div>
            <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" value={form.email} onChange={set("email")} required autoComplete="email" /></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" /></div>
            <div className="space-y-2"><Label htmlFor="company">Company / organisation</Label><Input id="company" name="company" value={form.company} onChange={set("company")} autoComplete="organization" /></div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact_preference">Preferred first response</Label>
            <select id="contact_preference" name="contact_preference" value={form.contact_preference} onChange={set("contact_preference")} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option>Email</option><option>Phone call</option><option>Either is fine</option>
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="event_type">Event type *</Label>
              <select id="event_type" name="event_type" value={form.event_type} onChange={set("event_type")} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Select event type…</option><option>Conference / Corporate</option><option>Concert / Live Music</option><option>Exhibition / Expo</option><option>Awards / Gala Dinner</option><option>Festival / Outdoor</option><option>Theatre / Musical</option><option>Product Launch</option><option>Community / Council Event</option><option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience_size">Estimated audience</Label>
              <select id="audience_size" name="audience_size" value={form.audience_size} onChange={set("audience_size")} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Select audience size…</option><option>Under 50</option><option>50 - 200</option><option>200 - 500</option><option>500 - 2,000</option><option>2,000+</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="event_date">Event date *</Label>
              <Input id="event_date" name="event_date" type="date" value={form.event_date} onChange={set("event_date")} disabled={form.event_date_tbc} />
              <label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={form.event_date_tbc} onChange={(event) => setForm((previous) => ({ ...previous, event_date_tbc: event.target.checked, event_date: event.target.checked ? "" : previous.event_date }))} /> Date not confirmed yet</label>
            </div>
            <div className="space-y-2"><Label htmlFor="venue">Venue or town *</Label><Input id="venue" name="venue" value={form.venue} onChange={set("venue")} placeholder="Venue name, town or county" /></div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Services needed *</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {availableServices.map((service) => (
                <label key={service} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${servicesNeeded.includes(service) ? "border-accent bg-accent/5" : "border-border"}`}>
                  <input type="checkbox" checked={servicesNeeded.includes(service)} onChange={() => toggleService(service)} className="rounded border-input" />
                  <span className="text-sm">{service}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="budget_range">Available budget</Label>
              <select id="budget_range" name="budget_range" value={form.budget_range} onChange={set("budget_range")} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Not confirmed</option><option>Under €1,000</option><option>€1,000 - €3,000</option><option>€3,000 - €5,000</option><option>€5,000 - €10,000</option><option>€10,000 - €20,000</option><option>€20,000+</option>
              </select>
            </div>
            <div className="space-y-2"><Label htmlFor="decision_deadline">Quote / decision deadline</Label><Input id="decision_deadline" name="decision_deadline" type="date" value={form.decision_deadline} onChange={set("decision_deadline")} /></div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead_source">How did you hear about EventSound?</Label>
            <select id="lead_source" name="lead_source" value={form.lead_source} onChange={set("lead_source")} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Select an option…</option><option>Google / search engine</option><option>Referral</option><option>Existing customer</option><option>Venue recommendation</option><option>Social media</option><option>Other</option>
            </select>
          </div>
          <div className="space-y-2"><Label htmlFor="message">Event details *</Label><Textarea id="message" name="message" rows={5} value={form.message} onChange={set("message")} placeholder="Timings, programme, presenters or performers, stage requirements, and anything already confirmed." /></div>
          {TURNSTILE_SITE_KEY && <div ref={turnstileRef} className="flex justify-center" />}
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        {step > 1 ? <Button type="button" variant="outline" onClick={() => setStep((current) => current - 1)}>Back</Button> : <div />}
        {step < STEPS.length ? (
          <Button type="button" onClick={nextStep}>Continue</Button>
        ) : (
          <Button type="submit" size="lg" disabled={submitting || (!!TURNSTILE_SITE_KEY && !turnstileToken)}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitting ? "Sending…" : "Request my quote"}
          </Button>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">No mailing list. Your details are used only to respond to this enquiry.</p>
    </form>
  );
}
