import { HeartIcon } from '@/components/icons'
import type { NoteBandBlock } from '@/payload-types'

// Inline reminder such as the crisis line note on For you (Figma 33:152, "Crisis notice").
export function NoteBand({ block }: { block: NoteBandBlock }) {
  return (
    <section className={`py-14 ${block.background === 'cream' ? 'bg-bg' : 'bg-surface'}`}>
      <div className="container-site">
        <p className="flex items-start gap-5 rounded-card border-[1.5px] border-accent/45 bg-surface px-6 py-6 text-[1.0625rem] leading-[1.55] md:px-9">
          <HeartIcon size={26} className="mt-0.5 shrink-0 text-accent" />
          <span>{block.text}</span>
        </p>
      </div>
    </section>
  )
}
