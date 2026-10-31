import type { Block } from 'payload'

import {
  actionsField,
  anchorField,
  iconField,
  imageField,
  introField,
  linkFields,
  sectionToneField,
  toneField,
} from './fields'
import { aboutBlocks } from './about'
import { withRowLabel } from './rowLabel'
import { FaqBlock, LegalBlock } from './text'
import { SectionBlock, StickyMenuBlock, anyIconField } from './section'

// Page sections, one block per section type in the Figma file. Each block has a React
// renderer in src/components/sections; RenderBlocks maps slugs to components.

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text', required: true },
    {
      name: 'highlight',
      type: 'text',
      admin: { description: 'Words at the end of the headline shown in Terracotta Bloom.' },
    },
    { name: 'lead', type: 'textarea' },
    {
      name: 'subline',
      type: 'text',
      admin: {
        description: 'Small line under the headline, for example "Last updated: 1 December 2026".',
      },
    },
    actionsField(2),
    {
      name: 'art',
      type: 'select',
      defaultValue: 'photo',
      options: [
        { label: 'Photo with check-in card', value: 'checkIn' },
        { label: 'Photo', value: 'photo' },
        { label: 'Service tiles', value: 'tiles' },
        { label: 'Centred with circles', value: 'centred' },
        { label: 'Contact details card', value: 'contact' },
        { label: 'None', value: 'none' },
      ],
    },
    imageField('image'),
    {
      name: 'accent',
      type: 'select',
      defaultValue: 'orange',
      admin: { condition: (_, s) => s?.art === 'photo' || s?.art === 'checkIn' },
      options: [
        { label: 'Citrus Orange', value: 'orange' },
        { label: 'Rind Teal', value: 'teal' },
        { label: 'Terracotta Bloom', value: 'terracotta' },
      ],
    },
    {
      name: 'figures',
      type: 'array',
      maxRows: 2,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    { name: 'figuresSource', type: 'text' },
    {
      name: 'checkIn',
      type: 'group',
      admin: { condition: (_, s) => s?.art === 'checkIn' },
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Today’s check-in' },
        { name: 'status', type: 'text', defaultValue: 'Conditional' },
        { name: 'hint', type: 'text', defaultValue: 'Try a two-minute reset first' },
      ],
    },
    {
      name: 'tiles',
      type: 'array',
      maxRows: 4,
      admin: { condition: (_, s) => s?.art === 'tiles' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text' },
        iconField({ required: true }),
        toneField(),
      ],
    },
  ],
}

export const CardGridBlock: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  labels: { singular: 'Card grid', plural: 'Card grids' },
  fields: [
    anchorField,
    sectionToneField,
    introField,
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'kind',
          type: 'select',
          defaultValue: 'card',
          options: [
            { label: 'Card', value: 'card' },
            { label: 'Photo tile', value: 'photo' },
          ],
        },
        anyIconField(),
        toneField(),
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
        { name: 'badge', type: 'text' },
        linkFields('link'),
        imageField('image'),
      ],
    },
    linkFields('action'),
    {
      name: 'cardLinkStyle',
      type: 'select',
      defaultValue: 'arrow',
      options: [
        { label: 'Text link with arrow', value: 'arrow' },
        { label: 'Outline button in the card colour', value: 'button' },
      ],
    },
  ],
}

export const PathCardsBlock: Block = {
  slug: 'pathCards',
  interfaceName: 'PathCardsBlock',
  labels: { singular: 'Path cards', plural: 'Path cards' },
  fields: [
    introField,
    {
      name: 'paths',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        iconField({ required: true }),
        { name: 'title', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}

export const StoryTimelineBlock: Block = {
  slug: 'storyTimeline',
  interfaceName: 'StoryTimelineBlock',
  labels: { singular: 'Story timeline', plural: 'Story timelines' },
  fields: [
    introField,
    imageField('image', true),
    { name: 'imageBadge', type: 'text', defaultValue: 'Illustrative story' },
    {
      name: 'moments',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'time', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
        {
          name: 'dot',
          type: 'select',
          defaultValue: 'purple',
          options: ['yellow', 'orange', 'green', 'purple'].map((value) => ({
            label: value,
            value,
          })),
        },
      ],
    },
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: { singular: 'Stats', plural: 'Stats' },
  fields: [
    sectionToneField,
    introField,
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'textarea', required: true },
        { name: 'source', type: 'text' },
        toneField(),
      ],
    },
  ],
}

