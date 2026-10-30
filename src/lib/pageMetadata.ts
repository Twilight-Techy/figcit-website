import type { Metadata } from 'next'

import { site } from '@/content/site'
import { pathForSlug } from '@/hooks/revalidate'
import { buildMetadata } from '@/lib/seo'
import type { Page } from '@/payload-types'

export function pageMetadata(page: Page): Metadata {
  return buildMetadata({
    title: page.meta?.title || `${page.title} | FigCit`,
    description: page.meta?.description || site.defaultDescription,
    path: pathForSlug(page.slug),
  })
}
