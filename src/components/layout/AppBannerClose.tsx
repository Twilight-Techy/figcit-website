'use client'

import { CloseIcon } from '@/components/icons'
import { APP_BANNER_KEY } from '@/lib/appBanner'

// Hides the app bar now and on later visits.
export function AppBannerClose() {
  return (
    <button
      type="button"
      aria-label="Hide this message"
      className="grid size-11 shrink-0 place-items-center rounded-pill hover:bg-on-band/10"
      onClick={() => {
        document.documentElement.setAttribute('data-app-banner', 'hidden')
        try {
          localStorage.setItem(APP_BANNER_KEY, 'hidden')
        } catch {
          // Private mode or blocked storage: hidden for this page view only.
        }
      }}
    >
      <CloseIcon size={20} />
    </button>
  )
}
