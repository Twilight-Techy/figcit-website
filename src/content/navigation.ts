// Site navigation from the website copy (Part B, Navigation). Moves into the Payload
// Header global in T11; components only depend on these types.

export type IconName =
  | 'phone'
  | 'people'
  | 'home'
  | 'chart'
  | 'user'
  | 'briefcase'
  | 'graduation'
  | 'bank'
  | 'leaf'
  | 'heart'
  | 'wave'

export type Tone = 'purple' | 'terracotta' | 'teal' | 'ochre' | 'green' | 'blue'

export type NavLink = { label: string; href: string }

export type NavItem = NavLink & { description?: string; icon?: IconName; tone?: Tone }

export type NavGroup =
  | { kind: 'mega'; label: string; items: NavItem[] }
  | { kind: 'dropdown'; label: string; items: NavItem[] }
  | { kind: 'link'; label: string; href: string }

export const mainNav: NavGroup[] = [
  {
    kind: 'mega',
    label: 'Services',
    items: [
      {
        label: 'FigCit App',
        description: 'Everyday support, adapted to you',
        href: '/services/app',
        icon: 'phone',
        tone: 'purple',
      },
      {
        label: 'FigCit Consulting',
        description: 'Building systems that work for people',
        href: '/services/consulting',
        icon: 'people',
        tone: 'terracotta',
      },
      {
        label: 'FigCit Hub',
        description: 'A space to connect, explore and recharge',
        href: '/services/hub',
        icon: 'home',
        tone: 'teal',
      },
    ],
  },
  {
    kind: 'dropdown',
    label: 'Who we help',
    items: [
      { label: 'For you', href: '/for-you', icon: 'user', tone: 'ochre' },
      { label: 'For employers', href: '/for-employers', icon: 'briefcase', tone: 'terracotta' },
      {
        label: 'For schools, colleges and universities',
        href: '/for-education',
        icon: 'graduation',
        tone: 'teal',
      },
      { label: 'For partners', href: '/partners', icon: 'bank', tone: 'purple' },
    ],
  },
  { kind: 'link', label: 'Insights', href: '/insights' },
  {
    kind: 'dropdown',
    label: 'About',
    items: [
      { label: 'Who we are', href: '/about' },
      { label: 'Our team', href: '/about/team' },
    ],
  },
  { kind: 'link', label: 'Contact', href: '/contact' },
]

export const headerActions = {
  secondary: { label: 'Book a conversation', href: '/contact#book-a-conversation' },
  primary: { label: 'Get early access', href: '/contact#get-early-access' },
} satisfies Record<string, NavLink>

// Footer columns (Figma 30:89). Services and Who we help reuse the header menu links.
function groupItems(label: string): NavLink[] {
  const group = mainNav.find((g) => g.label === label)
  return group && group.kind !== 'link'
    ? group.items.map(({ label, href }) => ({ label, href }))
    : []
}

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Services',
    links: [
      ...groupItems('Services'),
      { label: 'Capacity Fit Audit', href: '/services/consulting/capacity-fit-audit' },
      { label: 'Capacity Fit Profile', href: '/services/consulting/capacity-fit-profile' },
    ],
  },
  { heading: 'Who we help', links: groupItems('Who we help') },
  {
    heading: 'FigCit',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Team', href: '/about/team' },
      { label: 'Insights', href: '/insights' },
      { label: 'Questions', href: '/faqs' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export const legalNav: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Terms', href: '/terms' },
  { label: 'Safeguarding', href: '/safeguarding' },
  { label: 'Complaints', href: '/complaints' },
]
