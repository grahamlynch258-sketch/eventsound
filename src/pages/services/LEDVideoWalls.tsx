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
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/site/Breadcrumb";

export default function LEDVideoWalls() {
  const faqs = [
    { question: "What pixel pitch LED wall do I need for a conference?", answer: "For conferences with viewing distances of 3 to 10 metres, we recommend 2.6mm or 3.9mm pixel pitch panels. For exhibitions where attendees stand 1 to 3 metres from the screen, 1.9mm provides the sharpest image. Our team will advise based on your venue layout and audience size." },
    { question: "Can LED walls be used outdoors?", answer: "Yes. We provide weather-rated outdoor LED panels with high-brightness output for daylight visibility. Outdoor screens typically use 3.9mm to 4.8mm pixel pitch and are mounted on freestanding ground-support structures." },
    { question: "How much does LED wall hire cost in Ireland?", answer: "LED wall hire starts from €125 per square metre per day for dry hire. Pricing varies depending on pixel pitch, screen size, and event requirements. We recommend speaking to our team to ensure you get the best setup and the most out of your budget." },
    { question: "What is the largest LED wall you can provide?", answer: "We regularly install screens up to 50m² and can configure larger displays for outdoor festivals and concerts. Screen size is limited only by venue dimensions and structural capacity." },
    { question: "What content can be displayed on LED video walls?", answer: "Anything — live camera feeds, pre-recorded video, presentations, social media walls, sponsor logos, and live event graphics. We provide full content playback and can help with content formatting to ensure it looks perfect on screen." },
    { question: "Do you provide operators with the LED screens?", answer: "Yes, all our LED wall hire packages include experienced technicians for setup, operation throughout your event, and breakdown. You never need to worry about the technical side." },
  ];

  const serviceSchema = generateServiceSchema({
    name: "LED Video Wall Hire",
    description: "LED video wall hire across Ireland. Unilumin and Absen panels from 1.9mm to 3.9mm pixel pitch for conferences, exhibitions, concerts, and corporate events.",
    url: "https://eventsound.ie/services/led-video-walls",
    provider: { name: "EventSound", url: "https://eventsound.ie" },
    areaServed: ["Dublin", "Cork", "Galway", "Belfast", "Limerick", "Ireland"],
    serviceType: "LED Video Wall Hire"
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://eventsound.ie" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "LED Video Walls", url: "https://eventsound.ie/services/led-video-walls" }
    ]
  });

  useSeo({
    title: "LED Screen Hire Ireland | LED Video Wall Rental Dublin | EventSound",
    description: "LED video wall hire across Ireland. Unilumin & Absen panels from 1.9mm to 3.9mm pixel pitch. Indoor, outdoor & curved configurations. Delivery, setup & operator included.",
    canonical: "https://eventsound.ie/services/led-video-walls",
    additionalSchemas: [
      { schema: serviceSchema, schemaId: "service-schema" },
      { schema: breadcrumbSchema, schemaId: "breadcrumb-schema" }
    ]
  });
  const { hero, gallery } = useServiceImages("service-led-walls");
  const { data: sections = [] } = useServiceSections("led-video-walls");

  return (
    <PageShell>
      <Breadcrumb items={[
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "LED Video Walls" }
      ]} />
      <PageHeader
        title="LED Screen Hire Ireland"
        subtitle="High-impact visual displays for events of every scale"
        backgroundImage={hero}
        backgroundAlt="Unilumin LED video wall installed at a corporate event in Ireland"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides LED video wall hire across Ireland for conferences, corporate events, exhibitions, awards ceremonies, concerts, and outdoor festivals. Based in Drogheda, Co. Louth, we deliver and install LED walls at venues in Dublin, Cork, Galway, Belfast, and nationwide.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We stock Unilumin and Absen LED panels in pixel pitches from 1.9mm to 3.9mm, with screen sizes from 6m² for conference presentations to 50m²+ for large-scale outdoor stages. Every hire includes delivery, installation, content management, a dedicated on-site operator, and full breakdown after your event. For individual screen and TV monitor hire for conferences and exhibitions, see our <Link to="/services/led-screen-hire/" className="text-accent hover:underline">LED Screen Hire</Link> service.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Indoor LED Wall Hire</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Indoor LED walls are the standard for corporate conferences, awards nights, AGMs, product launches, and exhibitions across Ireland. Our indoor Unilumin panels deliver high resolution and accurate colour reproduction at close viewing distances — essential when your audience is seated 3 to 10 metres from the screen.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For conferences and seminars, we recommend 2.6mm or 3.9mm pixel pitch panels depending on your venue size and viewing distance. For exhibitions and trade shows where attendees view the screen from 1 to 3 metres, our 1.9mm panels provide the sharpest detail for product imagery and video content.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Indoor LED walls replace traditional projection in venues where ambient light, ceiling height, or room layout make projectors impractical. LED panels produce their own light, so they deliver consistent brightness and contrast regardless of room lighting conditions.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Outdoor LED Wall Hire</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For outdoor events, festivals, concerts, and sports screenings, we provide weather-rated LED panels with high-brightness output visible in direct sunlight. Our outdoor screens are available in sizes from 8m² to 50m²+ and are built on freestanding ground-support structures or integrated with stage rigging.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We have provided outdoor LED walls for events including the Swords Castle Summer Concerts (main stage LED wall, PA, and lighting) and multi-day festival productions. Outdoor LED panels use a higher pixel pitch (typically 3.9mm to 4.8mm) for viewing distances of 10 metres and above, balancing image quality with the brightness needed for daylight visibility.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Curved and Custom LED Wall Configurations</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound designs and installs curved, angled, and custom-shaped LED wall configurations for immersive event experiences. Our curved Absen LED wall installation at the PRISM Immersive Technology Summit at DkIT transformed the An Macánna Theatre into an engaging conference space with a wraparound visual backdrop for speakers and demonstrations.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We also delivered a curved LED video wall installation for Beta Festival 2025 at The Digital Hub, Dublin, creating a fully immersive digital art experience for festival attendees. Custom configurations are available for product launches, experiential marketing, immersive exhibitions, and creative installations.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Hire Use Cases</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Corporate conferences and seminars — Main stage backdrop for keynote presentations, IMAG (image magnification) for large audiences, and confidence monitors for speakers. LED walls replace projection in venues with high ambient light.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Awards ceremonies and gala dinners — Full-width LED backdrops for branding, nominee graphics, winner announcements, and live camera relay so every table has a clear view of the stage.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Exhibitions and trade shows — Stand-mounted LED panels for product demonstrations, promotional video loops, and branded content. High-resolution 1.9mm panels ensure sharp visuals at close viewing distances.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Outdoor festivals and concerts — High-brightness LED screens for main stage visuals, live camera feeds, sponsor content, and audience engagement. Weather-rated panels with ground-support or rigged mounting.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Product launches and brand activations — Custom-sized screens with branded content, countdown sequences, reveal moments, and social media feeds displayed in real time.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Hybrid and virtual events — LED walls as studio backdrops for presenters, combined with camera relay for in-room and remote audiences simultaneously.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Hire Pricing Guide</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            LED wall hire starts from €125 per square metre per day for dry hire. Final pricing depends on pixel pitch (finer pitches like 1.9mm cost more than 3.9mm), total screen area, number of event days, venue access time for installation, and whether additional services such as media servers or camera switching are required. We recommend speaking to our team before booking — we'll help you choose the right specification for your venue and audience so you get the most out of your budget. Contact us for a detailed quote based on your specific event requirements.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Why Hire LED Walls from EventSound?</h2>
          <div className="text-left inline-block">
          <ul className="space-y-2 text-muted-foreground list-disc list-inside transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <li>Unilumin and Absen LED panels — industry-leading resolution and colour accuracy</li>
            <li>Over 20 years of event production experience across Ireland</li>
            <li>Full-service: delivery, installation, operation, and breakdown included</li>
            <li>Indoor and outdoor LED walls from 6m² to 50m²+</li>
            <li>Curved and custom configurations for immersive installations</li>
            <li>Works alongside your creative team or agency for content delivery</li>
            <li>Transparent pricing — no hidden fees or surprise extras</li>
            <li>Available nationwide: Dublin, Cork, Galway, Limerick, Belfast, and beyond</li>
          </ul>
          </div>

          {sections.length > 0 && <ServiceSections sections={sections} />}

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our LED Walls in Action</h2>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <StaggerItem key={img.id}>
                  <img src={img.image_url} alt={img.alt_text || "LED video wall at event"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" decoding="async" width={600} height={338} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          <BrandBanner serviceKey="led-video-walls" />

          <ScrollReveal>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Combined With</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Many of our clients combine LED video walls with <Link to="/services/lighting-design" className="text-accent hover:underline">professional event lighting</Link> and <Link to="/services/av-production" className="text-accent hover:underline">full AV production</Link> for a complete visual experience. For events with a remote audience, add our <Link to="/services/virtual-events" className="text-accent hover:underline">live streaming and hybrid event</Link> services. See how we delivered LED walls for the <Link to="/case-studies/swords-castle-summer-concerts" className="text-accent hover:underline">Swords Castle Summer Concerts</Link>.
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
            <h3 className="text-xl font-semibold mb-2">Need LED Walls for Your Event?</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">Tell us your venue, date, and requirements — we'll respond with a tailored quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
      <IrelandMap service="led-walls" />
    </PageShell>
  );
}
