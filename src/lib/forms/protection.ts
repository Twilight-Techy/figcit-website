import 'server-only'

import { createHmac } from 'node:crypto'

// A keyed hash, so stored values can't be reversed into IP addresses.
export function hashIp(ip: string, secret: string): string {
  return createHmac('sha256', secret).update(ip).digest('hex').slice(0, 32)
}

export const RATE_LIMIT = { max: 5, windowMinutes: 10 }

// Cloudflare Turnstile check. Skipped when no secret is configured (local development).
export async function verifyTurnstile(
  token: string | undefined,
  secret: string | undefined,
  ip?: string,
): Promise<boolean> {
  if (!secret) return true
  if (!token) return false
  const body = new URLSearchParams({ secret, response: token })
  if (ip) body.set('remoteip', ip)
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(5000),
    })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}
