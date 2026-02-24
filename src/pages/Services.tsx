import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { usePageHero } from "@/hooks/usePageHero";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Volume2, Lightbulb, Theater, Clapperboard, Video, Wifi } from "lucide-react";
import heroFallback from "@/assets/hero-av-production.jpg";

const services = [
  { title: "LED Video Walls", description: "High-resolution LED displays for conferences, launches, and corporate events. Custom sizes and on-site operation.", href: "/services/led-video-walls", icon: Monitor },
  { title: "AV Production", description: "Complete audiovisual solutions for conferences and corporate events. L-Acoustics sound, LED walls, lighting, and crew.", href: "/services/av-production", icon: Volume2 },
  { title: "Lighting Design", description: "Intelligent stage lighting, architectural washes, and custom designs using Chamsys MagicQ control.", href: "/services/lighting-design", icon: Lightbulb },
  { title: "Staging & Pipe & Drape", description: "TUV-certified modular staging, pipe and drape, star cloth, and scenic elements for any venue.", href: "/services/staging-pipe-drape", icon: Theater },
  { title: "Event Production", description: "End-to-end production management, technical direction, and crew coordination from planning to wrap.", href: "/services/event-production", icon: Clapperboard },
  { title: "Video Production", description: "Multi-camera capture, live streaming, and post-production for corporate events and live shows.", href: "/services/video-production", icon: Video },
  { title: "Virtual & Hybrid Events", description: "Professional production for online and hybrid audiences with studio setups and live streaming.", href: "/services/virtual-events", icon: Wifi },
];

export default function Services() {
  const heroImage = usePageHero("hero-services", heroFallback);
  useSeo({
    title: "Event Production Services | AV Hire Ireland | EventSound",
    description: "Complete event production services across Ireland. LED video walls, sound systems, lighting design, staging, video production, and virtual event solutions. Professional AV equipment hire with experienced crew.",
    canonical: "https://eventsound.ie/services",
  });

  return (
    <PageShell>
      <PageHeader title="Our Services" subtitle="" backgroundImage={heroImage} backgroundAlt="Professional AV production setup at a corporate event in Ireland" />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="rounded-xl border border-primary/30 bg-card/40 backdrop-blur-sm p-6 md:p-8">
            <p className="text-muted-foreground leading-relaxed">
              EventSound is your complete event production partner — from initial brief to final breakdown. We supply, install, and operate professional AV equipment for corporate events, conferences, awards nights, gala dinners, festivals, and live shows across Ireland.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.href} to={service.href} className="group">
              <Card className="h-full transition-colors hover:border-primary/50">
                <CardContent className="p-6 space-y-3">
                  <service.icon className="h-8 w-8 text-primary" />
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">{service.title}</h2>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Need a Custom Package?</h2>
          <div className="rounded-xl border border-primary/30 bg-card/40 backdrop-blur-sm p-6 md:p-8 mb-6">
            <p className="text-muted-foreground leading-relaxed">
              Most events need a combination of services. Tell us about your event and we'll put together a tailored production package with transparent pricing — no hidden fees.
            </p>
          </div>
          <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
        </div>
      </div>
    </PageShell>
  );
}
