import Link from 'next/link'

import { ArrowIcon } from '@/components/icons'

// Pill buttons from Figma (Button/Get early access, Button/I'm an organisation): 54px
// tall with 28px sides (51px on phones). Outline variants add their 1.5px border on top,
// as in the design.
export type ButtonVariant = 'primary' | 'outline' | 'cream' | 'outlineLight' | 'teal'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:opacity-90',
  outline: 'border-[1.5px] border-ink text-ink hover:bg-ink/5',
  cream: 'bg-on-band text-band hover:opacity-90',
  outlineLight: 'border-[1.5px] border-on-band text-on-band hover:bg-on-band/10',
  // Hub actions (Register your interest).
  teal: 'bg-disc-teal text-white hover:opacity-90',
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  arrow = false,
  className = '',
}: {
  href: string
  children: React.ReactNode
  variant?: ButtonVariant
  arrow?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2.5 rounded-pill px-7 py-4 text-center sm:py-[1.0625rem] font-heading text-base leading-5 font-bold transition-calm transition-[opacity,background-color] ${variants[variant]} ${className}`}
    >
      {children}
      {/* The mobile frames drop the arrow on full-width buttons. */}
      {arrow && <ArrowIcon className="hidden shrink-0 sm:block" />}
    </Link>
  )
}

// Text link with an arrow ("Learn more", "Read our story"). `context` is read by screen
// readers only, so repeated "Learn more" links still say where they go.
export function ArrowLink({
  href,
  children,
  context,
  className = '',
}: {
  href: string
  children: React.ReactNode
  context?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-control font-heading text-base leading-5 font-bold text-primary underline-offset-4 hover:underline ${className}`}
    >
      <span>
        {children}
        {context && <span className="sr-only"> about {context}</span>}
      </span>
      <ArrowIcon className="shrink-0" />
    </Link>
  )
}
