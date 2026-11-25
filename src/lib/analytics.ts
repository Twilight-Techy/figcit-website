// Google Analytics 4 (Website Copy v6.0, "Google Analytics and SEO Set-up"). Nothing here
// runs until the visitor accepts analytics in the cookie banner (rules §7).

import { readConsent } from './consent'

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// gtag reads its commands from the Arguments object, not an array.
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

// Consent Mode v2: analytics only, never advertising. An inline script, so it runs before
// the Google tag's own set-up script, which is rendered straight after it.
const consentDefaults = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'granted',
}
export const consentDefaultsScript = `window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments)}gtag('consent','default',${JSON.stringify(consentDefaults)});`

// When someone rejects after accepting: stop analytics storage and remove GA's cookies.
export function withdrawConsent() {
  if (!window.dataLayer) return
  gtag('consent', 'update', { analytics_storage: 'denied' })
  const root = window.location.hostname.replace(/^www\./, '')
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim()
    if (!name || !/^_ga(_|$)/.test(name)) continue
    for (const domain of ['', `; Domain=${root}`, `; Domain=.${root}`]) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}`
    }
  }
}

export type KeyEvent =
  | 'get_early_access_click'
  | 'book_conversation_click'
  | 'organisation_click'
  | 'start_profile_click'
  | 'contact_form_sent'
  | 'get_app_click'
  | 'android_download'

export function trackEvent(name: KeyEvent, params?: Record<string, string>) {
  if (!GA_MEASUREMENT_ID || readConsent() !== 'accepted' || !window.dataLayer) return
  gtag('event', name, params)
}

// The key events from the copy that come from links. "I'm an organisation" and "Start your
// profile" also point at the booking form, so they are told apart by their labels.
export function keyEventForLink(href: string, label: string): KeyEvent | null {
  if (/^I.m an organisation$/i.test(label.trim())) return 'organisation_click'
  if (/^Start your profile$/i.test(label.trim())) return 'start_profile_click'
  if (href.endsWith('#get-early-access')) return 'get_early_access_click'
  if (href === '/download' || href === '/download/') return 'get_app_click'
  if (href.endsWith('/download/figcit.apk')) return 'android_download'
  if (href.endsWith('#book-a-conversation')) return 'book_conversation_click'
  return null
}
