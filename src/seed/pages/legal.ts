import type { RequiredDataFromCollectionSlug } from 'payload'

import { lexical } from '../lib/lexical'

type PageData = RequiredDataFromCollectionSlug<'pages'>

// Legal pages from one template (Figma 39:877). The final text is still to be supplied
// by FigCit (copy Part B, "Still to supply"). These drafts describe what the website
// actually does, so the founder and a solicitor have something accurate to edit;
// [square brackets] mark what FigCit must confirm. Each page shows the draft notice.

const NOTICE = 'Draft for review. Final legal page text is still to be supplied by FigCit.'

type Section = { heading: string; body: string[] }

function legalPage(
  slug: string,
  title: string,
  description: string,
  sections: Section[],
  options: { showCookieSettings?: boolean } = {},
): PageData {
  return {
    title,
    slug,
    meta: { title: `${title} | FigCit`, description },
    layout: [
      {
        blockType: 'hero',
        eyebrow: 'Legal',
        headline: title,
        subline: 'Last updated: [date]',
        art: 'none',
      },
      {
        blockType: 'legal',
        notice: NOTICE,
        sections: sections.map((s) => ({ heading: s.heading, body: lexical(...s.body) })),
        showCookieSettings: options.showCookieSettings ?? false,
        showContactDetails: true,
      },
    ],
  }
}

