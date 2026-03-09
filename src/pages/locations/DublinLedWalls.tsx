import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { useServiceImages } from "@/hooks/useServiceImages";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const DublinLedWalls = () => {
  const faqs = [
    { question: "How much does LED wall hire cost in Dublin?", answer: "LED wall hire in Dublin starts from €120 per square metre for dry hire. The total cost depends on the pixel pitch (2.6mm for fine indoor detail, up to 4.9mm for outdoor brightness), total screen area, installation requirements, and whether you need on-site technical support or content creation. Contact us with your event details for an accurate quote." },
    { question: "What size LED wall do I need for my Dublin event?", answer: "For events with fewer than 100 attendees, we recommend a 7 square metre LED wall. This delivers sharp, readable text and high-impact visuals from every seat. For plenary sessions of 200 to 500 delegates, 15 to 25 square metres is typical. For large-scale events, product launches, or gala dinners in venues like the CCD or Croke Park, we regularly install 30 to 70 square metres of LED wall with custom aspect ratios and multi-source switching." },
    { question: "What is the difference between 2.6mm and 4.9mm pixel pitch?", answer: "Pixel pitch is the distance between each LED pixel. A smaller number means higher resolution at close viewing distances. Our Absen 2.6mm panels are ideal for indoor conferences where delegates sit within a few metres of the screen — text is razor-sharp and images are highly detailed. The Unilumin 4.9mm panels are designed for outdoor events and large venues where brightness matters more than ultra-fine detail. We'll recommend the right option based on your venue and viewing distances." },
    { question: "Can you provide curved LED walls for stage designs?", answer: "Yes. We offer curved LED wall configurations using Prism panels. Curved installations are popular for stage backdrops, immersive brand experiences, and experiential events where a flat screen doesn't deliver the visual impact required. Contact us to discuss your design concept and we'll advise on what's achievable." },
  ];

  useSeo({
    title: "LED Wall Hire Dublin | LED Screen Rental for Events | EventSound",
    description: "LED wall hire in Dublin from €120/sqm. Absen 2.6mm & Unilumin panels for conferences, product launches & events at CCD, Croke Park, RDS & Dublin hotels.",
    canonical: "https://eventsound.ie/services/led-walls/dublin",
    ogTitle: "LED Wall Hire Dublin | EventSound",
    ogDescription: "LED wall hire in Dublin from €120/sqm. Absen & Unilumin panels for conferences and events.",
    ogType: "website",
  });
  const { hero } = useServiceImages("service-led-walls");

  return (
    <PageShell>
      <PageHeader
        title="LED Wall Hire in Dublin"
        subtitle="Professional LED walls for Dublin's leading conference and event venues"
        backgroundImage={hero}
        backgroundAlt="LED video wall at corporate event in Dublin"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Dublin is Ireland's largest events market. From international conferences at the Convention Centre Dublin to corporate product launches in Silicon Docks, the capital demands high-specification LED wall installations backed by experienced technical support. EventSound provides LED wall hire across Dublin, working with event organisers, production companies, and corporate clients at venues throughout the city.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Our LED Wall Range</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our LED wall inventory is built around two flagship products: the Absen 2.6mm fine pixel pitch panel for indoor use and the Unilumin 4.9mm panel for outdoor and high-brightness applications. All panels run on Novastar processing, ensuring colour accuracy and seamless switching across content sources. We also offer curved LED wall configurations using Prism panels for immersive stage designs and experiential installations.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            The Absen 2.6mm is our flagship indoor panel. At this pixel pitch, text is razor-sharp even at close viewing distances, making it ideal for conferences, presentations, and award ceremonies where delegates are seated within a few metres of the screen. The Unilumin 4.9mm is built for outdoor events and high-ambient-light environments — festivals, outdoor screenings, and exhibition spaces where brightness is critical.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Sizing for Dublin Events</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            LED wall sizing depends on your audience and venue. For conferences and presentations with fewer than 100 attendees, we recommend a 7 square metre screen — large enough to deliver sharp, readable content from every seat in the room. This is our most common configuration for hotel conference suites and boardroom-style events in Dublin.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For large-scale corporate events, product launches, and gala dinners at venues like the Convention Centre Dublin, Croke Park, or the RDS, we regularly deploy screens of 30 to 70 square metres with full custom AV switching, IMAG camera feeds, and bespoke content designed for ultra-wide display ratios. Our largest Dublin installations have reached 70 square metres of continuous LED wall with multi-source content management.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Pricing</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            LED wall hire in Dublin starts from €120 per square metre for dry hire. Final pricing depends on the pixel pitch selected (2.6mm for fine indoor detail, up to 4.9mm for outdoor brightness), total screen area, installation complexity, and whether you require content creation or on-site technical support. Curved configurations and custom aspect ratios may affect pricing.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We strongly recommend contacting us to discuss your event specification. Every venue and event is different, and we'll configure the right LED wall solution for your space, audience size, and budget.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Dublin Venues We Provide LED Walls For</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides LED wall hire at venues across Dublin, including the{" "}
            <a href="https://www.theccd.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Convention Centre Dublin (CCD)</a>,{" "}
            <a href="https://crokepark.ie/meetings-events" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Croke Park Meetings & Events</a>,{" "}
            <a href="https://www.rds.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">the RDS</a>,{" "}
            <a href="https://www.claytonhotelburlingtonroad.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Clayton Hotel Burlington Road</a>,{" "}
            <a href="https://www.anantara.com/en/the-marker-dublin" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Anantara The Marker Dublin Hotel</a>,{" "}
            <a href="https://www.radissonhotels.com/en-us/hotels/radisson-blu-dublin-royal" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Radisson Blu Royal Hotel</a>,{" "}
            <a href="https://www.castleknockhotel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Castleknock Hotel</a>,{" "}
            <a href="https://www.hyatt.com/hyatt-centric/dubct-hyatt-centric-the-liberties-dublin" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Hyatt Centric The Liberties</a>,{" "}
            <a href="https://www.thespencerhotel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Spencer Hotel</a>,{" "}
            <a href="https://www.collegegreenhoteldublin.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">College Green Hotel</a>, and{" "}
            <a href="https://www.fitzwilliamhoteldublin.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Fitzwilliam Hotel</a>.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We are familiar with the technical specifications, load-in procedures, rigging points, and power requirements at Dublin's major conference and event venues, which means faster setup times and fewer surprises on event day.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Dublin's corporate events market is concentrated around the Docklands and Grand Canal Dock (home to Google, Meta, and LinkedIn), the IFSC financial district, and the city centre hotel cluster around St Stephen's Green. We also serve venues in Dublin's suburbs including Castleknock, Leopardstown, and Dublin Airport hotels.
          </p>

          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Looking for conference AV services in Dublin? See our dedicated <Link to="/services/conference-av/dublin" className="text-accent hover:underline">Dublin Conference AV</Link> page for radio microphones, PA systems, front lighting, and on-site technician services. You can also explore our full <Link to="/services/led-video-walls" className="text-accent hover:underline">LED Video Walls</Link> service for Ireland-wide coverage.
            </p>
          </ScrollReveal>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions — LED Wall Hire Dublin</h2>
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
            <h3 className="text-xl font-semibold mb-2">Get a Quote for LED Wall Hire in Dublin</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">Whether you need a 7 square metre screen for a hotel conference or a 70 square metre installation at the Convention Centre Dublin, EventSound can help. Contact us with your event details — date, venue, audience size, and requirements — and we'll provide a detailed quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default DublinLedWalls;
