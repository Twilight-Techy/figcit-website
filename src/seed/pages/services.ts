import type { RequiredDataFromCollectionSlug } from 'payload'

import type { ImageIds } from '../images'

type PageData = RequiredDataFromCollectionSlug<'pages'>

// Our Services (Figma 32:121) and the three service pages from Website Copy v6.0:
// FigCit App, FigCit Consulting (which absorbs research, evaluation and policy) and
// FigCit Hub.

export const servicesPage = (): PageData => ({
  title: 'Our services',
  slug: 'services',
  meta: {
    title: 'Our services | FigCit',
    description:
      'The FigCit App, FigCit Consulting and the FigCit Hub: three ways we create a better fit between people and the systems around them.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Our services',
      headline: 'How we create a better fit',
      highlight: 'a better fit',
      lead: 'FigCit combines adaptive technology, professional services and inclusive environments to help people and systems work better together.',
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
        { label: 'FigCit App', href: '/services/app', icon: 'phone', tone: 'purple' },
        {
          label: 'FigCit Consulting',
          href: '/services/consulting',
          icon: 'people',
          tone: 'terracotta',
        },
        { label: 'FigCit Hub', href: '/services/hub', icon: 'home', tone: 'teal' },
      ],
    },
    {
      blockType: 'cardGrid',
      background: 'white',
      intro: { eyebrow: 'Our services', heading: 'Three services that work together' },
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
    },
  ],
})

export const appPage = (img: ImageIds): PageData => ({
  title: 'FigCit App',
  slug: 'services/app',
  meta: {
    title: 'FigCit App | Everyday support, adapted to you',
    description:
      'Support for work, study, relationships and everyday life that adapts to your energy and mood, before things reach a crisis point. No diagnosis needed. Launching 2027.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Our services · FigCit App',
      headline: 'Everyday support, adapted to you',
      highlight: 'adapted to you',
      lead: 'Support for everyday life, before things reach a crisis point.',
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
      blockType: 'section',
      anchor: 'app',
      background: 'white',
      intro: {
        eyebrow: 'FigCit App · Launching 2027',
        heading: 'Support that responds to how you are today',
        lead: 'The FigCit App helps people navigate the demands of work, study, relationships, social activities and everyday responsibilities in ways that respond to their changing needs and capacity.',
      },
      aside: 'app',
      besideCount: 2,
      parts: [
        {
          blockType: 'text',
          style: 'body',
          text: 'Rather than expecting people to function at the same level every day, the app helps users recognise how they are feeling, understand what they need and identify appropriate ways to manage demands, regulate, communicate, connect and take action.\n\nOur approach recognises that capacity changes. Support should respond to the person and the situation, rather than relying on a one-size-fits-all approach.',
        },
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
              text: 'A calm traffic light shows your capacity band right now.',
            },
            {
              title: 'Choose what fits.',
              text: 'Go ahead, make the task smaller, move it to a better time or place, or rest first. “Not now” is always an answer.',
            },
          ],
        },
        { blockType: 'subheading', text: 'What’s inside' },
        {
          blockType: 'cards',
          columns: '4',
          cards: [
            {
              icon: 'check',
              tone: 'purple',
              title: 'Check in',
              body: 'Tell the app how your energy and mood are. It places you in a capacity band, shown as a calm traffic light, and suggests what will help in the next hour.',
            },
            {
              icon: 'wave',
              tone: 'teal',
              title: 'Calm resets',
              body: 'Short sound and breathing resets to settle your body and mind.',
            },
            {
              icon: 'cloud',
              tone: 'purple',
              title: 'Brain Dump',
              body: 'Empty a busy head, then pick one first step you can manage.',
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
              title: 'Help, fast',
              body: 'NHS 111, Samaritans, SHOUT and NHS talking therapies are always one tap away. If your check-ins have been hard for a while, the app gently shows you your options and explains why. It never tells anyone else unless you choose to.',
            },
            {
              icon: 'file',
              tone: 'teal',
              title: 'Share my summary',
              body: 'Choose to share a summary of your own check-ins with your employer, GP or therapist, so conversations start from what you’ve noticed.',
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
            { name: 'FigCit Hub add-on', price: '£8', unit: 'a month', note: 'From January 2028' },
          ],
        },
        {
          blockType: 'note',
          style: 'outlined',
          text: '**Cancel any time.**\n**For organisations:** give your staff or students the app for £6 a person a month. You see anonymised trends only, never anyone’s check-ins.',
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
          text: 'The FigCit App supports everyday life and wellbeing. It does not diagnose or treat, it is not a medical device or an emergency service, and it is not a substitute for professional care. It works in any browser: open FigCit and add it to your home screen. FigCit is for adults aged 18 and over; young people aged 16–17 moving from school into college, training or work join through their college or another organisation with safeguarding in place.',
        },
      ],
    },
  ],
})

