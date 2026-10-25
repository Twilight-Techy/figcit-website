import { Section, cardOn } from '@/components/ui/Section'
import { SectionIntro } from '@/components/ui/SectionIntro'
import { toneInk } from '@/components/layout/tones'
import type { Tone } from '@/content/navigation'
import type { StatsBlock } from '@/payload-types'

const barBg: Record<Tone, string> = {
  purple: 'bg-primary',
  terracotta: 'bg-accent',
  teal: 'bg-disc-teal',
  ochre: 'bg-disc-ochre',
  green: 'bg-disc-green',
  blue: 'bg-disc-blue',
}

// "Why now" figures with their sources (Figma 31:317, mobile 41:1063).
export function Stats({ block, index }: { block: StatsBlock; index: number }) {
  const tone = block.background === 'cream' ? 'cream' : 'white'
  const headingId = `section-${index}`
  return (
    <Section tone={tone} labelledBy={headingId}>
      <SectionIntro {...(block.intro ?? {})} headingId={headingId} />
      <ul className="mt-3.5 grid gap-3.5 md:mt-14 md:grid-cols-3 md:gap-6">
        {(block.stats ?? []).map((stat) => {
          const t = stat.tone ?? 'purple'
          return (
            <li
              key={stat.id ?? stat.value}
              className={`flex flex-col rounded-card p-5 md:min-h-[20.25rem] md:p-8 ${cardOn[tone]}`}
            >
              <span
                aria-hidden
                className={`decorative mb-5 hidden h-[5px] w-12 rounded-pill md:block ${barBg[t]}`}
              />
              <p
                className={`font-heading text-[1.875rem] leading-[1.12] font-extrabold tracking-[-0.02em] md:text-5xl md:leading-[1.05] ${toneInk[t]}`}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-base leading-[1.6] md:mt-5 md:text-lg">{stat.label}</p>
              {stat.source && (
                <p className="mt-2 text-[0.8125rem] leading-[1.6] text-ink-muted md:mt-5 md:text-sm">
                  {stat.source}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
