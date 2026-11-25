import Link from 'next/link'

import { AppBannerClose } from '@/components/layout/AppBannerClose'

// "Get the app" bar above the header, on phones and small tablets only. Hidden on the
// download page itself, and for good once someone closes it (comfortInitScript reads that
// before first paint, so it never flashes).
export function AppBanner() {
  return (
    <aside
      aria-label="FigCit app"
      className="app-banner flex items-center gap-3 bg-band py-2.5 pr-2 pl-5 text-on-band on-dark md:hidden"
    >
      <p className="flex-1 text-[0.9375rem] leading-snug">
        <span className="font-bold">FigCit is on your phone now.</span> Free, and it works offline.
      </p>
      <Link
        prefetch={false}
        href="/download"
        className="shrink-0 rounded-pill bg-on-band px-4 py-2.5 font-heading text-[0.9375rem] leading-none font-bold text-band"
      >
        Get the app
      </Link>
      <AppBannerClose />
    </aside>
  )
}
