import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useDynamicText } from "@/hooks/useDynamicContent";
import { useSiteImage } from "@/hooks/useSiteImage";

import fallbackHeroImage from "@/assets/hero-av-production.jpg";

const Index = () => {
  const hero = useDynamicText("home", "hero");
  const features = useDynamicText("home", "features");
  const { data: heroImageData } = useSiteImage("home", "hero", "background");
  const heroImage = heroImageData?.image_url || fallbackHeroImage;

  return (
    <PageShell>
      <main>
        <section className="relative">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Event stage with lighting and screens" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/45 to-background" />
          </div>

          <div className="container relative py-20 md:py-28">
            <h1 className={`max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl ${hero.getAlignClass("headline")}`}>
              {hero.getText("headline", "Premium event production—without the chaos.")}
            </h1>
            <p className={`mt-5 max-w-2xl text-base text-muted-foreground md:text-lg ${hero.getAlignClass("subheadline")}`}>
              {hero.getText("subheadline", "AV, vision, lighting and staging packages for modern events. Delivered, installed and supported by calm, capable technicians.")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/contact">{hero.getText("cta_primary", "Request a quote")}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/av-production">{hero.getText("cta_secondary", "Explore AV & Production")}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container py-14 md:py-16">
          <div className="grid gap-6 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <h2 className={`text-3xl font-semibold tracking-tight md:text-4xl ${features.getAlignClass("section_title")}`}>
                {features.getText("section_title", "Built for producers and venues")}
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className={`text-muted-foreground ${features.getAlignClass("section_description")}`}>
                {features.getText("section_description", "We combine premium equipment with practical delivery, setup and operator support—so your event looks sharp and runs on schedule.")}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className={features.getAlignClass("feature_1_title")}>
                  {features.getText("feature_1_title", "Fast, tidy builds")}
                </CardTitle>
              </CardHeader>
              <CardContent className={`text-sm text-muted-foreground ${features.getAlignClass("feature_1_description")}`}>
                {features.getText("feature_1_description", "Clean cabling, sensible patching, and a plan for bump-in/bump-out.")}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={features.getAlignClass("feature_2_title")}>
                  {features.getText("feature_2_title", "Show-ready systems")}
                </CardTitle>
              </CardHeader>
              <CardContent className={`text-sm text-muted-foreground ${features.getAlignClass("feature_2_description")}`}>
                {features.getText("feature_2_description", "Audio clarity, punchy lighting, reliable vision—tested before doors.")}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={features.getAlignClass("feature_3_title")}>
                  {features.getText("feature_3_title", "People you can trust")}
                </CardTitle>
              </CardHeader>
              <CardContent className={`text-sm text-muted-foreground ${features.getAlignClass("feature_3_description")}`}>
                {features.getText("feature_3_description", "Techs who communicate, adapt, and keep the room calm.")}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container pb-16">
          <div className="rounded-lg border bg-card p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Tell us the brief. We'll build the package.</h2>
                <p className="mt-3 text-muted-foreground">
                  Send your date, venue, audience size, and any must-haves. We'll come back with a clear recommendation
                  and a quote.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Button asChild size="lg">
                  <Link to="/contact">Get a quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
};

export default Index;
