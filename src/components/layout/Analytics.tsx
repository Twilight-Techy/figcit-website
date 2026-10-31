'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import { useEffect, useSyncExternalStore } from 'react'

import {
  GA_MEASUREMENT_ID,
  consentDefaultsScript,
  keyEventForLink,
  trackEvent,
  withdrawConsent,
} from '@/lib/analytics'
import { readConsent, subscribeConsent } from '@/lib/consent'

// Google Analytics 4 loads only after the visitor accepts analytics, and only when a
// measurement ID is configured (rules §3 and §7). Consent Mode defaults are set first.
export function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null)

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    if (consent === 'rejected') {
      withdrawConsent()
      return
    }
    if (consent !== 'accepted') return

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a')
      if (!link) return
      const name = keyEventForLink(link.getAttribute('href') ?? '', link.textContent ?? '')
      if (name) trackEvent(name, { link_text: (link.textContent ?? '').trim() })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [consent])

  if (!GA_MEASUREMENT_ID || consent !== 'accepted') return null
  return (
    <>
      <Script id="ga-consent-default">{consentDefaultsScript}</Script>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </>
  )
}
