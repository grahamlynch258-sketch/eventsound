import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

import heroImage from "@/assets/hero-av-production.jpg";

const Index = () => {
  return (
    <PageShell>
      <main>
        <section className="relative">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Event stage with lighting and screens" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/45 to-background" />
          </div>

          <div className="container relative py-20 md:py-28">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Premium event production—without the chaos.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              AV, vision, lighting and staging packages for modern events. Delivered, installed and supported by calm,
              capable technicians.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/contact">Request a quote</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/av-production">Explore AV & Production</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container py-14 md:py-16">
          <div className="grid gap-6 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Built for producers and venues</h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-muted-foreground">
                We combine premium equipment with practical delivery, setup and operator support—so your event looks sharp
                and runs on schedule.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Fast, tidy builds</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Clean cabling, sensible patching, and a plan for bump-in/bump-out.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Show-ready systems</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Audio clarity, punchy lighting, reliable vision—tested before doors.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>People you can trust</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Techs who communicate, adapt, and keep the room calm.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container pb-16">
          <div className="rounded-lg border bg-card p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Tell us the brief. We’ll build the package.</h2>
                <p className="mt-3 text-muted-foreground">
                  Send your date, venue, audience size, and any must-haves. We’ll come back with a clear recommendation
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
