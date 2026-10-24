import { z } from 'zod'

// The four forms from the website copy (Part B, Forms). Never ask for a diagnosis,
// health details or date of birth (rules §7): there are no fields for them here.

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

const trimmed = (label: string, max: number) =>
  z
    .string({ error: `Enter your ${label}` })
    .trim()
    .min(1, `Enter your ${label}`)
    .max(max, `Your ${label} must be ${max} characters or fewer`)

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `This must be ${max} characters or fewer`)
    .optional()
    .transform((v) => (v ? v : undefined))

const email = z
  .string({ error: 'Enter your email address' })
  .trim()
  .min(1, 'Enter your email address')
  .max(254, 'Enter a shorter email address')
  .email('Enter an email address like name@example.com')

// Checkboxes arrive as "on" when ticked and are missing when not.
const mustTick = (message: string) =>
  z.literal('on', { error: message }).transform(() => true as const)

const consent = mustTick('Tick the box to agree to us storing your details to reply to you')

export const schemas = {
  'early-access': z.object({
    firstName: trimmed('first name', 80),
    email,
    iAmA: z.enum(iAmOptions, { error: 'Choose the option that describes you' }),
    ageConfirmed: mustTick('Confirm you are 16 or over'),
    consent,
  }),
  'book-conversation': z.object({
    name: trimmed('name', 120),
    email,
    organisation: trimmed('organisation', 160),
    role: trimmed('role', 120),
    sector: z.enum(sectorOptions, { error: 'Choose your sector' }),
    topic: trimmed('message about what you’d like to discuss', 2000),
    adjustments: optional(1000),
    consent,
  }),
  'hub-interest': z.object({
    firstName: trimmed('first name', 80),
    email,
    townCity: trimmed('town or city', 120),
    hubUse: optional(1000),
    consent,
  }),
  partner: z.object({
    name: trimmed('name', 120),
    email,
    organisation: trimmed('organisation', 160),
    partnershipType: z.enum(partnershipOptions, { error: 'Choose a type of partnership' }),
    message: trimmed('message', 2000),
    consent,
  }),
} satisfies Record<FormType, z.ZodType>

export type FormInput<T extends FormType> = z.infer<(typeof schemas)[T]>

export type FieldErrors = Record<string, string>

export function validate<T extends FormType>(
  form: T,
  raw: Record<string, unknown>,
): { ok: true; data: FormInput<T> } | { ok: false; errors: FieldErrors } {
  const result = schemas[form].safeParse(raw)
  if (result.success) return { ok: true, data: result.data as FormInput<T> }
  const errors: FieldErrors = {}
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? 'form')
    errors[key] ??= issue.message
  }
  return { ok: false, errors }
}
