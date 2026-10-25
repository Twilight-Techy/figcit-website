import type { Block, Field } from 'payload'

import { lineIconNames } from '@/components/icons/line'

import { actionsField, anchorField, imageField, sectionToneField, toneField } from './fields'

// A page section assembled from smaller parts, for the long pages (Our Services, the
// audience pages). Parts stack in order; an optional illustration or photo sits beside
// the intro and the first parts on wide screens.

const navIcons = [
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
]
const allIcons = [...navIcons, ...lineIconNames].map((value) => ({ label: value, value }))

export const anyIconField = (required = false): Field => ({
  name: 'icon',
  type: 'select',
  required,
  options: allIcons,
})

const SubheadingPart: Block = {
  slug: 'subheading',
  interfaceName: 'SubheadingPart',
  fields: [
    { name: 'text', type: 'text', required: true },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'large',
      options: [
        { label: 'Large', value: 'large' },
        { label: 'Small', value: 'small' },
        { label: 'Screen readers only', value: 'hidden' },
      ],
    },
  ],
}

const StepsPart: Block = {
  slug: 'steps',
  interfaceName: 'StepsPart',
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'stacked',
      options: [
        { label: 'Stacked cards', value: 'stacked' },
        { label: 'Row with arrows', value: 'flow' },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
      ],
    },
  ],
}

const CardsPart: Block = {
  slug: 'cards',
  interfaceName: 'CardsPart',
  fields: [
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: ['2', '3', '4'].map((value) => ({ label: `${value} columns`, value })),
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        anyIconField(),
        toneField(),
        {
          name: 'price',
          type: 'text',
          admin: { description: 'Shown as a coloured label above the title.' },
        },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
}

const PricesPart: Block = {
  slug: 'prices',
  interfaceName: 'PricesPart',
  fields: [
    toneField({ admin: { description: 'Colour of the prices.' } }),
    {
      name: 'prices',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'text', required: true },
        { name: 'unit', type: 'text' },
        { name: 'note', type: 'text' },
        { name: 'featured', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}

const NotePart: Block = {
  slug: 'note',
  interfaceName: 'NotePart',
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'tinted',
      options: [
        { label: 'Tinted', value: 'tinted' },
        { label: 'Outlined', value: 'outlined' },
      ],
    },
    anyIconField(),
    {
      name: 'text',
      type: 'textarea',
      required: true,
      admin: { description: 'Wrap words in **double asterisks** to make them bold.' },
    },
  ],
}

const ActionsPart: Block = {
  slug: 'actions',
  interfaceName: 'ActionsPart',
  fields: [
    actionsField(2),
    toneField({
      name: 'buttonTone',
      defaultValue: 'purple',
      admin: { description: 'Teal buttons are used for Hub actions.' },
    }),
    { name: 'note', type: 'text' },
  ],
}

const TextPart: Block = {
  slug: 'text',
  interfaceName: 'TextPart',
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'body',
      options: [
        { label: 'Body', value: 'body' },
        { label: 'Small print', value: 'small' },
        { label: 'Emphasis', value: 'emphasis' },
      ],
    },
    { name: 'text', type: 'textarea', required: true },
  ],
}

const ListPanelsPart: Block = {
  slug: 'listPanels',
  interfaceName: 'ListPanelsPart',
  fields: [
    {
      name: 'panels',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'checks',
          options: [
            { label: 'Ticks, two columns', value: 'checks' },
            { label: 'Documents, on purple', value: 'documents' },
          ],
        },
        {
          name: 'items',
          type: 'array',
          minRows: 1,
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
  ],
}

export const SectionBlock: Block = {
  slug: 'section',
  interfaceName: 'SectionBlock',
  labels: { singular: 'Section', plural: 'Sections' },
  fields: [
    anchorField,
    sectionToneField,
    {
      name: 'intro',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text', required: true },
        { name: 'badge', type: 'text' },
        { name: 'lead', type: 'textarea' },
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'stacked',
          options: [
            { label: 'Heading above text', value: 'stacked' },
            { label: 'Text beside heading', value: 'split' },
          ],
        },
      ],
    },
    {
      name: 'aside',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'App preview', value: 'app' },
        { label: 'Arched photo', value: 'photo' },
      ],
    },
    {
      ...imageField('image'),
      admin: { condition: (_, s) => s?.aside === 'photo' },
    } as Field,
    {
      ...toneField({ name: 'accent', defaultValue: 'teal' }),
      admin: { condition: (_, s) => s?.aside === 'photo' },
    } as Field,
    {
      name: 'besideCount',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        condition: (_, s) => s?.aside !== 'none',
        description: 'How many parts sit beside the illustration on wide screens.',
      },
    },
    {
      name: 'parts',
      type: 'blocks',
      blocks: [
        SubheadingPart,
        StepsPart,
        CardsPart,
        PricesPart,
        NotePart,
        ActionsPart,
        TextPart,
        ListPanelsPart,
      ],
    },
  ],
}

export const StickyMenuBlock: Block = {
  slug: 'stickyMenu',
  interfaceName: 'StickyMenuBlock',
  labels: { singular: 'In-page menu', plural: 'In-page menus' },
  fields: [
    { name: 'label', type: 'text', defaultValue: 'On this page' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'anchor',
          type: 'text',
          required: true,
          admin: { description: 'The anchor of a section on this page, for example "app".' },
        },
      ],
    },
  ],
}
