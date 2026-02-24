import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";
import heroFallback from "@/assets/hero-av-production.jpg";
import { BrandSidebar } from "@/components/site/BrandSidebar";

export default function EventProduction() {
  useSeo({
    title: "Event Production Management Ireland | EventSound",
    description: "End-to-end event production management across Ireland. Technical direction, crew coordination, show calling, and on-site production support for corporate events and live shows.",
    canonical: "https://eventsound.ie/services/event-production",
  });

  const { hero, gallery } = useServiceImages("service-event-production");

  return (
    <PageShell>
      <PageHeader
        title="Event Production Management"
        subtitle="Your dedicated production partner from planning to wrap"
        backgroundImage={hero || heroFallback}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 max-w-3xl space-y-6 text-center">
          <p className="text-lg text-muted-foreground">
            EventSound provides end-to-end event production management for corporate events, conferences, product launches, awards ceremonies, and live shows across Ireland. As your dedicated production partner, we handle the technical planning, crew coordination, and on-site execution — so you can focus on your event content and guests.
          </p>
          <h2 className="text-2xl font-semibold">From Brief to Breakdown</h2>
          <p className="text-muted-foreground">
            Our production management service covers every stage of your event. We start with a detailed technical brief, conduct site visits where needed, and develop a production schedule that covers load-in, rehearsals, show time, and breakdown. Our production managers coordinate all technical elements — sound, lighting, video, staging — into a single cohesive plan, working alongside your event manager or agency to deliver a seamless experience.
          </p>
          <h2 className="text-2xl font-semibold">Technical Direction & Show Calling</h2>
          <p className="text-muted-foreground">
            For events that require precise timing and coordination — award shows, product reveals, multi-speaker conferences — we provide technical direction and show calling. Our technical directors manage cue-to-cue execution, ensuring every lighting change, video roll, and audio transition happens exactly on time. We work from detailed run sheets and maintain clear communication with all crew positions throughout your event.
          </p>
          <h2 className="text-2xl font-semibold">Why EventSound for Production?</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>Over 30 years of event production experience</li>
            <li>Single point of contact for all technical elements</li>
            <li>Technical direction and show calling for complex events</li>
            <li>Works alongside event managers, agencies, and venues</li>
            <li>Complete crew coordination from load-in to breakdown</li>
          </ul>
          </div>

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our Production Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <img key={img.id} src={img.image_url} alt={img.alt_text || "Event production crew at work"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" />
                ))}
              </div>
            </div>
          )}

          <h2 className="text-2xl font-semibold">Related Services</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/services/av-production"><Button variant="outline">AV Production</Button></Link>
            <Link to="/services/led-video-walls"><Button variant="outline">LED Video Walls</Button></Link>
            <Link to="/services/lighting-design"><Button variant="outline">Lighting Design</Button></Link>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Need a Production Partner?</h3>
            <p className="text-muted-foreground mb-4">Tell us about your event — we'll come back with a production plan and transparent quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
        <aside className="lg:w-64 flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            <BrandSidebar serviceKey="event-production" />
          </div>
        </aside>
      </div>
      </div>
    </PageShell>
  );
}
