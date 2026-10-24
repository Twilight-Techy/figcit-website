'use client'

import Link from 'next/link'
import { useEffect, useRef, useSyncExternalStore } from 'react'

import { readConsent, saveConsent, subscribeConsent } from '@/lib/consent'

// Server render and first client render agree on "no banner"; it appears after hydration.
const serverSnapshot = () => 'pending' as const
const clientSnapshot = () => readConsent() ?? 'unset'

// Cookie banner (design state D). Accept and Reject look the same so neither choice is
// nudged. Not modal: it never traps focus, and the page reserves space for it so a
// focused element is never hidden behind it (WCAG 2.4.11).
export function CookieBanner() {
  const state = useSyncExternalStore(subscribeConsent, clientSnapshot, serverSnapshot)
  const ref = useRef<HTMLElement>(null)
  const visible = state === 'unset'

  useEffect(() => {
    const root = document.documentElement
    if (!visible || !ref.current) {
      root.style.removeProperty('scroll-padding-bottom')
      document.body.style.removeProperty('padding-bottom')
      return
    }
    const space = `${ref.current.offsetHeight + 32}px`
    root.style.setProperty('scroll-padding-bottom', space)
    document.body.style.setProperty('padding-bottom', space)
  }, [visible])

  if (!visible) return null

  return (
    <section
      ref={ref}
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[70rem] rounded-card bg-surface p-5 text-ink shadow-panel sm:inset-x-5 sm:bottom-5 sm:p-7"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex flex-1 gap-4 lg:items-center lg:gap-6">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            aria-hidden
            className="mt-0.5 shrink-0 text-eyebrow lg:mt-0"
          >
            <circle cx="13" cy="13" r="10.5" stroke="currentColor" strokeWidth="1.9" />
            <circle cx="10" cy="10.5" r="1.6" fill="currentColor" />
            <circle cx="15.5" cy="12" r="1.6" fill="currentColor" />
            <circle cx="11.5" cy="16" r="1.6" fill="currentColor" />
          </svg>
          <div className="space-y-1">
            <h2
              id="cookie-banner-title"
              className="font-heading text-[1.0625rem] leading-[1.15] font-bold"
            >
              Cookies on figcit.co.uk
            </h2>
            <p className="text-[0.9375rem] leading-[1.6]">
              We use essential cookies to make this site work. With your permission we’d also use
              privacy-friendly analytics to improve it. Nothing non-essential runs until you choose.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 lg:items-center">
          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
            <button
              type="button"
              onClick={() => saveConsent('accepted')}
              className="rounded-pill bg-primary px-6 py-3.5 font-heading text-[0.9375rem] leading-none font-bold whitespace-nowrap text-on-primary"
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => saveConsent('rejected')}
              className="rounded-pill bg-primary px-6 py-3.5 font-heading text-[0.9375rem] leading-none font-bold whitespace-nowrap text-on-primary"
            >
              Reject analytics
            </button>
          </div>
          <Link
            href="/cookies"
            className="self-center font-heading text-[0.875rem] font-bold text-primary underline underline-offset-4"
          >
            Cookie settings
          </Link>
        </div>
      </div>
    </section>
  )
}
