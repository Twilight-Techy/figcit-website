import type { RequiredDataFromCollectionSlug } from 'payload'

import { site } from '@/content/site'

import type { ImageIds } from '../images'

// Home page (Figma 31:52, copy Part C "Home").
export const homePage = (img: ImageIds): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'Home',
  slug: 'home',
  meta: { title: site.defaultTitle, description: site.defaultDescription },
  layout: [
    {
      blockType: 'hero',
      headline: 'Everyone has days when the world doesn’t fit.',
      highlight: 'the world doesn’t fit.',
      lead: 'Figcit makes support part of everyday life for young people and adults with mental health conditions and neurodevelopmental differences: an app that meets you where you are, training that helps workplaces and classrooms adapt, a Hub where you can rest and recover, and research that shows what works.',
      actions: [
        {
          label: 'Get early access',
          href: '/contact#get-early-access',
          variant: 'primary',
          arrow: true,
        },
        { label: 'I’m an organisation', href: '/contact#book-a-conversation', variant: 'outline' },
      ],
      art: 'checkIn',
      image: img['rest-at-home'],
      checkIn: {
        label: 'Today’s check-in',
        status: 'Conditional',
        hint: 'Try a two-minute reset first',
      },
    },
    {
      blockType: 'cardGrid',
      background: 'white',
      intro: {
        eyebrow: 'What changes with Figcit',
        heading: 'Support for the whole life, not just the hard moments',
        lead: 'When support fits, everything else has room to grow. We help people:',
        layout: 'split',
      },
      columns: '3',
      cards: [
        {
          icon: 'leaf',
          tone: 'teal',
          title: 'Feel steadier day to day',
          body: 'Notice how you’re doing, look after your mental health and find what helps, before things build up.',
        },
        {
          icon: 'wave',
          tone: 'terracotta',
          title: 'Release the weight of stress and trauma',
          body: 'Calm, safe ways to settle your body and mind, rest and recover, and feel less alone with what you carry.',
        },
        {
          icon: 'graduation',
          tone: 'purple',
          title: 'Stay in or return to learning and training',
          body: 'Keep going to college, university, complete a training or find your way back in.',
        },
        {
          icon: 'briefcase',
          tone: 'ochre',
          title: 'Find work that fits and a steady income',
          body: 'Stay in work, return to work, start a business, or find a role that suits how you work best, so you can build a sustainable income.',
        },
        {
          icon: 'heart',
          tone: 'terracotta',
          title: 'Build healthy relationships',
          body: 'Find the words to say what you need, and connect with people who understand and don’t be ashamed to walk away from unhealthy associations.',
        },
        { kind: 'photo', image: img['hub-space'] },
      ],
    },
    {
      blockType: 'cardGrid',
      background: 'cream',
      intro: { eyebrow: 'How we help', heading: 'Four ways we help people and places fit' },
      columns: '4',
      cards: [
        {
          icon: 'phone',
          tone: 'purple',
          title: 'The Figcit app',
          body: 'Check in with your energy and mood, identify your environment and get support that fits how you feel right now.',
          badge: 'Launching soon',
          link: { label: 'Learn more', href: '/services#app' },
        },
        {
          icon: 'people',
          tone: 'terracotta',
          title: 'Consulting and training',
          body: 'Audits and training that help employers, colleges and universities adapt work and learning before absence, burnout or dropout.',
          link: { label: 'Learn more', href: '/services#consulting' },
        },
        {
          icon: 'home',
          tone: 'teal',
          title: 'The Figcit Hub',
          body: 'A calm, sensory-friendly space to rest, recover and reconnect.',
          badge: 'Pilot opens January 2028',
          link: { label: 'Learn more', href: '/services#hub' },
        },
        {
          icon: 'chart',
          tone: 'ochre',
          title: 'Research, evaluation and policy',
          body: 'We measure what works and share it, so support keeps getting better for everyone and systems can adapt to people.',
          link: { label: 'Learn more', href: '/services#research' },
        },
      ],
      action: { label: 'Explore our services', href: '/services' },
    },
    {
      blockType: 'pathCards',
      intro: { eyebrow: 'Find your path', heading: 'Who are you here for?' },
      paths: [
        { icon: 'user', title: 'For me', href: '/for-you' },
        { icon: 'briefcase', title: 'For my workplace', href: '/for-employers' },
        { icon: 'graduation', title: 'For my college or university', href: '/for-education' },
        { icon: 'bank', title: 'For government, NHS or funders', href: '/partners' },
      ],
    },
    {
      blockType: 'storyTimeline',
      intro: { eyebrow: 'How it feels', heading: 'A day with Figcit' },
      image: img.amira,
      imageBadge: 'Illustrative story',
      moments: [
        {
          time: '8:40',
          dot: 'yellow',
          text: 'Amira, a nursing student waiting for an ADHD assessment, checks in: low energy, anxious, a noisy placement ahead. Figcit suggests a two-minute reset and one small first step for her write-up.',
        },
        {
          time: '12:30',
          dot: 'orange',
          text: 'After a hard shift, she sorts her thoughts in Brain Dump and finds the words to ask her mentor for a quieter place to write.',
        },
        {
          time: 'Saturday',
          dot: 'green',
          text: 'She books a quiet session at the Figcit Hub, rests, and leaves feeling like herself again.',
        },
        {
          time: 'Every month',
          dot: 'purple',
          text: 'Her university sees only anonymised trends, never her check-ins; and uses them to make placements fit students better. No one needed a diagnosis to get help.',
        },
      ],
    },
    {
      blockType: 'stats',
      background: 'white',
      intro: {
        eyebrow: 'Why now',
        heading: 'Help too often arrives after the crash',
        lead: 'Too many people wait for a diagnosis, an appointment or a crisis before anything changes. By then many have already left a job, a course or the people around them. The Government has now pledged earlier support that doesn’t wait for a diagnosis. Figcit is built for that shift.',
        layout: 'split',
      },
      stats: [
        {
          value: '£300bn a year',
          label: 'The cost of mental ill health in England.',
          source: 'Source: Centre for Mental Health, 2024.',
          tone: 'purple',
        },
        {
          value: 'About 1 million',
          label: 'Young people aged 16–24 not in education, employment or training.',
          source: 'Source: Independent Review, DHSC, 2026.',
          tone: 'terracotta',
        },
        {
          value: '73% of 244 people',
          label:
            'We surveyed had left a job, course or opportunity because their needs weren’t met.',
          source: 'Source: Figcit & CESNE survey, 2026.',
          tone: 'teal',
        },
      ],
    },
    {
      blockType: 'featureSplit',
      background: 'cream',
      intro: {
        eyebrow: 'Built with the people it’s for',
        heading: 'Shaped by lived experience',
        lead: 'Figcit was shaped from founders lived and professional experiences, in addition with 244 survey respondents, a focus group and 20 people who tested our prototype and rated it 4.25 to 4.55 out of 5. They asked for fewer steps, calmer design and real places to rest, and that’s what we built.',
      },
      figures: [
        { value: '244', label: 'survey respondents' },
        { value: '20', label: 'prototype testers' },
        { value: '4.25–4.55', label: 'out of 5' },
      ],
      link: { label: 'Read our story', href: '/about' },
      image: img['lived-experience'],
    },
    {
      blockType: 'values',
      eyebrow: 'What we believe',
      headline: 'Fix the fit, thrive as you are.',
      highlight: 'thrive as you are.',
      values: [
        { label: 'Prevention, not diagnosis', tone: 'purple' },
        { label: 'Proactive, not reactive', tone: 'terracotta' },
        { label: 'Difference, not deficit', tone: 'teal' },
        { label: 'Adaptive support, not crisis intervention', tone: 'ochre' },
        { label: 'Support that never has to wait', tone: 'purple' },
      ],
    },
    {
      blockType: 'ctaBand',
      heading: 'Let’s make life, learning and work fit people.',
      actions: [
        {
          label: 'Get early access',
          href: '/contact#get-early-access',
          variant: 'primary',
          arrow: true,
        },
        { label: 'Book a conversation', href: '/contact#book-a-conversation', variant: 'outline' },
      ],
    },
  ],
})
