import { describe, expect, it } from 'vitest'

import { lexical } from '@/seed/lib/lexical'
import { legalPages } from '@/seed/pages/legal'

const pages = legalPages()
const textOf = (page: (typeof pages)[number]) =>
  JSON.stringify(page.layout)
    .match(/"text":"[^"]*"|"subline":"[^"]*"/g)
    ?.join(' ') ?? ''

describe('legal pages', () => {
  it('keeps the draft notice on any page with an unfilled [placeholder]', () => {
    for (const page of pages) {
      const legal = page.layout.find((b) => b.blockType === 'legal')
      const hasNotice = legal?.blockType === 'legal' && Boolean(legal.notice)
      expect(/\[[^\]]+\]/.test(textOf(page)), page.slug).toBe(hasNotice)
    }
  })

  it('describes Google Analytics, not Plausible', () => {
    expect(JSON.stringify(pages)).not.toMatch(/plausible/i)
  })
})

describe('lexical seed helper', () => {
  it('builds bold text, links and numbered lists', () => {
    const [paragraph, numbered] = lexical('**Hi** [there](/x)', '1. One\n2. Two').root.children
    expect(paragraph?.children).toMatchObject([
      { text: 'Hi', format: 1 },
      { text: ' ' },
      { type: 'link', fields: { url: '/x' }, children: [{ text: 'there' }] },
    ])
    expect(numbered).toMatchObject({ type: 'list', listType: 'number', tag: 'ol' })
  })
})
