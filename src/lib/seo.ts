import type { Metadata } from 'next'

import { site } from '@/content/site'

type PageSeo = {
  /** SEO title from the copy document, e.g. "Our services | FigCit". */
  title: string
  description: string
  /** Path without host, e.g. "/services". */
  path: string
}

// Builds per-page metadata from the copy document's SEO title and description (rules §9).
// Titles in the copy already include "| FigCit", so they're used as absolute titles.
export function buildMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_GB',
      url: path,
      title,
      description,
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/brand/figcit-mark.svg`,
    slogan: site.tagline,
    email: site.email,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
  }
}

// JSON-LD is data, not script; escaping "<" stops it from closing the tag early.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

// Only the live site is indexed: Vercel's production deployment, or a host that sets
// SITE_INDEXABLE=true. Previews, CI and local production builds stay noindex, so a
// staging copy never shows up in search results (rules §9).
export function isProductionDeploy(): boolean {
  return process.env.VERCEL_ENV === 'production' || process.env.SITE_INDEXABLE === 'true'
}
