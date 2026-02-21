import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { ServiceCard } from "@/components/site/ServiceCard";
import { useSeo } from "@/hooks/useSeo";

const Services = () => {
  useSeo({
    title: "Event Production Services | LED Walls, Sound & Lighting | EventSound",
    description: "Complete event production services in Ireland. LED video walls, professional sound systems, stage lighting, and event staging for corporate events, conferences, and live productions.",
    canonical: "https://eventsound.ie/services",
    ogTitle: "Event Production Services | EventSound Ireland",
    ogDescription: "Complete event production services in Ireland. LED video walls, professional sound systems, stage lighting, and event staging."
  });

  return (
    <PageShell>
      <PageHeader
        title="Our Services"
        subtitle="Professional event production and AV equipment hire for corporate events, conferences, and live shows across Ireland"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="LED Video Walls"
            description="High-resolution LED video walls for conferences, product launches, and corporate events. Custom sizing and configurations available."
            icon="monitor"
          />
          <ServiceCard
            title="Sound Systems"
            description="Professional PA systems, wireless microphones, and audio mixing for events of all sizes. Crystal clear sound guaranteed."
            icon="volume-2"
          />
          <ServiceCard
            title="Lighting Design"
            description="Stage lighting, architectural lighting, and custom lighting design for concerts, galas, and corporate events."
            icon="lightbulb"
          />
          <ServiceCard
            title="Event Staging"
            description="Professional staging solutions including platforms, risers, and complete stage builds for any venue."
            icon="layout"
          />
          <ServiceCard
            title="Event Production"
            description="Complete event production management from planning to execution. Technical direction and on-site support."
            icon="users"
          />
          <ServiceCard
            title="Technical Support"
            description="Experienced crew and technical operators for seamless event delivery. Setup, operation, and breakdown included."
            icon="settings"
          />
        </div>
      </div>
    </PageShell>
  );
};

export default Services;