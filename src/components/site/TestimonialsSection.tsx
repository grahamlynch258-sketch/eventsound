import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, Quote } from "lucide-react";

const fallbackTestimonials = [
  { client_name: "Sarah Mitchell", client_role: "Event Director", company: "Accenture Ireland", quote: "StageSpark transformed our annual conference. The AV was flawless, crew were professional, and setup was faster than we expected.", rating: 5 },
  { client_name: "David O'Brien", client_role: "Production Manager", company: "RDS Events", quote: "Reliable, creative, and calm under pressure. They've become our go-to production partner for all major events.", rating: 5 },
  { client_name: "Emma Walsh", client_role: "Marketing Lead", company: "Tech Ireland Summit", quote: "From lighting to live streaming, everything was handled beautifully. Our attendees were genuinely impressed.", rating: 5 },
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
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Client Reviews</p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Trusted by Ireland's leading brands
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div key={i} className="relative rounded-lg border border-border/50 bg-card p-6 md:p-8">
            <Quote className="h-8 w-8 text-primary/20 mb-4" />
            <p className="text-sm text-foreground/90 leading-relaxed mb-6">"{t.quote}"</p>
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm font-semibold text-foreground">{t.client_name}</p>
            <p className="text-xs text-muted-foreground">
              {t.client_role}{t.company ? `, ${t.company}` : ""}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
