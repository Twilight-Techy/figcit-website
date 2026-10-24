# Figcit Website: Implementation Plan

The goal is to launch www.figcit.co.uk by December 2026, matching the Figma design and Website Copy v2.0, within the rules in [PROJECT_RULES.md](./PROJECT_RULES.md).

Tasks are picked up one at a time, in order. Each task is one pull request that references its ID. Update the status here in the same pull request.

**Status key:** ✅ done · 🔄 in progress · ⬜ not started

## Phase 0: Foundations

| ID  | Task                                                                                                                                                                                | Done when                                                                  | Status |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------ |
| T01 | Project setup: Next.js and Payload base, folder structure, rules, plan, env validation, security headers, CI workflow                                                               | Repo builds locally; lint and type check pass; structure matches the rules | ✅     |
| T02 | Design tokens and fonts: colours, type scale, spacing, radii and shadows from Figma; Figtree and Atkinson Hyperlegible Next self-hosted; light, dark and low-stimulation token sets | Tokens page renders all three modes; contrast checks pass                  | ✅     |
| T03 | Payload hardening: admin lockout and password rules, explicit access on every collection, media sizes, object storage (UK or EU), first migration                                   | Admin works against Neon; uploads land in object storage                   | ✅     |
| T04 | Environments: Neon project (dev branch and production), Vercel project with London functions, environment variables, preview deploys per pull request                               | Preview URL is live for every pull request                                 | ⬜     |

## Phase 1: Site shell

| ID  | Task                                                                                                                                       | Done when                                                                       | Status |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------ |
| T05 | Header: logo, Services mega menu, Who we help dropdown, About, Contact, Comfort button, two call-to-action buttons; mobile header and menu | Matches design states A and B and mobile 14b; keyboard and screen-reader tested | ⬜     |
| T06 | Footer: tagline, links, crisis notice, company details from SiteSettings                                                                   | Crisis notice on every page and not removable in the CMS                        | ⬜     |
| T07 | Comfort panel: low-stimulation mode, three text sizes, light and dark theme; saved and applied before first paint                          | Matches design state C; no flash on load; reduced motion respected              | ⬜     |
| T08 | Cookie banner and consent: equal Accept and Reject, settings link, Plausible loaded only after Accept                                      | Matches design state D; no analytics request before consent                     | ⬜     |
| T09 | SEO base: metadata helper, canonical URLs, Open Graph, Organization JSON-LD, sitemap, robots, www redirect                                 | Lighthouse SEO ≥ 95; sitemap lists every page                                   | ⬜     |

## Phase 2: Content model

| ID  | Task                                                                                                                                                                                           | Done when                                                | Status |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------ |
| T10 | Blocks: Hero, Section intro, Card grid, Path buttons, Story timeline, Stats, Quote, Call-to-action band, Sticky in-page menu, Accordion, Legal text, Team member; each with its React renderer | Every Figma section can be built from blocks             | ⬜     |
| T11 | Pages collection and globals (Header nav, Footer, SiteSettings), with drafts, live preview and revalidation on publish                                                                         | Publishing a change updates the live page within seconds | ⬜     |
| T12 | Seed script that loads all Website Copy v2.0 text into Payload                                                                                                                                 | A fresh database seeds every page                        | ⬜     |

## Phase 3: Pages

| ID  | Task                                   | Route                                                                              | Status |
| --- | -------------------------------------- | ---------------------------------------------------------------------------------- | ------ |
| T13 | Home                                   | `/`                                                                                | ⬜     |
| T14 | Our Services, with sticky in-page menu | `/services`                                                                        | ⬜     |
| T15 | For you                                | `/for-you`                                                                         | ⬜     |
| T16 | For employers                          | `/for-employers`                                                                   | ⬜     |
| T17 | For colleges and universities          | `/for-education`                                                                   | ⬜     |
| T18 | For government, NHS and funders        | `/partners`                                                                        | ⬜     |
| T19 | About us                               | `/about`                                                                           | ⬜     |
| T20 | Our team                               | `/about/team`                                                                      | ⬜     |
| T21 | Contact                                | `/contact`                                                                         | ⬜     |
| T22 | Questions (accordion)                  | `/faqs`                                                                            | ⬜     |
| T23 | Legal pages from one template          | `/privacy`, `/cookies`, `/accessibility`, `/terms`, `/safeguarding`, `/complaints` | ⬜     |

Each page is done when it matches Figma at 1440 px and 390 px, matches the copy document, and passes the axe checks.

## Phase 4: Forms

| ID  | Task                                                                                                                                                                                       | Done when                                                        | Status |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------ |
| T24 | Form backend: FormSubmissions collection (admin-only), server actions, Zod schemas, rate limiting, honeypot and Turnstile, Resend notification to admin@figcit.co.uk, 12-month auto-delete | Invalid, spam and rate-limited requests are rejected and tested  | ⬜     |
| T25 | Four forms (Get early access, Book a conversation, Hub interest, Partner with us) with all states from design page 11                                                                      | Success, error and loading states match design; no health fields | ⬜     |

## Phase 5: Quality and launch

| ID  | Task                                                                                                                      | Done when                                      | Status |
| --- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------ |
| T26 | Accessibility pass: axe on every page in all Comfort modes, manual keyboard and screen-reader check, 320 px and 200% zoom | No violations; accessibility statement updated | ⬜     |
| T27 | Performance pass: Lighthouse CI budgets on Home, Services and Contact; image and font audit                               | All budgets in rules section 3 pass            | ⬜     |
| T28 | Security pass: headers scan, CSP report check, dependency audit, admin access review                                      | No high or critical findings                   | ⬜     |
| T29 | Content review with the founder: photos, team bios, company and phone details, legal text                                 | Founder sign-off                               | ⬜     |
| T30 | Launch: point www.figcit.co.uk to Vercel, redirect the bare domain, check the QR codes, monitor for 48 hours              | Site live by December 2026                     | ⬜     |

## Phase 6: After launch (January 2027 onwards)

| ID  | Task                                           | Status |
| --- | ---------------------------------------------- | ------ |
| T31 | App store badges and links to app.figcit.co.uk | ⬜     |
| T32 | Live pricing on Services                       | ⬜     |
| T33 | News posts collection and listing              | ⬜     |
| T34 | Brochure download                              | ⬜     |
| T35 | Hub pilot booking details (January 2028)       | ⬜     |

## Still to supply (from the copy document)

Company number, team names and bios, photos, logo files and final legal text.
