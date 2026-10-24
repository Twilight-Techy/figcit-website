import { describe, expect, it } from 'vitest'

import { buildMetadata, organizationJsonLd, serializeJsonLd } from '@/lib/seo'

describe('buildMetadata', () => {
  it('uses the copy document title as an absolute title and sets a canonical URL', () => {
    const m = buildMetadata({
      title: 'Our services | Figcit',
      description: 'Four ways we help.',
      path: '/services',
    })
    expect(m.title).toEqual({ absolute: 'Our services | Figcit' })
    expect(m.alternates?.canonical).toBe('/services')
    expect(m.openGraph).toMatchObject({ url: '/services', locale: 'en_GB', siteName: 'Figcit' })
  })
})

describe('JSON-LD', () => {
  it('describes Figcit Ltd as an Organization', () => {
    expect(organizationJsonLd()).toMatchObject({ '@type': 'Organization', name: 'Figcit Ltd' })
  })

  it('escapes "<" so data can never close the script tag', () => {
    expect(serializeJsonLd({ x: '</script><script>alert(1)</script>' })).not.toContain('<')
  })
})
