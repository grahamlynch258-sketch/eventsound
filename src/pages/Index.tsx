import { PageShell } from "@/components/site/PageShell";
import { Hero } from "@/components/site/Hero";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { TrustBar } from "@/components/site/TrustBar";
import { CTASection } from "@/components/site/CTASection";
import { useSeo } from "@/hooks/useSeo";

const Index = () => {
  useSeo({
    title: "EventSound | AV Hire & Event Production Ireland",
    description: "Professional AV hire and event production across Ireland. Sound systems, LED video walls, conference AV, staging and lighting with an experienced technical crew.",
    canonical: "https://eventsound.ie/",
    ogTitle: "EventSound | AV Hire & Event Production Ireland",
    ogDescription: "Professional audio visual hire and event production across Ireland. Sound systems, LED screens, stage lighting, and staging — with full technical crew.",
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
