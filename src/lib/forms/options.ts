// Form types and answer options, shared by the server schemas and the form UI. Kept free
// of Zod so the browser bundle doesn't include the validator.

export const formTypes = [
  'early-access',
  'book-conversation',
  'hub-interest',
  'partner',
  'tester-feedback',
] as const
export type FormType = (typeof formTypes)[number]

// The forms kept in the website's Inbox. Tester feedback goes to the app's backend instead, so
// the team reads all feedback, from the app and the website, in one place (the staff app).
export const inboxFormTypes = [
  'early-access',
  'book-conversation',
  'hub-interest',
  'partner',
] as const

// What kind of feedback, as the backend names them.
export const feedbackKinds = ['broken', 'confusing', 'idea'] as const
export const feedbackKindLabels: Record<(typeof feedbackKinds)[number], string> = {
  broken: 'Something’s broken',
  confusing: 'Something was confusing',
  idea: 'An idea',
}

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
