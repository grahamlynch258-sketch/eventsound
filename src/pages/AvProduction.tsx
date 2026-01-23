import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/site/PageShell";
import { CategoryCard } from "@/components/site/CategoryCard";
import { Link } from "react-router-dom";

import heroImage from "@/assets/hero-av-production.jpg";
import audioImage from "@/assets/category-audio.jpg";
import visionImage from "@/assets/category-vision.jpg";
import lightingImage from "@/assets/category-lighting.jpg";

const categories = [
  { title: "Audio", imageSrc: audioImage, to: "/contact" },
  { title: "Vision", imageSrc: visionImage, to: "/contact" },
  { title: "Lighting", imageSrc: lightingImage, to: "/contact" },
];

export default function AvProduction() {
  return (
    <PageShell>
      <main>
        <section className="relative">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Stage lighting and LED screens" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
          </div>
          <div className="container relative py-20 md:py-28">
            <p className="text-sm text-muted-foreground">Services</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
              AV & Production
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Want to make the moment feel bigger? We supply premium gear and calm, capable crew—so your event runs smooth
              and looks incredible.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/contact">Request a quote</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">View services</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container py-14 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Create vibrant atmospheres</h2>
            <p className="mt-4 text-muted-foreground">
              From intimate launches to high-capacity conferences, we bring together audio, vision, lighting and staging
              into one clean, reliable production package.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {categories.map((c) => (
              <CategoryCard key={c.title} title={c.title} imageSrc={c.imageSrc} to={c.to} />
            ))}
          </div>
        </section>

        <section className="container pb-16">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Delivered + installed</CardTitle>
                <CardDescription>We arrive early, build clean, and hand over confidently.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Logistics, bump-in, patching, testing—handled. You focus on the run sheet.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operator support</CardTitle>
                <CardDescription>Technicians who keep it calm when it matters.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Audio, vision, lighting ops available—so you’re never stuck troubleshooting mid-show.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Built for venues</CardTitle>
                <CardDescription>Power, rigging, staging—planned with safety first.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Clear cabling, tidy builds, and practical solutions that look premium on camera.
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
