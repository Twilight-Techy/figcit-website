import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

// Checks WCAG text contrast for the semantic token pairs in every Comfort mode (rules §8).
const css = readFileSync(path.resolve(__dirname, '../../src/styles/tokens.css'), 'utf8')

type Rgba = [number, number, number, number]

function block(selector: string): Record<string, string> {
  const escaped = selector.replace(/[[\]'=]/g, (c) => `\\${c}`)
  const match = css.match(new RegExp(`(?:^|\\n)${escaped}\\s*{([^}]*)}`))
  if (!match) throw new Error(`No block for ${selector}`)
  const vars: Record<string, string> = {}
  for (const [, name, value] of match[1].matchAll(/(--fc-[\w-]+):\s*([^;]+);/g)) {
    vars[name] = value.trim()
  }
  return vars
}

const base = block(':root')
const modes: Record<string, Record<string, string>> = {
  light: base,
  dark: { ...base, ...block(":root[data-theme='dark']") },
  low: { ...base, ...block(":root[data-comfort='low']") },
  'dark-low': {
    ...base,
    ...block(":root[data-theme='dark']"),
    ...block(":root[data-comfort='low']"),
    ...block(":root[data-theme='dark'][data-comfort='low']"),
  },
}

function resolve(vars: Record<string, string>, name: string): string {
  let value = vars[name]
  for (let i = 0; value?.startsWith('var(') && i < 10; i++) value = vars[value.slice(4, -1)]
  if (!value) throw new Error(`Unresolved ${name}`)
  return value
}

function parse(color: string): Rgba {
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).concat(1) as Rgba
  }
  const m = color.match(/rgb\((\d+) (\d+) (\d+)(?: \/ ([\d.]+))?\)/)
  if (!m) throw new Error(`Unsupported colour ${color}`)
  return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] ? Number(m[4]) : 1]
}

function over(fg: Rgba, bg: Rgba): Rgba {
  const a = fg[3]
  return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)).concat(1) as Rgba
}

function luminance([r, g, b]: Rgba): number {
  const lin = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function contrast(vars: Record<string, string>, fgName: string, bgName: string): number {
  const bg = parse(resolve(vars, bgName))
  const fg = over(parse(resolve(vars, fgName)), bg)
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

// [foreground, background, minimum ratio]. 3:1 pairs are large text only.
const pairs: [string, string, number][] = [
  ['--fc-ink', '--fc-bg', 4.5],
  ['--fc-ink', '--fc-surface', 4.5],
  ['--fc-ink', '--fc-surface-muted', 4.5],
  ['--fc-ink-muted', '--fc-surface', 4.5],
  ['--fc-ink-muted', '--fc-bg', 4.5],
  ['--fc-primary', '--fc-bg', 4.5],
  ['--fc-primary', '--fc-surface', 4.5],
  ['--fc-on-primary', '--fc-primary', 4.5],
  ['--fc-eyebrow', '--fc-bg', 4.5],
  ['--fc-eyebrow', '--fc-surface', 4.5],
  ['--fc-on-band', '--fc-band', 4.5],
  ['--fc-accent', '--fc-bg', 3],
  ['--fc-tone-purple', '--fc-surface', 4.5],
  ['--fc-tone-purple', '--fc-surface-muted', 4.5],
  ['--fc-tone-terracotta', '--fc-surface', 4.5],
  ['--fc-tone-terracotta', '--fc-surface-muted', 4.5],
  ['--fc-tone-teal', '--fc-surface', 4.5],
  ['--fc-tone-teal', '--fc-surface-muted', 4.5],
  ['--fc-tone-ochre', '--fc-surface', 4.5],
  ['--fc-tone-ochre', '--fc-surface-muted', 4.5],
  ['--fc-tone-green', '--fc-surface', 4.5],
  ['--fc-tone-green', '--fc-surface-muted', 4.5],
  ['--fc-tone-blue', '--fc-surface', 4.5],
  ['--fc-tone-blue', '--fc-surface-muted', 4.5],
  ['--fc-pith-cream', '--fc-promise', 4.5],
  ['--fc-on-footer', '--fc-footer', 4.5],
  ['--fc-on-footer-muted', '--fc-footer', 4.5],
  ['--fc-footer-heading', '--fc-footer', 4.5],
  ['--fc-footer-focus', '--fc-footer', 3],
]

describe.each(Object.entries(modes))('%s mode', (_mode, vars) => {
  it.each(pairs)('%s on %s meets %s:1', (fg, bg, min) => {
    expect(contrast(vars, fg, bg)).toBeGreaterThanOrEqual(min)
  })
})
