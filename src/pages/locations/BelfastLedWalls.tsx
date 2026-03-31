import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { useServiceImages } from "@/hooks/useServiceImages";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/site/Breadcrumb";

const BelfastLedWalls = () => {
  const faqs = [
    { question: "How much does LED wall hire cost in Belfast?", answer: "LED wall hire in Belfast starts from approximately £105 per square metre for dry hire (about €120). Final pricing depends on pixel pitch, screen area, installation requirements, and technical support. We can quote in either GBP or EUR. Contact us for a detailed quote." },
    { question: "Do you operate cross-border from the Republic of Ireland?", answer: "Yes. EventSound operates across the island of Ireland. Belfast is readily accessible from our base and we regularly provide LED walls at venues in Belfast and across Northern Ireland. Equipment transport across the border is routine and there are no customs complications for temporary event equipment." },
    { question: "Can you install LED walls at ICC Belfast?", answer: "Yes. We provide LED wall installations at ICC Belfast, including its main auditorium, exhibition hall, and breakout spaces. Our team is familiar with ICC Belfast's technical infrastructure, power distribution, and load-in procedures, ensuring efficient setup and reliable performance." },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://eventsound.ie" },
      { name: "Services", url: "https://eventsound.ie/services" },
      { name: "LED Video Walls", url: "https://eventsound.ie/services/led-video-walls" },
      { name: "LED Walls Belfast", url: "https://eventsound.ie/services/led-walls/belfast" },
    ],
  });

  useSeo({
    title: "LED Wall Hire Belfast | LED Screen Rental Northern Ireland | EventSound",
    description: "LED video wall hire in Belfast. Unilumin & Absen LED panels for conferences, exhibitions & corporate events across Northern Ireland. Delivery & setup included.",
    canonical: "https://eventsound.ie/services/led-walls/belfast",
    ogTitle: "LED Wall Hire Belfast | EventSound",
    ogDescription: "LED wall hire in Belfast from £105/sqm. Cross-border service for conferences and events.",
    ogType: "website",
    additionalSchemas: [
      { schema: breadcrumbSchema, schemaId: "breadcrumb-schema" }
    ],
  });
  const { hero } = useServiceImages("service-led-walls");

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "LED Video Walls", href: "/services/led-video-walls" },
          { name: "Belfast" },
        ]}
      />
      <PageHeader
        title="LED Wall Hire in Belfast"
        subtitle="Cross-border LED wall hire for Belfast's world-class conference venues"
        backgroundImage={hero}
        backgroundAlt="LED video wall at corporate event in Belfast"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Belfast is one of Europe's leading conference destinations, recognised with multiple Best Conference Destination awards. ICC Belfast is a world-class convention centre with over 75,000 square feet of event space, and Titanic Belfast provides unique exhibition and conference spaces in one of the world's most architecturally distinctive buildings. EventSound provides LED wall hire in Belfast and across Northern Ireland, operating cross-border from our base in Ireland.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Our LED Wall Range for Belfast Events</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our LED wall systems are regularly deployed at Belfast's conference and exhibition venues. The Absen 2.6mm fine pixel pitch panel delivers sharp indoor visuals for conferences and corporate presentations at ICC Belfast and the city's hotel venues. The Unilumin 4.9mm panel provides high-brightness output for exhibition halls and outdoor events.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Curved LED wall configurations are available for stage designs and immersive installations at venues like Titanic Belfast. All systems run on Novastar processing for accurate colour reproduction and reliable multi-source content switching.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Sizing for Belfast Events</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For Belfast conferences with fewer than 100 delegates, a 7 square metre LED wall provides clear visibility throughout the room. ICC Belfast's larger conference spaces and the Titanic Exhibition Centre may require 25 to 50 square metres of LED wall for maximum visual impact.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We have deployed LED installations of up to 70 square metres for major corporate events with full custom content switching and multi-camera IMAG feeds.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Pricing in Belfast</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            LED wall hire in Belfast starts from £105 per square metre for dry hire (approximately €120). Contact us with your event specification and we'll provide a detailed quote in either GBP or EUR.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Cross-Border LED Wall Service</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Operating cross-border is straightforward. Belfast is easily accessible from our base and we regularly transport equipment across the border for events in Northern Ireland. There are no customs complications for temporary equipment movements, and we are experienced in the logistics of cross-border event production.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Belfast Venues We Provide LED Walls For</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides LED wall hire at Belfast's leading venues, including{" "}
            <a href="https://www.iccbelfast.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">ICC Belfast</a>,{" "}
            <a href="https://www.titanicbelfast.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Titanic Belfast</a>,{" "}
            <a href="https://www.titanicexhibitioncentre.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Titanic Exhibition Centre</a>,{" "}
            <a href="https://www.waterfront.co.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Waterfront Hall</a>,{" "}
            <a href="https://www.belfastcity.gov.uk/cityhall" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Belfast City Hall</a>,{" "}
            <a href="https://www.hastingshotels.com/europa-belfast" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Europa Hotel</a>,{" "}
            <a href="https://www.hastingshotels.com/grand-central" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Grand Central Hotel</a>, and{" "}
            <a href="https://www.hilton.com/en/hotels/bfsblhi-hilton-belfast" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Hilton Belfast</a>.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            The Titanic Quarter is Belfast's premier events district, combining the architectural spectacle of Titanic Belfast with the convention facilities of ICC Belfast and the Titanic Exhibition Centre. EventSound has experience working across this district and understands the venue-specific requirements for each space.
          </p>

          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Looking for conference AV services in Belfast? See our dedicated <Link to="/services/conference-av/belfast" className="text-accent hover:underline">Belfast Conference AV</Link> page for radio microphones, PA systems, front lighting, and on-site technician services. You can also explore our full <Link to="/services/led-video-walls" className="text-accent hover:underline">LED Video Walls</Link> service for Ireland-wide coverage.
            </p>
          </ScrollReveal>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions — LED Wall Hire Belfast</h2>
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
            <h3 className="text-xl font-semibold mb-2">Get a Quote for LED Wall Hire in Belfast</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">From LED walls at ICC Belfast to installations at the Titanic Exhibition Centre, EventSound delivers cross-border LED wall hire across Northern Ireland. Contact us with your event details for a quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default BelfastLedWalls;