export const legalPages = (): PageData[] => [
  legalPage(
    'privacy',
    'Privacy notice',
    'How FigCit uses and protects the information you share through this website.',
    [
      {
        heading: '1. Who we are',
        body: [
          'This website is run by FigCit Ltd, a company registered in England and Wales [company number, registered office]. FigCit is the controller of the personal data you give us through this website. The FigCit App has its own privacy notice.',
        ],
      },
      {
        heading: '2. What we collect',
        body: [
          'Only what you choose to send us through our forms:',
          '- Get early access: first name, email, which describes you (individual, student, employer or other), and confirmation that you are 16 or over.\n- Book a conversation: name, email, organisation, role, sector, what you would like to discuss and any adjustments that would help.\n- Hub interest: first name, email, town or city and how you might use the Hub.\n- Partner with us: name, email, organisation, type of partnership and your message.',
          'We never ask for a diagnosis, health details or date of birth. To stop spam we keep a one-way scrambled code made from your internet address, never the address itself.',
        ],
      },
      {
        heading: '3. How we use it',
        body: [
          'To reply to you, arrange what you asked for and, for early access and Hub interest, tell you when the app or the Hub is ready. Our lawful basis is your consent, which you give when you tick the box on the form. You can withdraw it at any time by emailing us.',
          'If you accept analytics cookies, we use Google Analytics to see how visitors use the website, such as which pages they view and which buttons they press. Our lawful basis is your consent. Google Analytics does not receive your name, email or anything you type into our forms, and we have turned off its advertising features.',
        ],
      },
      {
        heading: '4. Where we store it',
        body: [
          'Data is stored in the UK or EU. Form messages are kept in our database in London (Neon) and sent to our inbox by Resend from its EU region (Ireland). The website is hosted by Vercel with servers in London.',
          'We delete form messages automatically 12 months after they arrive.',
          'If you accept analytics, Google processes analytics data for us and may store it outside the UK and EU, with the safeguards UK data protection law requires. We keep analytics data for 14 months.',
        ],
      },
      {
        heading: '5. Your rights',
        body: [
          'You can ask to see, correct or delete the information you sent us, or ask us to stop using it. Email us and we will reply within one month.',
          'If you are unhappy with how we use your information, you can complain to the Information Commissioner’s Office at ico.org.uk or on 0303 123 1113.',
        ],
      },
    ],
  ),
  legalPage(
    'cookies',
    'Cookies',
    'The cookies this website uses and how to change your choice.',
    [
      {
        heading: '1. What we use',
        body: [
          '- figcit-consent: remembers whether you accepted or rejected analytics, for 180 days. It is needed for the site to respect your choice.\n- _ga and _ga_<ID>: Google Analytics cookies that tell visits apart, for up to 2 years. Set only if you choose Accept.\n- Comfort settings (low stimulation, text size and theme) are saved in your browser’s local storage, not in a cookie, and never leave your device.\n- Admin sign-in cookies are used only by FigCit staff on the admin pages.',
        ],
      },
      {
        heading: '2. Analytics',
        body: [
          'We only load Google Analytics after you choose Accept. It uses the _ga cookies to count visits and see how the website is used; its advertising features are turned off. If you choose Reject, nothing is loaded, and if you change your mind later we stop Google Analytics and delete its cookies.',
        ],
      },
      {
        heading: '3. Change your choice',
        body: ['You can change your choice at any time below.'],
      },
    ],
    { showCookieSettings: true },
  ),
  legalPage(
    'accessibility',
    'Accessibility statement',
    'How we make this website work for everyone, and how to tell us if something does not.',
    [
      {
        heading: '1. Our aim',
        body: [
          'We want everyone to be able to use this website, whatever their needs. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.',
        ],
      },
      {
        heading: '2. What you can do on this site',
        body: [
          '- Use the Comfort button on every page to turn on low-stimulation mode, choose one of three text sizes, and switch between light and dark themes.\n- Use the whole site with a keyboard or a screen reader.\n- Zoom to 200% and use the site on screens as narrow as 320 pixels.\n- Read text with at least 4.5:1 colour contrast. Errors are always written in words, never shown by colour alone.\n- Browse without autoplay, carousels or pop-ups. Motion is reduced when your device asks for it.',
        ],
      },
      {
        heading: '3. Known issues',
        body: [
          'We check every page with automated accessibility tests in each Comfort mode, on desktop and phone screens, and by keyboard. These checks found no issues. [Confirm after testing with a screen reader and with disabled users.]',
        ],
      },
      {
        heading: '4. Tell us about a problem',
        body: [
          'If something does not work for you, or you need information in a different format, email us. We will reply within [5] working days.',
        ],
      },
    ],
  ),
  legalPage('terms', 'Terms of use', 'The terms for using the FigCit website.', [
    {
      heading: '1. Using this website',
      body: ['[Final text to supply.]'],
    },
    {
      heading: '2. Not a crisis service',
      body: [
        'FigCit is not a crisis or emergency service. If you are in danger, call 999. For urgent mental health help, call NHS 111 and choose option 2. Samaritans: 116 123 (free, 24 hours). Or text SHOUT to 85258.',
      ],
    },
    {
      heading: '3. Code of conduct',
      body: ['[Final text to supply.]'],
    },
  ]),
  legalPage('safeguarding', 'Safeguarding', 'How FigCit keeps young people and adults safe.', [
    {
      heading: '1. Our commitment',
      body: [
        'Every FigCit service is designed to be safe, trauma-informed and confidential by default, and we never ask anyone for a diagnosis. [Final policy text to supply.]',
      ],
    },
    {
      heading: '2. Young people',
      body: [
        'People aged 16–17 join through their college or another organisation with safeguarding in place. [Final text to supply.]',
      ],
    },
    {
      heading: '3. Raising a concern',
      body: [
        'If you are worried about someone’s safety, contact our Designated Safeguarding Lead [name] at [email]. If someone is in immediate danger, call 999.',
      ],
    },
  ]),
  legalPage('complaints', 'Complaints', 'How to make a complaint and what happens next.', [
    {
      heading: '1. How to complain',
      body: [
        'Email us, tell us what happened and what you would like us to do. You can ask for an adjustment, such as a call instead of email or more time. [Final text to supply.]',
      ],
    },
    {
      heading: '2. What happens next',
      body: [
        'We will acknowledge your complaint within [5] working days and reply in full within [20] working days.',
      ],
    },
    {
      heading: '3. If you are still unhappy',
      body: [
        'For complaints about how we use your information, you can contact the Information Commissioner’s Office at ico.org.uk or on 0303 123 1113. [Other routes to supply.]',
      ],
    },
  ]),
]
