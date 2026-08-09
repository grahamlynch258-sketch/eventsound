import { describe, expect, it } from "vitest";
import { canonicalUrlForPath } from "@/lib/seo";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/lib/schema";

describe("SEO consistency", () => {
  it("normalises every canonical to the apex host with a trailing slash", () => {
    expect(canonicalUrlForPath("/")).toBe("https://eventsound.ie/");
    expect(canonicalUrlForPath("/contact")).toBe("https://eventsound.ie/contact/");
    expect(canonicalUrlForPath("https://www.eventsound.ie/services/av-production?utm_source=test#quote"))
      .toBe("https://eventsound.ie/services/av-production/");
  });

  it("builds FAQ schema directly from the supplied visible questions", () => {
    const questions = [
      { question: "Where are you based?", answer: "Drogheda, Co. Louth." },
      { question: "Do you work nationwide?", answer: "Yes, throughout Ireland." },
    ];
    const schema = JSON.parse(generateFAQSchema({ questions }));

    expect(schema.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({
      question: item.name,
      answer: item.acceptedAnswer.text,
    }))).toEqual(questions);
  });

  it("references the single site organisation from service schema", () => {
    const schema = JSON.parse(generateServiceSchema({
      name: "Conference AV Hire",
      description: "Conference AV hire across Ireland.",
      url: "https://www.eventsound.ie/services/conference-av-hire",
      provider: { name: "EventSound", url: "https://eventsound.ie" },
      areaServed: ["Ireland"],
      serviceType: "Conference Audio Visual Hire",
    }));

    expect(schema.url).toBe("https://eventsound.ie/services/conference-av-hire/");
    expect(schema.provider).toEqual({ "@id": "https://eventsound.ie/#organization" });
  });

  it("normalises breadcrumb item URLs", () => {
    const schema = JSON.parse(generateBreadcrumbSchema({
      items: [
        { name: "Home", url: "https://www.eventsound.ie" },
        { name: "Services", url: "https://eventsound.ie/services" },
      ],
    }));

    expect(schema.itemListElement.map((item: { item: string }) => item.item)).toEqual([
      "https://eventsound.ie/",
      "https://eventsound.ie/services/",
    ]);
  });
});
