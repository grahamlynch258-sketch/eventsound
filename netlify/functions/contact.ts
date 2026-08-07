import type { Handler } from "@netlify/functions";
import nodemailer from "nodemailer";

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_FIELD_LENGTH = 2_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) return false;
  record.count++;
  return true;
}

function clean(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const rawBody = JSON.parse(event.body || "{}");
    const attribution = typeof rawBody.attribution === "object" && rawBody.attribution ? rawBody.attribution : {};
    const name = clean(rawBody.name);
    const email = clean(rawBody.email);
    const phone = clean(rawBody.phone);
    const company = clean(rawBody.company);
    const contactPreference = clean(rawBody.contact_preference);
    const eventDate = clean(rawBody.event_date);
    const eventDateTbc = rawBody.event_date_tbc === true;
    const venue = clean(rawBody.venue);
    const eventType = clean(rawBody.event_type);
    const audienceSize = clean(rawBody.audience_size);
    const servicesNeeded = clean(rawBody.services_needed);
    const budgetRange = clean(rawBody.budget_range);
    const decisionDeadline = clean(rawBody.decision_deadline);
    const leadSource = clean(rawBody.lead_source);
    const formContext = clean(rawBody.form_context, "General enquiry");
    const message = clean(rawBody.message);
    const honeypot = clean(rawBody.honeypot);
    const turnstileToken = clean(rawBody.turnstileToken);

    if (honeypot) {
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    const clientIp = event.headers["x-forwarded-for"]?.split(",")[0]?.trim() || event.headers["client-ip"] || "unknown";
    if (!checkRateLimit(clientIp)) {
      return { statusCode: 429, body: JSON.stringify({ error: "Too many requests. Please try again later." }) };
    }

    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return { statusCode: 400, body: JSON.stringify({ error: "CAPTCHA verification required" }) };
      }
      if (!(await verifyTurnstile(turnstileToken, clientIp))) {
        return { statusCode: 400, body: JSON.stringify({ error: "CAPTCHA verification failed" }) };
      }
    }

    if (!name || !email || !message || !venue || !eventType || !servicesNeeded || (!eventDate && !eventDateTbc)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required event details" }) };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid email address" }) };
    }

    const landingPage = clean(attribution.landing_page);
    const referrer = clean(attribution.referrer);
    const firstLandingPage = clean(attribution.first_landing_page);
    const firstReferrer = clean(attribution.first_referrer);
    const firstTouchAt = clean(attribution.first_touch_at);
    const utmSource = clean(attribution.utm_source);
    const utmMedium = clean(attribution.utm_medium);
    const utmCampaign = clean(attribution.utm_campaign);
    const utmContent = clean(attribution.utm_content);
    const utmTerm = clean(attribution.utm_term);
    const gclid = clean(attribution.gclid);
    const msclkid = clean(attribution.msclkid);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const display = (value: string, fallback = "Not provided") => value || fallback;
    const row = (label: string, value: string) =>
      `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:8px;border-bottom:1px solid #eee;overflow-wrap:anywhere">${escapeHtml(value)}</td></tr>`;

    const eventDateDisplay = eventDateTbc ? "Not confirmed yet" : eventDate;
    const rows = [
      ["Name", name], ["Email", email], ["Phone", display(phone)], ["Company", display(company)],
      ["Preferred Response", display(contactPreference)], ["Event Type", eventType], ["Event Date", eventDateDisplay],
      ["Venue / Town", venue], ["Audience Size", display(audienceSize, "Not specified")],
      ["Services Needed", servicesNeeded], ["Budget Range", display(budgetRange, "Not confirmed")],
      ["Quote / Decision Deadline", display(decisionDeadline)], ["Stated Lead Source", display(leadSource, "Unknown")],
      ["Form Context", formContext], ["Submitting Page", display(landingPage, "Unavailable")],
      ["Referrer", display(referrer, "Unavailable")], ["First Landing Page", display(firstLandingPage, "Unavailable")],
      ["First Referrer", display(firstReferrer, "Unavailable")], ["First Touch At", display(firstTouchAt, "Unavailable")],
      ["UTM Source", display(utmSource, "None")], ["UTM Medium", display(utmMedium, "None")],
      ["UTM Campaign", display(utmCampaign, "None")], ["UTM Content", display(utmContent, "None")],
      ["UTM Term", display(utmTerm, "None")], ["Google Click ID", display(gclid, "None")],
      ["Microsoft Click ID", display(msclkid, "None")],
    ];

    const htmlContent = `
<h2 style="font-family:sans-serif">New Event Enquiry</h2>
<table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
  ${rows.map(([label, value]) => row(label, value)).join("\n  ")}
</table>
<h3 style="font-family:sans-serif;margin-top:24px">Event Details</h3>
<p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`;

    const textContent = [
      "New Event Enquiry", "",
      ...rows.map(([label, value]) => `${label}: ${value}`),
      "", "Event Details:", message,
    ].join("\n");

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Enquiry from ${name} — ${eventType}`,
      text: textContent,
      html: htmlContent,
      replyTo: email,
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error("Contact form error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to send message" }) };
  }
};
