// Cookie consent (rules §7). The choice itself is stored in one essential first-party
// cookie; nothing non-essential runs until the visitor chooses Accept.

export type Consent = 'accepted' | 'rejected'

export const CONSENT_COOKIE = 'figcit-consent'
export const CONSENT_EVENT = 'figcit-consent-change'
const MAX_AGE_SECONDS = 180 * 24 * 60 * 60 // ask again after six months

export function parseConsent(cookieHeader: string): Consent | null {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]+)`))
  const value = match?.[1]
  return value === 'accepted' || value === 'rejected' ? value : null
}

export function readConsent(): Consent | null {
  return typeof document === 'undefined' ? null : parseConsent(document.cookie)
}

export function saveConsent(value: Consent) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`
  window.dispatchEvent(new Event(CONSENT_EVENT))
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange)
  return () => window.removeEventListener(CONSENT_EVENT, onChange)
}
