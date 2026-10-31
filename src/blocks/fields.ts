import type { Field, TextFieldSingleValidation } from 'payload'

import type { IconName, Tone } from '@/content/navigation'

// Field helpers shared by the page blocks. Option lists mirror the design so editors
// can only pick icons, colours and layouts that exist in Figma.

const iconNames = [
  'phone',
  'people',
  'home',
  'chart',
  'user',
  'briefcase',
  'graduation',
  'bank',
  'leaf',
  'heart',
  'wave',
] as const satisfies readonly IconName[]

const toneNames = [
  'purple',
  'terracotta',
  'teal',
  'ochre',
  'green',
  'blue',
] as const satisfies readonly Tone[]

// Internal paths ("/services#app"), mail and phone links, or https:// URLs only.
export const validateHref: TextFieldSingleValidation = (value) => {
  if (!value) return true
  return (
    /^(\/(?!\/)|#|https:\/\/|mailto:|tel:)/.test(value) ||
    'Use a path such as /contact, or a full https:// address'
  )
}

export const iconField = (overrides: Partial<Field> = {}): Field =>
  ({
    name: 'icon',
    type: 'select',
    options: iconNames.map((value) => ({ label: value, value })),
    ...overrides,
  }) as Field

export const toneField = (overrides: Partial<Field> = {}): Field =>
  ({
    name: 'tone',
    type: 'select',
    defaultValue: 'purple',
    options: toneNames.map((value) => ({ label: value, value })),
    ...overrides,
  }) as Field

export const sectionToneField: Field = {
  name: 'background',
  type: 'select',
  defaultValue: 'white',
  options: [
    { label: 'White', value: 'white' },
    { label: 'Pith Cream', value: 'cream' },
  ],
}

export const anchorField: Field = {
  name: 'anchor',
  type: 'text',
  admin: { description: 'Optional id for in-page links, for example "app" for /services#app.' },
  validate: (value: string | null | undefined) =>
    !value || /^[a-z0-9-]+$/.test(value) || 'Lower-case letters, numbers and hyphens only',
}

// "href" in the code; editors see "Link" with examples of what they can enter.
const hrefField = {
  name: 'href',
  label: 'Link',
  type: 'text',
  validate: validateHref,
  admin: {
    description:
      'A page such as /contact, a section such as /contact#get-early-access, or a full https:// address.',
  },
} as const

export const linkFields = (name: string, required = false): Field => ({
  name,
  type: 'group',
  fields: [
    { name: 'label', label: 'Link text', type: 'text', required },
    { ...hrefField, required },
  ],
})

export const actionsField = (maxRows = 2): Field => ({
  name: 'actions',
  label: 'Buttons',
  labels: { singular: 'Button', plural: 'Buttons' },
  type: 'array',
  maxRows,
  fields: [
    { name: 'label', label: 'Button text', type: 'text', required: true },
    { ...hrefField, required: true },
    {
      name: 'variant',
      label: 'Style',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Filled', value: 'primary' },
        { label: 'Outline', value: 'outline' },
      ],
    },
    { name: 'arrow', label: 'Show an arrow', type: 'checkbox', defaultValue: false },
  ],
})

export const introField: Field = {
  name: 'intro',
  type: 'group',
  label: 'Section heading',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'The small coloured label above the heading.' },
    },
    {
      name: 'heading',
      type: 'text',
      admin: { description: 'Leave empty to use the eyebrow as the section heading.' },
    },
    { name: 'lead', label: 'Introduction', type: 'textarea' },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'stacked',
      options: [
        { label: 'Heading above text', value: 'stacked' },
        { label: 'Text beside heading', value: 'split' },
        { label: 'Centred', value: 'centred' },
      ],
    },
  ],
}

export const imageField = (name = 'image', required = false): Field => ({
  name,
  type: 'upload',
  relationTo: 'media',
  required,
})
