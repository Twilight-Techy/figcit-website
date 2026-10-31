import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import config from '@/payload.config'

let payload: Payload
const slug = 'int-test-page'
const context = { disableRevalidate: true }

const layout = [{ blockType: 'ctaBand' as const, heading: 'Draft heading' }]

describe('Pages', () => {
  beforeAll(async () => {
    payload = await getPayload({ config })
    await payload.delete({ collection: 'pages', where: { slug: { equals: slug } }, context })
  })

  afterAll(async () => {
    await payload.delete({ collection: 'pages', where: { slug: { equals: slug } }, context })
  })

  it('hides drafts from the public and shows them once published', async () => {
    const page = await payload.create({
      collection: 'pages',
      data: { title: 'Int test', slug, layout, _status: 'draft' },
      draft: true,
      context,
    })
    const publicFind = () =>
      payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
        overrideAccess: false,
      })

    expect((await publicFind()).docs).toHaveLength(0)

    await payload.update({
      collection: 'pages',
      id: page.id,
      data: { _status: 'published' },
      context,
    })
    expect((await publicFind()).docs).toHaveLength(1)
  })

  it('stops anonymous visitors creating pages', async () => {
    await expect(
      payload.create({
        collection: 'pages',
        data: { title: 'Nope', slug: 'nope', layout },
        overrideAccess: false,
        context,
      }),
    ).rejects.toThrow()
  })

  it('rejects slugs that are not lower-case paths', async () => {
    await expect(
      payload.create({
        collection: 'pages',
        data: { title: 'Bad', slug: 'Bad Slug', layout },
        context,
      }),
    ).rejects.toThrow(/Page address/)
  })

  it('rejects links that could point off-site in disguise', async () => {
    await expect(
      payload.create({
        collection: 'pages',
        data: {
          title: 'Bad link',
          slug: 'bad-link',
          layout: [
            {
              blockType: 'ctaBand',
              heading: 'Hi',
              actions: [{ label: 'Go', href: '//evil.example' }],
            },
          ],
        },
        context,
      }),
    ).rejects.toThrow()
  })

  it('lets anyone read site settings but not change them', async () => {
    await expect(
      payload.findGlobal({ slug: 'site-settings', overrideAccess: false }),
    ).resolves.toBeDefined()
    await expect(
      payload.updateGlobal({
        slug: 'site-settings',
        data: { companyNumber: '12345678' },
        overrideAccess: false,
        context,
      }),
    ).rejects.toThrow()
  })
})
