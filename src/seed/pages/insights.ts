import type { RequiredDataFromCollectionSlug } from 'payload'

// Insights (Website Copy v6.0, "New Page: Insights"). Lists the six starter posts; each
// becomes its own page once the full article is written.
export const insightsPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'Insights',
  slug: 'insights',
  meta: {
    title: 'FigCit Insights | Articles, research and guides',
    description:
      'Articles, research, policy briefs and practical guides from FigCit on wellbeing, neuroinclusion, reasonable adjustments and making systems fit people.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Insights',
      headline: 'Insights',
      lead: 'Ideas, evidence and practical guides for people, workplaces, schools, colleges and services working to fix the fit.',
      actions: [
        {
          label: 'Get new posts by email',
          href: '/contact#get-early-access',
          variant: 'primary',
          arrow: true,
        },
      ],
      art: 'none',
    },
    {
      blockType: 'cardGrid',
      background: 'white',
      intro: { eyebrow: 'Articles · Research · Policy briefs · Guides', heading: 'Latest posts' },
      columns: '3',
      cards: [
        {
          icon: 'bank',
          tone: 'purple',
          badge: 'Policy brief',
          title: 'From Equality to Equity: reasonable adjustments are not favours',
          body: 'Reasonable adjustments are what fairness looks like when people start from different places. Yet most organisations still wait for a diagnosis before they act. We set out why the law and practice should move from equality to equity.',
        },
        {
          icon: 'chart',
          tone: 'teal',
          badge: 'Research',
          title: 'What 244 people told us about energy, mood and everyday life',
          body: 'Highlights from our 2026 survey with CESNE: why 73% had left a job, course or opportunity, and what people say would help them stay.',
        },
        {
          icon: 'briefcase',
          tone: 'ochre',
          badge: 'Guide',
          title: 'Adjustments without waiting for a diagnosis: a guide for managers',
          body: 'Practical steps to agree, review and record adjustments early, before absence or burnout.',
        },
        {
          icon: 'wave',
          tone: 'terracotta',
          badge: 'Article',
          title: 'Capacity changes. Why support should too',
          body: 'How energy and mood shape what we can manage each day, and how the Capacity Matrix turns that into simple next steps.',
        },
        {
          icon: 'leaf',
          tone: 'ochre',
          badge: 'Guide',
          title: 'Five sensory-friendly changes any workplace can make this month',
          body: 'Low-cost changes to noise, light, space and communication that make a real difference.',
        },
        {
          icon: 'graduation',
          tone: 'terracotta',
          badge: 'Article',
          title: 'What the Independent Review means for employers and colleges',
          body: 'The 2026 Independent Review called for support based on need, not diagnosis. Here is what that means in practice.',
        },
      ],
    },
    {
      blockType: 'ctaBand',
      background: 'cream',
      heading: 'Let’s make life, learning and work fit people.',
      actions: [
        {
          label: 'Book a conversation',
          href: '/contact#book-a-conversation',
          variant: 'primary',
          arrow: true,
        },
        { label: 'Get the app', href: '/download', variant: 'outline' },
      ],
    },
  ],
})
