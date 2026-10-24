import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Analytics } from '@/components/layout/Analytics'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { Header } from '@/components/layout/Header'
import { JsonLd } from '@/components/layout/JsonLd'
import { SkipLink } from '@/components/layout/SkipLink'
import { env } from '@/lib/env'
import { atkinson, figtree } from '@/lib/fonts'
import { isProductionDeploy, organizationJsonLd } from '@/lib/seo'
import { site } from '@/content/site'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: site.defaultTitle,
    template: '%s | Figcit',
  },
  description: site.defaultDescription,
  applicationName: site.name,
  openGraph: { type: 'website', siteName: site.name, locale: 'en_GB' },
  twitter: { card: 'summary_large_image' },
  // Previews and local builds are never indexed (rules §9).
  robots: isProductionDeploy() ? undefined : { index: false, follow: false },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${figtree.variable} ${atkinson.variable}`}
      // comfort-init.js sets Comfort attributes on <html> before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* Render-blocking on purpose: ~400 bytes that prevent a flash of the wrong theme. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/comfort-init.js" />
      </head>
      <body>
        <SkipLink />
        <JsonLd data={organizationJsonLd()} />
        <Header />
        {/* Footer with crisis notice (T06) goes here. */}
        <main id="main">{children}</main>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
