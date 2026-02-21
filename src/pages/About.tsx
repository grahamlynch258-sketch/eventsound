import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";

const About = () => {
  useSeo({
    title: "About EventSound | Professional Event Production Ireland",
    description: "Learn about EventSound, Ireland's trusted event production partner. Experienced team providing LED walls, sound systems, lighting, and staging for events nationwide.",
    canonical: "https://eventsound.ie/about",
    ogTitle: "About EventSound | Event Production Ireland",
    ogDescription: "Learn about EventSound, Ireland's trusted event production partner. Experienced team providing LED walls, sound systems, lighting, and staging."
  });

  return (
    <PageShell>
      <PageHeader
        title="About EventSound"
        subtitle="Your trusted partner for professional event production across Ireland"
      />
      <div className="container mx-auto px-4 py-12">
        {/* Existing About page content */}
      </div>
    </PageShell>
  );
};

export default About;