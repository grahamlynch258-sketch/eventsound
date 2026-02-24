import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { ContactForm } from "@/components/site/ContactForm";
import { useSeo } from "@/hooks/useSeo";

const Contact = () => {
  useSeo({
    title: "Contact EventSound | Event Production Quote Ireland",
    description: "Get a quote for your event production needs. Professional AV equipment rental and technical support across Ireland. Contact us today for LED walls, sound, and lighting.",
    canonical: "https://eventsound.ie/contact",
    ogTitle: "Contact EventSound | Get a Quote",
    ogDescription: "Get a quote for your event production needs. Professional AV equipment rental and technical support across Ireland."
  });

  return (
    <PageShell>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch for a quote on your next event"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </PageShell>
  );
};

export default Contact;