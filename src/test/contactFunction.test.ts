import { beforeEach, describe, expect, it, vi } from "vitest";

const { sendMail } = vi.hoisted(() => ({
  sendMail: vi.fn().mockResolvedValue({ messageId: "mock-message" }),
}));

vi.mock("nodemailer", () => ({
  default: {
    createTransport: () => ({ sendMail }),
  },
}));

import { handler } from "../../netlify/functions/contact";

describe("contact function", () => {
  beforeEach(() => sendMail.mockClear());

  it("includes qualification and attribution data in a mocked enquiry email", async () => {
    const result = await handler({
      httpMethod: "POST",
      headers: { "x-forwarded-for": "203.0.113.42" },
      body: JSON.stringify({
        name: "Laura Test",
        email: "laura@example.ie",
        phone: "012345678",
        contact_preference: "Phone call",
        event_type: "Festival / Outdoor",
        event_date_tbc: true,
        venue: "Mullingar",
        services_needed: "Sound / PA Systems, Lighting Design",
        budget_range: "€3,000 - €5,000",
        decision_deadline: "2026-08-14",
        lead_source: "Google / search engine",
        form_context: "Lighting Design",
        message: "Five-piece band <script>alert('x')</script>",
        attribution: {
          landing_page: "https://eventsound.ie/services/lighting-design/",
          first_landing_page: "https://eventsound.ie/?utm_source=google",
          utm_source: "google",
          utm_campaign: "lighting-hire",
          gclid: "mock-click-id",
        },
      }),
    } as never, {} as never, () => undefined) as { statusCode: number };

    expect(result.statusCode).toBe(200);
    expect(sendMail).toHaveBeenCalledOnce();

    const message = sendMail.mock.calls[0][0];
    expect(message.text).toContain("Preferred Response: Phone call");
    expect(message.text).toContain("Submitting Page: https://eventsound.ie/services/lighting-design/");
    expect(message.text).toContain("UTM Campaign: lighting-hire");
    expect(message.text).toContain("Google Click ID: mock-click-id");
    expect(message.html).toContain("&lt;script&gt;");
    expect(message.html).not.toContain("<script>");
  });
});
