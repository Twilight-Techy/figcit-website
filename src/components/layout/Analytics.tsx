'use client'

import Script from 'next/script'
import { useSyncExternalStore } from 'react'

import { readConsent, subscribeConsent } from '@/lib/consent'

const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

// Plausible (EU-hosted, cookie-free) loads only after the visitor accepts analytics,
// and only when a domain is configured (rules §3 and §7).
export function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null)
  if (!domain || consent !== 'accepted') return null
  return (
    <Script src="https://plausible.io/js/script.js" data-domain={domain} strategy="lazyOnload" />
  )
}
