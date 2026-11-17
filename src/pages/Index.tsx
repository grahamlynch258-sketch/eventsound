import { PageShell } from "@/components/site/PageShell";
import { Hero } from "@/components/site/Hero";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { TrustBar } from "@/components/site/TrustBar";
import { CTASection } from "@/components/site/CTASection";
import { HomeCoverage, HomeEventTypes, HomeFaq, HomeIntro, HomeProcess, HomeProof } from "@/components/site/HomeSections";
import { homeFaqs } from "@/content/home";
import { generateFAQSchema } from "@/lib/schema";
import { useSeo } from "@/hooks/useSeo";

// Built once: useSeo re-runs whenever this array's identity changes.
const HOME_SCHEMAS = [{ schema: generateFAQSchema({ questions: homeFaqs }), schemaId: "faq-schema" }];

const Index = () => {
  useSeo({
    title: "EventSound | AV Hire & Event Production Ireland",
    description: "Professional AV hire and event production across Ireland. Sound systems, LED video walls, conference AV, staging and lighting with an experienced technical crew.",
    canonical: "https://eventsound.ie/",
    ogTitle: "EventSound | AV Hire & Event Production Ireland",
    ogDescription: "Professional audio visual hire and event production across Ireland. Sound systems, LED screens, stage lighting, and staging — with full technical crew.",
    ogType: "website",
    additionalSchemas: HOME_SCHEMAS,
  });

  return (
    <PageShell>
      <Hero />
      <ServicesGrid />
      <HomeIntro />
      <HomeEventTypes />
      <TrustBar />
      <HomeProof />
      <HomeCoverage />
      <HomeProcess />
      <HomeFaq />
      <CTASection />
    </PageShell>
  );
};

export default Index;
