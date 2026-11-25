import type { MetadataRoute } from 'next'

import { pathForSlug } from '@/hooks/revalidate'
import { env } from '@/lib/env'
import { getPayloadClient } from '@/lib/payload'

// Every published page, refreshed when a page is published (Pages afterChange hook).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    select: { slug: true, updatedAt: true },
    depth: 0,
    pagination: false,
  })
  const pages: MetadataRoute.Sitemap = docs.map((doc) => {
    const path = pathForSlug(doc.slug)
    return {
      url: `${env.NEXT_PUBLIC_SITE_URL}${path === '/' ? '' : path}`,
      lastModified: doc.updatedAt,
      changeFrequency: 'monthly',
      priority: path === '/' ? 1 : 0.7,
    }
  })
  // The download page is code, not a CMS page.
  pages.push({
    url: `${env.NEXT_PUBLIC_SITE_URL}/download`,
    changeFrequency: 'monthly',
    priority: 0.9,
  })
  return pages
}
