import { Fragment } from 'react'

import { ArrowIcon } from '@/components/icons'
import { AnyIcon } from '@/components/icons/AnyIcon'
import { LineIcon } from '@/components/icons/line'
import { discBg, toneInk } from '@/components/layout/tones'
import { AppPreview } from '@/components/sections/AppPreview'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Rich } from '@/components/ui/Rich'
import { Section, cardOn, type SectionTone } from '@/components/ui/Section'
import type { Tone } from '@/content/navigation'
import type {
  ActionsPart,
  CardsPart,
  ListPanelsPart,
  NotePart,
  PricesPart,
  SectionBlock,
  StepsPart,
  TextPart,
} from '@/payload-types'

type Part = NonNullable<SectionBlock['parts']>[number]

// Long-page section (Our Services, Figma 32:203 to 34:430): an intro, then parts in
// order. With an illustration, the intro and the first `besideCount` parts sit beside
// it on wide screens.
export function ContentSection({ block, index }: { block: SectionBlock; index: number }) {
  const tone: SectionTone = block.background === 'cream' ? 'cream' : 'white'
  const headingId = `section-${index}`
  const parts = block.parts ?? []
  const hasAside = block.aside === 'app' || block.aside === 'photo'
  const besideCount = hasAside ? (block.besideCount ?? 0) : 0
  const beside = parts.slice(0, besideCount)
  const below = parts.slice(besideCount)

  const intro = <Intro block={block} headingId={headingId} />

  return (
    <Section tone={tone} id={block.anchor ?? undefined} labelledBy={headingId}>
      {hasAside ? (
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,43.75rem)_minmax(0,26.25rem)] lg:justify-between">
          <div className="flex flex-col">
            {intro}
            <Parts parts={beside} tone={tone} />
          </div>
          {block.aside === 'app' ? <AppPreview /> : <ArchedPhoto block={block} />}
        </div>
      ) : (
        intro
      )}
      <Parts parts={below} tone={tone} />
    </Section>
  )
}

function Intro({ block, headingId }: { block: SectionBlock; headingId: string }) {
  const { eyebrow, heading, badge, lead, layout } = block.intro
  const split = layout === 'split'
  return (
    <div
      className={
        split
          ? 'grid gap-6 lg:grid-cols-[minmax(0,40rem)_minmax(0,30rem)] lg:items-end lg:justify-between'
          : 'flex max-w-[43.75rem] flex-col'
      }
    >
      <div className="flex flex-col gap-4 md:gap-5">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id={headingId} className="text-h2 font-bold">
          {heading}
        </h2>
      </div>
      {badge && (
        <p className="mt-6 w-fit rounded-pill bg-disc-teal/12 px-3 py-1.5 font-heading text-[0.8125rem] leading-[1.15] font-bold text-tone-teal">
          {badge}
        </p>
      )}
      {lead && <p className={split ? 'text-lead' : 'mt-6 text-lead'}>{lead}</p>}
    </div>
  )
}

function ArchedPhoto({ block }: { block: SectionBlock }) {
  return (
    <div className="relative mx-auto w-full max-w-[32.5rem] pr-5 pb-5">
      <span
        aria-hidden
        className={`decorative absolute right-0 bottom-0 aspect-square w-[46%] rounded-pill ${discBg[block.accent ?? 'teal']}`}
      />
      <div className="relative aspect-[500/540] overflow-hidden rounded-t-full rounded-b-card bg-surface-muted">
        <CmsImage media={block.image} sizes="(min-width: 64rem) 500px, 90vw" />
      </div>
    </div>
  )
}

function Parts({ parts, tone }: { parts: Part[]; tone: SectionTone }) {
  return parts.map((part, i) => <Fragment key={part.id ?? i}>{renderPart(part, tone)}</Fragment>)
}

