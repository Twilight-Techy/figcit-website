import { HeartIcon } from '@/components/icons'
import { Rich, paragraphs } from '@/components/ui/Rich'
import type { NoteBandBlock } from '@/payload-types'

// Short notes between sections: the crisis line reminder on For you (Figma 33:152) and
// the quiet "Looking ahead" aside on About (36:466), which the copy asks to keep small
// and visually separate.
export function NoteBand({ block }: { block: NoteBandBlock }) {
  const bg = block.background === 'cream' ? 'bg-bg' : 'bg-surface'
  if (block.style === 'dashed') {
    return (
      <aside aria-label={block.label ?? undefined} className={`pb-section ${bg}`}>
        <div className="container-site">
          <div className="rounded-[1.25rem] border border-dashed border-line px-6 py-7 text-[0.9375rem] leading-[1.7] text-ink-muted md:px-8">
            {block.label && (
              <p className="mb-3 font-heading text-[0.8125rem] leading-[1.15] font-bold tracking-[0.1em] uppercase">
                {block.label}
              </p>
            )}
            <div className="flex flex-col gap-2.5">
              {paragraphs(block.text).map((p, i) => (
                <p key={i}>
                  <Rich text={p} />
                </p>
              ))}
            </div>
          </div>
        </div>
      </aside>
    )
  }
  return (
    <section className={`py-14 ${bg}`}>
      <div className="container-site">
        <p className="flex items-start gap-5 rounded-card border-[1.5px] border-accent/45 bg-surface px-6 py-6 text-[1.0625rem] leading-[1.55] md:px-9">
          <HeartIcon size={26} className="mt-0.5 shrink-0 text-accent" />
          <span>{block.text}</span>
        </p>
      </div>
    </section>
  )
}
