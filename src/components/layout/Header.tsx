import Link from 'next/link'

import { DesktopNav } from '@/components/layout/DesktopNav'
import { Logo } from '@/components/layout/Logo'
import { MobileNav } from '@/components/layout/MobileNav'
import { headerActions, mainNav } from '@/content/navigation'

// Header (Figma 30:57): logo, main menu and actions on Pith Cream. The full menu shows
// from 1280px; narrower screens use the mobile menu. The container is the positioning
// context for the Services mega menu, which centres on the page (design state A).
export function Header() {
  return (
    <header className="bg-bg">
      <div className="relative mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-5 py-4 xl:px-20 xl:py-5">
        <Logo />

        <div className="hidden xl:block">
          <DesktopNav groups={mainNav} />
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          {/* The Comfort button joins here in T07. */}
          <Link
            href={headerActions.secondary.href}
            className="rounded-pill border-[1.5px] border-primary px-[1.375rem] py-3.5 font-heading text-[0.9375rem] leading-none font-bold text-primary transition-calm transition-colors hover:bg-primary/8"
          >
            {headerActions.secondary.label}
          </Link>
          <Link
            href={headerActions.primary.href}
            className="rounded-pill bg-primary px-[1.375rem] py-[0.9375rem] font-heading text-[0.9375rem] leading-none font-bold text-on-primary transition-calm transition-opacity hover:opacity-90"
          >
            {headerActions.primary.label}
          </Link>
        </div>

        <div className="xl:hidden">
          <MobileNav groups={mainNav} actions={headerActions} />
        </div>
      </div>
    </header>
  )
}
