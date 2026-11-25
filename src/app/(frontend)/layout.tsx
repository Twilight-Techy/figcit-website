import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Analytics } from '@/components/layout/Analytics'
import { AppBanner } from '@/components/layout/AppBanner'
import { ComfortInit } from '@/components/layout/ComfortInit'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { Footer } from '@/components/layout/Footer'
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
    template: '%s | FigCit',
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
      // ComfortInit sets Comfort attributes on <html> before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint: ~400 bytes that prevent a flash of the wrong theme. */}
        <ComfortInit />
      </head>
      <body>
        <SkipLink />
        <AppBanner />
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
