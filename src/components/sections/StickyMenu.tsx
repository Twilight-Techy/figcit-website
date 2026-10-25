'use client'

import { useEffect, useMemo, useState } from 'react'

import type { StickyMenuBlock } from '@/payload-types'

// "On this page" menu that sticks to the top while scrolling (Figma 32:192). The pill
// for the section in view is filled; links are plain anchors, so it works without JS.
export function StickyMenu({ block }: { block: StickyMenuBlock }) {
  const items = useMemo(() => block.items ?? [], [block.items])
  const [active, setActive] = useState(items[0]?.anchor)

  // The current section is the last one whose top has passed a third of the way down.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight / 3
      let current = items[0]?.anchor
      for (const item of items) {
        const el = document.getElementById(item.anchor)
        if (el && el.getBoundingClientRect().top <= line) current = item.anchor
      }
      setActive(current)
    }
    const onScroll = () => {
      frame ||= requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [items])

  return (
    <nav
      aria-label={block.label ?? 'On this page'}
      className="sticky top-0 z-30 border-y border-line bg-surface"
    >
      <div className="container-site flex items-center gap-3 overflow-x-auto py-3.5 [scrollbar-width:none]">
        <p className="hidden shrink-0 pr-1 font-heading text-(length:--fc-text-eyebrow) font-bold tracking-(--fc-tracking-eyebrow) text-ink-muted uppercase md:block">
          {block.label ?? 'On this page'}
        </p>
        <ul className="flex shrink-0 gap-3">
          {items.map((item) => {
            const current = active === item.anchor
            return (
              <li key={item.anchor}>
                <a
                  href={`#${item.anchor}`}
                  aria-current={current ? 'location' : undefined}
                  className={`block rounded-pill border px-[1.125rem] py-2.5 font-heading text-[0.9375rem] leading-[1.15] font-bold whitespace-nowrap transition-calm transition-colors ${
                    current
                      ? 'border-primary bg-primary text-on-primary'
                      : 'border-line hover:bg-surface-muted'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
