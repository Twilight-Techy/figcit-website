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
    // Forms (T24). Without a Resend key, submissions are saved but no email is sent;
    // without a Turnstile secret, the bot check is skipped (development only).
    RESEND_API_KEY: z.string().min(1).optional(),
    FORMS_NOTIFY_TO: z.string().email().default('admin@figcit.co.uk'),
    FORMS_FROM: z.string().min(3).default('Figcit website <forms@figcit.co.uk>'),
    TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
    // Set to "true" only while creating the first admin on a new database (T28).
    ALLOW_FIRST_ADMIN: z.enum(['true', 'false']).optional(),
    // Protects /cron/retention, which deletes form submissions older than 12 months.
    CRON_SECRET: z.string().min(16).optional(),
  })
  .refine((e) => !e.VERCEL || e.BLOB_READ_WRITE_TOKEN, {
    message: 'BLOB_READ_WRITE_TOKEN is required on Vercel (media must not go to local disk)',
    path: ['BLOB_READ_WRITE_TOKEN'],
  })

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
