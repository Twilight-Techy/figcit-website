// The .js suffix lets plain Node (Playwright and Vitest setup) load the Payload config.
import { revalidatePath } from 'next/cache.js'

// Pages are rendered statically and refreshed when an editor publishes (rules §3).
// Scripts such as the seed run outside Next.js, where revalidation is unavailable, so
// they pass context.disableRevalidate and failures are ignored.
export function pathForSlug(slug: string): string {
  return slug === 'home' ? '/' : `/${slug}`
}

export function safeRevalidate(path: string, type?: 'layout' | 'page', context?: unknown) {
  if ((context as { disableRevalidate?: boolean } | undefined)?.disableRevalidate) return
  try {
    if (type) revalidatePath(path, type)
    else revalidatePath(path)
  } catch {
    // Not inside a Next.js request (for example a CLI script).
  }
}
