import { LeafIcon, WaveIcon } from '@/components/icons'
import { LineIcon } from '@/components/icons/line'

// "Phone — app preview" (Figma 32:224): an illustration of the check-in screen, drawn
// in HTML so it stays sharp and light. It is one image to assistive technology. Colours
// are the app's own, so it looks the same in every Comfort mode.
const row =
  'flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 text-[0.8125rem] font-semibold'

export function AppPreview() {
  return (
    <div
      role="img"
      aria-label="The Figcit app check-in screen: energy and mood sliders, a Conditional traffic light and three suggestions"
      className="relative mx-auto aspect-[420/700] w-full max-w-[26.25rem] font-heading text-[#2a1e2e]"
    >
      <span
        aria-hidden
        className="decorative absolute top-[21.4%] left-[2.4%] aspect-square w-[95.2%] rounded-pill bg-[#e08830]"
      />
      <div className="absolute inset-y-[2.9%] left-[11.9%] w-[76.2%] rounded-[3rem] bg-[#2a1e2e] p-3.5 shadow-panel">
        <div className="flex h-full flex-col gap-3 overflow-hidden rounded-[2.25rem] bg-[#f5eede] px-5 pt-5 pb-4">
          <div className="flex items-center justify-between text-[0.75rem] font-bold">
            9:41
            <LeafIcon size={14} className="text-[#3e7a72]" />
          </div>
          <p className="mt-3 text-[0.8125rem] text-[#2a1e2e]/70">Good morning</p>
          <p className="text-[1.375rem] leading-[1.15] font-bold">How are you right now?</p>
          {[
            { label: 'Energy', value: 36, colour: '#e08830' },
            { label: 'Mood', value: 52, colour: '#a85d63' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <span className="text-[0.8125rem] font-bold">{s.label}</span>
              <span className="relative h-1.5 rounded-pill bg-[#2a1e2e]/10">
                <span
                  className="absolute inset-y-0 left-0 rounded-pill"
                  style={{ width: `${s.value}%`, background: s.colour }}
                />
                <span
                  className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-pill border-2 bg-white"
                  style={{ left: `${s.value}%`, borderColor: s.colour }}
                />
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-3">
            <span className="size-5 shrink-0 rounded-pill bg-[#d8b64c]" />
            <span className="flex flex-col">
              <span className="text-[0.9375rem] font-bold">Conditional</span>
              <span className="font-body text-[0.75rem]">Yes, with the right setup</span>
            </span>
          </div>
          <p className="mt-1 text-[0.8125rem] font-bold">What fits right now</p>
          <span className={row}>
            <span className="flex size-6 items-center justify-center rounded-pill bg-[#3e7a72] text-white">
              <WaveIcon size={14} />
            </span>
            2-minute reset
          </span>
          <span className={row}>
            <span className="flex size-6 items-center justify-center rounded-pill bg-[#5b3358] text-white">
              <LineIcon name="cloud" size={13} />
            </span>
            Brain Dump
          </span>
          <span className={row}>
            <span className="flex size-6 items-center justify-center rounded-pill bg-[#a85d63] text-white">
              <LineIcon name="message" size={13} />
            </span>
            Find the words
          </span>
          <span className="mt-1 text-center text-[0.8125rem] font-bold text-[#5b3358]">
            Not now
          </span>
        </div>
      </div>
    </div>
  )
}
