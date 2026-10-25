import Image from 'next/image'

import type { Media } from '@/payload-types'

// Payload media through next/image, so visitors get AVIF or WebP at the right width
// (rules §3). Alt text is required on every upload.
export function CmsImage({
  media,
  sizes,
  priority = false,
  className = '',
}: {
  media: Media | number | null | undefined
  sizes: string
  // The page's LCP image: fetched early and at high priority (Next.js 16 deprecates
  // `priority`; `loading="eager"` with `fetchPriority="high"` replaces it).
  priority?: boolean
  className?: string
}) {
  if (!media || typeof media === 'number' || !media.url) return null
  // Payload returns absolute URLs (serverURL); same-site paths keep next/image local.
  const src = media.url.replace(/^https?:\/\/[^/]+(?=\/api\/media\/)/, '')
  const position =
    media.focalX != null && media.focalY != null ? `${media.focalX}% ${media.focalY}%` : undefined
  return (
    <Image
      src={src}
      alt={media.alt}
      fill
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className={`object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  )
}
