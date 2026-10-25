import 'server-only'

import { draftMode } from 'next/headers'
import { cache } from 'react'

import type { Page, SiteSetting } from '@/payload-types'
import { getPayloadClient } from '@/lib/payload'

// Published pages for visitors; the latest draft when an editor is previewing.
export const getPage = cache(async (slug: string): Promise<Page | null> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft,
    overrideAccess: draft,
    depth: 1,
    limit: 1,
    pagination: false,
  })
  return result.docs[0] ?? null
})

export async function getPublishedSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    select: { slug: true },
    depth: 0,
    pagination: false,
  })
  return result.docs.map((d) => d.slug)
}

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 0 })
})
