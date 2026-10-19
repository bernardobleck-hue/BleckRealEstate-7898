import { z } from "zod";
import { desc } from "drizzle-orm";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";
import { OWNER_EMAIL, sendEmail } from "../services/email";
import {
  confirmationSubject,
  leadConfirmationHtml,
  ownerNotificationHtml,
} from "../services/lead-emails";

const GUIDE_PATH = "/guide/bleckteam-portugal-buyers-guide.pdf";

const localeSchema = z.enum(["en", "pt"]).default("en");

const createInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional(),
  country: z.string().trim().max(80).optional(),
  intent: z.string().trim().max(60).optional(),
  budget: z.string().trim().max(60).optional(),
  timeline: z.string().trim().max(60).optional(),
  area: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
  locale: localeSchema,
});

const guideInput = z.object({
  name: z.string().trim().max(120).optional(),
  email: z.string().trim().email().max(160),
  source: z.enum(["guide", "exit_intent"]).default("guide"),
  locale: localeSchema,
});

function siteUrl() {
  return (process.env.WEBSITE_URL ?? "").replace(/\/$/, "");
}

export const leads = {
  /** Multi-step qualifier submission — the primary conversion. */
  create: base.input(createInput).handler(async ({ input }) => {
    const [lead] = await db
      .insert(schema.leads)
      .values({ ...input, source: "form" })
      .returning();

    const fields = { ...input, source: "form" };

    await Promise.all([
      sendEmail({
        to: OWNER_EMAIL,
        subject: `New lead · ${input.name}${input.budget ? ` · ${input.budget}` : ""}`,
        html: ownerNotificationHtml(fields),
        replyTo: input.email,
      }),
      sendEmail({
        to: input.email,
        subject: confirmationSubject(input.locale),
        html: leadConfirmationHtml(fields),
        replyTo: OWNER_EMAIL,
      }),
    ]);

    return { id: lead?.id ?? 0, ok: true };
  }),

  /** Email-gated buyer's guide (also used by the exit-intent modal). */
  requestGuide: base.input(guideInput).handler(async ({ input }) => {
    await db.insert(schema.leads).values({
      name: input.name,
      email: input.email,
      source: input.source,
      locale: input.locale,
    });

    const fields = { ...input, source: input.source };
    const url = `${siteUrl()}${GUIDE_PATH}`;

    await Promise.all([
      sendEmail({
        to: OWNER_EMAIL,
        subject: `Guide download · ${input.email}`,
        html: ownerNotificationHtml(fields),
        replyTo: input.email,
      }),
      sendEmail({
        to: input.email,
        subject:
          input.locale === "pt"
            ? "O seu guia: Comprar imóvel em Portugal"
            : "Your guide: Buying property in Portugal",
        html: leadConfirmationHtml(fields, url),
        replyTo: OWNER_EMAIL,
      }),
    ]);

    return { ok: true, guideUrl: GUIDE_PATH };
  }),

  /** Simple internal list for checking captured leads. */
  list: base.handler(() =>
    db.select().from(schema.leads).orderBy(desc(schema.leads.createdAt)).limit(200),
  ),
};
