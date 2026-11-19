# Deployment

How to set up the environments for www.figcit.co.uk (task T04). Someone with access to Figcit's Neon, Vercel and DNS accounts does this once.

## 1. Database: Neon

1. Create a Neon project called `figcit-website` in **AWS Europe (London) `eu-west-2`**, or Frankfurt if London isn't offered.
2. Keep the default `main` branch for **production**.
3. Create a `preview` branch from `main` for Vercel previews.
4. Copy the **pooled** connection string for each branch (it contains `-pooler`).
5. Set point-in-time restore to **7 days**. The Privacy Notice promises backups are deleted within 90 days, so keep it under that.

## 2. Media: Vercel Blob

1. In Vercel, go to **Storage → Create → Blob**, name it `figcit-media` and choose the **London (`lhr1`)** region.
2. Connect it to the project. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.

## 3. Vercel project

1. Import `Figcit/figcit-website`. `vercel.json` already sets London functions (`lhr1`), pnpm, and runs migrations and the first-content seed before each build.
2. Add these environment variables:

| Variable                | Production                 | Preview                            |
| ----------------------- | -------------------------- | ---------------------------------- |
| `DATABASE_URL`          | Neon `main` pooled URL     | Neon `preview` pooled URL          |
| `PAYLOAD_SECRET`        | `openssl rand -hex 32`     | a different `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL`  | `https://www.figcit.co.uk` | the preview URL                    |
| `BLOB_READ_WRITE_TOKEN` | set by the Blob store      | set by the Blob store              |

3. In **Settings → Git**, set production to deploy only from `main`. Every pull request then gets a preview URL.
4. Set the **Ignored Build Step** so a deploy only happens when GitHub CI has passed, or require the `checks` status before merging (step 5).

## 4. Email, bot protection and analytics

1. **Email:** form notifications go over SMTP, the same mail setup as the app's backend. Set `SMTP_URL` to the backend's value and `FORMS_FROM` to an address that account may send as. Tester feedback (Contact, `#tester-feedback`) isn't stored here: it goes to the backend with `WEBSITE_FEEDBACK_KEY` (the same value as on the backend) and is read in the staff app.
2. **Cloudflare Turnstile:** create a widget for `www.figcit.co.uk` in "Managed" mode, which is usually invisible, so there are no puzzles.
3. **Google Analytics 4:** create a GA4 property and web data stream for `www.figcit.co.uk`, then set `NEXT_PUBLIC_GA_MEASUREMENT_ID` (starts with `G-`) for **Production only**, so previews aren't counted. In GA, set data retention to 14 months (the privacy page says so), leave Google signals and ads personalisation off, and mark `get_early_access_click`, `book_conversation_click`, `organisation_click`, `start_profile_click` and `contact_form_sent` as key events. Link Google Search Console to the same account and submit `https://www.figcit.co.uk/sitemap.xml`. Analytics only load after a visitor accepts the cookie banner.
4. **Retention job:** `vercel.json` runs `/cron/retention` daily at 03:15. It deletes form submissions older than 12 months and needs `CRON_SECRET`.
5. **Search indexing:** only the Vercel production deployment is indexed; previews stay hidden from search. If the site is ever hosted somewhere other than Vercel, set `SITE_INDEXABLE=true` on the live host only.

## 5. Domain (at launch, T30)

1. Add `www.figcit.co.uk` and `figcit.co.uk` to the project, and set `figcit.co.uk` to redirect to `www`.
2. Update the DNS records at the registrar as Vercel shows.
3. Check that the printed QR codes still open `https://www.figcit.co.uk`.

## 6. GitHub

- Protect `main`: require a pull request and the `checks` status to pass before merging.
- Add the Vercel GitHub app so pull requests show their preview link.

## First admin user

Creating the first admin from the web is blocked, so nobody else can claim a new database's admin account. For the first production deploy:

1. In Vercel, add `ALLOW_FIRST_ADMIN=true` and redeploy.
2. Open `https://www.figcit.co.uk/admin` and create the first admin account, with a password of at least 12 characters.
3. Remove `ALLOW_FIRST_ADMIN` and redeploy.

Later admins are invited from the Users screen by a signed-in admin.

## First content

Pages are stored in Payload and published from the admin. Each deploy runs `pnpm seed:if-empty` after the migrations. On a database with no pages yet, it loads the Website Copy v6.0 pages and placeholder photos (into the Blob store), so the first deploy goes live with content. Once any page exists it does nothing, so deploys never overwrite edits made in the admin.

To reload the copy by hand, run the full seed with the production environment variables:

```bash
DATABASE_URL=... PAYLOAD_SECRET=... BLOB_READ_WRITE_TOKEN=... NEXT_PUBLIC_SITE_URL=https://www.figcit.co.uk pnpm seed
```

The seed updates pages by slug, so running it again overwrites edits made in the admin. After launch, edit content in the admin instead.
