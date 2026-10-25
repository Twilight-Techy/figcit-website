import { expect, test } from '@playwright/test'

// Headers scan (T28): the same protections on pages, errors, the admin and the API.
const paths = ['/', '/contact', '/this-page-does-not-exist', '/admin', '/api/pages']

for (const path of paths) {
  test(`${path} sends the security headers`, async ({ request }) => {
    const res = await request.get(path, { maxRedirects: 0 })
    const h = res.headers()
    const csp = h['content-security-policy'] ?? ''
    for (const directive of [
      "default-src 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      'report-uri /csp-report',
    ]) {
      expect(csp, `${path}: ${directive}`).toContain(directive)
    }
    expect(h['strict-transport-security']).toContain('max-age=63072000')
    expect(h['x-content-type-options']).toBe('nosniff')
    expect(h['x-frame-options']).toBe('DENY')
    expect(h['cross-origin-opener-policy']).toBe('same-origin')
    expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin')
    expect(h['permissions-policy']).toContain('camera=()')
    expect(h['x-powered-by']).toBeUndefined()
  })
}

test('the CSP report endpoint accepts reports quietly', async ({ request }) => {
  const res = await request.post('/csp-report', {
    headers: { 'content-type': 'application/csp-report' },
    data: JSON.stringify({
      'csp-report': {
        'document-uri': 'http://localhost:3000/?email=someone@example.com',
        'violated-directive': 'script-src',
        'blocked-uri': 'https://evil.example/x.js',
      },
    }),
  })
  expect(res.status()).toBe(204)
})

test('nobody can create the first admin from the web', async ({ request }) => {
  const res = await request.post('/api/users/first-register', {
    headers: { 'content-type': 'application/json', origin: 'http://localhost:3000' },
    data: { email: 'intruder@example.com', password: 'a-long-enough-password' },
  })
  expect(res.status()).toBe(403)
})

test('the preview route refuses visitors who are not signed in', async ({ request }) => {
  const res = await request.get('/preview?path=/', { maxRedirects: 0 })
  expect(res.status()).toBe(401)
  const offsite = await request.get('/preview?path=//evil.example', { maxRedirects: 0 })
  expect(offsite.status()).toBe(400)
})
