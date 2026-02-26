import { PageShell } from "@/components/site/PageShell";
import { Hero } from "@/components/site/Hero";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { TrustBar } from "@/components/site/TrustBar";
import { CTASection } from "@/components/site/CTASection";
import { useSeo } from "@/hooks/useSeo";

const Index = () => {
  useSeo({
    title: "EventSound | Event Production & AV Hire Dublin & Ireland",
    description: "Professional event production and AV equipment hire across Ireland. LED video walls, sound systems, lighting, and staging for corporate events, conferences, and live shows across Ireland.",
    canonical: "https://eventsound.ie/",
    ogTitle: "EventSound | Professional Event Production & AV Hire Ireland",
    ogDescription: "Professional AV equipment rental and event production services across Ireland. LED walls, sound systems, lighting, and staging for corporate events.",
    ogType: "website"
  });

  return (
    <PageShell>
      <Hero />
      <ServicesGrid />
      <TrustBar />
      <CTASection />
    </PageShell>
  );
};

export default Index;