import Link from 'next/link'

import { LeafIcon } from '@/components/icons'
import { NavIcon } from '@/components/icons/NavIcon'
import { discBg } from '@/components/layout/tones'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Highlight } from '@/components/ui/Highlight'
import type { HeroBlock } from '@/payload-types'

// Page hero (Figma 31:85, mobile 41:951). The headline is the page's only <h1>. On
// phones the art comes first, as in the mobile frame.
export function Hero({ block }: { block: HeroBlock }) {
  const art = block.art ?? 'none'
  return (
    <section className="relative overflow-hidden bg-bg">
      <div
        className={`container-site grid items-center gap-5 pt-6 pb-14 lg:gap-15 lg:pt-12 lg:pb-28 ${
          art === 'none'
            ? ''
            : 'lg:grid-cols-[minmax(0,38.75rem)_minmax(0,31.75rem)] lg:justify-between'
        }`}
      >
        <div className="order-2 flex flex-col gap-5 lg:order-1 lg:gap-7">
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          <h1 className="font-heading text-display font-extrabold text-primary">
            <Highlight text={block.headline} highlight={block.highlight} />
          </h1>
          {block.lead && <p className="text-lead">{block.lead}</p>}
          {block.actions && block.actions.length > 0 && (
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
          )}
        </div>

        {(art === 'photo' || art === 'checkIn') && <PhotoArt block={block} />}
        {art === 'tiles' && <Tiles tiles={block.tiles ?? []} />}
      </div>
    </section>
  )
}

// Arched photo with the orange circle, plus the leaf disc and check-in card on desktop.
function PhotoArt({ block }: { block: HeroBlock }) {
  return (
    <div className="relative order-1 mx-auto aspect-[350/300] w-full max-w-[31.75rem] lg:order-2 lg:aspect-[508/600]">
      <div className="absolute top-0 right-0 h-full w-[85.7%] overflow-hidden rounded-t-full rounded-b-card bg-surface-muted lg:top-[1.67%] lg:h-[96.7%] lg:w-[84.6%]">
        <CmsImage media={block.image} sizes="(min-width: 64rem) 430px, 90vw" priority />
      </div>
      <span
        aria-hidden
        className="decorative absolute top-[70%] left-0 aspect-square w-[25.7%] rounded-pill bg-orange lg:top-[76.7%] lg:w-[27.6%]"
      />
      {block.art === 'checkIn' && (
        <>
          <span
            aria-hidden
            className="decorative absolute top-[6%] left-[84.6%] hidden aspect-square w-[17.3%] items-center justify-center rounded-pill bg-primary text-on-primary lg:flex"
          >
            <LeafIcon size={34} />
          </span>
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
        </>
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
            ? 'bg-orange text-ink'
            : `${discBg[tile.tone ?? 'purple']} text-[#f5eede]`
        } ${i === 0 ? 'rounded-tl-[6rem]' : ''}`
        return (
          <li key={tile.id ?? tile.label}>
            {tile.href ? (
              <Link
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
