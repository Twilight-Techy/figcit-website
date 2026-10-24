import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { deleteExpiredSubmissions, handleSubmission } from '@/lib/forms/submit'
import config from '@/payload.config'

let payload: Payload
const secret = 'test-secret-for-ip-hashing-0123456789'

const earlyAccess = (overrides: Record<string, string> = {}) => {
  const fd = new FormData()
  const fields = {
    firstName: 'Amira',
    email: 'amira@example.com',
    iAmA: 'A student',
    ageConfirmed: 'on',
    consent: 'on',
    ...overrides,
  }
  for (const [k, v] of Object.entries(fields)) fd.set(k, v)
  return fd
}

const submit = (fd: FormData, ip = '203.0.113.10') =>
  handleSubmission('early-access', fd, { payload, ip, secret })

describe('form submissions', () => {
  beforeAll(async () => {
    payload = await getPayload({ config })
  })

  beforeEach(async () => {
    await payload.delete({ collection: 'form-submissions', where: { id: { exists: true } } })
  })

  afterAll(async () => {
    await payload.delete({ collection: 'form-submissions', where: { id: { exists: true } } })
  })

  it('saves a valid submission with a hashed IP, never the raw IP', async () => {
    expect(await submit(earlyAccess())).toEqual({ status: 'success' })
    const { docs } = await payload.find({ collection: 'form-submissions', showHiddenFields: true })
    expect(docs).toHaveLength(1)
    expect(docs[0]).toMatchObject({ form: 'early-access', firstName: 'Amira', status: 'new' })
    expect(docs[0].ipHash).toMatch(/^[0-9a-f]{32}$/)
    expect(JSON.stringify(docs[0])).not.toContain('203.0.113.10')
  })

  it('returns field errors and saves nothing for invalid answers', async () => {
    const result = await submit(earlyAccess({ email: 'not-an-email' }))
    expect(result).toMatchObject({ status: 'error', errors: { email: expect.any(String) } })
    expect((await payload.count({ collection: 'form-submissions' })).totalDocs).toBe(0)
  })

  it('silently drops honeypot submissions', async () => {
    expect(await submit(earlyAccess({ website: 'http://spam.example' }))).toEqual({
      status: 'success',
    })
    expect((await payload.count({ collection: 'form-submissions' })).totalDocs).toBe(0)
  })

  it('rate limits after 5 submissions from the same IP in 10 minutes', async () => {
    for (let i = 0; i < 5; i++) expect((await submit(earlyAccess())).status).toBe('success')
    expect(await submit(earlyAccess())).toMatchObject({ status: 'error' })
    expect((await submit(earlyAccess(), '198.51.100.7')).status).toBe('success')
  })

  it('rejects unknown form types', async () => {
    const r = await handleSubmission('signup', earlyAccess(), { payload, ip: '1.1.1.1', secret })
    expect(r.status).toBe('error')
  })

  it('cannot be created or read through the public API', async () => {
    await expect(
      payload.create({
        collection: 'form-submissions',
        overrideAccess: false,
        data: { form: 'partner', email: 'x@y.z', consent: true },
      }),
    ).rejects.toThrow(/not allowed/i)
    await expect(
      payload.find({ collection: 'form-submissions', overrideAccess: false }),
    ).rejects.toThrow()
  })

  it('deletes submissions older than 12 months', async () => {
    await submit(earlyAccess())
    const aYearAndADayLater = new Date(Date.now() + 366 * 24 * 60 * 60 * 1000)
    expect(await deleteExpiredSubmissions(payload, new Date())).toBe(0)
    expect(await deleteExpiredSubmissions(payload, aYearAndADayLater)).toBe(1)
  })
})
