import { serializeJsonLd } from '@/lib/seo'

// The one allowed dangerouslySetInnerHTML outside rich text (rules §6): JSON-LD is
// inert data (not executed, so CSP doesn't apply) and serializeJsonLd escapes "<".
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}
