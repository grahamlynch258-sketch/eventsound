import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";
import heroFallback from "@/assets/category-video-recording.jpg";

export default function VirtualEvents() {
  useSeo({
    title: "Virtual & Hybrid Event Production Ireland | EventSound",
    description: "Professional virtual and hybrid event production across Ireland. Studio setups, live streaming, audience interaction tools, and full technical management for online events.",
    canonical: "https://eventsound.ie/services/virtual-events",
  });

  const { hero, gallery } = useServiceImages("service-virtual");

  return (
    <PageShell>
      <PageHeader
        title="Virtual & Hybrid Events"
        subtitle="Professional production for online and hybrid audiences"
        backgroundImage={hero || heroFallback}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground">
            EventSound delivers professional virtual and hybrid event production for corporate clients, agencies, and organisations across Ireland. Whether your event is fully online, has a live audience with remote viewers, or combines multiple locations, we provide the technical infrastructure and production expertise to make it seamless.
          </p>
          <h2 className="text-2xl font-semibold">Hybrid Event Solutions</h2>
          <p className="text-muted-foreground">
            Hybrid events combine a live in-person experience with a professional broadcast for remote attendees. EventSound manages both sides — delivering full AV production for the venue while simultaneously streaming to online platforms with broadcast-quality video, graphics, and audience interaction tools. We ensure remote viewers get the same polished experience as those in the room.
          </p>
          <h2 className="text-2xl font-semibold">Virtual Event Studio Setups</h2>
          <p className="text-muted-foreground">
            For fully virtual events, we can transform any venue or meeting room into a professional broadcast studio. This includes multi-camera setups, branded backdrops, professional lighting, teleprompter, and dedicated internet connectivity. We manage the entire technical production so your presenters can focus on delivering their content with confidence.
          </p>
          <h2 className="text-2xl font-semibold">Why EventSound for Virtual Events?</h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>End-to-end hybrid and virtual event production</li>
            <li>Professional studio setups in any venue</li>
            <li>Live streaming with branded graphics and overlays</li>
            <li>Audience interaction: Q&A, polls, chat moderation</li>
            <li>Dedicated technical team managing the entire broadcast</li>
          </ul>

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our Virtual Event Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <img key={img.id} src={img.image_url} alt={img.alt_text || "Virtual event production studio setup"} className="rounded-lg w-full h-64 object-cover" />
                ))}
              </div>
            </div>
          )}

          <h2 className="text-2xl font-semibold">Related Services</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/services/video-production"><Button variant="outline">Video Production</Button></Link>
            <Link to="/services/led-video-walls"><Button variant="outline">LED Video Walls</Button></Link>
            <Link to="/services/av-production"><Button variant="outline">AV Production</Button></Link>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Planning a Virtual or Hybrid Event?</h3>
            <p className="text-muted-foreground mb-4">Tell us your event format and audience — we'll design a production plan and quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
