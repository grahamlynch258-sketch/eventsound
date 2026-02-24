import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { useSeo } from "@/hooks/useSeo";
import heroFallback from "@/assets/hero-av-production.jpg";

const Reviews = () => {
  useSeo({
    title: "Client Reviews | EventSound Event Production Ireland",
    description: "Read what our clients say about EventSound's event production services. Testimonials from corporate events, conferences, and live shows across Ireland.",
    canonical: "https://eventsound.ie/reviews",
    ogTitle: "Client Reviews | EventSound Ireland",
    ogDescription: "Read what our clients say about EventSound's event production services across Ireland."
  });

  return (
    <PageShell>
      <PageHeader
        title="Client Reviews"
        subtitle="Real feedback from event managers, agencies, and corporate clients who trust EventSound as their production partner across Ireland."
        backgroundImage={heroFallback}
      />
      <TestimonialsSection />
    </PageShell>
  );
};

export default Reviews;