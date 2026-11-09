import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const isDev = process.env.NODE_ENV !== 'production'
// Only on Vercel: a local `pnpm start` runs over plain http, which this would break.
const isHosted = Boolean(process.env.VERCEL)

// Security pass (T28). 'unsafe-inline' scripts are needed for the inline data Next.js
// streams into statically built pages (a nonce would force every page to render on
// demand) and for ComfortInit; styles for Next.js and the Payload admin. Everything
// else is limited to this site, Google Analytics (after consent) and Cloudflare Turnstile.
// Violations are reported to /csp-report.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://challenges.cloudflare.com",
  'frame-src https://challenges.cloudflare.com',
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(isHosted ? ['upgrade-insecure-requests'] : []),
  'report-uri /csp-report',
  'report-to csp',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'Reporting-Endpoints', value: 'csp="/csp-report"' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  // The bare domain redirects to www (printed QR codes point at www, rules §9).
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'figcit.co.uk' }],
        destination: 'https://www.figcit.co.uk/:path*',
        permanent: true,
      },
      // Website Copy v6.0 folds research, evaluation and policy into FigCit Consulting.
      { source: '/research', destination: '/services/consulting', permanent: true },
      // The individual service was briefly called Needs and Fit Analysis (November 2026).
      {
        source: '/services/consulting/needs-and-fit-analysis',
        destination: '/services/consulting/capacity-fit-profile',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
