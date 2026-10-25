import type { Block } from 'payload'

import { validateHref } from './fields'

// Questions (Figma 38:826) and the legal page template (39:877).

export const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  labels: { singular: 'Questions', plural: 'Questions' },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    {
      name: 'closing',
      type: 'group',
      fields: [
        { name: 'text', type: 'text' },
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text', validate: validateHref },
      ],
    },
  ],
}

export const LegalBlock: Block = {
  slug: 'legal',
  interfaceName: 'LegalBlock',
  labels: { singular: 'Legal text', plural: 'Legal texts' },
  fields: [
    {
      name: 'notice',
      type: 'text',
      admin: {
        description: 'Shown in an orange box above the text. Remove once the final text is in.',
      },
    },
    {
      name: 'sections',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'richText', required: true },
      ],
    },
    {
      name: 'showCookieSettings',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Adds the controls for changing the analytics choice (Cookies page).' },
    },
    {
      name: 'showContactDetails',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Ends the page with the company contact details from Site settings.' },
    },
  ],
}
