// Lighthouse CI budgets from docs/PROJECT_RULES.md §3, on Home, Services and Contact.
// Runs against the production build (pnpm start) with Lighthouse's default mobile
// emulation (slow 4G, mid-range phone). Total Blocking Time stands in for INP, which
// needs a real user to measure.
const KB = 1024

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'Ready in',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/services',
        'http://localhost:3000/contact',
      ],
      numberOfRuns: 3,
      settings: {
        // GitHub runners have Chrome; elsewhere set CHROME_PATH (for example to
        // Playwright's Chromium). --no-sandbox is needed when running as root.
        chromeFlags: '--no-sandbox --headless=new',
        // Accept the cookie banner's absence: a first visit shows it, which is fine,
        // but the consent cookie keeps runs comparable.
        extraHeaders: JSON.stringify({ Cookie: 'figcit-consent=rejected' }),
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        // Preview and CI builds are noindex on purpose (rules §9), which Lighthouse
        // counts against SEO, so the crawlable check is left out here.
        'categories:seo': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        // ~140 KB of this is the Next.js and React runtime (rules §3).
        'resource-summary:script:size': ['error', { maxNumericValue: 180 * KB }],
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 30 * KB }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci' },
  },
}
