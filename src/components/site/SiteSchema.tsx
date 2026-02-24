import { useEffect } from "react";
import { generateLocalBusinessSchema } from "@/lib/schema";

export const SiteSchema = () => {
  useEffect(() => {
    // Generate LocalBusiness schema for the entire site
    const schema = generateLocalBusinessSchema({
      name: "EventSound",
      description: "Professional event production and AV equipment hire in Ireland. LED video walls, sound systems, lighting, and staging for corporate events, conferences, and live shows.",
      url: "https://eventsound.ie",
      telephone: "+353-XX-XXX-XXXX", // TODO: Replace with actual phone
      email: "info@eventsound.ie",
      address: {
        streetAddress: "", // TODO: Add street address if you want it public
        addressLocality: "Dublin",
        addressRegion: "Ireland",
        postalCode: "", // TODO: Add if public
        addressCountry: "IE"
      },
      geo: {
        latitude: 53.7175, // Dublin coordinates
        longitude: -6.3478
      },
      areaServed: ["Dublin", "Ireland"],
      image: "https://eventsound.ie/logo.png", // TODO: Update with actual image
      logo: "https://eventsound.ie/logo.png" // TODO: Update with actual logo
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