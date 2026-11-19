import 'server-only'

import type { FormInput } from '@/lib/forms/schemas'

export type FeedbackTarget = { apiUrl: string; key?: string }

// Sends tester feedback to the app's backend, which keeps it with the app's own feedback and
// emails admin@figcit.co.uk. The website keeps no copy. Failures are logged without the
// person's words and reported back, so they can try again.
export async function forwardFeedback(
  data: FormInput<'tester-feedback'>,
  target: FeedbackTarget,
): Promise<boolean> {
  if (!target.key) {
    console.error('[forms] tester feedback is not set up (WEBSITE_FEEDBACK_KEY)')
    return false
  }
  try {
    const res = await fetch(`${target.apiUrl.replace(/\/$/, '')}/v1/app-feedback/website`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-website-key': target.key },
      body: JSON.stringify({
        kind: data.kind,
        text: data.message,
        ...(data.where ? { page: data.where } : {}),
        ...(data.name ? { name: data.name } : {}),
        ...(data.email ? { email: data.email } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) console.error(`[forms] tester feedback failed with status ${res.status}`)
    return res.ok
  } catch {
    console.error('[forms] tester feedback request failed')
    return false
  }
}
