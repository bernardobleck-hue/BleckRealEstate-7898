# BleckTeam Real Estate — Design

Bilingual (EN primary / PT toggle) single-page lead-generation site for BleckTeam, real estate
consultants helping international buyers and investors acquire property in Lisbon, Cascais and
Portugal's West Coast. Platform: web only. Visual direction: **quiet luxury** — deep charcoal,
brushed gold, editorial serif headlines, wide negative space, one cinematic 3D moment in the hero.
Core job: turn an anonymous visitor into a qualified, contactable lead.

## Brand & Colors

Tokens in `packages/web/src/web/styles.css`. Light-first; the site is intentionally single-theme
(no dark-mode toggle) because the palette already alternates dark and cream sections.

| Token | Value | Use |
|-------|-------|-----|
| `--ink` | `#101211` | Darkest surface, footer, hero base |
| `--char` | `#181b1a` | Dark section background |
| `--char-2` | `#222624` | Elevated dark surface / cards on dark |
| `--gold` | `#bb985a` | Primary accent: buttons, eyebrows, rules, 3D lighting |
| `--gold-soft` | `#d8bf8e` | Hover, gradients, glow |
| `--cream` | `#f8f6f1` | Light section background |
| `--paper` | `#ffffff` | Cards on cream |
| `--line` | `#dedbd4` | Hairlines on light |
| `--line-dark` | `rgba(255,255,255,.14)` | Hairlines on dark |
| `--muted` | `#5e625e` | Secondary text on light |
| `--muted-dark` | `#a8ada7` | Secondary text on dark |

Accent rule: gold marks **one** thing per viewport — the action. Never gold-on-gold decoration.

## Typography

- **Display**: Playfair Display 400/500 — headlines only, tight tracking (`-0.03em`), `line-height: 1.03`.
- **Body/UI**: DM Sans 400/500/600/700.
- **Eyebrow/label**: DM Sans 700, `10px`, `uppercase`, `letter-spacing: .18em`, gold.
- Scale: h1 `clamp(46px, 6vw, 84px)`, h2 `clamp(32px, 3.6vw, 52px)`, body `15–17px`, `line-height 1.7`.

## Motion

- Page load: staggered reveal of hero eyebrow → headline lines → sub → CTAs → trust strip.
- Scroll: `useInView` fade-up (24px, 0.7s, custom ease) once per element; never re-animate.
- 3D: continuous slow orbit + parallax on pointer; pauses when off-screen.
- `prefers-reduced-motion` disables the orbit and all transforms; 3D falls back to a still image.
- Library: `motion` (Framer Motion v13) for React, plain CSS for the hero load sequence.

## 3D Hero

`components/hero-scene.tsx` — react-three-fiber. A procedurally generated stylised Lisbon block:
tiered white/cream buildings with terracotta roofs on a dark plinth, a lighthouse mast, and a
reflective water plane, lit by a warm gold key light and a cool rim. Slowly orbits; pointer adds
±6° parallax. Loaded with `React.lazy` + `Suspense`, and skipped entirely on coarse pointers under
768px or when `prefers-reduced-motion` is set (static `hero-lisbon.jpg` instead).

## Pages & Sections

- **Web — Home** (`packages/web/src/web/pages/index.tsx`), composed of section components in
  `src/web/components/sections/`:
  1. `nav` — transparent over hero, solid on scroll, EN/PT toggle, "Book a call" CTA
  2. `hero` — 3D scene + headline + dual CTA + credibility strip
  3. `trust-bar` — years, transactions, nationalities served, languages
  4. `lead-form` — 3-step qualifier, the primary conversion unit
  5. `process` — 4-step "how we work" (removes buyer uncertainty)
  6. `areas` — Lisbon / Cascais / West Coast cards with real photography
  7. `guide` — lead magnet, email-gated PDF
  8. `about` — Bernardo & Diana, team photo, credentials
  9. `testimonials` — auto-advancing carousel of the six real reviews
  10. `faq` — objection handling for foreign buyers (NIF, taxes, remote purchase, financing)
  11. `final-cta` — booking + WhatsApp
  12. `footer`
  - Floating: `sticky-cta` (mobile bar), `exit-intent` (desktop modal)

## Key User Flows

1. **Qualified lead**: land → scroll or click "Start your search" → 3-step form (intent → budget +
   timeline → name/email/phone) → POST `leads.create` → row in `leads` + notification email to
   Bernardo + confirmation email to the visitor → success state with WhatsApp shortcut.
2. **Low-intent lead**: land → guide section or exit-intent modal → email only → POST
   `leads.subscribeGuide` → row in `leads` (source `guide`) → PDF link on screen + by email.
3. **Immediate contact**: sticky bar → WhatsApp deep link or `tel:`.

## Architecture

- **API**: oRPC `leads` router in `packages/web/src/api/routes/leads.ts`; email via
  `src/api/services/email.ts` (Resend, no-ops with a warning when `RESEND_API_KEY` is unset so the
  form never fails).
- **DB**: single `leads` table (Drizzle/Turso) — always written before email is attempted.
- **i18n**: `src/web/lib/i18n.tsx` — typed EN/PT dictionary + `LanguageProvider`/`useT()`,
  persisted in `localStorage`, defaults to EN.
- **State/sync**: TanStack Query mutations with pending/success/error states on every submit button.
