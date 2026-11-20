import 'server-only'

import nodemailer, { type Transporter } from 'nodemailer'

const titles: Record<string, string> = {
  'early-access': 'Early access request',
  'book-conversation': 'Book a conversation',
  'hub-interest': 'Hub interest',
  partner: 'Partnership enquiry',
}

export type Notify = { smtpUrl?: string; to: string; from: string; adminUrl: string }

let transport: { url: string; t: Transporter } | undefined
const transportFor = (url: string): Transporter => {
  if (transport?.url !== url) transport = { url, t: nodemailer.createTransport(url) }
  return transport.t
}

// Emails the FigCit inbox about a new submission over SMTP, the same mail setup the app uses
// (SMTP_URL). Failures are logged without personal data and never block the submission.
export async function notifyInbox(
  form: string,
  data: Record<string, unknown>,
  opts: Notify,
): Promise<void> {
  if (!opts.smtpUrl) return
  const lines = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== true)
    .map(([k, v]) => `${k}: ${String(v)}`)
  try {
    await transportFor(opts.smtpUrl).sendMail({
      from: opts.from,
      to: opts.to,
      subject: `New website form: ${titles[form] ?? form}`,
      text: `${lines.join('\n')}\n\nView in admin: ${opts.adminUrl}`,
    })
  } catch {
    console.error('[forms] notification email failed')
  }
}
