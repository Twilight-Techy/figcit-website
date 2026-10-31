'use client'

import { useRowLabel } from '@payloadcms/ui'

type Row = {
  headline?: string
  heading?: string
  eyebrow?: string
  label?: string
  text?: string
  name?: string
  intro?: { heading?: string; eyebrow?: string }
}

// The first words an editor would recognise a section by.
export function summarise(data: Row | undefined): string {
  const text =
    data?.headline ||
    data?.intro?.heading ||
    data?.heading ||
    data?.name ||
    data?.label ||
    data?.eyebrow ||
    data?.intro?.eyebrow ||
    data?.text ||
    ''
  const line = text.replace(/\*\*/g, '').split('\n')[0]?.trim() ?? ''
  return line.length > 70 ? `${line.slice(0, 69)}…` : line
}

// Section header in the page editor: "03 · Card grid · How we create a better fit"
// instead of Payload's "Untitled" block name.
export function BlockLabel({ blockLabel }: { blockLabel: string }) {
  const { data, rowNumber } = useRowLabel<Row>()
  const summary = summarise(data)
  return (
    <span className="fc-block-label">
      <span className="fc-block-label__number">
        {String((rowNumber ?? 0) + 1).padStart(2, '0')}
      </span>
      <span className="fc-block-label__type">{blockLabel}</span>
      {summary && <span className="fc-block-label__summary">{summary}</span>}
    </span>
  )
}
