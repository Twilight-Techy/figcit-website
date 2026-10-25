import { NavIcon } from '@/components/icons/NavIcon'
import { discBg } from '@/components/layout/tones'
import type { IconName, Tone } from '@/content/navigation'

// Round icon background used on cards (Figma: 44, 54, 60 and 68px discs).
const sizes = {
  xs: { disc: 'size-11', icon: 20 },
  sm: { disc: 'size-[3.375rem]', icon: 26 },
  md: { disc: 'size-15', icon: 28 },
  lg: { disc: 'size-[4.25rem]', icon: 32 },
} as const

export function IconDisc({
  icon,
  tone = 'purple',
  size = 'sm',
  inverse = false,
}: {
  icon: IconName
  tone?: Tone
  size?: keyof typeof sizes
  // White disc with a purple icon, for cards on the purple band (Figma 31:238).
  inverse?: boolean
}) {
  const s = sizes[size]
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-pill ${s.disc} ${
        inverse ? 'bg-surface text-primary' : `${discBg[tone]} text-[#f5eede]`
      }`}
    >
      <NavIcon name={icon} size={s.icon} />
    </span>
  )
}
