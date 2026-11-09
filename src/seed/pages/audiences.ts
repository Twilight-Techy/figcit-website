import type { RequiredDataFromCollectionSlug } from 'payload'

import type { ImageIds } from '../images'

type PageData = RequiredDataFromCollectionSlug<'pages'>

// Who we help pages (Figma 33:152, 33:304, 35:328, 35:475; copy Pages 3 to 6).

export const forYouPage = (img: ImageIds): PageData => ({
  title: 'For you',
  slug: 'for-you',
  meta: {
    title: 'Support for you | FigCit',
    description:
      'Support that fits how you feel right now for your emotional and mental health, your nervous system, your senses, your learning, your work and your relationships. No diagnosis needed.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Who we help · For you',
      headline: 'You don’t need fixing. You need support that fits.',
      highlight: 'You need support that fits.',
      lead: 'Whether you’re living with anxiety, unstable mood, trauma, ADHD, autism, dyslexia, dyscalculia or dyspraxia diagnosed or not; FigCit helps you feel steadier, rest and recover, and keep moving towards the life you want.',
      actions: [
        {
          label: 'Get early access',
          href: '/contact#get-early-access',
          variant: 'primary',
          arrow: true,
        },
      ],
      art: 'photo',
      image: img['rest-at-home'],
      accent: 'orange',
    },
    {
      blockType: 'cardGrid',
      background: 'white',
      intro: { eyebrow: 'For you', heading: 'What FigCit can help with' },
      columns: '3',
      cards: [
        {
          icon: 'leaf',
          tone: 'teal',
          title: 'Your mental health',
          body: 'Notice how you’re doing and find what helps today, not weeks from now.',
        },
        {
          icon: 'wave',
          tone: 'terracotta',
          title: 'Stress and trauma',
          body: 'Gentle ways to settle, rest and recover in the app and at the Hub.',
        },
        {
          icon: 'graduation',
          tone: 'purple',
          title: 'Learning and training',
          body: 'Keep going with your course, or find your way back in.',
        },
        {
          icon: 'briefcase',
          tone: 'ochre',
          title: 'Work and income',
          body: 'Stay in work, return to work or find a role that suits how you work best.',
        },
        {
          icon: 'heart',
          tone: 'terracotta',
          title: 'Relationships',
          body: 'Find the words to ask for what you need, and people who understand.',
        },
      ],
      action: { label: 'Capacity Fit Profile', href: '/services/consulting/capacity-fit-profile' },
    },
    {
      blockType: 'promise',
      eyebrow: 'Our promise',
      headline: 'No diagnosis.\nNo waiting.\nNo guilt.',
      body: 'You don’t need a label to get help from FigCit. There are no streaks to keep and no one telling you, you’re behind. You’re not in a competition with anyone. Start with a free check-in and go at your own pace.',
      actions: [
        {
          label: 'Get early access',
          href: '/contact#get-early-access',
          variant: 'primary',
          arrow: true,
        },
        { label: 'Explore the Hub', href: '/services/hub', variant: 'outline' },
      ],
    },
    {
      blockType: 'noteBand',
      background: 'cream',
      text: 'FigCit is not a crisis service. If you are in danger, call 999. For urgent mental health help, call NHS 111 and choose option 2, or call Samaritans free on 116 123.',
    },
  ],
})

export const forEmployersPage = (img: ImageIds): PageData => ({
  title: 'For employers',
  slug: 'for-employers',
  meta: {
    title: 'For employers | FigCit',
    description:
      'Keep your people well and working: audits, training and technology that adapt work to people’s capacity.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Who we help · For employers',
      headline: 'Keep your people well and working.',
      highlight: 'well and working.',
      lead: 'Poor mental health costs UK employers about £51bn a year and every £1 invested in support returns about £4.70. We help you act early, so people stay well, stay in work and do their best work.',
      actions: [
        {
          label: 'Book a discovery call',
          href: '/contact#book-a-conversation',
          variant: 'primary',
          arrow: true,
        },
      ],
      figures: [
        { value: '£51bn', label: 'a year — cost of poor mental health to UK employers' },
        { value: '£4.70', label: 'returned for every £1 invested in support' },
      ],
      figuresSource: 'Source: Deloitte, 2024.',
      art: 'photo',
      image: img['care-team'],
      accent: 'orange',
    },
    {
      blockType: 'cardGrid',
      background: 'white',
      intro: {
        eyebrow: 'What you get',
        heading: 'Audits, training and technology that adapt work to people’s capacity',
      },
      columns: '2',
      cards: [
        {
          icon: 'search',
          tone: 'purple',
          title: 'See where work doesn’t fit',
          body: 'A Capacity Fit Audit shows how your demands, spaces and routines affect people, with adjustments mapped to your Equality Act duties.',
          link: { label: 'Capacity Fit Audit', href: '/services/consulting/capacity-fit-audit' },
        },
        {
          icon: 'people',
          tone: 'terracotta',
          title: 'Confident managers',
          body: 'FITS training gives managers and HR practical, trauma-informed skills.',
        },
        {
          icon: 'phone',
          tone: 'teal',
          title: 'Everyday support for your people',
          body: 'FigCit App seats and, from 2028, sponsored Hub places.',
        },
        {
          icon: 'chart',
          tone: 'ochre',
          title: 'Proof of what changed',
          body: 'Quarterly monitoring and anonymised trends.',
        },
      ],
    },
    {
      blockType: 'featureSplit',
      background: 'cream',
      intro: {
        eyebrow: 'For employers',
        heading: 'Starting with health and social care',
        lead: 'Health and social care teams carry some of the heaviest loads in the country. We are starting with care employers who want to keep their people well and their services strong.',
      },
      link: { label: 'Book a discovery call', href: '/contact#book-a-conversation' },
      linkStyle: 'button',
      image: img['care-team'],
      imageSide: 'left',
      accent: 'teal',
    },
    {
      blockType: 'ctaBand',
      background: 'cream',
      heading: 'Keep your people well and working.',
      actions: [
        {
          label: 'Book a discovery call',
          href: '/contact#book-a-conversation',
          variant: 'primary',
          arrow: true,
        },
        {
          label: 'Explore FigCit Consulting',
          href: '/services/consulting',
          variant: 'outline',
        },
      ],
    },
  ],
})

