import type { RequiredDataFromCollectionSlug } from 'payload'

import type { ImageIds } from '../images'

// Our Services (Figma 32:121, copy Page 2).
export const servicesPage = (img: ImageIds): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'Our services',
  slug: 'services',
  meta: {
    title: 'Our services | Figcit',
    description:
      'The Figcit app, consulting and training, the Figcit Hub, and research, evaluation and policy are four ways we help people and places fit.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Our services',
      headline: 'Support that fits wherever you are',
      highlight: 'wherever you are',
      lead: 'Some days you need a moment to breathe. Some days your workplace or college needs to change. Our four services work together, so the support you get from us and the changes around you speak the same language.',
      actions: [
        {
          label: 'Get early access',
          href: '/contact#get-early-access',
          variant: 'primary',
          arrow: true,
        },
        { label: 'Book a conversation', href: '/contact#book-a-conversation', variant: 'outline' },
      ],
      art: 'tiles',
      tiles: [
        { label: 'The Figcit app', href: '#app', icon: 'phone', tone: 'purple' },
        {
          label: 'Consulting and training',
          href: '#consulting',
          icon: 'people',
          tone: 'terracotta',
        },
        { label: 'The Figcit Hub', href: '#hub', icon: 'home', tone: 'teal' },
        {
          label: 'Research, evaluation and policy',
          href: '#research',
          icon: 'chart',
          tone: 'ochre',
        },
      ],
    },
    {
      blockType: 'stickyMenu',
      label: 'On this page',
      items: [
        { label: 'App', anchor: 'app' },
        { label: 'Consulting and training', anchor: 'consulting' },
        { label: 'Hub', anchor: 'hub' },
        { label: 'Research', anchor: 'research' },
      ],
    },
    {
      blockType: 'section',
      anchor: 'app',
      background: 'white',
      intro: {
        eyebrow: 'Service 1 · The Figcit app',
        heading: 'Support that fits how you feel right now',
        lead: 'Check in with your energy and mood, and Figcit suggests what will help within the hour: a short reset, a way to sort a busy head, help finding the words, or the smallest next step.',
      },
      aside: 'app',
      besideCount: 2,
      parts: [
        { blockType: 'subheading', text: 'How it works', size: 'small' },
        {
          blockType: 'steps',
          layout: 'stacked',
          steps: [
            {
              title: 'Check in.',
              text: 'Tell us your perceived energy and mood, how you feel at the moment, if you want to.',
            },
            {
              title: 'See your light.',
              text: 'A gentle traffic light shows your capacity right now.',
            },
            {
              title: 'Choose what fits.',
              text: 'Regulate, offload, express, connect, act, reflect or adapt. “Not now” is always an answer.',
            },
          ],
        },
        { blockType: 'subheading', text: 'What’s inside' },
        {
          blockType: 'cards',
          columns: '3',
          cards: [
            {
              icon: 'wave',
              tone: 'teal',
              title: 'Regulate',
              body: 'Short calming resets with sound and breathing, to settle your body and mind.',
            },
            {
              icon: 'cloud',
              tone: 'purple',
              title: 'Brain Dump',
              body: 'Empty a busy head and find one first step you can manage.',
            },
            {
              icon: 'message',
              tone: 'terracotta',
              title: 'Find the words',
              body: 'Help to ask for what you need at work, at college or at home.',
            },
            {
              icon: 'leaf',
              tone: 'green',
              title: 'Gentle by design',
              body: 'No streaks, no guilt, and reminders that respect your energy.',
            },
            {
              icon: 'moon',
              tone: 'blue',
              title: 'Low-stimulation mode',
              body: 'Calm colours, bigger text and less movement.',
            },
            {
              icon: 'shield',
              tone: 'ochre',
              title: 'Safe routes',
              body: 'Clear links to NHS 111, crisis lines and talking therapies when you need more.',
            },
          ],
        },
        { blockType: 'subheading', text: 'Plans' },
        {
          blockType: 'prices',
          tone: 'purple',
          prices: [
            { name: 'Free', price: '£0', note: 'Daily check-in' },
            { name: 'Prime', price: '£7', unit: 'a month', featured: true },
            { name: 'Premium', price: '£13', unit: 'a month' },
            { name: 'Figcit Hub add-on', price: '£8', unit: 'a month', note: 'From January 2028' },
          ],
        },
        {
          blockType: 'note',
          style: 'outlined',
          text: '**Cancel any time.**\n**For organisations:** give your staff or students the app for £6 a person a month. You see anonymised trends only never anyone’s check-ins.',
        },
        {
          blockType: 'actions',
          actions: [
            {
              label: 'Get early access',
              href: '/contact#get-early-access',
              variant: 'primary',
              arrow: true,
            },
          ],
        },
        {
          blockType: 'text',
          style: 'small',
          text: 'Your data is yours. We never sell it. The Figcit app supports wellbeing and daily life; it is not a medical device or an emergency service. People aged 16–17 join through their college or another organisation with safeguarding in place.',
        },
      ],
    },
    {
      blockType: 'section',
      anchor: 'consulting',
      background: 'cream',
      intro: {
        eyebrow: 'Service 2 · Consulting and training',
        heading: 'Adjust before absence, burnout or dropout',
        lead: 'We help employers, colleges and universities see where their demands, spaces and routines don’t fit people and change them, so people stay well, stay in and do their best work.',
        layout: 'split',
      },
      aside: 'none',
      parts: [
        { blockType: 'subheading', text: 'What we offer', size: 'hidden' },
        {
          blockType: 'cards',
          columns: '3',
          cards: [
            {
              tone: 'purple',
              price: 'From £3,000 / organisation',
              title: 'CAAM audit',
              body: 'Our Capacity Adaptive Adjustment Model audit takes four to six weeks. We listen through an anonymous questionnaire, interviews and focus groups, look at your policies and spaces, and give you a clear report with prioritised adjustments, an action plan linked to your Equality Act 2010 duties, and a CAAM score you can track over time.',
            },
            {
              tone: 'terracotta',
              price: 'From £1,200 per group',
              title: 'FITS training',
              body: 'FITS stands for Functioning, Inclusion, Trauma-informed and Sensory-friendly practice. Awareness is a half-day session for all staff. Practitioner is a two-day certified course for managers, HR, tutors and support teams. Licensed CAAM Consultant training follows.',
            },
            {
              tone: 'teal',
              price: '£6 / seat monthly',
              title: 'App seats and monitoring',
              body: 'Figcit app seats support your people every day at £6/seat monthly, and quarterly monitoring (from £400 a month) to show what has changed.',
            },
          ],
        },
        { blockType: 'subheading', text: 'How we work with you' },
        {
          blockType: 'steps',
          layout: 'flow',
          steps: [
            { title: 'A free discovery call' },
            { title: 'A scoped proposal' },
            { title: 'Your CAAM audit' },
            { title: 'Report and FITS training' },
            { title: 'An app pilot' },
            { title: 'Ongoing monitoring' },
          ],
        },
        {
          blockType: 'actions',
          actions: [
            {
              label: 'Book a discovery call',
              href: '/contact#book-a-conversation',
              variant: 'primary',
              arrow: true,
            },
            {
              label: 'Download the brochure',
              href: '/contact#book-a-conversation',
              variant: 'outline',
            },
          ],
          note: 'Organisation prices exclude VAT and depend on size.',
        },
      ],
    },
    {
      blockType: 'section',
      anchor: 'hub',
      background: 'white',
      intro: {
        eyebrow: 'Service 3 · The Figcit Hub',
        heading: 'A place to rest, recover and reconnect',
        badge: 'Pilot opens January 2028',
        lead: 'Life can be loud. The Figcit Hub is a calm, sensory-friendly space where you can put down what you’re carrying before, during or after a separation, study and work. We have series of pop up events that helps release embodied and somatic stress, express unapologetically and authentically and connect with your real self. The You without the trauma, self doubt, negative coping, hopeless or anxiousness: the you that’s ready to thrive and be free.',
      },
      aside: 'photo',
      image: img['hub-space'],
      accent: 'teal',
      besideCount: 0,
      parts: [
        { blockType: 'subheading', text: 'Inside the Hub' },
        {
          blockType: 'cards',
          columns: '4',
          cards: [
            {
              icon: 'moon',
              tone: 'blue',
              title: 'Quiet regulation space',
              body: 'Soft, adjustable lighting and calm-down kits to help your body and mind settle.',
            },
            {
              icon: 'desk',
              tone: 'teal',
              title: 'Sensory-friendly co-working',
              body: 'Somewhere calm to think, study or work at your own pace.',
            },
            {
              icon: 'message',
              tone: 'terracotta',
              title: 'Community corner',
              body: 'Meet people who get it, joining in is always optional.',
            },
            {
              icon: 'cup',
              tone: 'ochre',
              title: 'Light refreshments',
              body: 'Book through the app, which suggests the space that fits your traffic light.',
            },
          ],
        },
        {
          blockType: 'note',
          style: 'tinted',
          icon: 'people',
          text: 'Every session is run by a trained Hub Host, with clear routes to further help if you need it.',
        },
        { blockType: 'subheading', text: 'Ways to join (from January 2028)' },
        {
          blockType: 'prices',
          tone: 'teal',
          prices: [
            { name: 'Add to your app plan', price: '£8', note: 'a month' },
            { name: 'Hub membership', price: '£15', note: 'a month' },
            { name: 'Pay as you go', price: '£6', note: 'a visit' },
            {
              name: 'Sponsored places',
              price: 'Paid for',
              note: 'by employers, colleges and partners',
            },
          ],
        },
        {
          blockType: 'text',
          style: 'body',
          text: 'Our pilot opens in January 2028 in partner community spaces, while we raise funding to open fully. When that funding comes in, members will get big discounts and tailored education and career support.',
        },
        {
          blockType: 'actions',
          buttonTone: 'teal',
          actions: [
            {
              label: 'Register your interest',
              href: '/contact#hub-interest',
              variant: 'primary',
              arrow: true,
            },
          ],
        },
      ],
    },
    {
      blockType: 'section',
      anchor: 'research',
      background: 'cream',
      intro: {
        eyebrow: 'Service 4 · Research, evaluation and policy',
        heading: 'Evidence that changes what happens next',
        lead: 'We measure the difference our work makes and share what we learn, so organisations and government can make better decisions about support and economic participation for young people and adults.',
        layout: 'split',
      },
      aside: 'none',
      parts: [
        { blockType: 'subheading', text: 'What we measure and offer', size: 'hidden' },
        {
          blockType: 'listPanels',
          panels: [
            {
              title: 'What we measure',
              style: 'checks',
              items: [
                { text: 'How people feel day to day' },
                { text: 'Recovery after rest and support' },
                { text: 'Staying in or returning to education, training and work' },
                { text: 'Steady income' },
                { text: 'Healthy relationships' },
                { text: 'Lifestyle, habits and mental clarity' },
                { text: 'Adjustments in place' },
                { text: 'Whether people feel understood' },
              ],
            },
            {
              title: 'What we offer',
              style: 'documents',
              items: [
                { text: 'Evaluation of our services and of partners’ programmes.' },
                {
                  text: 'Studies designed with universities and people with lived experience, and with other research partners.',
                },
                {
                  text: 'Evidence briefings and consultation responses for councils, the NHS and government departments. Our first briefing is planned for 2028.',
                },
              ],
            },
          ],
        },
        {
          blockType: 'text',
          style: 'emphasis',
          text: 'Our research is ethical, accessible and anonymous by default. We never ask anyone for a diagnosis.',
        },
        {
          blockType: 'actions',
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
    },
  ],
})
