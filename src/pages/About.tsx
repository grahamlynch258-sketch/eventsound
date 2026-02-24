import { useState, useEffect } from "react";
import { PageShell } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { about } from "@/content/about";
import { useSeo } from "@/hooks/useSeo";
import { Shield, Users, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const highlights = [
  { icon: Users, title: "Experienced Crew", text: "Seasoned technicians on every event, from load-in to wrap." },
  { icon: Zap, title: "Cutting-Edge Gear", text: "L-Acoustics, Unilumin, Chamsys — industry-leading equipment." },
  { icon: Award, title: "Three Decades of Trust", text: "Delivering events across Ireland for over thirty years." },
  { icon: Shield, title: "Safety First", text: "TUV-certified staging, European-manufactured rigging, trained crew." },
];

const FALLBACK_IMAGES = [
  { image_url: "/placeholder.svg", alt: "Event setup behind the scenes" },
  { image_url: "/placeholder.svg", alt: "Audio equipment preparation" },
  { image_url: "/placeholder.svg", alt: "Lighting rig installation" },
  { image_url: "/placeholder.svg", alt: "Stage construction in progress" },
  { image_url: "/placeholder.svg", alt: "LED wall configuration" },
  { image_url: "/placeholder.svg", alt: "Sound check before event" },
];

function BehindTheScenes() {
  const [supplementImages, setSupplementImages] = useState<{id: string; image_url: string; alt_text: string | null}[]>([]);

  useEffect(() => {
    async function fetchSupplements() {
      const { data } = await supabase
        .from("library_images")
        .select("id, image_url, alt_text")
        .eq("category", "supplements")
        .order("created_at", { ascending: true });
      if (data && data.length > 0) setSupplementImages(data);
    }
    fetchSupplements();
  }, []);

  const { data: dbImages } = useQuery({
    queryKey: ["about-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about_images")
        .select("image_url, alt, sort_order")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const images = dbImages && dbImages.length > 0 ? dbImages : FALLBACK_IMAGES;

  return (
    <section className="container py-20 md:py-28">
      <div className="max-w-3xl mx-auto mb-10">
        <p className="section-kicker mb-3">Portfolio</p>
        <div className="gold-rule mb-5" />
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Behind the Scenes
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {supplementImages.length > 0
          ? supplementImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="overflow-hidden rounded-xl border border-border/50"
              >
                <img
                  src={img.image_url}
                  alt={img.alt_text || "Behind the scenes at EventSound"}
                  className="rounded-lg w-full aspect-video object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))
          : images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="overflow-hidden rounded-xl border border-border/50"
              >
                <img
                  src={img.image_url}
                  alt={img.alt}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
      </div>
    </section>
  );
}

export default function About() {
  useSeo({
    title: "About EventSound | Professional Event Production Ireland",
    description: "Learn about EventSound, Ireland's trusted event production partner. Experienced team providing LED walls, sound systems, lighting, and staging for events nationwide.",
    canonical: "https://eventsound.ie/about",
    ogTitle: "About EventSound | Event Production Ireland",
    ogDescription: "Learn about EventSound, Ireland's trusted event production partner. Experienced team providing LED walls, sound systems, lighting, and staging.",
  });

  return (
    <PageShell>
      <main>
        <section className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-kicker mb-3">About Us</p>
            <div className="gold-rule mb-5" />
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {about.headline}
            </h1>
            <div className="mt-8 rounded-xl border border-primary/30 bg-card/40 backdrop-blur-sm p-6 md:p-8">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-base md:text-lg text-foreground/90">{about.intro}</p>
                {about.body.map((p, i) => (
                  <p key={i} className="text-sm md:text-base">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card/30 border-y border-border/50">
          <div className="container py-20 md:py-28">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="section-kicker mb-3">Why Event Sound</p>
              <div className="gold-rule mx-auto mb-5" />
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Built on experience
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="rounded-xl border border-border/50 bg-card p-6 text-center"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                    <h.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">{h.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{h.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-kicker mb-3">Safety</p>
            <div className="gold-rule mb-5" />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
              {about.healthAndSafety.headline}
            </h2>
            <div className="rounded-xl border border-primary/30 bg-card/40 backdrop-blur-sm p-6 md:p-8">
              <p className="text-muted-foreground leading-relaxed mb-4">
                {about.healthAndSafety.body}
              </p>
              <p className="text-sm text-muted-foreground italic">
                {about.healthAndSafety.cta}
              </p>
            </div>
          </div>
        </section>

        <BehindTheScenes />

        <CTASection />
      </main>
    </PageShell>
  );
}
