'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'

import { ChevronIcon } from '@/components/icons'
import { NavIcon } from '@/components/icons/NavIcon'
import type { NavGroup, NavItem } from '@/content/navigation'
import { discBg, toneText } from '@/components/layout/tones'

function isCurrent(pathname: string, href: string) {
  const path = href.split('#')[0]
  return path === pathname
}

// Disclosure navigation (not an ARIA menu): each trigger is a button with aria-expanded,
// the panel holds ordinary links. Escape and outside clicks close it and return focus.
export function DesktopNav({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [lastPath, setLastPath] = useState(pathname)

  // Close the open panel after navigation (adjusting state during render, not in an effect).
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(null)
  }

  useEffect(() => {
    if (!open) return
    function onPointer(e: PointerEvent) {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[data-group="${open}"]`)
      setOpen(null)
      trigger?.focus()
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <nav ref={navRef} aria-label="Main">
      <ul className="flex items-center gap-5 whitespace-nowrap min-[90rem]:gap-8">
        {groups.map((group) =>
          group.kind === 'link' ? (
            <li key={group.label}>
              <Link
                prefetch={false}
                href={group.href}
                aria-current={isCurrent(pathname, group.href) ? 'page' : undefined}
                className="rounded-control font-heading font-semibold underline-offset-8 hover:underline aria-[current=page]:underline"
              >
                {group.label}
              </Link>
            </li>
          ) : (
            <NavDisclosure
              key={group.label}
              group={group}
              pathname={pathname}
              open={open === group.label}
              onToggle={() => setOpen((v) => (v === group.label ? null : group.label))}
            />
          ),
        )}
      </ul>
    </nav>
  )
}

function NavDisclosure({
  group,
  pathname,
  open,
  onToggle,
}: {
  group: Extract<NavGroup, { kind: 'mega' | 'dropdown' }>
  pathname: string
  open: boolean
  onToggle: () => void
}) {
  const panelId = useId()
  const active = group.items.some((item) => isCurrent(pathname, item.href))

  return (
    <li className={group.kind === 'dropdown' ? 'relative' : undefined}>
      <button
        type="button"
        data-group={group.label}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={`flex items-center gap-1.5 rounded-control font-heading font-semibold underline-offset-8 hover:underline ${active ? 'underline' : ''}`}
      >
        {group.label}
        <ChevronIcon
          size={14}
          className={`transition-calm transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div id={panelId} hidden={!open}>
        {group.kind === 'mega' ? (
          <MegaPanel items={group.items} pathname={pathname} />
        ) : (
          <DropdownPanel items={group.items} pathname={pathname} />
        )}
      </div>
    </li>
  )
}

// Mega menu — Services (Figma 40:845): three service cards in one white panel.
function MegaPanel({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <ul className="absolute top-[calc(100%+0.25rem)] left-1/2 z-40 flex w-[48.5rem] -translate-x-1/2 whitespace-normal gap-4 rounded-card bg-surface p-6 shadow-panel">
      {items.map((item) => (
        <li key={item.href} className="w-[14.5rem] shrink-0">
          <Link
            prefetch={false}
            href={item.href}
            aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
            className="group flex h-full flex-col gap-2.5 rounded-tile p-[1.125rem] hover:bg-primary/8 focus-visible:bg-primary/8"
          >
            {item.icon && (
              <span
                className={`flex size-10 items-center justify-center rounded-pill text-[#f5eede] ${discBg[item.tone ?? 'purple']}`}
              >
                <NavIcon name={item.icon} size={20} />
              </span>
            )}
            <span className="font-heading text-[1.0625rem] leading-[1.15] font-bold">
              {item.label}
            </span>
            {item.description && (
              <span className="text-[0.875rem] leading-[1.45] text-ink-muted">
                {item.description}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}

// Dropdown — Who we help (Figma 40:910): icon rows in a 340px panel.
function DropdownPanel({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <ul className="absolute top-[calc(100%+2.5rem)] -left-[3.875rem] z-40 flex w-[21.25rem] flex-col gap-1 rounded-[1.25rem] bg-surface p-3 shadow-panel">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            prefetch={false}
            href={item.href}
            aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
            className="flex items-center gap-3.5 rounded-control border-2 border-transparent px-3.5 py-3 font-heading text-[1.0625rem] leading-[1.15] font-bold hover:bg-surface-muted focus-visible:border-primary focus-visible:bg-surface-muted focus-visible:outline-none aria-[current=page]:bg-surface-muted"
          >
            {item.icon && (
              <span className={toneText[item.tone ?? 'purple']}>
                <NavIcon name={item.icon} size={22} />
              </span>
            )}
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
