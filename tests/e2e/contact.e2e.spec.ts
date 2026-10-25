import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Needs the seeded Contact page (pnpm seed) and the database the server action writes to.
const axe = (page: Page) => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])

// Each test looks like a different visitor, so the rate limit never trips across runs.
test.beforeEach(async ({ page }) => {
  const ip = `203.0.113.${Math.floor(Math.random() * 250) + 1}`
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': `${ip}, 10.0.0.1` })
})

test('opens the form named in the address', async ({ page }) => {
  await page.goto('/contact#get-early-access', { waitUntil: 'networkidle' })
  await expect(page.getByRole('tab', { name: 'Get early access' })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await expect(
    page.getByRole('heading', { name: 'Get early access', level: 2 }).last(),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Register your interest' }).click()
  await expect(page.getByRole('tab', { name: 'Hub interest' })).toHaveAttribute(
    'aria-selected',
    'true',
  )
})

test('moves between tabs with the arrow keys', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'networkidle' })
  await page.getByRole('tab', { name: 'Book a conversation' }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'Partner with us' })).toBeFocused()
  await expect(page.getByRole('tab', { name: 'Partner with us' })).toHaveAttribute(
    'aria-selected',
    'true',
  )
})

test('shows errors in words, keeps what was typed and has no axe violations', async ({ page }) => {
  await page.goto('/contact#hub-interest', { waitUntil: 'networkidle' })
  const panel = page.getByRole('tabpanel')
  await panel.getByLabel('First name').fill('Sam')
  await panel.getByLabel('Email').fill('not-an-email')
  await panel.getByRole('button', { name: 'Register your interest' }).click()

  await expect(panel.getByRole('alert')).toContainText('There’s a problem with your answers')
  await expect(panel.getByRole('alert')).toBeFocused()
  const email = panel.getByLabel('Email')
  await expect(email).toHaveAttribute('aria-invalid', 'true')
  await expect(panel.getByText('Enter an email address like name@example.com')).toBeVisible()
  await expect(panel.getByLabel('First name')).toHaveValue('Sam')
  await expect(panel.getByText('Enter your town or city')).toBeVisible()
  expect((await axe(page).include('#forms').analyze()).violations).toEqual([])
})

test('sends a valid early access request and confirms it', async ({ page }) => {
  await page.goto('/contact#get-early-access', { waitUntil: 'networkidle' })
  const panel = page.getByRole('tabpanel')
  await panel.getByLabel('First name').fill('Playwright')
  await panel.getByLabel('Email').fill('playwright@example.com')
  await panel.getByText('Student', { exact: true }).click()
  await panel.getByLabel('I confirm I am 16 or over.').check()
  await panel.getByLabel(/I agree to Figcit storing my details/).check()
  await panel.getByRole('button', { name: 'Get early access' }).click()

  const done = panel.getByRole('status')
  await expect(done).toContainText('Thank you — we’ve got it.')
  await expect(done).toBeFocused()
  await expect(done.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/')
})

test('has no accessibility violations on desktop and phones', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/contact')
  expect((await axe(page).analyze()).violations).toEqual([])
  await page.setViewportSize({ width: 390, height: 844 })
  expect((await axe(page).analyze()).violations).toEqual([])
})

test('the header button opens the early access form from another page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/about', { waitUntil: 'networkidle' })
  await page.getByRole('banner').getByRole('link', { name: 'Get early access' }).click()
  await expect(page).toHaveURL(/\/contact#get-early-access$/)
  await expect(page.getByRole('tab', { name: 'Get early access' })).toHaveAttribute(
    'aria-selected',
    'true',
  )
})
