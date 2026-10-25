# Security review (T28)

The security pass before launch: headers, content security policy, dependencies and admin access. Repeat it before each major release.

## Headers

Every response, including the admin and the API, sends:

| Header                           | Value                                                                                                                                                                                                                                         |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Security-Policy          | Scripts, styles, images, fonts and connections from this site only, plus Plausible (after consent) and Cloudflare Turnstile. `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`. HTTPS upgrade on Vercel. |
| Reporting-Endpoints / report-uri | Violations go to `/csp-report`, which logs a short summary with query strings removed.                                                                                                                                                        |
| Strict-Transport-Security        | Two years, subdomains, preload.                                                                                                                                                                                                               |
| Cross-Origin-Opener-Policy       | `same-origin`                                                                                                                                                                                                                                 |
| X-Frame-Options                  | `DENY`                                                                                                                                                                                                                                        |
| X-Content-Type-Options           | `nosniff`                                                                                                                                                                                                                                     |
| Referrer-Policy                  | `strict-origin-when-cross-origin`                                                                                                                                                                                                             |
| Permissions-Policy               | Camera, microphone, location, payment, USB and Topics are off.                                                                                                                                                                                |

`tests/e2e/security.e2e.spec.ts` checks these on a page, a 404, the admin and the API.

**Why scripts allow `'unsafe-inline'`:** Next.js streams page data in inline scripts, and nonces would force every page to render on demand instead of being built ahead of time. The only inline script of our own is `ComfortInit`, a fixed string from source code. No page renders HTML from the CMS: rich text goes through Payload's React renderer.

**Checking reports after launch:** search the Vercel logs for `[csp]`. A report usually means a new third-party service needs adding to the policy, or something is injecting scripts.

## Dependencies

CI runs `pnpm audit --prod --audit-level high` on every pull request, and Dependabot opens weekly update PRs.

Known findings at the time of review, none of which reach the website:

| Package                | Severity             | Where                            | Why it's accepted                                                                                                                  |
| ---------------------- | -------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| esbuild ≤ 0.24.2       | Moderate             | drizzle-kit, used for migrations | Only affects esbuild's local dev server, which we never run.                                                                       |
| extract-zip, zod, uuid | High, high, moderate | Inside `@lhci/cli` (CI only)     | Used for downloading browsers and for a protocol we don't use; never shipped. Update `@lhci/cli` when a fixed version is released. |

## Admin access

- **Accounts**: admin only; there are no public accounts. Passwords need 12+ characters. 5 failed sign-ins lock the account for 10 minutes. Sessions last 8 hours, in `Secure`, `SameSite=Strict` cookies.
- **First admin**: creating it from the web is blocked unless `ALLOW_FIRST_ADMIN=true` is set for the first deploy (see DEPLOYMENT.md).
- **Collections**:
  - Pages: the public sees published pages only.
  - Media: public to read, admins to change.
  - Form submissions: admins only, and nobody can create them through the API (only the server action, after validation, spam checks and rate limiting).
  - Users: admins only.
  - Site settings: public to read, admins to change.
- **API**: GraphQL is off. CORS and CSRF only allow the site's own address.
- **Preview**: `/preview` checks for a signed-in admin and only redirects to paths on this site.
- **Cron**: `/cron/retention` checks the `CRON_SECRET` bearer token with a constant-time comparison.
- **Personal data**: forms never ask for a diagnosis, health details or date of birth. Raw internet addresses are never stored; a keyed hash is used for rate limiting. Submissions are deleted after 12 months.

Before launch, review who has admin accounts and remove any that aren't needed.
