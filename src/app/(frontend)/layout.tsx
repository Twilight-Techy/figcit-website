import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Header } from '@/components/layout/Header'
import { SkipLink } from '@/components/layout/SkipLink'
import { env } from '@/lib/env'
import { atkinson, figtree } from '@/lib/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: 'Figcit | Support that fits, every day',
    template: '%s | Figcit',
  },
  description:
    'Figcit makes support part of everyday life for young people and adults with mental health conditions and neurodevelopmental differences.',
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
        <Header />
        {/* Footer with crisis notice (T06) goes here. */}
        <main id="main">{children}</main>
      </body>
    </html>
  )
}
