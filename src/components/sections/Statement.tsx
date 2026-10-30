import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import type { StatementBlock } from '@/payload-types'

// Label on the left, a longer statement on the right with an orange rule (Figma 35:475,
// "About FigCit").
export function Statement({ block, index }: { block: StatementBlock; index: number }) {
  const headingId = `section-${index}`
  return (
    <Section tone={block.background === 'cream' ? 'cream' : 'white'} labelledBy={headingId}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,51.25rem)] lg:justify-between">
        <h2 id={headingId}>
          <Eyebrow as="span" className="lg:mt-1.5">
            {block.eyebrow}
          </Eyebrow>
        </h2>
        <p className="max-w-[49rem] border-l-[3px] border-orange pl-6 font-heading text-[1.25rem] leading-[1.6] font-semibold text-primary md:pl-9 md:text-[1.375rem] md:leading-[1.64]">
          {block.text}
        </p>
      </div>
    </Section>
  )
}
