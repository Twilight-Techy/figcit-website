// Builds Payload rich text (Lexical JSON) from plain paragraphs for the seed. Lines
// starting with "- " become a bulleted list.
type Node = { type: string; version: number; [k: string]: unknown }

const text = (t: string): Node => ({
  type: 'text',
  text: t,
  format: 0,
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

export function lexical(...paragraphs: string[]) {
  const children: Node[] = []
  for (const p of paragraphs) {
    const lines = p.split('\n')
    if (lines.every((l) => l.startsWith('- '))) {
      children.push(
        block(
          'list',
          lines.map((l, i) => block('listitem', [text(l.slice(2))], { value: i + 1 })),
          { listType: 'bullet', start: 1, tag: 'ul' },
        ),
      )
    } else {
      children.push(block('paragraph', [text(p)], { textFormat: 0, textStyle: '' }))
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
