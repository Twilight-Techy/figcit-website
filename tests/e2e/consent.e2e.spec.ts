import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const isGoogleAnalytics = (url: string) =>
  /googletagmanager\.com|google-analytics\.com|analytics\.google\.com/.test(url)

// Answers Google's tag locally so the tests never reach Google, and records each request.
async function stubGoogle(page: Page) {
  const requests: string[] = []
  await page.route(
    (url) => isGoogleAnalytics(url.href),
    (route) => {
      requests.push(route.request().url())
      return route.fulfill({ status: 200, contentType: 'text/javascript', body: '' })
    },
  )
  return requests
}

test.describe('Cookie banner', () => {
  test('appears on first visit with equal choices and no analytics loaded', async ({ page }) => {
    const analyticsRequests: string[] = []
    page.on('request', (r) => {
      if (isGoogleAnalytics(r.url())) analyticsRequests.push(r.url())
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

  test('loads Google Analytics only after Accept, with advertising consent denied', async ({
    page,
  }) => {
    const requests = await stubGoogle(page)
    await page.goto('/', { waitUntil: 'networkidle' })
    expect(requests).toEqual([])

    await page.getByRole('button', { name: 'Accept analytics' }).click()
    await expect.poll(() => requests.some((u) => u.includes('gtag/js?id=G-'))).toBe(true)
    const consent = await page.evaluate(() =>
      (window.dataLayer ?? [])
        .map((entry) => Array.from(entry as ArrayLike<unknown>))
        .find((args) => args[0] === 'consent' && args[1] === 'default'),
    )
    expect(consent?.[2]).toMatchObject({ ad_storage: 'denied', analytics_storage: 'granted' })
  })

  test('rejecting later stops analytics and deletes the Google cookies', async ({
    page,
    context,
  }) => {
    await stubGoogle(page)
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Accept analytics' }).click()
    await context.addCookies([{ name: '_ga', value: 'GA1.1.1.1', url: 'http://localhost:3000' }])

    await page.goto('/cookies', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Reject analytics' }).click()
    await expect
      .poll(async () => (await context.cookies()).some((c) => c.name === '_ga'))
      .toBe(false)
  })

  test('reserves space so the banner never hides focused content', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await expect(page.getByRole('region', { name: 'Cookies on figcit.co.uk' })).toBeVisible()
    const padding = await page.evaluate(() =>
      parseFloat(getComputedStyle(document.body).paddingBottom),
    )
    expect(padding).toBeGreaterThan(100)
  })
})
