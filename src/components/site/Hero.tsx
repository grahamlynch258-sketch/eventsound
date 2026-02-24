import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroSlideshow } from "./HeroSlideshow";
import heroFallback from "@/assets/hero-av-production.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <HeroSlideshow fallbackImage={heroFallback} />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <div className="container relative z-10 py-24 md:py-32">
        <p className="section-kicker mb-4">Professional Event Production — Ireland</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl leading-tight">
          AV Hire &amp; Event Production Across Ireland
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          From corporate conferences and product launches to festivals and gala dinners, EventSound is your trusted event production partner across Ireland. Our services include LED video wall hire, professional sound system rental, intelligent stage lighting, custom staging, and live streaming — all installed and operated by our experienced technical crew. Based in Dublin and serving Leinster and nationwide, we work alongside event managers, agencies, and venues as a reliable production partner, handling events of every scale with proven equipment and transparent pricing.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link to="/contact">
              Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/services">Our Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
