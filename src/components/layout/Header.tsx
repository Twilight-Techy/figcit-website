import Link from 'next/link'

import { ComfortPanel } from '@/components/layout/ComfortPanel'
import { DesktopNav } from '@/components/layout/DesktopNav'
import { Logo } from '@/components/layout/Logo'
import { MobileNav } from '@/components/layout/MobileNav'
import { headerActions, mainNav } from '@/content/navigation'

// Header (Figma 30:57): logo, main menu and actions on Pith Cream. The full menu shows
// from 1280px (1600px with larger text); narrower screens use the mobile menu. One
// Comfort control serves both layouts, so changing text size never closes it.
// The container is the positioning context for the centred Services mega menu.
// Links across the site don't prefetch: the pages are small static files, and
// prefetching every visible link added ~190 ms of main-thread work during load (T28).
export function Header() {
  return (
    <header className="bg-bg">
      <div className="relative mx-auto flex max-w-[90rem] items-center justify-between gap-3 px-5 py-3.5 xl:px-20 xl:py-5">
        <Logo />

        <div className="header-desktop">
          <DesktopNav groups={mainNav} />
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap xl:gap-3">
          <ComfortPanel />
          <Link
            prefetch={false}
            href={headerActions.secondary.href}
            className="header-desktop rounded-pill border-[1.5px] border-primary px-[1.375rem] py-3.5 font-heading text-[0.9375rem] leading-none font-bold text-primary transition-calm transition-colors hover:bg-primary/8"
          >
            {headerActions.secondary.label}
          </Link>
          <Link
            prefetch={false}
            href={headerActions.primary.href}
            className="header-desktop rounded-pill bg-primary px-[1.375rem] py-[0.9375rem] font-heading text-[0.9375rem] leading-none font-bold text-on-primary transition-calm transition-opacity hover:opacity-90"
          >
            {headerActions.primary.label}
          </Link>
          <div className="header-mobile">
            <MobileNav groups={mainNav} actions={headerActions} />
          </div>
        </div>
      </div>
    </header>
  )
}
