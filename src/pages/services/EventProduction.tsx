import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";
import { useServiceSections } from "@/hooks/useServiceSections";
import { ServiceSections } from "@/components/site/ServiceSections";
import { BrandBanner } from "@/components/site/BrandSidebar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/site/Breadcrumb";

export default function EventProduction() {
  const faqs = [
    { question: "What does an event production company do?", answer: "An event production company manages all technical elements of your event — sound, lighting, video, staging, and crew. EventSound handles everything from initial site survey and technical design through to on-site operation and post-event breakdown, so you can focus on your content and guests." },
    { question: "How far in advance should I book event production?", answer: "We recommend booking 4 to 8 weeks in advance for corporate events, and 3 to 6 months for large-scale festivals or multi-day productions. Earlier booking ensures equipment availability, particularly during peak season (September to December and April to June)." },
    { question: "Do you provide production for outdoor events?", answer: "Yes. We provide full outdoor event production including weatherproof staging, high-brightness LED screens, outdoor-rated PA systems, and power distribution. We have produced outdoor concerts at Swords Castle and festival events nationwide." },
    { question: "Can you produce events anywhere in Ireland?", answer: "Yes, we produce events nationwide. While we are based in Drogheda, Co. Louth, we regularly deliver events across all 32 counties and have strong relationships with venues throughout Ireland." },
    { question: "What size events do you handle?", answer: "Everything from boardroom presentations for 20 people to outdoor festivals for 10,000+. We scale our crew and equipment to match your event. Recent projects include the Swords Castle Summer Concerts and intimate corporate conferences." },
    { question: "What happens if equipment fails during my event?", answer: "We carry backup equipment on-site for all critical systems and our technicians are trained to handle any technical issues immediately. In over two decades of event production, we have built redundancy into every setup to ensure your event runs smoothly." }
  ];

  const serviceSchema = generateServiceSchema({
    name: "Event Production",
    description: "Full-service event production company in Ireland. Sound, lighting, LED walls, staging and crew for conferences, festivals, awards ceremonies and corporate events.",
    url: "https://eventsound.ie/services/event-production",
    provider: { name: "EventSound", url: "https://eventsound.ie" },
    areaServed: ["Dublin", "Cork", "Galway", "Belfast", "Limerick", "Ireland"],
    serviceType: "Event Production"
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://eventsound.ie" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "Event Production", url: "https://eventsound.ie/services/event-production" }
    ]
  });

  useSeo({
    title: "Event Production Company Dublin & Ireland | Full-Service | EventSound",
    description: "Full-service event production company in Ireland. Sound, lighting, LED walls, staging & crew for conferences, festivals, awards ceremonies & corporate events.",
    canonical: "https://eventsound.ie/services/event-production",
    additionalSchemas: [
      { schema: serviceSchema, schemaId: "service-schema" },
      { schema: breadcrumbSchema, schemaId: "breadcrumb-schema" }
    ]
  });
  const { hero, gallery } = useServiceImages("service-event-production");
  const { data: sections = [] } = useServiceSections("event-production");

  return (
    <PageShell>
      <Breadcrumb items={[
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Event Production" }
      ]} />
      <PageHeader
        title="Event Production Management in Ireland"
        subtitle="Your dedicated production partner from planning to wrap"
        backgroundImage={hero}
        backgroundAlt="Event production crew managing a corporate event in Ireland"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound is a full-service event production company based in Drogheda, Co. Louth, delivering sound, lighting, LED video walls, staging, and technical management for events across Dublin, Leinster, and nationwide Ireland. From corporate conferences and awards ceremonies to outdoor festivals and multi-day exhibitions, we manage the entire technical production from initial planning to on-site delivery and breakdown.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            With over 20 years in the Irish event production industry, we work directly with corporate clients, agencies, local authorities, and venue managers. We provide our own equipment alongside experienced technical crew, and coordinate sub-hire and additional resources for larger productions.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">What Full-Service Event Production Includes</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound's event production service covers every technical element of your event. We begin with a site survey and technical design, assessing your venue's power, rigging, access, and acoustic characteristics. We then provide a detailed production plan and equipment specification tailored to your event format, audience size, and budget.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            On-site, our crew handles the full load-in, installation, and technical rehearsal. During the event, our operators manage sound levels, lighting cues, video playback, camera switching, and stage management. After the event, we handle complete breakdown and load-out.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our production equipment includes Martin Audio PA systems and L-Acoustics speaker systems for sound, Chamsys-controlled lighting rigs with moving heads, wash lights, and atmospheric effects, Unilumin and Absen LED video walls in sizes from 6m² to 50m²+, GUIL aluminium staging platforms with modular configurations, and multi-camera video production with live switching and recording.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Event Types We Produce</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Corporate conferences and seminars — Full AV production for single or multi-room events, including PA, LED walls, lighting, and hybrid streaming. We have provided conference production at Bellingham Castle, The Marcy Hotel Drogheda, and DkIT An Macánna Theatre.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Awards ceremonies and gala dinners — Stage design, LED backdrops, atmospheric lighting, and broadcast-quality audio for awards presentations and entertainment.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Outdoor festivals and concerts — Main stage production including PA systems, LED screens, stage lighting, and power distribution. We supplied full production for the Swords Castle Summer Concerts and multi-year festival installations.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Exhibitions and trade shows — Stand AV, LED screen displays, PA for keynote areas, and rigging. EventSound is the long-term AV partner for the School Summit career expos at the Eikon Exhibition Centre, Belfast, providing all equipment for multiple events per year.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Product launches and brand activations — Custom LED configurations, dramatic lighting, and precision-timed audio-visual sequences for reveals and presentations.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Local authority and community events — Production for council-run events, enterprise workshops, and public celebrations. We work with Local Enterprise Office Louth and Louth County Council on recurring enterprise events.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Equipment We Use</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Sound: Martin Audio and L-Acoustics PA systems scaled from compact 50-person boardroom setups to large-format line arrays for 5,000+ outdoor audiences. Wireless microphone systems from Shure and Sennheiser, digital mixing desks, and in-ear monitoring for performers.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Lighting: Chamsys-controlled lighting rigs with moving head spots and wash fixtures, LED uplighters, follow spots, atmospheric haze and smoke effects, and DMX-controlled architectural lighting.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            LED Video: Unilumin and Absen LED panels from 1.9mm to 3.9mm pixel pitch for indoor events, high-brightness outdoor panels for festival and concert stages, with media servers and live camera switching.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Staging: GUIL aluminium staging platforms manufactured in Europe and TUV-certified. Modular configurations with adjustable heights, steps, barriers, wheelchair ramps, and stage skirts for indoor and outdoor use.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Event Production Pricing</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Event production pricing is based on the scale of your event, equipment requirements, crew size, venue location, and number of event days. Small single-room conference production typically starts from €800 per day. Medium-scale corporate events with LED walls, full lighting, and multi-source audio run from €2,500 to €5,000+. Large outdoor festivals and concerts are quoted individually based on technical requirements. Contact us with your event brief for a detailed proposal and quote.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Why EventSound for Production?</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <li>Over 20 years of event production experience across Ireland</li>
            <li>Single point of contact for all technical elements</li>
            <li>Own equipment: Martin Audio, L-Acoustics, Unilumin, Chamsys, GUIL</li>
            <li>Works alongside event managers, agencies, and venues</li>
            <li>Complete crew coordination from load-in to breakdown</li>
            <li>Nationwide service: Dublin, Cork, Galway, Limerick, Belfast, and beyond</li>
          </ul>
          </div>

          {sections.length > 0 && <ServiceSections sections={sections} />}

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our Production Work</h2>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <StaggerItem key={img.id}>
                  <img src={img.image_url} alt={img.alt_text || "Event production crew at work"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" decoding="async" width={600} height={338} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          <BrandBanner serviceKey="event-production" />

          <ScrollReveal>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Combined With</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Our event production service coordinates <Link to="/services/av-production" className="text-accent hover:underline">AV hire</Link>, <Link to="/services/led-video-walls" className="text-accent hover:underline">LED video walls</Link>, and <Link to="/services/lighting-design" className="text-accent hover:underline">lighting design</Link> under a single production manager for seamless delivery. See how we managed production for the <Link to="/case-studies/swords-castle-summer-concerts" className="text-accent hover:underline">Swords Castle Summer Concerts</Link>.
          </p>
          </ScrollReveal>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions</h2>
            <StaggerContainer className="space-y-6">
              {faqs.map((faq, i) => (
                <StaggerItem key={i}>
                <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-6 transition-transform duration-300 hover:scale-[1.03] cursor-default">
                  <div className="rounded-lg bg-accent/10 border border-accent/20 px-4 py-3 mb-4">
                    <h3 className="text-lg font-semibold text-accent">{faq.question}</h3>
                  </div>
                  <div className="rounded-lg bg-card/60 border border-border/30 px-4 py-3">
                    <p className="text-foreground/90 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
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
