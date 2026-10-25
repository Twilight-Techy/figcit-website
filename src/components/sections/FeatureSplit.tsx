import { ArrowLink, ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section, cardOn } from '@/components/ui/Section'
import type { FeatureSplitBlock } from '@/payload-types'

// Text with figures beside a photo (Figma 31:341, "Shaped by lived experience").
export function FeatureSplit({ block, index }: { block: FeatureSplitBlock; index: number }) {
  const tone = block.background === 'white' ? 'white' : 'cream'
  const headingId = `section-${index}`
  const left = block.imageSide === 'left'
  const accent = block.accent === 'teal' ? 'bg-disc-teal' : 'bg-orange'
  return (
    <Section tone={tone} labelledBy={headingId}>
      <div
        className={`grid items-center gap-10 lg:justify-between ${
          left
            ? 'lg:grid-cols-[minmax(0,36.25rem)_minmax(0,33.75rem)]'
            : 'lg:grid-cols-[minmax(0,35rem)_minmax(0,35rem)]'
        }`}
      >
        <div className={`flex flex-col ${left ? 'lg:order-2' : ''}`}>
          {block.intro.eyebrow && <Eyebrow>{block.intro.eyebrow}</Eyebrow>}
          <h2 id={headingId} className="mt-5 text-h2 font-bold">
            {block.intro.heading}
          </h2>
          {block.intro.lead && <p className="mt-7 text-body leading-[1.67]">{block.intro.lead}</p>}
          {block.figures && block.figures.length > 0 && (
            <ul className="mt-7 grid grid-cols-3 gap-2.5 sm:gap-4">
              {block.figures.map((f) => (
                <li
                  key={f.id ?? f.value}
                  className={`rounded-tile px-3 py-4 sm:p-5 ${cardOn[tone]}`}
                >
                  <p className="font-heading text-xl leading-[1.15] font-bold tracking-[-0.01em] whitespace-nowrap text-accent sm:text-[2rem]">
                    {f.value}
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-[1.4] sm:text-sm">{f.label}</p>
                </li>
              ))}
            </ul>
          )}
          {block.link?.href &&
            block.link.label &&
            (block.linkStyle === 'button' ? (
              <ButtonLink href={block.link.href} arrow className="mt-7 self-start">
                {block.link.label}
              </ButtonLink>
            ) : (
              <ArrowLink href={block.link.href} className="mt-7 self-start">
                {block.link.label}
              </ArrowLink>
            ))}
        </div>
        {/* Photo on the right: a quarter circle behind the bottom corner (Figma 31:362).
            On the left: a circle behind the top corner (Figma 33:304, "Photo"). */}
        <div className={`relative ${left ? 'pt-5 lg:order-1' : 'pr-5 pb-5'}`}>
          <span
            aria-hidden
            className={`decorative absolute aspect-square ${accent} ${
              left
                ? 'top-0 right-[-1.25rem] w-[38%] rounded-pill'
                : 'right-0 bottom-0 w-[32%] rounded-tl-full'
            }`}
          />
          <div
            className={`relative overflow-hidden bg-surface-muted ${
              left ? 'aspect-[4/3] rounded-card' : 'aspect-[540/500] rounded-[2rem]'
            }`}
          >
            <CmsImage media={block.image} sizes="(min-width: 64rem) 560px, 90vw" />
          </div>
        </div>
      </div>
    </Section>
  )
}
