import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/utils/trackConversion";

interface ServiceHeroActionsProps {
  serviceName: string;
  benefits: [string, string, string];
}

export function ServiceHeroActions({ serviceName, benefits }: ServiceHeroActionsProps) {
  return (
    <div className="mt-7">
      <ul className="mx-auto mb-6 flex max-w-3xl flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/90">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-accent" aria-hidden="true" />
            {benefit}
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild size="lg" className="font-semibold shadow-gold">
          <a
            href="#quote-form"
            onClick={() => trackEvent("service_cta_click", { service_name: serviceName, cta_type: "quote" })}
          >
            Get a tailored quote
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-white/40 bg-black/20 text-white hover:bg-white/10">
          <a
            href={`tel:${siteConfig.phone}`}
            onClick={() => trackEvent("service_cta_click", { service_name: serviceName, cta_type: "phone" })}
          >
            <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
            Call us
          </a>
        </Button>
      </div>
      <p className="mt-3 text-xs text-white/70">A practical recommendation and clear pricing within 24 hours.</p>
    </div>
  );
}
