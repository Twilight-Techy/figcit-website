import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Needs the seeded Services pages (pnpm seed).
const axe = (page: Page) => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])

const servicePages = [
  ['/services/app', 'Everyday support, adapted to you'],
  ['/services/consulting', 'Building systems that work for people'],
  ['/services/hub', 'A space to connect, explore and recharge'],
  ['/services/consulting/capacity-fit-audit', 'Capacity Fit Audit'],
  ['/services/consulting/needs-and-fit-analysis', 'Needs and Fit Analysis'],
] as const

test.describe('Our Services pages', () => {
  test('the overview links to the three service pages', async ({ page }) => {
    await page.goto('/services')
    await expect(
      page.getByRole('heading', { level: 1, name: 'How we create a better fit' }),
    ).toBeVisible()
    for (const [href] of servicePages.slice(0, 3)) {
      await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible()
    }
  })

  test('each service has its own page', async ({ page }) => {
    for (const [href, name] of servicePages) {
      await page.goto(href)
      await expect(page.getByRole('heading', { level: 1, name })).toBeVisible()
    }
    await page.goto('/services/app')
    await expect(page.getByRole('img', { name: /FigCit App check-in screen/ })).toBeVisible()
  })

  test('consulting links to the audit and analysis pages', async ({ page }) => {
    await page.goto('/services/consulting')
    for (const name of ['capacity-fit-audit', 'needs-and-fit-analysis']) {
      await expect(
        page.locator(`main a[href="/services/consulting/${name}"]:visible`).first(),
      ).toBeVisible()
    }
  })

  test('the old research page redirects to FigCit Consulting', async ({ page }) => {
    await page.goto('/research')
    await expect(page).toHaveURL(/\/services\/consulting$/)
    await expect(
      page.getByRole('heading', { level: 2, name: 'How we measure what changes' }),
    ).toBeVisible()
  })

  test('has no accessibility violations on desktop and phones', async ({ page }) => {
    test.setTimeout(180_000)
    for (const href of ['/services', ...servicePages.map(([h]) => h)]) {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.goto(href)
      expect((await axe(page).analyze()).violations).toEqual([])
      await page.setViewportSize({ width: 390, height: 844 })
      expect((await axe(page).analyze()).violations).toEqual([])
    }
  })
})
