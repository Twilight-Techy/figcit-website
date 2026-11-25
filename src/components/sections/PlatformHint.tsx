'use client'

import { useEffect } from 'react'

import { platformFor } from '@/lib/androidApp'

// Marks the download page with the visitor's platform, so CSS puts their steps first and
// labels them "Your device". Everything is in the page already; this only reorders it.
export function PlatformHint({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId)
    if (el) el.dataset.platform = platformFor(navigator.userAgent, navigator.maxTouchPoints)
  }, [targetId])
  return null
}
