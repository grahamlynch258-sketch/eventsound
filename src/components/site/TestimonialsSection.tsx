import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const fallbackTestimonials = [
  { client_name: "Recent Client", client_role: "Event Director", company: "", quote: "The production quality was outstanding. From load-in to wrap, the crew were professional, responsive, and genuinely invested in making our event a success.", rating: 5 },
  { client_name: "Corporate Partner", client_role: "Production Manager", company: "", quote: "Reliable, creative, and calm under pressure. They've become our go-to production partner for all major events.", rating: 5 },
  { client_name: "Conference Organiser", client_role: "Marketing Lead", company: "", quote: "From lighting to live streaming, everything was handled beautifully. Our attendees were genuinely impressed with the production value.", rating: 5 },
];

export function TestimonialsSection() {
  const { data: dbTestimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_featured", true)
        .order("sort_order", { ascending: true })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

  return (
    <section className="container py-20 md:py-28">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="section-kicker mb-3">Client Feedback</p>
        <div className="gold-rule mx-auto mb-5" />
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          What our clients say
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative rounded-xl border border-border/50 bg-card p-6 md:p-8 flex flex-col"
          >
            <Quote className="h-8 w-8 text-primary/20 mb-4" />
            <p className="text-sm text-foreground/90 leading-relaxed mb-6 flex-1 italic">"{t.quote}"</p>
            <div>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating ?? 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm font-semibold text-foreground">{t.client_name}</p>
              <p className="text-xs text-muted-foreground">
                {t.client_role}{t.company ? `, ${t.company}` : ""}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
