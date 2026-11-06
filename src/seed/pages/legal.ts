import type { RequiredDataFromCollectionSlug } from 'payload'

import { lexical } from '../lib/lexical'

type PageData = RequiredDataFromCollectionSlug<'pages'>

// Legal pages from one template (Figma 39:877), with the wording from "FigCit Website
// Safeguarding Section" (November 2026). Analytics text describes Google Analytics, which
// replaced Plausible after that document was written. [Square brackets] mark facts FigCit
// must still supply; a page with any of them keeps its draft notice.

const LAST_UPDATED = 'Last updated: 6 November 2026'
const EMAIL = '[admin@figcit.co.uk](mailto:admin@figcit.co.uk)'
const EASS = 'Equality Advisory and Support Service (EASS): 0808 800 0082'

type Section = { heading: string; body: string[] }

function legalPage(
  slug: string,
  title: string,
  description: string,
  sections: Section[],
  options: { showCookieSettings?: boolean; notice?: string } = {},
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
        subline: LAST_UPDATED,
        art: 'none',
      },
      {
        blockType: 'legal',
        notice: options.notice,
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
        heading: 'At a glance',
        body: [
          '- We only collect what you type into our forms and, if you accept analytics, how you use this website.\n- We never ask for a diagnosis, health details or your date of birth.\n- We keep form messages for 12 months, then delete them automatically.\n- You can ask to see, correct or delete your information at any time.',
        ],
      },
      {
        heading: '1. Who we are',
        body: [
          'This website is run by FigCit Ltd [company registration status, company number and registered office address]. FigCit decides how the information you give us through this website is used. The FigCit App has its own privacy notice.',
        ],
      },
      {
        heading: '2. What we collect',
        body: [
          'We only collect what you choose to send us through our forms:',
          '- **Get early access:** first name, email, which describes you (individual, student, employer or other), and confirmation that you are 16 or over.\n- **Book a conversation:** name, email, organisation, role, sector, what you would like to discuss, and any adjustments that would help.\n- **Hub interest:** first name, email, town or city, and how you might use the Hub.\n- **Partner with us:** name, email, organisation, type of partnership, and your message.',
          'What we never ask for: a diagnosis, health details or your date of birth.',
          'To stop spam, we keep a scrambled code made from your internet address. We never keep the address itself, and the code cannot be turned back into your address.',
        ],
      },
      {
        heading: '3. Why we use it',
        body: [
          'We use your information to reply to you and to arrange what you asked for. For early access and Hub interest, we also use it to tell you when the app or the Hub is ready.',
          'Our legal reason is your consent. You give it when you tick the box on a form. You can take it back at any time by emailing us.',
          'If you accept analytics cookies, we use Google Analytics to see how visitors use the website, such as which pages they view and which buttons they press. Our legal reason is your consent. Google Analytics does not receive your name, email or anything you type into our forms, and we have turned off its advertising features.',
        ],
      },
      {
        heading: '4. Where it is stored and who helps us',
        body: [
          'Form messages are stored in the UK or EU. We use these companies to run the website:',
          '- **Neon** keeps form messages in our database (London).\n- **Resend** sends form messages to our inbox (EU, Ireland).\n- **Vercel** hosts the website (London).\n- **Google Analytics** shows us how the website is used, only if you accept analytics. Google may store this data outside the UK and EU, with the safeguards UK data protection law requires. See our [Cookies page](/cookies).',
        ],
      },
      {
        heading: '5. How long we keep it',
        body: [
          'We delete form messages automatically 12 months after they arrive. If you ask us to delete your information sooner, we will. We keep analytics data for 14 months.',
        ],
      },
      {
        heading: '6. Your rights',
        body: [
          'You can ask us to:',
          '- show you the information we hold about you\n- correct anything that is wrong\n- delete your information\n- stop using your information\n- stop using it because you have changed your mind (withdraw consent)',
          `Email ${EMAIL} with the subject “Privacy request”. We will reply within one month. We may ask you to confirm who you are first.`,
        ],
      },
      {
        heading: '7. If you are unhappy',
        body: [
          'Please tell us first so we can put it right (see [Complaints and feedback](/complaints)). You can also complain to the Information Commissioner’s Office (ICO) at ico.org.uk or on 0303 123 1113.',
        ],
      },
    ],
    { notice: 'Draft: FigCit’s company details are still to be confirmed.' },
  ),
  legalPage(
    'cookies',
    'Cookies',
    'The cookies this website uses and how to change your choice.',
    [
      {
        heading: 'At a glance',
        body: [
          '- We use one small cookie to remember your choice about analytics.\n- We only load Google Analytics, and its cookies, if you press Accept. If you press Reject, nothing is loaded.\n- You can change your mind at any time on this page.',
        ],
      },
      {
        heading: '1. What we use',
        body: [
          '- **figcit-consent** remembers whether you accepted or rejected analytics, for 180 days. It is needed so the site respects your choice.\n- **_ga and _ga_<ID>** are Google Analytics cookies that tell visits apart, for up to 2 years. They are set only if you choose Accept.\n- **Comfort settings** (low stimulation, text size, theme) save how you like the site to look. This is your choice and not a cookie: it is stored in your browser and never leaves your device.\n- **Admin sign-in cookies** let FigCit staff sign in to admin pages. You will not receive these.',
        ],
      },
      {
        heading: '2. Analytics',
        body: [
          'We use Google Analytics to count visits and see how the website is used. Its advertising features are turned off. We only load it after you choose Accept. If you change your mind later, we stop Google Analytics and delete its cookies.',
        ],
      },
      {
        heading: '3. Change your choice',
        body: ['You can change your choice at any time:'],
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
        heading: 'At a glance',
        body: [
          '- We want everyone to be able to use this website.\n- Use the Comfort button on any page to change how the site looks and feels.\n- If something does not work for you, tell us and we will help you navigate.',
        ],
      },
      {
        heading: '1. Our aim',
        body: [
          'We want this website to work for everyone, whatever their needs. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.',
        ],
      },
      {
        heading: '2. What you can do on this site',
        body: [
          '- Use the Comfort button on every page to turn on low-stimulation mode, choose one of three text sizes, and switch between light and dark themes.\n- Use the whole site with a keyboard or a screen reader.\n- Zoom to 200% and use the site on screens as narrow as 320 pixels.\n- Read text with strong colour contrast (at least 4.5 to 1). Errors are always written in words, never shown by colour alone.\n- Browse without autoplay, carousels or pop-ups. Motion is reduced when your device asks for it.',
        ],
      },
      {
        heading: '3. How we check',
        body: [
          'We check every page with automated accessibility tests in each Comfort mode, on desktop and phone screens, and by keyboard. These checks found no problems. We are always open to feedback or recommendations that make the experience more comfortable.',
        ],
      },
      {
        heading: '4. Tell us about a problem',
        body: [
          `If something does not work for you, or you need information in a different format (for example large print, easy read or audio), email ${EMAIL}. We will reply within 5 working days.`,
          `If you are not happy with our reply, you can contact the ${EASS}.`,
        ],
      },
    ],
  ),
  legalPage('terms', 'Terms of use', 'The terms for using the FigCit website.', [
    {
      heading: 'At a glance',
      body: [
        '- This website gives general information. It is not medical, legal or crisis advice.\n- FigCit is not a crisis or emergency service.\n- Please be kind and respectful to others in all FigCit spaces.',
      ],
    },
    {
      heading: '1. Using this website',
      body: [
        'By using this website, you agree to these terms.',
        '- The information on this site is generally supportive. It is not medical, mental health, legal or employment advice, and it does not replace a professional opinion.\n- We keep the information correct and up to date routinely.\n- Our content, logos and designs belong to FigCit Ltd. Please ask before you copy or reuse them.\n- Do not use the site for anything unlawful, to send spam, or to try to break or overload it.\n- Our site may link to other websites. We are not responsible for their content.\n- We may update these terms. The date at the top of the page shows the latest version.\n- These terms are governed by the laws in the UK.',
      ],
    },
    {
      heading: '2. Not a crisis service',
      body: [
        'FigCit is not a crisis or emergency service.',
        '- **You or someone else is in danger:** call 999.\n- **You need urgent mental health help:** call NHS 111 and choose the mental health option.\n- **You want to talk to someone, any time:** Samaritans, 116 123 (free, 24 hours).\n- **You prefer to text:** text SHOUT to 85258.',
      ],
    },
    {
      heading: '3. Code of conduct',
      body: [
        'FigCit services, events and spaces should feel safe for everyone. This includes this website, our events and training, and the FigCit Hub.',
        'We ask everyone to:',
        '- treat others with respect, patience and kindness\n- respect that people have different needs, and make or accept reasonable adjustments\n- keep other people’s personal stories and details private',
        'We do not accept:',
        '- harassment, bullying, threats or abuse\n- discrimination of any kind\n- sharing someone else’s personal information without their permission\n- misusing our forms or contact details',
        'If someone breaks the code, we may ask them to stop, remove content, end their access or take other action. If you have a concern, see [Safeguarding](/safeguarding) or [Complaints and feedback](/complaints).',
      ],
    },
  ]),
  legalPage(
    'safeguarding',
    'Safeguarding',
    'How FigCit keeps young people and adults safe, and how to raise a concern.',
    [
      {
        heading: 'At a glance',
        body: [
          '- We design every FigCit service to be safe, trauma-informed and confidential.\n- Worried about someone’s safety? Contact our Designated Safeguarding Lead: [name, email, phone].\n- If someone is in immediate danger, call 999.',
        ],
      },
      {
        heading: '1. Our commitment',
        body: [
          'Safeguarding means protecting people from harm, abuse and neglect. Every FigCit service is designed to be safe, trauma-informed and confidential by default. We never ask anyone for a diagnosis.',
          'What this means in practice:',
          '- **A named lead.** We have a Designated Safeguarding Lead and a deputy, and both are trained.\n- **Trained people.** Everyone who works with the public completes safeguarding training and the checks that the law allows for their role.\n- **Clear help when needed.** Our services always show how to reach the NHS, crisis lines and emergency services.\n- **Your information is protected.** Your check-ins in the FigCit App are private. Employers, colleges and partners only ever see anonymous group trends, never individual entries.\n- **One careful exception.** We may share information about a person only when there is a serious and immediate risk to life and no other way to keep them safe. Only our safeguarding lead or clinical safety lead can make that decision, and we record it.',
          'FigCit is not a crisis service. We do not monitor the app and cannot respond to emergencies. Please use the help options in our [Terms of use](/terms).',
        ],
      },
      {
        heading: '2. Young people',
        body: [
          'People aged 16 to 17 join FigCit through their college or another organisation that has safeguarding arrangements in place. We do not offer FigCit directly to anyone under 18, and we do not offer it to anyone under 16.',
          'If you are under 19 and need to talk to someone now, you can call Childline on 0800 1111 (free).',
        ],
      },
      {
        heading: '3. What to report',
        body: [
          'Tell us if you are worried that:',
          '- a child or an adult at risk is being hurt, neglected, abused, controlled or exploited\n- someone is in danger of harming themselves or others\n- someone connected with FigCit has behaved in a way that puts others at risk',
          'You do not need proof. You do not need to be sure. If something worries you, tell us.',
        ],
      },
      {
        heading: '4. How to raise a concern',
        body: [
          'Contact our Designated Safeguarding Lead: [name] at [email] or [phone]. Please tell us what happened, who is involved, and when and where it happened, as far as you know. You can ask us to keep your name private.',
          'If the concern is about our Designated Safeguarding Lead, contact [name and email].',
          'If someone is in immediate danger, call 999.',
        ],
      },
      {
        heading: '5. What happens next',
        body: [
          '1. We acknowledge your message within 1 working day with an automatic reply.\n2. Our Designated Safeguarding Lead reviews it within 24 hours.\n3. If someone may be at risk of serious harm, we refer it to the local authority or the police.\n4. We keep a secure, confidential record and tell you what we can. We may not be able to share details, to protect the people involved.',
          'We will never penalise anyone for raising a genuine concern.',
        ],
      },
      {
        heading: '6. Other places to get help',
        body: [
          '- **Domestic abuse:** National Domestic Abuse Helpline, 0808 2000 247.\n- **Worried about a child:** NSPCC Helpline, 0808 800 5000.\n- **Children and young people:** Childline, 0800 1111.\n- **Emotional support:** Samaritans, 116 123.',
        ],
      },
    ],
    { notice: 'Draft: safeguarding contact details are still to be confirmed.' },
  ),
  legalPage(
    'complaints',
    'Complaints and feedback',
    'How to share feedback or make a complaint, and what happens next.',
    [
      {
        heading: 'At a glance',
        body: [
          '- Tell us what went well and what did not. Both help us improve.\n- We will acknowledge a complaint within 1 working day and reply in full within 20 working days.\n- You can ask for an adjustment, such as a phone call instead of email, or more time.\n- You will never be treated worse for complaining.',
        ],
      },
      {
        heading: '1. Share your feedback',
        body: [
          `We want to hear about your experience of our website, the FigCit App and our services. Email ${EMAIL}.`,
          'Tell us what worked, what did not, and what would make it better. You do not need to give your name. If you want a reply, include an email address.',
        ],
      },
      {
        heading: '2. How to make a complaint',
        body: [
          `Email ${EMAIL} with the subject “Complaint”. Please tell us:`,
          '- what happened and when\n- what you would like us to do about it\n- any adjustment that would help you',
          'If your concern is about someone’s safety, please see [Safeguarding](/safeguarding). Those concerns are handled faster.',
        ],
      },
      {
        heading: '3. What happens next',
        body: [
          '- **Acknowledge:** we reply within 1 working day to say we have your complaint and who is looking at it.\n- **Look into it:** someone who was not involved in what happened will look into it where possible.\n- **Reply in full:** we reply within 20 working days with what we found and what we will do. If we need longer, we will tell you why and give you a new date.\n- **Learn:** we use every complaint and piece of feedback to improve our services.',
        ],
      },
      {
        heading: '4. If you are still unhappy',
        body: [
          'You can ask for your complaint to be reviewed by a director. You can also contact:',
          `- **How we use your personal information:** Information Commissioner’s Office (ICO), ico.org.uk, 0303 123 1113.\n- **Discrimination or reasonable adjustments:** ${EASS}.\n- **A safeguarding concern:** your local council’s safeguarding team, or the police if there is danger.\n- **General advice about your rights:** Citizens Advice.`,
          'If you use FigCit through your employer, college or another organisation, you can also use their complaints process.',
        ],
      },
    ],
  ),
]
