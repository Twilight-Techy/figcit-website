import { expect, test } from '@playwright/test'

// Responsive sweep: every page at phone, tablet, laptop and wide-screen widths, not only
// the 390px and 1440px frames in Figma. Fails if the page scrolls sideways, if content
// sits off-screen, or if a word doesn't fit its box. Needs the seeded pages.
const pages = [
  '/',
  '/services',
  '/for-you',
  '/for-employers',
  '/for-education',
  '/partners',
  '/about',
  '/about/team',
  '/contact',
  '/faqs',
  '/privacy',
  '/cookies',
]
const widths = [320, 414, 768, 1024, 1280, 1920]

test.describe.configure({ mode: 'parallel' })

for (const path of pages) {
  test(`${path} fits every screen width`, async ({ page }) => {
    test.setTimeout(90_000)
    const problems: string[] = []
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(path)
      const found = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth
        const out: string[] = []
        const overflow = document.documentElement.scrollWidth - vw
        if (overflow > 0) out.push(`page scrolls sideways by ${overflow}px`)
        const skip =
          '.decorative,[aria-hidden="true"],dialog,[hidden],.sr-only,.comfort-trigger-label,' +
          'details:not([open]) > :not(summary),[role=tablist],[aria-label="On this page"]'
        const shown = (e: Element) =>
          e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden'
        const name = (e: Element) =>
          `${e.tagName.toLowerCase()} "${(e.textContent ?? '').trim().slice(0, 30)}"`
        for (const e of document.querySelectorAll(
          'main h1, main h2, main h3, main p, main a, main li, main button, footer p, footer a',
        )) {
          if (!shown(e) || e.closest(skip)) continue
          const r = e.getBoundingClientRect()
          if (r.width && (r.right > vw + 1 || r.left < -1)) out.push(`off-screen ${name(e)}`)
          const s = getComputedStyle(e)
          if (
            s.display !== 'inline' &&
            s.overflowX === 'visible' &&
            e.scrollWidth > e.clientWidth + 2
          )
            out.push(`doesn't fit ${name(e)}`)
        }
        return [...new Set(out)].slice(0, 5)
      })
      for (const f of found) problems.push(`${width}px: ${f}`)
    }
    expect(problems).toEqual([])
  })
}
