import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const axe = (page: Page) => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
const comfortButton = (page: Page) => page.getByRole('button', { name: /^Comfort/ })

test.describe('Comfort panel', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('opens, applies every setting and has no accessibility violations', async ({ page }) => {
    await page.goto('/')
    await comfortButton(page).click()
    const panel = page.getByRole('region', { name: 'Comfort settings' })
    await expect(panel).toBeVisible()
    expect((await axe(page).analyze()).violations).toEqual([])

    await panel.getByRole('switch', { name: 'Low-stimulation mode' }).click()
    await panel.getByRole('button', { name: 'Larger text' }).click()
    await panel.getByRole('button', { name: 'Dark' }).click()

    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-comfort', 'low')
    await expect(html).toHaveAttribute('data-text-size', 'lg')
    await expect(html).toHaveAttribute('data-theme', 'dark')
    await expect(panel.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
    expect((await axe(page).analyze()).violations).toEqual([])
  })

  test('keeps settings after reload, applied before the page renders', async ({ page }) => {
    await page.goto('/')
    await comfortButton(page).click()
    await page.getByRole('button', { name: 'Dark' }).click()

    // Capture the attribute as soon as the HTML is parsed, before hydration.
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        ;(window as unknown as { themeAtParse?: string | null }).themeAtParse =
          document.documentElement.getAttribute('data-theme')
      })
    })
    await page.reload()
    const themeAtParse = await page.evaluate(
      () => (window as unknown as { themeAtParse?: string | null }).themeAtParse,
    )
    expect(themeAtParse).toBe('dark')
  })

  test('closes with Escape and returns focus to the button', async ({ page }) => {
    await page.goto('/')
    const button = comfortButton(page)
    await button.focus()
    await page.keyboard.press('Enter')
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(button).toBeFocused()
  })
})

test.describe('Comfort panel on mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('fits inside the screen', async ({ page }) => {
    await page.goto('/')
    await comfortButton(page).click()
    const box = await page
      .getByRole('region', { name: 'Comfort settings' })

      .boundingBox()
    expect(box).not.toBeNull()
    expect(box!.x).toBeGreaterThanOrEqual(0)
    expect(box!.x + box!.width).toBeLessThanOrEqual(390)
  })
})
