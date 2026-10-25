import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Needs the seeded Questions and legal pages (pnpm seed).
const axe = (page: Page) => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])

test.describe('Questions', () => {
  test('shows every answer and folds them away', async ({ page }) => {
    await page.goto('/faqs', { waitUntil: 'networkidle' })
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Questions people ask us')
    const answer = page.getByText('No. Everything we offer starts from what you need today.')
    await expect(answer).toBeVisible()
    await page.getByRole('heading', { name: 'Do I need a diagnosis?' }).click()
    await expect(answer).toBeHidden()
  })

  test('publishes FAQPage structured data', async ({ page }) => {
    await page.goto('/faqs')
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()
    const faq = blocks.map((b) => JSON.parse(b)).find((d) => d['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(6)
    expect(faq.mainEntity[0].name).toBe('Do I need a diagnosis?')
  })

  test('has no accessibility violations', async ({ page }) => {
    await page.goto('/faqs')
    expect((await axe(page).analyze()).violations).toEqual([])
  })
})

const legal = [
  ['/privacy', 'Privacy notice'],
  ['/cookies', 'Cookies'],
  ['/accessibility', 'Accessibility statement'],
  ['/terms', 'Terms of use'],
  ['/safeguarding', 'Safeguarding'],
  ['/complaints', 'Complaints'],
] as const

for (const [path, title] of legal) {
  test(`${path} uses the legal template and marks its page in the menu`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
    const nav = page.getByRole('navigation', { name: 'Legal pages' })
    await expect(nav.locator('[aria-current="page"]')).toHaveAttribute('href', path)
    await expect(page.getByRole('heading', { level: 2, name: 'Contact us' })).toBeVisible()
    expect((await axe(page).analyze()).violations).toEqual([])
  })
}

test('the cookies page lets visitors change their analytics choice', async ({ page }) => {
  await page.goto('/cookies', { waitUntil: 'networkidle' })
  await expect(page.getByRole('status').filter({ hasText: /analytics/ })).toBeVisible()
})
