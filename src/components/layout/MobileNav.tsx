'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { CloseIcon } from '@/components/icons'
import { NavIcon } from '@/components/icons/NavIcon'
import { discBg } from '@/components/layout/tones'
import type { NavGroup, NavLink } from '@/content/navigation'

// Mobile menu (Figma 14b). A native modal <dialog> gives focus trapping, Escape to close
// and an inert page behind it without extra code.
export function MobileNav({
  groups,
  actions,
}: {
  groups: NavGroup[]
  actions: { primary: NavLink; secondary: NavLink }
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const pathname = usePathname()

  useEffect(() => dialogRef.current?.close(), [pathname])

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="flex items-center gap-2 rounded-pill border border-line px-4 py-2.5 font-heading text-[0.9375rem] font-semibold"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M3 5h12M3 9h12M3 13h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Menu
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-ink backdrop:bg-transparent"
      >
        <div className="flex min-h-full flex-col gap-8 px-5 pt-4 pb-8">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="flex items-center gap-2 rounded-pill border border-line px-4 py-2.5 font-heading text-[0.9375rem] font-semibold"
            >
              <CloseIcon size={18} />
              Close
            </button>
          </div>

          <nav aria-label="Main">
            <ul className="flex flex-col gap-6">
              {groups.map((group) =>
                group.kind === 'link' ? (
                  <li key={group.label}>
                    <Link
                      href={group.href}
                      className="font-heading text-[1.375rem] font-bold"
                      aria-current={pathname === group.href ? 'page' : undefined}
                    >
                      {group.label}
                    </Link>
                  </li>
                ) : (
                  <li key={group.label}>
                    <p className="mb-2 font-heading text-eyebrow font-bold text-eyebrow uppercase">
                      {group.label}
                    </p>
                    <ul className="flex flex-col gap-1">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={pathname === item.href.split('#')[0] ? 'page' : undefined}
                            className="flex items-center gap-3 rounded-tile bg-surface px-4 py-3.5 font-heading text-[1.0625rem] font-bold"
                          >
                            {item.icon && (
                              <span
                                className={`flex size-8 shrink-0 items-center justify-center rounded-pill text-[#f5eede] ${discBg[item.tone ?? 'purple']}`}
                              >
                                <NavIcon name={item.icon} size={16} />
                              </span>
                            )}
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <Link
              href={actions.primary.href}
              className="rounded-pill bg-primary px-6 py-4 text-center font-heading font-bold text-on-primary"
            >
              {actions.primary.label}
            </Link>
            <Link
              href={actions.secondary.href}
              className="rounded-pill border-[1.5px] border-primary px-6 py-4 text-center font-heading font-bold text-primary"
            >
              {actions.secondary.label}
            </Link>
          </div>
        </div>
      </dialog>
    </>
  )
}