function renderPart(part: Part, tone: SectionTone) {
  switch (part.blockType) {
    case 'subheading':
      if (part.size === 'hidden') {
        return (
          <>
            <h3 className="sr-only">{part.text}</h3>
            <div aria-hidden className="h-10 md:h-14" />
          </>
        )
      }
      return part.size === 'small' ? (
        <h3 className="mt-6 mb-6 text-h3 font-bold">{part.text}</h3>
      ) : (
        <h3 className="mt-14 mb-8 text-[1.5rem] leading-[1.15] font-bold md:mt-16 md:mb-10 md:text-[2rem]">
          {part.text}
        </h3>
      )
    case 'steps':
      return <Steps part={part} tone={tone} />
    case 'cards':
      return <Cards part={part} tone={tone} />
    case 'prices':
      return <Prices part={part} tone={tone} />
    case 'note':
      return <Note part={part} tone={tone} />
    case 'actions':
      return <Actions part={part} />
    case 'text':
      return <Text part={part} />
    case 'listPanels':
      return <ListPanels part={part} tone={tone} />
  }
}

function Steps({ part, tone }: { part: StepsPart; tone: SectionTone }) {
  const steps = part.steps ?? []
  if (part.layout === 'flow') {
    return (
      <ol className="grid gap-3 sm:grid-cols-2 lg:flex lg:items-stretch lg:gap-0">
        {steps.map((step, i) => (
          <li key={step.id ?? i} className="flex items-center lg:flex-1">
            <div
              className={`flex h-full w-full flex-col gap-3 rounded-tile p-[1.125rem] ${cardOn[tone]}`}
            >
              <span className="flex size-7 items-center justify-center rounded-pill bg-primary font-heading text-[0.875rem] font-bold text-on-primary">
                {i + 1}
              </span>
              <span className="font-heading text-[1.0625rem] leading-[1.2] font-bold">
                {step.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <ArrowIcon aria-hidden className="mx-3 hidden shrink-0 text-orange lg:block" />
            )}
          </li>
        ))}
      </ol>
    )
  }
  return (
    <ol className="flex flex-col gap-6">
      {steps.map((step, i) => (
        <li
          key={step.id ?? i}
          className={`flex items-start gap-5 rounded-tile px-5 py-[1.125rem] ${cardOn[tone]}`}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-pill bg-primary font-heading font-bold text-on-primary">
            {i + 1}
          </span>
          <p className="pt-1.5 text-[1.0625rem] leading-[1.55]">
            <strong className="font-heading font-bold">{step.title}</strong> {step.text}
          </p>
        </li>
      ))}
    </ol>
  )
}

const cols = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-2 lg:grid-cols-3',
  '4': 'md:grid-cols-2 xl:grid-cols-4',
} as const

function Cards({ part, tone }: { part: CardsPart; tone: SectionTone }) {
  return (
    <ul className={`grid gap-6 ${cols[part.columns ?? '3']}`}>
      {(part.cards ?? []).map((card, i) => {
        const t: Tone = card.tone ?? 'purple'
        return (
          <li
            key={card.id ?? i}
            className={`flex flex-col gap-4 rounded-card p-[1.875rem] ${cardOn[tone]}`}
          >
            {card.icon && (
              <span
                aria-hidden
                className={`flex size-[3.25rem] items-center justify-center rounded-pill text-[#f5eede] ${discBg[t]}`}
              >
                <AnyIcon name={card.icon} size={24} />
              </span>
            )}
            {card.price && (
              <p
                className={`w-fit rounded-pill px-3 py-1.5 font-heading text-[0.8125rem] leading-[1.15] font-bold text-white ${discBg[t]}`}
              >
                {card.price}
              </p>
            )}
            <h4 className="font-heading text-[1.375rem] leading-[1.18] font-bold md:text-2xl">
              {card.title}
            </h4>
            {card.body && <p className="text-[1.0625rem] leading-[1.55]">{card.body}</p>}
          </li>
        )
      })}
    </ul>
  )
}

