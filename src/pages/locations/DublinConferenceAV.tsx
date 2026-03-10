import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { useServiceImages } from "@/hooks/useServiceImages";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const DublinConferenceAV = () => {
  const faqs = [
    { question: "What does conference AV cost in Dublin?", answer: "Conference AV requirements vary significantly between events, so we provide bespoke quotations rather than fixed prices. A small training day with a lectern mic and PA will cost considerably less than a 500-delegate plenary with multiple radio microphones, front lighting, confidence monitors, and livestreaming. Contact us with your event details — date, venue, audience size, and requirements — and we'll provide a detailed, transparent quote within 24 hours." },
    { question: "Do you provide technicians for the full duration of the event?", answer: "Yes. Every conference AV booking includes an on-site technician who is present from setup through to teardown. They manage sound levels, microphone handovers, presentation switching, and any technical issues that arise. For multi-day conferences or complex multi-room setups, we provide additional technical staff as needed." },
    { question: "Can you support hybrid conferences with remote attendees?", answer: "Yes. We provide livestreaming capability including camera feeds, encoding equipment, and integration with Zoom, Microsoft Teams, and dedicated streaming platforms. Remote delegates can participate in real time with high-quality audio and video from the conference room. We can also provide recording for on-demand playback after the event." },
    { question: "How far in advance should I book conference AV in Dublin?", answer: "We recommend booking at least 2 to 4 weeks before your event, though we can often accommodate shorter lead times depending on equipment availability. For large-scale conferences or events during peak periods (September to November, January to March), earlier booking is advisable. Contact us as soon as you have your event dates confirmed." },
  ];

  useSeo({
    title: "Conference AV Services Dublin | Event Sound & AV Hire | EventSound",
    description: "Conference AV hire in Dublin. PA systems, LED screens, confidence monitors, lighting & live streaming for corporate conferences & seminars. Same-day quotes available.",
    canonical: "https://eventsound.ie/services/conference-av/dublin",
    ogTitle: "Conference AV Services Dublin | EventSound",
    ogDescription: "Professional conference AV services in Dublin. Radio mics, PA systems, front lighting, livestreaming & on-site technicians.",
    ogType: "website",
  });
  const { hero } = useServiceImages("service-conference-av");

  return (
    <PageShell>
      <PageHeader
        title="Conference AV Services in Dublin"
        subtitle="Complete conference audio visual solutions for Dublin's corporate events market"
        backgroundImage={hero}
        backgroundAlt="Conference AV setup at corporate event in Dublin"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Dublin's conference market is the largest in Ireland. From plenary sessions at the Convention Centre Dublin to board meetings in city-centre hotels, the capital hosts thousands of corporate events each year. Every one of them depends on AV that works — clear audio, reliable microphones, professional lighting, and technical support that solves problems before they reach the audience. EventSound provides complete conference AV services across Dublin, tailored to each client's event, venue, and audience.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">What Conference AV Includes</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Every conference is different. A 40-person training day at a Ballsbridge hotel has different AV requirements to a 600-delegate plenary session at Croke Park Meetings & Events. Rather than offering rigid packages, we work with each client to specify exactly what their event needs. No unnecessary equipment, no gaps in coverage.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            A typical conference AV setup from EventSound may include radio microphones — lectern-mounted for keynote speakers, roving handhelds for audience Q&A, and headset mics for presenters who need to move freely on stage. We use Shure, Sennheiser, and JTS microphone systems depending on the venue size and configuration.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Audio is delivered through PA systems built on LD Systems and L-Acoustics components, selected to match the room acoustics and audience size. A digital mixing desk gives our on-site technician precise control over every audio source, ensuring consistent volume and clarity whether a speaker is soft-spoken or projecting confidently.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Front lighting ensures presenters are clearly visible both to the live audience and on camera. This is essential for events with IMAG (image magnification on screens), livestreaming, or recording. Poorly lit speakers look unprofessional on camera regardless of how good the rest of the production is.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Beyond the core audio and lighting, we provide display screens or projection for presentations, confidence monitors positioned where presenters can see their slides without turning away from the audience, and long-range clickers so speakers can advance slides from anywhere on stage. For hybrid conferences, we add livestreaming capability with encoding equipment and integration with platforms like Zoom, Teams, or dedicated streaming services.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Every conference AV booking includes an on-site technician who manages all equipment throughout your event. They handle setup, sound checks, microphone handovers between speakers, and troubleshooting. You focus on your content — we handle the technology.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Conference AV for Dublin's Corporate Market</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Dublin's IFSC and Silicon Docks are home to some of the world's largest technology and financial services companies. These organisations expect AV that meets international corporate standards — seamless microphone transitions, broadcast-quality audio, and technical teams that understand the pace and precision of high-profile corporate events.
          </p>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound delivers to this standard. Our equipment inventory and technical expertise are built for the demands of multinational corporate clients. Whether your event is an internal town hall for 200 employees, a client-facing product launch, or an investor presentation, we provide AV infrastructure that supports your objectives.
          </p>

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Dublin Conference Venues We Work With</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            EventSound provides conference AV at venues across Dublin, including the{" "}
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
            We understand the technical specifications, rigging points, power distribution, and acoustic characteristics of Dublin's major conference venues.
          </p>

          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Looking for LED wall hire in Dublin? See our dedicated <Link to="/services/led-walls/dublin" className="text-accent hover:underline">Dublin LED Wall Hire</Link> page. You can also explore our full <Link to="/services/conference-av-hire" className="text-accent hover:underline">Conference AV Hire</Link> service for Ireland-wide coverage.
            </p>
          </ScrollReveal>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions — Conference AV Dublin</h2>
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
            <h3 className="text-xl font-semibold mb-2">Get a Quote for Conference AV in Dublin</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">Whether you need a simple PA and lectern mic for a hotel meeting room or a full multi-room conference setup with livestreaming and IMAG at the Convention Centre Dublin, EventSound can help. Contact us with your event brief and we'll provide a detailed quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default DublinConferenceAV;
