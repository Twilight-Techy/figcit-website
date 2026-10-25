import { Fragment } from 'react'

// Editor text with **double asterisks** for bold, the only formatting plain fields allow.
export function Rich({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((chunk, i) =>
    chunk.startsWith('**') && chunk.endsWith('**') ? (
      <strong key={i} className="font-bold">
        {chunk.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{chunk}</Fragment>
    ),
  )
}

export const paragraphs = (text: string | null | undefined) =>
  (text ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
