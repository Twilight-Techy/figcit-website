import { beforeEach, describe, expect, it } from 'vitest'

import {
  applySettings,
  parseSettings,
  readSettings,
  saveSettings,
  STORAGE_KEY,
} from '@/lib/comfort'

describe('Comfort settings', () => {
  beforeEach(() => {
    localStorage.clear()
    applySettings(document.documentElement, parseSettings(null))
  })

  it('falls back to defaults for missing or malformed storage', () => {
    expect(parseSettings(null)).toEqual({ lowStim: false, textSize: 'md', theme: 'light' })
    expect(parseSettings('not json')).toEqual({ lowStim: false, textSize: 'md', theme: 'light' })
    expect(parseSettings('{"textSize":"huge","theme":"neon"}').textSize).toBe('md')
  })

  it('writes attributes that tokens.css reads, and removes them for defaults', () => {
    saveSettings({ lowStim: true, textSize: 'lg', theme: 'dark' })
    const root = document.documentElement
    expect(root.dataset.comfort).toBe('low')
    expect(root.dataset.textSize).toBe('lg')
    expect(root.dataset.theme).toBe('dark')

    saveSettings({ lowStim: false, textSize: 'md', theme: 'light' })
    expect(root.hasAttribute('data-comfort')).toBe(false)
    expect(root.hasAttribute('data-text-size')).toBe(false)
    expect(root.hasAttribute('data-theme')).toBe(false)
  })

  it('persists between page views', () => {
    saveSettings({ lowStim: true, textSize: 'sm', theme: 'light' })
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')).toEqual({
      lowStim: true,
      textSize: 'sm',
      theme: 'light',
    })
    expect(readSettings().textSize).toBe('sm')
  })
})

describe('comfortInitScript (runs before first paint)', () => {
  it('applies saved settings to <html>', async () => {
    const { comfortInitScript } = await import('@/lib/comfortInit')
    const root = document.documentElement
    for (const a of ['data-comfort', 'data-text-size', 'data-theme']) root.removeAttribute(a)
    localStorage.setItem(
      'figcit-comfort',
      JSON.stringify({ lowStim: true, textSize: 'lg', theme: 'dark' }),
    )
    new Function(comfortInitScript)()
    expect(root.getAttribute('data-comfort')).toBe('low')
    expect(root.getAttribute('data-text-size')).toBe('lg')
    expect(root.getAttribute('data-theme')).toBe('dark')
  })

  it('ignores broken or unknown values', async () => {
    const { comfortInitScript } = await import('@/lib/comfortInit')
    const root = document.documentElement
    for (const a of ['data-comfort', 'data-text-size', 'data-theme']) root.removeAttribute(a)
    localStorage.setItem('figcit-comfort', '{not json')
    expect(() => new Function(comfortInitScript)()).not.toThrow()
    localStorage.setItem('figcit-comfort', JSON.stringify({ textSize: 'huge', theme: 'neon' }))
    new Function(comfortInitScript)()
    expect(root.hasAttribute('data-text-size')).toBe(false)
    expect(root.hasAttribute('data-theme')).toBe(false)
  })
})
