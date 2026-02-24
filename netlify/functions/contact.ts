import type { Handler } from "@netlify/functions";
import nodemailer from "nodemailer";

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

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

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // skip if not configured
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = await res.json();
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
    const body = JSON.parse(event.body || "{}");
    const { name, email, phone, company, event_date, venue, event_type, audience_size, services_needed, budget_range, message, honeypot, turnstileToken } = body;

    if (honeypot) {
      console.log("Honeypot triggered");
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    const clientIp = event.headers["x-forwarded-for"]?.split(",")[0]?.trim() || event.headers["client-ip"] || "unknown";
    if (!checkRateLimit(clientIp)) {
      return { statusCode: 429, body: JSON.stringify({ error: "Too many requests. Please try again later." }) };
    }

    // Turnstile verification
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return { statusCode: 400, body: JSON.stringify({ error: "CAPTCHA verification required" }) };
      }
      const valid = await verifyTurnstile(turnstileToken, clientIp);
      if (!valid) {
        return { statusCode: 400, body: JSON.stringify({ error: "CAPTCHA verification failed" }) };
      }
    }

    if (!name || !email || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields" }) };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid email address" }) };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const row = (label: string, value: string) =>
      `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;white-space:nowrap">${label}</td><td style="padding:8px;border-bottom:1px solid #eee">${value}</td></tr>`;

    const htmlContent = `
<h2 style="font-family:sans-serif">New Event Enquiry</h2>
<table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
  ${row("Name", name)}
  ${row("Email", `<a href="mailto:${email}">${email}</a>`)}
  ${row("Phone", phone || "Not provided")}
  ${row("Company", company || "Not provided")}
  ${row("Event Type", event_type || "Not specified")}
  ${row("Event Date", event_date || "Not provided")}
  ${row("Venue", venue || "Not provided")}
  ${row("Audience Size", audience_size || "Not specified")}
  ${row("Services Needed", services_needed || "Not specified")}
  ${row("Budget Range", budget_range || "Not specified")}
</table>
<h3 style="font-family:sans-serif;margin-top:24px">Additional Details</h3>
<p style="font-family:sans-serif;white-space:pre-wrap">${message.replace(/\n/g, "<br/>")}</p>`;

    const textContent = [
      "New Event Enquiry", "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Company: ${company || "Not provided"}`,
      `Event Type: ${event_type || "Not specified"}`,
      `Event Date: ${event_date || "Not provided"}`,
      `Venue: ${venue || "Not provided"}`,
      `Audience Size: ${audience_size || "Not specified"}`,
      `Services Needed: ${services_needed || "Not specified"}`,
      `Budget Range: ${budget_range || "Not specified"}`,
      "", "Additional Details:", message,
    ].join("\n");

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Enquiry from ${name} — ${event_type || "General"}`,
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
