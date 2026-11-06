import type { RequiredDataFromCollectionSlug } from 'payload'

import type { ImageIds } from '../images'

type PageData = RequiredDataFromCollectionSlug<'pages'>

// FigCit Consulting sub-pages from "Website Pages: Capacity Fit Audit and Capacity Fit
// Profile" v1.0, using the Master Copy name for the individual service, Needs and Fit
// Analysis. Public wording only: no method detail, which stays confidential.

const bookConversation = {
  label: 'Book a conversation',
  href: '/contact#book-a-conversation',
  variant: 'primary',
  arrow: true,
} as const

const startAnalysis = {
  label: 'Start your analysis',
  href: '/contact#book-a-conversation',
  variant: 'primary',
  arrow: true,
} as const

export const capacityFitAuditPage = (img: ImageIds): PageData => ({
  title: 'Capacity Fit Audit',
  slug: 'services/consulting/capacity-fit-audit',
  meta: {
    title: 'Capacity Fit Audit | Reasonable adjustments and inclusion audit | FigCit',
    description:
      'An audit of your organisation, not your people. See where demands, timing and spaces don’t fit the people you serve, and get a practical, costed adjustment plan linked to the Equality Act 2010.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'FigCit Consulting',
      headline: 'Capacity Fit Audit',
      lead: 'We audit the organisation, not its people. Find out where your demands, timing and spaces don’t fit the people who work or study with you, and what to change.',
      actions: [bookConversation],
      art: 'photo',
      image: img['care-team'],
      accent: 'terracotta',
    },
    {
      blockType: 'statement',
      background: 'white',
      eyebrow: 'Why it matters',
      text: 'Many people struggle at work or in study not because they can’t do the job, but because the way it is organised doesn’t fit how they think, feel, sense or work. This shows up as stress, sickness absence, staff leaving, students dropping out and adjustments that arrive too late. The duty to make reasonable adjustments does not wait for a diagnosis or a crisis. The Capacity Fit Audit helps you act early, fairly and in a way you can show.',
    },
    {
      blockType: 'cardGrid',
      background: 'cream',
      intro: { eyebrow: 'What we look at' },
      columns: '3',
      cards: [
        {
          icon: 'briefcase',
          tone: 'purple',
          title: 'Demands',
          body: 'What roles and tasks ask of people, and whether it is realistic.',
        },
        {
          icon: 'calendar',
          tone: 'terracotta',
          title: 'Timing',
          body: 'Workload peaks, shift patterns, deadlines and the pace of change.',
        },
        {
          icon: 'home',
          tone: 'teal',
          title: 'Environment',
          body: 'Noise, light, layout, quiet space and digital tools.',
        },
        {
          icon: 'file',
          tone: 'ochre',
          title: 'Policies and practice',
          body: 'How adjustments are requested, agreed and reviewed, and how long they take.',
        },
        {
          icon: 'message',
          tone: 'blue',
          title: 'Communication and culture',
          body: 'How information is shared and whether people feel able to say what they need.',
        },
      ],
    },
    {
      blockType: 'section',
      background: 'white',
      intro: { eyebrow: 'Four to six weeks', heading: 'How it works' },
      aside: 'none',
      parts: [
        { blockType: 'subheading', text: 'The steps', size: 'hidden' },
        {
          blockType: 'steps',
          layout: 'stacked',
          steps: [
            {
              title: 'Scope.',
              text: 'We agree the questions, who is included and how we keep information safe.',
            },
            {
              title: 'Listen.',
              text: 'People take part anonymously, through a short survey and small group conversations.',
            },
            {
              title: 'Look.',
              text: 'We review your policies and data and walk through your spaces.',
            },
            {
              title: 'Make sense.',
              text: 'We bring the evidence together and agree priorities with you.',
            },
            {
              title: 'Act and review.',
              text: 'You receive the report and plan, with optional quarterly monitoring.',
            },
          ],
        },
      ],
    },
    {
      blockType: 'section',
      background: 'cream',
      intro: { heading: 'What you receive' },
      aside: 'none',
      parts: [
        { blockType: 'subheading', text: 'The audit includes', size: 'hidden' },
        {
          blockType: 'listPanels',
          panels: [
            {
              title: 'Your audit includes',
              style: 'checks',
              items: [
                {
                  text: 'A clear report of where fit is strong and where it breaks down, with a Capacity Fit Score.',
                },
                {
                  text: 'A practical, costed adjustment plan with owners and timelines, linked to the Equality Act 2010.',
                },
                { text: 'A summary you can share with staff, students or your board.' },
                { text: 'Optional quarterly monitoring to show what has changed.' },
              ],
            },
          ],
        },
      ],
    },
    {
      blockType: 'statement',
      background: 'white',
      eyebrow: 'Your people’s privacy',
      text: 'Staff and students take part anonymously. Results are reported only for groups large enough that no one can be identified. We never report on individuals.',
    },
    {
      blockType: 'statement',
      background: 'cream',
      eyebrow: 'Who it’s for',
      text: 'Employers, colleges and universities, health and care providers, councils and public services, and employment programmes.',
    },
    {
      blockType: 'faq',
      items: [
        {
          question: 'Is this a test of our staff?',
          answer: 'No. It audits the organisation: its demands, timing, spaces and processes.',
        },
        {
          question: 'Do people need a diagnosis to take part?',
          answer:
            'No. The audit looks at how well the organisation fits everyone, whether or not they have a diagnosis or have told you about a condition.',
        },
        {
          question: 'How does it link to the Needs and Fit Analysis?',
          answer:
            'The audit looks at the whole organisation. Where individuals would benefit from their own plan, you can offer them a Needs and Fit Analysis, bought on its own or together with the audit.',
        },
        {
          question: 'Does it replace Disability Confident or Thriving at Work?',
          answer: 'No. It helps you meet them, and shows your progress over time.',
        },
      ],
    },
    {
      blockType: 'ctaBand',
      background: 'cream',
      heading: 'Ready to see where the fit breaks down?',
      actions: [bookConversation],
    },
  ],
})

