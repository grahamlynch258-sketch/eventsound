// Supabase Edge Function: submit-quote
// Validates Cloudflare Turnstile token then inserts quote submission.
// Deploy: supabase functions deploy submit-quote
// Secrets: TURNSTILE_SECRET_KEY (set via: supabase secrets set TURNSTILE_SECRET_KEY=xxx)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // Handle CORS preflight
        if (req.method === "OPTIONS") {
              return new Response("ok", { headers: CORS_HEADERS });
        }

        try {
              const body = await req.json();
              const { turnstileToken, website, ...formData } = body;

      // 1. Honeypot check — bots fill this hidden field
      if (website) {
              // Silently accept to not tip off bots
                return new Response(JSON.stringify({ ok: true }), {
                          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
                });
      }

      // 2. Turnstile server-side verification
      const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
              if (secret) {
                      // TODO: replace with your actual Turnstile secret from Cloudflare dashboard
                const verifyRes = await fetch(
                          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                  {
                              method: "POST",
                              headers: { "Content-Type": "application/x-www-form-urlencoded" },
                              body: new URLSearchParams({
                                            secret,
                                            response: turnstileToken ?? "",
                              }),
                  }
                        );
                      const verifyData = await verifyRes.json();
                      if (!verifyData.success) {
                                return new Response(
                                            JSON.stringify({ error: "CAPTCHA verification failed. Please try again." }),
                                  {
                                                status: 400,
                                                headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
                                  }
                                          );
                      }
              }
              // If TURNSTILE_SECRET_KEY is not set, skip verification (dev mode)

      // 3. Insert into Supabase
      const supabase = createClient(
              Deno.env.get("SUPABASE_URL") ?? "",
              Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
            );

      const { error } = await supabase.from("quote_submissions").insert({
              name: formData.name?.trim() ?? null,
              email: formData.email?.trim() ?? null,
              phone: formData.phone?.trim() || null,
              company: formData.company?.trim() || null,
              event_date: formData.event_date?.trim() || null,
              event_type: formData.event_type?.trim() || null,
              venue: formData.venue?.trim() || null,
              audience_size: formData.audience_size?.trim() || null,
              services: formData.services?.length > 0 ? formData.services : null,
              budget_range: formData.budget_range || null,
              message: formData.message?.trim() || null,
      });

      if (error) throw error;

      return new Response(JSON.stringify({ ok: true }), {
              headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
        } catch (err) {
              return new Response(
                      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
                {
                          status: 500,
                          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
                }
                    );
        }
});
