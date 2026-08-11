import { PageShell } from "@/components/site/PageShell";
import { siteConfig } from "@/config/site";
import { useSeo } from "@/hooks/useSeo";

const sectionClass = "space-y-3";

const PrivacyPolicy = () => {
  useSeo({
    title: "Privacy Policy | EventSound AV Services",
    description: "How EventSound AV Services collects, uses and protects personal information submitted through eventsound.ie.",
    canonical: "https://eventsound.ie/privacy-policy",
  });

  return (
    <PageShell>
      <article className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <p className="section-kicker mb-3">Legal</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Privacy policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: 11 August 2026</p>

        <div className="mt-10 space-y-9 leading-relaxed text-muted-foreground">
          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-foreground">Who is responsible for your information?</h2>
            <p>
              {siteConfig.legalName}, Townrath, Drogheda, Co. Louth, Ireland is responsible for personal information collected through this website. Questions or privacy requests can be sent to <a href={`mailto:${siteConfig.email}`} className="text-accent underline underline-offset-2">{siteConfig.email}</a>.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-foreground">Information we collect</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Contact and organisation details you provide, including your name, email address, phone number and company.</li>
              <li>Event information such as date, venue, audience size, services required, budget range and any details included in your message.</li>
              <li>Technical and security information required to operate and protect the form, including IP-related anti-abuse checks and Cloudflare Turnstile verification.</li>
              <li>With your permission, website usage and campaign-attribution information such as pages visited, referrer and UTM campaign parameters.</li>
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-foreground">Why we use it</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>To respond to an enquiry, clarify the event scope, prepare a quotation and take steps towards providing the requested service.</li>
              <li>To manage customer relationships, bookings and associated business records.</li>
              <li>To secure the website, prevent spam and diagnose service failures.</li>
              <li>Where permission has been given, to understand website usability and measure whether advertising generates genuine enquiries.</li>
            </ul>
            <p>
              Depending on the context, processing is based on your consent, steps taken at your request before a contract, performance of a contract, legal obligations or EventSound’s legitimate interest in operating and securing its business. Optional analytics and advertising storage remain off unless you choose to enable them.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-foreground">Service providers</h2>
            <p>Information may be processed on EventSound’s behalf by providers used to operate the website and enquiry process, including:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Netlify for website hosting and serverless form processing.</li>
              <li>EventSound’s configured email provider for delivering enquiries to the sales mailbox.</li>
              <li>Cloudflare Turnstile for form security and abuse prevention.</li>
              <li>Supabase for website content and image management.</li>
              <li>Microsoft Clarity for consent-controlled website analytics.</li>
              <li>Google Ads for consent-controlled advertising measurement.</li>
            </ul>
            <p>
              Some providers may process information outside the European Economic Area under their own documented transfer safeguards. EventSound does not sell personal information and does not add enquiry details to a mailing list through this form.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-foreground">How long information is kept</h2>
            <p>
              Enquiry and customer records are retained only for as long as reasonably required to respond, manage the commercial relationship, maintain necessary business records, resolve disputes and meet legal, tax or accounting obligations. The exact period depends on whether an enquiry becomes a booking and the nature of the record. Consent choices remain on your device until you change them or clear your browser storage.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-foreground">Your choices and rights</h2>
            <p>
              You may ask for access to your personal information, correction, deletion, restriction, portability or object to certain processing where those rights apply. You can withdraw optional analytics or advertising consent at any time using “Cookie settings” in the website footer.
            </p>
            <p>
              Contact <a href={`mailto:${siteConfig.email}`} className="text-accent underline underline-offset-2">{siteConfig.email}</a> to make a request. You may also raise a concern with Ireland’s <a href="https://www.dataprotection.ie/" target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2">Data Protection Commission</a>.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-foreground">Changes to this policy</h2>
            <p>We may update this notice when the website, providers or legal requirements change. The latest version and date will remain available on this page.</p>
          </section>
        </div>
      </article>
    </PageShell>
  );
};

export default PrivacyPolicy;
