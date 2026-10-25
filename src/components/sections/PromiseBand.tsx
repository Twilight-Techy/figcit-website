import { ButtonLink } from '@/components/ui/ButtonLink'
import { Eyebrow } from '@/components/ui/Eyebrow'
import type { PromiseBlock } from '@/payload-types'

// "No diagnosis. No waiting. No guilt." on Rind Teal (Figma 33:152, "Our promise").
export function PromiseBand({ block, index }: { block: PromiseBlock; index: number }) {
  const headingId = `section-${index}`
  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-(--fc-promise) py-section text-[#f5eede]"
    >
      <span
        aria-hidden
        className="decorative absolute -top-40 right-[-8.75rem] size-90 rounded-pill bg-white/12"
      />
      <span
        aria-hidden
        className="decorative absolute right-[-1.25rem] -bottom-20 size-50 rounded-pill bg-orange"
      />
      <div className="container-site relative grid gap-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,35rem)] lg:items-center lg:justify-between">
        <div className="flex flex-col gap-6">
          {block.eyebrow && <Eyebrow onDark>{block.eyebrow}</Eyebrow>}
          <h2
            id={headingId}
            className="font-heading text-[2.5rem] leading-[1.05] font-extrabold tracking-[-0.03em] md:text-[3.5rem]"
          >
            {block.headline.split('\n').map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          {block.body && <p className="text-lead">{block.body}</p>}
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-3.5">
            {(block.actions ?? []).map((a) => (
              <ButtonLink
                key={a.id ?? a.href}
                href={a.href}
                variant={a.variant === 'outline' ? 'outlineLight' : 'creamOnTeal'}
                arrow={Boolean(a.arrow)}
              >
                {a.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
