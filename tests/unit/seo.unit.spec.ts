import { afterEach, describe, expect, it } from 'vitest'

import { buildMetadata, organizationJsonLd, serializeJsonLd } from '@/lib/seo'

describe('buildMetadata', () => {
  it('uses the copy document title as an absolute title and sets a canonical URL', () => {
    const m = buildMetadata({
      title: 'Our services | FigCit',
      description: 'Four ways we help.',
      path: '/services',
    })
    expect(m.title).toEqual({ absolute: 'Our services | FigCit' })
    expect(m.alternates?.canonical).toBe('/services')
    expect(m.openGraph).toMatchObject({ url: '/services', locale: 'en_GB', siteName: 'FigCit' })
  })
})

describe('JSON-LD', () => {
  it('describes FigCit Ltd as an Organization', () => {
    expect(organizationJsonLd()).toMatchObject({ '@type': 'Organization', name: 'FigCit Ltd' })
  })

  it('escapes "<" so data can never close the script tag', () => {
    expect(serializeJsonLd({ x: '</script><script>alert(1)</script>' })).not.toContain('<')
  })
})

describe('isProductionDeploy', () => {
  const saved = { ...process.env }
  afterEach(() => {
    process.env = { ...saved }
  })

  it('indexes only the live deployment', async () => {
    const { isProductionDeploy } = await import('@/lib/seo')
    delete process.env.VERCEL_ENV
    delete process.env.SITE_INDEXABLE
    expect(isProductionDeploy()).toBe(false)
    process.env.VERCEL_ENV = 'preview'
    expect(isProductionDeploy()).toBe(false)
    process.env.VERCEL_ENV = 'production'
    expect(isProductionDeploy()).toBe(true)
    delete process.env.VERCEL_ENV
    process.env.SITE_INDEXABLE = 'true'
    expect(isProductionDeploy()).toBe(true)
  })
})
