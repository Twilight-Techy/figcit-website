import type { RequiredDataFromCollectionSlug } from 'payload'

import type { ImageIds } from '../images'

type PageData = RequiredDataFromCollectionSlug<'pages'>

// About us (Figma 36:466, copy Page 7) and Our team (37:535, copy Page 8).

export const aboutPage = (img: ImageIds): PageData => ({
  title: 'About us',
  slug: 'about',
  meta: {
    title: 'About Figcit | Fix the fit, thrive as you are',
    description:
      'Figcit is a social care company helping people with mental health conditions and neurodevelopmental differences and the places around them fit for them.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'About Figcit',
      headline: 'People don’t need fixing. The fit does.',
      highlight: 'The fit does.',
      art: 'centred',
    },
    {
      blockType: 'featureSplit',
      background: 'white',
      intro: {
        eyebrow: 'Who we are',
        heading:
          'Figcit is a social care company for young people and adults living with trauma, mental health conditions and neurodevelopmental differences such as ADHD, autism and dyslexia.',
      },
      headingStyle: 'statement',
      body: 'We help people look after their mental health, ease the weight of stress and trauma, and get through the day, so they can stay in or return to education, training and work, build a sustainable income and keep healthy relationships. We also help the colleges, workplaces and communities around them adapt.\n\nThrough our app, our training and audits, our calm community Hub and our research, we offer support that’s there when it’s needed, with or without a diagnosis. Because people don’t need fixing. The fit does.',
      image: img['hub-space'],
      imageShape: 'arch',
      accent: 'orange',
    },
    {
      blockType: 'missionVision',
      eyebrow: 'Our mission and vision',
      cards: [
        {
          label: 'Our mission',
          icon: 'target',
          tone: 'purple',
          text: 'To make support part of everyday life, so people can look after their wellbeing, stay connected and build the lives they want as they are.',
        },
        {
          label: 'Our vision',
          icon: 'eye',
          tone: 'teal',
          text: 'A world where learning, work and community fit people’s capacity, and no one has to wait for a crisis to get help.',
        },
      ],
    },
    {
      blockType: 'cardGrid',
      background: 'white',
      intro: { eyebrow: 'What we believe' },
      columns: '4',
      cards: [
        {
          icon: 'leaf',
          tone: 'purple',
          title: 'Prevention, not diagnosis',
          body: 'Support starts from what you need today, with or without a label.',
        },
        {
          icon: 'compass',
          tone: 'terracotta',
          title: 'Proactive, not reactive',
          body: 'Places adjust before absence, dropout or crisis.',
        },
        {
          icon: 'heart',
          tone: 'teal',
          title: 'Difference, not deficit',
          body: 'We fix the fit, not the people.',
        },
        {
          icon: 'moon',
          tone: 'ochre',
          title: 'Rest is part of life',
          body: 'Rest, recovery and relaxation are built into how we learn and work.',
        },
      ],
    },
    {
      blockType: 'story',
      eyebrow: 'Our story',
      quote:
        '“One afternoon at work, a panic attack turned into a full nervous system shutdown. For three hours I couldn’t move, speak clearly or get myself help. The help I needed only arrived after the crash. And that crash led to two weeks of absence in school and work.”',
      body: 'That afternoon gave me a clear question: what if support started with the capacity a person has right now and the places around them adapted to it? Our 2026 research with CESNE gave that question weight: 73% of 244 people had left a job, course or opportunity because their needs weren’t met. They didn’t need fixing. The fit did.',
      attribution: 'Ganiyat Olatorera Olukemi Kareem, Founder & CEO',
      link: { label: 'Meet our team', href: '/about/team' },
      portraitInitials: 'GK',
    },
    {
      blockType: 'approach',
      eyebrow: 'Our approach',
      heading: 'Before any task, we ask four questions.',
      questions: [
        { text: 'What matters?' },
        { text: 'What kind of task is it?' },
        { text: 'What can I manage right now?' },
        { text: 'What kind of space am I in?' },
      ],
      body: 'Our Capacity Matrix shows energy and mood as a gentle traffic light, so the task, the timing and the space can be matched to the person. Its sixteen-part design draws on the Yoruba Ifá system as cultural inspiration; our evidence comes from research and evaluation.',
      matrix: {
        label: 'Capacity Matrix',
        title: 'Energy × mood, shown as a gentle traffic light',
      },
    },
    {
      blockType: 'noteBand',
      background: 'cream',
      style: 'dashed',
      label: 'Looking ahead',
      text: '**Figcit Foundation CIC (from late 2028).** A separate community interest company, with its own ownership and finances, that will build on what we learn at the Figcit Hub to help young people into training, education and employment.\n\nAlso on our roadmap: a full Hub launch, voice-first check-ins and wearables, a Training and Research Institute, and work in the US and Africa.',
    },
  ],
})

export const teamPage = (): PageData => ({
  title: 'Our team',
  slug: 'about/team',
  meta: {
    title: 'Our team | Figcit',
    description:
      'Meet the people building Figcit, led by founder and CEO Ganiyat Olatorera Olukemi Kareem.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'About · Our team',
      headline: 'Meet the people building Figcit',
      highlight: 'building Figcit',
      art: 'none',
    },
    {
      blockType: 'profile',
      eyebrow: 'Founder',
      name: 'Ganiyat Olatorera Olukemi Kareem',
      role: 'Founder & CEO',
      quote: 'People don’t need fixing. The fit does.',
      bio: 'Ganiyat founded Figcit after a day at work when a panic attack turned into a full shutdown, and the help she needed only arrived after the crash while awaiting formal Autism/ADHD diagnosis. It showed her, from the inside, something she had seen for years in her work: people being treated as the problem, when the real problem was the fit.\n\nShe is an internationally qualified social worker awaiting her Social Work England license and an applied public health researcher who studied at Newcastle University, with frontline experience in care and NHS settings. In Lagos, she founded Arraka Wellness Hub, a culturally grounded, person-centred wellbeing coordinated service supported by a Tony Elumelu Foundation grant. She also brings product expertise: as a Tech4Dev Women Techsters Fellow in product management, she served as product owner at Decloud23 Technologies, TeliyTech UK and she holds Google certificates in UX design and project management.\n\nAt Figcit, Ganiyat leads strategy, product and research. She created the Capacity Matrix, NUCRIPCE, the Capacity Adaptive Adjustment Model (CAAM) and FITS training: tools that match what people are asked to do to the capacity they have, in spaces that fit. Her work brings together social work values, lived experience and Yoruba knowledge systems, and she is passionate about making support culturally grounded and open to everyone, with or without a diagnosis.',
      shortBio: {
        label: 'Short bio — for events, speaker profiles and social media',
        text: 'Ganiyat Olatorera Olukemi Kareem is the founder and CEO of Figcit. She’s an internationally qualified social worker, applied public health researcher and product owner. She founded Arraka Wellness Hub in Lagos with a Tony Elumelu Foundation grant and created the Capacity Matrix, CAAM and FITS. Her own experience of a shutdown at work drives her mission: support that fits, before the crash.',
      },
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
