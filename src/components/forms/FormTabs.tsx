'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

import { WebsiteForm, formMeta } from '@/components/forms/WebsiteForm'
import { formTypes, type FormType } from '@/lib/forms/options'

// Tabbed forms on Contact (Figma 38:604). Each tab has an address, such as
// /contact#get-early-access, so header buttons and cards open the right form.
const order: FormType[] = [
  'book-conversation',
  'partner',
  'early-access',
  'hub-interest',
  'tester-feedback',
]

function fromHash(hash: string): FormType | undefined {
  const h = hash.replace(/^#/, '')
  return formTypes.find((t) => formMeta[t].hash === h)
}

export function FormTabs({ initial = 'book-conversation' }: { initial?: FormType }) {
  const [active, setActive] = useState<FormType>(initial)
  const wrapRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const sync = (scroll: boolean, hash = window.location.hash) => {
      const t = fromHash(hash)
      if (!t) return
      setActive(t)
      if (scroll) wrapRef.current?.scrollIntoView({ block: 'start' })
    }
    sync(true)
    const onHash = () => sync(true)
    // Next.js links change the hash with pushState, which fires no hashchange event, so
    // also catch clicks on links to a form on this page.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href*="#"]')
      if (!(link instanceof HTMLAnchorElement)) return
      if (link.pathname !== window.location.pathname || !fromHash(link.hash)) return
      sync(true, link.hash)
    }
    window.addEventListener('hashchange', onHash)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('hashchange', onHash)
      document.removeEventListener('click', onClick)
    }
  }, [])

  // On narrow screens the tab strip scrolls; keep the chosen tab in view without
  // scrolling the page.
  useEffect(() => {
    const tab = tabRefs.current[active]
    const list = tab?.parentElement
    if (!tab || !list) return
    const left = tab.offsetLeft - list.offsetLeft
    if (left < list.scrollLeft || left + tab.offsetWidth > list.scrollLeft + list.clientWidth) {
      list.scrollLeft = left - 6
    }
  }, [active])

  const choose = (t: FormType, focus = false) => {
    setActive(t)
    history.replaceState(null, '', `#${formMeta[t].hash}`)
    if (focus) tabRefs.current[t]?.focus()
  }

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: KeyboardEvent) => {
    const i = order.indexOf(active)
    const next =
      e.key === 'ArrowRight'
        ? order[(i + 1) % order.length]
        : e.key === 'ArrowLeft'
          ? order[(i - 1 + order.length) % order.length]
          : e.key === 'Home'
            ? order[0]
            : e.key === 'End'
              ? order[order.length - 1]
              : undefined
    if (!next) return
    e.preventDefault()
    choose(next, true)
  }

  return (
    <div
      ref={wrapRef}
      id="forms"
      className="scroll-mt-6 rounded-card bg-surface-muted p-5 sm:p-8 md:p-12"
    >
      <div
        role="tablist"
        aria-label="Choose a form"
        onKeyDown={onKeyDown}
        className="mb-8 flex max-w-full gap-1 overflow-x-auto rounded-pill bg-surface p-1.5 [scrollbar-width:none] sm:w-fit"
      >
        {order.map((t) => {
          const selected = t === active
          return (
            <button
              key={t}
              ref={(el) => {
                tabRefs.current[t] = el
              }}
              type="button"
              role="tab"
              id={`tab-${t}`}
              aria-selected={selected}
              aria-controls={`panel-${t}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => choose(t)}
              className={`shrink-0 rounded-pill px-[1.125rem] py-2.5 font-heading text-[0.9375rem] leading-[1.15] font-bold whitespace-nowrap ${
                selected ? 'bg-primary text-on-primary' : 'hover:bg-surface-muted'
              }`}
            >
              {formMeta[t].tab}
            </button>
          )
        })}
      </div>
      {order.map((t) => (
        <div
          key={t}
          role="tabpanel"
          id={`panel-${t}`}
          aria-labelledby={`tab-${t}`}
          hidden={t !== active}
        >
          {/* Only the active form is mounted, so its state and spam check are fresh. */}
          {t === active && <WebsiteForm form={t} />}
        </div>
      ))}
    </div>
  )
}
