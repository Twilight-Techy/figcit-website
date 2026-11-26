import { createHash } from 'node:crypto'
import AxeBuilder from '@axe-core/playwright'
import { devices, expect, test, type Page } from '@playwright/test'

// Phones as device descriptors, without switching browser (one worker runs them all).
const phone = (name: 'Pixel 7' | 'iPhone 15') => {
  const { defaultBrowserType: _ignored, ...rest } = devices[name]
  void _ignored
  return rest
}

const axe = (page: Page) => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])

test.describe('Download page', () => {
  test('offers all three ways in, with no accessibility problems', async ({ page }) => {
    await page.goto('/download', { waitUntil: 'networkidle' })
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Get FigCit on your phone')
    await expect(page.getByRole('link', { name: 'Download the app' })).toHaveAttribute(
      'href',
      '/download/figcit.apk',
    )
    await expect(page.getByRole('link', { name: 'Open FigCit in Safari' })).toHaveAttribute(
      'href',
      'https://app.figcit.co.uk/home/',
    )
    await expect(page.getByRole('img', { name: /QR code/ })).toBeVisible()
    // a desktop browser sees the computer card first
    await expect(page.locator('[data-card]').first()).toBeVisible()
    await expect(page.locator('[data-card="desktop"] .download-yours')).toBeVisible()
    expect((await axe(page).analyze()).violations).toEqual([])
  })

  test('serves the APK as an Android package download', async ({ request }) => {
    const res = await request.get('/download/figcit.apk')
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toBe('application/vnd.android.package-archive')
    expect(res.headers()['content-disposition']).toContain('FigCit.apk')
    // an APK is a zip file
    expect((await res.body()).subarray(0, 2).toString()).toBe('PK')
  })

  test('tells the installed app which version is out, matching the APK', async ({ request }) => {
    const res = await request.get('/download/figcit.json')
    expect(res.status()).toBe(200)
    const info = (await res.json()) as { versionCode: number; bytes: number; sha256: string }
    const apk = await (await request.get('/download/figcit.apk')).body()
    expect(info.bytes).toBe(apk.length)
    expect(info.sha256).toBe(createHash('sha256').update(apk).digest('hex'))
    expect(info.versionCode).toBeGreaterThan(10000)
  })

  test('the header button leads here', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/about', { waitUntil: 'networkidle' })
    await page.getByRole('banner').getByRole('link', { name: 'Get the app' }).click()
    await expect(page).toHaveURL(/\/download$/)
  })
})

test.describe('On an Android phone', () => {
  test.use(phone('Pixel 7'))

  test('puts the Android download first and labels it', async ({ page }) => {
    await page.goto('/download', { waitUntil: 'networkidle' })
    const android = page.locator('[data-card="android"]')
    await expect(android.locator('.download-yours')).toBeVisible()
    const top = async (sel: string) => (await page.locator(sel).boundingBox())?.y ?? 0
    expect(await top('[data-card="android"]')).toBeLessThan(await top('[data-card="ios"]'))
  })

  test('shows the Get the app bar, which stays closed once closed', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    const bar = page.getByRole('complementary', { name: 'FigCit app' })
    await expect(bar).toBeVisible()
    await expect(bar.getByRole('link', { name: 'Get the app' })).toHaveAttribute(
      'href',
      '/download',
    )
    expect((await axe(page).include('.app-banner').analyze()).violations).toEqual([])

    await bar.getByRole('button', { name: 'Hide this message' }).click()
    await expect(bar).toBeHidden()
    await page.goto('/about', { waitUntil: 'networkidle' })
    await expect(page.getByRole('complementary', { name: 'FigCit app' })).toBeHidden()
  })

  test('has no bar on the download page itself', async ({ page }) => {
    await page.goto('/download', { waitUntil: 'networkidle' })
    await expect(page.getByRole('complementary', { name: 'FigCit app' })).toBeHidden()
  })
})

test.describe('On an iPhone', () => {
  test.use(phone('iPhone 15'))

  test('puts the Add to Home Screen steps first', async ({ page }) => {
    await page.goto('/download', { waitUntil: 'networkidle' })
    await expect(page.locator('[data-card="ios"] .download-yours')).toBeVisible()
  })
})

test('the bar is not shown on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.getByRole('complementary', { name: 'FigCit app' })).toBeHidden()
})
