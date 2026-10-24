import { env } from '@/lib/env'
import { deleteExpiredSubmissions } from '@/lib/forms/submit'
import { getPayloadClient } from '@/lib/payload'

// Daily Vercel Cron job (vercel.json). Vercel sends "Authorization: Bearer <CRON_SECRET>".
export async function GET(request: Request) {
  if (!env.CRON_SECRET || request.headers.get('authorization') !== `Bearer ${env.CRON_SECRET}`) {
    return new Response('Unauthorised', { status: 401 })
  }
  const deleted = await deleteExpiredSubmissions(await getPayloadClient())
  return Response.json({ deleted })
}
