import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDynamicText } from "@/hooks/useDynamicContent";
import { useSiteImage } from "@/hooks/useSiteImage";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import { TrustBar } from "@/components/site/TrustBar";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { ProcessSection } from "@/components/site/ProcessSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { CTASection } from "@/components/site/CTASection";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import fallbackHeroImage from "@/assets/hero-av-production.jpg";

const Index = () => {
  const hero = useDynamicText("home", "hero");
  const { data: heroImageData } = useSiteImage("home", "hero", "background");
  const heroImage = heroImageData?.image_url || fallbackHeroImage;

  return (
    <PageShell>
      <main>
        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-center">
          <div className="absolute inset-0">
            <HeroSlideshow fallbackImage={fallbackHeroImage} singleImage={heroImage} />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
          </div>

          <div className="container relative py-32 md:py-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                Premium Event Production — Ireland
              </p>
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight ${hero.getAlignClass("headline")}`}
                style={hero.getStyle("headline")}
              >
                {hero.getText("headline", "Production that makes your event unforgettable.")}
              </h1>
              <p
                className={`mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed ${hero.getAlignClass("subheadline")}`}
                style={hero.getStyle("subheadline")}
              >
                {hero.getText("subheadline", "AV, vision, lighting and staging packages for corporate events, conferences and live shows. Delivered, installed and supported by experienced technicians across Ireland.")}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="font-semibold">
                  <Link to="/contact">
                    {hero.getText("cta_primary", "Get a Free Quote")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/av-production">{hero.getText("cta_secondary", "Explore Services")}</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust Bar */}
        <TrustBar />

        {/* Services */}
        <ServicesGrid />

        {/* Process */}
        <ProcessSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA */}
        <CTASection />
      </main>
    </PageShell>
  );
};

export default Index;
