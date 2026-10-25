import { ArrowLink, ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section, cardOn } from '@/components/ui/Section'
import type { FeatureSplitBlock } from '@/payload-types'

// Text beside a photo: "Shaped by lived experience" (Figma 31:341), "Starting with
// health and social care" (33:304) and "Who we are" (36:466).
export function FeatureSplit({ block, index }: { block: FeatureSplitBlock; index: number }) {
  const tone = block.background === 'white' ? 'white' : 'cream'
  const headingId = `section-${index}`
  const left = block.imageSide === 'left'
  const arch = block.imageShape === 'arch'
  const accent = block.accent === 'teal' ? 'bg-disc-teal' : 'bg-orange'
  const intro = block.intro ?? {}
  const paragraphs = (block.body ?? '').split(/\n\s*\n/).filter(Boolean)

  return (
    <Section tone={tone} labelledBy={headingId}>
      <div
        className={`grid items-center gap-10 lg:justify-between ${
          left
            ? 'lg:grid-cols-[minmax(0,36.25rem)_minmax(0,33.75rem)]'
            : arch
              ? 'lg:grid-cols-[minmax(0,38.75rem)_minmax(0,31.25rem)]'
              : 'lg:grid-cols-[minmax(0,35rem)_minmax(0,35rem)]'
        }`}
      >
        <div className={`flex flex-col ${left ? 'lg:order-2' : ''}`}>
          {intro.eyebrow && <Eyebrow>{intro.eyebrow}</Eyebrow>}
          <h2
            id={headingId}
            className={
              block.headingStyle === 'statement'
                ? 'mt-5 font-heading text-[1.375rem] leading-[1.4] font-bold md:text-[1.75rem]'
                : 'mt-5 text-h2 font-bold'
            }
          >
            {intro.heading}
          </h2>
          {intro.lead && <p className="mt-7 text-body leading-[1.67]">{intro.lead}</p>}
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={`${i === 0 && !intro.lead ? 'mt-7' : 'mt-5'} text-body leading-[1.67]`}
            >
              {p}
            </p>
          ))}
          {block.figures && block.figures.length > 0 && (
            // Three across where they fit, two on the narrowest phones; figures scale with
            // their card so "4.25–4.55" never spills (responsive sweep).
            <ul className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(5.5rem,1fr))] gap-2.5 sm:gap-4">
              {block.figures.map((f) => (
                <li
                  key={f.id ?? f.value}
                  className={`@container rounded-tile px-3 py-4 sm:p-5 ${cardOn[tone]}`}
                >
                  <p className="font-heading text-[clamp(1rem,21cqi,2rem)] leading-[1.15] font-bold tracking-[-0.01em] whitespace-nowrap text-accent">
                    {f.value}
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-[1.4] [overflow-wrap:anywhere] sm:text-sm">
                    {f.label}
                  </p>
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
        {/* Photo on the right: a shape behind the bottom corner (Figma 31:362, 36:466).
            On the left: a circle behind the top corner (Figma 33:304, "Photo"). */}
        <div className={`relative ${left ? 'pt-5 lg:order-1' : 'pr-5 pb-5'}`}>
          <span
            aria-hidden
            className={`decorative absolute aspect-square ${accent} ${
              left
                ? 'top-0 right-[-1.25rem] w-[38%] rounded-pill'
                : arch
                  ? 'right-0 bottom-0 w-[40%] rounded-pill'
                  : 'right-0 bottom-0 w-[32%] rounded-tl-full'
            }`}
          />
          <div
            className={`relative overflow-hidden bg-surface-muted ${
              left
                ? 'aspect-[4/3] rounded-card'
                : arch
                  ? 'aspect-[480/540] rounded-t-full rounded-b-card'
                  : 'aspect-[540/500] rounded-[2rem]'
            }`}
          >
            <CmsImage media={block.image} sizes="(min-width: 64rem) 560px, 90vw" />
          </div>
        </div>
      </div>
    </Section>
  )
}
