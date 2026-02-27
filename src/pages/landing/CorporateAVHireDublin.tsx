import { LandingShell } from "@/components/site/LandingShell";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function CorporateAVHireDublin() {
  useSeo({
    title: "Corporate AV Hire Dublin | EventSound",
    description: "Professional corporate AV hire in Dublin. Sound systems, LED video walls, lighting, and technical crew for conferences, meetings, and corporate events.",
    canonical: "https://eventsound.ie/landing/corporate-av-hire-dublin",
    noindex: true,
  });

  return (
    <LandingShell>
      <section className="container mx-auto px-4 py-16 text-center">
        <p className="text-accent font-medium mb-3">Corporate AV Hire — Dublin & Nationwide</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional AV for Your Next Corporate Event</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          EventSound provides complete AV solutions for corporate events in Dublin and across Ireland. Sound, LED walls, lighting, and experienced crew — all from one trusted production partner.
        </p>
        <Link to="/contact"><Button size="lg" className="text-lg px-8 py-6">Get Your Free Quote →</Button></Link>
        <p className="text-sm text-muted-foreground mt-3">Response within 24 hours. No obligation.</p>
      </section>

      <section className="bg-card/50 border-y border-border/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10">What We Provide for Corporate Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Sound Systems", desc: "L-Acoustics PA, wireless mics for speakers and panels, experienced sound engineers" },
              { title: "LED Video Walls", desc: "Unilumin LED screens for presentations, branding, and live content display" },
              { title: "Stage Lighting", desc: "Chamsys-controlled intelligent lighting for keynotes, awards, and gala dinners" },
              { title: "Staging & Set", desc: "TUV-certified staging, pipe and drape, branded backdrops" },
              { title: "Live Streaming", desc: "Broadcast to remote attendees with multi-camera production and branded graphics" },
              { title: "Technical Crew", desc: "Dedicated production manager, sound engineers, lighting operators, and video technicians" },
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
        <h2 className="text-2xl font-semibold text-center mb-10">Why Dublin's Corporate Clients Choose EventSound</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            "Over 30 years of AV production experience",
            "Single point of contact — one production partner for everything",
            "Industry-leading equipment: L-Acoustics, Unilumin, Chamsys",
            "Full crew included with every hire — no hidden extras",
            "Transparent pricing with detailed quotes within 24 hours",
            "Experience with Dublin's top conference venues",
            "Fully insured with TUV-certified staging",
          ].map((point) => (
            <div key={point} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold text-center mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <blockquote className="border border-border/50 rounded-lg p-6">
            <p className="text-muted-foreground italic">"We have engaged Event Sound to provide audio visual support on many occasions. The quality of their equipment and the professionalism of their team is exceptional."</p>
            <footer className="mt-3 text-sm font-medium">— Paul Barnes, Fingal County Council</footer>
          </blockquote>
          <blockquote className="border border-border/50 rounded-lg p-6">
            <p className="text-muted-foreground italic">"I've been working with Event Sound over many years on corporate events and large fundraisers. They are a fantastic team to work with."</p>
            <footer className="mt-3 text-sm font-medium">— Kevin Rowe, Kevin Rowe Events</footer>
          </blockquote>
        </div>
      </section>

      <section className="bg-accent/10 border-y border-accent/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book AV for Your Event?</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Tell us your date, venue, and requirements. We'll come back with a clear recommendation and transparent quote — within 24 hours.
          </p>
          <Link to="/contact"><Button size="lg" className="text-lg px-8 py-6">Get Your Free Quote →</Button></Link>
        </div>
      </section>
    </LandingShell>
  );
}
