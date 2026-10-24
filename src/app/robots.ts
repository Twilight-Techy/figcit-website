import type { MetadataRoute } from 'next'

import { env } from '@/lib/env'
import { isProductionDeploy } from '@/lib/seo'

// Previews and local builds are never indexed (rules §9).
export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeploy()) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/dev'] },
    sitemap: `${env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
