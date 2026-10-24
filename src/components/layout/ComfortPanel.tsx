'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'

import { CloseIcon, LeafIcon, MoonIcon, SunIcon } from '@/components/icons'
import {
  CHANGE_EVENT,
  defaultSettings,
  readSettings,
  saveSettings,
  type ComfortSettings,
  type TextSize,
  type Theme,
} from '@/lib/comfort'

let cached: { key: string; value: ComfortSettings } | null = null

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

// useSyncExternalStore needs a stable snapshot, so cache by the serialised value.
function getSnapshot(): ComfortSettings {
  const value = readSettings()
  const key = JSON.stringify(value)
  if (cached?.key !== key) cached = { key, value }
  return cached.value
}

const textSizes: { value: TextSize; label: string; className: string }[] = [
  { value: 'sm', label: 'Smaller text', className: 'text-[1rem]' },
  { value: 'md', label: 'Standard text', className: 'text-[1.25rem]' },
  { value: 'lg', label: 'Larger text', className: 'text-[1.5rem]' },
]

const themes: { value: Theme; label: string; Icon: typeof SunIcon }[] = [
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
]

// Comfort button and panel (Figma 40:965, design state C). A non-modal disclosure:
// Escape or an outside click closes it and returns focus to the button.
export function ComfortPanel() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const settings = useSyncExternalStore(subscribe, getSnapshot, () => defaultSettings)
  const update = (patch: Partial<ComfortSettings>) => saveSettings({ ...settings, ...patch })

  useEffect(() => {
    if (!open) return
    function onPointer(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-pill border border-line px-4 py-[0.6875rem] font-heading text-[0.9375rem] leading-none font-semibold transition-calm transition-colors hover:bg-surface"
      >
        <LeafIcon size={18} className="text-disc-teal" />
        {/* Icon-only on small phones; the accessible name is "Comfort" throughout. */}
        <span className="sr-only sm:not-sr-only">Comfort</span>
      </button>

      <section
        id={panelId}
        hidden={!open}
        aria-label="Comfort settings"
        className="comfort-panel z-40 rounded-card bg-surface p-7 text-ink shadow-panel"
      >
        <div className="flex flex-col gap-[1.375rem]">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2.5 font-heading text-[1.375rem] leading-[1.15] font-bold">
              <LeafIcon size={22} className="text-disc-teal" />
              Comfort
            </h2>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                buttonRef.current?.focus()
              }}
              className="rounded-control p-1"
              aria-label="Close comfort settings"
            >
              <CloseIcon size={22} />
            </button>
          </div>

          <div className="flex items-center gap-4 rounded-tile bg-surface-muted px-[1.125rem] py-4">
            <div className="flex-1">
              <p
                id={`${panelId}-low`}
                className="font-heading text-[1.0625rem] leading-[1.15] font-bold"
              >
                Low-stimulation mode
              </p>
              <p className="text-[0.875rem] leading-[1.6] text-ink-muted">
                Muted colours, no motion, extra spacing
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.lowStim}
              aria-labelledby={`${panelId}-low`}
              onClick={() => update({ lowStim: !settings.lowStim })}
              className={`relative h-7 w-12 shrink-0 rounded-pill transition-calm transition-colors ${settings.lowStim ? 'bg-[#3e7a72]' : 'bg-[#8a8290]'}`}
            >
              <span
                className={`absolute top-[3px] size-[22px] rounded-full bg-white transition-calm transition-[left] ${settings.lowStim ? 'left-[23px]' : 'left-[3px]'}`}
              />
            </button>
          </div>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="mb-2.5 font-heading text-[1.0625rem] leading-[1.15] font-bold">
              Text size
            </legend>
            <div className="flex gap-2">
              {textSizes.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  aria-pressed={settings.textSize === size.value}
                  aria-label={size.label}
                  onClick={() => update({ textSize: size.value })}
                  className={`flex flex-1 items-center justify-center rounded-control py-2.5 font-heading leading-[1.15] font-bold ${size.className} ${
                    settings.textSize === size.value
                      ? 'border-2 border-primary bg-primary/8 text-primary'
                      : 'border border-line bg-surface'
                  }`}
                >
                  A
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="mb-2.5 font-heading text-[1.0625rem] leading-[1.15] font-bold">
              Theme
            </legend>
            <div className="flex gap-2">
              {themes.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={settings.theme === value}
                  onClick={() => update({ theme: value })}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-control border py-3 font-heading leading-[1.15] font-bold ${
                    settings.theme === value
                      ? 'border-ink bg-ink text-bg'
                      : 'border-line bg-surface'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <p className="text-[0.875rem] leading-[1.6] text-ink-muted">
            Your device’s reduced-motion setting is always respected.
          </p>
        </div>
      </section>
    </div>
  )
}
