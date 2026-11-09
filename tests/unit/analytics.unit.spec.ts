import { describe, expect, it } from 'vitest'

import { keyEventForLink, withdrawConsent } from '@/lib/analytics'

describe('key events', () => {
  it('names the link clicks the copy asks us to track', () => {
    expect(keyEventForLink('/contact#get-early-access', 'Get early access')).toBe(
      'get_early_access_click',
    )
    expect(keyEventForLink('/contact#book-a-conversation', 'Book a conversation')).toBe(
      'book_conversation_click',
    )
    expect(keyEventForLink('/contact#book-a-conversation', 'I’m an organisation')).toBe(
      'organisation_click',
    )
    expect(keyEventForLink('/contact#book-a-conversation', 'Start your profile')).toBe(
      'start_profile_click',
    )
    expect(keyEventForLink('/about', 'About')).toBeNull()
  })
})

describe('withdrawing consent', () => {
  it('denies analytics storage and deletes the Google cookies', () => {
    window.dataLayer = []
    document.cookie = '_ga=GA1.1.1.1; Path=/'
    document.cookie = '_ga_ABC123=GS1.1.1; Path=/'
    document.cookie = 'keep=1; Path=/'
    withdrawConsent()
    const last = Array.from(window.dataLayer.at(-1) as ArrayLike<unknown>)
    expect(last).toEqual(['consent', 'update', { analytics_storage: 'denied' }])
    expect(document.cookie).not.toMatch(/_ga/)
    expect(document.cookie).toMatch(/keep=1/)
  })
})