export const FeatureSplitBlock: Block = {
  slug: 'featureSplit',
  interfaceName: 'FeatureSplitBlock',
  labels: { singular: 'Text and photo', plural: 'Text and photo' },
  fields: [
    sectionToneField,
    introField,
    {
      name: 'figures',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'headingStyle',
      type: 'select',
      defaultValue: 'heading',
      options: [
        { label: 'Heading', value: 'heading' },
        { label: 'Statement (smaller, for a long sentence)', value: 'statement' },
      ],
    },
    {
      name: 'body',
      type: 'textarea',
      admin: { description: 'Extra paragraphs after the lead. Leave a blank line between them.' },
    },
    linkFields('link'),
    {
      name: 'linkStyle',
      type: 'select',
      defaultValue: 'arrow',
      options: [
        { label: 'Text link with arrow', value: 'arrow' },
        { label: 'Button', value: 'button' },
      ],
    },
    imageField('image', true),
    {
      name: 'imageShape',
      type: 'select',
      defaultValue: 'rounded',
      options: [
        { label: 'Rounded', value: 'rounded' },
        { label: 'Arch', value: 'arch' },
      ],
    },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
    },
    {
      name: 'accent',
      type: 'select',
      defaultValue: 'orange',
      options: [
        { label: 'Citrus Orange', value: 'orange' },
        { label: 'Rind Teal', value: 'teal' },
      ],
    },
  ],
}

export const ValuesBlock: Block = {
  slug: 'values',
  interfaceName: 'ValuesBlock',
  labels: { singular: 'Values', plural: 'Values' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text', required: true },
    { name: 'highlight', type: 'text' },
    {
      name: 'values',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }, toneField()],
    },
  ],
}

export const CtaBandBlock: Block = {
  slug: 'ctaBand',
  interfaceName: 'CtaBandBlock',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Pith Cream', value: 'cream' },
      ],
    },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    actionsField(2),
  ],
}

export const PromiseBlock: Block = {
  slug: 'promise',
  interfaceName: 'PromiseBlock',
  labels: { singular: 'Promise band', plural: 'Promise bands' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    {
      name: 'headline',
      type: 'textarea',
      required: true,
      admin: { description: 'Each line on its own line, for example "No diagnosis."' },
    },
    { name: 'body', type: 'textarea' },
    actionsField(2),
  ],
}

export const NoteBandBlock: Block = {
  slug: 'noteBand',
  interfaceName: 'NoteBandBlock',
  labels: { singular: 'Highlighted note', plural: 'Highlighted notes' },
  fields: [
    sectionToneField,
    {
      name: 'style',
      type: 'select',
      defaultValue: 'crisis',
      options: [
        { label: 'Crisis reminder (heart)', value: 'crisis' },
        { label: 'Quiet aside (dashed)', value: 'dashed' },
      ],
    },
    { name: 'label', type: 'text' },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      admin: { description: 'Blank line between paragraphs; **double asterisks** for bold.' },
    },
  ],
}

export const StatementBlock: Block = {
  slug: 'statement',
  interfaceName: 'StatementBlock',
  labels: { singular: 'Statement', plural: 'Statements' },
  fields: [
    sectionToneField,
    { name: 'eyebrow', type: 'text', required: true },
    { name: 'text', type: 'textarea', required: true },
  ],
}

export const ContactFormsBlock: Block = {
  slug: 'contactForms',
  interfaceName: 'ContactFormsBlock',
  labels: { singular: 'Contact forms', plural: 'Contact forms' },
  fields: [
    {
      name: 'defaultForm',
      type: 'select',
      defaultValue: 'book-conversation',
      options: [
        { label: 'Book a conversation', value: 'book-conversation' },
        { label: 'Partner with us', value: 'partner' },
        { label: 'Get early access', value: 'early-access' },
        { label: 'Hub interest', value: 'hub-interest' },
      ],
    },
    { name: 'asideTitle', type: 'text', defaultValue: 'Need an adjustment?' },
    { name: 'asideText', type: 'textarea' },
  ],
}

export const pageBlocks: Block[] = [
  HeroBlock,
  CardGridBlock,
  PathCardsBlock,
  StoryTimelineBlock,
  StatsBlock,
  FeatureSplitBlock,
  ValuesBlock,
  CtaBandBlock,
  SectionBlock,
  StickyMenuBlock,
  PromiseBlock,
  NoteBandBlock,
  StatementBlock,
  ...aboutBlocks,
  ContactFormsBlock,
  FaqBlock,
  LegalBlock,
].map(withRowLabel)
