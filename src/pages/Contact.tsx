import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MapPin, Clock, ArrowRight, ArrowLeft, Check } from "lucide-react";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICE_OPTIONS = ["Audio", "Visuals / LED", "Lighting", "Staging", "Video Recording", "Draping & Décor", "Full Production"];
const BUDGET_OPTIONS = ["Under €3,000", "€3,000 – €10,000", "€10,000 – €25,000", "€25,000+", "Not sure yet"];

export default function Contact() {
  const { toast } = useToast();
  const [step, setStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "", email: "", phone: "", company: "",
    event_date: "", event_type: "", venue: "", audience_size: "",
    services: [] as string[], budget_range: "", message: "",
  });

  const update = (field: string, value: string | string[]) => setForm((f) => ({ ...f, [field]: value }));
  const toggleService = (s: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));
  };

  const canNext = step === 0
    ? form.name.trim() && form.email.trim()
    : step === 1
    ? true
    : true;

  async function onSubmit() {
    setIsSubmitting(true);
    const { error } = await supabase.from("quote_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      company: form.company.trim() || null,
      event_date: form.event_date.trim() || null,
      event_type: form.event_type.trim() || null,
      venue: form.venue.trim() || null,
      audience_size: form.audience_size.trim() || null,
      services: form.services.length > 0 ? form.services : null,
      budget_range: form.budget_range || null,
      message: form.message.trim() || null,
    });
    setIsSubmitting(false);

    if (error) {
      toast({ title: "Something went wrong", description: "Please try again or email us directly.", variant: "destructive" });
    } else {
      setSubmitted(true);
      toast({ title: "Quote request sent!", description: "We'll get back to you within 24 hours." });
    }
  }

  const steps = [
    // Step 1: Contact info
    <div key="step0" className="grid gap-5">
      <h3 className="font-serif text-xl font-semibold">Your details</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Optional" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Optional" />
        </div>
      </div>
    </div>,

    // Step 2: Event details
    <div key="step1" className="grid gap-5">
      <h3 className="font-serif text-xl font-semibold">Event details</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="event_date">Event date</Label>
          <Input id="event_date" value={form.event_date} onChange={(e) => update("event_date", e.target.value)} placeholder="e.g. 12 Mar 2026" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="event_type">Event type</Label>
          <Input id="event_type" value={form.event_type} onChange={(e) => update("event_type", e.target.value)} placeholder="Conference, gala, launch..." />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="venue">Venue</Label>
          <Input id="venue" value={form.venue} onChange={(e) => update("venue", e.target.value)} placeholder="Venue name or location" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="audience_size">Audience size</Label>
          <Input id="audience_size" value={form.audience_size} onChange={(e) => update("audience_size", e.target.value)} placeholder="e.g. 200" />
        </div>
      </div>
    </div>,

    // Step 3: Services + message
    <div key="step2" className="grid gap-5">
      <h3 className="font-serif text-xl font-semibold">What do you need?</h3>
      <div>
        <Label className="mb-3 block">Services required</Label>
        <div className="flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleService(s)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                form.services.includes(s)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label className="mb-3 block">Budget range</Label>
        <div className="flex flex-wrap gap-2">
          {BUDGET_OPTIONS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => update("budget_range", form.budget_range === b ? "" : b)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                form.budget_range === b
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Anything else?</Label>
        <Textarea id="message" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Run sheet, special requirements, questions..." rows={4} />
      </div>
    </div>,
  ];

  return (
    <PageShell>
      <main>
        {/* Hero */}
        <section className="container py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Let's plan your event
            </h1>
            <p className="mt-4 text-muted-foreground">
              Share your details and we'll come back with a clear recommendation and quote — usually within 24 hours.
            </p>
          </div>
        </section>

        <section className="container pb-20 md:pb-28">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="rounded-lg border border-primary/30 bg-card p-8 md:p-12 text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold mb-3">Quote request sent!</h2>
                  <p className="text-muted-foreground">We'll review your brief and get back to you within 24 hours. Check your email for confirmation.</p>
                </div>
              ) : (
                <div className="rounded-lg border border-border/50 bg-card p-6 md:p-8">
                  {/* Progress */}
                  <div className="flex items-center gap-2 mb-8">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} style={{ width: "4rem" }} />
                      </div>
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground">Step {step + 1} of 3</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      {steps[step]}
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
                    {step > 0 ? (
                      <Button variant="ghost" onClick={() => setStep(step - 1)}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                    ) : <div />}
                    {step < 2 ? (
                      <Button onClick={() => setStep(step + 1)} disabled={!canNext}>
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={onSubmit} disabled={isSubmitting} className="font-semibold">
                        {isSubmitting ? "Sending…" : "Submit Quote Request"}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-lg border border-border/50 bg-card p-6">
                <h3 className="font-serif text-lg font-semibold mb-4">Contact info</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">hello@stagespark.ie</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+353 1 234 5678</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Dublin, Ireland — nationwide service</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Response time</p>
                      <p className="text-sm text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border/50 bg-card p-6">
                <h3 className="font-serif text-lg font-semibold mb-3">What happens next?</h3>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3"><span className="text-primary font-semibold shrink-0">1.</span> We review your brief and confirm availability</li>
                  <li className="flex gap-3"><span className="text-primary font-semibold shrink-0">2.</span> We recommend a production package</li>
                  <li className="flex gap-3"><span className="text-primary font-semibold shrink-0">3.</span> You get a clear, itemised quote</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
