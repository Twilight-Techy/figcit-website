import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const axe = (page: Page) => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
const crisis = (page: Page) => page.getByRole('complementary', { name: 'Need support now?' })

test.describe('Footer', () => {
  test('shows the crisis notice with tap-to-call numbers', async ({ page }) => {
    await page.goto('/')
    await expect(crisis(page)).toBeVisible()
    await expect(crisis(page).getByRole('link', { name: '999' })).toHaveAttribute('href', 'tel:999')
    await expect(crisis(page).getByRole('link', { name: '116 123' })).toHaveAttribute(
      'href',
      'tel:116123',
    )
  })

  test('shows the crisis notice on pages that are not found too', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    await expect(crisis(page)).toBeVisible()
  })

  test('links to every legal page on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const legal = page.getByRole('list', { name: 'Legal' })
    for (const name of ['Privacy', 'Cookies', 'Accessibility', 'Terms', 'Safeguarding']) {
      await expect(legal.getByRole('link', { name })).toBeVisible()
    }
    await expect(
      page.getByRole('navigation', { name: 'Footer' }).getByRole('link', { name: 'For employers' }),
    ).toBeVisible()
    expect((await axe(page).include('footer').analyze()).violations).toEqual([])
  })

  test('folds the link columns into accordions on phones', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/', { waitUntil: 'networkidle' })
    const nav = page.getByRole('navigation', { name: 'Footer' })
    const link = nav.getByRole('link', { name: 'For employers' })

    await expect(link).toBeHidden()
    await nav.getByText('Who we help').click()
    await expect(link).toBeVisible()
    expect((await axe(page).include('footer').analyze()).violations).toEqual([])
  })
})
