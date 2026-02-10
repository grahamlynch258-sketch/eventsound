import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useDynamicText } from "@/hooks/useDynamicContent";
import { useSiteImage, useSiteImages } from "@/hooks/useSiteImage";

import fallbackHeroImage from "@/assets/hero-av-production.jpg";

const Index = () => {
  const hero = useDynamicText("home", "hero");
  const features = useDynamicText("home", "features");
  const cta = useDynamicText("home", "cta2");
  const { data: heroImageData } = useSiteImage("home", "hero", "background");
  const heroImage = heroImageData?.image_url || fallbackHeroImage;
  const { data: portraits } = useSiteImages("home", "bottom_portraits");
  const getPortrait = (key: string) => portraits?.find(p => p.key === key);

  return (
    <PageShell>
      {(() => {
        const gradColor = hero.getBgColor("_gradient_color") || "";
        const gradOpacity = hero.getBgOpacity("_gradient_color");
        const rgb = gradColor
          ? [
              parseInt(gradColor.slice(1, 3), 16),
              parseInt(gradColor.slice(3, 5), 16),
              parseInt(gradColor.slice(5, 7), 16),
            ]
          : null;
        // Fade start: higher opacity = gradient kicks in sooner (from top). 
        // Range: 0% opacity → gradient starts at 70%, 100% → starts at 10%
        const fadeStart = rgb ? Math.round(70 - gradOpacity * 60) : 40;
        const heroGradient = rgb
          ? `linear-gradient(to bottom, transparent ${fadeStart}%, rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.6) ${fadeStart + 20}%, rgba(${rgb[0]},${rgb[1]},${rgb[2]},1) 100%)`
          : "linear-gradient(to bottom, transparent, transparent 40%, hsl(var(--background)))";
        const pageBg = rgb ? `rgb(${rgb[0]},${rgb[1]},${rgb[2]})` : undefined;

        return (
          <main style={pageBg ? { backgroundColor: pageBg } : undefined}>
            <section className="relative">
              <div className="absolute inset-0">
                <img src={heroImage} alt="Event stage with lighting and screens" className="h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: heroGradient }} />
                {/* Soft fade at the bottom edge of the hero */}
                <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: `linear-gradient(to bottom, transparent, ${pageBg || 'hsl(var(--background))'})` }} />
              </div>

              <div className="container relative py-32 md:py-44">
                <h1 className={`max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl ${hero.getAlignClass("headline")}`} style={hero.getStyle("headline")}>
                  {hero.getText("headline", "Premium event production—without the chaos.")}
                </h1>
                <p className={`mt-5 max-w-2xl text-base text-muted-foreground md:text-lg ${hero.getAlignClass("subheadline")}`} style={hero.getStyle("subheadline")}>
                  {hero.getText("subheadline", "AV, vision, lighting and staging packages for modern events. Delivered, installed and supported by calm, capable technicians.")}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start" style={{ transform: `translate(${hero.getOffsetX("cta_primary")}px, ${hero.getOffsetY("cta_primary")}px)` }}>
                  <Button asChild className="w-full sm:w-auto shrink-0" style={{ fontSize: `${hero.getFontSize("cta_primary")}px`, padding: `${Math.max(8, hero.getFontSize("cta_primary") * 0.6)}px ${Math.max(16, hero.getFontSize("cta_primary") * 1.5)}px`, color: hero.getFontColor("cta_primary") || undefined }}>
                    <Link to="/av-production">{hero.getText("cta_primary", "Request a quote")}</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full sm:w-auto shrink-0" style={{ fontSize: `${hero.getFontSize("cta_secondary")}px`, padding: `${Math.max(8, hero.getFontSize("cta_secondary") * 0.6)}px ${Math.max(16, hero.getFontSize("cta_secondary") * 1.5)}px`, color: hero.getFontColor("cta_secondary") || undefined }}>
                    <Link to="/contact">{hero.getText("cta_secondary", "Explore AV & Production")}</Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Bottom content with portrait images behind */}
            <div className="relative">
              {portraits && portraits.some(p => p.image_url) && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/* Soft fade at the top of the portraits */}
                  <div className="absolute top-0 left-0 right-0 h-32 z-10" style={{ background: `linear-gradient(to bottom, ${pageBg || 'hsl(var(--background))'}, transparent)` }} />
                  {/* Soft fade at the bottom of the portraits */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 z-10" style={{ background: `linear-gradient(to top, ${pageBg || 'hsl(var(--background))'}, transparent)` }} />
                  <div className="flex h-full">
                    {["portrait_1", "portrait_2", "portrait_3"].map((key, i) => {
                      const img = getPortrait(key);
                      // Use polygon clips: each image has diagonal / edges
                      // Left image: rect with right edge angled /
                      // Middle image: parallelogram shape
                      // Right image: rect with left edge angled /
                      const clips = [
                        "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
                        "polygon(15% 0, 100% 0, 85% 100%, 0 100%)",
                        "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
                      ];
                      return (
                        <div
                          key={key}
                          className="relative h-full"
                          style={{
                            flex: '1 0 38%',
                            marginLeft: i > 0 ? '-5%' : undefined,
                            clipPath: clips[i],
                          }}
                        >
                          {img?.image_url ? (
                            <img
                              src={img.image_url}
                              alt={img.alt_text || ""}
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <section className="container relative py-14 md:py-16">
                <div className="grid gap-6 md:grid-cols-12 md:items-start">
                  <div className="md:col-span-5">
                    <h2 className={`text-3xl font-semibold tracking-tight md:text-4xl ${features.getAlignClass("section_title")}`} style={features.getStyle("section_title")}>
                      {features.getText("section_title", "Built for producers and venues")}
                    </h2>
                  </div>
                  <div className="md:col-span-7">
                    <p className={`text-muted-foreground ${features.getAlignClass("section_description")}`} style={features.getStyle("section_description")}>
                      {features.getText("section_description", "We combine premium equipment with practical delivery, setup and operator support—so your event looks sharp and runs on schedule.")}
                    </p>
                  </div>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  <Card style={features.getBoxStyle("feature_1_title")}>
                    <CardHeader>
                      <CardTitle className={features.getAlignClass("feature_1_title")} style={features.getStyle("feature_1_title")}>
                        {features.getText("feature_1_title", "Fast, tidy builds")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={`text-sm text-muted-foreground ${features.getAlignClass("feature_1_description")}`} style={features.getStyle("feature_1_description")}>
                      {features.getText("feature_1_description", "Clean cabling, sensible patching, and a plan for bump-in/bump-out.")}
                    </CardContent>
                  </Card>

                  <Card style={features.getBoxStyle("feature_2_title")}>
                    <CardHeader>
                      <CardTitle className={features.getAlignClass("feature_2_title")} style={features.getStyle("feature_2_title")}>
                        {features.getText("feature_2_title", "Show-ready systems")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={`text-sm text-muted-foreground ${features.getAlignClass("feature_2_description")}`} style={features.getStyle("feature_2_description")}>
                      {features.getText("feature_2_description", "Audio clarity, punchy lighting, reliable vision—tested before doors.")}
                    </CardContent>
                  </Card>

                  <Card style={features.getBoxStyle("feature_3_title")}>
                    <CardHeader>
                      <CardTitle className={features.getAlignClass("feature_3_title")} style={features.getStyle("feature_3_title")}>
                        {features.getText("feature_3_title", "People you can trust")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={`text-sm text-muted-foreground ${features.getAlignClass("feature_3_description")}`} style={features.getStyle("feature_3_description")}>
                      {features.getText("feature_3_description", "Techs who communicate, adapt, and keep the room calm.")}
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="container relative pb-16">
                <div className="rounded-lg border bg-card p-8 md:p-10" style={cta.getBoxStyle("headline")}>
                  <div className="grid gap-6 md:grid-cols-12 md:items-center">
                    <div className="md:col-span-8">
                      <h2 className={`text-2xl font-semibold tracking-tight md:text-3xl ${cta.getAlignClass("headline")}`} style={cta.getStyle("headline")}>
                        {cta.getText("headline", "Tell us the brief. We'll build the package.")}
                      </h2>
                      <p className={`mt-3 text-muted-foreground ${cta.getAlignClass("description")}`} style={cta.getStyle("description")}>
                        {cta.getText("description", "Send your date, venue, audience size, and any must-haves. We'll come back with a clear recommendation and a quote.")}
                      </p>
                    </div>
                    <div className="md:col-span-4 md:text-right">
                      <Button asChild size="lg">
                        <Link to="/contact">{cta.getText("button_text", "Get a quote")}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        );
      })()}
    </PageShell>
  );
};

export default Index;
