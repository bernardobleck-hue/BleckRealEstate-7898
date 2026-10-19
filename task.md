# BleckTeam landing page — task

## Goal
Rebuild bleckteam landing page: more leads + dynamic 3D.

## Decisions
- EN primary, PT toggle (context + dictionary, localStorage persisted)
- 3D: react-three-fiber hero — procedural Lisbon/Cascais cityscape, rotating, gold accent. Lazy + reduced-motion + mobile fallback to static image.
- Palette from original: ink #101211, char #181b1a, gold #bb985a, cream #f8f6f1
- Fonts: Playfair Display (display) + DM Sans (body) — keep brand
- Lead form: 3-step (intent → budget/timeline → contact). Saves to DB + emails bernardo.bleck@century21.pt via Resend
- Lead magnet: guide PDF gated by email (public/guide/…pdf)
- Sticky mobile CTA bar + desktop exit-intent modal
- Removed fake listings → "Where we work" areas + market snapshot
- Contact: +351 962 804 636 (wa.me/351962804636), bernardo.bleck@century21.pt

## Progress
- [x] app_init (3rd attempt; first two failed provisioning)
- [x] assets into public/images (hero-lisbon, area-*, facade, team)
- [x] deps: three, r3f, drei, motion, resend
- [x] design.md
- [x] db schema + leads route + email service (leads.create / requestGuide / list — smoke-tested OK, test rows deleted)
- [x] i18n dictionary (EN + PT, toggle verified)
- [x] all 14 sections + page composed, LanguageProvider wired
- [x] guide PDF (13 pages) at public/guide/bleckteam-portugal-buyers-guide.pdf
- [x] 3D hero verified via swiftshader chrome; tuned sky/fog/camera
- [x] nav breakpoint lg -> xl (was cramped at 1024)
- [x] removed invented "AMI 5836" from footer
- [x] tsc + vite build pass; dev server on 5173; delivered
- [ ] OPEN: RESEND_API_KEY + verified MAIL_FROM domain (emails currently log-and-skip)
- [ ] OPEN: confirm trust-bar stats (8+, 120+, 18) and "since 2018" claim

## /guide web version — done (Aug 9)
- Route registered at /guide in app.tsx
- Footer nav works off-homepage (/#id) + "Buyer's guide" link added (EN+PT)
- Homepage guide section: "Read the full guide online" -> /guide
- Hash deep-link scrolling added on index page mount
- PDF page count corrected 12 -> 13 everywhere
- Verified: build passes, screenshots at 1440x900 + 390x844, rail active state, tables, mid-article capture, end CTA
- Still open: guide page is EN-only; RESEND_API_KEY empty; trust-bar stats / "since 2018" / AMI number unconfirmed

## GEO update (session 3)
- [x] dictionary EN+PT: hero, fears (new), sourcing (new), guide=Blueprint, faq 8 GEO items, footer AMI 16282 + services
- [ ] sections/fears.tsx, sections/sourcing.tsx components
- [ ] index.tsx wiring, nav link
- [ ] footer AMI render
- [ ] guide-content.ts: IMT 7.5% non-tax-resident, Golden Visa oct-2023, D7/D8/IFICI chapter
- [ ] index.html title/meta + @graph JSON-LD (RealEstateAgent + WebSite + Book + FAQPage)
- [ ] public/llms.txt
- [ ] build + screenshots + deliver
Confirmed by client: AMI 16282; IMT 7.5% non-tax-resident correct; trust numbers OK; old PDF superseded (new file not yet supplied).
