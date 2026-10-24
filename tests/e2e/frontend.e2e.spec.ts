import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Frontend', () => {
  test('home page renders with one h1 and no accessibility violations', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Figcit/)
    await expect(page.locator('h1')).toHaveCount(1)

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('sends security headers', async ({ request }) => {
    const response = await request.get('/')
    const headers = response.headers()

    expect(headers['content-security-policy']).toContain("frame-ancestors 'none'")
    expect(headers['x-content-type-options']).toBe('nosniff')
    expect(headers['x-powered-by']).toBeUndefined()
  })
})
