import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function useSeo() {
  const location = useLocation();

  useEffect(() => {
    const loadSeo = async () => {
      try {
        // Fetch SEO data for current path
        const { data, error } = await supabase
          .from("page_seo")
          .select("*")
          .eq("path", location.pathname)
          .single();

        if (error || !data) {
          // Set default meta tags if no custom SEO data
          document.title = "EventSound | Premium Event Production Ireland";
          return;
        }

        // Apply meta title
        if (data.meta_title) {
          document.title = data.meta_title;
        }

        // Apply meta description
        updateMetaTag("name", "description", data.meta_description);

        // Apply canonical URL
        updateLinkTag("canonical", data.canonical_url);

        // Apply Open Graph tags
        updateMetaTag("property", "og:title", data.og_title);
        updateMetaTag("property", "og:description", data.og_description);
        updateMetaTag("property", "og:image", data.og_image_url);
        updateMetaTag("property", "og:url", data.canonical_url || window.location.href);

        // Apply Twitter Card tags
        updateMetaTag("name", "twitter:card", "summary_large_image");
        updateMetaTag("name", "twitter:title", data.og_title);
        updateMetaTag("name", "twitter:description", data.og_description);
        updateMetaTag("name", "twitter:image", data.og_image_url);

        // Apply robots meta (noindex if specified)
        if (data.noindex) {
          updateMetaTag("name", "robots", "noindex, nofollow");
        } else {
          removeMetaTag("name", "robots");
        }

      } catch (err) {
        console.error("Error loading SEO data:", err);
      }
    };

    loadSeo();
  }, [location.pathname]);
}

function updateMetaTag(attribute: string, key: string, value: string | null) {
  if (!value) return;

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

function updateLinkTag(rel: string, href: string | null) {
  if (!href) return;

  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.href = href;
}