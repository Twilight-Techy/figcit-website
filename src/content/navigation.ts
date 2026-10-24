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

export type Tone = 'purple' | 'terracotta' | 'teal' | 'ochre'

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
        label: 'The Figcit app',
        description: 'Support that fits how you feel right now',
        href: '/services#app',
        icon: 'phone',
        tone: 'purple',
      },
      {
        label: 'Consulting and training',
        description: 'Adjust before absence, burnout or dropout',
        href: '/services#consulting',
        icon: 'people',
        tone: 'terracotta',
      },
      {
        label: 'The Figcit Hub',
        description: 'A place to rest, recover and reconnect',
        href: '/services#hub',
        icon: 'home',
        tone: 'teal',
      },
      {
        label: 'Research, evaluation and policy',
        description: 'Evidence that changes what happens next',
        href: '/services#research',
        icon: 'chart',
        tone: 'ochre',
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
        label: 'For colleges and universities',
        href: '/for-education',
        icon: 'graduation',
        tone: 'teal',
      },
      { label: 'For partners', href: '/partners', icon: 'bank', tone: 'purple' },
    ],
  },
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
