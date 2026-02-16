import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import { TrustBar } from "@/components/site/TrustBar";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { ProcessSection } from "@/components/site/ProcessSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { CTASection } from "@/components/site/CTASection";
import { siteConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import {
  mapHeroContent,
  mapFeaturesContent,
  mapCta2Content,
  type HomeHeroContent,
  type HomeFeaturesContent,
  type HomeCta2Content,
} from "@/lib/content/homeContentMapper";

import fallbackHeroImage from "@/assets/hero-av-production.jpg";

// Static fallback content
const FALLBACK_HERO: HomeHeroContent = {
  tagline: siteConfig.tagline,
  headline: "Production by Professionals",
  subheadline: "From Concept to Delivery, Our Team supports you to help Delivery your Event flawlessly",
  cta_primary: "Get a Free Quote",
  cta_secondary: "Explore Services",
};

const FALLBACK_FEATURES: HomeFeaturesContent = {
  // Add feature fallbacks if needed
};

const FALLBACK_CTA2: HomeCta2Content = {
  // Add CTA2 fallbacks if needed
};

const Index = () => {
  // Fetch CMS content for each section
  const { data: heroData } = useSiteContent("home", "hero");
  const { data: featuresData } = useSiteContent("home", "features");
  const { data: cta2Data } = useSiteContent("home", "cta2");

  // Map CMS data to typed content with fallbacks
  const heroContent = mapHeroContent(heroData, FALLBACK_HERO);
  const featuresContent = mapFeaturesContent(featuresData, FALLBACK_FEATURES);
  const cta2Content = mapCta2Content(cta2Data, FALLBACK_CTA2);

  return (
    <PageShell>
      <main>
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center">
          <div className="absolute inset-0">
            <HeroSlideshow fallbackImage={fallbackHeroImage} singleImage={fallbackHeroImage} />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
          </div>

          <div className="container relative py-32 md:py-44">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">{heroContent.tagline}</p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.1]">
                {heroContent.headline}
              </h1>

              <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                {heroContent.subheadline}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="font-semibold shadow-gold text-base px-8">
                  <Link to="/contact">
                    {heroContent.cta_primary}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base px-8">
                  <Link to="/services">{heroContent.cta_secondary}</Link>
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
