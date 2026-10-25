import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// Accessibility pass (T26): every page in every Comfort mode, on desktop and phones, plus
// 320px wide with large text (similar to 200% zoom). Needs the seeded pages.
const pages = [
  '/',
  '/services',
  '/for-you',
  '/for-employers',
  '/for-education',
  '/partners',
  '/about',
  '/about/team',
  '/contact',
  '/faqs',
  '/privacy',
  '/cookies',
  '/accessibility',
  '/terms',
  '/safeguarding',
  '/complaints',
]

const modes: Record<string, Record<string, string>> = {
  light: {},
  dark: { 'data-theme': 'dark' },
  'low stimulation': { 'data-comfort': 'low' },
  'dark low stimulation': { 'data-theme': 'dark', 'data-comfort': 'low' },
  'large text': { 'data-text-size': 'lg' },
}

test.describe.configure({ mode: 'parallel' })

for (const path of pages) {
  test(`${path} passes axe in every Comfort mode`, async ({ page }) => {
    test.setTimeout(90_000)
    for (const [width, height] of [
      [1440, 900],
      [390, 844],
    ]) {
      await page.setViewportSize({ width, height })
      await page.goto(path)
      for (const [mode, attrs] of Object.entries(modes)) {
        await page.evaluate((a) => {
          const root = document.documentElement
          for (const k of ['data-theme', 'data-comfort', 'data-text-size']) root.removeAttribute(k)
          for (const [k, v] of Object.entries(a)) root.setAttribute(k, v)
        }, attrs)
        const { violations } = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
        expect(
          violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
          `${path} at ${width}px in ${mode} mode`,
        ).toEqual([])
      }
    }
  })

  test(`${path} has no horizontal scroll at 320px with large text`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 })
    await page.goto(path)
    await page.evaluate(() => document.documentElement.setAttribute('data-text-size', 'lg'))
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })
}

test('the skip link moves keyboard focus to the main content', async ({ page }) => {
  await page.goto('/services', { waitUntil: 'networkidle' })
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to content' })
  await expect(skip).toBeFocused()
  await expect(skip).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main$/)
})

test('every page has exactly one h1 and a unique title', async ({ page }) => {
  const titles = new Set<string>()
  for (const path of pages) {
    await page.goto(path)
    await expect(page.locator('h1'), path).toHaveCount(1)
    titles.add(await page.title())
  }
  expect(titles.size).toBe(pages.length)
})

// Keyboard pass: every element reached with Tab shows a visible focus indicator.
for (const path of ['/', '/services', '/contact', '/faqs', '/about/team']) {
  test(`${path} shows a focus indicator on everything reachable by keyboard`, async ({ page }) => {
    test.setTimeout(90_000)
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(path, { waitUntil: 'networkidle' })
    const missing: string[] = []
    const seen = new Set<string>()
    for (let i = 0; i < 120; i++) {
      await page.keyboard.press('Tab')
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null
        // The Next.js dev overlay is not part of the site.
        if (!el || el === document.body || el.tagName === 'NEXTJS-PORTAL') return null
        const s = getComputedStyle(el)
        const details = el.tagName === 'SUMMARY' ? el.closest('details') : null
        const visible =
          (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2) ||
          s.boxShadow !== 'none' ||
          (details !== null && getComputedStyle(details).borderColor !== 'rgba(0, 0, 0, 0)')
        const label = `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40)}"`
        return { label, visible }
      })
      if (!info) continue
      if (seen.has(info.label)) {
        if (info.label.includes('Skip to content')) break
        continue
      }
      seen.add(info.label)
      if (!info.visible) missing.push(info.label)
    }
    expect(seen.size).toBeGreaterThan(10)
    expect(missing).toEqual([])
  })
}
