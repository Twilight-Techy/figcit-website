// Builds Payload rich text (Lexical JSON) from plain paragraphs for the seed. A paragraph
// whose lines all start with "- " becomes a bulleted list, and "1. " a numbered one. Inside
// text, **double asterisks** make bold and [label](url) makes a link.
type Node = { type: string; version: number; [k: string]: unknown }

const text = (t: string, format = 0): Node => ({
  type: 'text',
  text: t,
  format,
  style: '',
  mode: 'normal',
  detail: 0,
  version: 1,
})

const block = (type: string, children: Node[], extra: Record<string, unknown> = {}): Node => ({
  ...extra,
  type,
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const BOLD = 1

function inline(source: string): Node[] {
  return source
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/)
    .filter(Boolean)
    .map((chunk) => {
      if (chunk.startsWith('**')) return text(chunk.slice(2, -2), BOLD)
      const link = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (!link) return text(chunk)
      return {
        ...block('link', [text(link[1] as string)]),
        version: 3,
        fields: { linkType: 'custom', newTab: false, url: link[2] },
      }
    })
}

const list = (lines: string[], marker: RegExp, listType: 'bullet' | 'number', tag: 'ul' | 'ol') =>
  block(
    'list',
    lines.map((l, i) => block('listitem', inline(l.replace(marker, '')), { value: i + 1 })),
    { listType, start: 1, tag },
  )

export function lexical(...paragraphs: string[]) {
  const children: Node[] = []
  for (const p of paragraphs) {
    const lines = p.split('\n')
    if (lines.every((l) => l.startsWith('- '))) {
      children.push(list(lines, /^- /, 'bullet', 'ul'))
    } else if (lines.every((l) => /^\d+\. /.test(l))) {
      children.push(list(lines, /^\d+\. /, 'number', 'ol'))
    } else {
      children.push(block('paragraph', inline(p), { textFormat: 0, textStyle: '' }))
    }
  }
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}
