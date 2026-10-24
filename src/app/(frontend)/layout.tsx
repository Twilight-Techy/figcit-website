import type { Metadata } from 'next'
import type { ReactNode } from 'react'

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
    <html lang="en-GB" className={`${figtree.variable} ${atkinson.variable}`}>
      <body>
        <SkipLink />
        {/* Header (T05) and Footer with crisis notice (T06) go here. */}
        <main id="main">{children}</main>
      </body>
    </html>
  )
}
