import { encode } from 'uqr'

// QR codes for the CTA band. Pure functions, so the same code runs on the server and in tests.

/** The full address a QR code should open: a site path like /contact#get-early-access, or an absolute URL. */
export function qrTarget(href: string, siteUrl: string): string {
  return new URL(href, siteUrl).toString()
}

/**
 * Encodes `value` as a QR code (error correction M) and returns it as one SVG path on a
 * grid of `size` x `size` modules, with no quiet zone: the caller adds that as padding.
 * Runs of dark modules in a row are merged into a single rectangle to keep the path small.
 */
export function qrModules(value: string): { size: number; path: string } {
  const { data } = encode(value, { ecc: 'M', border: 0 })
  const size = data.length
  let path = ''
  for (let y = 0; y < size; y++) {
    let x = 0
    while (x < size) {
      if (!data[y]![x]) {
        x++
        continue
      }
      const start = x
      while (x < size && data[y]![x]) x++
      path += `M${start} ${y}h${x - start}v1h-${x - start}z`
    }
  }
  return { size, path }
}
