import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Needs the seeded About and Our team pages (pnpm seed).
const axe = (page: Page) => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])

test.describe('About us', () => {
  test('tells the story in the order of the design', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveTitle('About FigCit | Fix the fit, thrive as you are')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Fix the fit, thrive as you are.',
    )
    for (const name of [
      'What we do',
      'Our mission and vision',
      'Our purpose',
      'What we believe',
      'Our story',
      'Before any task, FigCit asks four simple questions.',
    ]) {
      await expect(page.getByRole('heading', { level: 2, name })).toBeVisible()
    }
    // Traffic lights always carry a text label.
    for (const light of [
      'Available',
      'Conditional',
      'Constrained',
      'Very constrained',
      'Recovery',
    ]) {
      await expect(
        page.getByRole('listitem').filter({ hasText: new RegExp(`^${light}$`) }),
      ).toBeVisible()
    }
    await expect(page.getByRole('complementary', { name: 'Looking ahead' })).toBeVisible()
  })

  test('has no accessibility violations on desktop and phones', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/about')
    expect((await axe(page).analyze()).violations).toEqual([])
    await page.setViewportSize({ width: 390, height: 844 })
    expect((await axe(page).analyze()).violations).toEqual([])
  })
})

test.describe('Our team', () => {
  test('copies the founder’s short bio', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto('/about/team', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Copy short bio' }).click()
    await expect(page.getByRole('button', { name: 'Copy short bio' })).toHaveText('Copied')
    const copied = await page.evaluate(() => navigator.clipboard.readText())
    expect(copied).toContain('founder and CEO of FigCit')
  })

  test('links to every policy', async ({ page }) => {
    await page.goto('/about/team')
    await expect(page.getByRole('link', { name: 'Safeguarding Policy' })).toHaveAttribute(
      'href',
      '/safeguarding',
    )
    await expect(page.getByRole('link', { name: 'Accessibility Statement' })).toHaveAttribute(
      'href',
      '/accessibility',
    )
  })

  test('has no accessibility violations on desktop and phones', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/about/team')
    expect((await axe(page).analyze()).violations).toEqual([])
    await page.setViewportSize({ width: 390, height: 844 })
    expect((await axe(page).analyze()).violations).toEqual([])
  })
})
