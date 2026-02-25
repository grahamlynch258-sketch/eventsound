import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { generateFAQSchema, generateServiceSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";
import heroFallback from "@/assets/hero-av-production.jpg";
import { BrandBanner } from "@/components/site/BrandSidebar";

export default function EventProduction() {
  const faqs = [
    { question: "What does event production management include?", answer: "We handle all technical aspects of your event — AV equipment sourcing, stage and set design, crew coordination, supplier management, technical rehearsals, and on-site production management. Think of us as your technical production partner from planning through to breakdown." },
    { question: "How far in advance should I engage a production company?", answer: "For large events like festivals or multi-day conferences, 3-6 months is ideal. Corporate events and awards nights typically need 6-8 weeks. We can work to tighter timelines but earlier engagement means better planning and availability." },
    { question: "Do you manage other suppliers on my behalf?", answer: "Yes — we coordinate with staging companies, power suppliers, venues, caterers, and any other technical suppliers involved in your event. Having one production company manage all technical elements ensures everything works together seamlessly." },
    { question: "Can you produce events anywhere in Ireland?", answer: "Yes, we produce events nationwide. While we are based in Dublin, we regularly deliver events across all 32 counties and have strong relationships with venues throughout Ireland." },
    { question: "What size events do you handle?", answer: "Everything from boardroom presentations for 20 people to outdoor festivals for 10,000+. We scale our crew and equipment to match your event. Recent projects include the Swords Castle Summer Concerts (8,000+ per night) and intimate corporate conferences." },
    { question: "What happens if equipment fails during my event?", answer: "We carry backup equipment on-site for all critical systems and our technicians are trained to handle any technical issues immediately. In over three decades of event production, we have built redundancy into every setup to ensure your event runs smoothly." }
  ];

  const serviceSchema = generateServiceSchema({
    name: "Event Production Services",
    description: "End-to-end event production management in Ireland. AV coordination, stage design, crew management, and on-site production for conferences, concerts and corporate events.",
    serviceType: "Event Production Management",
    url: "https://eventsound.ie/services/event-production"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://eventsound.ie/" },
    { name: "Services", url: "https://eventsound.ie/services" },
    { name: "Event Production", url: "https://eventsound.ie/services/event-production" }
  ]);

  useSeo({
    title: "Event Production Management Ireland | EventSound",
    description: "End-to-end event production management across Ireland. Technical direction, crew coordination, show calling, and on-site production support for corporate events and live shows.",
    canonical: "https://eventsound.ie/services/event-production",
    schema: generateFAQSchema({ questions: faqs }),
    schemaId: "faq-schema",
    additionalSchemas: [
      { schema: serviceSchema, id: "service-schema" },
      { schema: breadcrumbSchema, id: "breadcrumb-schema" }
    ]
  });

  const { hero, gallery } = useServiceImages("service-event-production");

  return (
    <PageShell>
      <PageHeader
        title="Event Production Management in Ireland"
        subtitle="Your dedicated production partner from planning to wrap"
        backgroundImage={hero || heroFallback}
        backgroundAlt="Event production crew managing a corporate event in Ireland"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides end-to-end event production management for corporate events, conferences, product launches, awards ceremonies, and live shows across Ireland. As your dedicated production partner, we handle the technical planning, crew coordination, and on-site execution — so you can focus on your event content and guests.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">From Brief to Breakdown</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our production management service covers every stage of your event. We start with a detailed technical brief, conduct site visits where needed, and develop a production schedule that covers load-in, rehearsals, show time, and breakdown. Our production managers coordinate all technical elements — sound, lighting, video, staging — into a single cohesive plan, working alongside your event manager or agency to deliver a seamless experience.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Technical Direction & Show Calling</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For events that require precise timing and coordination — award shows, product reveals, multi-speaker conferences — we provide technical direction and show calling. Our technical directors manage cue-to-cue execution, ensuring every lighting change, video roll, and audio transition happens exactly on time. We work from detailed run sheets and maintain clear communication with all crew positions throughout your event.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Why EventSound for Production?</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <li>Over 30 years of event production experience</li>
            <li>Single point of contact for all technical elements</li>
            <li>Technical direction and show calling for complex events</li>
            <li>Works alongside event managers, agencies, and venues</li>
            <li>Complete crew coordination from load-in to breakdown</li>
          </ul>
          </div>

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our Production Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <img key={img.id} src={img.image_url} alt={img.alt_text || "Event production crew at work"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" />
                ))}
              </div>
            </div>
          )}

          <BrandBanner serviceKey="event-production" />

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Related Services</h2>
          <div className="flex flex-wrap gap-3 justify-center transition-transform duration-300 hover:scale-[1.03] cursor-default">
            <Link to="/services/av-production"><Button variant="outline">AV Production</Button></Link>
            <Link to="/services/led-video-walls"><Button variant="outline">LED Video Walls</Button></Link>
            <Link to="/services/lighting-design"><Button variant="outline">Lighting Design</Button></Link>
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
            <h3 className="text-xl font-semibold mb-2">Need a Production Partner?</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">Tell us about your event — we'll come back with a production plan and transparent quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
