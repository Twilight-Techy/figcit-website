import Link from 'next/link'

import { LeafIcon } from '@/components/icons'
import { NavIcon } from '@/components/icons/NavIcon'
import { discBg } from '@/components/layout/tones'
import { ContactCard } from '@/components/sections/ContactCard'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Highlight } from '@/components/ui/Highlight'
import type { HeroBlock } from '@/payload-types'

// Page hero (Figma 31:85, mobile 41:951). The headline is the page's only <h1>. On
// phones the art comes first, as in the mobile frame.
export function Hero({ block }: { block: HeroBlock }) {
  const art = block.art ?? 'none'
  if (art === 'centred') return <CentredHero block={block} />
  return (
    <section className="relative overflow-hidden bg-bg">
      <div
        className={`container-site grid items-center gap-5 pt-6 pb-14 lg:gap-15 lg:pt-12 lg:pb-28 ${
          art === 'none'
            ? 'pb-10 lg:pt-20 lg:pb-14'
            : 'lg:grid-cols-[minmax(0,38.75rem)_minmax(0,31.75rem)] lg:justify-between'
        }`}
      >
        <div
          className={`order-2 flex flex-col gap-5 lg:order-1 lg:gap-7 ${
            art === 'none' ? 'max-w-[56.25rem]' : ''
          }`}
        >
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {/* 72px on the home page, 96px on Contact, 64px elsewhere (Figma 31:87, 38:604,
              33:152, 38:826). */}
          <h1
            className={`font-heading text-display font-extrabold text-primary ${
              art === 'contact'
                ? 'lg:text-[6rem] lg:leading-none'
                : art === 'checkIn'
                  ? ''
                  : 'lg:text-[4rem]'
            }`}
          >
            <Highlight text={block.headline} highlight={block.highlight} />
          </h1>
          {block.lead && <p className="text-lead">{block.lead}</p>}
          {block.subline && (
            <p className="-mt-2 text-[1.0625rem] text-ink-muted lg:-mt-4">{block.subline}</p>
          )}
          <Actions block={block} />
          <Figures block={block} />
        </div>

        {(art === 'photo' || art === 'checkIn') && <PhotoArt block={block} />}
        {art === 'tiles' && <Tiles tiles={block.tiles ?? []} />}
        {art === 'contact' && <ContactCard />}
      </div>
    </section>
  )
}

function Actions({ block }: { block: HeroBlock }) {
  if (!block.actions || block.actions.length === 0) return null
  return (
    <div className="flex flex-col gap-5 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
      {block.actions.map((a) => (
        <ButtonLink
          key={a.id ?? a.href}
          href={a.href}
          variant={a.variant === 'outline' ? 'outline' : 'primary'}
          arrow={Boolean(a.arrow)}
        >
          {a.label}
        </ButtonLink>
      ))}
    </div>
  )
}

function Figures({ block }: { block: HeroBlock }) {
  if (!block.figures || block.figures.length === 0) return null
  return (
    <div className="flex flex-col gap-3">
      <ul className="grid max-w-[32rem] grid-cols-2 gap-3 pt-1">
        {block.figures.map((f) => (
          <li key={f.id ?? f.value} className="rounded-tile bg-surface p-5">
            <p className="font-heading text-[2rem] leading-[1.2] font-bold text-accent">
              {f.value}
            </p>
            <p className="mt-1 text-sm leading-[1.45]">{f.label}</p>
          </li>
        ))}
      </ul>
      {block.figuresSource && <p className="text-sm text-ink-muted">{block.figuresSource}</p>}
    </div>
  )
}

