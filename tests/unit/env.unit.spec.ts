import { describe, expect, it } from 'vitest'

import { parseEnv } from '@/lib/env'

const valid = {
  DATABASE_URL: 'postgres://figcit:figcit@127.0.0.1:5432/figcit',
  PAYLOAD_SECRET: 'x'.repeat(32),
}

describe('parseEnv', () => {
  it('accepts a complete environment and applies defaults', () => {
    const env = parseEnv(valid)
    expect(env.NEXT_PUBLIC_SITE_URL).toBe('http://localhost:3000')
  })

  it('rejects a short PAYLOAD_SECRET', () => {
    expect(() => parseEnv({ ...valid, PAYLOAD_SECRET: 'short' })).toThrow(/PAYLOAD_SECRET/)
  })

  it('rejects a missing DATABASE_URL', () => {
    expect(() => parseEnv({ PAYLOAD_SECRET: valid.PAYLOAD_SECRET })).toThrow(/DATABASE_URL/)
  })
})

describe('parseEnv on Vercel', () => {
  it('requires a Blob token so media never lands on temporary disk', () => {
    expect(() => parseEnv({ ...valid, VERCEL: '1' })).toThrow(/BLOB_READ_WRITE_TOKEN/)
    expect(() => parseEnv({ ...valid, VERCEL: '1', BLOB_READ_WRITE_TOKEN: 'token' })).not.toThrow()
  })
})

describe('parseEnv for the live site', () => {
  const vercelUrl = 'https://figcit-website.vercel.app'

  it('rejects a vercel.app site URL in production, so it never becomes the canonical address', () => {
    expect(() =>
      parseEnv({ ...valid, VERCEL_ENV: 'production', NEXT_PUBLIC_SITE_URL: vercelUrl }),
    ).toThrow(/NEXT_PUBLIC_SITE_URL/)
    expect(() =>
      parseEnv({ ...valid, SITE_INDEXABLE: 'true', NEXT_PUBLIC_SITE_URL: vercelUrl }),
    ).toThrow(/NEXT_PUBLIC_SITE_URL/)
  })

  it('accepts the real domain in production, and vercel.app on previews', () => {
    expect(() =>
      parseEnv({
        ...valid,
        VERCEL_ENV: 'production',
        NEXT_PUBLIC_SITE_URL: 'https://www.figcit.co.uk',
      }),
    ).not.toThrow()
    expect(() =>
      parseEnv({ ...valid, VERCEL_ENV: 'preview', NEXT_PUBLIC_SITE_URL: vercelUrl }),
    ).not.toThrow()
  })
})
