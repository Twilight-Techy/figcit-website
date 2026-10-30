import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { ImageResponse } from 'next/og'

import { site } from '@/content/site'

export const alt = 'FigCit: Fix the fit, thrive as you are.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Default social preview image in the brand colours and fonts (WOFF, which ImageResponse reads).
export default async function OpenGraphImage() {
  const fonts = path.join(process.cwd(), 'src/fonts/og')
  const [figtree, atkinson, mark] = await Promise.all([
    readFile(path.join(fonts, 'figtree-latin-800-normal.woff')),
    readFile(path.join(fonts, 'atkinson-hyperlegible-next-latin-400-normal.woff')),
    readFile(path.join(process.cwd(), 'public/brand/figcit-mark.svg')),
  ])
  const markSrc = `data:image/svg+xml;base64,${mark.toString('base64')}`

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: '#f5eede',
        fontFamily: 'Atkinson',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src={markSrc} width={60} height={50} alt="" />
        <div style={{ fontFamily: 'Figtree', fontSize: 44, color: '#5b3358' }}>figcit</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontFamily: 'Figtree', fontSize: 76, lineHeight: 1.02, color: '#5b3358' }}>
          Everyone has days when the world doesn’t fit.
        </div>
        <div style={{ fontSize: 30, color: '#2a1e2e' }}>{site.tagline}</div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Figtree', data: figtree, weight: 800, style: 'normal' },
        { name: 'Atkinson', data: atkinson, weight: 400, style: 'normal' },
      ],
    },
  )
}
