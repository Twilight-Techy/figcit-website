import { ButtonLink } from '@/components/ui/ButtonLink'
import type { CtaBandBlock } from '@/payload-types'

// Closing call to action: purple card with circles (Figma 31:390, mobile full width).
// It follows a padded section, so it adds space below only. Below 1280px the circles
// shrink into the corners so they never sit behind the text.
export function CtaBand({ block, index }: { block: CtaBandBlock; index: number }) {
  const headingId = `section-${index}`
  return (
    <section
      aria-labelledby={headingId}
      className={`md:pb-section ${block.background === 'cream' ? 'bg-bg' : 'bg-surface'}`}
    >
      <div className="container-site max-md:px-0">
        <div className="on-dark relative overflow-hidden bg-band px-5 py-14 text-on-band md:rounded-[2rem] md:px-18 md:py-18">
          <span
            aria-hidden
            className="decorative absolute -top-20 -right-20 hidden size-48 rounded-pill bg-orange md:block xl:-top-[7.5rem] xl:-right-10 xl:size-[22rem]"
          />
          <span
            aria-hidden
            className="decorative absolute -right-16 -bottom-20 hidden size-40 rounded-pill bg-accent/90 md:block xl:-right-12 xl:-bottom-[7.5rem] xl:size-[17.5rem]"
          />
          <span
            aria-hidden
            className="decorative absolute right-[17.5rem] bottom-2.5 hidden size-30 rounded-pill bg-on-band/20 xl:block"
          />
          <div className="relative flex max-w-[40rem] flex-col gap-5 md:gap-8">
            <h2
              id={headingId}
              className={`font-heading text-[1.875rem] leading-[1.12] font-extrabold tracking-[-0.02em] ${
                block.body ? 'md:text-[2.5rem]' : 'md:text-h2'
              }`}
            >
              {block.heading}
            </h2>
            {block.body && (
              <p className="-mt-1 max-w-[43.75rem] text-lead md:-mt-3">{block.body}</p>
            )}
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-3.5">
              {(block.actions ?? []).map((a) => (
                <ButtonLink
                  key={a.id ?? a.href}
                  href={a.href}
                  variant={a.variant === 'outline' ? 'outlineLight' : 'cream'}
                  arrow={Boolean(a.arrow)}
                >
                  {a.label}
                </ButtonLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
