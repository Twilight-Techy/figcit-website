import Link from 'next/link'

import { ChevronIcon } from '@/components/icons'
import { CrisisNotice } from '@/components/layout/CrisisNotice'
import { Logo } from '@/components/layout/Logo'
import { footerNav, legalNav } from '@/content/navigation'
import { site } from '@/content/site'
import { getSiteSettings } from '@/lib/pages'

// Footer (Figma 30:89, mobile 41:1086). On phones the link columns fold into
// accordions; native <details> needs no JavaScript. From 1280px the tagline and the
// columns sit side by side. The focus ring switches to orange to show on Fig Ink.
const linkClass =
  'rounded-control text-[1.0625rem] leading-[1.3] text-on-footer/90 underline-offset-[0.2em] hover:underline'

export async function Footer() {
  const settings = await getSiteSettings()
  const email = settings.email || site.email
  const details = [
    settings.legalName || site.legalName,
    `${settings.locality || site.locality}, ${settings.region || site.region}, United Kingdom`,
    settings.companyNumber && `Company number ${settings.companyNumber}`,
  ].filter(Boolean)

  return (
    <footer className="bg-footer text-on-footer [--fc-focus:var(--fc-footer-focus)]">
      <div className="container-site flex flex-col gap-[1.125rem] py-14 md:gap-14 md:pt-24 md:pb-10">
        <div className="flex flex-col gap-[1.125rem] md:gap-14 xl:flex-row xl:justify-between xl:gap-10">
          <div className="flex max-w-[32.5rem] min-w-0 flex-col gap-[1.125rem] md:gap-6">
            <Logo reversed />
            <p className="font-heading text-[1.875rem] leading-[1.12] font-extrabold tracking-[-0.01em] md:text-[3.25rem] md:leading-[1.02] md:tracking-[-0.025em]">
              We fix the fit,
              <br className="hidden md:inline" /> not the people.
            </p>
            <p className="text-base leading-[1.6] text-on-footer/85 md:text-lg">
              Figcit helps people and places fit, so everyone can learn, work and thrive as they
              are.
            </p>
          </div>

          {/* Tablet and desktop: three columns. */}
          <nav aria-label="Footer" className="hidden gap-14 md:flex">
            {footerNav.map((column) => (
              <div key={column.heading} className="flex flex-col gap-3.5">
                <h2 className="font-heading text-sm leading-[normal] font-bold tracking-[0.1em] text-footer-heading uppercase">
                  {column.heading}
                </h2>
                <ul className="flex flex-col gap-3.5 leading-[1.3] whitespace-nowrap">
                  {column.links.map((item) => (
                    <li key={item.href}>
                      <Link prefetch={false} href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Phones: one accordion per column. */}
          <nav aria-label="Footer" className="flex flex-col gap-[1.125rem] md:hidden">
            {footerNav.map((column) => (
              <details key={column.heading} className="group border-t border-footer-line">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-control py-3.5 font-heading text-[1.0625rem] leading-[1.12] font-bold [&::-webkit-details-marker]:hidden">
                  {column.heading}
                  <ChevronIcon className="transition-calm transition-transform group-open:rotate-180" />
                </summary>
                <ul className="flex flex-col pb-2 leading-[1.3]">
                  {column.links.map((item) => (
                    <li key={item.href}>
                      {/* Full-width rows keep touch targets well above 24px. */}
                      <Link
                        prefetch={false}
                        href={item.href}
                        className={`${linkClass} block py-2.5`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </nav>
        </div>

        <CrisisNotice />

        <div className="flex flex-col gap-3 text-[0.8125rem] leading-[1.6] text-on-footer/70 md:border-t md:border-footer-line md:pt-6 md:text-sm md:leading-[normal] md:text-on-footer-muted xl:flex-row xl:justify-between">
          <p>
            {details.join(' · ')} ·{' '}
            <a href={`mailto:${email}`} className="rounded-control hover:underline">
              {email}
            </a>
          </p>
          <ul aria-label="Legal" className="flex flex-wrap">
            {legalNav.map((item, i) => (
              <li key={item.href}>
                <Link prefetch={false} href={item.href} className="rounded-control hover:underline">
                  {item.label}
                </Link>
                {i < legalNav.length - 1 && (
                  <span aria-hidden className="px-[0.3em]">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
