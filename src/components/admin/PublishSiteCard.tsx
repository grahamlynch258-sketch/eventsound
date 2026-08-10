import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Triggers a Netlify rebuild via build hook. Almost all content changes go
 * live instantly — this button exists for the few things baked in at build
 * time: the homepage's first slideshow image (its speed-preload), newly
 * published blog/case-study pages, and the sitemap.
 */
export function PublishSiteCard() {
  const [state, setState] = useState<"idle" | "publishing" | "done" | "error">("idle");

  async function publish() {
    setState("publishing");
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("You must be signed in as an administrator.");

      const response = await fetch("/.netlify/functions/publish-site", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "The build could not be started.");
      }
      setState("done");
      setTimeout(() => setState("idle"), 8000);
    } catch {
      setState("error");
    }
  }

  return (
    <Card className="mb-6 bg-gradient-to-br from-emerald-50 to-emerald-100">
      <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-medium text-gray-800">
            <Rocket className="h-4 w-4 text-emerald-700" /> Publish site
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Image and content changes go live instantly. Press this only after changing the <strong>first homepage
            slideshow image</strong> or publishing a new blog post / case study — it rebuilds the fast-loading
            version of those pages (takes ~2–3 minutes).
          </p>
        </div>
        <Button onClick={publish} disabled={state === "publishing"} className="shrink-0">
          {state === "publishing" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Starting…
            </>
          ) : state === "done" ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" /> Build started
            </>
          ) : state === "error" ? (
            "Failed — check setup"
          ) : (
            "Publish site"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
