import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const modes: Record<string, Record<string, string>> = {
  light: {},
  dark: { 'data-theme': 'dark' },
  'low-stimulation': { 'data-comfort': 'low' },
  'dark low-stimulation': { 'data-theme': 'dark', 'data-comfort': 'low' },
  'large text': { 'data-text-size': 'lg' },
}

test.describe('Design tokens (dev page)', () => {
  // /dev/tokens only exists in development; CI runs the production build, where token
  // contrast is covered by tests/unit/contrast.unit.spec.ts.
  test.skip(Boolean(process.env.CI), 'Development-only page')
  for (const [name, attrs] of Object.entries(modes)) {
    test(`has no accessibility violations in ${name} mode`, async ({ page }) => {
      await page.goto('/dev/tokens')
      await page.evaluate((a) => {
        for (const [k, v] of Object.entries(a)) document.documentElement.setAttribute(k, v)
      }, attrs)

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
        .analyze()
      expect(results.violations).toEqual([])
    })
  }

  test('loads both self-hosted fonts', async ({ page }) => {
    await page.goto('/dev/tokens')
    const families = await page.evaluate(async () => {
      await document.fonts.ready
      return [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family)
    })
    expect(families.join(' ')).toMatch(/figtree/i)
    expect(families.join(' ')).toMatch(/atkinson/i)
  })
})
