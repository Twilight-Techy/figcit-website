import type { Tone } from '@/content/navigation'

// Full class names so Tailwind can find them at build time.
export const discBg: Record<Tone, string> = {
  purple: 'bg-disc-purple',
  terracotta: 'bg-disc-terracotta',
  teal: 'bg-disc-teal',
  ochre: 'bg-disc-ochre',
}

export const toneText: Record<Tone, string> = {
  purple: 'text-disc-purple',
  terracotta: 'text-disc-terracotta',
  teal: 'text-disc-teal',
  ochre: 'text-disc-ochre',
}
