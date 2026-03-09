import { PageShell } from "@/components/site/PageShell";
import { ContactForm } from "@/components/site/ContactForm";
import HowWeWork from "@/components/site/HowWeWork";
import { useSeo } from "@/hooks/useSeo";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MapPin, Mail, Phone } from "lucide-react";

const Contact = () => {
  useSeo({
    title: "Contact EventSound | Get a Quote for AV Hire Ireland",
    description: "Contact EventSound for a free consultation and quote. Professional AV hire, sound, lighting, LED screens, and staging across Ireland. Fast response guaranteed.",
    canonical: "https://eventsound.ie/contact",
    ogTitle: "Contact EventSound | Get a Quote for AV Hire Ireland",
    ogDescription: "Contact EventSound for a free consultation and quote. Professional AV hire, sound, lighting, LED screens, and staging across Ireland."
  });

  return (
    <PageShell>
      <HowWeWork />
      {/* Contact Info Cards */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-8 text-center transition-transform duration-300 hover:scale-[1.03] hover:border-accent/50">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
              <MapPin className="h-7 w-7 text-teal-700" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Location</h3>
            <p className="text-sm text-muted-foreground">Nationwide, Ireland</p>
          </div>
          <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-8 text-center transition-transform duration-300 hover:scale-[1.03] hover:border-accent/50">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
              <Mail className="h-7 w-7 text-teal-700" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Email Us</h3>
            <a href="mailto:info@eventsound.ie" className="text-sm text-muted-foreground hover:text-accent transition-colors">info@eventsound.ie</a>
          </div>
          <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-8 text-center transition-transform duration-300 hover:scale-[1.03] hover:border-accent/50">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
              <Phone className="h-7 w-7 text-teal-700" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Call Now</h3>
            <p className="text-sm text-muted-foreground">Graham: <a href="tel:+353863520476" className="hover:text-accent transition-colors">+353 86 352 0476</a></p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="section-kicker mb-3">Get In Touch</p>
            <div className="gold-rule mb-5" />
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Contact Us
            </h1>
            <div className="mt-6 rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-6 md:p-8">
              <p className="text-muted-foreground leading-relaxed">
                Tell us about your event and we'll put together a tailored production package. Whether you need a full AV setup or a single LED wall, we're here to help.
              </p>
            </div>
          </div>
          <ScrollReveal delay={0.2}>
          <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-6 md:p-8">
            <ContactForm />
          </div>
          </ScrollReveal>
        </div>
      </div>
    </PageShell>
  );
};

export default Contact;
