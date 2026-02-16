import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site/PageShell";
import { CategoryCard } from "@/components/site/CategoryCard";
import { CTASection } from "@/components/site/CTASection";
import { Link } from "react-router-dom";
import { useCategories } from "@/hooks/useSiteContent";
import { useDynamicText } from "@/hooks/useDynamicContent";
import { useSiteImage } from "@/hooks/useSiteImage";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Mic, Monitor, Lightbulb, Frame, Clapperboard, Wand2 } from "lucide-react";
import { motion } from "framer-motion";

import fallbackHeroImage from "@/assets/hero-av-production.jpg";
import audioImage from "@/assets/category-audio.jpg";
import visionImage from "@/assets/category-vision.jpg";
import lightingImage from "@/assets/category-lighting.jpg";
import stagingImage from "@/assets/category-staging.jpg";
import drapingImage from "@/assets/category-draping.jpg";
import videoRecordingImage from "@/assets/category-video-recording.jpg";

const fallbackCategories = [
  { title: "Audio", imageSrc: audioImage, to: "/contact" },
  { title: "Visuals", imageSrc: visionImage, to: "/contact" },
  { title: "Lighting", imageSrc: lightingImage, to: "/contact" },
  { title: "Staging", imageSrc: stagingImage, to: "/contact" },
  { title: "Draping", imageSrc: drapingImage, to: "/contact" },
  { title: "Video (Recording)", imageSrc: videoRecordingImage, to: "/contact" },
];

const serviceDetails = [
  { icon: Mic, title: "Audio", features: ["Line array / point-source PA", "Wireless microphones", "Foldback & monitoring", "Audio engineering"] },
  { icon: Monitor, title: "Visuals", features: ["LED video walls", "Projection mapping", "Playback & switching", "Content management"] },
  { icon: Lightbulb, title: "Lighting", features: ["Architectural washes", "Moving heads & spots", "LED uplighting", "Custom programming"] },
  { icon: Frame, title: "Staging", features: ["Custom staging", "Risers & platforms", "Set builds", "Safety certified"] },
  { icon: Clapperboard, title: "Video", features: ["Multi-cam recording", "Live streaming", "Post-production", "Playback systems"] },
  { icon: Wand2, title: "Décor", features: ["Pipe & drape", "Star cloth", "Scenic elements", "Custom branding"] },
];

export default function AvProduction() {
  const { data: dbCategories, isLoading } = useCategories();
  const hero = useDynamicText("av-production", "hero");
  const { data: heroImageData } = useSiteImage("av-production", "hero", "background");
  const heroImage = heroImageData?.image_url || fallbackHeroImage;

  const categories = dbCategories && dbCategories.length > 0
    ? dbCategories.map((c) => ({ title: c.title, imageSrc: c.image_url, to: c.link }))
    : fallbackCategories;

  return (
    <PageShell>
      <main>
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Stage lighting and LED screens" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
          </div>
          <div className="container relative py-28 md:py-40">
            <p className="section-kicker mb-3">Our Services</p>
            <div className="gold-rule mb-5" />
            <h1 className={`max-w-2xl text-4xl md:text-5xl font-semibold tracking-tight ${hero.getAlignClass("headline")}`} style={hero.getStyle("headline")}>
              {hero.getText("headline", "AV & Production")}
            </h1>
            <p className={`mt-4 max-w-2xl text-base text-muted-foreground md:text-lg leading-relaxed ${hero.getAlignClass("subheadline")}`} style={hero.getStyle("subheadline")}>
              {hero.getText("subheadline", "Premium gear and experienced crew — so your event runs smooth and looks incredible.")}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="font-semibold shadow-gold">
                <Link to="/contact">Request a Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories gallery */}
        <section className="container py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-kicker mb-3">Categories</p>
            <div className="gold-rule mx-auto mb-5" />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Create vibrant atmospheres
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl" />
              ))
            ) : (
              categories.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <CategoryCard title={c.title} imageSrc={c.imageSrc} to={c.to} />
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Service details grid */}
        <section className="bg-card/30 border-y border-border/50">
          <div className="container py-20 md:py-28">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="section-kicker mb-3">Capabilities</p>
              <div className="gold-rule mx-auto mb-5" />
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                What's included
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {serviceDetails.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="rounded-xl border border-border/50 bg-card p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-3">{s.title}</h3>
                  <ul className="space-y-2">
                    {s.features.map((f) => (
                      <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
    </PageShell>
  );
}
