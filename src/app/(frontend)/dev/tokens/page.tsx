import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Design tokens',
  robots: { index: false, follow: false },
}

const swatches = [
  ['bg', 'bg-bg'],
  ['surface', 'bg-surface'],
  ['surface-muted', 'bg-surface-muted'],
  ['ink', 'bg-ink'],
  ['primary', 'bg-primary'],
  ['accent', 'bg-accent'],
  ['band', 'bg-band'],
  ['orange', 'bg-orange'],
  ['disc-teal', 'bg-disc-teal'],
  ['disc-terracotta', 'bg-disc-terracotta'],
  ['disc-ochre', 'bg-disc-ochre'],
] as const

const lights = [
  ['Available', 'bg-light-available'],
  ['Conditional', 'bg-light-conditional'],
  ['Constrained', 'bg-light-constrained'],
  ['Very constrained', 'bg-light-very-constrained'],
  ['Recovery', 'bg-light-recovery'],
] as const

// Development-only reference page for reviewing tokens in every Comfort mode (T02).
export default function TokensPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <div className="container-site space-y-16 py-section">
      <header className="space-y-5">
        <p className="flex items-center gap-2.5 font-heading text-eyebrow font-bold text-eyebrow uppercase">
          <span aria-hidden className="decorative size-2.5 rounded-full bg-orange" />
          Design tokens
        </p>
        <h1 className="font-heading text-display font-extrabold text-primary">
          Everyone has days when <span className="text-accent">the world doesn’t fit.</span>
        </h1>
        <p className="max-w-[38.75rem] text-lead">
          Lead text in Atkinson Hyperlegible Next. Switch modes with the data-theme, data-comfort
          and data-text-size attributes on the html element.
        </p>
      </header>

      <section aria-labelledby="type" className="space-y-4">
        <h2 id="type" className="font-heading text-h2 font-bold">
          Support for the whole life, not just the hard moments
        </h2>
        <h3 className="font-heading text-h3 font-bold">Feel steadier day to day</h3>
        <p className="max-w-prose">
          Notice how you’re doing, look after your mental health and find what helps, before things
          build up.
        </p>
        <p className="text-small text-ink-muted">Small muted text for notes and sources.</p>
      </section>

      <section aria-labelledby="buttons" className="space-y-4">
        <h2 id="buttons" className="font-heading text-h3 font-bold">
          Buttons
        </h2>
        <div className="flex flex-wrap gap-3.5">
          <a
            href="#buttons"
            className="rounded-pill bg-primary px-7 py-4 font-heading font-bold text-on-primary"
          >
            Get early access
          </a>
          <a
            href="#buttons"
            className="rounded-pill border-[1.5px] border-ink px-7 py-4 font-heading font-bold"
          >
            I’m an organisation
          </a>
        </div>
      </section>

      <section aria-labelledby="colours" className="space-y-4">
        <h2 id="colours" className="font-heading text-h3 font-bold">
          Colours
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {swatches.map(([name, cls]) => (
            <li key={name} className="space-y-2">
              <span className={`block h-16 rounded-tile border border-line ${cls}`} />
              <span className="text-small">{name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="lights" className="space-y-4">
        <h2 id="lights" className="font-heading text-h3 font-bold">
          Traffic lights
        </h2>
        <ul className="flex flex-wrap gap-4">
          {lights.map(([label, cls]) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-pill bg-surface px-4 py-2 shadow-float"
            >
              <span aria-hidden className={`size-3.5 rounded-full ${cls}`} />
              <span className="font-heading font-bold">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cards" className="grid gap-6 md:grid-cols-3">
        <h2 id="cards" className="sr-only">
          Cards
        </h2>
        <article className="space-y-4 rounded-card bg-surface-muted p-8">
          <span aria-hidden className="block size-[54px] rounded-full bg-disc-teal" />
          <h3 className="font-heading text-h3 font-bold">Cream card</h3>
          <p>Card body text at 17px.</p>
        </article>
        <article className="space-y-4 rounded-card bg-surface p-8 shadow-float">
          <h3 className="font-heading text-h3 font-bold">Floating card</h3>
          <p>Uses the float shadow.</p>
        </article>
        <article className="space-y-4 rounded-card bg-band p-8 text-on-band">
          <h3 className="font-heading text-h3 font-bold">Band</h3>
          <p>Text on the purple band.</p>
        </article>
      </section>
    </div>
  )
}
