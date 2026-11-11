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
import { IrelandMap } from "@/components/site/IrelandMap";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ServiceHeroActions } from "@/components/site/ServiceHeroActions";
import { ServiceEnquirySection } from "@/components/site/ServiceEnquirySection";
import { StickyCtaBar } from "@/components/StickyCtaBar";

const conferenceScopes = [
  {
    title: "Single-room conferences",
    description: "A joined-up sound, screen, presentation and lighting system with an operator who knows the running order.",
    details: "Ideal for seminars, AGMs, training days and executive meetings.",
  },
  {
    title: "Multi-room conferences",
    description: "Main-room production, breakout room AV, shared presentation content and the right technical cover in each space.",
    details: "Ideal for conferences with parallel sessions, panels and workshops.",
  },
  {
    title: "Full conference production",
    description: "LED, sound, stage lighting, cameras, recording, streaming and technical direction managed by one team.",
    details: "Ideal for major corporate conferences, awards and multi-day programmes.",
  },
];

export default function ConferenceAvHire() {
  const faqs = [
    { question: "What AV equipment do I need for a corporate conference?", answer: "A standard conference setup includes a PA system with wireless microphones, an LED screen or projector for presentations, confidence monitors for speakers, stage lighting, and a dedicated technician. For larger events, add IMAG cameras, breakout room audio, and hybrid streaming." },
    { question: "Can you provide conference sound and lighting as one package?", answer: "Yes. We plan conference sound, stage and camera lighting, presentation screens and technical crew as one system. This keeps the equipment, setup schedule and show operation under one production plan." },
    { question: "Do you provide AV for multi-room conferences?", answer: "Yes. We regularly set up AV across multiple rooms for conferences with breakout sessions, plenary halls, and networking areas. Each room gets its own PA, display, and technician, with centralised content management." },
    { question: "Can you live stream my conference?", answer: "Yes. We provide full hybrid event production including multi-camera switching, branded stream graphics, and audience interaction tools. We stream to platforms including Zoom, Teams, YouTube, Vimeo, and custom platforms." },
    { question: "How far in advance should I book conference AV?", answer: "For large conferences with 200 or more delegates, we recommend four to six weeks minimum. Smaller meetings can often be turned around in one to two weeks, but earlier is always better — especially during peak conference season from September to November." },
    { question: "How much does conference AV hire cost?", answer: "Conference AV pricing depends on the number of rooms, event duration, equipment, rehearsal time and crew. Send the venue, delegate numbers and running order and we will return an itemised recommendation rather than a generic equipment list." },
  ];
  const faqSchema = generateFAQSchema({ questions: faqs });

  const serviceSchema = generateServiceSchema({
    name: "Conference AV Hire",
    description: "Conference AV hire and production across Ireland. Conference sound and lighting, LED screens, wireless microphones, streaming and technical crew for corporate events.",
    url: "https://eventsound.ie/services/conference-av-hire/",
    provider: { name: "EventSound", url: "https://eventsound.ie" },
    areaServed: ["Dublin", "Cork", "Galway", "Belfast", "Limerick", "Ireland"],
    serviceType: "Conference Audio Visual Hire"
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://eventsound.ie" },
      { name: "Services", url: "https://eventsound.ie/services/" },
      { name: "Conference AV Hire", url: "https://eventsound.ie/services/conference-av-hire/" }
    ]
  });

  useSeo({
    title: "Conference AV Hire Ireland | Sound, Screens, Lighting & Crew",
    description: "Conference AV hire and production across Ireland. Sound, wireless microphones, LED screens, lighting, streaming and experienced technical crew.",
    canonical: "https://eventsound.ie/services/conference-av-hire/",
    additionalSchemas: [
      { schema: faqSchema, schemaId: "faq-schema" },
      { schema: serviceSchema, schemaId: "service-schema" },
      { schema: breadcrumbSchema, schemaId: "breadcrumb-schema" }
    ]
  });
  const { hero, heroAlt, gallery } = useServiceImages("service-conference-av");
  const { data: sections = [] } = useServiceSections("conference-av-hire");

  return (
    <PageShell>
      <Breadcrumb items={[
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Conference AV Hire" }
      ]} />
      <PageHeader
        title="Conference AV Hire and Production in Ireland"
        subtitle="Sound, screens, lighting, presentations and technical crew managed as one conference production"
        backgroundImage={hero}
        backgroundAlt={heroAlt ?? "Professional conference AV setup with LED screens and lectern microphones in Ireland"}
      >
        <ServiceHeroActions
          serviceName="Conference AV & Full Production"
          benefits={["Single and multi-room conferences", "Sound, screens, lighting and streaming", "Rehearsal and presenter support"]}
        />
      </PageHeader>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides conference equipment hire and full technical production for corporate conferences, seminars, AGMs and awards across Ireland. One experienced team plans the sound, screens, presentation systems, stage lighting and crew around your venue and running order.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We have delivered conference AV at Bellingham Castle, The Marcy Hotel Drogheda, DkIT An Macánna Theatre and the Eikon Exhibition Centre Belfast. We work directly with corporate organisers, agencies and venues from the first technical brief through rehearsal, live operation and breakdown.
          </p>

          <section aria-labelledby="conference-scope-heading" className="pt-4 text-left">
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mb-3">Choose the right level of support</p>
              <h2 id="conference-scope-heading" className="text-3xl font-semibold tracking-tight">Conference AV packages built around the programme</h2>
              <p className="mt-3 text-muted-foreground">You do not need to specify the equipment. Send the event basics and we will design the technical plan.</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {conferenceScopes.map((scope) => (
                <article key={scope.title} className="rounded-xl border border-border/60 bg-card/60 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold">{scope.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{scope.description}</p>
                  <p className="mt-4 border-t border-border/50 pt-4 text-sm font-medium text-foreground/90">{scope.details}</p>
                </article>
              ))}
            </div>
          </section>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Conference Equipment Hire and Technical Production</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our conference AV packages cover every technical element of a corporate event. We provide conference sound and lighting, PA systems and microphone setups for keynote speeches, panel discussions and audience Q&amp;A, including wireless handheld, lapel and headset microphones. Our systems are selected for clear, even coverage in conference rooms, ballrooms and theatre-style venues.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For visual presentation, we supply LED video walls, projection systems, confidence monitors for speakers, and stage-front foldback screens. Our operators manage all slide advancement, video playback, and live camera switching so your presenters can focus on delivery.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Lighting for conferences includes front-of-house wash for speaker visibility and camera compatibility, branded uplighting, stage effects, and house light control managed through our Chamsys lighting systems.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">What a Typical Conference AV Setup Includes</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            A typical EventSound conference AV package includes: PA system sized for the venue and audience (Martin Audio speakers, wireless microphones, mixing desk), LED video wall or projection for presentations and branding, confidence monitors for speakers showing slides and timers, stage lighting for presenter visibility and camera-ready colour temperature, recording of all sessions for post-event distribution, and a dedicated technical operator managing audio, visuals, and lighting throughout the event.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For larger conferences, we also provide multi-room AV setups for breakout sessions, delegate microphone systems for panel discussions and audience Q&A, live polling and audience interaction displays, IMAG (image magnification) with multi-camera switching for large audiences, and hybrid event streaming for remote attendees.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Conferences and Events We Have Supported</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound has provided conference AV and event production at venues across Ireland, including:
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Local Enterprise Week 2026 — Multi-venue production across Bellingham Castle (Castlebellingham), The Gateway Hotel (Dundalk), and The Marcy Hotel (Drogheda). PA systems, staging, display screens, and lighting for a week of enterprise workshops and keynotes. Contracted by Whitelight Events (Davis Events) on behalf of Local Enterprise Office Louth and Louth County Council.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Local Enterprise Awards 2026 — Sound, lighting, and display screens for the county business awards at The Marcy Hotel, Drogheda.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            PRISM Immersive Technology Summit — Curved Absen LED wall and mood lighting at DkIT An Macánna Theatre, Dundalk. Technical production for 250 attendees, supported by DkIT, Queen's University Belfast, and InterTradeIreland.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            School Summit Career Expos — Multi-year partnership providing all AV equipment for large-scale careers exhibitions at the Eikon Exhibition Centre, Belfast. Multiple events per year with full EventSound equipment.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Beta Festival 2025 — Curved LED video wall installation for immersive digital art at The Digital Hub, Dublin.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Swords Castle Summer Concerts — Full event production including stage, LED walls, PA system, and lighting for outdoor summer concerts.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Hybrid and Virtual Conference Production</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For conferences with remote attendees, EventSound provides hybrid event production combining in-venue AV with professional live streaming. We set up multi-camera switching, branded stream graphics and lower thirds, screen sharing integration, and audience interaction tools for remote participants including live Q&A and polling.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our hybrid production ensures remote viewers receive the same quality experience as in-room attendees, with broadcast-quality video, clear audio, and real-time content delivery through your chosen streaming platform.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">A Clear Conference AV Quotation</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Conference AV pricing depends on the venue, number of rooms, event duration, rehearsal schedule, equipment and crew. Your quotation will set out the recommended system, operator hours, setup and breakdown so the full delivery cost is clear. Send the venue, delegate numbers and running order to start.
          </p>

          {sections.length > 0 && <ServiceSections sections={sections} />}

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our Conference AV Work</h2>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <StaggerItem key={img.id}>
                  <img src={img.image_url} alt={img.alt_text || "Conference AV setup at corporate event"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" decoding="async" width={600} height={338} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          <BrandBanner serviceKey="conference-av-hire" />

          <ScrollReveal>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Combined With</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Conference setups often include <Link to="/services/av-production" className="text-accent hover:underline">full AV production</Link> for multi-room events and <Link to="/services/led-video-walls" className="text-accent hover:underline">LED video wall hire</Link> for keynote sessions. For events with a remote audience, add our <Link to="/services/virtual-events" className="text-accent hover:underline">virtual and hybrid event</Link> streaming service.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Before requesting prices, use our{" "}
            <Link to="/blog/conference-av-technical-brief/" className="text-accent hover:underline">
              conference AV planning brief
            </Link>{" "}
            to confirm the room, running order, presenter, content and rehearsal requirements.
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
            <h3 className="text-xl font-semibold mb-2">Planning a conference?</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">Tell us the venue, delegate numbers and running order. We will recommend the complete production package and provide a clear quotation.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
      <IrelandMap service="conference-av" />
      <ServiceEnquirySection
        serviceName="Conference AV & Full Production"
        heading="Build a conference package presenters can trust"
        description="Tell us the running order, presenter count, audience, room and rehearsal time. We’ll turn that into one joined-up sound, screen, lighting and crew plan."
        included={[
          "Microphone, presentation and confidence-monitor requirements checked",
          "Rehearsal, setup and operator hours included in the production plan",
          "Breakout rooms, recording and streaming added only where useful",
        ]}
        proof={{
          title: "PRISM Immersive Technology Summit",
          description: "A curved LED backdrop, conference sound and mood lighting coordinated for speakers, content and a 250-person audience.",
          href: "/case-studies/prism-immersive-technology-summit",
        }}
      />
      <StickyCtaBar />
    </PageShell>
  );
}
