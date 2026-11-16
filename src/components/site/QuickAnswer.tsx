import type { QuickAnswerContent } from "@/content/quickAnswers";

/**
 * Answer-first block for service pages: the question a buyer is asking, a
 * short direct answer, then the key facts as a table. It sits at the top of
 * the page body so people, search engines and AI assistants reach the
 * substance before the longer copy. Content lives in src/content/quickAnswers.ts.
 */
export function QuickAnswer({ content, className = "" }: { content: QuickAnswerContent; className?: string }) {
  const headingId = `quick-answer-${content.key}`;
  return (
    <section
      aria-labelledby={headingId}
      className={`mx-auto max-w-3xl rounded-xl border border-accent/30 bg-card/40 p-6 text-left md:p-8 ${className}`}
    >
      <p className="section-kicker mb-2">In brief</p>
      <h2 id={headingId} className="text-2xl font-semibold tracking-tight">
        {content.question}
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-foreground/90">{content.answer}</p>
      <table className="mt-6 w-full border-collapse text-sm">
        <caption className="sr-only">{content.tableCaption}</caption>
        <tbody>
          {content.facts.map((fact) => (
            <tr key={fact.label} className="border-t border-border/50 align-top">
              <th scope="row" className="w-2/5 py-3 pr-4 text-left font-semibold text-foreground sm:w-1/3">
                {fact.label}
              </th>
              <td className="py-3 text-muted-foreground">{fact.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
