import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site/PageShell";
import { useSeo } from "@/hooks/useSeo";
import { openConsentSettings } from "@/lib/consent";

const CookiePolicy = () => {
  useSeo({
    title: "Cookie Policy | EventSound AV Services",
    description: "Details of essential storage, Microsoft Clarity analytics and Google Ads measurement used on eventsound.ie.",
    canonical: "https://eventsound.ie/cookie-policy",
  });

  return (
    <PageShell>
      <article className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <p className="section-kicker mb-3">Legal</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Cookie policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: 11 August 2026</p>

        <div className="mt-10 space-y-9 leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">How this website uses storage</h2>
            <p>
              EventSound uses essential browser storage to operate the website and remember your privacy choice. Optional analytics and advertising storage are disabled by default and are enabled only when you choose them.
            </p>
            <Button type="button" variant="outline" onClick={openConsentSettings}>Review cookie settings</Button>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Essential storage</h2>
            <div className="overflow-x-auto rounded-lg border border-border/60">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-card text-foreground">
                  <tr><th className="p-3">Item</th><th className="p-3">Purpose</th><th className="p-3">Duration</th></tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border/60">
                    <td className="p-3 font-mono text-xs">eventsound_cookie_consent_v1</td>
                    <td className="p-3">Remembers your analytics and advertising choices.</td>
                    <td className="p-3">Until you change the choice or clear browser storage.</td>
                  </tr>
                  <tr className="border-t border-border/60">
                    <td className="p-3">Cloudflare Turnstile security data</td>
                    <td className="p-3">Checks that an enquiry is submitted by a genuine visitor and protects the form from abuse.</td>
                    <td className="p-3">According to Cloudflare’s security and challenge settings.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Analytics</h2>
            <p>
              When analytics is enabled, Microsoft Clarity helps EventSound understand page use, scrolling, navigation, usability problems and progression through the enquiry form. Form fields are explicitly masked from Clarity, and EventSound’s custom analytics events contain only page, service, step and outcome labels—not names, email addresses, phone numbers or enquiry messages.
            </p>
            <p>
              Microsoft controls the names and lifetimes of its analytics cookies. See <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/cookies" target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2">Microsoft’s current Clarity cookie information</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Advertising measurement</h2>
            <p>
              When advertising measurement is enabled, Google Ads can record whether an advertisement resulted in a quotation request or phone-number click. EventSound uses this to measure campaign effectiveness rather than to add enquiry details to a mailing list.
            </p>
            <p>
              Google controls the names and lifetimes of its advertising cookies. See <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2">Google’s cookie information</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Campaign attribution</h2>
            <p>
              If analytics or advertising measurement is enabled, EventSound temporarily records the first landing page, referrer and campaign parameters in session storage. These details can accompany a submitted enquiry so the sales team can understand its likely source. Session storage is cleared when the browser session ends.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Changing your decision</h2>
            <p>
              Use “Cookie settings” in the footer at any time to accept, reject or change the optional categories. A new choice is applied immediately. You can also clear your browser storage to remove the saved choice and see the banner again.
            </p>
          </section>
        </div>
      </article>
    </PageShell>
  );
};

export default CookiePolicy;
