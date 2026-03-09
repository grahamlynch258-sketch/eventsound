import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { useServiceImages } from "@/hooks/useServiceImages";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const LimerickLedWalls = () => {
  const faqs = [
    { question: "How much does LED wall hire cost in Limerick?", answer: "LED wall hire in Limerick starts from €120 per square metre for dry hire. Pricing depends on pixel pitch, screen area, installation requirements, and technical support. Contact us for a detailed, no-obligation quote." },
    { question: "Can you provide LED walls for the Limerick Strand Hotel's Shannon Suite?", answer: "Yes. The Shannon Suite accommodates up to 600 delegates and is one of Limerick's premier conference spaces. We provide LED wall installations of 20 to 40 square metres for events in this venue, with the ability to scale up for larger configurations. We are familiar with the venue's load-in access and power distribution." },
    { question: "Do you cover the wider Shannon region?", answer: "Yes. We serve events across Limerick city and the wider Shannon region, including Ennis, Shannon town, North Tipperary, and surrounding areas." },
  ];

  useSeo({
    title: "LED Wall Hire Limerick | LED Screen Rental for Events | EventSound",
    description: "LED wall hire in Limerick from €120/sqm. Absen 2.6mm & Unilumin panels for Limerick Strand Hotel, UL, Clayton & Limerick venues.",
    canonical: "https://eventsound.ie/services/led-walls/limerick",
    ogTitle: "LED Wall Hire Limerick | EventSound",
    ogDescription: "LED wall hire in Limerick from €120/sqm. Absen & Unilumin panels for conferences and events.",
    ogType: "website",
  });
  const { hero } = useServiceImages("service-led-walls");

  return (
    <PageShell>
      <PageHeader
        title="LED Wall Hire in Limerick"
        subtitle="Professional LED walls for Limerick and the Shannon region"
        backgroundImage={hero}
        backgroundAlt="LED video wall at corporate event in Limerick"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Limerick is the gateway to the Wild Atlantic Way and the Shannon region's primary conference destination. The city's strategic location — under two hours from Dublin, under two hours from Cork, and one hour from Galway — makes it a natural choice for national events. With Shannon International Airport just 15 minutes away, Limerick also attracts international conferences. EventSound provides LED wall hire across Limerick and the wider Shannon region.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Our LED Wall Range for Limerick Events</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our LED wall systems meet the requirements of Limerick's conference and events market. The Absen 2.6mm fine pixel pitch panel provides sharp, detailed visuals for indoor conferences at venues like the Limerick Strand Hotel and University of Limerick. The Unilumin 4.9mm panel is available for outdoor events and high-brightness environments.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Curved LED configurations using Prism panels are available for stage designs and immersive presentations. All systems run on Novastar processing for reliable colour accuracy and multi-source content management.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Sizing for Limerick Events</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For Limerick conferences with fewer than 100 delegates, we recommend a 7 square metre LED wall. The Limerick Strand Hotel's Shannon Suite, which accommodates up to 600 delegates, may require 20 to 40 square metres of LED wall for full visual impact.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For major corporate events, we deploy screens of up to 70 square metres with custom content and multi-source switching.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Pricing in Limerick</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            LED wall hire in Limerick starts from €120 per square metre for dry hire. Contact us with your event details for an accurate quote based on pixel pitch, screen area, and installation requirements.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Limerick Venues We Provide LED Walls For</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides LED wall hire at Limerick's leading venues, including{" "}
            <a href="https://www.strandhotellimerick.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Limerick Strand Hotel</a>,{" "}
            <a href="https://www.ul.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">University of Limerick</a>,{" "}
            <a href="https://www.radissonhotels.com/en-us/hotels/radisson-blu-limerick" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Radisson Blu Hotel Limerick</a>,{" "}
            <a href="https://www.claytonhotellimerick.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Clayton Hotel Limerick</a>,{" "}
            <a href="https://www.greenhillsgroup.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Greenhills Hotel</a>,{" "}
            <a href="https://www.southcourthotel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">South Court Hotel</a>,{" "}
            <a href="https://www.castletroypark.ie" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Castletroy Park Hotel</a>, and{" "}
            <a href="https://www.adaremanor.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Adare Manor</a>.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Limerick's pharmaceutical and technology sector — Analog Devices, Cook Medical, Northern Trust, and others — generates demand for LED walls at corporate conferences, product launches, and training events throughout the year.
          </p>

          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Looking for conference AV services in Limerick? See our dedicated <Link to="/services/conference-av/limerick" className="text-accent hover:underline">Limerick Conference AV</Link> page for radio microphones, PA systems, front lighting, and on-site technician services. You can also explore our full <Link to="/services/led-video-walls" className="text-accent hover:underline">LED Video Walls</Link> service for Ireland-wide coverage.
            </p>
          </ScrollReveal>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions — LED Wall Hire Limerick</h2>
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
            <h3 className="text-xl font-semibold mb-2">Get a Quote for LED Wall Hire in Limerick</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">From LED walls at the Limerick Strand Hotel to installations at the University of Limerick, EventSound delivers professional LED wall hire across the Shannon region. Contact us for a quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default LimerickLedWalls;
