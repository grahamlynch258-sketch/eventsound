import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";
import heroFallback from "@/assets/category-staging.jpg";
import { BrandSidebar } from "@/components/site/BrandSidebar";

export default function StagingPipeDrape() {
  useSeo({
    title: "Event Staging & Pipe and Drape Hire Ireland | EventSound",
    description: "Professional event staging, pipe and drape, star cloth, and scenic elements for corporate events, conferences, and live shows across Ireland. TUV-certified, safety-first.",
    canonical: "https://eventsound.ie/services/staging-pipe-drape",
  });

  const { hero, gallery } = useServiceImages("service-staging");

  return (
    <PageShell>
      <PageHeader
        title="Staging, Pipe & Drape"
        subtitle="Safe, professional staging and scenic solutions for any venue"
        backgroundImage={hero || heroFallback}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 max-w-3xl space-y-6 text-center">
          <p className="text-lg text-muted-foreground">
            EventSound provides professional staging, pipe and drape, star cloth, and scenic elements for corporate events, conferences, awards ceremonies, and live shows across Ireland. All our staging is TUV-certified and European-manufactured, installed by trained crew with safety as the primary consideration.
          </p>
          <h2 className="text-2xl font-semibold">Modular Stage Solutions</h2>
          <p className="text-muted-foreground">
            Our modular staging systems are versatile, safe, and camera-ready. We supply platforms, risers, catwalks, presenter stages, and full stage builds in custom configurations to suit any venue — indoors or outdoors. All staging is levelled, skirted, and finished to a professional standard. We design layouts that optimise sightlines, access, and safety for your audience and performers.
          </p>
          <h2 className="text-2xl font-semibold">Pipe & Drape, Star Cloth & Scenic</h2>
          <p className="text-muted-foreground">
            Transform your venue with pipe and drape systems, star cloth backdrops, and custom scenic elements. Whether you need to divide a space, create a branded backdrop, mask backstage areas, or add atmosphere to a gala dinner, our draping solutions are clean, professional, and available in a range of colours and fabrics. Star cloth adds a dramatic effect for awards nights and evening events.
          </p>
          <h2 className="text-2xl font-semibold">Why EventSound for Staging & Drape?</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>TUV-certified staging — European-manufactured, safety-first</li>
            <li>Modular platforms and risers for any configuration</li>
            <li>Pipe and drape in multiple colours and fabrics</li>
            <li>Star cloth and scenic backdrops for atmosphere</li>
            <li>Installed by trained crew with full risk assessment</li>
          </ul>
          </div>

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our Staging Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <img key={img.id} src={img.image_url} alt={img.alt_text || "Event staging and drape installation"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" />
                ))}
              </div>
            </div>
          )}

          <h2 className="text-2xl font-semibold">Related Services</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/services/lighting-design"><Button variant="outline">Lighting Design</Button></Link>
            <Link to="/services/event-production"><Button variant="outline">Event Production</Button></Link>
            <Link to="/services/led-video-walls"><Button variant="outline">LED Video Walls</Button></Link>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Need Staging or Draping?</h3>
            <p className="text-muted-foreground mb-4">Tell us your venue and event requirements — we'll design a staging solution and quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
        <aside className="lg:w-64 flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            <BrandSidebar serviceKey="staging-pipe-drape" />
          </div>
        </aside>
      </div>
      </div>
    </PageShell>
  );
}
