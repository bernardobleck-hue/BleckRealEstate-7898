import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

/** Where new lead notifications are delivered. */
export const OWNER_EMAIL = process.env.LEAD_NOTIFY_EMAIL ?? "bernardo.bleck@century21.pt";
/**
 * Verified sender. Resend's onboarding@resend.dev works out of the box but can
 * only deliver to the account owner — set MAIL_FROM once the domain is verified.
 */
export const MAIL_FROM = process.env.MAIL_FROM ?? "BleckTeam <onboarding@resend.dev>";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Sends an email when Resend is configured. Never throws: lead capture must
 * succeed even if the mail provider is down or the key is missing.
 */
export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY not set — skipped "${subject}" to ${String(to)}`);
    return { skipped: true as const };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: MAIL_FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
    });
    if (error) {
      console.error(`[email] failed "${subject}":`, error.message);
      return { skipped: false as const, error: error.message };
    }
    return { skipped: false as const, id: data?.id };
  } catch (err) {
    console.error(`[email] threw for "${subject}":`, err);
    return { skipped: false as const, error: String(err) };
  }
}
