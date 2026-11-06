import { describe, expect, it } from 'vitest'

import { schemas, validate } from '@/lib/forms/schemas'

describe('form schemas', () => {
  it('accepts a complete early access request', () => {
    const r = validate('early-access', {
      firstName: ' Amira ',
      email: 'amira@example.com',
      iAmA: 'A student',
      ageConfirmed: 'on',
      consent: 'on',
    })
    expect(r).toEqual({
      ok: true,
      data: {
        firstName: 'Amira',
        email: 'amira@example.com',
        iAmA: 'A student',
        ageConfirmed: true,
        consent: true,
      },
    })
  })

  it('returns one plain-English error per field', () => {
    const r = validate('early-access', { email: 'nope', iAmA: 'A wizard' })
    expect(r.ok).toBe(false)
    if (r.ok) return
    expect(r.errors).toMatchObject({
      firstName: 'Enter your first name',
      email: 'Enter an email address like name@example.com',
      iAmA: 'Choose the option that describes you',
      ageConfirmed: 'Confirm you are 18 or over',
    })
    expect(r.errors.consent).toMatch(/agree/)
  })

  it('makes adjustments optional on Book a conversation', () => {
    const r = validate('book-conversation', {
      name: 'Sam',
      email: 'sam@care.example',
      organisation: 'Care Co',
      role: 'HR lead',
      sector: 'Health and social care',
      topic: 'Training for managers',
      consent: 'on',
    })
    expect(r.ok).toBe(true)
  })

  it('never has fields for diagnosis, health details or date of birth', () => {
    const banned = /diagnos|health|condition|birth|^dob$|^age$/i
    for (const schema of Object.values(schemas)) {
      for (const key of Object.keys(schema.shape)) expect(key).not.toMatch(banned)
    }
  })

  it('caps message length to stop abuse', () => {
    const r = validate('partner', {
      name: 'A',
      email: 'a@b.co',
      organisation: 'Org',
      partnershipType: 'Other',
      message: 'x'.repeat(2001),
      consent: 'on',
    })
    expect(r.ok).toBe(false)
  })
})