// About hero (Figma 36:466): centred motto between soft circles.
function CentredHero({ block }: { block: HeroBlock }) {
  return (
    <section className="relative overflow-hidden bg-bg">
      <span
        aria-hidden
        className="decorative absolute top-[9.4rem] -left-45 size-75 rounded-pill bg-orange"
      />
      <span
        aria-hidden
        className="decorative absolute top-80 -left-15 size-45 rounded-pill bg-accent/90"
      />
      <span
        aria-hidden
        className="decorative absolute -top-[5.6rem] -right-17 size-60 rounded-pill bg-primary"
      />
      <span
        aria-hidden
        className="decorative absolute top-[11.9rem] right-5 size-30 rounded-pill bg-disc-teal"
      />
      <div className="container-site relative flex flex-col items-center gap-8 py-20 text-center lg:gap-12 lg:pt-26 lg:pb-28">
        {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
        <h1 className="max-w-[62.5rem] font-heading text-display font-extrabold text-primary lg:text-[5rem] lg:leading-[1.075]">
          <Highlight text={block.headline} highlight={block.highlight} />
        </h1>
        {block.lead && <p className="max-w-[40rem] text-lead">{block.lead}</p>}
      </div>
    </section>
  )
}

const accents = {
  orange: 'bg-orange',
  teal: 'bg-disc-teal',
  terracotta: 'bg-accent',
} as const

// Arched photo with a coloured circle and a purple disc. The home hero (Figma 31:96)
// adds the leaf and the check-in card; audience pages (33:152 and others) use a
// slightly narrower arch.
function PhotoArt({ block }: { block: HeroBlock }) {
  const home = block.art === 'checkIn'
  return (
    <div
      className={`relative order-1 mx-auto aspect-[350/300] w-full max-w-[31.75rem] lg:order-2 ${
        home ? 'lg:aspect-[508/600]' : 'lg:aspect-[480/540] lg:max-w-[30rem]'
      }`}
    >
      <div
        className={`absolute top-0 right-0 h-full w-[85.7%] overflow-hidden rounded-t-full rounded-b-card bg-surface-muted ${
          home
            ? 'lg:top-[1.67%] lg:h-[96.7%] lg:w-[84.6%]'
            : 'lg:top-[3.7%] lg:h-[96.3%] lg:w-[87.5%]'
        }`}
      >
        <CmsImage media={block.image} sizes="(min-width: 64rem) 430px, 78vw" priority />
      </div>
      <span
        aria-hidden
        className={`decorative absolute top-[70%] left-0 aspect-square w-[25.7%] rounded-pill ${
          accents[block.accent ?? 'orange']
        } ${home ? 'lg:top-[76.7%] lg:w-[27.6%]' : 'lg:top-[72.2%] lg:w-[27.1%]'}`}
      />
      <span
        aria-hidden
        className={`decorative absolute hidden aspect-square items-center justify-center rounded-pill bg-primary text-on-primary lg:flex ${
          home ? 'top-[6%] left-[84.6%] w-[17.3%]' : 'top-0 left-[85.4%] w-[16.7%]'
        }`}
      >
        {home && <LeafIcon size={34} />}
      </span>
      {home && (
        <div className="absolute top-[20%] left-0 hidden w-[13.6875rem] rounded-[1.25rem] bg-surface px-5 pt-[1.125rem] pb-[1.125rem] shadow-float lg:block">
          <p className="font-heading text-[0.8125rem] leading-[1.15] font-bold tracking-[0.1em] text-ink-muted uppercase">
            {block.checkIn?.label}
          </p>
          <p className="mt-2.5 flex items-center gap-2 font-heading text-[1.0625rem] leading-5 font-bold">
            <span aria-hidden className="size-3.5 rounded-pill bg-light-conditional" />
            {block.checkIn?.status}
          </p>
          <p className="mt-2.5 text-[0.875rem] leading-6">{block.checkIn?.hint}</p>
        </div>
      )}
    </div>
  )
}

// Four coloured service tiles (Our Services hero, Figma 32:121).
function Tiles({ tiles }: { tiles: NonNullable<HeroBlock['tiles']> }) {
  return (
    <ul className="order-1 grid grid-cols-2 gap-3 lg:order-2 lg:gap-6">
      {tiles.map((tile, i) => {
        const inner = (
          <>
            <NavIcon name={tile.icon} size={32} />
            <span className="font-heading text-lg leading-[1.2] font-bold lg:text-xl">
              {tile.label}
            </span>
          </>
        )
        const cls = `flex aspect-square flex-col justify-between rounded-card p-5 lg:p-6 ${
          tile.tone === 'ochre'
            ? 'bg-orange text-[#2a1e2e]'
            : `${discBg[tile.tone ?? 'purple']} text-white`
        } ${i === 0 ? 'rounded-tl-[6rem]' : ''}`
        return (
          <li key={tile.id ?? tile.label}>
            {tile.href ? (
              <Link
                prefetch={false}
                href={tile.href}
                className={`${cls} transition-calm transition-opacity hover:opacity-90`}
              >
                {inner}
              </Link>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
