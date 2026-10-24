import localFont from 'next/font/local'

// Variable fonts: one file per family covers every weight in the design (rules §3).
export const figtree = localFont({
  src: '../fonts/figtree-latin-variable.woff2',
  weight: '300 900',
  display: 'swap',
  variable: '--font-figtree',
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
})

export const atkinson = localFont({
  src: '../fonts/atkinson-hyperlegible-next-latin-variable.woff2',
  weight: '200 800',
  display: 'swap',
  variable: '--font-atkinson',
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
})
