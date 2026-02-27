import { LandingShell } from "@/components/site/LandingShell";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function LEDWallHireIreland() {
  useSeo({
    title: "LED Video Wall Hire Ireland | EventSound",
    description: "Professional LED video wall hire across Ireland. Unilumin LED panels, custom configurations, content playback, and on-site operators for corporate events, conferences, and live shows.",
    canonical: "https://eventsound.ie/landing/led-wall-hire-ireland",
    noindex: true,
  });

  return (
    <LandingShell>
      <section className="container mx-auto px-4 py-16 text-center">
        <p className="text-accent font-medium mb-3">LED Video Wall Hire — Nationwide</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Stunning LED Video Walls for Any Event</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          EventSound supplies, installs, and operates high-resolution LED video walls for conferences, corporate events, product launches, and live shows across Ireland. Unilumin panels, custom sizes, and experienced operators included.
        </p>
        <Link to="/contact"><Button size="lg" className="text-lg px-8 py-6">Get Your Free Quote →</Button></Link>
        <p className="text-sm text-muted-foreground mt-3">Response within 24 hours. No obligation.</p>
      </section>

      <section className="bg-card/50 border-y border-border/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10">Our LED Wall Service Includes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Custom Sizing", desc: "From 2m² to 50m² and beyond — configured to fit your venue and sightlines" },
              { title: "Content Playback", desc: "Presentations, video, live camera feeds, branding — all managed on-site" },
              { title: "Signal Management", desc: "Pixel mapping, scaling, and multi-source switching handled by our team" },
              { title: "Delivery & Installation", desc: "Full delivery, rigging, installation, and breakdown by experienced crew" },
              { title: "On-Site Operators", desc: "Dedicated technician managing your screens throughout the entire event" },
              { title: "Multi-Screen Setups", desc: "Breakout rooms, stage plus IMAG, confidence monitors — any configuration" },
            ].map((item) => (
              <div key={item.title} className="space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold text-center mb-10">Why Hire LED Walls from EventSound?</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            "Unilumin LED panels — industry-leading resolution and colour accuracy",
            "Over 30 years of event production experience across Ireland",
            "Full-service: delivery, installation, operation, and breakdown included",
            "Custom configurations for any venue — indoors or outdoors",
            "Works alongside your creative team or agency for content delivery",
            "Transparent pricing — no hidden fees or surprise extras",
            "Available nationwide: Dublin, Cork, Galway, Limerick, Belfast, and beyond",
          ].map((point) => (
            <div key={point} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold text-center mb-8">Trusted by Event Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <blockquote className="border border-border/50 rounded-lg p-6">
            <p className="text-muted-foreground italic">"We have engaged Event Sound to provide audio visual support on many occasions. The quality of their equipment and the professionalism of their team is exceptional."</p>
            <footer className="mt-3 text-sm font-medium">— Paul Barnes, Fingal County Council</footer>
          </blockquote>
          <blockquote className="border border-border/50 rounded-lg p-6">
            <p className="text-muted-foreground italic">"Ronan and Mark are great guys to deal with and have everything you need for your event. Can't recommend them enough."</p>
            <footer className="mt-3 text-sm font-medium">— Phil Nulty, Nulty Events</footer>
          </blockquote>
        </div>
      </section>

      <section className="bg-accent/10 border-y border-accent/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Hire LED Walls?</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Tell us your event date, venue, and screen requirements. We'll design a custom LED wall solution and quote within 24 hours.
          </p>
          <Link to="/contact"><Button size="lg" className="text-lg px-8 py-6">Get Your Free Quote →</Button></Link>
        </div>
      </section>
    </LandingShell>
  );
}
