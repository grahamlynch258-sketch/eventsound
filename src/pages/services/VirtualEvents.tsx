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

export default function VirtualEvents() {
  const faqs = [
    { question: "What is a hybrid event?", answer: "A hybrid event combines a live in-person audience with a remote online audience. We provide the AV production, cameras, streaming, and platform integration to ensure both audiences have an engaging, professional experience." },
    { question: "Which virtual event platforms do you support?", answer: "We work with all major platforms including Zoom, Microsoft Teams, Hopin, Webex, YouTube Live, Vimeo, and custom RTMP solutions. We can also recommend the best platform for your specific event requirements and audience size." },
    { question: "Can virtual attendees interact with the live event?", answer: "Yes — we set up live Q&A, polling, chat moderation, and remote speaker integration so virtual attendees can participate fully. We have produced events where remote panellists appear on the main stage LED screens alongside in-person speakers." },
    { question: "What equipment is needed at the venue for a hybrid event?", answer: "At minimum: cameras, microphones, an encoding system, and a reliable internet connection. For a professional production, we add LED screens for remote speaker display, graphics overlays, and a dedicated streaming operator." },
    { question: "How reliable is live streaming for important events?", answer: "Very reliable with proper planning. We use broadcast-grade encoders, redundant internet connections (wired + bonded cellular), and monitoring throughout. In three decades of production, we have built robust failover systems for mission-critical streams." },
    { question: "Do you provide a studio for virtual events?", answer: "We can transform any suitable space into a professional virtual studio with branded backdrops, lighting, cameras, and teleprompters. We also work with dedicated studio venues in Dublin if you need a purpose-built environment." }
  ];

  const serviceSchema = generateServiceSchema({
    name: "Virtual & Hybrid Event Production",
    description: "Virtual and hybrid event production in Ireland. Professional live streaming, multi-camera switching, branded graphics and remote audience engagement.",
    url: "https://eventsound.ie/services/virtual-events",
    provider: { name: "EventSound", url: "https://eventsound.ie" },
    areaServed: ["Dublin", "Cork", "Galway", "Belfast", "Limerick", "Ireland"],
    serviceType: "Virtual Event Production"
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://eventsound.ie" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "Virtual & Hybrid Events", url: "https://eventsound.ie/services/virtual-events" }
    ]
  });

  useSeo({
    title: "Hybrid Event Production Ireland | Live Streaming & Virtual Events | EventSound",
    description: "Virtual & hybrid event production in Ireland. Professional live streaming, multi-camera switching, branded graphics & remote audience engagement. Full technical management.",
    canonical: "https://eventsound.ie/services/virtual-events",
    additionalSchemas: [
      { schema: serviceSchema, schemaId: "service-schema" },
      { schema: breadcrumbSchema, schemaId: "breadcrumb-schema" }
    ]
  });
  const { hero, gallery } = useServiceImages("service-virtual");
  const { data: sections = [] } = useServiceSections("virtual-events");

  return (
    <PageShell>
      <Breadcrumb items={[
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Virtual & Hybrid Events" }
      ]} />
      <PageHeader
        title="Hybrid Event Production Ireland"
        subtitle="Professional production for online and hybrid audiences"
        backgroundImage={hero}
        backgroundAlt="Virtual event production studio setup in Ireland"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound delivers professional virtual and hybrid event production for corporate clients, agencies, and organisations across Ireland. Whether your event is fully online, has a live audience with remote viewers, or combines multiple locations, we provide the technical infrastructure and production expertise to make it seamless.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Hybrid Event Solutions</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Hybrid events combine a live in-person experience with a professional broadcast for remote attendees. EventSound manages both sides — delivering full AV production for the venue while simultaneously streaming to online platforms with broadcast-quality video, graphics, and audience interaction tools. We ensure remote viewers get the same polished experience as those in the room.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Virtual Event Studio Setups</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For fully virtual events, we can transform any venue or meeting room into a professional broadcast studio. This includes multi-camera setups, branded backdrops, professional lighting, a teleprompter, and dedicated internet connectivity. We manage the entire technical production so your presenters can focus on delivering their content with confidence.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Why EventSound for Virtual Events?</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <li>End-to-end hybrid and virtual event production</li>
            <li>Professional studio setups in any venue</li>
            <li>Live streaming with branded graphics and overlays</li>
            <li>Audience interaction: Q&A, polls, chat moderation</li>
            <li>Dedicated technical team managing the entire broadcast</li>
          </ul>
          </div>

          {sections.length > 0 && <ServiceSections sections={sections} />}

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our Virtual Event Work</h2>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <StaggerItem key={img.id}>
                  <img src={img.image_url} alt={img.alt_text || "Virtual event production studio setup"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" decoding="async" width={600} height={338} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          <BrandBanner serviceKey="virtual-events" />

          <ScrollReveal>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Combined With</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Hybrid events benefit from <Link to="/services/video-production" className="text-accent hover:underline">professional video production</Link> for multi-camera streaming. Many clients add <Link to="/services/led-video-walls" className="text-accent hover:underline">LED video walls</Link> for in-room visuals and <Link to="/services/conference-av-hire" className="text-accent hover:underline">conference AV</Link> including lectern mics and confidence monitors.
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
            <h3 className="text-xl font-semibold mb-2">Planning a Virtual or Hybrid Event?</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">Tell us your event format and audience — we'll design a production plan and quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