export const needsAndFitAnalysisPage = (img: ImageIds): PageData => ({
  title: 'Needs and Fit Analysis',
  slug: 'services/consulting/needs-and-fit-analysis',
  meta: {
    title: 'Needs and Fit Analysis | Personal workplace and study adjustment plan | FigCit',
    description:
      'Understand your strengths, needs and capacity, and how well your work or study fits you. Get a personal adjustment plan you own. No diagnosis needed.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'FigCit Consulting',
      headline: 'Needs and Fit Analysis',
      lead: 'Understand what you need, how your work or study fits you, and what would help. No diagnosis needed.',
      actions: [
        startAnalysis,
        { label: 'Ask your organisation', href: '#ways-to-access', variant: 'outline' },
      ],
      art: 'photo',
      image: img['lived-experience'],
      accent: 'teal',
    },
    {
      blockType: 'statement',
      background: 'white',
      eyebrow: 'What it is',
      text: 'The Needs and Fit Analysis is a structured assessment of your strengths, your needs and how your capacity changes, and of how well your work or study environment fits you. It ends with a practical adjustment plan that you own. It is not a diagnosis and it is not a personality test. It looks at the fit between you and your environment, because that is usually what can change.',
    },
    {
      blockType: 'statement',
      background: 'cream',
      eyebrow: 'Who it’s for',
      text: 'Anyone who finds that work, study or everyday demands don’t fit how they think, feel, sense or work. This includes people with mental health challenges, neurodivergent people, people waiting for an assessment and people who simply know something isn’t working.',
    },
    {
      blockType: 'section',
      background: 'white',
      intro: { eyebrow: 'Two to four weeks', heading: 'How it works' },
      aside: 'none',
      parts: [
        { blockType: 'subheading', text: 'The steps', size: 'hidden' },
        {
          blockType: 'steps',
          layout: 'stacked',
          steps: [
            {
              title: 'First conversation.',
              text: 'We talk about what’s happening and what you hope to change.',
            },
            {
              title: 'Capacity check-ins.',
              text: 'For two to four weeks you track your energy and mood in the FigCit App.',
            },
            {
              title: 'Needs and fit conversations.',
              text: 'We explore your strengths, what drains you and what your environment asks of you.',
            },
            {
              title: 'Your report.',
              text: 'A clear picture of your needs and where the fit breaks down.',
            },
            {
              title: 'Your plan.',
              text: 'Practical adjustments, with an optional follow-up plan to check they work.',
            },
          ],
        },
      ],
    },
    {
      blockType: 'section',
      background: 'cream',
      intro: { heading: 'What you receive' },
      aside: 'none',
      parts: [
        { blockType: 'subheading', text: 'The analysis includes', size: 'hidden' },
        {
          blockType: 'listPanels',
          panels: [
            {
              title: 'Your analysis includes',
              style: 'checks',
              items: [
                { text: 'A personal needs and fit report. It belongs to you.' },
                {
                  text: 'An adjustment plan you can share with your employer, college or university, only if you choose to.',
                },
                {
                  text: 'Signposting to your GP or other services if you would benefit from more support.',
                },
                {
                  text: 'An optional follow-up plan, with reviews at two weeks, one month, three, six and twelve months, then yearly.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      blockType: 'statement',
      background: 'white',
      eyebrow: 'Your choice, your information',
      text: 'Your full report is yours. If your organisation pays for your analysis, we agree with you at the start what will be shared, and nothing is shared without your consent. Your information is stored securely in the UK.',
    },
    {
      blockType: 'cardGrid',
      anchor: 'ways-to-access',
      background: 'cream',
      intro: { eyebrow: 'Ways to access it' },
      columns: '3',
      cards: [
        {
          icon: 'briefcase',
          tone: 'purple',
          title: 'Through your employer, college or university',
          body: 'Many organisations pay for analyses for their staff or students. Ask your HR team or student support service.',
        },
        {
          icon: 'heart',
          tone: 'teal',
          title: 'Referred by a GP link worker or social prescriber',
          body: 'Ask whether a referral to FigCit is available in your area.',
        },
        {
          icon: 'user',
          tone: 'terracotta',
          title: 'On your own',
          body: '£150–£195, payable in three instalments. Ask us about sponsored places.',
        },
      ],
    },
    {
      blockType: 'faq',
      items: [
        {
          question: 'Do I need a diagnosis?',
          answer:
            'No. Under the Equality Act 2010, what matters is the effect on your day-to-day life, not the label.',
        },
        {
          question: 'Is this a medical assessment?',
          answer:
            'No. We don’t diagnose or treat. If a medical assessment would help, we tell you how to ask for one.',
        },
        {
          question: 'Will my employer see my report?',
          answer:
            'Not unless you agree. Your plan can be shared with your consent so that changes can be made.',
        },
        {
          question: 'Can it help with Access to Work?',
          answer:
            'Your plan can help you describe what you need when you apply to Access to Work, the government scheme that can fund some support at work.',
        },
        {
          question: 'What if my job doesn’t fit me at all?',
          answer:
            'Most misfits can be solved by changing how the work is done. Where they can’t, your plan sets out options. An analysis is never used to decide whether you keep your job.',
        },
      ],
    },
    {
      blockType: 'ctaBand',
      background: 'cream',
      heading: 'Find out what fits you.',
      actions: [startAnalysis, { label: 'Ask a question', href: '/contact', variant: 'outline' }],
    },
  ],
})
