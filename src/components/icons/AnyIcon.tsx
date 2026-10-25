import { NavIcon } from '@/components/icons/NavIcon'
import { LineIcon, type LineIconName } from '@/components/icons/line'
import type { IconName } from '@/content/navigation'

const navNames = new Set<string>([
  'phone',
  'people',
  'home',
  'chart',
  'user',
  'briefcase',
  'graduation',
  'bank',
  'leaf',
  'heart',
  'wave',
])

// Renders either a Figma menu icon or a line icon by name, for CMS-chosen icons.
export function AnyIcon({ name, size }: { name: string; size?: number }) {
  return navNames.has(name) ? (
    <NavIcon name={name as IconName} size={size} />
  ) : (
    <LineIcon name={name as LineIconName} size={size} />
  )
}
