import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Needs the seeded Who we help pages (pnpm seed).
const axe = (page: Page) => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])

const pages = [
  {
    path: '/for-you',
    h1: 'You don’t need fixing. You need support that fits.',
    title: 'Support for you | FigCit',
    section: 'No diagnosis. No waiting. No guilt.',
  },
  {
    path: '/for-employers',
    h1: 'Keep your people well and working.',
    title: 'For employers | FigCit',
    section: 'Starting with health and social care',
  },
  {
    path: '/for-education',
    h1: 'Keep students learning while they wait.',
    title: 'For colleges and universities | FigCit',
    section: 'What you get',
  },
  {
    path: '/partners',
    h1: 'Needs-led support, without the wait.',
    title: 'For government, NHS and funders | FigCit',
    section: 'How we can work together',
  },
]

for (const p of pages) {
  test.describe(p.path, () => {
    test('renders the copy with its SEO title', async ({ page }) => {
      await page.goto(p.path)
      await expect(page).toHaveTitle(p.title)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(p.h1)
      await expect(page.getByRole('heading', { level: 2, name: p.section })).toBeVisible()
    })

    test('has no accessibility violations on desktop and phones', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.goto(p.path)
      expect((await axe(page).analyze()).violations).toEqual([])
      await page.setViewportSize({ width: 390, height: 844 })
      expect((await axe(page).analyze()).violations).toEqual([])
    })
  })
}

test('For employers shows the Deloitte figures with their source', async ({ page }) => {
  await page.goto('/for-employers')
  await expect(page.getByText('£51bn', { exact: true })).toBeVisible()
  await expect(page.getByText('Source: Deloitte, 2024.')).toBeVisible()
})

test('For you keeps the crisis line note', async ({ page }) => {
  await page.goto('/for-you')
  await expect(page.getByText(/call Samaritans free on 116 123/)).toBeVisible()
})
