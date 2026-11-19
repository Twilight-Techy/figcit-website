'use server'

import { headers } from 'next/headers'

import { env } from '@/lib/env'
import { handleSubmission, type SubmitResult } from '@/lib/forms/submit'
import { getPayloadClient } from '@/lib/payload'

// Server action for every website form. Bind the form type, then use with useActionState:
//   const [state, action] = useActionState(submitForm.bind(null, 'partner'), { status: 'idle' })
export async function submitForm(
  form: string,
  _previous: SubmitResult,
  formData: FormData,
): Promise<SubmitResult> {
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  try {
    return await handleSubmission(form, formData, {
      payload: await getPayloadClient(),
      ip,
      secret: env.PAYLOAD_SECRET,
      turnstileSecret: env.TURNSTILE_SECRET_KEY,
      notify: {
        smtpUrl: env.SMTP_URL,
        to: env.FORMS_NOTIFY_TO,
        from: env.FORMS_FROM,
        adminUrl: `${env.NEXT_PUBLIC_SITE_URL}/admin/collections/form-submissions`,
      },
      feedback: { apiUrl: env.FEEDBACK_API_URL, key: env.WEBSITE_FEEDBACK_KEY },
    })
  } catch {
    console.error(`[forms] submission failed for ${form}`)
    return {
      status: 'error',
      message: `Something went wrong on our side. Please try again, or email ${env.FORMS_NOTIFY_TO}.`,
    }
  }
}
