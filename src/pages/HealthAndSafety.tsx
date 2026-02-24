import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import heroFallback from "@/assets/hero-av-production.jpg";

const HealthAndSafety = () => {
  useSeo({
    title: "Health & Safety | EventSound Event Production Ireland",
    description: "EventSound's commitment to health and safety. TUV-certified staging, European-manufactured rigging, and trained personnel for safe event production.",
    canonical: "https://eventsound.ie/health-and-safety",
    ogTitle: "Health & Safety | EventSound Ireland",
    ogDescription: "Our commitment to health and safety in event production. TUV-certified staging and trained personnel."
  });

  return (
    <PageShell>
      <PageHeader
        title="Health & Safety"
        subtitle="Our commitment to safe event production"
        backgroundImage={heroFallback}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-lg text-muted-foreground">
            At EventSound, the safety of our crew, our clients, and their audiences is the foundation of everything we do. We maintain rigorous health and safety standards across every event we deliver, from intimate corporate meetings to large-scale outdoor festivals.
          </p>

          <h2 className="text-2xl font-semibold">Our Safety Standards</h2>
          <p className="text-muted-foreground">
            All EventSound staging is TUV-certified and European-manufactured, meeting the highest industry safety standards. Our rigging, trussing, and lifting equipment undergoes regular inspection and certification. Every piece of equipment deployed on your event has been tested, maintained, and verified safe for use.
          </p>

          <h2 className="text-2xl font-semibold">Trained Personnel</h2>
          <p className="text-muted-foreground">
            Our crew are trained in safe equipment operation, manual handling, working at height, and emergency procedures. Rigging is always undertaken by qualified personnel with relevant certifications. Every team member on your event understands that safety is the primary consideration — before, during, and after the show.
          </p>

          <h2 className="text-2xl font-semibold">Risk Assessment & Planning</h2>
          <p className="text-muted-foreground">
            We conduct thorough risk assessments for every event, identifying potential hazards and implementing control measures before any equipment arrives on site. For larger events, we carry out advance site visits to assess venue conditions, access routes, load-bearing capacities, and power supply requirements. Detailed method statements and risk assessments are available on request.
          </p>

          <h2 className="text-2xl font-semibold">Insurance & Compliance</h2>
          <p className="text-muted-foreground">
            EventSound maintains comprehensive public liability insurance and employer's liability insurance. We comply with all relevant Irish and European health and safety legislation. Copies of our insurance certificates and safety documentation are available on request for venue managers and event organisers.
          </p>

          <h2 className="text-2xl font-semibold">Our Commitment</h2>
          <p className="text-muted-foreground">
            We have an enviable safety record built over two decades of event production across Ireland. This record is achieved through a combination of ongoing training, meticulous forward planning, thorough pre-production processes, and rigorous equipment testing. When you choose EventSound as your production partner, you can be confident that safety is never compromised.
          </p>

          <p className="text-sm text-muted-foreground italic mt-8">
            Our full Health & Safety policy document is available on request. Contact us at info@eventsound.ie for a copy.
          </p>
        </div>
      </div>
    </PageShell>
  );
};

export default HealthAndSafety;