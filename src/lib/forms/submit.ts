import 'server-only'

import type { Payload } from 'payload'

import { hashIp, RATE_LIMIT, verifyTurnstile } from '@/lib/forms/protection'
import { forwardFeedback, type FeedbackTarget } from '@/lib/forms/feedback'
import { notifyInbox, type Notify } from '@/lib/forms/notify'
import {
  formTypes,
  validate,
  type FieldErrors,
  type FormInput,
  type FormType,
} from '@/lib/forms/schemas'

export type SubmitResult =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message: string; errors?: FieldErrors; values?: Record<string, string> }

type InboxForm = Exclude<FormType, 'tester-feedback'>

export const HONEYPOT_FIELD = 'website'

type Options = {
  payload: Payload
  ip: string
  secret: string
  turnstileSecret?: string
  notify?: Notify
  /** Where tester feedback goes: the app's backend, so all feedback is read in one place. */
  feedback?: FeedbackTarget
}

// Core of the form server action, kept separate so it can be tested without Next.js.
export async function handleSubmission(
  form: string,
  formData: FormData,
  opts: Options,
): Promise<SubmitResult> {
  if (!(formTypes as readonly string[]).includes(form)) {
    return { status: 'error', message: 'This form isn’t available.' }
  }

  // Bots fill every field; people never see this one. Pretend it worked.
  if (String(formData.get(HONEYPOT_FIELD) ?? '') !== '') return { status: 'success' }

  const token = formData.get('cf-turnstile-response')
  const human = await verifyTurnstile(
    typeof token === 'string' ? token : undefined,
    opts.turnstileSecret,
    opts.ip,
  )
  if (!human) {
    return { status: 'error', message: 'We couldn’t confirm you’re not a robot. Please try again.' }
  }

  const raw = Object.fromEntries(
    [...formData.entries()].filter(([k, v]) => typeof v === 'string' && !k.startsWith('$')),
  )
  const result = validate(form as FormType, raw)
  if (!result.ok) {
    return {
      status: 'error',
      message: 'There’s a problem with your answers. Check the fields marked below.',
      errors: result.errors,
      // Sent back so the form can show what the person typed instead of clearing it.
      values: Object.fromEntries(
        Object.entries(raw).filter(([k]) => k !== HONEYPOT_FIELD && k !== 'cf-turnstile-response'),
      ) as Record<string, string>,
    }
  }

  if (form === 'tester-feedback') {
    const sent = opts.feedback
      ? await forwardFeedback(result.data as FormInput<'tester-feedback'>, opts.feedback)
      : false
    return sent
      ? { status: 'success' }
      : { status: 'error', message: 'That didn’t send. Please try again in a minute.' }
  }

  const ipHash = hashIp(opts.ip, opts.secret)
  const since = new Date(Date.now() - RATE_LIMIT.windowMinutes * 60_000).toISOString()
  const recent = await opts.payload.count({
    collection: 'form-submissions',
    where: { and: [{ ipHash: { equals: ipHash } }, { createdAt: { greater_than: since } }] },
  })
  if (recent.totalDocs >= RATE_LIMIT.max) {
    return {
      status: 'error',
      message:
        'You’ve sent a few messages in a short time. Please wait a few minutes and try again.',
    }
  }

  await opts.payload.create({
    collection: 'form-submissions',
    data: {
      form: form as InboxForm,
      ...(result.data as FormInput<InboxForm>),
      ipHash,
    },
  })

  if (opts.notify) await notifyInbox(form, result.data, opts.notify)
  return { status: 'success' }
}

// Deletes submissions older than 12 months (rules §5). Returns how many were removed.
export async function deleteExpiredSubmissions(
  payload: Payload,
  now = new Date(),
): Promise<number> {
  const cutoff = new Date(now)
  cutoff.setMonth(cutoff.getMonth() - 12)
  const { docs } = await payload.delete({
    collection: 'form-submissions',
    where: { createdAt: { less_than: cutoff.toISOString() } },
  })
  return docs.length
}
