import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/site/PageShell";
import { CategoryCard } from "@/components/site/CategoryCard";
import { Link } from "react-router-dom";
import { useCategories } from "@/hooks/useSiteContent";
import { useDynamicText } from "@/hooks/useDynamicContent";
import { useSiteImage } from "@/hooks/useSiteImage";
import { Skeleton } from "@/components/ui/skeleton";

import fallbackHeroImage from "@/assets/hero-av-production.jpg";
import audioImage from "@/assets/category-audio.jpg";
import visionImage from "@/assets/category-vision.jpg";
import lightingImage from "@/assets/category-lighting.jpg";
import stagingImage from "@/assets/category-staging.jpg";
import drapingImage from "@/assets/category-draping.jpg";
import videoRecordingImage from "@/assets/category-video-recording.jpg";

const fallbackCategories = [
  { title: "Audio", imageSrc: audioImage, to: "/contact" },
  { title: "Visuals", imageSrc: visionImage, to: "/contact" },
  { title: "Lighting", imageSrc: lightingImage, to: "/contact" },
  { title: "Staging", imageSrc: stagingImage, to: "/contact" },
  { title: "Draping", imageSrc: drapingImage, to: "/contact" },
  { title: "Video (Recording)", imageSrc: videoRecordingImage, to: "/contact" },
];

export default function AvProduction() {
  const { data: dbCategories, isLoading } = useCategories();
  const hero = useDynamicText("av-production", "hero");
  const cats = useDynamicText("av-production", "categories");
  const info = useDynamicText("av-production", "info_cards");
  const { data: heroImageData } = useSiteImage("av-production", "hero", "background");
  const heroImage = heroImageData?.image_url || fallbackHeroImage;

  const categories = dbCategories && dbCategories.length > 0
    ? dbCategories.map((c) => ({ title: c.title, imageSrc: c.image_url, to: c.link }))
    : fallbackCategories;

  return (
    <PageShell>
      <main>
        <section className="relative">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Stage lighting and LED screens" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
          </div>
          <div className="container relative py-32 md:py-44">
            <p className="text-sm text-muted-foreground">Services</p>
            <h1 className={`mt-3 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl ${hero.getAlignClass("headline")}`} style={hero.getStyle("headline")}>
              {hero.getText("headline", "AV & Production")}
            </h1>
            <p className={`mt-4 max-w-2xl text-base text-muted-foreground md:text-lg ${hero.getAlignClass("subheadline")}`} style={hero.getStyle("subheadline")}>
              {hero.getText("subheadline", "Want to make the moment feel bigger? We supply premium gear and calm, capable crew—so your event runs smooth and looks incredible.")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild style={{ fontSize: `${hero.getFontSize("cta_primary")}px`, padding: `${Math.max(8, hero.getFontSize("cta_primary") * 0.6)}px ${Math.max(16, hero.getFontSize("cta_primary") * 1.5)}px`, color: hero.getFontColor("cta_primary") || undefined }}>
                <Link to="/contact">{hero.getText("cta_primary", "Request a quote")}</Link>
              </Button>
              <Button asChild variant="outline" style={{ fontSize: `${hero.getFontSize("cta_secondary")}px`, padding: `${Math.max(8, hero.getFontSize("cta_secondary") * 0.6)}px ${Math.max(16, hero.getFontSize("cta_secondary") * 1.5)}px`, color: hero.getFontColor("cta_secondary") || undefined }}>
                <Link to="/">{hero.getText("cta_secondary", "View services")}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container py-14 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={`text-3xl font-semibold tracking-tight md:text-4xl ${cats.getAlignClass("section_title")}`} style={cats.getStyle("section_title")}>
              {cats.getText("section_title", "Create vibrant atmospheres")}
            </h2>
            <p className={`mt-4 text-muted-foreground ${cats.getAlignClass("section_description")}`} style={cats.getStyle("section_description")}>
              {cats.getText("section_description", "From intimate launches to high-capacity conferences, we bring together audio, vision, lighting and staging into one clean, reliable production package.")}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {isLoading ? (
              <>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="aspect-[4/3] w-full rounded-lg" />
                ))}
              </>
            ) : (
              categories.map((c) => (
                <CategoryCard key={c.title} title={c.title} imageSrc={c.imageSrc} to={c.to} />
              ))
            )}
          </div>
        </section>

        <section className="container pb-16">
          <div className="grid gap-6 md:grid-cols-3">
            <Card style={info.getBoxStyle("card_1_title")}>
              <CardHeader>
                <CardTitle className={info.getAlignClass("card_1_title")} style={info.getStyle("card_1_title")}>
                  {info.getText("card_1_title", "Delivered + installed")}
                </CardTitle>
                <CardDescription className={info.getAlignClass("card_1_description")} style={info.getStyle("card_1_description")}>
                  {info.getText("card_1_description", "We arrive early, build clean, and hand over confidently.")}
                </CardDescription>
              </CardHeader>
              <CardContent className={`text-sm text-muted-foreground ${info.getAlignClass("card_1_content")}`} style={info.getStyle("card_1_content")}>
                {info.getText("card_1_content", "Logistics, bump-in, patching, testing—handled. You focus on the run sheet.")}
              </CardContent>
            </Card>

            <Card style={info.getBoxStyle("card_2_title")}>
              <CardHeader>
                <CardTitle className={info.getAlignClass("card_2_title")} style={info.getStyle("card_2_title")}>
                  {info.getText("card_2_title", "Operator support")}
                </CardTitle>
                <CardDescription className={info.getAlignClass("card_2_description")} style={info.getStyle("card_2_description")}>
                  {info.getText("card_2_description", "Technicians who keep it calm when it matters.")}
                </CardDescription>
              </CardHeader>
              <CardContent className={`text-sm text-muted-foreground ${info.getAlignClass("card_2_content")}`} style={info.getStyle("card_2_content")}>
                {info.getText("card_2_content", "Audio, vision, lighting ops available—so you're never stuck troubleshooting mid-show.")}
              </CardContent>
            </Card>

            <Card style={info.getBoxStyle("card_3_title")}>
              <CardHeader>
                <CardTitle className={info.getAlignClass("card_3_title")} style={info.getStyle("card_3_title")}>
                  {info.getText("card_3_title", "Built for venues")}
                </CardTitle>
                <CardDescription className={info.getAlignClass("card_3_description")} style={info.getStyle("card_3_description")}>
                  {info.getText("card_3_description", "Power, rigging, staging—planned with safety first.")}
                </CardDescription>
              </CardHeader>
              <CardContent className={`text-sm text-muted-foreground ${info.getAlignClass("card_3_content")}`} style={info.getStyle("card_3_content")}>
                {info.getText("card_3_content", "Clear cabling, tidy builds, and practical solutions that look premium on camera.")}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
