import { CmsImage } from '@/components/ui/CmsImage'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import type { StoryTimelineBlock } from '@/payload-types'

const dots = {
  yellow: 'bg-light-conditional',
  orange: 'bg-orange',
  green: 'bg-light-available',
  purple: 'bg-disc-purple',
} as const

// "A day with FigCit" (Figma 31:277): arched photo on the left, moments on a timeline.
export function StoryTimeline({ block, index }: { block: StoryTimelineBlock; index: number }) {
  const headingId = `section-${index}`
  return (
    <Section tone="cream" labelledBy={headingId}>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,30rem)_minmax(0,40rem)] lg:justify-between">
        <div className="relative mx-auto w-full max-w-[30rem] pt-5 lg:mx-0">
          <span
            aria-hidden
            className="decorative absolute -top-0 right-0 aspect-square w-[79%] rounded-pill bg-accent"
          />
          <div className="relative aspect-[440/600] w-[91.7%] overflow-hidden rounded-t-full rounded-b-card bg-surface-muted">
            <CmsImage media={block.image} sizes="(min-width: 64rem) 440px, 90vw" />
            {block.imageBadge && (
              <p className="absolute bottom-[1.625rem] left-5 rounded-pill bg-[#2a1e2e] px-3 py-1.5 font-heading text-[0.8125rem] leading-[1.15] font-bold text-[#f5eede]">
                {block.imageBadge}
              </p>
            )}
          </div>
        </div>

        <div>
          {block.intro?.eyebrow && <Eyebrow>{block.intro?.eyebrow}</Eyebrow>}
          <h2 id={headingId} className="mt-6 text-h2 font-bold md:mt-8">
            {block.intro?.heading}
          </h2>
          <ol className="mt-8 flex flex-col gap-7">
            {(block.moments ?? []).map((m) => (
              <li key={m.id ?? m.time} className="grid grid-cols-[1.25rem_1fr] gap-x-6">
                <span className="flex flex-col items-center" aria-hidden>
                  <span className={`size-5 shrink-0 rounded-pill ${dots[m.dot ?? 'purple']}`} />
                  <span className="w-0.5 flex-1 bg-line" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-[1.375rem] leading-[1.15] font-bold text-primary">
                    {m.time}
                  </h3>
                  <p className="text-body">{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
