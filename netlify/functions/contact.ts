import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import * as nodemailer from "nodemailer";

// In-memory rate limiting (resets on cold start, but provides baseline protection)
interface RateLimitEntry {
    count: number;
    firstSeen: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes in milliseconds
const RATE_LIMIT_MAX = 5; // Max 5 requests per window

// Clean up old entries periodically
function cleanupRateLimitMap() {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
          if (now - entry.firstSeen > RATE_LIMIT_WINDOW) {
                  rateLimitMap.delete(key);
          }
    }
}

// Check rate limit for an IP
function checkRateLimit(ip: string): boolean {
    cleanupRateLimitMap();

  const now = Date.now();
    const entry = rateLimitMap.get(ip);

  if (!entry) {
        rateLimitMap.set(ip, { count: 1, firstSeen: now });
        return true;
  }

  if (now - entry.firstSeen > RATE_LIMIT_WINDOW) {
        // Window expired, reset
      rateLimitMap.set(ip, { count: 1, firstSeen: now });
        return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
        return false; // Rate limit exceeded
  }

  entry.count++;
    return true;
}

// Verify Turnstile token with Cloudflare
async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
        console.error("TURNSTILE_SECRET_KEY not configured");
        return false;
  }

  try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
                method: "POST",
                headers: {
                          "Content-Type": "application/json",
                },
                body: JSON.stringify({
                          secret,
                          response: token,
                          remoteip: remoteIp,
                }),
        });

      const data = await response.json();
        return data.success === true;
  } catch (error) {
        console.error("Turnstile verification error:", error);
        return false;
  }
}

// Send email via SMTP
async function sendEmail(formData: any, userAgent: string, ip: string): Promise<void> {
    const {
          SMTP_HOST,
          SMTP_PORT,
          SMTP_USER,
          SMTP_PASS,
          EMAIL_TO,
          EMAIL_FROM,
    } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !EMAIL_TO || !EMAIL_FROM) {
        throw new Error("SMTP configuration incomplete");
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT),
        secure: parseInt(SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
        },
  });

  // Build subject line
  const subjectParts = ["New Event Sound Quote Request"];
    if (formData.name) subjectParts.push(formData.name);
    if (formData.event_date) subjectParts.push(formData.event_date);
    else if (formData.venue) subjectParts.push(formData.venue);

  const subject = subjectParts.join(" — ");

  // Build email body
  const bodyLines = [
        "New quote request received from EventSound website:",
        "",
        "=== CONTACT DETAILS ===",
        `Name: ${formData.name || "Not provided"}`,
        `Email: ${formData.email || "Not provided"}`,
        `Phone: ${formData.phone || "Not provided"}`,
        `Company: ${formData.company || "Not provided"}`,
        "",
      ];

  if (formData.event_date || formData.event_type || formData.venue || formData.audience_size) {
        bodyLines.push("=== EVENT DETAILS ===");
        if (formData.event_date) bodyLines.push(`Event Date: ${formData.event_date}`);
        if (formData.event_type) bodyLines.push(`Event Type: ${formData.event_type}`);
        if (formData.venue) bodyLines.push(`Venue: ${formData.venue}`);
        if (formData.audience_size) bodyLines.push(`Audience Size: ${formData.audience_size}`);
        bodyLines.push("");
  }

  if (formData.services && formData.services.length > 0) {
        bodyLines.push("=== SERVICES REQUESTED ===");
        bodyLines.push(formData.services.join(", "));
        bodyLines.push("");
  }

  if (formData.budget_range) {
        bodyLines.push("=== BUDGET ===");
        bodyLines.push(`Budget Range: ${formData.budget_range}`);
        bodyLines.push("");
  }

  if (formData.message) {
        bodyLines.push("=== MESSAGE ===");
        bodyLines.push(formData.message);
        bodyLines.push("");
  }

  bodyLines.push("=== SUBMISSION INFO ===");
    bodyLines.push(`IP Address: ${ip}`);
    bodyLines.push(`User Agent: ${userAgent}`);
    bodyLines.push(`Timestamp: ${new Date().toISOString()}`);

  const htmlBody = bodyLines.join("<br/>").replace(/===/g, "<strong>").replace(/<\/strong>/g, "</strong>");

  // Send email
  await transporter.sendMail({
        from: `"Event Sound Contact Form" <${EMAIL_FROM}>`,
        to: EMAIL_TO,
        subject,
        text: bodyLines.join("\n"),
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px;">${htmlBody}</div>`,
  });
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // Only allow POST
    if (event.httpMethod !== "POST") {
          return {
                  statusCode: 405,
                  body: JSON.stringify({ ok: false, error: "Method not allowed" }),
          };
    }

    // Get client IP
    const ip = event.headers["x-forwarded-for"]?.split(",")[0].trim() || 
                    event.headers["client-ip"] || 
                    "unknown";

    const userAgent = event.headers["user-agent"] || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
          return {
                  statusCode: 429,
                  body: JSON.stringify({ ok: false, error: "Too many requests. Please try again later." }),
          };
    }

    try {
          // Parse request body
      const body = JSON.parse(event.body || "{}");

      // 1. Check honeypot
      if (body.website) {
              console.log(`Honeypot triggered from IP: ${ip}`);
              // Return success to avoid revealing the honeypot
            return {
                      statusCode: 200,
                      body: JSON.stringify({ ok: true }),
            };
      }

      // 2. Verify Turnstile token
      const turnstileToken = body.turnstileToken;
          if (!turnstileToken) {
                  return {
                            statusCode: 400,
                            body: JSON.stringify({ ok: false, error: "CAPTCHA verification required" }),
                  };
          }

      const isValidTurnstile = await verifyTurnstileToken(turnstileToken, ip);
          if (!isValidTurnstile) {
                  return {
                            statusCode: 400,
                            body: JSON.stringify({ ok: false, error: "CAPTCHA verification failed" }),
                  };
          }

      // 3. Validate required fields
      if (!body.name || !body.email) {
              return {
                        statusCode: 400,
                        body: JSON.stringify({ ok: false, error: "Name and email are required" }),
              };
      }

      // 4. Send email
      await sendEmail(body, userAgent, ip);

      // 5. Return success
      return {
              statusCode: 200,
              headers: {
                        "Content-Type": "application/json",
              },
              body: JSON.stringify({ ok: true }),
      };

    } catch (error: any) {
          console.error("Contact form error:", error);
          return {
                  statusCode: 500,
                  body: JSON.stringify({ ok: false, error: "Internal server error" }),
          };
    }
};
