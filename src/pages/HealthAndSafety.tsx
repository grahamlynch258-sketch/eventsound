import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";

const HealthAndSafety = () => {
  useSeo({
    title: "Health & Safety | EventSound Event Production Ireland",
    description: "EventSound's commitment to health and safety. TUV-certified staging, European-manufactured rigging, and trained personnel for safe event production.",
    canonical: "https://eventsound.ie/health-and-safety",
    ogTitle: "Health & Safety | EventSound Ireland",
    ogDescription: "Our commitment to health and safety in event production. TUV-certified staging and trained personnel."
  });

  return (
    <PageShell>
      <PageHeader
        title="Health & Safety"
        subtitle="Our commitment to safe event production"
      />
      <div className="container mx-auto px-4 py-12">
        {/* Existing Health & Safety content */}
      </div>
    </PageShell>
  );
};

export default HealthAndSafety;