export const forEducationPage = (img: ImageIds): PageData => ({
  title: 'For colleges and universities',
  slug: 'for-education',
  meta: {
    title: 'For colleges and universities | FigCit',
    description:
      'Keep students learning while they wait: support that doesn’t need a diagnosis, and adjustments that reach tutors fast.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Who we help · For colleges and universities',
      headline: 'Keep students learning while they wait.',
      highlight: 'while they wait.',
      lead: 'Many students wait months or years for an assessment, and many never disclose. FigCit gives them support from day one and helps your staff adapt teaching, placements and assessments, so more students stay, progress and finish.',
      actions: [
        {
          label: 'Book a conversation',
          href: '/contact#book-a-conversation',
          variant: 'primary',
          arrow: true,
        },
      ],
      art: 'photo',
      image: img['lived-experience'],
      accent: 'teal',
    },
    {
      blockType: 'cardGrid',
      background: 'white',
      intro: { eyebrow: 'For colleges and universities', heading: 'What you get' },
      columns: '4',
      cards: [
        {
          icon: 'phone',
          tone: 'purple',
          title: 'Support from day one',
          body: 'The FigCit App for students, no diagnosis needed.',
        },
        {
          icon: 'people',
          tone: 'terracotta',
          title: 'Staff who feel confident',
          body: 'FITS training for tutors, placement teams and student services.',
        },
        {
          icon: 'search',
          tone: 'teal',
          title: 'Clear priorities',
          body: 'A Capacity Fit Audit of learning, placements and assessments, with an action plan.',
          link: { label: 'Capacity Fit Audit', href: '/services/consulting/capacity-fit-audit' },
        },
        {
          icon: 'chart',
          tone: 'ochre',
          title: 'Evidence you can use',
          body: 'Anonymised trends and evaluation that show what works.',
        },
      ],
      action: { label: 'Book a conversation', href: '/contact#book-a-conversation' },
    },
  ],
})

export const partnersPage = (img: ImageIds): PageData => ({
  title: 'For government, NHS and funders',
  slug: 'partners',
  meta: {
    title: 'For government, NHS and funders | FigCit',
    description:
      'Needs-led, non-clinical support from day one with programme licences, training, sponsored Hub places and evaluation.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Who we help · For partners',
      headline: 'Needs-led support, without the wait.',
      highlight: 'without the wait.',
      lead: 'We help councils, NHS bodies, employment programmes and funders give young people and adults support from day one before a crisis, while they wait, and after.',
      actions: [
        {
          label: 'Partner with us',
          href: '/contact#partner-with-us',
          variant: 'primary',
          arrow: true,
        },
      ],
      art: 'photo',
      image: img['partners-meeting'],
      accent: 'terracotta',
    },
    {
      blockType: 'statement',
      background: 'white',
      eyebrow: 'About FigCit',
      text: 'FigCit Ltd is an adaptive wellbeing and professional services company focused on improving the fit between people and the systems, services and environments in which they live, learn and work. We work with young people and adults whose everyday lives are made harder by neurodivergence, mental health challenges, individual differences or environments that do not accommodate them. We combine an adaptive everyday support app, professional consulting (audits, training, programme design, evaluation, research and policy) and a sensory-conscious community Hub. Our support is non-clinical and needs-led, and no diagnosis is required.',
    },
    {
      blockType: 'cardGrid',
      background: 'cream',
      intro: { eyebrow: 'For partners', heading: 'How we can work together' },
      columns: '4',
      cards: [
        {
          icon: 'phone',
          tone: 'purple',
          title: 'Programme licences',
          body: 'The FigCit App for the people your services support.',
        },
        {
          icon: 'people',
          tone: 'terracotta',
          title: 'Training for frontline teams',
          body: 'FITS training for staff, educators and employers.',
        },
        {
          icon: 'home',
          tone: 'teal',
          title: 'Sponsored Hub places',
          body: 'Connect, explore and recharge, for young people and adults (from 2028).',
        },
        {
          icon: 'chart',
          tone: 'ochre',
          title: 'Evaluation and evidence',
          body: 'Measured outcomes and briefings on participation in education, training and work.',
        },
      ],
      action: { label: 'Capacity Fit Audit', href: '/services/consulting/capacity-fit-audit' },
    },
    {
      blockType: 'ctaBand',
      background: 'cream',
      heading: 'Built for the shift that’s coming',
      body: 'Our work reflects what the 2026 Independent Review calls for: support that doesn’t depend on a diagnosis, help while people wait, and participation in education, training and work as the measure of success.',
      actions: [
        {
          label: 'Partner with us',
          href: '/contact#partner-with-us',
          variant: 'primary',
          arrow: true,
        },
      ],
    },
  ],
})
