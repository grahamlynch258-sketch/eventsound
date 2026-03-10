import { PageShell } from "@/components/site/PageShell";
import { Hero } from "@/components/site/Hero";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { TrustBar } from "@/components/site/TrustBar";
import { CTASection } from "@/components/site/CTASection";
import { useSeo } from "@/hooks/useSeo";
import { generateAggregateRatingSchema } from "@/lib/schema";

const Index = () => {
  const ratingSchema = generateAggregateRatingSchema({
    ratingValue: 5.0,
    reviewCount: 12
  });

  useSeo({
    title: "Audio Visual Hire Ireland | Event Production & AV Equipment | EventSound",
    description: "Professional AV hire & event production across Ireland. LED walls, PA systems, conference AV, staging & lighting. Based in Drogheda, serving nationwide. Get a free quote.",
    canonical: "https://eventsound.ie/",
    ogTitle: "Audio Visual Hire Ireland | Event Production | EventSound",
    ogDescription: "Professional audio visual hire and event production across Ireland. Sound systems, LED screens, stage lighting, and staging — with full technical crew.",
    ogType: "website",
    additionalSchemas: [
      { schema: ratingSchema, schemaId: "aggregate-rating-schema" }
    ]
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