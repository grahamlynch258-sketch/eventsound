import { useSearchParams } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { ContactForm } from "@/components/site/ContactForm";
import HowWeWork from "@/components/site/HowWeWork";
import { useSeo } from "@/hooks/useSeo";
import { siteConfig } from "@/config/site";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get("service");

  useSeo({
    title: "Contact EventSound | Get a Quote for AV Hire Ireland",
    description: "Contact EventSound for AV hire & event production in Ireland. Request a free quote for LED walls, PA systems, conference AV, lighting & staging. Response within 24 hours.",
    canonical: "https://eventsound.ie/contact",
    ogTitle: "Contact EventSound | Get a Quote for AV Hire Ireland",
    ogDescription: "Contact EventSound for a free consultation and quote. Professional AV hire, sound, lighting, LED screens, and staging across Ireland."
  });

  return (
    <PageShell>
      <section className="container mx-auto px-4 pb-8 pt-12 text-center md:pt-16">
        <p className="section-kicker mb-3">Get In Touch</p>
        <div className="gold-rule mb-5" />
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Tell us about your event</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Give us the event basics. We’ll recommend a practical production package for your venue, audience and budget—usually within 24 hours.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-20">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.45fr]">
          <aside className="order-2 rounded-xl border border-accent/25 bg-card/50 p-6 md:p-8 lg:order-1">
            <h2 className="text-2xl font-semibold">What happens next?</h2>
            <ol className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li><strong className="text-foreground">1. We review the brief.</strong> You don’t need to specify equipment.</li>
              <li><strong className="text-foreground">2. Graham confirms the scope.</strong> A short call or site check may be recommended.</li>
              <li><strong className="text-foreground">3. You receive a clear package.</strong> Equipment, crew, delivery and operation are set out together.</li>
            </ol>
            <div className="mt-7 space-y-3 border-t border-border/60 pt-6 text-sm">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 hover:text-accent"><Phone className="h-4 w-4 text-accent" /> {siteConfig.phoneDisplay}</a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 hover:text-accent"><Mail className="h-4 w-4 text-accent" /> {siteConfig.email}</a>
              <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-accent" /> {siteConfig.primaryLocation}; nationwide service</p>
            </div>
          </aside>

          <div className="order-1 rounded-xl border border-accent/30 bg-card/40 p-5 shadow-lg md:p-8 lg:order-2">
            <h2 className="text-2xl font-semibold">Request a tailored quote</h2>
            <p className="mb-6 mt-2 text-sm text-muted-foreground">Fields marked * are required. If your date is not confirmed yet, you can tell us that.</p>
            <ContactForm
              defaultServices={requestedService ? [requestedService] : []}
              formContext={requestedService || "General enquiry"}
            />
          </div>
        </div>
      </section>

      <HowWeWork />
    </PageShell>
  );
};

export default Contact;