export const consultingPage = (img: ImageIds): PageData => ({
  title: 'FigCit Consulting',
  slug: 'services/consulting',
  meta: {
    title: 'FigCit Consulting | Building systems that work for people',
    description:
      'Capacity Fit Audits, adaptive-environment assessments, FITS training, programme design, evaluation, implementation research and policy for employers, education, health and public services.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Our services · FigCit Consulting',
      headline: 'Building systems that work for people',
      highlight: 'work for people',
      lead: 'We help organisations understand people’s needs and design more responsive services, programmes and environments.',
      actions: [
        {
          label: 'Book a conversation',
          href: '/contact#book-a-conversation',
          variant: 'primary',
          arrow: true,
        },
      ],
      art: 'photo',
      image: img['care-team'],
      accent: 'terracotta',
    },
    {
      blockType: 'section',
      anchor: 'services',
      background: 'cream',
      intro: {
        eyebrow: 'FigCit Consulting',
        heading: 'From identifying problems to making meaningful changes',
        lead: 'FigCit Consulting works with employers, schools, colleges, universities, health and care services, councils and funders to identify barriers, improve accessibility and develop approaches that reflect the needs and experiences of the people they serve, including people with mental health challenges and neurodivergent people. We bring together lived experience, research, systems thinking and practical design, and we help organisations move from identifying problems to making meaningful changes.',
        layout: 'split',
      },
      aside: 'none',
      parts: [
        { blockType: 'subheading', text: 'Our services' },
        {
          blockType: 'cards',
          columns: '3',
          cards: [
            {
              icon: 'search',
              tone: 'purple',
              title: 'Capacity Fit Audits',
              body: 'Accessibility and reasonable-adjustment audits built on our Capacity Adaptive Adjustment Model (CAAM). They show when and where your demands, timing and spaces don’t fit people, how quickly you adapt, and what misfit is costing you. You get a Capacity Fit Score, a demand–capacity map and a costed action plan linked to the Equality Act 2010, with quarterly monitoring.',
            },
            {
              icon: 'home',
              tone: 'teal',
              title: 'Adaptive-environment assessments',
              body: 'A focused review of a building, service or digital space: noise, light, layout, quiet space, signage and digital access, with practical changes.',
            },
            {
              icon: 'people',
              tone: 'terracotta',
              title: 'FITS workforce and professional training',
              body: 'Awareness (half day), Practitioner (two days) and Licensed Capacity Fit Consultant training for managers, HR teams, educators and support staff.',
            },
            {
              icon: 'hand',
              tone: 'green',
              title: 'Health and social prescribing programme and service design',
              body: 'Co-designed pathways, community support and link-worker models for NHS bodies, councils and voluntary sector partners.',
            },
            {
              icon: 'graduation',
              tone: 'ochre',
              title: 'Youth programme design, implementation and evaluation',
              body: 'Programmes that help young people into learning, training and work, and evidence of what works.',
            },
            {
              icon: 'chart',
              tone: 'blue',
              title: 'Implementation research and service evaluation',
              body: 'How and why a programme or service works in practice, carried out with our research partner CESNE and university partners.',
            },
            {
              icon: 'bank',
              tone: 'purple',
              title: 'Policy analysis and development',
              body: 'Reasonable-adjustment, accessibility and service-integration policy for public bodies, employers and sector bodies.',
            },
            {
              icon: 'user',
              tone: 'teal',
              title: 'Needs and Fit Analysis for your staff or students',
              body: 'Individual analyses for people who opt in during or after an audit, delivered through the FigCit Hub, with a personal adjustment plan and optional follow-up. Buy the Capacity Fit Audit and Needs and Fit Analyses together as an annual subscription.',
            },
            {
              icon: 'compass',
              tone: 'terracotta',
              title: 'Research-informed service improvement',
              body: 'Turning audit, evaluation and research findings into a clear implementation plan, with follow-up to check what changed.',
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
            { title: 'Your Capacity Fit Audit' },
            { title: 'Report and FITS training' },
            { title: 'An app pilot' },
            { title: 'Ongoing monitoring' },
          ],
        },
        {
          blockType: 'actions',
          actions: [
            {
              label: 'Book a conversation',
              href: '/contact#book-a-conversation',
              variant: 'primary',
              arrow: true,
            },
          ],
          note: 'Organisation prices exclude VAT and depend on size.',
        },
      ],
    },
    {
      blockType: 'section',
      anchor: 'research',
      background: 'white',
      intro: {
        eyebrow: 'Research, evaluation and policy',
        heading: 'How we measure what changes',
        lead: 'We measure the difference our work makes and share what we learn, so organisations and government can make better decisions about support and participation for young people and adults.',
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
                { text: 'Rest and recharge after support' },
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

export const hubPage = (img: ImageIds): PageData => ({
  title: 'FigCit Hub',
  slug: 'services/hub',
  meta: {
    title: 'FigCit Hub | A space to connect, explore and recharge',
    description:
      'A sensory-conscious space to cowork, collaborate, discover what fits you, connect with others and recharge. Pilot opens January 2028.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Our services · FigCit Hub',
      headline: 'A space to connect, explore and recharge',
      highlight: 'explore and recharge',
      lead: 'A more accommodating place to work, connect, collaborate and recharge. Pilot opens January 2028.',
      actions: [
        {
          label: 'Join the Hub waiting list',
          href: '/contact#hub-interest',
          variant: 'primary',
          arrow: true,
        },
      ],
      art: 'photo',
      image: img['hub-space'],
      accent: 'teal',
    },
    {
      blockType: 'section',
      anchor: 'hub',
      background: 'white',
      intro: {
        eyebrow: 'FigCit Hub',
        heading: 'A place where you don’t have to compromise your wellbeing',
        badge: 'Pilot opens January 2028',
        lead: 'The FigCit Hub will be a welcoming, sensory-conscious place where you can connect with others, work on your own, collaborate, explore your interests and take time to rest. It is designed for different sensory and working preferences, because people need different conditions to feel comfortable, take part and do well.',
      },
      aside: 'none',
      parts: [
        {
          blockType: 'text',
          style: 'body',
          text: 'It will also help you understand yourself and discover your fit: recognising your strengths, talents and interests, and exploring options that suit you better, from subjects and courses to careers, jobs, relationships, homes and communities. Whether you want to cowork, collaborate, discover what works for you, build connections or simply take a break from overwhelming surroundings, the Hub gives you more choice.\n\n**Our aim: a place where you don’t have to compromise your wellbeing to take part in everyday life.**',
        },
        { blockType: 'subheading', text: 'Hub services' },
        {
          blockType: 'cards',
          columns: '4',
          cards: [
            {
              icon: 'message',
              tone: 'terracotta',
              title: 'Connect',
              body: 'Peer support and community: meet people who understand, or have a walk-in conversation with a trained peer worker.',
            },
            {
              icon: 'desk',
              tone: 'teal',
              title: 'Cowork and collaborate',
              body: 'Quiet desks, shared tables and low-pressure spaces to work alone or together.',
            },
            {
              icon: 'compass',
              tone: 'purple',
              title: 'Discover your fit',
              body: 'Explore your strengths, talents and interests, and the courses, careers, jobs, relationships, homes and communities that suit you. Includes our Needs and Fit Analysis.',
            },
            {
              icon: 'moon',
              tone: 'blue',
              title: 'Rest and recharge',
              body: 'A quiet room with adjustable lighting for when everyday life gets loud.',
            },
          ],
        },
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
          text: 'Sessions are run by the FigCit team in 2028, with trained volunteers, and by trained Hub Peer Workers from 2029. Partners such as GP-practice link workers, colleges and employers can refer people, and anyone can walk in.',
        },
      ],
    },
    {
      blockType: 'section',
      anchor: 'needs-and-fit-analysis',
      background: 'cream',
      intro: {
        eyebrow: 'Needs and Fit Analysis',
        heading: 'Struggling at work or in study, but not sure why or what would help?',
        lead: 'You don’t need a diagnosis. Our Needs and Fit Analysis looks at your strengths, what you find hard, how your capacity changes through the week and how well your work or study environment fits you.',
        layout: 'split',
      },
      aside: 'none',
      parts: [
        {
          blockType: 'text',
          style: 'body',
          text: 'You get your own needs and fit report and a practical plan for the adjustments that would help, which you can choose to share with your employer, college or university. Add a follow-up plan to review your progress at two weeks, one month, three, six and twelve months, and every year after that for up to four years.\n\n**How to get one:** refer yourself, ask your GP practice link worker or social prescriber, or ask your employer, college or university. Places can be paid for by you or sponsored by an employer, institution, grant or public programme.',
        },
        {
          blockType: 'text',
          style: 'small',
          text: 'The Needs and Fit Analysis is not a diagnosis. If anything suggests you might benefit from a medical assessment, we’ll help you speak to your GP.',
        },
      ],
    },
    {
      blockType: 'section',
      anchor: 'membership',
      background: 'white',
      intro: { eyebrow: 'Membership', heading: 'Ways to join (from January 2028)' },
      aside: 'none',
      parts: [
        { blockType: 'subheading', text: 'Membership options', size: 'hidden' },
        {
          blockType: 'cards',
          columns: '3',
          cards: [
            { tone: 'purple', title: 'Amethyst', body: 'One Hub service a month.' },
            { tone: 'blue', title: 'Sapphire', body: 'Two Hub services, monthly or yearly.' },
            {
              tone: 'teal',
              title: 'Diamond',
              body: 'All Hub services, weekly, monthly or yearly.',
            },
            { tone: 'ochre', title: 'Pay as you go', body: 'Drop in when you need to.' },
            {
              tone: 'terracotta',
              title: 'App + Hub',
              body: 'Prime + Hub (one or two Hub services) or Premium + Hub (at least two Hub services, or all), together with the FigCit App.',
            },
          ],
        },
        {
          blockType: 'text',
          style: 'body',
          text: 'Prices will be announced when the Hub pilot opens in January 2028. Join the waiting list to hear first.\n\nOur pilot opens in January 2028 in partner community spaces, while we raise funding to open fully. When that funding comes in, members will get big discounts and tailored education and career support.',
        },
        {
          blockType: 'actions',
          buttonTone: 'teal',
          actions: [
            {
              label: 'Join the Hub waiting list',
              href: '/contact#hub-interest',
              variant: 'primary',
              arrow: true,
            },
          ],
        },
      ],
    },
  ],
})
