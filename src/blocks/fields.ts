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

export const linkFields = (name: string, required = false): Field => ({
  name,
  type: 'group',
  fields: [
    { name: 'label', type: 'text', required },
    { name: 'href', type: 'text', required, validate: validateHref },
  ],
})

export const actionsField = (maxRows = 2): Field => ({
  name: 'actions',
  type: 'array',
  maxRows,
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'href', type: 'text', required: true, validate: validateHref },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Filled', value: 'primary' },
        { label: 'Outline', value: 'outline' },
      ],
    },
    { name: 'arrow', type: 'checkbox', defaultValue: false },
  ],
})

export const introField: Field = {
  name: 'intro',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'lead', type: 'textarea' },
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
