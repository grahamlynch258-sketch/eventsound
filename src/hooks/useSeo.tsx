import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  schema?: string; // JSON-LD schema string
  schemaId?: string; // Unique ID for this schema
  additionalSchemas?: Array<{ schema: string; id: string }>;
}

const DEFAULT_TITLE = "EventSound | Premium Event Production Services Ireland";
const DEFAULT_DESCRIPTION = "Professional AV equipment rental and event production services across Ireland. LED walls, sound systems, lighting, and staging for corporate events, conferences, and live shows.";
const DEFAULT_OG_IMAGE = "https://eventsound.ie/og-image.svg";

function updateOrCreateMetaTag(property: string, content: string, isName = false) {
  const attribute = isName ? 'name' : 'property';
  let tag = document.querySelector(`meta[${attribute}="${property}"]`);
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, property);
    document.head.appendChild(tag);
  }
  
  tag.setAttribute('content', content);
}

function removeMetaTag(property: string, isName = false) {
  const attribute = isName ? 'name' : 'property';
  const tag = document.querySelector(`meta[${attribute}="${property}"]`);
  if (tag) {
    tag.remove();
  }
}

function updateOrCreateLinkTag(rel: string, href: string) {
  let tag = document.querySelector(`link[rel="${rel}"]`);
  
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  
  tag.setAttribute('href', href);
}

function removeLinkTag(rel: string) {
  const tag = document.querySelector(`link[rel="${rel}"]`);
  if (tag) {
    tag.remove();
  }
}

function injectOrUpdateSchema(schema: string, id: string) {
  // Remove existing schema with this ID
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }

  // Inject new schema
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = schema;
  document.head.appendChild(script);
}

function removeAllSchemas() {
  // Remove all JSON-LD schemas to prevent stale data
  const schemas = document.querySelectorAll('script[type="application/ld+json"]');
  schemas.forEach(schema => schema.remove());
}

export const useSeo = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  noindex = false,
  schema,
  schemaId = "page-schema",
  additionalSchemas
}: SeoProps = {}) => {
  const location = useLocation();

  useEffect(() => {
    // Update title
    document.title = title || DEFAULT_TITLE;

    // Update meta description
    updateOrCreateMetaTag("description", description || DEFAULT_DESCRIPTION, true);

    // Update canonical URL
    const canonicalUrl = canonical || `https://eventsound.ie${location.pathname}`;
    updateOrCreateLinkTag("canonical", canonicalUrl);

    // Update Open Graph tags
    updateOrCreateMetaTag("og:title", ogTitle || title || DEFAULT_TITLE);
    updateOrCreateMetaTag("og:description", ogDescription || description || DEFAULT_DESCRIPTION);
    updateOrCreateMetaTag("og:image", ogImage || DEFAULT_OG_IMAGE);
    updateOrCreateMetaTag("og:url", canonicalUrl);
    updateOrCreateMetaTag("og:type", ogType);

    // Update Twitter Card tags
    updateOrCreateMetaTag("twitter:card", "summary_large_image", true);
    updateOrCreateMetaTag("twitter:title", ogTitle || title || DEFAULT_TITLE, true);
    updateOrCreateMetaTag("twitter:description", ogDescription || description || DEFAULT_DESCRIPTION, true);
    updateOrCreateMetaTag("twitter:image", ogImage || DEFAULT_OG_IMAGE, true);

    // Update robots meta.
    if (noindex) {
      updateOrCreateMetaTag("robots", "noindex, nofollow", true);
    } else {
      updateOrCreateMetaTag("robots", "index, follow, max-image-preview:large", true);
    }

    // Handle JSON-LD schema
    if (schema && schemaId) {
      injectOrUpdateSchema(schema, schemaId);
    } else {
      // Remove page-specific schema if not provided (but keep site-wide schemas)
      const pageSchema = document.getElementById(schemaId);
      if (pageSchema) {
        pageSchema.remove();
      }
    }

    // Inject additional schemas (Service, Breadcrumb, etc.)
    // Clean up old additional schemas first
    document.querySelectorAll('script[data-additional-schema]').forEach(el => el.remove());
    if (additionalSchemas) {
      additionalSchemas.forEach(({ schema: s, id }) => {
        if (s) {
          // Remove existing
          const existing = document.getElementById(id);
          if (existing) existing.remove();
          // Create new
          const script = document.createElement("script");
          script.type = "application/ld+json";
          script.id = id;
          script.setAttribute("data-additional-schema", "true");
          script.textContent = s;
          document.head.appendChild(script);
        }
      });
    }

    // Cleanup function - important for SPA to prevent stale tags
    return () => {
      // We don't remove tags on unmount, only update them on next mount
      // This prevents flashing and ensures tags are always present
    };
  }, [location.pathname, title, description, canonical, ogTitle, ogDescription, ogImage, ogType, noindex, schema, schemaId, additionalSchemas]);
};