import type { IconName } from '@/content/navigation'

import {
  BankIcon,
  BriefcaseIcon,
  ChartIcon,
  GraduationCapIcon,
  HeartIcon,
  HomeIcon,
  LeafIcon,
  PeopleIcon,
  PhoneIcon,
  UserIcon,
  WaveIcon,
} from './index'

const icons = {
  bank: BankIcon,
  briefcase: BriefcaseIcon,
  chart: ChartIcon,
  graduation: GraduationCapIcon,
  heart: HeartIcon,
  home: HomeIcon,
  leaf: LeafIcon,
  people: PeopleIcon,
  phone: PhoneIcon,
  user: UserIcon,
  wave: WaveIcon,
} satisfies Record<IconName, unknown>

export function NavIcon({ name, size }: { name: IconName; size?: number }) {
  const Icon = icons[name]
  return <Icon size={size} />
}
