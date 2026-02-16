type CTAProps = {
  title?: string;
  description?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
};

export function CTASection({
  title = "Ready to elevate your next event?",
  description,
  primaryCtaLabel = "Get a Free Quote",
  secondaryCtaLabel = "View Our Services",
  primaryHref = "/contact",
  secondaryHref = "/services",
}: CTAProps) {
  // keep existing styling, just use these values
}
