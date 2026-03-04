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
                  decoding="async"
                  width={800}
                  height={450}
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
                  decoding="async"
                  width={800}
                  height={600}
                />
              </motion.div>
            ))}
      </div>
    </section>
  );
}

export default function About() {
  useSeo({
    title: "About EventSound | 20+ Years of Event Production in Ireland",
    description: "EventSound has been delivering professional event production across Ireland for over 20 years. Meet the team behind Ireland's trusted AV hire and event production company.",
    canonical: "https://eventsound.ie/about",
    ogTitle: "About EventSound | 20+ Years of Event Production in Ireland",
    ogDescription: "EventSound has been delivering professional event production across Ireland for over 20 years. Meet the team behind Ireland's trusted AV hire and event production company.",
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
            <div className="mt-8 rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-6 md:p-8">
              <div className="space-y-4 text-white leading-relaxed">
                <p className="text-base md:text-lg text-white">{about.intro}</p>
                {about.body.map((p, i) => (
                  <p key={i} className="text-sm md:text-base text-white">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card/30 border-y border-border/50">
          <div className="container py-20 md:py-28">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="section-kicker mb-3">Why EventSound</p>
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
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 mb-4">
                    <h.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">{h.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{h.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="section-kicker mb-3">Meet the Founder</p>
              <div className="gold-rule mx-auto mb-5" />
            </div>
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-xl border border-border/50"
              >
                <img
                  src="/images/Ronan.webp"
                  alt="Ronan Lynch, Managing Director of EventSound, at a mixing desk"
                  width={600}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
                  Ronan Lynch
                </h2>
                <p className="text-accent font-medium mb-6">Managing Director</p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 40 years in the Irish music and live events industry, Ronan has been behind the desk at everything from intimate theatre shows to large-scale outdoor concerts. Before founding EventSound, he spent decades on the technical frontline — mixing, rigging, and problem-solving across every type of venue Ireland has to offer.
                  </p>
                  <p>
                    That experience shows in how EventSound operates today. Ronan's deep technical knowledge means every equipment spec is right for the room, every signal chain is clean, and every backup plan is already in place before the doors open. He's the person who notices the things most people don't — a slight hum in a monitor, a lighting angle that's not quite right, a stage plot that could work better with one small change.
                  </p>
                  <p>
                    Four decades of live events means there's very little Ronan hasn't seen or solved. That's the foundation EventSound is built on.
                  </p>
                </div>
              </motion.div>
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
            <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-6 md:p-8">
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
