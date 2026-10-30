# Figcit Website: Project Rules

These rules apply to every change in this repository. If a rule blocks you, raise it in the pull request; don't work around it.

**Sources of truth**

| Topic                             | Source                                         |
| --------------------------------- | ---------------------------------------------- |
| Copy, page order, SEO text, forms | FigCit Website Copy v6.0 (Oct 2026)            |
| Layout, components, states        | Figma: FIGCIT Web Landing Page, page "Website" |
| Data handling                     | NUCCESS Privacy Notice (draft) and UK GDPR     |
| Accessibility                     | WCAG 2.2 AA                                    |

Where the copy and the design disagree, the copy wins for words and the design wins for layout.

---

## 1. Stack (fixed)

| Layer           | Choice                                                       |
| --------------- | ------------------------------------------------------------ |
| Framework       | Next.js (App Router), React Server Components                |
| CMS             | Payload 3, running inside the same Next.js app at `/admin`   |
| Database        | Neon Postgres, UK or EU region                               |
| Styling         | Tailwind CSS v4, with design tokens as CSS custom properties |
| Email           | Resend                                                       |
| Hosting         | Vercel, with server functions pinned to London (`lhr1`)      |
| Analytics       | Plausible (EU), loaded only after consent                    |
| Package manager | pnpm (lockfile committed)                                    |
| Language        | TypeScript, `strict`                                         |

Don't add a new runtime dependency without a line in the pull request explaining why an existing one or a few lines of code won't do.

## 2. Structure and naming

```
src/
  app/
    (frontend)/        public site routes, one folder per URL
    (payload)/         Payload admin and REST API (generated; don't hand-edit)
  blocks/              Payload block configs, one per page section type
  collections/         Payload collections (Pages, Media, Users, FormSubmissions)
  globals/             Payload globals (Header, Footer, SiteSettings)
  components/
    layout/            Header, Footer, SkipLink, Comfort panel
    sections/          React renderers for each block
    ui/                Buttons, cards, icons, form fields (no data fetching)
  lib/                 Server-only helpers: env, payload client, SEO, security
  styles/              tokens.css and global CSS
docs/                  Rules, plan, decisions
tests/                 unit (int) and end-to-end (e2e)
```

- Files: `PascalCase.tsx` for components, `camelCase.ts` for helpers, `kebab-case` for route folders.
- One component per file. Co-locate a component's test as `Component.test.tsx` only when it has logic.
- Import with `@/`; no deep relative imports (`../../../`).
- Server-only code imports `server-only` at the top.

## 3. Performance and speed

**Budgets (checked in CI on every pull request):**

| Metric                                        | Budget               |
| --------------------------------------------- | -------------------- |
| Largest Contentful Paint                      | < 2.5 s (mobile, 4G) |
| Interaction to Next Paint                     | < 200 ms             |
| Cumulative Layout Shift                       | < 0.1                |
| First-load JavaScript per page                | ≤ 180 KB gzipped     |
| CSS per page                                  | ≤ 30 KB gzipped      |
| Lighthouse Performance                        | ≥ 90 (lab, measured) |
| Lighthouse Accessibility, Best Practices, SEO | ≥ 95 each            |
| Total Blocking Time (lab, 4× slower CPU)      | ≤ 350 ms             |

**Lab measurements:** Lighthouse CI measures real loads slowed to 4G and a 4× slower CPU (`throttlingMethod: 'devtools'`). Lighthouse's default estimate charged every script that ran before the hero text to LCP (2.2–3 s), while the measured LCP is about 1.1 s. Interaction to Next Paint can only be measured with real visitors; in the lab, Total Blocking Time stands in for it, and about 250 ms of it is React and Next.js starting up.

**JavaScript budget:** the Next.js 16 and React 19 runtime alone is about 140 KB gzipped, so the budget leaves about 40 KB for the site's own code. Client components that only some pages use (the forms, the sticky menu, the copy button) are loaded on demand from `src/components/lazy.tsx`.

**Rules:**

