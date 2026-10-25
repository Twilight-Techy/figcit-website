// Full-width section band. Backgrounds alternate in the design between Pith Cream
// ("cream"), white ("white") and Fig Purple ("purple").
export type SectionTone = 'cream' | 'white' | 'purple'

const tones: Record<SectionTone, string> = {
  cream: 'bg-bg',
  white: 'bg-surface',
  purple: 'bg-band text-on-band',
}

// Card colour that contrasts with each section background.
export const cardOn: Record<SectionTone, string> = {
  cream: 'bg-surface',
  white: 'bg-surface-muted',
  purple: 'bg-bg text-ink',
}

export function Section({
  tone = 'white',
  id,
  labelledBy,
  className = '',
  children,
}: {
  tone?: SectionTone
  id?: string
  labelledBy?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative overflow-hidden py-section ${tones[tone]} ${className}`}
    >
      <div className="container-site relative">{children}</div>
    </section>
  )
}
