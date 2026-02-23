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
    const { name, email, phone, company, event_date, venue, message, honeypot, turnstileToken } = body;

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

    const htmlContent = [
      `<h2>New Contact Form Submission</h2>`,
      `<p><strong>Name:</strong> ${name}</p>`,
      `<p><strong>Email:</strong> ${email}</p>`,
      phone ? `<p><strong>Phone:</strong> ${phone}</p>` : "",
      company ? `<p><strong>Company:</strong> ${company}</p>` : "",
      event_date ? `<p><strong>Event Date:</strong> ${event_date}</p>` : "",
      venue ? `<p><strong>Venue:</strong> ${venue}</p>` : "",
      `<p><strong>Message:</strong></p>`,
      `<p>${message.replace(/\n/g, "<br/>")}</p>`,
    ].filter(Boolean).join("\n");

    const textContent = [
      "New Contact Form Submission", "",
      `Name: ${name}`, `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      company ? `Company: ${company}` : "",
      event_date ? `Event Date: ${event_date}` : "",
      venue ? `Venue: ${venue}` : "",
      "", "Message:", message,
    ].filter(Boolean).join("\n");

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form: ${name}`,
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
