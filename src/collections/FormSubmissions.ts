import type { CollectionConfig, Field } from 'payload'

import { authenticated } from '@/access'
import { formTypes, iAmOptions, partnershipOptions, sectorOptions } from '@/lib/forms/schemas'

const readOnly = (field: Field): Field =>
  ({ ...field, admin: { ...field.admin, readOnly: true } }) as Field

// Website form submissions. Only admins can read them; the public can't create them
// through the API either: the server action writes them after validation (rules §6).
// Deleted automatically 12 months after they arrive (rules §5, /cron/retention).
export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: { singular: 'Form submission', plural: 'Form submissions' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['form', 'email', 'status', 'createdAt'],
    description: 'Messages sent through the website forms. Deleted automatically after 12 months.',
  },
  access: {
    create: () => false,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Replied', value: 'replied' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    ...(
      [
        {
          name: 'form',
          type: 'select',
          required: true,
          index: true,
          options: formTypes.map((value) => ({ label: value, value })),
        },
        { name: 'firstName', type: 'text' },
        { name: 'name', type: 'text' },
        { name: 'email', type: 'email', required: true },
        { name: 'iAmA', label: 'I am', type: 'select', options: [...iAmOptions] },
        { name: 'ageConfirmed', label: 'Confirmed 16 or over', type: 'checkbox' },
        { name: 'organisation', type: 'text' },
        { name: 'role', type: 'text' },
        { name: 'sector', type: 'select', options: [...sectorOptions] },
        { name: 'topic', label: 'What they’d like to discuss', type: 'textarea' },
        { name: 'adjustments', label: 'Adjustments that would help', type: 'textarea' },
        { name: 'townCity', label: 'Town or city', type: 'text' },
        { name: 'hubUse', label: 'How they might use the Hub', type: 'textarea' },
        {
          name: 'partnershipType',
          label: 'Type of partnership',
          type: 'select',
          options: [...partnershipOptions],
        },
        { name: 'message', type: 'textarea' },
        { name: 'consent', type: 'checkbox', required: true },
      ] satisfies Field[]
    ).map(readOnly),
    {
      // Keyed hash of the sender's IP, used only for rate limiting. Never the raw IP.
      name: 'ipHash',
      type: 'text',
      index: true,
      admin: { hidden: true },
      access: { read: () => false, update: () => false },
    },
  ],
}
