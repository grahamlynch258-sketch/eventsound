import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";
import heroFallback from "@/assets/category-vision.jpg";

export default function LEDVideoWalls() {
  useSeo({
    title: "LED Video Wall Hire Ireland | EventSound",
    description: "Professional LED video wall hire for corporate events, conferences, and live shows across Ireland. Custom sizes, content playback, and on-site operation included.",
    canonical: "https://eventsound.ie/services/led-video-walls",
  });

  const { hero, gallery } = useServiceImages("service-led-walls");

  return (
    <PageShell>
      <PageHeader
        title="LED Video Wall Hire"
        subtitle="High-impact visual displays for events of every scale"
        backgroundImage={hero || heroFallback}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground">
            EventSound provides professional LED video wall hire for corporate events, conferences, product launches, awards ceremonies, and live shows across Ireland. Our Unilumin LED panels deliver stunning high-resolution visuals that transform any venue — from intimate boardrooms to large-scale arenas.
          </p>
          <h2 className="text-2xl font-semibold">Custom Configurations for Every Venue</h2>
          <p className="text-muted-foreground">
            Every event space is different, which is why we offer fully customisable LED wall sizes and configurations. Whether you need a single screen behind a keynote speaker, a wide-format display for a gala dinner, or a multi-screen setup for a conference breakout area, we design the layout to suit your venue and content. Our team handles pixel mapping, content scaling, and signal management so your visuals look perfect from every seat in the house.
          </p>
          <h2 className="text-2xl font-semibold">Full-Service LED Wall Solutions</h2>
          <p className="text-muted-foreground">
            When you hire LED walls from EventSound, you get more than just panels. Our service includes delivery, installation, content playback management, on-site technical operation, and breakdown. We work with your creative team or agency to ensure presentations, videos, and live feeds display exactly as intended. Our experienced operators are on hand throughout your event to manage transitions, troubleshoot, and keep everything running seamlessly.
          </p>
          <h2 className="text-2xl font-semibold">Why EventSound for LED Video Walls?</h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>Unilumin LED panels — industry-leading resolution and reliability</li>
            <li>Custom sizing from 2m² to 50m² and beyond</li>
            <li>Full content playback and signal management included</li>
            <li>Experienced operators on-site for your entire event</li>
            <li>Serving Dublin, Leinster, and nationwide across Ireland</li>
          </ul>

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our LED Walls in Action</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <img key={img.id} src={img.image_url} alt={img.alt_text || "LED video wall at event"} className="rounded-lg w-full h-64 object-cover" />
                ))}
              </div>
            </div>
          )}

          <h2 className="text-2xl font-semibold">Related Services</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/services/lighting-design"><Button variant="outline">Lighting Design</Button></Link>
            <Link to="/services/video-production"><Button variant="outline">Video Production</Button></Link>
            <Link to="/services/event-production"><Button variant="outline">Event Production</Button></Link>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Need LED Walls for Your Event?</h3>
            <p className="text-muted-foreground mb-4">Tell us your venue, date, and requirements — we'll respond with a tailored quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
