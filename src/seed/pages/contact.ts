import type { RequiredDataFromCollectionSlug } from 'payload'

// Contact (Figma 38:604, copy Page 9).
export const contactPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'Contact',
  slug: 'contact',
  meta: {
    title: 'Contact FigCit',
    description:
      'Book a conversation, partner with us or ask a question — we’d love to hear from you.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Contact',
      headline: 'Let’s talk.',
      lead: 'Whether you’re looking for support for yourself, your workplace, your students or the people your service supports, we’d love to hear from you.',
      art: 'contact',
    },
    {
      blockType: 'cardGrid',
      background: 'white',
      intro: { eyebrow: 'Ways to get in touch' },
      columns: '4',
      cardLinkStyle: 'button',
      cards: [
        {
          icon: 'calendar',
          tone: 'purple',
          title: 'Book a conversation',
          body: 'For employers, colleges and universities. Tell us what you’re working on and we’ll arrange a call.',
          link: { label: 'Book a conversation', href: '#book-a-conversation' },
        },
        {
          icon: 'hand',
          tone: 'terracotta',
          title: 'Partner with us',
          body: 'For councils, NHS bodies, programmes, funders and researchers.',
          link: { label: 'Partner with us', href: '#partner-with-us' },
        },
        {
          icon: 'phone',
          tone: 'teal',
          title: 'Get early access',
          body: 'For individuals who want to try the FigCit App first.',
          link: { label: 'Get early access', href: '#get-early-access' },
        },
        {
          icon: 'home',
          tone: 'ochre',
          title: 'Register your Hub interest',
          body: 'Be the first to hear when the FigCit Hub opens.',
          link: { label: 'Register your interest', href: '#hub-interest' },
        },
      ],
    },
    {
      blockType: 'contactForms',
      defaultForm: 'book-conversation',
      asideTitle: 'Need an adjustment?',
      asideText:
        'Need an adjustment to get in touch, such as a call instead of email, extra time or written questions in advance? Just tell us in your message.',
    },
  ],
})
