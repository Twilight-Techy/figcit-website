import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Needs the seeded home page (pnpm seed).
const axe = (page: Page) => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])

test.describe('Home page', () => {
  test('shows every section from the design', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Everyone has days when the world doesn’t fit.',
      }),
    ).toBeVisible()
    for (const name of [
      'Support for the whole life, not just the hard moments',
      'Four ways we help people and places fit',
      'Who are you here for?',
      'A day with Figcit',
      'Help too often arrives after the crash',
      'Shaped by lived experience',
      'Fix the fit, thrive as you are.',
      'Let’s make life, learning and work fit people.',
    ]) {
      await expect(page.getByRole('heading', { level: 2, name })).toBeVisible()
    }
    await expect(page.getByRole('img', { name: /window seat/ })).toBeVisible()
  })

  test('links each path card to its audience page', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'For my workplace' })).toHaveAttribute(
      'href',
      '/for-employers',
    )
  })

  test('folds outcome cards on phones and has no horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/', { waitUntil: 'networkidle' })
    const row = page.locator('details').filter({ hasText: 'Feel steadier day to day' })
    const body = row.getByText('Notice how you’re doing', { exact: false })
    await expect(body).toBeHidden()
    await row.locator('summary').click()
    await expect(body).toBeVisible()

    await page.setViewportSize({ width: 320, height: 700 })
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test('has no accessibility violations on phones in dark mode', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'))
    expect((await axe(page).analyze()).violations).toEqual([])
  })
})
