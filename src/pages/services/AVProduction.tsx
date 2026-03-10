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

export default function AVProduction() {
  const faqs = [
    { question: "What AV equipment do I need for my event?", answer: "It depends on your venue, audience size, and event format. For a simple presentation, a display screen and PA with a wireless microphone may be enough. For larger events, you'll likely need LED walls or projection, a full PA system, stage lighting, and a technician. Tell us about your event and we'll recommend the right setup." },
    { question: "Do you deliver and set up the equipment?", answer: "Yes. Every AV hire from EventSound includes delivery, installation, on-site operation by a dedicated technician, and full collection after your event. You don't need to handle any equipment yourself." },
    { question: "How far in advance should I book AV hire?", answer: "We recommend at least 2 to 4 weeks for standard corporate events. For large-scale productions, festivals, or peak season events (September to December), book 4 to 8 weeks ahead to ensure equipment availability." },
    { question: "Can I hire individual items or do I need a full package?", answer: "Both. We supply individual items like a single screen or microphone, as well as complete AV packages tailored to your event. We'll advise on the most cost-effective option for your requirements." },
  ];

  const serviceSchema = generateServiceSchema({
    name: "AV Equipment Hire",
    description: "AV equipment hire across Ireland. LED screens, PA systems, projectors, lighting and staging for corporate events, exhibitions and conferences.",
    url: "https://eventsound.ie/services/av-production",
    provider: { name: "EventSound", url: "https://eventsound.ie" },
    areaServed: ["Dublin", "Cork", "Galway", "Belfast", "Limerick", "Ireland"],
    serviceType: "Audio Visual Equipment Hire"
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://eventsound.ie" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "AV Hire", url: "https://eventsound.ie/services/av-production" }
    ]
  });

  useSeo({
    title: "AV Hire Dublin | Audio Visual Equipment Hire Ireland | EventSound",
    description: "AV equipment hire across Ireland. LED screens, PA systems, projectors, lighting & staging for corporate events, exhibitions & conferences. Full setup & technician included.",
    canonical: "https://eventsound.ie/services/av-production",
    additionalSchemas: [
      { schema: serviceSchema, schemaId: "service-schema" },
      { schema: breadcrumbSchema, schemaId: "breadcrumb-schema" }
    ]
  });
  const { hero, gallery } = useServiceImages("service-av-production");
  const { data: sections = [] } = useServiceSections("av-production");

  return (
    <PageShell>
      <Breadcrumb items={[
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "AV Hire" }
      ]} />
      <PageHeader
        title="AV Hire & Audio Visual Services"
        subtitle="Complete audiovisual solutions for corporate events and conferences"
        backgroundImage={hero}
        backgroundAlt="Professional AV production setup at a conference in Ireland"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides AV equipment hire across Ireland for corporate events, conferences, product launches, exhibitions, gala dinners, and live shows. Based in Drogheda, Co. Louth, we supply and operate professional audio visual equipment at venues in Dublin, Cork, Galway, Belfast, and nationwide.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            With over 20 years in the event production industry, we supply everything from a single display screen for a boardroom presentation to full multi-source AV production for large-scale corporate events. Every hire includes delivery, setup, on-site technical support, and collection — so you can focus on your event while we handle the technology.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">AV Equipment Available for Hire</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our AV hire inventory covers the full range of audiovisual equipment needed for professional events:
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Display and video: LED video walls (Unilumin and Absen panels from 1.9mm to 3.9mm pixel pitch), LCD flat screens from 55" to 86", HD and 4K projectors for front and rear projection, projection screens, confidence monitors, and foldback displays.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Sound and audio: Martin Audio PA systems and L-Acoustics speakers scaled for any venue size, wireless handheld, lapel, and headset microphones (Shure, Sennheiser), digital mixing desks, foldback monitors, and playback systems for background music and walk-in tracks.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Lighting: Chamsys-controlled lighting rigs, moving head spots and wash fixtures, LED uplighters for venue theming, front-of-house wash lighting for speakers and stage, atmospheric haze and effects, and DMX architectural lighting.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Staging and rigging: GUIL aluminium staging platforms (TUV-certified, European-manufactured), pipe and drape, truss, lecterns, and podiums.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Recording and streaming: Multi-camera video production, live switching, recording for post-event distribution, and live streaming to Zoom, Teams, YouTube, Vimeo, and custom platforms.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">How AV Hire Works with EventSound</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We keep the process straightforward. Tell us about your event — the venue, audience size, format, and what you need to achieve — and we'll recommend the right equipment and configuration. We provide a detailed quote with no hidden fees, covering all equipment, delivery, setup, operation, and collection.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Before your event, our team conducts a site survey for larger productions to assess power, rigging, sightlines, and acoustics. On the day, our crew arrives with time built in for full installation, testing, and a technical rehearsal before your guests arrive. A dedicated operator manages all AV throughout the event, handling transitions, troubleshooting, and adjustments in real time.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            After the event, we handle complete breakdown and collection. You don't need to manage any equipment — we take care of everything from van to venue and back again.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">AV Hire for Every Event Type</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Corporate events and product launches — Full AV packages combining LED screens, PA systems, and lighting for presentations, reveals, and entertainment. We tailor the specification to your venue and audience, whether it's a 30-person boardroom or a 500-seat ballroom.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Exhibitions and trade shows — Stand-mounted screens, LED panels for branding and product demos, PA for keynote areas, and rigging. Our equipment is designed for quick setup in exhibition halls with tight build schedules.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Gala dinners and awards nights — LED backdrops, atmospheric lighting, broadcast-quality audio for speeches and entertainment, and camera relay so every table has a clear view of the stage.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Concerts and live performances — Large-format PA systems, stage lighting rigs, LED screens for IMAG and visuals, and monitoring systems for performers. We scale from intimate 200-person venues to 5,000+ outdoor audiences.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Weddings and private events — PA systems for speeches and entertainment, uplighting for venue theming, and DJ equipment packages. Delivery, setup, and collection included.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Equipment Brands</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We use industry-leading equipment from Martin Audio, L-Acoustics, Unilumin, Absen, Samsung, LG, Shure, Sennheiser, and Chamsys. Professional-grade equipment means reliable performance, consistent quality, and the confidence that your event's technology will work flawlessly from start to finish.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">AV Hire Pricing</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            AV hire pricing depends on the equipment required, event duration, and venue location. A simple display screen and PA setup for a presentation starts from a few hundred euro. Full AV production packages with LED walls, lighting, and multi-source audio are quoted based on your specific requirements. We provide transparent, all-inclusive pricing — the quote you receive covers delivery, setup, operation, and collection with no surprise extras. Contact us with your event details for a free quote.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Why EventSound for AV Hire?</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <li>Over 20 years of AV production experience across Ireland</li>
            <li>Martin Audio, L-Acoustics, Unilumin, Chamsys — industry-leading brands</li>
            <li>Full-service: delivery, setup, operation, and collection included</li>
            <li>Individual item hire or complete AV packages</li>
            <li>Dedicated on-site technician for every event</li>
            <li>Transparent, all-inclusive pricing with no hidden fees</li>
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
