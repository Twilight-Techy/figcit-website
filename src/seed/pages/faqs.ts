import type { RequiredDataFromCollectionSlug } from 'payload'

// Questions (Figma 38:826, copy Page 10).
export const faqsPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'Questions',
  slug: 'faqs',
  meta: {
    title: 'Questions | Figcit',
    description: 'Answers to common questions about Figcit, the app, the Hub and working with us.',
  },
  layout: [
    { blockType: 'hero', eyebrow: 'Questions', headline: 'Questions people ask us', art: 'none' },
    {
      blockType: 'faq',
      items: [
        {
          question: 'Do I need a diagnosis?',
          answer: 'No. Everything we offer starts from what you need today.',
        },
        {
          question: 'Is Figcit a therapy or a medical service?',
          answer:
            'No. We provide non-clinical support for everyday wellbeing and daily life. We don’t diagnose or treat, and we’ll point you to talking therapies and specialist help when you need more.',
        },
        {
          question: 'Who can see my check-ins?',
          answer: 'Only you. Organisations only ever see anonymised trends for large groups.',
        },
        {
          question: 'Who is Figcit for?',
          answer:
            'Figcit is designed with Young people aged 16 and over and adults living with trauma, mental health conditions or neurodevelopmental differences and the employers, colleges, universities and services that support them. But anyone, anywhere regardless of their condition can use Figcit.',
        },
        {
          question: 'When does the Hub open?',
          answer:
            'Our pilot opens in January 2028 in partner community spaces. Register your interest to hear first.',
        },
        {
          question: 'Does the app use AI?',
          answer: 'Only within fixed limits, and never for safety decisions.',
        },
      ],
      closing: {
        text: 'Something else? Email admin@figcit.co.uk or book a conversation.',
        label: 'Contact us',
        href: '/contact',
      },
    },
  ],
})
