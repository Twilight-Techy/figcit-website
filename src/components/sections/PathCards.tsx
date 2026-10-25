import Link from 'next/link'

import { ArrowIcon } from '@/components/icons'
import { IconDisc } from '@/components/ui/IconDisc'
import { Section } from '@/components/ui/Section'
import { SectionIntro } from '@/components/ui/SectionIntro'
import type { PathCardsBlock } from '@/payload-types'

// "Who are you here for?" on the purple band (Figma 31:229, mobile 41:1038). Each card is
// one link; phones show slim rows.
export function PathCards({ block, index }: { block: PathCardsBlock; index: number }) {
  const headingId = `section-${index}`
  return (
    <Section tone="purple" labelledBy={headingId}>
      <SectionIntro {...(block.intro ?? {})} onDark headingId={headingId} />
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 md:mt-14 md:gap-6 xl:grid-cols-4">
        {(block.paths ?? []).map((path) => (
          <li key={path.id ?? path.href} className="flex">
            <Link
              href={path.href}
              className="group flex w-full items-center justify-between gap-4 rounded-tile bg-bg p-5 text-ink md:min-h-[15.125rem] md:flex-col md:items-start md:rounded-card md:px-8 md:pt-9 md:pb-9"
            >
              <span className="hidden md:block">
                <IconDisc icon={path.icon} size="lg" inverse />
              </span>
              <span className="flex w-full items-center justify-between gap-4 md:flex-col md:items-start md:gap-0">
                <span className="font-heading text-lg leading-[1.15] font-bold md:text-[1.625rem] md:leading-[1.12] md:tracking-[-0.01em]">
                  {path.title}
                </span>
                <span
                  aria-hidden
                  className="flex size-8 shrink-0 items-center justify-center rounded-pill bg-primary text-on-primary transition-calm transition-transform group-hover:translate-x-1 md:size-11"
                >
                  <ArrowIcon size={20} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
