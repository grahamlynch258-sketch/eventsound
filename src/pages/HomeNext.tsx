import "@fontsource-variable/instrument-sans/wght.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@/styles/home-next.css";
import { MotionConfig } from "framer-motion";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Brief, Clients, Coverage, Day, Faq, Hero, Intro, PhoneBar, Quotes, Services, Work } from "@/components/home-next/sections";
import { useSeo } from "@/hooks/useSeo";

// A preview of the next home page, at /home-next/. It is not linked from
// anywhere, is not in the sitemap and tells search engines not to index it.
// The live home page (Index.tsx) is untouched. To go live, this page replaces
// Index.tsx and takes over its title, description and FAQ schema, and the
// static home shell in scripts/prerender.mjs is rewritten to match.
const HomeNext = () => {
  useSeo({
    title: "EventSound | Home page preview",
    description: "A preview of the next EventSound home page. Not the live page.",
    noindex: true,
  });

  return (
    <MotionConfig reducedMotion="user">
      <div className="hn">
        <SiteHeader />
        <main id="main-content" className="hn-main">
          <Hero />
          <Clients />
          <Intro />
          <Services />
          <Work />
          <Day />
          <Quotes />
          <Coverage />
          <Faq />
          <Brief />
        </main>
        <SiteFooter />
        <PhoneBar />
      </div>
    </MotionConfig>
  );
};

export default HomeNext;
