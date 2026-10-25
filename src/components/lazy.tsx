'use client'

import dynamic from 'next/dynamic'

// Client components that only a few pages use. Next.js adds every client component in a
// route's import graph to that route's JavaScript, and all pages share the block
// renderer, so these load on demand: their code is fetched only on pages that render
// them (rules §3). They still render on the server, so there is no layout shift.
export const LazyFormTabs = dynamic(() =>
  import('@/components/forms/FormTabs').then((m) => m.FormTabs),
)
export const LazyStickyMenu = dynamic(() =>
  import('@/components/sections/StickyMenu').then((m) => m.StickyMenu),
)
export const LazyCopyButton = dynamic(() =>
  import('@/components/sections/CopyButton').then((m) => m.CopyButton),
)
