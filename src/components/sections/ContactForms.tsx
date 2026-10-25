import { LazyFormTabs } from '@/components/lazy'
import type { ContactFormsBlock } from '@/payload-types'
import type { FormType } from '@/lib/forms/options'

// Tabbed forms with the adjustment note beside them (Figma 38:604).
export function ContactForms({ block }: { block: ContactFormsBlock }) {
  return (
    <section aria-label="Contact forms" className="bg-surface pb-section">
      <div className="container-site grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,49.5rem)_minmax(0,22.5rem)] xl:justify-between">
        <LazyFormTabs initial={(block.defaultForm ?? 'book-conversation') as FormType} />
        {block.asideText && (
          <aside
            aria-labelledby="adjustment-title"
            className="rounded-card bg-(--fc-promise) p-7 text-[#f5eede] xl:sticky xl:top-6"
          >
            <h2
              id="adjustment-title"
              className="font-heading text-[1.375rem] leading-[1.2] font-bold"
            >
              {block.asideTitle}
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-[1.6]">{block.asideText}</p>
          </aside>
        )}
      </div>
    </section>
  )
}
