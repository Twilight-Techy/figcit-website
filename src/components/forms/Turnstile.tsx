'use client'

import { useEffect, useRef } from 'react'

// Cloudflare Turnstile: privacy-friendly spam protection with no puzzles (copy Part B).
// It runs only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set; the widget adds the
// cf-turnstile-response field that the server action checks.
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string
  remove: (id: string) => void
}
declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

let loading: Promise<void> | null = null
function loadScript(): Promise<void> {
  loading ??= new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = SCRIPT
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Turnstile failed to load'))
    document.head.appendChild(s)
  })
  return loading
}

export function Turnstile() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!siteKey || !ref.current) return
    let id: string | undefined
    let cancelled = false
    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return
        id = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          appearance: 'interaction-only',
          theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
        })
      })
      .catch(() => {
        // The server rejects the submission with a clear message if this never loads.
      })
    return () => {
      cancelled = true
      if (id) window.turnstile?.remove(id)
    }
  }, [])

  return siteKey ? <div ref={ref} /> : null
}
