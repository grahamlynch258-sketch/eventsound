import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import * as React from "react";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    // Lead-gen only for now (no backend yet).
    setTimeout(() => {
      setIsSubmitting(false);
      (e.currentTarget as HTMLFormElement).reset();
      toast({ title: "Request sent", description: "We’ll get back to you shortly." });
    }, 600);
  }

  return (
    <PageShell>
      <main className="container py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <section className="md:col-span-5">
            <h1 className="text-4xl font-semibold tracking-tight">Request a quote</h1>
            <p className="mt-4 text-muted-foreground">
              Tell us what you’re building—date, venue, audience size, and any must-haves. We’ll recommend a clean package
              and confirm availability.
            </p>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>What we can cover</CardTitle>
                <CardDescription>AV, vision, lighting, staging + operator support.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                If you already have a run sheet or floorplan, include it in your message and we’ll work from that.
              </CardContent>
            </Card>
          </section>

          <section className="md:col-span-7">
            <Card>
              <CardHeader>
                <CardTitle>Quote details</CardTitle>
                <CardDescription>We usually respond within one business day.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="grid gap-5">
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Your name" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="you@company.com" required />
                    </div>
                  </div>

                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" placeholder="Optional" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date">Event date</Label>
                      <Input id="date" name="date" placeholder="e.g. 12 Mar 2026" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="message">What do you need?</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Venue, audience size, schedule, and any equipment requests."
                      rows={7}
                      required
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">No spam—just production details.</p>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Sending…" : "Send request"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </PageShell>
  );
}
