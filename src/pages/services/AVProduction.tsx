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

export default function AVProduction() {
  const faqs = [
    { question: "What AV equipment do I need for a corporate conference?", answer: "A standard conference setup includes a PA system with wireless microphones, an LED screen or projector for presentations, confidence monitors for speakers, stage lighting, and a dedicated technician. For larger events, add IMAG cameras, breakout room audio, and hybrid streaming." },
    { question: "Do you provide AV for multi-room conferences?", answer: "Yes. We regularly set up AV across multiple rooms for conferences with breakout sessions, plenary halls, and networking areas. Each room gets its own PA, display, and technician, with centralised content management." },
    { question: "Can you live stream my conference?", answer: "Yes. We provide full hybrid event production including multi-camera switching, branded stream graphics, and audience interaction tools. We stream to platforms including Zoom, Teams, YouTube, Vimeo, and custom platforms." },
    { question: "What happens during a site visit?", answer: "We assess the venue layout, power availability, rigging points, load-in access, and acoustics. This ensures we specify the right equipment and plan the setup efficiently. Site visits are free for all confirmed bookings." },
    { question: "Do you carry backup equipment?", answer: "Yes — we carry backup for all critical equipment including spare microphones, cables, laptops, and switching systems. Our technicians are trained to swap faulty equipment within minutes so your event is never disrupted." },
  ];

  useSeo({
    title: "AV Hire Dublin | Audio Visual Equipment Hire Ireland | EventSound",
    description: "AV hire and audio visual equipment hire in Dublin and across Ireland. Professional AV services for corporate events, conferences, concerts, and live productions.",
    canonical: "https://eventsound.ie/services/av-production",
  });
  const { hero, gallery } = useServiceImages("service-av-production");
  const { data: sections = [] } = useServiceSections("av-production");

  return (
    <PageShell>
      <PageHeader
        title="AV Hire & Audio Visual Services"
        subtitle="Complete audiovisual solutions for corporate events and conferences"
        backgroundImage={hero}
        backgroundAlt="Professional AV production setup at a conference in Ireland"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides conference AV and event production services across Ireland, delivering sound, lighting, LED screens, staging, and full technical management for corporate conferences, seminars, AGMs, awards ceremonies, and product launches. Based in Drogheda, Co. Louth, we serve venues in Dublin, Cork, Galway, Belfast, and nationwide.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            With over 20 years of experience in the event production industry, we work with corporate clients, agencies, venue managers, and event organisers to deliver professional AV production from initial planning through to on-site execution and breakdown.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Conference AV Services</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our conference AV packages cover every technical element of a corporate event. We provide PA systems and microphone setups for keynote speeches, panel discussions, and audience Q&A — including wireless handheld, lapel, and headset microphones. Our Martin Audio speaker systems deliver clear, even coverage in conference rooms, ballrooms, and theatre-style venues.
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
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Events We Have Supported</h2>
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
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Conference AV Pricing</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Conference AV pricing depends on the number of rooms, event duration, equipment requirements, and venue location. A single-room conference with PA, projection, and a technician typically starts from €800 to €1,500 per day. Multi-room setups with LED walls, IMAG, and full lighting production scale from €2,500 upwards depending on complexity. Contact us for a detailed quote based on your event brief.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Why EventSound for AV Production?</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <li>Over 20 years of AV production experience across Ireland</li>
            <li>Martin Audio, Unilumin, Chamsys — industry-leading brands</li>
            <li>Dedicated production manager as your single point of contact</li>
            <li>Conference-specialist: multi-room, breakout, plenary formats</li>
            <li>Full crew: sound engineers, lighting operators, video technicians</li>
            <li>Hybrid and virtual event production with live streaming</li>
            <li>Serving clients nationwide across Ireland</li>
          </ul>
          </div>

          {sections.length > 0 && <ServiceSections sections={sections} />}

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our AV Production Work</h2>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <StaggerItem key={img.id}>
                  <img src={img.image_url} alt={img.alt_text || "AV production setup at corporate event"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" decoding="async" width={600} height={338} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          <BrandBanner serviceKey="av-production" />

          <ScrollReveal>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Combined With</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Our AV production packages often include <Link to="/services/led-video-walls" className="text-accent hover:underline">LED video wall hire</Link> and <Link to="/services/lighting-design" className="text-accent hover:underline">event lighting design</Link> for a unified production. For conference-specific setups, see our dedicated <Link to="/services/conference-av-hire" className="text-accent hover:underline">conference AV hire</Link> service. See our full AV setup for the <Link to="/case-studies/prism-immersive-technology-summit" className="text-accent hover:underline">PRISM Immersive Technology Summit</Link>.
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
            <h3 className="text-xl font-semibold mb-2">Need AV for Your Event?</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">Tell us your venue, audience size, and event format — we'll design a complete AV solution and quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
