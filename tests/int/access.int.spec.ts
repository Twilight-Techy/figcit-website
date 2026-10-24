import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import config from '@/payload.config'

let payload: Payload
const email = 'access-test@figcit.co.uk'

describe('Access rules', () => {
  beforeAll(async () => {
    payload = await getPayload({ config })
    await payload.delete({ collection: 'users', where: { email: { equals: email } } })
  })

  afterAll(async () => {
    await payload.delete({ collection: 'users', where: { email: { equals: email } } })
  })

  it('hides admin accounts from anonymous visitors', async () => {
    await expect(payload.find({ collection: 'users', overrideAccess: false })).rejects.toThrow()
  })

  it('rejects admin passwords shorter than 12 characters', async () => {
    await expect(
      payload.create({ collection: 'users', data: { email, password: 'short-pass' } }),
    ).rejects.toThrow(/at least 12 characters/)
  })

  it('accepts a 12+ character admin password', async () => {
    const user = await payload.create({
      collection: 'users',
      data: { email, password: 'a-long-enough-password' },
    })
    expect(user.email).toBe(email)
  })

  it('lets anyone read media but not create it', async () => {
    await expect(
      payload.find({ collection: 'media', overrideAccess: false }),
    ).resolves.toBeDefined()
    await expect(
      payload.create({
        collection: 'media',
        overrideAccess: false,
        data: { alt: 'test' },
        filePath: 'src/fonts/README.md',
      }),
    ).rejects.toThrow(/not allowed/i)
  })
})
