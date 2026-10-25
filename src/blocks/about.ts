import type { Block } from 'payload'

import { imageField, sectionToneField, toneField, validateHref } from './fields'

// Blocks for About us (Figma 36:466) and Our team (37:535).

export const MissionVisionBlock: Block = {
  slug: 'missionVision',
  interfaceName: 'MissionVisionBlock',
  labels: { singular: 'Mission and vision', plural: 'Mission and vision' },
  fields: [
    { name: 'eyebrow', type: 'text', required: true },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'target',
          options: [
            { label: 'Target', value: 'target' },
            { label: 'Eye', value: 'eye' },
          ],
        },
        { name: 'text', type: 'textarea', required: true },
        toneField({ defaultValue: 'purple' }),
      ],
    },
  ],
}

export const StoryBlock: Block = {
  slug: 'story',
  interfaceName: 'StoryBlock',
  labels: { singular: 'Founder story', plural: 'Founder stories' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Our story' },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'body', type: 'textarea' },
    { name: 'attribution', type: 'text' },
    {
      name: 'link',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text', validate: validateHref },
      ],
    },
    imageField('portrait'),
    {
      name: 'portraitInitials',
      type: 'text',
      admin: { description: 'Shown in place of the portrait until a photo is uploaded.' },
    },
  ],
}

export const ApproachBlock: Block = {
  slug: 'approach',
  interfaceName: 'ApproachBlock',
  labels: { singular: 'Approach and Capacity Matrix', plural: 'Approach and Capacity Matrix' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    {
      name: 'questions',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'body', type: 'textarea' },
    {
      name: 'matrix',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Capacity Matrix' },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Energy × mood, shown as a gentle traffic light',
        },
      ],
    },
  ],
}

export const ProfileBlock: Block = {
  slug: 'profile',
  interfaceName: 'ProfileBlock',
  labels: { singular: 'Founder profile', plural: 'Founder profiles' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Founder' },
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      admin: { description: 'Leave a blank line between paragraphs.' },
    },
    { name: 'quote', type: 'text' },
    {
      name: 'shortBio',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Short bio — for events, speaker profiles and social media',
        },
        { name: 'text', type: 'textarea' },
      ],
    },
    imageField('portrait'),
    { name: 'portraitInitials', type: 'text' },
  ],
}

export const TeamBlock: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  labels: { singular: 'Team', plural: 'Teams' },
  fields: [
    sectionToneField,
    { name: 'eyebrow', type: 'text', required: true },
    {
      name: 'members',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: { description: 'Use [Name] until confirmed; it shows as a placeholder.' },
        },
        { name: 'role', type: 'text', required: true },
        { name: 'bio', type: 'textarea' },
        imageField('photo'),
        toneField(),
      ],
    },
    { name: 'note', type: 'text', admin: { description: 'For example the advisory board.' } },
  ],
}

export const PolicyLinksBlock: Block = {
  slug: 'policyLinks',
  interfaceName: 'PolicyLinksBlock',
  labels: { singular: 'Policy links', plural: 'Policy links' },
  fields: [
    { name: 'eyebrow', type: 'text', required: true },
    { name: 'text', type: 'textarea', required: true },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true, validate: validateHref },
      ],
    },
  ],
}

export const aboutBlocks: Block[] = [
  MissionVisionBlock,
  StoryBlock,
  ApproachBlock,
  ProfileBlock,
  TeamBlock,
  PolicyLinksBlock,
]
