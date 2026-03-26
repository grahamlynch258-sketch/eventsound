import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { useServiceImages } from "@/hooks/useServiceImages";

export default function LEDScreenHire() {
  const { hero } = useServiceImages("service-led-screen-hire");
  const faqs = [
    { question: "What size LED screen do I need for my event?", answer: "For a boardroom or small meeting of up to 20 people, a 55-inch to 65-inch screen works well. For conference rooms with 50 to 100 delegates, we recommend 75-inch to 86-inch displays. For audiences over 100, consider multiple screens or our LED video wall service for maximum visibility. The ideal size depends on viewing distance, venue lighting, and content type — contact us and we'll recommend the best setup for your space." },
    { question: "Can I hire a single TV screen for a one-day event?", answer: "Yes. We offer screen hire for any duration from a single day to multi-week installations. Single-day corporate events, conferences, and product launches are our most common booking type. Every hire includes delivery, setup, and collection regardless of duration." },
    { question: "Do you provide stands and mounts for hired screens?", answer: "Every screen hire comes with a professional freestanding floor stand as standard. We also offer table-top stands for smaller displays and wall-mount brackets where the venue allows. All stands are height-adjustable and designed for event use — they're stable, look professional, and can be repositioned during the event if needed." },
    { question: "Can you set up video conferencing on a hired screen?", answer: "Yes. We regularly set up screens for hybrid events with Microsoft Teams, Zoom, and Google Meet. We can provide the screen, a conference camera, ceiling or table microphones, and a speaker system — everything needed for remote participants to see and hear the room clearly. This is popular for AGMs, board meetings, and corporate town halls with remote attendees." },
    { question: "What is the difference between an LED screen and an LED video wall?", answer: "An LED screen is a single display unit — like a large TV or monitor — typically ranging from 43 to 98 inches. An LED video wall is built from multiple modular LED panels tiled together to create a seamless display that can be any size, commonly from 6 to 50 square metres. LED screens are ideal for conferences, exhibitions, and meeting rooms. LED video walls are used for main stage visuals, concert backdrops, large conference keynotes, and outdoor events. We offer both — see our LED Video Wall Hire page for modular panel installations." },
    { question: "How much does LED screen hire cost in Ireland?", answer: "Every EventSound screen hire is quoted on an all-inclusive basis covering the screen, stand, cabling, delivery, setup, on-site support, and collection. Pricing depends on screen size, quantity, duration, and venue location. Contact us for a free, no-obligation quote — we'll recommend the best setup for your event and provide a clear breakdown with no hidden fees." },
  ];

  const serviceSchema = generateServiceSchema({
    name: "LED Screen & TV Hire",
    description: "Professional LED screen and TV hire for conferences, exhibitions, and corporate events across Ireland. Screens from 43 inches to 98 inches with delivery, setup, and on-site support included.",
    url: "https://eventsound.ie/services/led-screen-hire/",
    provider: { name: "EventSound", url: "https://eventsound.ie/" },
    areaServed: ["Dublin", "Cork", "Galway", "Belfast", "Limerick", "Ireland"],
    serviceType: "LED Screen Hire"
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://eventsound.ie/" },
      { name: "Services", url: "https://eventsound.ie/services/" },
      { name: "LED Screen Hire", url: "https://eventsound.ie/services/led-screen-hire/" }
    ]
  });

  const faqSchema = generateFAQSchema({ questions: faqs });

  useSeo({
    title: "LED Screen Hire Ireland | TV Screen & Monitor Rental for Events | EventSound",
    description: "Professional LED screen and TV hire for conferences, exhibitions, and corporate events across Ireland. Screens from 43\" to 98\". Delivery, setup, and on-site support included. Get a free quote.",
    canonical: "https://eventsound.ie/services/led-screen-hire/",
    additionalSchemas: [
      { schema: serviceSchema, schemaId: "service-schema" },
      { schema: breadcrumbSchema, schemaId: "breadcrumb-schema" },
      { schema: faqSchema, schemaId: "faq-schema" }
    ]
  });

  return (
    <PageShell>
      <Breadcrumb items={[
        { name: "Home", href: "/" },
        { name: "Services", href: "/services/" },
        { name: "LED Screen Hire" }
      ]} />
      <PageHeader
        title="LED Screen & TV Hire Ireland"
        subtitle="Professional screen and monitor hire for conferences, exhibitions, and corporate events"
        backgroundImage={hero}
        backgroundAlt="LED screen and TV monitor hire for corporate events in Ireland"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides LED screen and TV monitor hire for corporate events, conferences, exhibitions, and trade shows across Dublin, Cork, Galway, Belfast, and nationwide Ireland. Whether you need a single large-format display for a boardroom presentation or a multi-screen setup across an exhibition floor, we supply the screens, stands, cabling, and on-site technical support as part of every hire.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our LED screen hire service covers individual displays from 43 inches to 98 inches — ideal for venues and events where a full LED video wall isn't required but you still need professional, high-brightness visually impactful displays. For larger video wall installations using modular LED panels, see our <Link to="/services/led-video-walls/" className="text-accent hover:underline">LED Video Wall Hire</Link> service.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Conference & Meeting Screen Hire</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Large-format LED screens and TV monitors are the standard for corporate conferences, seminars, AGMs, and company meetings across Ireland. We provide high-resolution displays that connect to laptops, tablets, and video conferencing platforms including Microsoft Teams, Zoom, and Google Meet.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For conference presentations, our 65-inch to 86-inch screens deliver sharp text and clear visuals at viewing distances of 3 to 15 metres, making them suitable for rooms of 20 to 200 delegates. Every screen hire includes a freestanding floor stand, HDMI and USB-C connectivity, and setup by our technical crew.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We regularly provide conference screen hire for events hosted by organisations including Fingal County Council, Louth Local Enterprise Office, and corporate clients across Dublin and the wider Leinster region. For multi-room conferences, we can deploy screens in the main hall, breakout rooms, registration areas, and speaker preparation rooms simultaneously.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Exhibition & Trade Show Screen Hire</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Freestanding LED screens and digital signage displays bring exhibition stands to life. We supply screens in both portrait and landscape orientation, pre-loaded with your content — whether that's looping video, product presentations, branded graphics, or live social media feeds.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For trade shows and exhibitions, a well-placed screen draws foot traffic and gives your stand a professional edge. We handle content loading before the event and can update content on-site if needed. Screen sizes from 43 inches for smaller stands to 75 inches or larger for headline exhibitors are available.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound has provided exhibition screen hire for events including Local Enterprise Week showcases, PRISM conferences, product launches, and multi-day trade exhibitions across venues in Dublin, Cork, and Galway.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Digital Signage & Wayfinding Screens</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For larger events, festivals, and multi-venue conferences, we supply digital signage screen deployments for wayfinding, schedules, sponsor branding, and attendee information. Multiple screens can be placed at entrances, corridors, and key decision points throughout a venue, each displaying tailored content.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Content scheduling lets you display different information at different times — morning session details, lunch menus, afternoon agendas — all managed by our technical crew on the day. This is particularly useful for all-day conferences, award ceremonies, and corporate events with multiple concurrent sessions.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">TV Screen Hire for Events</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Sometimes a straightforward TV screen is exactly what's needed. For product demonstrations, behind-the-scenes content at award nights, photo slideshows at social events, or sponsor branding in reception areas, a high-quality TV screen on a professional stand delivers the message without the complexity of a full AV setup.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our TV hire service includes smart TVs with USB media playback, so you can simply plug in a USB drive with your content. For more complex requirements, we can provide media players, content scheduling systems, or a live laptop feed.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Why Choose EventSound for Screen Hire</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <li>Professional-grade LED screens and TV monitors — not consumer-grade equipment</li>
            <li>Screen sizes from 43 inches to 98 inches to suit any venue</li>
            <li>Freestanding floor stands, table mounts, and wall-mount options</li>
            <li>HDMI, USB-C, and wireless connectivity for laptops and conferencing systems</li>
            <li>Content loading and management included — send us your files, we handle the rest</li>
            <li>Full-service hire: delivery, installation, testing, on-site support, and collection</li>
            <li>Over 20 years of event production experience across Ireland</li>
            <li>Available nationwide: Dublin, Cork, Galway, Limerick, Belfast, and beyond</li>
          </ul>
          </div>

          <ScrollReveal>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Combined With</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Many of our clients combine LED screen hire with <Link to="/services/av-production/" className="text-accent hover:underline">full AV production</Link> for conferences and corporate events. For larger visual displays using modular panels, see our <Link to="/services/led-video-walls/" className="text-accent hover:underline">LED Video Wall Hire</Link> service. Add <Link to="/services/virtual-events/" className="text-accent hover:underline">live streaming and hybrid event</Link> production for remote audiences.
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
            <h3 className="text-xl font-semibold mb-2">Need Screen Hire for Your Event?</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">Tell us your venue, date, and requirements — we'll respond with a tailored quote within 24 hours.</p>
            <Link to="/contact/"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
