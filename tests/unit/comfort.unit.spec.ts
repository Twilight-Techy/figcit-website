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
