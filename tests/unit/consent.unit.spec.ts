import { describe, expect, it } from 'vitest'

import { parseConsent, readConsent, saveConsent } from '@/lib/consent'

describe('consent cookie', () => {
  it('reads only the two valid values', () => {
    expect(parseConsent('figcit-consent=accepted')).toBe('accepted')
    expect(parseConsent('a=1; figcit-consent=rejected; b=2')).toBe('rejected')
    expect(parseConsent('figcit-consent=maybe')).toBeNull()
    expect(parseConsent('other-figcit-consent=accepted')).toBeNull()
    expect(parseConsent('')).toBeNull()
  })

  it('saves the choice as a cookie', () => {
    saveConsent('rejected')
    expect(readConsent()).toBe('rejected')
    saveConsent('accepted')
    expect(readConsent()).toBe('accepted')
  })
})
