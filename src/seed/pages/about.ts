import type { RequiredDataFromCollectionSlug } from 'payload'

import type { ImageIds } from '../images'
import { principles } from './principles'

type PageData = RequiredDataFromCollectionSlug<'pages'>

// About us (Figma 36:466, Website Copy v6.0 "About") and Our team (37:535, copy Page 8).

export const aboutPage = (img: ImageIds): PageData => ({
  title: 'About us',
  slug: 'about',
  meta: {
    title: 'About FigCit | Fix the fit, thrive as you are',
    description:
      'FigCit is an adaptive wellbeing and professional services company working to create a better fit between people and the systems, services and environments in which they live, learn and work.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'About FigCit',
      headline: 'Fix the fit, thrive as you are.',
      highlight: 'thrive as you are.',
      lead: 'FigCit is an adaptive wellbeing and professional services company working to create a better fit between people and the world around them.',
      art: 'centred',
    },
    {
      blockType: 'featureSplit',
      background: 'white',
      intro: {
        eyebrow: 'Who we are',
        heading:
          'We work with young people and adults who find it hard to navigate everyday life, including education, work, relationships, social activities and personal responsibilities.',
      },
      headingStyle: 'statement',
      body: 'These difficulties may be associated with neurodivergence, mental health challenges, individual differences, or the interaction between a person’s circumstances and the systems and environments around them.\n\nPeople think, feel, sense, communicate, learn and function in different ways. Yet many environments, services and systems are built around narrow expectations of how people should function. When people don’t fit those expectations, their strengths can be overlooked, everyday demands can become hard to manage, and their chances to take part and thrive can shrink.\n\nWe believe the fit needs to change. People should not have to carry the whole burden of adapting to systems that do not recognise their needs.',
      image: img['hub-space'],
      imageShape: 'arch',
      accent: 'orange',
    },
    {
      blockType: 'cardGrid',
      background: 'cream',
      intro: { eyebrow: 'What we do' },
      columns: '3',
      cards: [
        {
          icon: 'phone',
          tone: 'purple',
          title: 'FigCit App: everyday support, adapted to you',
          body: 'Your capacity changes from day to day, so your support should too. The app helps you manage the demands of work, study, relationships, social life and everyday responsibilities in a way that fits how you are today.',
          link: { label: 'Learn more', href: '/services/app' },
        },
        {
          icon: 'people',
          tone: 'terracotta',
          title: 'FigCit Consulting: helping systems work better for people',
          body: 'We help organisations, education providers and services understand the people they serve and improve the fit between people’s strengths and capacity, everyday demands and the environment. We help them move from spotting barriers to making practical changes, with clear recommendations, implementation plans and follow-up.',
          link: { label: 'Learn more', href: '/services/consulting' },
        },
        {
          icon: 'home',
          tone: 'teal',
          title: 'FigCit Hub: understand yourself, discover your fit',
          body: 'A sensory-conscious space for connection, collaboration, exploration and rest. It will help people recognise their strengths and interests and explore what fits them better, from subjects, courses and careers to jobs, relationships, homes and communities.',
          link: { label: 'Learn more', href: '/services/hub' },
        },
      ],
    },
    {
      blockType: 'missionVision',
      eyebrow: 'Our mission and vision',
      cards: [
        {
          label: 'Our mission',
          icon: 'target',
          tone: 'purple',
          text: 'We develop adaptive technology, deliver professional consulting, and design environments and services that help people function and thrive in everyday life.',
        },
        {
          label: 'Our vision',
          icon: 'eye',
          tone: 'teal',
          text: 'A world where people can thrive as they are, and systems are designed to work better for the people they serve.',
        },
      ],
    },
    {
      blockType: 'statement',
      background: 'white',
      eyebrow: 'Our purpose',
      text: 'To help people understand themselves, navigate life’s demands and realise their potential, while helping organisations and communities create environments in which more people can take part and thrive.',
    },
    {
      blockType: 'cardGrid',
      background: 'white',
      intro: {
        eyebrow: 'What we believe',
        lead: 'These principles shape how we understand individual needs, assess the fit between people and their environments, make practical recommendations and design solutions for individuals and organisations.',
      },
      columns: '4',
      cards: principles,
    },
    {
      blockType: 'story',
      eyebrow: 'Our story',
      quote:
        '“One afternoon at work, a panic attack turned into a full nervous system shutdown. For three hours I couldn’t move, speak clearly or get myself help. The help I needed only arrived after the crash. And that crash led to two weeks of absence in school and work.”',
      body: 'That afternoon gave me a clear question: what if support started with the capacity a person has right now and the places around them adapted to it? Our 2026 research with CESNE gave that question weight: 73% of 244 people had left a job, course or opportunity because their needs weren’t met. They didn’t need fixing. The fit did.',
      attribution: 'Ganiyat Olatorera Olukemi Kareem, Founder & CEO',
      link: { label: 'Meet our team', href: '/about/team' },
      portrait: img.founder,
      portraitInitials: 'GK',
    },
    {
      blockType: 'approach',
      eyebrow: 'Our approach',
      heading: 'Before any task, FigCit asks four simple questions.',
      questions: [
        { text: 'What matters?' },
        { text: 'What kind of task is it?' },
        { text: 'What can I manage right now?' },
        { text: 'What is my environment like?' },
      ],
      body: 'We bring together understanding of the individual and adaptation of the environment. We seek to understand people’s strengths, experiences, current capacity and the demands they face, and we look at how environments, expectations, services and systems can work better for them. We put this into practice through adaptive technology, professional consulting, training and research, and by designing more responsive programmes, services, products and environments.\n\nOur Capacity Matrix uses your energy and mood to place you in a capacity band, shown as a calm traffic light, then helps you decide what to do next: go ahead, make the task smaller, move it to a better time or place, or rest first. It never scores or labels you.',
      matrix: {
        label: 'Capacity Matrix',
        title: 'Energy × mood, shown as a calm traffic light',
      },
    },
    {
      blockType: 'noteBand',
      background: 'cream',
      style: 'dashed',
      label: 'Looking ahead',
      text: 'We are starting in the UK, but FigCit is built to grow anywhere. The app works in any browser, in any country; our audit and training methods can be licensed to trained consultants; and the Hub model can run in partner spaces in any city.\n\n**Because when we fix the fit, people have more room to thrive as they are.**',
    },
  ],
})

