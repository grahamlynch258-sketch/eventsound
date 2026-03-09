import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const AthaloneLedWalls = () => {
  const faqs = [
    { question: "How much does LED wall hire cost in Athlone?", answer: "LED wall hire in Athlone and the Midlands starts from €120 per square metre for dry hire. Final pricing depends on pixel pitch, screen area, installation requirements, and technical support. Contact us for a detailed quote." },
    { question: "Can you provide LED walls at Hodson Bay Hotel?", answer: "Yes. Hodson Bay Hotel is one of Ireland's premier conference venues with 10 purpose-built conference suites accommodating over 1,000 delegates across combined spaces. We provide LED wall installations for events at Hodson Bay, from boardroom presentations to large-scale national conferences." },
    { question: "Why choose Athlone for a national conference with LED walls?", answer: "Athlone is Ireland's geographic centre. Delegates from Dublin, Galway, Cork, and Limerick can all reach Athlone within 90 minutes to two hours. This makes it the most accessible location for national events. Combined with Hodson Bay Hotel's 30+ years of conference experience and the Sheraton's flagship facilities, Athlone offers convenience, quality venues, and professional LED wall installations." },
  ];

  useSeo({
    title: "LED Wall Hire Athlone | LED Screen Rental Midlands Ireland | EventSound",
    description: "LED wall hire in Athlone & Ireland's Midlands from €120/sqm. Absen 2.6mm & Unilumin panels for Hodson Bay Hotel, Sheraton Athlone & Midlands venues.",
    canonical: "https://eventsound.ie/services/led-walls/athlone",
    ogTitle: "LED Wall Hire Athlone | EventSound",
    ogDescription: "LED wall hire in Athlone & the Midlands from €120/sqm. Absen & Unilumin panels for conferences.",
    ogType: "website",
  });

  return (
    <PageShell>
      <PageHeader
        title="LED Wall Hire in Athlone & the Midlands"
        subtitle="Professional LED walls at Ireland's geographic centre"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Athlone sits at the geographic centre of Ireland, at the crossroads of the M6 Dublin–Galway motorway and the River Shannon. This central location has made the town one of Ireland's most popular conference destinations, with delegates able to reach Athlone from Dublin, Galway, Cork, and Limerick within 90 minutes to two hours. EventSound provides LED wall hire across Athlone and the wider Midlands region.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Our LED Wall Range for Midlands Events</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our LED wall inventory serves the Midlands conference market with the same specifications we deliver nationwide. The Absen 2.6mm fine pixel pitch panel provides sharp, detailed visuals for indoor conferences and corporate events. The Unilumin 4.9mm panel is available for outdoor installations and high-brightness applications.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Curved LED configurations using Prism panels and Novastar processing ensure seamless content delivery across all setups.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Sizing for Midlands Events</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For Midlands conferences with fewer than 100 delegates, a 7 square metre LED wall delivers clear visibility throughout the room. Hodson Bay Hotel's larger conference suites, which accommodate over 1,000 delegates across combined spaces, may require 25 to 50 square metres of LED wall.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For major corporate events, we deploy screens of up to 70 square metres with full custom AV switching and bespoke content.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Wall Pricing in the Midlands</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            LED wall hire in Athlone and the Midlands starts from €120 per square metre for dry hire. Contact us to discuss your event requirements and receive a tailored quote.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Athlone & Midlands Venues We Provide LED Walls For</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides LED wall hire at the Midlands' leading venues, including{" "}
            <a href="https://www.hodsonbayhotel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Hodson Bay Hotel</a> (10 conference suites, capacity 1,000+),{" "}
            <a href="https://www.marriott.com/hotels/travel/knosh-sheraton-athlone-hotel" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Sheraton Athlone Hotel</a> (11 conference suites, Sheraton's flagship Irish property), and{" "}
            <a href="https://www.radissonhotels.com/en-us/hotels/radisson-blu-athlone" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Radisson Blu Hotel Athlone</a>.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Hodson Bay Hotel's lakeside setting on Lough Ree provides a distinctive backdrop for conferences, while the Sheraton's town-centre location offers convenience and accessibility. Both venues regularly host national events that require high-specification LED wall installations.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Beyond Athlone, we serve venues across the Midlands including Westmeath, Offaly, Laois, Roscommon, and Longford. The region's motorway connections (M6, M4) and rail links make it accessible from every major Irish city.
          </p>

          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Looking for conference AV services in the Midlands? See our dedicated <Link to="/services/conference-av/athlone" className="text-accent hover:underline">Athlone Conference AV</Link> page for radio microphones, PA systems, front lighting, and on-site technician services. You can also explore our full <Link to="/services/led-video-walls" className="text-accent hover:underline">LED Video Walls</Link> service for Ireland-wide coverage.
            </p>
          </ScrollReveal>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions — LED Wall Hire Athlone</h2>
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
            <h3 className="text-xl font-semibold mb-2">Get a Quote for LED Wall Hire in the Midlands</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">From LED walls at Hodson Bay Hotel to installations at the Sheraton Athlone, EventSound delivers professional LED wall hire across Ireland's Midlands. Contact us with your event details for a quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default AthaloneLedWalls;
