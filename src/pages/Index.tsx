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
import { siteConfig } from "@/config/site";
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
        <section className="relative min-h-[90vh] flex items-center">
          <div className="absolute inset-0">
            <HeroSlideshow fallbackImage={fallbackHeroImage} singleImage={heroImage} />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
          </div>

          <div className="container relative py-32 md:py-44">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <p className="section-kicker mb-4">
                {siteConfig.tagline} — {siteConfig.primaryLocation}
              </p>
              <div className="gold-rule mb-6" />
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.1] ${hero.getAlignClass("headline")}`}
                style={hero.getStyle("headline")}
              >
                {hero.getText("headline", "Looking for an experienced event production partner?")}
              </h1>
              <p
                className={`mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed ${hero.getAlignClass("subheadline")}`}
                style={hero.getStyle("subheadline")}
              >
                {hero.getText("subheadline", "For over two decades, Event Sound has delivered LED walls, staging, lighting and audio for corporate events, conferences and live shows across Ireland. Expert crew, premium gear, flawless execution.")}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="font-semibold shadow-gold text-base px-8">
                  <Link to="/contact">
                    {hero.getText("cta_primary", "Get a Free Quote")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base px-8">
                  <Link to="/services">{hero.getText("cta_secondary", "Explore Services")}</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <TrustBar />
        <ServicesGrid />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </PageShell>
  );
};

export default Index;
