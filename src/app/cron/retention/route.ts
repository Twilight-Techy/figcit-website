import { timingSafeEqual } from 'node:crypto'

import { env } from '@/lib/env'
import { deleteExpiredSubmissions } from '@/lib/forms/submit'
import { getPayloadClient } from '@/lib/payload'

// Constant-time comparison, so response timing doesn't reveal the secret (T28).
function matches(header: string | null, secret: string): boolean {
  const a = Buffer.from(header ?? '')
  const b = Buffer.from(`Bearer ${secret}`)
  return a.length === b.length && timingSafeEqual(a, b)
}

// Daily Vercel Cron job (vercel.json). Vercel sends "Authorization: Bearer <CRON_SECRET>".
export async function GET(request: Request) {
  if (!env.CRON_SECRET || !matches(request.headers.get('authorization'), env.CRON_SECRET)) {
    return new Response('Unauthorised', { status: 401 })
  }
  const deleted = await deleteExpiredSubmissions(await getPayloadClient())
  return Response.json({ deleted })
}