export const teamPage = (img: ImageIds): PageData => ({
  title: 'Our team',
  slug: 'about/team',
  meta: {
    title: 'Our team | FigCit',
    description:
      'Meet the people building FigCit, led by founder and CEO Ganiyat Olatorera Olukemi Kareem.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'About · Our team',
      headline: 'Meet the people building FigCit',
      highlight: 'building FigCit',
      art: 'none',
    },
    {
      blockType: 'profile',
      eyebrow: 'Founder',
      name: 'Ganiyat Olatorera Olukemi Kareem',
      role: 'Founder & CEO',
      quote: 'People don’t need fixing. The fit does.',
      bio: 'Ganiyat founded FigCit after a day at work when a panic attack turned into a full shutdown, and the help she needed only arrived after the crash while awaiting formal Autism/ADHD diagnosis. It showed her, from the inside, something she had seen for years in her work: people being treated as the problem, when the real problem was the fit.\n\nShe is an internationally qualified social worker awaiting her Social Work England license and an applied public health researcher who studied at Newcastle University, with frontline experience in care and NHS settings. In Lagos, she founded Arraka Wellness Hub, a culturally grounded, person-centred wellbeing coordinated service supported by a Tony Elumelu Foundation grant. She also brings product expertise: as a Tech4Dev Women Techsters Fellow in product management, she served as product owner at Decloud23 Technologies, TeliyTech UK and she holds Google certificates in UX design and project management.\n\nAt FigCit, Ganiyat leads strategy, product and research. She created the Capacity Matrix, NUCRIPCE, the Capacity Adaptive Adjustment Model (CAAM) and FITS training: tools that match what people are asked to do to the capacity they have, in spaces that fit. Her work brings together social work values, lived experience and Yoruba knowledge systems, and she is passionate about making support culturally grounded and open to everyone, with or without a diagnosis.',
      shortBio: {
        label: 'Short bio — for events, speaker profiles and social media',
        text: 'Ganiyat Olatorera Olukemi Kareem is the founder and CEO of FigCit. She’s an internationally qualified social worker, applied public health researcher and product owner. She founded Arraka Wellness Hub in Lagos with a Tony Elumelu Foundation grant and created the Capacity Matrix, CAAM and FITS. Her own experience of a shutdown at work drives her mission: support that fits, before the crash.',
      },
      portrait: img.founder,
      portraitInitials: 'GK',
    },
    {
      blockType: 'team',
      background: 'white',
      eyebrow: 'Co-founders and team',
      members: [
        {
          name: '[Name]',
          role: 'Co-founder & Chief Operating Officer',
          bio: 'Leads operations, logistics and procurement. [Short bio]',
          tone: 'purple',
        },
        {
          name: 'Joyce Nanna Ndam',
          role: 'Co-founder & Clinical Safety, Compliance and Partnership Director',
          bio: 'A medical doctor who leads clinical safety, compliance and NHS partnerships. [Short bio]',
          tone: 'teal',
        },
        {
          name: 'Olujuwon Afolabi',
          role: 'Product Designer',
          bio: '[Short bio]',
          tone: 'terracotta',
        },
        { name: 'Olayinka Kareem', role: 'Technical Lead', bio: '[Short bio]', tone: 'ochre' },
        {
          name: '[Name]',
          role: 'Business Developer & Partnership Lead',
          bio: '[Short bio]',
          tone: 'purple',
        },
      ],
      note: 'Advisory board: [names when confirmed]',
    },
    {
      blockType: 'policyLinks',
      eyebrow: 'How we keep people safe',
      text: 'Every service is designed to be safe, trauma-informed and confidential by default and we never ask anyone for a diagnosis.',
      links: [
        { label: 'Safeguarding Policy', href: '/safeguarding' },
        { label: 'Data Protection Policy', href: '/privacy' },
        { label: 'Code of Conduct', href: '/terms' },
        { label: 'Complaints Procedure', href: '/complaints' },
        { label: 'Accessibility Statement', href: '/accessibility' },
      ],
    },
  ],
})
