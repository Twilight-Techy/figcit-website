import { LineIcon } from '@/components/icons/line'
import { LazyCopyButton } from '@/components/lazy'
import { discBg } from '@/components/layout/tones'
import { ArrowLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { paragraphs } from '@/components/ui/Rich'
import { Section } from '@/components/ui/Section'
import type { Tone } from '@/content/navigation'
import type {
  ApproachBlock,
  Media,
  MissionVisionBlock,
  PolicyLinksBlock,
  ProfileBlock,
  StoryBlock,
  TeamBlock,
} from '@/payload-types'

// Sections for About us (Figma 36:466) and Our team (37:535).

// Purple and teal statement cards (Figma 36:466, "Our mission and vision").
export function MissionVision({ block, index }: { block: MissionVisionBlock; index: number }) {
  const headingId = `section-${index}`
  return (
    <Section tone="cream" labelledBy={headingId}>
      <h2 id={headingId}>
        <Eyebrow as="span">{block.eyebrow}</Eyebrow>
      </h2>
      <ul className="mt-10 grid gap-6 md:mt-14 lg:grid-cols-2">
        {(block.cards ?? []).map((card, i) => (
          <li
            key={card.id ?? i}
            className={`rounded-card p-8 text-[#f5eede] md:p-11 ${
              card.tone === 'teal' ? 'bg-(--fc-promise)' : 'bg-band'
            }`}
          >
            <h3 className="flex items-center gap-3 font-heading text-[1.0625rem] leading-[1.2] font-bold tracking-[0.1em] uppercase">
              <LineIcon name={card.icon ?? 'target'} size={24} className="text-orange" />
              {card.label}
            </h3>
            <p className="mt-6 font-heading text-[1.375rem] leading-[1.4] font-semibold md:text-[1.75rem]">
              {card.text}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

// Portrait, or a monogram until the founder's photo is supplied (the Figma portrait is
// marked as a placeholder, so we don't stand in a stock face for a real person).
function Portrait({
  media,
  initials,
  sizes,
}: {
  media: number | Media | null | undefined
  initials?: string | null
  sizes: string
}) {
  const hasPhoto = media && typeof media !== 'number' && media.url
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface-muted">
      {hasPhoto ? (
        <CmsImage media={media} sizes={sizes} />
      ) : (
        <div
          role="img"
          aria-label="Portrait to follow"
          className="flex h-full items-center justify-center bg-[#e9dfcc] font-heading text-[5rem] font-extrabold text-[#5b3358]/80"
        >
          {initials}
        </div>
      )}
    </div>
  )
}

// "Our story" on the purple band (Figma 36:466).
export function Story({ block, index }: { block: StoryBlock; index: number }) {
  const headingId = `section-${index}`
  return (
    <section aria-labelledby={headingId} className="on-dark bg-band py-section text-on-band">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[minmax(0,26.25rem)_minmax(0,43.75rem)] lg:justify-between">
        <div className="relative w-full max-w-[26.25rem] pt-5 pr-5">
          <span
            aria-hidden
            className="decorative absolute top-0 right-0 aspect-square w-[76%] rounded-pill bg-orange"
          />
          <div className="relative">
            <Portrait
              media={block.portrait}
              initials={block.portraitInitials}
              sizes="(min-width: 64rem) 400px, 90vw"
            />
          </div>
        </div>
        <div>
          <h2 id={headingId}>
            <Eyebrow as="span" onDark>
              {block.eyebrow}
            </Eyebrow>
          </h2>
          <blockquote className="mt-7">
            <p className="font-heading text-[1.375rem] leading-[1.35] font-semibold md:text-[1.75rem]">
              {block.quote}
            </p>
          </blockquote>
          {block.body && <p className="mt-7 text-lg leading-[1.6] text-on-band/85">{block.body}</p>}
          {block.attribution && (
            <p className="mt-7 font-heading font-bold text-[#f0b26a]">— {block.attribution}</p>
          )}
          {block.link?.href && block.link.label && (
            <ArrowLink href={block.link.href} onDark className="mt-7">
              {block.link.label}
            </ArrowLink>
          )}
        </div>
      </div>
    </section>
  )
}

const lights = [
  { label: 'Available', colour: 'bg-light-available' },
  { label: 'Conditional', colour: 'bg-light-conditional' },
  { label: 'Constrained', colour: 'bg-light-constrained' },
  { label: 'Very constrained', colour: 'bg-light-very-constrained' },
  { label: 'Recovery', colour: 'bg-light-recovery' },
]
const questionTones: Tone[] = ['purple', 'terracotta', 'teal', 'ochre']

// Four questions and the Capacity Matrix (Figma 36:466, "Our approach"). Traffic
// lights always carry a text label (copy Part B).
export function Approach({ block, index }: { block: ApproachBlock; index: number }) {
  const headingId = `section-${index}`
  return (
    <Section tone="cream" labelledBy={headingId}>
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,42.5rem)_minmax(0,27.5rem)] lg:justify-between">
        <div>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          <h2 id={headingId} className="mt-5 text-h2 font-bold">
            {block.heading}
          </h2>
          <ol className="mt-6 flex flex-col gap-3">
            {(block.questions ?? []).map((q, i) => (
              <li
                key={q.id ?? i}
                className="flex items-center gap-4 rounded-tile bg-surface px-5 py-4 font-heading text-lg leading-[1.25] font-bold"
              >
                <span
                  aria-hidden
                  className={`flex size-8 shrink-0 items-center justify-center rounded-pill text-[0.875rem] text-white ${discBg[questionTones[i % 4]]}`}
                >
                  {i + 1}
                </span>
                {q.text}
              </li>
            ))}
          </ol>
          {block.body && <p className="mt-6 text-body">{block.body}</p>}
        </div>
        <figure className="rounded-card bg-surface p-8">
          <figcaption>
            <p className="font-heading text-(length:--fc-text-eyebrow) font-bold tracking-(--fc-tracking-eyebrow) text-eyebrow uppercase">
              {block.matrix?.label}
            </p>
            <p className="mt-3 font-heading text-xl leading-[1.35] font-bold">
              {block.matrix?.title}
            </p>
          </figcaption>
          <ul className="mt-4 flex flex-col gap-3">
            {lights.map((l) => (
              <li
                key={l.label}
                className="flex items-center gap-3.5 rounded-control bg-surface-muted px-4 py-3 font-heading font-bold"
              >
                <span aria-hidden className={`size-[1.375rem] rounded-pill ${l.colour}`} />
                {l.label}
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </Section>
  )
}

// Founder profile (Figma 37:535, "Founder").
export function Profile({ block, index }: { block: ProfileBlock; index: number }) {
  const headingId = `section-${index}`
  return (
    <Section tone="cream" labelledBy={headingId} className="lg:pt-6">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,27.5rem)_minmax(0,43rem)] lg:justify-between">
        <div className="mx-auto flex w-full max-w-[27.5rem] flex-col gap-4 lg:mx-0">
          <div className="relative pt-5 pr-5">
            <span
              aria-hidden
              className="decorative absolute top-0 right-0 aspect-square w-[73%] rounded-pill bg-orange"
            />
            <div className="relative">
              <Portrait
                media={block.portrait}
                initials={block.portraitInitials}
                sizes="(min-width: 64rem) 420px, 90vw"
              />
            </div>
          </div>
          {block.quote && (
            <p className="rounded-card bg-band p-7 font-heading text-[1.375rem] leading-[1.3] font-bold text-on-band md:text-[1.625rem]">
              “{block.quote}”
            </p>
          )}
        </div>
        <div>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          <h2 id={headingId} className="mt-5 text-h2 font-bold">
            {block.name}
          </h2>
          <p className="mt-6 w-fit rounded-pill bg-disc-terracotta px-3.5 py-2 font-heading text-sm leading-[1.15] font-bold text-white">
            {block.role}
          </p>
          <div className="mt-7 flex flex-col gap-5 text-body leading-[1.7]">
            {paragraphs(block.bio).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {block.shortBio?.text && (
            <div className="mt-8 rounded-card border border-line bg-surface p-7">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-heading text-[0.9375rem] leading-[1.3] font-bold text-tone-ochre">
                  {block.shortBio.label}
                </h3>
                <LazyCopyButton text={block.shortBio.text} label="Copy short bio" />
              </div>
              <p className="mt-4 text-base leading-[1.65]">{block.shortBio.text}</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

function initialsOf(name: string): string {
  if (name.startsWith('[')) return '?'
  const words = name.split(/\s+/).filter(Boolean)
  return `${words[0]?.[0] ?? ''}${words.length > 1 ? words[words.length - 1][0] : ''}`.toUpperCase()
}

// Co-founders and team (Figma 37:535). Names in [brackets] are placeholders from the copy
// and are shown muted until Figcit supplies them.
export function Team({ block, index }: { block: TeamBlock; index: number }) {
  const headingId = `section-${index}`
  const tone = block.background === 'cream' ? 'cream' : 'white'
  return (
    <Section tone={tone} labelledBy={headingId}>
      <h2 id={headingId}>
        <Eyebrow as="span">{block.eyebrow}</Eyebrow>
      </h2>
      <ul className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
        {(block.members ?? []).map((m, i) => {
          const placeholder = m.name.startsWith('[')
          return (
            <li
              key={m.id ?? i}
              className={`flex flex-col rounded-card p-7 ${tone === 'white' ? 'bg-surface-muted' : 'bg-surface'}`}
            >
              <span
                aria-hidden
                className={`flex size-22 items-center justify-center overflow-hidden rounded-pill font-heading text-[1.75rem] font-bold text-white ${discBg[m.tone ?? 'purple']}`}
              >
                {m.photo && typeof m.photo !== 'number' && m.photo.url ? (
                  <span className="relative size-full">
                    <CmsImage media={m.photo} sizes="88px" />
                  </span>
                ) : (
                  initialsOf(m.name)
                )}
              </span>
              <h3
                className={`mt-3.5 font-heading text-2xl leading-[1.15] font-bold ${placeholder ? 'text-ink-muted' : ''}`}
              >
                {m.name}
              </h3>
              <p className="mt-3.5 font-heading text-[1.0625rem] leading-[1.25] font-semibold text-tone-terracotta">
                {m.role}
              </p>
              {m.bio && (
                <p
                  className={`mt-3.5 text-[1.0625rem] leading-[1.5] ${m.bio.startsWith('[') ? 'text-ink-muted' : ''}`}
                >
                  {m.bio}
                </p>
              )}
            </li>
          )
        })}
      </ul>
      {block.note && (
        <p className="mt-12 rounded-[1.25rem] border border-dashed border-line px-6 py-5 text-[1.0625rem] text-ink-muted">
          {block.note.includes(':') ? (
            <>
              <strong className="pr-2 font-heading font-bold text-ink">
                {block.note.slice(0, block.note.indexOf(':') + 1)}
              </strong>
              {block.note.slice(block.note.indexOf(':') + 1).trim()}
            </>
          ) : (
            block.note
          )}
        </p>
      )}
    </Section>
  )
}

// "How we keep people safe" on teal, with links to the policies (Figma 37:535).
export function PolicyLinks({ block, index }: { block: PolicyLinksBlock; index: number }) {
  const headingId = `section-${index}`
  return (
    <section
      aria-labelledby={headingId}
      className="on-dark bg-(--fc-promise) py-section text-[#f5eede]"
    >
      <div className="container-site grid gap-8 lg:grid-cols-[minmax(0,25rem)_minmax(0,40.5rem)] lg:items-center lg:justify-between">
        <div className="flex flex-col gap-6">
          <h2 id={headingId}>
            <Eyebrow as="span" onDark>
              {block.eyebrow}
            </Eyebrow>
          </h2>
          <LineIcon name="shield" size={52} strokeWidth={1.6} />
        </div>
        <div className="flex flex-col gap-7">
          <p className="font-heading text-[1.375rem] leading-[1.35] font-bold md:text-[1.75rem]">
            {block.text}
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {(block.links ?? []).map((l, i) => (
              <li key={l.id ?? i}>
                <a
                  href={l.href}
                  className="flex items-center gap-2 rounded-pill bg-[#f5eede] px-[1.125rem] py-2.5 font-heading text-[0.9375rem] leading-[1.15] font-bold text-(--fc-promise) transition-calm transition-opacity hover:opacity-90"
                >
                  <LineIcon name="file" size={16} />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
