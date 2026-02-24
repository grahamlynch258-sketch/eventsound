import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";
import heroFallback from "@/assets/hero-av-production.jpg";
import { BrandSidebar } from "@/components/site/BrandSidebar";

export default function AVProduction() {
  useSeo({
    title: "AV Production & Conference AV Supplier Ireland | EventSound",
    description: "Professional AV production and conference AV solutions across Ireland. L-Acoustics sound, LED video walls, lighting, and full technical crew for corporate events and conferences.",
    canonical: "https://eventsound.ie/services/av-production",
  });

  const { hero, gallery } = useServiceImages("service-av-production");

  return (
    <PageShell>
      <PageHeader
        title="AV Production & Conference AV"
        subtitle="Complete audiovisual solutions for corporate events and conferences"
        backgroundImage={hero || heroFallback}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 max-w-3xl space-y-6 text-center">
          <p className="text-lg text-muted-foreground">
            EventSound is a trusted AV production partner for corporate clients, agencies, and venues across Ireland. We provide complete audiovisual solutions for conferences, seminars, AGMs, product launches, and corporate events — combining professional sound, LED video walls, lighting, and experienced technical crew into a single, reliable production package.
          </p>
          <h2 className="text-2xl font-semibold">Conference AV Solutions</h2>
          <p className="text-muted-foreground">
            Conferences demand flawless AV. EventSound delivers integrated audiovisual setups tailored to your conference format — whether it's a single-room keynote, a multi-room breakout programme, or a large-scale plenary session. We provide PA systems with wireless microphones for speakers and panel discussions, LED screens or projection for presentations, stage lighting, and confidence monitors. Every system is tuned to your venue and tested before your delegates arrive.
          </p>
          <h2 className="text-2xl font-semibold">Full-Service AV Production</h2>
          <p className="text-muted-foreground">
            As your AV production partner, EventSound manages every technical element so you can focus on your event content and guests. Our service covers site surveys, technical planning, equipment delivery, installation, on-site operation throughout your event, and complete breakdown. We assign a dedicated production manager to your event who coordinates all AV elements and acts as your single point of contact for everything technical.
          </p>
          <h2 className="text-2xl font-semibold">Industry-Leading Equipment</h2>
          <p className="text-muted-foreground">
            We use L-Acoustics speaker systems for crystal-clear audio, Unilumin LED panels for high-resolution visuals, and Chamsys MagicQ for intelligent lighting control. Our inventory covers events of every scale — from a 30-person boardroom to a 3,000-seat conference venue. All equipment is maintained, PAT-tested, and backed by spares on-site.
          </p>
          <h2 className="text-2xl font-semibold">Why EventSound for AV Production?</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>Over 30 years of AV production experience across Ireland</li>
            <li>L-Acoustics, Unilumin, Chamsys — industry-leading brands</li>
            <li>Dedicated production manager as your single point of contact</li>
            <li>Conference-specialist: multi-room, breakout, plenary formats</li>
            <li>Full crew: sound engineers, lighting operators, video technicians</li>
            <li>Serving Dublin, Leinster, and nationwide</li>
          </ul>
          </div>

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our AV Production Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <img key={img.id} src={img.image_url} alt={img.alt_text || "AV production setup at corporate event"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" />
                ))}
              </div>
            </div>
          )}

          <h2 className="text-2xl font-semibold">Related Services</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/services/led-video-walls"><Button variant="outline">LED Video Walls</Button></Link>
            <Link to="/services/event-production"><Button variant="outline">Event Production</Button></Link>
            <Link to="/services/virtual-events"><Button variant="outline">Virtual Events</Button></Link>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Need AV for Your Event?</h3>
            <p className="text-muted-foreground mb-4">Tell us your venue, audience size, and event format — we'll design a complete AV solution and quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
        <aside className="lg:w-64 flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            <BrandSidebar serviceKey="av-production" />
          </div>
        </aside>
      </div>
      </div>
    </PageShell>
  );
}
