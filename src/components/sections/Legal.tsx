import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

import { CookieSettings } from '@/components/layout/CookieSettings'
import { legalNav } from '@/content/navigation'
import { site } from '@/content/site'
import { getSiteSettings } from '@/lib/pages'
import type { LegalBlock } from '@/payload-types'

// Legal page template (Figma 39:877), shared by /privacy, /cookies, /accessibility,
// /terms, /safeguarding and /complaints. Body text is rich text from the CMS.
export async function Legal({ block, path }: { block: LegalBlock; path: string }) {
  const settings = await getSiteSettings()
  const contact = [
    settings.email || site.email,
    settings.legalName || site.legalName,
    `${settings.locality || site.locality}, ${settings.region || site.region}, United Kingdom`,
    settings.companyNumber && `Company number ${settings.companyNumber}`,
  ].filter(Boolean)

  return (
    <section aria-label="Legal text" className="bg-bg pb-section">
      <div className="container-site grid items-start gap-10 lg:grid-cols-[18.75rem_minmax(0,52.25rem)] lg:justify-between">
        <nav aria-labelledby="legal-nav" className="rounded-card bg-surface p-6 lg:sticky lg:top-6">
          <p
            id="legal-nav"
            className="font-heading text-[0.8125rem] leading-[1.2] font-bold tracking-[0.1em] text-eyebrow uppercase"
          >
            Legal pages
          </p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={l.href === path ? 'page' : undefined}
                  className="block rounded-control px-3.5 py-2.5 font-heading text-[1.0625rem] leading-5 font-semibold hover:bg-surface-muted aria-[current=page]:bg-primary/10 aria-[current=page]:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-col gap-5">
          {block.notice && (
            <p className="rounded-control bg-orange/20 px-5 py-4 font-heading text-[0.9375rem] leading-[1.3] font-bold text-tone-ochre">
              {block.notice}
            </p>
          )}
          {(block.sections ?? []).map((s, i) => (
            <div key={s.id ?? i} className="legal-text flex flex-col gap-4">
              <h2 className="pt-2 font-heading text-[1.625rem] leading-[1.15] font-bold">
                {s.heading}
              </h2>
              <RichText data={s.body} />
            </div>
          ))}
          {block.showCookieSettings && <CookieSettings />}
          {block.showContactDetails && (
            <div className="flex flex-col gap-4">
              <h2 className="pt-2 font-heading text-[1.625rem] leading-[1.15] font-bold">
                Contact us
              </h2>
              <p className="text-[1.0625rem] leading-[1.7]">{contact.join(' · ')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
