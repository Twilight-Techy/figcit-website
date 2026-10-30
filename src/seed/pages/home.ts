import type { RequiredDataFromCollectionSlug } from 'payload'

import { site } from '@/content/site'

import type { ImageIds } from '../images'
import { principles } from './principles'

// Home page (Figma 31:52, Website Copy v6.0 "Home").
export const homePage = (img: ImageIds): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'Home',
  slug: 'home',
  meta: { title: site.defaultTitle, description: site.defaultDescription },
  layout: [
    {
      blockType: 'hero',
      headline: 'Everyone has days when the world doesn’t fit.',
      highlight: 'the world doesn’t fit.',
      lead: 'FigCit helps create a better fit between people and the world around them. An app that adapts to your day, consulting and training that help workplaces, colleges and services adapt, and a calm Hub to connect, explore and recharge.',
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
        hint: 'Low energy, lots to do? Try a two-minute reset first.',
      },
    },
    {
      blockType: 'cardGrid',
      background: 'white',
      intro: {
        eyebrow: 'What changes with FigCit',
        heading: 'Support for the whole of life, not just the hard moments',
        lead: 'When support fits, everything else has room to grow. We help people:',
        layout: 'split',
      },
      columns: '3',
      cards: [
        {
          icon: 'leaf',
          tone: 'teal',
          title: 'Feel steadier day to day',
          body: 'Notice how you’re doing and find what helps, before things build up.',
        },
        {
          icon: 'wave',
          tone: 'terracotta',
          title: 'Ease the weight of stress and hard times',
          body: 'Calm ways to pause, rest and feel less alone with what you carry.',
        },
        {
          icon: 'graduation',
          tone: 'purple',
          title: 'Stay in or return to learning',
          body: 'Keep going with school, college, university or a course, or find your way back in.',
        },
        {
          icon: 'briefcase',
          tone: 'ochre',
          title: 'Find work that fits',
          body: 'Stay in work, return to work, or find a role that suits how you work best.',
        },
        {
          icon: 'heart',
          tone: 'terracotta',
          title: 'Build healthy relationships',
          body: 'Find the words to say what you need, and connect with people who get it.',
        },
        { kind: 'photo', image: img['hub-space'] },
      ],
    },
    {
      blockType: 'cardGrid',
      background: 'cream',
      intro: {
        eyebrow: 'How we help',
        heading: 'How we create a better fit',
        lead: 'FigCit combines adaptive technology, professional services and inclusive environments to help people and systems work better together.',
      },
      columns: '3',
      cards: [
        {
          icon: 'phone',
          tone: 'purple',
          title: 'FigCit App',
          body: 'Everyday support, adapted to you. Support for work, study, relationships and everyday life that responds to how you are today, before things reach a crisis point.',
          badge: 'Launching 2027',
          link: { label: 'Learn more', href: '/services/app' },
        },
        {
          icon: 'people',
          tone: 'terracotta',
          title: 'FigCit Consulting',
          body: 'Building systems that work for people. Audits, training, programme design, evaluation, research and policy that help organisations adapt to the people they serve.',
          link: { label: 'Learn more', href: '/services/consulting' },
        },
        {
          icon: 'home',
          tone: 'teal',
          title: 'FigCit Hub',
          body: 'A space to connect, explore and recharge. A sensory-conscious place to cowork, collaborate, discover what fits you, or simply take a break.',
          badge: 'Pilot opens January 2028',
          link: { label: 'Learn more', href: '/services/hub' },
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
        {
          icon: 'graduation',
          title: 'For my school, college or university',
          href: '/for-education',
        },
        { icon: 'bank', title: 'For government, NHS or funders', href: '/partners' },
      ],
    },
    {
      blockType: 'storyTimeline',
      intro: { eyebrow: 'How it feels', heading: 'A day with FigCit' },
      image: img.amira,
      imageBadge: 'Illustrative story',
      moments: [
        {
          time: '8:40',
          dot: 'yellow',
          text: 'Amira, a second-year nursing student juggling placements, deadlines and a part-time job, checks in: low energy, on edge, a noisy placement ahead. FigCit suggests a two-minute reset and one small first step for her write-up.',
        },
        {
          time: '12:30',
          dot: 'orange',
          text: 'After a hard shift, she sorts her thoughts in Brain Dump and finds the words to ask her mentor for a quieter place to write.',
        },
        {
          time: 'Saturday',
          dot: 'green',
          text: 'She books a quiet session at the FigCit Hub and leaves feeling recharged.',
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
        lead: 'Too many people wait for a diagnosis, an appointment or a crisis before anything changes. By then many have already left a job, a course or the people around them. The Government has now pledged earlier support that doesn’t wait for a diagnosis. FigCit is built for that shift.',
        layout: 'split',
      },
      stats: [
        {
          value: '73%',
          label:
            'of the 244 people we surveyed had left a job, course or opportunity because their needs weren’t met.',
          source: 'Source: FigCit & CESNE, 2026.',
          tone: 'purple',
        },
        {
          value: '70%',
          label:
            'often feel overwhelmed, and two in three spend a lot of daily energy masking how they really feel.',
          source: 'Source: FigCit & CESNE, 2026.',
          tone: 'terracotta',
        },
        {
          value: 'About 1 million',
          label: 'young people aged 16–24 are not in education, employment or training.',
          source: 'Source: DHSC, 2026.',
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
        lead: 'FigCit was shaped from founders lived and professional experiences, in addition with 244 survey respondents, a focus group and 20 people who tested our prototype and rated it 4.25 to 4.55 out of 5. They asked for fewer steps, calmer design and real places to rest, and that’s what we built.',
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
      blockType: 'cardGrid',
      background: 'white',
      intro: {
        eyebrow: 'What we believe',
        heading: 'Fix the fit, thrive as you are.',
        lead: 'People should not have to change who they are just to function in systems that do not recognise their needs. People and systems can both adapt to create a better fit.',
        layout: 'split',
      },
      columns: '4',
      cards: principles,
    },
    {
      blockType: 'ctaBand',
      heading: 'Let’s make life, learning and work fit people.',
      body: 'Helping people thrive. Helping systems adapt.',
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
