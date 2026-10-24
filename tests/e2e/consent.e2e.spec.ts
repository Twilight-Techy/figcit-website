import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Cookie banner', () => {
  test('appears on first visit with equal choices and no analytics loaded', async ({ page }) => {
    const analyticsRequests: string[] = []
    page.on('request', (r) => {
      if (r.url().includes('plausible.io')) analyticsRequests.push(r.url())
    })

    await page.goto('/', { waitUntil: 'networkidle' })
    const banner = page.getByRole('region', { name: 'Cookies on figcit.co.uk' })
    await expect(banner).toBeVisible()

    const accept = banner.getByRole('button', { name: 'Accept analytics' })
    const reject = banner.getByRole('button', { name: 'Reject analytics' })
    const style = (el: typeof accept) =>
      el.evaluate((node) => {
        const s = getComputedStyle(node)
        return [s.backgroundColor, s.color, s.fontSize, s.fontWeight, s.borderRadius].join()
      })
    expect(await style(accept)).toBe(await style(reject))

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze()
    expect(results.violations).toEqual([])
    expect(analyticsRequests).toEqual([])
  })

  for (const choice of ['Accept analytics', 'Reject analytics']) {
    test(`remembers "${choice}" across page views`, async ({ page, context }) => {
      await page.goto('/', { waitUntil: 'networkidle' })
      await page.getByRole('button', { name: choice }).click()
      await expect(page.getByRole('region', { name: 'Cookies on figcit.co.uk' })).toBeHidden()

      const cookie = (await context.cookies()).find((c) => c.name === 'figcit-consent')
      expect(cookie?.value).toBe(choice.startsWith('Accept') ? 'accepted' : 'rejected')
      expect(cookie?.sameSite).toBe('Lax')

      await page.reload()
      await page.waitForLoadState('networkidle')
      await expect(page.getByRole('region', { name: 'Cookies on figcit.co.uk' })).toBeHidden()
    })
  }

  test('reserves space so the banner never hides focused content', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await expect(page.getByRole('region', { name: 'Cookies on figcit.co.uk' })).toBeVisible()
    const padding = await page.evaluate(() =>
      parseFloat(getComputedStyle(document.body).paddingBottom),
    )
    expect(padding).toBeGreaterThan(100)
  })
})
