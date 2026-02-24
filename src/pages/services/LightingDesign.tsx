import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function LightingDesign() {
  useSeo({
    title: "Event Lighting Design & Hire Ireland | EventSound",
    description: "Professional stage lighting, architectural lighting, and custom lighting design for events across Ireland. Intelligent fixtures, moving heads, and experienced lighting designers.",
    canonical: "https://eventsound.ie/services/lighting-design",
  });

  return (
    <PageShell>
      <PageHeader title="Lighting Design & Hire" subtitle="Create atmosphere and impact with professional event lighting" />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground">
            Lighting sets the tone for every event. EventSound provides professional lighting design and hire for corporate events, gala dinners, conferences, concerts, and live shows across Ireland. From subtle architectural washes to dynamic stage lighting, our Chamsys-controlled systems create the perfect atmosphere for your event.
          </p>
          <h2 className="text-2xl font-semibold">Custom Lighting Design</h2>
          <p className="text-muted-foreground">
            Our lighting designers work with you to create a bespoke lighting plan that matches your event's theme, branding, and mood. We use intelligent fixtures including moving heads, LED wash lights, spot fixtures, and followspots to deliver dynamic, programmable looks that evolve throughout your event. Every design is pre-programmed on our Chamsys MagicQ consoles and tested before your event day.
          </p>
          <h2 className="text-2xl font-semibold">Stage & Architectural Lighting</h2>
          <p className="text-muted-foreground">
            Whether you need focused stage lighting for a keynote speaker, colour-washed walls for a gala dinner, or full concert-grade lighting for a live performance, EventSound has the inventory and expertise to deliver. We also provide uplighting, pin spots, gobo projection, and atmospheric effects including haze to enhance beam visibility and create depth.
          </p>
          <h2 className="text-2xl font-semibold">Why EventSound for Lighting?</h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>Chamsys MagicQ lighting control — industry-standard programming</li>
            <li>Intelligent fixtures: moving heads, LED wash, spots, followspots</li>
            <li>Custom lighting design tailored to your venue and theme</li>
            <li>Experienced lighting designers and operators on-site</li>
            <li>Architectural and atmospheric effects available</li>
          </ul>

          <h2 className="text-2xl font-semibold">Related Services</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/services/led-video-walls"><Button variant="outline">LED Video Walls</Button></Link>
            <Link to="/services/staging-pipe-drape"><Button variant="outline">Staging & Drape</Button></Link>
            <Link to="/services/event-production"><Button variant="outline">Event Production</Button></Link>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Need Lighting for Your Event?</h3>
            <p className="text-muted-foreground mb-4">Share your event details and venue — our lighting designers will create a tailored plan and quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
