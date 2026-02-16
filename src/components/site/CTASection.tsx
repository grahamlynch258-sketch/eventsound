import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-card/50 border-y border-border/50">
      <div className="container py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Ready to elevate your next event?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Tell us your date, venue, and vision. We'll come back with a clear recommendation and a transparent quote — usually within 24 hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="font-semibold">
              <Link to="/contact">
                Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/av-production">View Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
