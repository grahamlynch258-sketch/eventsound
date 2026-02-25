import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { generateFAQSchema } from "@/lib/schema";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";
import heroFallback from "@/assets/hero-av-production.jpg";
import { BrandBanner } from "@/components/site/BrandSidebar";

export default function AVProduction() {
  const faqs = [
    { question: "What does AV production include?", answer: "AV production covers all audio and visual technical elements for your event — PA systems, microphones, mixing desks, projection, LED screens, playback systems, and technical crew. We provide everything needed to ensure your event sounds and looks professional." },
    { question: "What size PA system do I need?", answer: "PA sizing depends on your venue and audience. A boardroom needs a small column speaker, a conference for 200 needs a medium line array, and an outdoor event for 2,000+ needs a large concert PA. We always recommend the right system based on a venue assessment." },
    { question: "Do you provide sound engineers?", answer: "Yes — all our AV packages include experienced sound engineers who manage the audio throughout your event. For larger events, we provide separate FOH (front of house) and monitor engineers." },
    { question: "Can you handle presentations and playback?", answer: "Yes — we manage all presentation playback including PowerPoint, Keynote, video playback, and confidence monitors for speakers. We test all presentations before the event starts to avoid any issues during your programme." },
    { question: "What happens during a site visit?", answer: "We assess the venue layout, power availability, rigging points, load-in access, and acoustics. This ensures we specify the right equipment and plan the setup efficiently. Site visits are free for all confirmed bookings." },
    { question: "Do you carry backup equipment?", answer: "Yes — we carry backup for all critical equipment including spare microphones, cables, laptops, and switching systems. Our technicians are trained to swap faulty equipment within minutes so your event is never disrupted." }
  ];

  useSeo({
    title: "AV Production & Conference AV Supplier Ireland | EventSound",
    description: "Professional AV production and conference AV solutions across Ireland. L-Acoustics sound, LED video walls, lighting, and full technical crew for corporate events and conferences.",
    canonical: "https://eventsound.ie/services/av-production",
    schema: generateFAQSchema({ questions: faqs }),
    schemaId: "faq-schema"
  });

  const { hero, gallery } = useServiceImages("service-av-production");

  return (
    <PageShell>
      <PageHeader
        title="AV Production & Conference AV in Ireland"
        subtitle="Complete audiovisual solutions for corporate events and conferences"
        backgroundImage={hero || heroFallback}
        backgroundAlt="Professional AV production setup at a conference in Ireland"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound is a trusted AV production partner for corporate clients, agencies, and venues across Ireland. We provide complete audiovisual solutions for conferences, seminars, AGMs, product launches, and corporate events — combining professional sound, LED video walls, lighting, and experienced technical crew into a single, reliable production package.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Conference AV Solutions</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Conferences demand flawless AV. EventSound delivers integrated audiovisual setups tailored to your conference format — whether it's a single-room keynote, a multi-room breakout programme, or a large-scale plenary session. We provide PA systems with wireless microphones for speakers and panel discussions, LED screens or projection for presentations, stage lighting, and confidence monitors. Every system is tuned to your venue and tested before your delegates arrive.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Full-Service AV Production</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            As your AV production partner, EventSound manages every technical element so you can focus on your event content and guests. Our service covers site surveys, technical planning, equipment delivery, installation, on-site operation throughout your event, and complete breakdown. We assign a dedicated production manager to your event who coordinates all AV elements and acts as your single point of contact for everything technical.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Industry-Leading Equipment</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We use L-Acoustics speaker systems for crystal-clear audio, Unilumin LED panels for high-resolution visuals, and Chamsys MagicQ for intelligent lighting control. Our inventory covers events of every scale — from a 30-person boardroom to a 3,000-seat conference venue. All equipment is maintained, PAT-tested, and backed by spares on-site.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Why EventSound for AV Production?</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <li>Over 30 years of AV production experience across Ireland</li>
            <li>L-Acoustics, Unilumin, Chamsys — industry-leading brands</li>
            <li>Dedicated production manager as your single point of contact</li>
            <li>Conference-specialist: multi-room, breakout, plenary formats</li>
            <li>Full crew: sound engineers, lighting operators, video technicians</li>
            <li>Serving clients nationwide across Ireland</li>
          </ul>
          </div>

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our AV Production Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <img key={img.id} src={img.image_url} alt={img.alt_text || "AV production setup at corporate event"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" />
                ))}
              </div>
            </div>
          )}

          <BrandBanner serviceKey="av-production" />

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Related Services</h2>
          <div className="flex flex-wrap gap-3 justify-center transition-transform duration-300 hover:scale-[1.03] cursor-default">
            <Link to="/services/led-video-walls"><Button variant="outline">LED Video Walls</Button></Link>
            <Link to="/services/event-production"><Button variant="outline">Event Production</Button></Link>
            <Link to="/services/virtual-events"><Button variant="outline">Virtual Events</Button></Link>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-primary/30 bg-card/40 backdrop-blur-sm p-6 transition-transform duration-300 hover:scale-[1.03] cursor-default">
                  <div className="rounded-lg bg-primary/10 border border-primary/20 px-4 py-3 mb-4">
                    <h3 className="text-lg font-semibold text-primary">{faq.question}</h3>
                  </div>
                  <div className="rounded-lg bg-card/60 border border-border/30 px-4 py-3">
                    <p className="text-foreground/90 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <h3 className="text-xl font-semibold mb-2">Need AV for Your Event?</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">Tell us your venue, audience size, and event format — we'll design a complete AV solution and quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
