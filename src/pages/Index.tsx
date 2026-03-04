import { PageShell } from "@/components/site/PageShell";
import { Hero } from "@/components/site/Hero";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { TrustBar } from "@/components/site/TrustBar";
import { CTASection } from "@/components/site/CTASection";
import { useSeo } from "@/hooks/useSeo";

const Index = () => {
  useSeo({
    title: "Audio Visual Hire Ireland | Event Production & AV Equipment | EventSound",
    description: "Professional audio visual hire and event production across Ireland. Sound systems, LED screens, stage lighting, and staging — with full technical crew. 20+ years experience.",
    canonical: "https://eventsound.ie/",
    ogTitle: "Audio Visual Hire Ireland | Event Production | EventSound",
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