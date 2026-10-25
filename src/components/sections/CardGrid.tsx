import Link from 'next/link'

import { ArrowIcon, ChevronIcon } from '@/components/icons'
import { toneInk } from '@/components/layout/tones'
import { ArrowLink, ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { IconDisc } from '@/components/ui/IconDisc'
import { Section, cardOn, type SectionTone } from '@/components/ui/Section'
import { SectionIntro } from '@/components/ui/SectionIntro'
import type { Tone } from '@/content/navigation'
import type { CardGridBlock } from '@/payload-types'

type Card = NonNullable<CardGridBlock['cards']>[number]

const dotBg: Record<Tone, string> = {
  purple: 'bg-disc-purple',
  terracotta: 'bg-disc-terracotta',
  teal: 'bg-disc-teal',
  ochre: 'bg-disc-ochre',
  green: 'bg-disc-green',
  blue: 'bg-disc-blue',
}

const badgeBg: Record<Tone, string> = {
  purple: 'bg-disc-purple/10',
  terracotta: 'bg-disc-terracotta/12',
  teal: 'bg-disc-teal/12',
  ochre: 'bg-disc-ochre/12',
  green: 'bg-disc-green/12',
  blue: 'bg-disc-blue/12',
}

// Grids of outcome or service cards (Figma 31:109 and 31:154). Phones get the compact
// rows from the mobile frame (41:961, 41:992): cards with a link become link rows, the
// others fold open to show their text.
export function CardGrid({ block, index }: { block: CardGridBlock; index: number }) {
  const tone: SectionTone = block.background === 'cream' ? 'cream' : 'white'
  const four = block.columns === '4'
  const cards = block.cards ?? []
  const headingId = `section-${index}`

  return (
    <Section tone={tone} id={block.anchor ?? undefined} labelledBy={headingId}>
      <SectionIntro {...block.intro} headingId={headingId} />

      {/* Phones */}
      <ul className="mt-3.5 flex flex-col gap-3.5 md:hidden">
        {cards
          .filter((c) => c.kind !== 'photo' && c.title)
          .map((card) => (
            <li key={card.id ?? card.title}>
              <MobileRow card={card} tone={tone} large={four} />
            </li>
          ))}
      </ul>

      {/* Tablet and desktop */}
      <ul
        className={`mt-14 hidden gap-6 md:grid md:grid-cols-2 ${
          four ? 'xl:grid-cols-4' : 'lg:grid-cols-3'
        }`}
      >
        {cards.map((card) => (
          <li key={card.id ?? card.title} className="flex">
            {card.kind === 'photo' ? (
              <div className="relative min-h-[19.375rem] w-full overflow-hidden rounded-card">
                <CmsImage media={card.image} sizes="(min-width: 64rem) 384px, 50vw" />
              </div>
            ) : (
              <CardBody card={card} tone={tone} large={four} />
            )}
          </li>
        ))}
      </ul>

      {block.action?.href && block.action.label && (
        <ButtonLink href={block.action.href} arrow className="mt-8 w-full md:mt-14 md:w-auto">
          {block.action.label}
        </ButtonLink>
      )}
    </Section>
  )
}

function CardBody({ card, tone, large }: { card: Card; tone: SectionTone; large: boolean }) {
  const t = card.tone ?? 'purple'
  return (
    <div
      className={`flex w-full flex-col justify-between gap-6 rounded-card ${cardOn[tone]} ${
        large ? 'px-7 pt-8 pb-8' : 'p-8'
      }`}
    >
      <div className="flex flex-col gap-4">
        {card.icon && <IconDisc icon={card.icon} tone={t} size={large ? 'md' : 'sm'} />}
        <h3 className="text-h3 font-bold">{card.title}</h3>
        {card.body && <p className="text-[1.0625rem] leading-[1.55]">{card.body}</p>}
        {card.badge && (
          <p
            className={`w-fit rounded-pill px-3 py-1.5 font-heading text-[0.8125rem] leading-[1.15] font-bold ${badgeBg[t]} ${toneInk[t]}`}
          >
            {card.badge}
          </p>
        )}
      </div>
      {card.link?.href && card.link.label && (
        <ArrowLink href={card.link.href} context={card.title ?? undefined}>
          {card.link.label}
        </ArrowLink>
      )}
    </div>
  )
}

function MobileRow({ card, tone, large }: { card: Card; tone: SectionTone; large: boolean }) {
  const t = card.tone ?? 'purple'
  const base = `flex w-full items-center gap-3.5 rounded-tile ${cardOn[tone]}`

  if (card.link?.href) {
    return (
      <Link href={card.link.href} className={`${base} p-[1.125rem]`}>
        {card.icon && large && <IconDisc icon={card.icon} tone={t} size="xs" />}
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="font-heading text-[1.0625rem] leading-[1.15] font-bold">
            {card.title}
          </span>
          {card.badge && (
            <span
              className={`font-heading text-[0.8125rem] leading-[1.15] font-bold ${toneInk[t]}`}
            >
              {card.badge}
            </span>
          )}
        </span>
        <ArrowIcon className="shrink-0" />
      </Link>
    )
  }

  return (
    <details className={`group ${base} block`}>
      <summary className="flex cursor-pointer list-none items-center gap-3.5 rounded-tile px-4 py-4 [&::-webkit-details-marker]:hidden">
        <span aria-hidden className={`size-3.5 shrink-0 rounded-pill ${dotBg[t]}`} />
        <span className="min-w-0 flex-1 font-heading text-[1.0625rem] leading-[1.15] font-bold">
          {card.title}
        </span>
        <ChevronIcon className="-rotate-90 shrink-0 transition-calm transition-transform group-open:rotate-0" />
      </summary>
      {card.body && <p className="px-4 pb-4 pl-11 text-[0.9375rem] leading-[1.6]">{card.body}</p>}
    </details>
  )
}
