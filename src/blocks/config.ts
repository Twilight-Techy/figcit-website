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
    actionsField(2),
    {
      name: 'art',
      type: 'select',
      defaultValue: 'photo',
      options: [
        { label: 'Photo with check-in card', value: 'checkIn' },
        { label: 'Photo', value: 'photo' },
        { label: 'Service tiles', value: 'tiles' },
        { label: 'None', value: 'none' },
      ],
    },
    imageField('image'),
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
        iconField(),
        toneField(),
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
        { name: 'badge', type: 'text' },
        linkFields('link'),
        imageField('image'),
      ],
    },
    linkFields('action'),
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
    linkFields('link'),
    imageField('image', true),
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
  fields: [{ name: 'heading', type: 'text', required: true }, actionsField(2)],
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
]
