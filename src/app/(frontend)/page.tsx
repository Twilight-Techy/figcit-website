import { site } from '@/content/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: site.defaultTitle,
  description: site.defaultDescription,
  path: '/',
})

// Placeholder until T13 builds the Home page from Payload blocks.
export default function HomePage() {
  return (
    <section className="container-site py-section">
      <h1 className="font-heading text-display font-extrabold text-primary">
        Everyone has days when the world doesn’t fit.
      </h1>
      <p className="mt-7 max-w-[38.75rem] text-lead">
        Figcit makes support part of everyday life for young people and adults with mental health
        conditions and neurodevelopmental differences.
      </p>
    </section>
  )
}
