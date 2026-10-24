'use client'

import { useSyncExternalStore } from 'react'

import { readConsent, saveConsent, subscribeConsent } from '@/lib/consent'

// Lets visitors change their analytics choice at any time (used on /cookies).
export function CookieSettings() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null)
  const status =
    consent === 'accepted'
      ? 'You have accepted analytics.'
      : consent === 'rejected'
        ? 'You have rejected analytics.'
        : 'You haven’t chosen yet, so analytics are off.'

  return (
    <div className="space-y-4 rounded-card bg-surface p-6">
      <p role="status" className="font-heading font-bold">
        {status}
      </p>
      <div className="flex flex-wrap gap-3">
        {(['accepted', 'rejected'] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={consent === value}
            onClick={() => saveConsent(value)}
            className="rounded-pill bg-primary px-6 py-3.5 font-heading text-[0.9375rem] leading-none font-bold text-on-primary aria-pressed:ring-2 aria-pressed:ring-primary aria-pressed:ring-offset-2"
          >
            {value === 'accepted' ? 'Accept analytics' : 'Reject analytics'}
          </button>
        ))}
      </div>
    </div>
  )
}
