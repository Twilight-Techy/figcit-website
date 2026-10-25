import { draftMode, headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getPayloadClient } from '@/lib/payload'

// Admin "Preview" button: signed-in editors see the latest draft of a page.
export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get('path') ?? '/'
  // Same-site paths only, so this can't be used as an open redirect.
  if (!/^\/(?!\/)/.test(path)) return new Response('Invalid path', { status: 400 })

  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return new Response('Sign in to the admin to preview drafts', { status: 401 })

  ;(await draftMode()).enable()
  redirect(path)
}
