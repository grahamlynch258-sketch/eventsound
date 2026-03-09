import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const GalwayLedWalls = () => {
  const faqs = [
    { question: "How much does LED wall hire cost in Galway?", answer: "LED wall hire in Galway starts from €120 per square metre for dry hire. Total pricing depends on pixel pitch, screen area, venue logistics, and technical support requirements. Contact us with your event details for a no-obligation quote." },
    { question: "Can you provide LED walls for events along the Wild Atlantic Way?", answer: "Yes. We serve venues across the west of Ireland, from Galway city to Connemara, the Aran Islands, and County Clare. Whether your event is at a hotel in Galway city or a unique venue along the Wild Atlantic Way, we deliver the same standard of LED wall installation." },
    { question: "What LED wall size do I need for a Galway hotel ballroom?", answer: "For hotel ballrooms accommodating 200 to 500 delegates, 15 to 25 square metres is typical. For the larger ballrooms at Clayton Hotel Galway (capacity 800) or Galway Bay Hotel (combined 1,000), 25 to 40 square metres delivers maximum visual impact. Contact us with your specific venue for a tailored recommendation." },
  ];

  useSeo({
    title: "LED Wall Hire Galway | LED Screen Rental for Events | EventSound",
    description: "LED wall hire in Galway from €120/sqm. Absen 2.6mm & Unilumin panels for conferences & events at Clayton, Galway Bay Hotel, Ardilaun & Galway venues.",
    canonical: "https://eventsound.ie/services/led-walls/galway",
    ogTitle: "LED Wall Hire Galway | EventSound",
    ogDescription: "LED wall hire in Galway from €120/sqm. Absen & Unilumin panels for conferences and events.",
    ogType: "website",
  });

  return (
    <PageShell>
      <PageHeader
        title="LED Wall Hire in Galway"
        subtitle="Professional LED walls for Galway's conference and event venues"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Galway has established itself as one of Ireland's leading conference destinations. The combination of world-class hotel venues, the Wild Atlantic Way on the doorstep, and a growing technology sector (Medtronic, Boston Scientific, Cisco) creates consistent demand for professional LED wall installations. EventSound provides LED wall hire across Galway city and the wider west of Ireland.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Our LED Wall Range for Galway Events</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our LED wall range covers every Galway event requirement. The Absen 2.6mm fine pixel pitch panel is our flagship indoor product, delivering razor-sharp visuals for conferences, award ceremonies, and corporate presentations in Galway's hotel ballrooms and conference suites. For outdoor events, festivals, and high-brightness environments, we offer the Unilumin 4.9mm panel. Curved LED wall configurations using Prism panels are available for immersive stage designs at larger productions.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            All systems run on Novastar processing for accurate colour reproduction and seamless content switching across multiple input sources.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Sizing for Galway Events</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For Galway conferences with fewer than 100 attendees, a 7 square metre LED wall provides clear, readable content from every seat. Larger events in venues like Clayton Hotel Galway (capacity 800) or Galway Bay Hotel (combined capacity 1,000) may require 20 to 40 square metres of LED wall.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We have deployed screens of up to 70 square metres for major corporate events with full custom AV switching, IMAG camera feeds, and bespoke content designed for ultra-wide display ratios.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Pricing in Galway</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            LED wall hire in Galway starts from €120 per square metre for dry hire. Contact us to discuss your event and receive a tailored quote based on pixel pitch, screen area, and installation requirements.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Galway Venues We Provide LED Walls For</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides LED wall hire at Galway's leading venues, including{" "}
            <a href="https://www.claytonhotelgalway.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Clayton Hotel Galway</a>,{" "}
            <a href="https://www.galwaybayhotel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Galway Bay Hotel</a>,{" "}
            <a href="https://www.salthillhotel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Salthill Hotel</a>,{" "}
            <a href="https://www.theconnacht.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Connacht Hotel</a>,{" "}
            <a href="https://www.theardilaunhotel.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Ardilaun Hotel</a>,{" "}
            <a href="https://www.menloparkhotel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Menlo Park Hotel</a>, and{" "}
            <a href="https://www.glenloabbeyhotel.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Glenlo Abbey Hotel</a>.
            We are familiar with the technical requirements and load-in logistics at each venue, ensuring efficient setup and reliable performance.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Beyond the city, we also serve venues across the west of Ireland including Connemara, the Aran Islands (for corporate retreats), and County Clare. The Wild Atlantic Way is increasingly popular as a conference and incentive travel destination, and EventSound provides LED walls for events anywhere along the western seaboard.
          </p>

          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Looking for conference AV services in Galway? See our dedicated <Link to="/services/conference-av/galway" className="text-accent hover:underline">Galway Conference AV</Link> page for radio microphones, PA systems, front lighting, and on-site technician services. You can also explore our full <Link to="/services/led-video-walls" className="text-accent hover:underline">LED Video Walls</Link> service for Ireland-wide coverage.
            </p>
          </ScrollReveal>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions — LED Wall Hire Galway</h2>
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
            <h3 className="text-xl font-semibold mb-2">Get a Quote for LED Wall Hire in Galway</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">From conference screens at Clayton Hotel Galway to LED walls overlooking Galway Bay, EventSound delivers professional LED wall hire across the west of Ireland. Contact us with your event details for a quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default GalwayLedWalls;
