// Comfort settings (design state C). Stored per browser in localStorage, a convenience
// rather than personal data, and mirrored as attributes on <html> that tokens.css reads.

export type TextSize = 'sm' | 'md' | 'lg'
export type Theme = 'light' | 'dark'
export type ComfortSettings = { lowStim: boolean; textSize: TextSize; theme: Theme }

export const STORAGE_KEY = 'figcit-comfort'
export const CHANGE_EVENT = 'figcit-comfort-change'
export const defaultSettings: ComfortSettings = { lowStim: false, textSize: 'md', theme: 'light' }

export function parseSettings(raw: string | null): ComfortSettings {
  try {
    const value: unknown = raw ? JSON.parse(raw) : {}
    const s = (value && typeof value === 'object' ? value : {}) as Record<string, unknown>
    return {
      lowStim: s.lowStim === true,
      textSize: s.textSize === 'sm' || s.textSize === 'lg' ? s.textSize : 'md',
      theme: s.theme === 'dark' ? 'dark' : 'light',
    }
  } catch {
    return defaultSettings
  }
}

export function applySettings(root: HTMLElement, s: ComfortSettings) {
  const set = (name: string, value: string | null) =>
    value === null ? root.removeAttribute(name) : root.setAttribute(name, value)
  set('data-comfort', s.lowStim ? 'low' : null)
  set('data-text-size', s.textSize === 'md' ? null : s.textSize)
  set('data-theme', s.theme === 'dark' ? 'dark' : null)
}

export function readSettings(): ComfortSettings {
  try {
    return parseSettings(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    return defaultSettings
  }
}

export function saveSettings(s: ComfortSettings) {
  applySettings(document.documentElement, s)
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    // Private browsing or blocked storage: settings still apply for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}
