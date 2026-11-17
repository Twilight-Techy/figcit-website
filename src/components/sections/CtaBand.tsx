import { QrCode } from '@/components/ui/QrCode'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { QR_ORIGIN, qrTarget } from '@/lib/qr'
import type { CtaBandBlock } from '@/payload-types'

// Closing call to action: purple card with circles (Figma 31:390, mobile full width).
// It follows a padded section, so it adds space below only. Below 1280px the circles
// shrink into the corners so they never sit behind the text.
//
// The home page band (its first action is "Get early access") also shows a QR code (Figma
// "With QR code"): a white tile on the right, on desktop only (from 1280px). Phones and
// tablets have no QR code: there is no room beside the text, and nobody can scan the
// screen they are holding. The code opens this same band on the home page, so the visitor
// lands where they can choose Get early access or Book a conversation. Other bands, such
// as Insights (first action "Book a conversation"), get no QR code and no anchor.
const QR_ANCHOR = 'get-started'

export function CtaBand({ block, index }: { block: CtaBandBlock; index: number }) {
  const headingId = `section-${index}`
  const showQr = (block.actions ?? [])[0]?.href.endsWith('#get-early-access') ?? false
  const qr = showQr
    ? {
        // Always the live site, never NEXT_PUBLIC_SITE_URL: that setting is a preview or
        // vercel.app address on some deployments, and a QR code is scanned from any device.
        value: qrTarget(`/#${QR_ANCHOR}`, QR_ORIGIN),
        label: 'QR code: opens the FigCit home page at get early access or book a conversation',
        caption: 'Scan to get started',
      }
    : null

  return (
    <section
      id={qr ? QR_ANCHOR : undefined}
      aria-labelledby={headingId}
      className={`md:pb-section ${block.background === 'cream' ? 'bg-bg' : 'bg-surface'}`}
    >
      <div className="container-site max-md:px-0">
        <div
          className={`on-dark relative overflow-hidden bg-band px-5 py-14 text-on-band md:rounded-[2rem] md:px-18 md:py-18 ${
            qr ? 'xl:min-h-[23.625rem]' : ''
          }`}
        >
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
            className={`decorative absolute right-[17.5rem] bottom-2.5 hidden size-30 rounded-pill bg-on-band/20 ${
              // The QR tile takes this spot from 1280px.
              qr ? '' : 'xl:block'
            }`}
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
          {qr && (
            // Desktop only, from 1280px: a tile floating over the circles, 136px from the right edge on the 1440 design.
            <div className="absolute top-14 right-12 hidden flex-col items-center gap-3 rounded-[1.75rem] bg-(--fc-qr-bg) p-4 text-(--fc-qr-ink) min-[1440px]:right-34 xl:flex">
              <QrCode value={qr.value} label={qr.label} className="size-[13.75rem]" />
              <p className="w-[13.75rem] text-center text-sm leading-5 font-bold">{qr.caption}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
