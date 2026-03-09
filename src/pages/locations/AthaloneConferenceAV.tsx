import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { useServiceImages } from "@/hooks/useServiceImages";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const AthaloneConferenceAV = () => {
  const faqs = [
    { question: "What does conference AV cost in Athlone?", answer: "We provide bespoke quotations based on your event's specific requirements. Contact us with your event details for a detailed quote within 24 hours." },
    { question: "Can you provide conference AV at Hodson Bay Hotel?", answer: "Yes. Hodson Bay Hotel has been hosting conferences for over 30 years and is one of Ireland's premier conference venues. We provide conference AV for events across their 10 purpose-built conference suites, from boardroom meetings to large-scale national conferences." },
    { question: "Do you cover the wider Midlands beyond Athlone?", answer: "Yes. We serve events across the Midlands including Westmeath, Offaly, Laois, Roscommon, and Longford. Athlone's central motorway connections make it straightforward to deploy equipment and technical staff anywhere in the region." },
    { question: "Why choose Athlone for a national conference?", answer: "Athlone is Ireland's geographic centre. Delegates from every major city can reach Athlone within 90 minutes to two hours, making it the most accessible location for national events. Combined with Hodson Bay Hotel's 30+ years of conference experience and the Sheraton's flagship facilities, Athlone offers both convenience and quality for national gatherings." },
  ];

  useSeo({
    title: "Conference AV Services Athlone | AV Hire Midlands Ireland | EventSound",
    description: "Professional conference AV in Athlone & Ireland's Midlands. Radio mics, PA systems, front lighting, livestreaming. Hodson Bay Hotel, Sheraton Athlone & Midlands venues.",
    canonical: "https://eventsound.ie/services/conference-av/athlone",
    ogTitle: "Conference AV Services Athlone | EventSound",
    ogDescription: "Professional conference AV in Athlone & Ireland's Midlands. Hodson Bay, Sheraton & Midlands venues.",
    ogType: "website",
  });
  const { hero } = useServiceImages("service-conference-av");

  return (
    <PageShell>
      <PageHeader
        title="Conference AV Services in Athlone & the Midlands"
        subtitle="Professional conference AV at Ireland's geographic centre"
        backgroundImage={hero}
        backgroundAlt="Conference AV setup at corporate event in Athlone"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Athlone is Ireland's geographic centre, sitting at the crossroads of the M6 Dublin–Galway motorway and the River Shannon. This central location makes it one of the country's most popular conference destinations — delegates from Dublin, Galway, Cork, and Limerick can all reach Athlone within 90 minutes to two hours. EventSound provides conference AV across Athlone and the wider Midlands region.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">What Our Midlands Conference AV Service Includes</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Our conference AV is tailored to each event. A typical setup includes radio microphones (lectern, roving, and headset from Shure, Sennheiser, and JTS), PA systems with LD Systems and L-Acoustics components, a digital mixing desk, front lighting, display screens or projection, confidence monitors, long-range presenter clickers, and an on-site technician.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For larger national conferences at Hodson Bay Hotel (capacity 1,000+ across combined suites) or the Sheraton Athlone Hotel, we add livestreaming capability, IMAG camera feeds, and multi-room audio distribution. Hodson Bay Hotel's 10 purpose-built conference suites frequently host complex multi-room events that require coordinated AV management across all spaces.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Conference AV for National Events</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Athlone's central accessibility makes it the natural choice for all-Ireland conferences. Organisations holding national AGMs, roadshows, and member events regularly choose Athlone to minimise delegate travel times. These events require AV that operates reliably at scale — consistent audio quality across large ballrooms, seamless microphone management for panel discussions, and confident technical support throughout.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Corporate roadshows and multi-city programmes also use Athlone as a central hub. Companies launching products or running training across Ireland often base one leg of their tour in Athlone to reach the Midlands audience. EventSound provides consistent AV quality across all locations on a multi-venue tour.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Athlone & Midlands Venues We Provide Conference AV For</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides conference AV at the Midlands' leading venues, including{" "}
            <a href="https://www.hodsonbayhotel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Hodson Bay Hotel</a>,{" "}
            <a href="https://www.marriott.com/hotels/travel/knosh-sheraton-athlone-hotel" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Sheraton Athlone Hotel</a>, and{" "}
            <a href="https://www.radissonhotels.com/en-us/hotels/radisson-blu-athlone" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Radisson Blu Hotel Athlone</a>.
            We also serve corporate facilities and event venues across Westmeath, Offaly, Laois, Roscommon, and Longford.
          </p>

          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Looking for LED wall hire in the Midlands? See our dedicated <Link to="/services/led-walls/athlone" className="text-accent hover:underline">Athlone LED Wall Hire</Link> page. You can also explore our full <Link to="/services/conference-av-hire" className="text-accent hover:underline">Conference AV Hire</Link> service for Ireland-wide coverage.
            </p>
          </ScrollReveal>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions — Conference AV Athlone</h2>
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
            <h3 className="text-xl font-semibold mb-2">Get a Quote for Conference AV in the Midlands</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">From national conferences at Hodson Bay Hotel to corporate events at the Sheraton Athlone, EventSound delivers professional conference AV across Ireland's Midlands. Contact us with your event details for a quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default AthaloneConferenceAV;
