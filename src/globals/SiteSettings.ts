import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { safeRevalidate } from '@/hooks/revalidate'

const revalidateSite: GlobalAfterChangeHook = ({ doc, context }) => {
  // Company details appear in the footer on every page.
  safeRevalidate('/', 'layout', context)
  return doc
}

// Organisation details shown in the footer and structured data.
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    { name: 'legalName', type: 'text', required: true, defaultValue: 'Figcit Ltd' },
    {
      name: 'companyNumber',
      type: 'text',
      admin: { description: 'Shown in the footer once entered.' },
      validate: (value: string | null | undefined) =>
        !value || /^[A-Z0-9]{8}$/.test(value) || 'Companies House numbers have 8 characters',
    },
    { name: 'email', type: 'email', required: true, defaultValue: 'admin@figcit.co.uk' },
    { name: 'phone', type: 'text' },
    { name: 'locality', type: 'text', defaultValue: 'Reading' },
    { name: 'region', type: 'text', defaultValue: 'Thames Valley' },
  ],
}
