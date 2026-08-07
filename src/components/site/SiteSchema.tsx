import { useEffect } from "react";
import { generateLocalBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

export const SiteSchema = () => {
  useEffect(() => {
    // Generate LocalBusiness schema for the entire site
    const schema = generateLocalBusinessSchema({
      name: siteConfig.brandName,
      description: "Professional event production and AV equipment hire in Ireland. LED video walls, sound systems, lighting, and staging for corporate events, conferences, and live shows.",
      url: `${siteConfig.canonicalBase}/#organization`,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      address: {
        streetAddress: siteConfig.addressStreet,
        addressLocality: siteConfig.addressLocality,
        addressRegion: siteConfig.addressRegion,
        postalCode: siteConfig.postalCode,
        addressCountry: siteConfig.country
      },
      geo: {
        latitude: 53.7174,
        longitude: -6.3567
      },
      areaServed: [...siteConfig.serviceAreas],
      image: siteConfig.ogImage,
      logo: siteConfig.logo
    });

    // Inject site-wide schema (persists across route changes)
    const script = document.createElement('script');
    script.id = 'site-schema-local-business';
    script.type = 'application/ld+json';
    script.textContent = schema;
    
    // Only add if not already present
    if (!document.getElementById('site-schema-local-business')) {
      document.head.appendChild(script);
    }

    // Cleanup - don't remove on unmount, this is site-wide
    return () => {};
  }, []);

  return null; // This component doesn't render anything
};
