import { expect, test } from '@playwright/test'

test.describe('SEO base', () => {
  test('home has a canonical URL, Open Graph tags and Organization JSON-LD', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /^https?:\/\/[^/]+\/?$/,
    )
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'Figcit')
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1)

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent()
    expect(JSON.parse(jsonLd ?? '{}')).toMatchObject({
      '@type': 'Organization',
      name: 'Figcit Ltd',
    })
  })

  test('non-production builds are not indexed', async ({ page, request }) => {
    await page.goto('/')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
    const robots = await (await request.get('/robots.txt')).text()
    expect(robots).toContain('Disallow: /')
  })

  test('sitemap lists every public page', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    for (const path of ['/services', '/for-you', '/about/team', '/faqs', '/privacy']) {
      expect(xml).toContain(`${path}</loc>`)
    }
  })

  test('serves the Open Graph image', async ({ page, request }) => {
    await page.goto('/')
    const url = await page.locator('meta[property="og:image"]').getAttribute('content')
    const res = await request.get(url ?? '')
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('image/png')
  })
})