function Prices({ part, tone }: { part: PricesPart; tone: SectionTone }) {
  const t: Tone = part.tone ?? 'purple'
  return (
    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {(part.prices ?? []).map((p, i) => (
        <li
          key={p.id ?? i}
          className={`flex min-h-[10.75rem] flex-col rounded-card p-6 ${
            p.featured ? 'bg-band text-on-band' : cardOn[tone]
          }`}
        >
          <p className="font-heading text-lg leading-[1.15] font-bold">{p.name}</p>
          <p className="mt-2 flex items-baseline gap-1.5">
            <span
              className={`font-heading leading-[1.1] font-extrabold tracking-[-0.02em] ${
                p.price.startsWith('£') ? 'text-5xl' : 'text-[2rem]'
              } ${p.featured ? 'text-orange' : toneInk[t]}`}
            >
              {p.price}
            </span>
            {p.unit && <span className="text-[1.0625rem]">{p.unit}</span>}
          </p>
          {p.note && <p className="mt-auto pt-3 text-[0.9375rem] leading-[1.6]">{p.note}</p>}
        </li>
      ))}
    </ul>
  )
}

function Note({ part, tone }: { part: NotePart; tone: SectionTone }) {
  const outlined = part.style === 'outlined'
  const lines = part.text.split('\n').filter(Boolean)
  return (
    <div
      className={`mt-6 flex items-start gap-4 rounded-[1.25rem] ${
        outlined ? 'border border-line bg-surface px-7 py-6' : `px-6 py-[1.125rem] ${cardOn[tone]}`
      }`}
    >
      {part.icon && (
        <span aria-hidden className="mt-0.5 shrink-0 text-disc-teal">
          <AnyIcon name={part.icon} size={22} />
        </span>
      )}
      <div className="flex flex-col gap-3 text-[1.0625rem] leading-[1.55]">
        {lines.map((line, i) => (
          <p key={i}>
            <Rich text={line} />
          </p>
        ))}
      </div>
    </div>
  )
}

function Actions({ part }: { part: ActionsPart }) {
  const teal = part.buttonTone === 'teal'
  return (
    <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
      {(part.actions ?? []).map((a, i) => (
        <ButtonLink
          key={a.id ?? i}
          href={a.href}
          variant={a.variant === 'outline' ? 'outline' : teal ? 'teal' : 'primary'}
          arrow={Boolean(a.arrow)}
        >
          {a.label}
        </ButtonLink>
      ))}
      {part.note && <p className="text-[0.9375rem] text-ink-muted">{part.note}</p>}
    </div>
  )
}

function Text({ part }: { part: TextPart }) {
  if (part.style === 'small') {
    return <p className="mt-14 text-[0.9375rem] leading-[1.6] text-ink-muted">{part.text}</p>
  }
  if (part.style === 'emphasis') {
    return (
      <p className="mt-14 font-heading text-[1.375rem] leading-[1.3] font-semibold text-primary md:text-[1.625rem]">
        {part.text}
      </p>
    )
  }
  return <p className="mt-12 text-lg leading-[1.6]">{part.text}</p>
}

function ListPanels({ part, tone }: { part: ListPanelsPart; tone: SectionTone }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {(part.panels ?? []).map((panel, i) => {
        const docs = panel.style === 'documents'
        return (
          <section
            key={panel.id ?? i}
            className={`rounded-card p-7 md:p-9 ${docs ? 'bg-band text-on-band' : cardOn[tone]}`}
          >
            <h3 className="font-heading text-2xl leading-[1.15] font-bold">{panel.title}</h3>
            <ul className={`mt-5 grid gap-x-6 gap-y-4 ${docs ? '' : 'sm:grid-cols-2'}`}>
              {(panel.items ?? []).map((item, j) => (
                <li key={item.id ?? j} className="flex items-start gap-3 text-base leading-[1.45]">
                  {docs ? (
                    <LineIcon name="file" size={20} className="mt-0.5 shrink-0 text-orange" />
                  ) : (
                    <span
                      aria-hidden
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-pill bg-disc-teal text-white"
                    >
                      <LineIcon name="check" size={12} strokeWidth={3} />
                    </span>
                  )}
                  <span className={docs ? 'text-[1.0625rem]' : ''}>{item.text}</span>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