- Server Components by default. `'use client'` only for components that need state or browser APIs: menus, the Comfort panel, the cookie banner and forms. Keep client components small and at the leaves.
- Pages are statically generated. When an editor publishes in Payload, an `afterChange` hook calls `revalidatePath` for that page. No client-side fetching of page content.
- Images use `next/image` with explicit `sizes`, AVIF/WebP and fixed aspect ratios. Only the hero image gets `priority`.
- Fonts are self-hosted with `next/font/local`: Figtree for headings and Atkinson Hyperlegible Next for body, one variable Latin file per family (about 55 KB in total), `display: swap`.
- No carousels, autoplay, video backgrounds or decorative animation (website brief). Transitions stay under 200 ms and are switched off by `prefers-reduced-motion` and low-stimulation mode.
- Icons are inline SVG components. No icon fonts or whole-library imports.
- Third-party scripts: Plausible only, loaded with `strategy="lazyOnload"` after consent.
- No heavy libraries such as lodash, moment or animation frameworks. Use the platform (`Intl`, CSS) first.

## 4. Memory

- One Payload instance per server process: use the cached helper in `src/lib/payload.ts`, never call `getPayload` per component.
- Queries always set `limit`, `depth` (default `1`) and `select` for the fields actually used. Never load a whole collection.
- No unbounded module-level caches or arrays. Anything cached needs a size limit or a TTL.
- Stream or paginate any list that can grow, such as form submissions in admin exports.
- Client state is local to the component that needs it. No global state library. Comfort settings live in one small context.
- The production build runs within 4 GB (`--max-old-space-size=4096`). If it needs more, find the cause instead of raising the limit.

## 5. Storage

- Media uploads go to object storage in the UK or EU (Vercel Blob or S3-compatible), never the server's disk, which is temporary on Vercel.
- Uploads: images only (`image/jpeg`, `image/png`, `image/webp`, `image/avif`), maximum 5 MB. Payload generates the fixed sizes the design uses (card, hero, full) and strips EXIF data.
- Store only what each form needs (section 7). Form submissions are deleted automatically after 12 months unless Figcit sets a different period.
- No personal data in logs. Log IDs and error codes, not names, emails or messages.
- Git: no files over 500 KB, no generated files (`.next`, `payload-types.ts` is the only generated file committed), no secrets.
- Database changes go through Payload migrations (`pnpm payload migrate:create`), committed with the code that needs them. Production never uses `push` mode.

## 6. Security

- **Secrets** live in environment variables only. `src/lib/env.ts` validates them at start-up and the app refuses to boot if one is missing. `.env` is never committed; `.env.example` lists every variable with no real values.
- **Headers** on every response (set in `next.config.ts`): Content-Security-Policy, Strict-Transport-Security (2 years, preload), X-Content-Type-Options `nosniff`, Referrer-Policy `strict-origin-when-cross-origin`, Permissions-Policy (camera, microphone, geolocation off), `frame-ancestors 'none'`.
- **Payload:**
  - GraphQL is disabled. We only use the Local API and REST.
  - Admin login locks after 5 failed attempts for 10 minutes. Passwords are at least 12 characters.
  - CORS and CSRF are limited to `figcit.co.uk` and the Vercel preview domain.
  - Every collection defines `access` explicitly: the public can read published pages and media; only admins can read form submissions.
- **Forms:**
  - Validated on the server with Zod. Never trust client validation.
  - Rate limited per IP. Spam is stopped with a honeypot field and Cloudflare Turnstile, so there are no puzzles.
  - Never collect diagnosis, health details or date of birth.
- **Rendering:** no `dangerouslySetInnerHTML`, except the JSON-LD component (inert data, with `<` escaped) and `ComfortInit` (a fixed script from source code that applies Comfort settings before first paint). Rich text is rendered by Payload's Lexical React components, never as raw HTML.
- **Dependencies:** versions pinned in the lockfile; `pnpm audit --prod` runs in CI and high or critical issues block merging; Dependabot opens weekly updates.
- Production deploys only from `main`, through CI. Nobody deploys from a laptop.

