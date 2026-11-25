import jsQR from 'jsqr'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { CtaBand } from '@/components/sections/CtaBand'
import { QR_ORIGIN, qrModules, qrTarget } from '@/lib/qr'
import type { CtaBandBlock } from '@/payload-types'

// The live site's NEXT_PUBLIC_SITE_URL is currently a vercel.app address; the QR code must ignore it.
vi.mock('@/lib/env', () => ({ env: { NEXT_PUBLIC_SITE_URL: 'https://figcit-website.vercel.app' } }))

const HOME_BAND_URL = 'https://www.figcit.co.uk/#get-started'
const EARLY_ACCESS_URL = 'https://www.figcit.co.uk/contact#get-early-access'

// Draws an SVG path of "M x y h w v1 h-w z" rectangles onto a pixel grid and reads it back
// with an independent QR decoder (jsQR), the way a phone camera would: dark on light, with
// a quiet zone of `quiet` white modules.
function decodePath(path: string, size: number, quiet = 4): string | null {
  const scale = 8
  const total = size + quiet * 2
  const px = total * scale
  const pixels = new Uint8ClampedArray(px * px * 4).fill(255)
  for (const m of path.matchAll(/M(\d+) (\d+)h(\d+)v1/g)) {
    const [x0, y0, w] = [Number(m[1]), Number(m[2]), Number(m[3])]
    for (let y = y0; y < y0 + 1; y++) {
      for (let x = x0; x < x0 + w; x++) {
        for (let dy = 0; dy < scale; dy++) {
          for (let dx = 0; dx < scale; dx++) {
            const i = (((y + quiet) * scale + dy) * px + (x + quiet) * scale + dx) * 4
            pixels[i] = pixels[i + 1] = pixels[i + 2] = 0
          }
        }
      }
    }
  }
  return jsQR(pixels, px, px)?.data ?? null
}

describe('qrTarget', () => {
  it('turns a site path with a section into the full address', () => {
    expect(qrTarget('/contact#get-early-access', 'https://www.figcit.co.uk')).toBe(EARLY_ACCESS_URL)
  })

  it('leaves an absolute address alone', () => {
    expect(qrTarget('https://example.org/a', 'https://www.figcit.co.uk')).toBe(
      'https://example.org/a',
    )
  })
})

describe('qrModules', () => {
  it('encodes the early access address as a QR code that a decoder reads back exactly', () => {
    const { size, path } = qrModules(EARLY_ACCESS_URL)
    expect(size).toBe(33) // version 4
    expect(decodePath(path, size)).toBe(EARLY_ACCESS_URL)
  })

  it('still reads with a tight quiet zone (the tile has 16px of padding)', () => {
    const { size, path } = qrModules(EARLY_ACCESS_URL)
    expect(decodePath(path, size, 2)).toBe(EARLY_ACCESS_URL)
  })
})

const band = (actions: CtaBandBlock['actions']): CtaBandBlock => ({
  blockType: 'ctaBand',
  background: 'cream',
  heading: 'Let’s make life, learning and work fit people.',
  body: 'Helping people thrive. Helping systems adapt.',
  actions,
})

describe('CtaBand QR code', () => {
  const earlyAccess = [
    {
      label: 'Get early access',
      href: '/contact#get-early-access',
      variant: 'primary' as const,
      arrow: true,
    },
    {
      label: 'Book a conversation',
      href: '/contact#book-a-conversation',
      variant: 'outline' as const,
    },
  ]

  it('shows one QR code, for desktop only, that opens this band on the home page', () => {
    const html = renderToStaticMarkup(
      createElement(CtaBand, { block: band(earlyAccess), index: 0 }),
    )
    const codes = [
      ...html.matchAll(
        /<svg[^>]*role="img"[^>]*aria-label="QR code: opens the FigCit home page[^"]*"[^>]*><path d="([^"]+)"/g,
      ),
    ]
    // one tile, and it is hidden below 1280px: no QR code on phones or tablets
    expect(codes).toHaveLength(1)
    expect(html).toMatch(/class="[^"]*\bhidden\b[^"]*\bxl:flex\b[^"]*"/)
    expect(html).not.toContain('xl:hidden')
    expect(decodePath(codes[0]![1]!, 29, 2)).toBe(HOME_BAND_URL)
    expect(html).toContain('Scan to get started')
  })

  it('always points the QR code at the live site, not at the deployment address', () => {
    // the mocked NEXT_PUBLIC_SITE_URL above is a vercel.app address, as on the live site today
    const html = renderToStaticMarkup(
      createElement(CtaBand, { block: band(earlyAccess), index: 0 }),
    )
    const [, path] = [
      ...html.matchAll(/aria-label="QR code[^"]*"[^>]*><path d="([^"]+)"/g),
    ][0] as unknown as [string, string]
    expect(decodePath(path, 29, 2)).toBe(`${QR_ORIGIN}/#get-started`)
    expect(html).not.toContain('vercel.app')
  })

  it('puts the anchor the QR code points at on the band', () => {
    const html = renderToStaticMarkup(
      createElement(CtaBand, { block: band(earlyAccess), index: 0 }),
    )
    expect(html).toMatch(/<section id="get-started"/)
    // the address in the QR code and the anchor on the page must stay the same word
    expect(new URL(HOME_BAND_URL).hash).toBe('#get-started')
  })

  it('shows no QR code or anchor on the Insights band (first action is Book a conversation)', () => {
    const html = renderToStaticMarkup(
      createElement(CtaBand, { block: band([...earlyAccess].reverse()), index: 0 }),
    )
    // (the button arrow is also an <svg>, so look for the QR code's role="img")
    expect(html).not.toContain('role="img"')
    expect(html).not.toContain('Scan to')
    expect(html).not.toContain('id="get-started"')
  })

  it('shows no QR code on bands that are not about early access', () => {
    const html = renderToStaticMarkup(
      createElement(CtaBand, {
        block: band([
          { label: 'Partner with us', href: '/contact#partner-with-us', variant: 'primary' },
        ]),
        index: 0,
      }),
    )
    expect(html).not.toContain('role="img"')
    expect(html).not.toContain('Scan to')
    expect(html).not.toContain('id="get-started"')
  })

  it('sends people from a "Get the app" band to the download page on their phone', () => {
    const html = renderToStaticMarkup(
      createElement(CtaBand, {
        block: band([
          { label: 'Get the app', href: '/download', variant: 'primary', arrow: true },
          {
            label: 'Book a conversation',
            href: '/contact#book-a-conversation',
            variant: 'outline',
          },
        ]),
        index: 0,
      }),
    )
    const m =
      /viewBox="0 0 (\d+) \d+"[^>]*aria-label="QR code: opens the FigCit app download[^"]*"[^>]*><path d="([^"]+)"/.exec(
        html,
      )
    expect(html).toContain('Scan to get the app')
    // printed QR codes still open this band
    expect(html).toMatch(/<section id="get-started"/)
    const decoded = decodePath(m![2]!, Number(m![1]), 2)
    expect(decoded).toBe(`${QR_ORIGIN}/download`)
  })
})
