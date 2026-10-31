import Link from 'next/link'

import { FigCitMark } from '@/components/brand/FigCitMark'

// Logo/Primary from Figma: the mark plus the "FigCit" wordmark. The purple shape follows
// the theme (--fc-primary) so the logo stays legible in dark mode. `reversed` is
// Logo/Reversed for dark backgrounds such as the footer: cream instead of purple.
// Phones use the smaller size from the mobile frames (Figma 41:937 and 41:1087).
export function Logo({ reversed = false }: { reversed?: boolean }) {
  const fill = reversed ? 'var(--fc-on-footer)' : 'var(--fc-primary)'
  return (
    <Link
      prefetch={false}
      href="/"
      className="inline-flex items-center gap-2 rounded-control md:gap-2.5"
      aria-label="FigCit home"
    >
      <FigCitMark fill={fill} className="h-[1.8rem] w-auto md:h-9" />
      <span
        className={`font-heading text-2xl leading-none font-bold tracking-[-0.02em] md:text-[1.875rem] ${
          reversed ? 'text-on-footer' : 'text-primary'
        }`}
      >
        FigCit
      </span>
    </Link>
  )
}
