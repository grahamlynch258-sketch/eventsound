import { PageShell } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { faqs } from "@/content/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <PageShell>
      <main>
        <section className="container py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="section-kicker mb-3">Support</p>
            <div className="gold-rule mb-5" />
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Common questions about our services, equipment, and event planning process.
            </p>
          </div>
        </section>

        <section className="container pb-20 md:pb-28">
          <div className="max-w-3xl space-y-12">
            {faqs.map((category) => (
              <div key={category.title}>
                <h2 className="font-serif text-xl font-semibold mb-4">{category.title}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.items.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`${category.title}-${i}`}
                      className="rounded-xl border border-border/50 bg-card px-5"
                    >
                      <AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
    </PageShell>
  );
}
