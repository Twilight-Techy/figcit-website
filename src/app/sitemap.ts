import type { MetadataRoute } from 'next'

import { publicRoutes } from '@/content/site'
import { env } from '@/lib/env'

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: `${env.NEXT_PUBLIC_SITE_URL}${path === '/' ? '' : path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))
}
