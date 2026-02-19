import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_TITLE = "EventSound | Premium Event Production Ireland";
const DEFAULT_DESCRIPTION = "Professional AV and event production services across Ireland";
const SITE_URL = "https://eventsound.ie";

export function useSeo() {
  const location = useLocation();

  useEffect(() => {
    const loadSeo = async () => {
      try {
        const { data, error } = await supabase
          .from("page_seo")
          .select("*")
          .eq("path", location.pathname)
          .single();

        // Set defaults or from database
        const metaTitle = data?.meta_title || DEFAULT_TITLE;
        const metaDescription = data?.meta_description || DEFAULT_DESCRIPTION;
        const canonicalUrl = data?.canonical_url || `${SITE_URL}${location.pathname}`;
        const ogTitle = data?.og_title || data?.meta_title || DEFAULT_TITLE;
        const ogDescription = data?.og_description || data?.meta_description || DEFAULT_DESCRIPTION;
        const ogImage = data?.og_image_url || `${SITE_URL}/og-image.png`;

        // Update title
        document.title = metaTitle;

        // Update or create meta tags
        updateOrCreateMetaTag("name", "description", metaDescription);
        
        // Canonical URL
        updateOrCreateLinkTag("canonical", canonicalUrl);

        // Open Graph tags
        updateOrCreateMetaTag("property", "og:title", ogTitle);
        updateOrCreateMetaTag("property", "og:description", ogDescription);
        updateOrCreateMetaTag("property", "og:image", ogImage);
        updateOrCreateMetaTag("property", "og:url", canonicalUrl);
        updateOrCreateMetaTag("property", "og:type", "website");

        // Twitter Card tags
        updateOrCreateMetaTag("name", "twitter:card", "summary_large_image");
        updateOrCreateMetaTag("name", "twitter:title", ogTitle);
        updateOrCreateMetaTag("name", "twitter:description", ogDescription);
        updateOrCreateMetaTag("name", "twitter:image", ogImage);

        // Robots meta tag (if noindex specified)
        if (data?.noindex) {
          updateOrCreateMetaTag("name", "robots", "noindex, nofollow");
        } else {
          // Remove robots meta if not needed (allow indexing)
          removeMetaTag("name", "robots");
        }

      } catch (err) {
        // If no SEO data found, set defaults
        document.title = DEFAULT_TITLE;
        updateOrCreateMetaTag("name", "description", DEFAULT_DESCRIPTION);
        updateOrCreateLinkTag("canonical", `${SITE_URL}${location.pathname}`);
        
        // Set default OG tags
        updateOrCreateMetaTag("property", "og:title", DEFAULT_TITLE);
        updateOrCreateMetaTag("property", "og:description", DEFAULT_DESCRIPTION);
        updateOrCreateMetaTag("property", "og:url", `${SITE_URL}${location.pathname}`);
        updateOrCreateMetaTag("property", "og:type", "website");
      }
    };

    loadSeo();
  }, [location.pathname]);
}

function updateOrCreateMetaTag(attribute: string, key: string, value: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

function removeMetaTag(attribute: string, key: string) {
  const element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (element) {
    element.remove();
  }
}

function updateOrCreateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.href = href;
}