import { LineIcon } from '@/components/icons/line'
import { JsonLd } from '@/components/layout/JsonLd'
import { ButtonLink } from '@/components/ui/ButtonLink'
import type { FaqBlock } from '@/payload-types'

// Questions accordion (Figma 38:826). Native <details>, so it works without JavaScript
// and every answer is in the page for search. Answers start open, as in the design.
// FAQPage structured data helps search engines show the answers (rules §9).
export function Faq({ block }: { block: FaqBlock }) {
  const items = block.items ?? []
  return (
    <section aria-label="Questions and answers" className="bg-bg pb-section">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((i) => ({
            '@type': 'Question',
            name: i.question,
            acceptedAnswer: { '@type': 'Answer', text: i.answer },
          })),
        }}
      />
      <div className="container-site flex flex-col gap-4">
        {items.map((item, i) => (
          <details
            key={item.id ?? i}
            open
            className="group rounded-[1.25rem] border-[1.5px] border-transparent bg-surface transition-calm transition-colors has-[summary:focus-visible]:border-primary hover:border-line"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-[1.25rem] px-6 pt-7 pb-7 group-open:pb-3 focus-visible:outline-none md:px-8 [&::-webkit-details-marker]:hidden">
              <h2 className="font-heading text-xl leading-[1.25] font-bold md:text-[1.375rem]">
                {item.question}
              </h2>
              <span
                aria-hidden
                className="flex size-[2.125rem] shrink-0 items-center justify-center rounded-pill bg-surface-muted text-ink transition-calm transition-colors group-has-[summary:focus-visible]:bg-primary group-has-[summary:focus-visible]:text-on-primary"
              >
                <LineIcon
                  name="minus"
                  size={16}
                  strokeWidth={2.25}
                  className="hidden group-open:block"
                />
                <LineIcon name="plus" size={16} strokeWidth={2.25} className="group-open:hidden" />
              </span>
            </summary>
            <p className="px-6 pb-7 text-[1.0625rem] leading-[1.7] md:px-8">{item.answer}</p>
          </details>
        ))}
        {block.closing?.text && (
          <div className="mt-2 flex flex-col items-start gap-5 rounded-card bg-band px-8 py-7 text-on-band md:flex-row md:items-center md:justify-between">
            <p className="font-heading text-xl leading-[1.3] font-bold">{block.closing.text}</p>
            {block.closing.href && block.closing.label && (
              <ButtonLink href={block.closing.href} variant="cream" arrow className="shrink-0">
                {block.closing.label}
              </ButtonLink>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
