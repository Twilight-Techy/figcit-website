'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'

import { ChevronIcon, CloseIcon } from '@/components/icons'
import { ComfortPanel } from '@/components/layout/ComfortPanel'
import { Logo } from '@/components/layout/Logo'
import type { NavGroup, NavLink } from '@/content/navigation'

// Mobile menu (Figma 14b, 41:1111). A native modal <dialog> gives focus trapping, Escape
// to close and an inert page behind it without extra code. The dialog repeats the header
// row so the logo, Comfort and the close button stay where they were.
const roundButton =
  'flex size-[2.625rem] shrink-0 items-center justify-center rounded-pill bg-primary text-on-primary transition-calm transition-opacity hover:opacity-90'

function initialGroup(groups: NavGroup[], pathname: string): string | null {
  const current = groups.find(
    (g) => g.kind !== 'link' && g.items.some((i) => i.href.split('#')[0] === pathname),
  )
  return (current ?? groups.find((g) => g.kind !== 'link'))?.label ?? null
}

export function MobileNav({
  groups,
  actions,
}: {
  groups: NavGroup[]
  actions: { primary: NavLink; secondary: NavLink }
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const pathname = usePathname()
  const id = useId()
  const [openGroup, setOpenGroup] = useState(() => initialGroup(groups, pathname))

  useEffect(() => dialogRef.current?.close(), [pathname])

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label="Menu"
        onClick={() => dialogRef.current?.showModal()}
        className={roundButton}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M3.5 6h13M3.5 10h13M3.5 14h13"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-ink backdrop:bg-transparent"
      >
        <div className="flex min-h-full flex-col">
          <div className="flex items-center justify-between gap-3 px-5 py-3.5">
            <Logo />
            <div className="flex items-center gap-2">
              <ComfortPanel />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => dialogRef.current?.close()}
                className={roundButton}
              >
                <CloseIcon size={20} />
              </button>
            </div>
          </div>

          <nav aria-label="Main" className="px-5 pt-3 pb-3">
            <ul>
              {groups.map((group, index) => {
                if (group.kind === 'link') {
                  return (
                    <li key={group.label} className="border-b border-line">
                      <Link
                        prefetch={false}
                        href={group.href}
                        aria-current={pathname === group.href ? 'page' : undefined}
                        className="flex h-16 items-center rounded-control font-heading text-2xl leading-[1.12] font-bold"
                      >
                        {group.label}
                      </Link>
                    </li>
                  )
                }
                const open = openGroup === group.label
                const panelId = `${id}-group-${index}`
                return (
                  <li key={group.label}>
                    <div className="border-b border-line">
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpenGroup(open ? null : group.label)}
                        className={`flex h-16 w-full items-center justify-between rounded-control text-left font-heading text-2xl leading-[1.12] font-bold ${
                          open ? 'text-primary' : ''
                        }`}
                      >
                        {group.label}
                        <ChevronIcon
                          size={20}
                          className={`text-ink transition-calm transition-transform ${open ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                    <ul id={panelId} hidden={!open} className="pt-1 pb-3">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            prefetch={false}
                            href={item.href}
                            aria-current={pathname === item.href.split('#')[0] ? 'page' : undefined}
                            className="flex min-h-11 items-center rounded-control pl-3 font-heading text-[1.0625rem] leading-[1.2] font-semibold"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 px-5 pt-5 pb-8">
            <Link
              prefetch={false}
              href={actions.primary.href}
              className="rounded-pill bg-primary px-6 py-4 text-center font-heading leading-[1.2] font-bold text-on-primary"
            >
              {actions.primary.label}
            </Link>
            <Link
              prefetch={false}
              href={actions.secondary.href}
              className="rounded-pill border-[1.5px] border-primary px-6 py-4 text-center font-heading leading-[1.2] font-bold text-primary"
            >
              {actions.secondary.label}
            </Link>
          </div>
        </div>
      </dialog>
    </>
  )
}
