// Form types and answer options, shared by the server schemas and the form UI. Kept free
// of Zod so the browser bundle doesn't include the validator.

export const formTypes = ['early-access', 'book-conversation', 'hub-interest', 'partner'] as const
export type FormType = (typeof formTypes)[number]

export const iAmOptions = ['An individual', 'A student', 'An employer', 'Other'] as const
export const sectorOptions = [
  'Health and social care',
  'Employer or workplace',
  'College or university',
  'Council, NHS or public sector',
  'Charity or community',
  'Other',
] as const
export const partnershipOptions = [
  'Programme licences',
  'Training for frontline teams',
  'Sponsored Hub places',
  'Evaluation and evidence',
  'Research partnership',
  'Other',
] as const
