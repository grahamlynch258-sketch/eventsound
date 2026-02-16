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
import { usePageContent } from "@/lib/contentMapper";

import fallbackHeroImage from "@/assets/hero-av-production.jpg";

// Static fallback content
const FALLBACK_CONTENT = {
  hero: {
    tagline: siteConfig.tagline,
    headline: "Production by Professionals",
    subheadline: "From Concept to Delivery, Our Team supports you to help Delivery your Event flawlessly",
    cta_primary: "Get a Free Quote",
    cta_secondary: "Explore Services",
  },
  features: {
    // Add feature fallbacks if needed
  },
  cta2: {
    // Add CTA2 fallbacks if needed
  },
};

const Index = () => {
  const { getContent, isLoading } = usePageContent(
    "home",
    ["hero", "features", "cta2"],
    FALLBACK_CONTENT
  );

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
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                {getContent("hero", "tagline")}
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.1]">
                {getContent("hero", "headline")}
              </h1>

              <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                {getContent("hero", "subheadline")}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="font-semibold shadow-gold text-base px-8">
                  <Link to="/contact">
                    {getContent("hero", "cta_primary")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base px-8">
                  <Link to="/services">{getContent("hero", "cta_secondary")}</Link>
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
