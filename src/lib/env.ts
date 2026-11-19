import { z } from 'zod'

// Validated once at start-up so a missing secret fails the boot, not a request.
const schema = z
  .object({
    DATABASE_URL: z.string().url(),
    PAYLOAD_SECRET: z.string().min(32, 'PAYLOAD_SECRET must be at least 32 characters'),
    NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    // Vercel Blob store for media (create it in the London region). Without it, uploads
    // go to local disk, which is only acceptable in development.
    BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),
    VERCEL: z.string().optional(),
    // Which Vercel deployment this is; with SITE_INDEXABLE, decides if search engines may index.
    VERCEL_ENV: z.string().optional(),
    SITE_INDEXABLE: z.string().optional(),
    // Forms (T24). Notification emails go over SMTP, the same setup as the app's backend
    // (SMTP_URL, e.g. smtps://user:pass@host:465). Without it, submissions are saved but no
    // email is sent; without a Turnstile secret, the bot check is skipped (development only).
    SMTP_URL: z.string().min(1).optional(),
    FORMS_NOTIFY_TO: z.string().email().default('admin@figcit.co.uk'),
    FORMS_FROM: z.string().min(3).default('FigCit website <forms@figcit.co.uk>'),
    TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
    // Tester feedback goes to the app's backend with this key (the backend's
    // WEBSITE_FEEDBACK_KEY), so all feedback is read in the staff app.
    FEEDBACK_API_URL: z.string().url().default('https://api.figcit.co.uk'),
    WEBSITE_FEEDBACK_KEY: z.string().min(24).optional(),
    // Set to "true" only while creating the first admin on a new database (T28).
    ALLOW_FIRST_ADMIN: z.enum(['true', 'false']).optional(),
    // Protects /cron/retention, which deletes form submissions older than 12 months.
    CRON_SECRET: z.string().min(16).optional(),
  })
  .refine((e) => !e.VERCEL || e.BLOB_READ_WRITE_TOKEN, {
    message: 'BLOB_READ_WRITE_TOKEN is required on Vercel (media must not go to local disk)',
    path: ['BLOB_READ_WRITE_TOKEN'],
  })
  // The live site's canonical links, sitemap and sharing tags come from this URL. A
  // vercel.app address there made Google index figcit-website.vercel.app (November 2026).
  .refine(
    (e) =>
      !(e.VERCEL_ENV === 'production' || e.SITE_INDEXABLE === 'true') ||
      !new URL(e.NEXT_PUBLIC_SITE_URL).hostname.endsWith('.vercel.app'),
    {
      message:
        'NEXT_PUBLIC_SITE_URL must be the real domain (https://www.figcit.co.uk) on the live site, not a vercel.app address',
      path: ['NEXT_PUBLIC_SITE_URL'],
    },
  )

export type Env = z.infer<typeof schema>

export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = schema.safeParse(source)
  if (!result.success) {
    const problems = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`)
    throw new Error(`Invalid environment variables:\n${problems.join('\n')}`)
  }
  return result.data
}

export const env = parseEnv(process.env)
