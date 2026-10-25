'use client'

import { useState } from 'react'

import { LineIcon } from '@/components/icons/line'

// Copies the founder's short bio for event organisers (Figma 37:535, "Copy").
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 2500)
        } catch {
          // Clipboard blocked: the text is on the page to select by hand.
        }
      }}
      className="flex shrink-0 items-center gap-1.5 rounded-control font-heading text-[0.9375rem] font-bold text-primary"
      aria-label={label}
    >
      <LineIcon name={copied ? 'check' : 'copy'} size={16} />
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}
