import { Eyebrow } from '@/components/ui/Eyebrow'

// Eyebrow, heading and optional lead that open most sections. "split" puts the lead in
// a right-hand column aligned to the bottom of the heading (Figma 31:110, 31:318).
export type IntroLayout = 'stacked' | 'split' | 'centred'

export type IntroProps = {
  eyebrow?: string | null
  heading?: string | null
  lead?: string | null
  layout?: IntroLayout | null
  onDark?: boolean
  headingId?: string
}

export function SectionIntro({
  eyebrow,
  heading,
  lead,
  layout = 'stacked',
  onDark = false,
  headingId,
}: IntroProps) {
  const centred = layout === 'centred'
  return (
    <div
      className={
        layout === 'split'
          ? 'grid gap-6 lg:grid-cols-[minmax(0,43.75rem)_minmax(0,27.5rem)] lg:items-end lg:justify-between lg:gap-15'
          : `flex flex-col gap-6 ${centred ? 'items-center text-center' : ''}`
      }
    >
      <div
        className={`flex max-w-[43.75rem] flex-col gap-4 md:gap-5 ${centred ? 'items-center' : ''}`}
      >
        {heading ? (
          <>
            {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
            <h2
              id={headingId}
              className={`text-h2 font-bold ${onDark ? 'text-on-band' : 'text-ink'}`}
            >
              {heading}
            </h2>
          </>
        ) : (
          // Some sections only have a label (Figma 36:466, "What we believe").
          <h2 id={headingId}>
            <Eyebrow as="span" onDark={onDark}>
              {eyebrow}
            </Eyebrow>
          </h2>
        )}
      </div>
      {lead && (
        <p
          className={`max-w-[38.75rem] text-lead ${onDark ? 'text-on-band/90' : 'text-ink'} ${
            layout === 'split' ? 'lg:max-w-none' : ''
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
