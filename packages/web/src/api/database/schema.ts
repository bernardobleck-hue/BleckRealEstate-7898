import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * Every lead captured on the site — the multi-step qualifier, the guide
 * download and the exit-intent modal all write here before any email is sent,
 * so a mail outage can never lose a lead.
 */
export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email").notNull(),
  phone: text("phone"),
  country: text("country"),
  /** buy | invest | rental | sell | relocate | other */
  intent: text("intent"),
  budget: text("budget"),
  timeline: text("timeline"),
  area: text("area"),
  message: text("message"),
  /** form | guide | exit_intent */
  source: text("source").notNull().default("form"),
  /** en | pt */
  locale: text("locale").notNull().default("en"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
