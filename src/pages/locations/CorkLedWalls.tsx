import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const CorkLedWalls = () => {
  const faqs = [
    { question: "How much does LED wall hire cost in Cork?", answer: "LED wall hire in Cork starts from €120 per square metre for dry hire. The final price depends on pixel pitch (2.6mm fine pitch for indoor presentations, 4.9mm for outdoor or high-brightness applications), total screen area, installation complexity, and whether on-site technical support is required. Contact us for a no-obligation quote." },
    { question: "Can you set up LED walls at Cork City Hall?", answer: "Yes. We have experience installing LED walls at large civic and exhibition venues. Cork City Hall's events space accommodates up to 1,000 people and is regularly used for conferences, exhibitions, and corporate events. We work with the venue's technical team to manage load-in, power distribution, and rigging requirements." },
    { question: "What LED wall size is right for a Cork hotel conference?", answer: "For hotel conference suites with fewer than 100 delegates, a 7 square metre LED wall provides excellent visibility. For larger ballrooms accommodating 200 to 500 delegates, 15 to 25 square metres is typical. For major events at Rochestown Park (capacity 1,200), 30 to 40 square metres delivers maximum visual impact. Contact us with your venue and audience size for a specific recommendation." },
  ];

  useSeo({
    title: "LED Wall Hire Cork | LED Screen Rental for Events | EventSound",
    description: "LED wall hire in Cork from €120/sqm. Absen 2.6mm & Unilumin panels for conferences, exhibitions & events at Rochestown Park, Clayton & Cork venues.",
    canonical: "https://eventsound.ie/services/led-walls/cork",
    ogTitle: "LED Wall Hire Cork | EventSound",
    ogDescription: "LED wall hire in Cork from €120/sqm. Absen & Unilumin panels for conferences and events.",
    ogType: "website",
  });

  return (
    <PageShell>
      <PageHeader
        title="LED Wall Hire in Cork"
        subtitle="Professional LED walls for Cork's conference and corporate event venues"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Cork is Ireland's second city and a major hub for pharmaceutical, technology, and life sciences companies including Apple, Pfizer, Johnson & Johnson, and Dell. These industries drive consistent demand for high-quality LED wall installations at Cork's hotels and event venues for conferences, product launches, award ceremonies, and corporate presentations. EventSound serves the Cork market with the same equipment and technical standards we deliver nationwide.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Our LED Wall Range for Cork Events</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our LED wall systems are purpose-built for the demands of Cork's conference and corporate events market. The Absen 2.6mm fine pixel pitch panel delivers razor-sharp images for indoor presentations, product launches, and award ceremonies where visual clarity is essential. For outdoor events or high-ambient-light environments, the Unilumin 4.9mm panel provides ultra-bright output that remains vivid in daylight conditions.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            All systems run on Novastar processing for accurate colour reproduction and reliable content switching. Curved LED wall configurations using Prism panels are available for stage designs and immersive installations.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Sizing for Cork Events</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For Cork conferences with fewer than 100 delegates, we recommend a 7 square metre LED wall — sufficient for clear visibility from every seat in a standard hotel conference suite. Larger events at venues like Rochestown Park Hotel or Cork City Hall may require 20 to 40 square metres of LED wall, with IMAG camera feeds and multi-source switching.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We have provided LED installations of up to 70 square metres for major corporate events with full custom content and ultra-wide display configurations.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Pricing in Cork</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            LED wall hire in Cork starts from €120 per square metre for dry hire. Pricing depends on pixel pitch, screen area, venue access requirements, and technical support. Contact us with your event specification for an accurate quote.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Cork Venues We Provide LED Walls For</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides LED wall hire across Cork's leading venues, including{" "}
            <a href="https://www.rochestownpark.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Rochestown Park Hotel & Conference Centre</a>,{" "}
            <a href="https://www.radissonhotels.com/en-us/hotels/radisson-blu-cork" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Radisson Blu Hotel Cork</a>,{" "}
            <a href="https://www.claytonhotelsilversprings.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Clayton Hotel Silver Springs</a>,{" "}
            <a href="https://www.fotaisland.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Fota Island Resort</a>,{" "}
            <a href="https://www.doylehotels.ie/the-river-lee-hotel" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The River Lee Hotel</a>,{" "}
            <a href="https://www.flynnhotels.com/hotels/imperial-hotel-cork" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Imperial Hotel Cork</a>,{" "}
            <a href="https://thedean.ie/cork" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Dean Cork</a>,{" "}
            <a href="https://www.theaddresscork.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Address Cork</a>,{" "}
            <a href="https://www.claytonhotelcorkcity.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Clayton Hotel Cork City</a>, and{" "}
            <a href="https://www.corkcity.ie/en/cork-city-hall/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Cork City Hall</a>.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Cork's pharmaceutical and technology sector generates significant demand for LED walls at corporate conferences, product launches, and training events. Companies based in Cork's business parks frequently require high-specification visual displays for internal and client-facing events.
          </p>

          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Looking for conference AV services in Cork? See our dedicated <Link to="/services/conference-av/cork" className="text-accent hover:underline">Cork Conference AV</Link> page for radio microphones, PA systems, front lighting, and on-site technician services. You can also explore our full <Link to="/services/led-video-walls" className="text-accent hover:underline">LED Video Walls</Link> service for Ireland-wide coverage.
            </p>
          </ScrollReveal>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions — LED Wall Hire Cork</h2>
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
            <h3 className="text-xl font-semibold mb-2">Get a Quote for LED Wall Hire in Cork</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">From LED walls at Rochestown Park to installations at Cork City Hall, EventSound delivers professional LED wall hire across Cork. Contact us with your event details and we'll provide a quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default CorkLedWalls;
