import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AudioSystems() {
  useSeo({
    title: "AV & PA System Hire Dublin & Ireland | Conference Audio | EventSound",
    description: "Professional sound system and PA hire for events across Ireland. L-Acoustics speakers, wireless microphones, audio mixing, and experienced sound engineers included.",
    canonical: "https://eventsound.ie/services/audio-systems",
  });

  return (
    <PageShell>
      <PageHeader title="Audio Systems & PA Hire" subtitle="Crystal-clear sound for events of every size" />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground">
            EventSound started as a sound rental company over three decades ago, and professional audio remains at the heart of what we do. We provide PA systems, wireless microphones, foldback monitors, and complete audio solutions for corporate events, conferences, concerts, and live shows across Ireland.
          </p>
          <h2 className="text-2xl font-semibold">Industry-Leading Equipment</h2>
          <p className="text-muted-foreground">
            We use L-Acoustics speaker systems — the global standard for professional live sound. Whether you're hosting a 50-person boardroom presentation or a 5,000-capacity outdoor event, our systems deliver clear, powerful sound tuned specifically to your venue. Our inventory includes line array systems, point source speakers, subwoofers, delay towers, and portable PA systems for smaller events.
          </p>
          <h2 className="text-2xl font-semibold">Wireless Microphones & Audio Mixing</h2>
          <p className="text-muted-foreground">
            We supply professional wireless microphone systems including handheld, lapel, and headset options — essential for keynote speakers, panel discussions, and live performances. Every audio hire includes a digital mixing console operated by an experienced sound engineer who manages levels, monitors, and troubleshoots in real time throughout your event.
          </p>
          <h2 className="text-2xl font-semibold">Why EventSound for Audio?</h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>L-Acoustics speaker systems — trusted worldwide for live events</li>
            <li>Over 30 years of sound engineering experience</li>
            <li>Experienced sound engineers included with every hire</li>
            <li>Venue-tuned audio — we optimise for your specific space</li>
            <li>Full wireless microphone systems for any format</li>
          </ul>

          <h2 className="text-2xl font-semibold">Related Services</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/services/event-production"><Button variant="outline">Event Production</Button></Link>
            <Link to="/services/lighting-design"><Button variant="outline">Lighting Design</Button></Link>
            <Link to="/services/staging-pipe-drape"><Button variant="outline">Staging & Drape</Button></Link>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Need Sound for Your Event?</h3>
            <p className="text-muted-foreground mb-4">Tell us your venue, audience size, and event format — we'll design the right audio solution and quote within 24 hours.</p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
