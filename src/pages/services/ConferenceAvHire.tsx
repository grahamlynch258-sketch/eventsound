import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceImages } from "@/hooks/useServiceImages";
import { useServiceSections } from "@/hooks/useServiceSections";
import { ServiceSections } from "@/components/site/ServiceSections";
import { BrandBanner } from "@/components/site/BrandSidebar";

export default function ConferenceAvHire() {
  const faqs = [
    { question: "How far in advance should I book conference AV?", answer: "For large conferences with 200 or more delegates, we recommend four to six weeks minimum. Smaller meetings can often be turned around in one to two weeks, but earlier is always better — especially during peak conference season from September to November." },
    { question: "Do you provide technicians or just equipment?", answer: "Every booking includes on-site technicians. We don't do dry hire for conferences — your event is too important to leave to someone unfamiliar with the equipment." },
    { question: "Can you work with our venue's in-house AV?", answer: "Yes. We regularly integrate with venue-installed systems. We'll do a site visit to assess what's already in place and fill the gaps." },
    { question: "What conference AV equipment do you provide?", answer: "Our conference AV equipment includes lectern and wireless microphones, LED video walls, projection systems, confidence monitors, autocue, live streaming rigs, simultaneous interpretation systems, stage lighting, and full audio systems — all with experienced operators." },
    { question: "How much does conference AV hire cost?", answer: "Every conference is different. A straightforward single-room setup with sound and screens might start from around €1,500. Multi-room conferences with live streaming, interpretation, and LED walls scale from there. Contact us for a free consultation and quote." },
  ];

  useSeo({
    title: "Conference AV Hire Ireland | Conference Room AV Equipment | EventSound",
    description: "Conference AV hire across Ireland. Lectern mics, LED walls, confidence monitors, live streaming, and simultaneous interpretation. Full technical crew included.",
    canonical: "https://eventsound.ie/services/conference-av-hire",
  });
  const { hero, gallery } = useServiceImages("service-conference-av");
  const { data: sections = [] } = useServiceSections("conference-av-hire");

  return (
    <PageShell>
      <PageHeader
        title="Conference AV Hire Ireland"
        subtitle="Professional audio visual solutions for conferences, AGMs, and corporate events across Ireland"
        backgroundImage={hero}
        backgroundAlt="Professional conference AV setup with LED screens and lectern microphones in Ireland"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Every conference has one job — make sure your message lands. Whether it's a 50-person AGM, a 500-seat medical symposium, or a hybrid tech summit streaming to a global audience, the AV setup is what separates a polished, professional event from one where delegates are squinting at slides and straining to hear. EventSound provides full-service conference AV hire across Ireland, with experienced technicians who stay on-site from soundcheck to wrap.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Presenter Audio & Lectern Systems</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Your keynote speaker shouldn't have to think about the microphone. We supply and operate lectern microphones, wireless lapel and headset mics, handheld radio mics for Q&A, and full-room speaker systems tuned to your venue's acoustics. For panel discussions, we set up multi-mic configurations with individual mix control so every voice comes through clearly — no feedback, no dropouts.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">LED Walls & Conference Room AV Equipment</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            When your message needs maximum visual impact, an LED wall changes the room. Our high-resolution Unilumin LED panels are available in custom configurations — from a 3m wide presentation backdrop to a full-width stage set spanning 10m or more. Perfect for branded content, live data dashboards, sponsor loops, and speaker slides at a scale that projectors can't match. We handle all content formatting, signal switching, and on-the-fly source changes.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Confidence Monitors & Autocue</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Presenters perform better when they can see their own slides without turning their back on the audience. We provide confidence monitors positioned at stage level showing the current slide, next slide, and timing cues. For scripted addresses, our autocue and teleprompter systems let speakers deliver naturally while staying word-perfect — essential for CEO addresses, ministerial speeches, and investor presentations.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Live Streaming & Hybrid Conference Production</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Not everyone can be in the room. We deliver broadcast-quality live streams with multi-camera switching, lower-third graphics, remote speaker integration via NDI, and audience Q&A management across Zoom, Teams, YouTube, and Vimeo. Our hybrid setups ensure remote attendees get the same experience as those on-site, with dedicated camera angles, clean audio feeds, and real-time interaction tools.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Simultaneous Interpretation & Breakout Rooms</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            For multilingual conferences, we provide wireless interpretation receiver systems compatible with ISO-standard interpreter booths, supporting as many language channels as your event requires. For multi-track conferences, we set up fully independent AV systems in breakout rooms — each with their own mic, screen, and speaker setup — all coordinated from a central production desk so transitions between plenary and breakout sessions run seamlessly.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Conference Stage Lighting</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Conference lighting does more than illuminate — it sets the tone. We design lighting rigs that put your speakers in the best light, wash your stage set in brand colours, and create distinct visual moods for different segments. All controlled by our ChamSys lighting desk with a dedicated operator.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">What's Included</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            Every EventSound conference package includes a dedicated project manager who works with you from the first site visit through to load-out. We do the advance venue recce, produce a technical plan, handle all equipment delivery and rigging, and run the full show with our own crew. You get a single point of contact, not a box of rented equipment and a manual.
          </p>
          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Trusted Across Every Sector</h2>
          <p className="text-muted-foreground transition-transform duration-300 hover:scale-[1.04] cursor-default">
            We've delivered conference AV for corporate AGMs, pharmaceutical product launches, technology summits, government briefings, charity galas, and academic symposiums in venues across Ireland — from the Convention Centre Dublin to regional hotels and purpose-built conference centres.
          </p>

          {sections.length > 0 && <ServiceSections sections={sections} />}

          {gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our Conference AV Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((img) => (
                  <img key={img.id} src={img.image_url} alt={img.alt_text || "Conference AV setup at corporate event"} className="rounded-lg w-full aspect-video object-cover" loading="lazy" decoding="async" width={600} height={338} />
                ))}
              </div>
            </div>
          )}

          <BrandBanner serviceKey="conference-av-hire" />

          <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">Related Services</h2>
          <div className="flex flex-wrap gap-3 justify-center transition-transform duration-300 hover:scale-[1.03] cursor-default">
            <Link to="/services/av-production"><Button variant="outline">AV Production</Button></Link>
            <Link to="/services/led-video-walls"><Button variant="outline">LED Video Walls</Button></Link>
            <Link to="/services/virtual-events"><Button variant="outline">Virtual & Hybrid Events</Button></Link>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 transition-transform duration-300 hover:scale-[1.05] cursor-default">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-6 transition-transform duration-300 hover:scale-[1.03] cursor-default">
                  <div className="rounded-lg bg-accent/10 border border-accent/20 px-4 py-3 mb-4">
                    <h3 className="text-lg font-semibold text-accent">{faq.question}</h3>
                  </div>
                  <div className="rounded-lg bg-card/60 border border-border/30 px-4 py-3">
                    <p className="text-foreground/90 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center transition-transform duration-300 hover:scale-[1.04] cursor-default">
            <h3 className="text-xl font-semibold mb-2">Need Conference AV?</h3>
            <p className="text-muted-foreground mb-4 transition-transform duration-300 hover:scale-[1.04] cursor-default">Tell us your venue, delegate numbers, and conference format — we'll design a complete AV solution and quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
