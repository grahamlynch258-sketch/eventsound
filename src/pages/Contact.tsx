import { PageShell } from "@/components/site/PageShell";
import { ContactForm } from "@/components/site/ContactForm";
import HowWeWork from "@/components/site/HowWeWork";
import { useSeo } from "@/hooks/useSeo";

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
          <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default Contact;
