import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Loader2, CheckCircle2 } from "lucide-react";

const BUILD_HOOK = import.meta.env.VITE_NETLIFY_BUILD_HOOK as string | undefined;

/**
 * Triggers a Netlify rebuild via build hook. Almost all content changes go
 * live instantly — this button exists for the few things baked in at build
 * time: the homepage's first slideshow image (its speed-preload), newly
 * published blog/case-study pages, and the sitemap.
 */
export function PublishSiteCard() {
  const [state, setState] = useState<"idle" | "publishing" | "done" | "error">("idle");

  async function publish() {
    if (!BUILD_HOOK) return;
    setState("publishing");
    try {
      // Build hooks are fire-and-forget; no-cors keeps the browser from
      // blocking on the (unreadable) cross-origin response.
      await fetch(BUILD_HOOK, { method: "POST", mode: "no-cors" });
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
        {BUILD_HOOK ? (
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
              "Failed — try again"
            ) : (
              "Publish site"
            )}
          </Button>
        ) : (
          <p className="shrink-0 text-xs text-muted-foreground">
            Not set up yet — see <code>docs/image-workflow-runbook.md</code> (Step 2)
          </p>
        )}
      </CardContent>
    </Card>
  );
}
