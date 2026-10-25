import { Eyebrow } from '@/components/ui/Eyebrow'
import { Highlight } from '@/components/ui/Highlight'
import { Section } from '@/components/ui/Section'
import type { Tone } from '@/content/navigation'
import type { ValuesBlock } from '@/payload-types'

const pill: Record<Tone, { border: string; dot: string }> = {
  purple: { border: 'border-disc-purple/45', dot: 'bg-disc-purple' },
  terracotta: { border: 'border-disc-terracotta/45', dot: 'bg-disc-terracotta' },
  teal: { border: 'border-disc-teal/45', dot: 'bg-disc-teal' },
  ochre: { border: 'border-disc-ochre/45', dot: 'bg-disc-ochre' },
}

// "What we believe" (Figma 31:365): centred motto and value pills, with soft circles.
export function Values({ block, index }: { block: ValuesBlock; index: number }) {
  const headingId = `section-${index}`
  return (
    <Section tone="white" labelledBy={headingId}>
      <span
        aria-hidden
        className="decorative absolute top-[-2rem] left-[-11.25rem] size-80 rounded-pill bg-orange/15"
      />
      <span
        aria-hidden
        className="decorative absolute right-[-11.25rem] bottom-[-1rem] size-56 rounded-pill bg-primary/10"
      />
      <div className="relative flex flex-col items-center text-center">
        {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
        <h2
          id={headingId}
          className="mt-8 font-heading text-display font-extrabold text-primary md:mt-12"
        >
          <Highlight text={block.headline} highlight={block.highlight} />
        </h2>
        <ul className="mt-10 flex max-w-[62.5rem] flex-wrap justify-center gap-3">
          {(block.values ?? []).map((v) => {
            const p = pill[v.tone ?? 'purple']
            return (
              <li
                key={v.id ?? v.label}
                className={`flex items-center gap-3 rounded-pill border-[1.5px] px-[1.375rem] py-3.5 font-heading text-[1.0625rem] leading-5 font-bold ${p.border}`}
              >
                <span aria-hidden className={`size-2 rounded-pill ${p.dot}`} />
                {v.label}
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
