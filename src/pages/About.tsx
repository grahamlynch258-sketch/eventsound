import { PageShell } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { about } from "@/content/about";
import { siteConfig } from "@/config/site";
import { Shield, Users, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  { icon: Users, title: "Experienced Crew", text: "Seasoned technicians on every event, from load-in to wrap." },
  { icon: Zap, title: "Cutting-Edge Gear", text: "L-Acoustics, Unilumin, Chamsys — industry-leading equipment." },
  { icon: Award, title: "Two Decades of Trust", text: "Delivering events across Ireland for over twenty years." },
  { icon: Shield, title: "Safety First", text: "TUV-certified staging, European-manufactured rigging, trained crew." },
];

export default function About() {
  return (
    <PageShell>
      <main>
        <section className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="section-kicker mb-3">About Us</p>
            <div className="gold-rule mb-5" />
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {about.headline}
            </h1>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-base md:text-lg">{about.intro}</p>
              {about.body.map((p, i) => (
                <p key={i} className="text-sm md:text-base">{p}</p>
              ))}
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
          <div className="max-w-3xl mx-auto">
            <p className="section-kicker mb-3">Safety</p>
            <div className="gold-rule mb-5" />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
              {about.healthAndSafety.headline}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {about.healthAndSafety.body}
            </p>
            <p className="text-sm text-muted-foreground italic">
              {about.healthAndSafety.cta}
            </p>
          </div>
        </section>

        <CTASection />
      </main>
    </PageShell>
  );
}
