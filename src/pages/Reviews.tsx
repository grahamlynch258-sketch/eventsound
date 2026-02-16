import { PageShell } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { testimonials as fallbackTestimonials } from "@/content/testimonials";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function Reviews() {
  const { data: dbTestimonials } = useQuery({
    queryKey: ["testimonials-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const reviews = dbTestimonials && dbTestimonials.length > 0
    ? dbTestimonials
    : fallbackTestimonials;

  return (
    <PageShell>
      <main>
        <section className="container py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="section-kicker mb-3">Testimonials</p>
            <div className="gold-rule mb-5" />
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Customer Reviews
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              What our clients say about working with Event Sound.
            </p>
          </div>
        </section>

        <section className="container pb-20 md:pb-28">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="relative rounded-xl border border-border/50 bg-card p-6 md:p-8 flex flex-col"
              >
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-sm text-foreground/90 leading-relaxed mb-6 flex-1 italic">
                  "{t.quote}"
                </p>
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating ?? 5 }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{t.client_name}</p>
                  {(t.client_role || t.company) && (
                    <p className="text-xs text-muted-foreground">
                      {t.client_role}{t.client_role && t.company ? ", " : ""}{t.company}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
    </PageShell>
  );
}
