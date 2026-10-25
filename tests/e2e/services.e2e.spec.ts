import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Needs the seeded Services page (pnpm seed).
const axe = (page: Page) => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])

test.describe('Our Services page', () => {
  test('shows the four services with their own anchors', async ({ page }) => {
    await page.goto('/services')
    await expect(
      page.getByRole('heading', { level: 1, name: 'Support that fits wherever you are' }),
    ).toBeVisible()
    for (const [anchor, name] of [
      ['app', 'Support that fits how you feel right now'],
      ['consulting', 'Adjust before absence, burnout or dropout'],
      ['hub', 'A place to rest, recover and reconnect'],
      ['research', 'Evidence that changes what happens next'],
    ]) {
      await expect(page.locator(`section#${anchor}`).getByRole('heading', { name })).toBeVisible()
    }
    await expect(page.getByRole('img', { name: /Figcit app check-in screen/ })).toBeVisible()
  })

  test('the sticky menu jumps to a section and marks it as current', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/services', { waitUntil: 'networkidle' })
    const menu = page.getByRole('navigation', { name: 'On this page' })
    await expect(menu.getByRole('link', { name: 'App' })).toHaveAttribute(
      'aria-current',
      'location',
    )

    await menu.getByRole('link', { name: 'Hub' }).click()
    await expect(page).toHaveURL(/#hub$/)
    await expect(menu).toBeInViewport()
    await expect(menu.getByRole('link', { name: 'Hub' })).toHaveAttribute(
      'aria-current',
      'location',
    )
  })

  test('has no accessibility violations on desktop and phones', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/services')
    expect((await axe(page).analyze()).violations).toEqual([])
    await page.setViewportSize({ width: 390, height: 844 })
    expect((await axe(page).analyze()).violations).toEqual([])
  })
})
