import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const axe = (page: Page) => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])

test.describe('Header on desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('opens the Services mega menu by keyboard and closes it with Escape', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    const trigger = page.getByRole('button', { name: 'Services' })
    await trigger.focus()
    await page.keyboard.press('Enter')

    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(
      page.getByRole('banner').getByRole('link', { name: /The Figcit app/ }),
    ).toBeVisible()
    expect((await axe(page).analyze()).violations).toEqual([])

    await page.keyboard.press('Escape')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toBeFocused()
  })

  test('only one menu is open at a time and outside clicks close it', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Services' }).click()
    await page.getByRole('button', { name: 'Who we help' }).click()

    await expect(page.getByRole('button', { name: 'Services' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    await expect(
      page.getByRole('banner').getByRole('link', { name: 'For employers' }),
    ).toBeVisible()

    await page.mouse.click(1300, 700)
    await expect(page.getByRole('banner').getByRole('link', { name: 'For employers' })).toBeHidden()
  })

  test('shows both call-to-action buttons', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await expect(page.getByRole('link', { name: 'Get early access' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Book a conversation' })).toBeVisible()
  })
})

test.describe('Header on mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('opens the menu dialog, traps focus and closes with Escape', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    const open = page.getByRole('button', { name: 'Menu' })
    await open.click()

    const dialog = page.getByRole('dialog', { name: 'Menu' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('link', { name: 'For colleges and universities' })).toBeVisible()
    expect((await axe(page).analyze()).violations).toEqual([])

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('has no horizontal scroll at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 })
    await page.goto('/', { waitUntil: 'networkidle' })
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })
})
