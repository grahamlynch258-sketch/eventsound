import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

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
  name: "",
  email: "",
  phone: "",
  company: "",
  event_date: "",
  venue: "",
  message: "",
  honeypot: "",
};

export function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitting(true);
    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm(EMPTY);
      } else {
        const data = await res.json().catch(() => ({}));
        toast({
          title: "Error sending message",
          description: data.error || "Please try again or email us directly.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network error",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-border/50 bg-card p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">Message sent!</h3>
        <p className="text-muted-foreground">
          Thanks for getting in touch. We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={set("honeypot")}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={form.name}
            onChange={set("name")}
            required
            placeholder="Your name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={set("email")}
            required
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="+353..."
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={form.company}
            onChange={set("company")}
            placeholder="Your company"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="event_date">Event Date</Label>
          <Input
            id="event_date"
            type="date"
            value={form.event_date}
            onChange={set("event_date")}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="venue">Venue</Label>
          <Input
            id="venue"
            value={form.venue}
            onChange={set("venue")}
            placeholder="Event venue or location"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          value={form.message}
          onChange={set("message")}
          required
          rows={5}
          placeholder="Tell us about your event..."
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
