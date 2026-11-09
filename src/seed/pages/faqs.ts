import type { RequiredDataFromCollectionSlug } from 'payload'

// Questions (Figma 38:826, copy Page 10; answers updated in Website Copy v6.0).
export const faqsPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'Questions',
  slug: 'faqs',
  meta: {
    title: 'Questions | FigCit',
    description: 'Answers to common questions about FigCit, the app, the Hub and working with us.',
  },
  layout: [
    { blockType: 'hero', eyebrow: 'Questions', headline: 'Questions people ask us', art: 'none' },
    {
      blockType: 'faq',
      items: [
        {
          question: 'What is FigCit?',
          answer:
            'FigCit is an adaptive wellbeing and professional services company. We help people manage everyday life through the FigCit App and the FigCit Hub, and we help organisations adapt through FigCit Consulting.',
        },
        {
          question: 'Do I need a diagnosis?',
          answer: 'No. Everything we offer starts from what you need today.',
        },
        {
          question: 'Is FigCit therapy or a medical service?',
          answer:
            'No. We don’t diagnose or treat, and the app is not a medical device. When you need more than everyday support, we point you to the right help, including NHS 111, NHS talking therapies and crisis lines.',
        },
        {
          question: 'Who can see my check-ins?',
          answer: 'Only you. Organisations only ever see anonymised trends for large groups.',
        },
        {
          question: 'Who is FigCit for?',
          answer:
            'Adults aged 18 and over whose day sometimes asks more than they have (and young people aged 16–17 moving from school into college, training or work), and the employers, schools, colleges, universities and services who want to support them. You don’t need a label, and you’ll be welcome whatever your story.',
        },
        {
          question: 'What is a Capacity Fit Profile?',
          answer:
            'A look at your strengths, your needs and how well your work or study environment fits you, with a practical adjustment plan. No diagnosis needed, and it is not a diagnosis.',
        },
        {
          question: 'Where is FigCit available?',
          answer:
            'We’re starting in the UK. The app works in any browser, and we plan to bring FigCit to other countries from 2029.',
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
