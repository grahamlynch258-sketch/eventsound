import { PageShell } from "@/components/site/PageShell";
import { Hero } from "@/components/site/Hero";
import { ServicesSection } from "@/components/site/ServicesSection";
import { TrustedBySection } from "@/components/site/TrustedBySection";
import { CallToAction } from "@/components/site/CallToAction";
import { useSeo } from "@/hooks/useSeo";

const Index = () => {
  useSeo({
    title: "EventSound | Professional Event Production & AV Hire Ireland",
    description: "Professional event production and AV equipment hire across Ireland. LED video walls, sound systems, lighting, and staging for corporate events, conferences, and live shows in Dublin, Leinster, and nationwide.",
    canonical: "https://eventsound.ie/",
    ogTitle: "EventSound | Professional Event Production & AV Hire Ireland",
    ogDescription: "Professional AV equipment rental and event production services across Ireland. LED walls, sound systems, lighting, and staging for corporate events.",
    ogType: "website"
  });

  return (
    <PageShell>
      <Hero />
      <ServicesSection />
      <TrustedBySection />
      <CallToAction />
    </PageShell>
  );
};

export default Index;