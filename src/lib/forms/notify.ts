import 'server-only'

const titles: Record<string, string> = {
  'early-access': 'Early access request',
  'book-conversation': 'Book a conversation',
  'hub-interest': 'Hub interest',
  partner: 'Partnership enquiry',
}

// Emails the Figcit inbox about a new submission through Resend's REST API (no SDK).
// Failures are logged without personal data and never block the submission.
export async function notifyInbox(
  form: string,
  data: Record<string, unknown>,
  opts: { apiKey?: string; to: string; from: string; adminUrl: string },
): Promise<void> {
  if (!opts.apiKey) return
  const lines = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== true)
    .map(([k, v]) => `${k}: ${String(v)}`)
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${opts.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: opts.from,
        to: [opts.to],
        subject: `New website form: ${titles[form] ?? form}`,
        text: `${lines.join('\n')}\n\nView in admin: ${opts.adminUrl}`,
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) console.error(`[forms] notification failed with status ${res.status}`)
  } catch {
    console.error('[forms] notification request failed')
  }
}