## 7. Privacy and compliance

- No non-essential cookies or scripts before consent. The cookie banner gives Accept and Reject equal weight (design state D), and the choice is stored in one essential first-party cookie.
- All data stays in the UK or EU: Neon region, media storage and Vercel functions.
- Form fields are exactly those in the copy document:
  - **Get early access:** first name, email, "I am a…", confirm 16 or over, consent
  - **Book a conversation:** name, email, organisation, role, sector, what you'd like to discuss, adjustments, consent
  - **Hub interest:** first name, email, town or city, how you might use the Hub, consent
  - **Partner with us:** name, email, organisation, type of partnership, message, consent
- The crisis notice (999, NHS 111 option 2, Samaritans 116 123, text SHOUT to 85258) appears in the footer of every page and can't be removed in the CMS.
- Legal pages (privacy, cookies, accessibility, terms, safeguarding, complaints) use the legal template and are editable in Payload.

## 8. Accessibility (WCAG 2.2 AA)

- One `<h1>` per page, then headings in order. Landmarks: header, nav, main, footer. A skip link is the first focusable element.
- Visible focus on every interactive element (design state B shows the focus ring).
- Text contrast is at least 4.5:1. Citrus Orange `#E08830` is for large text and highlights only; small orange text uses `#9A5712`.
- Everything works by keyboard: menus open with Enter and Space, close with Escape and return focus.
- The site works at 320 px wide and at 200% zoom with no horizontal scrolling.
- **Comfort panel** (design state C): low-stimulation mode, three text sizes and light or dark theme, saved in `localStorage` and applied before first paint so nothing flashes. The device's reduced-motion setting is always respected.
- Images have alt text, which is required in Payload. Decorative images use `alt=""`.
- Traffic lights always carry a text label: Available, Conditional, Constrained, Very constrained, Recovery.
- Photography shows real, diverse people. No puzzle pieces, lightning-bolt brains or head-clutching images.
- Forms: visible labels, errors written in text next to the field and summarised at the top, no time limits.

## 9. SEO

- Every page sets the SEO title and meta description given in the copy document, editable in Payload.
- One canonical URL per page, Open Graph and Twitter tags, `Organization` JSON-LD on every page.
- `sitemap.xml` and `robots.txt` are generated. Preview and admin routes are `noindex`.
- `https://www.figcit.co.uk` stays live, because printed QR codes point to it; `figcit.co.uk` redirects to `www`.

## 10. Content and CMS

- All page copy is editable in Payload. Pages are built from a fixed set of blocks that match the Figma sections, so editors can't break the layout.
- Drafts and live preview are on. Only published content is public.
- Copy in square brackets in the copy document, such as [Company number], is stored as a setting in Payload, never hard-coded.

## 11. Code quality

- TypeScript `strict`. No `any`, no `@ts-ignore`. If you really need an escape hatch, use `@ts-expect-error` with a reason.
- ESLint and Prettier must pass. CI fails on warnings.
- Functions do one thing. Components over about 150 lines are split.
- Comments explain _why_, not _what_.
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`).
- One task from the implementation plan per pull request, referencing its ID (for example `T07`).

## 12. Testing

| Level         | Tool                  | What                                                                                          |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------- |
| Unit          | Vitest                | Helpers, form schemas, Comfort settings logic                                                 |
| End to end    | Playwright            | Every page renders, menus, Comfort panel, cookie banner, each form's success and error states |
| Accessibility | Playwright + axe-core | Every page, in light, dark and low-stimulation modes; no violations allowed                   |
| Performance   | Lighthouse CI         | The budgets in section 3, on Home, Services and Contact                                       |

## 13. Definition of done

A task is done when:

1. It matches the Figma design at 1440 px and 390 px, and the copy document word for word.
2. Lint, type check, unit tests, end-to-end tests, the axe checks and the Lighthouse budgets pass in CI.
3. Its content is editable in Payload, where the task involves content.
4. The Vercel preview has been checked on a real phone.
5. The implementation plan is updated.
