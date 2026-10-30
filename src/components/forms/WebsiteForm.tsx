'use client'

import Link from 'next/link'
import { useActionState, useEffect, useRef } from 'react'

import { submitForm } from '@/actions/forms'
import { ArrowIcon } from '@/components/icons'
import { LineIcon } from '@/components/icons/line'
import { Checkbox, RadioPills, Select, TextArea, TextField } from '@/components/forms/Fields'
import { Turnstile } from '@/components/forms/Turnstile'
import { iAmOptions, partnershipOptions, sectorOptions, type FormType } from '@/lib/forms/options'
import type { SubmitResult } from '@/lib/forms/submit'

// The four website forms (copy Part B, Forms; Figma 39:742 and 38:604). Fields match the
// Zod schemas exactly and there are none for diagnosis, health or date of birth.
// Validation runs on the server; `noValidate` lets our plain-English messages show
// instead of the browser's.

export const formMeta: Record<
  FormType,
  { tab: string; title: string; intro?: string; hash: string }
> = {
  'book-conversation': {
    tab: 'Book a conversation',
    title: 'Book a conversation',
    hash: 'book-a-conversation',
  },
  partner: {
    tab: 'Partner with us',
    title: 'Partner with us',
    intro: 'For councils, NHS bodies, programmes, funders and researchers.',
    hash: 'partner-with-us',
  },
  'early-access': {
    tab: 'Get early access',
    title: 'Get early access',
    intro: 'Be one of the first to try the FigCit App.',
    hash: 'get-early-access',
  },
  'hub-interest': {
    tab: 'Hub interest',
    title: 'Register your Hub interest',
    intro: 'Be the first to hear when the FigCit Hub opens.',
    hash: 'hub-interest',
  },
}

const iAmLabels: Record<(typeof iAmOptions)[number], string> = {
  'An individual': 'Individual',
  'A student': 'Student',
  'An employer': 'Employer',
  Other: 'Other',
}

const submitLabel: Record<FormType, string> = {
  'book-conversation': 'Send',
  partner: 'Send',
  'early-access': 'Get early access',
  'hub-interest': 'Register your interest',
}

export function WebsiteForm({ form, headingLevel = 2 }: { form: FormType; headingLevel?: 2 | 3 }) {
  const [state, action, pending] = useActionState<SubmitResult, FormData>(
    submitForm.bind(null, form),
    { status: 'idle' },
  )
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const meta = formMeta[form]
  const Heading = `h${headingLevel}` as const

  // Move focus to the result so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (state.status === 'error') summaryRef.current?.focus()
    if (state.status === 'success') successRef.current?.focus()
  }, [state])

  if (state.status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="on-dark flex flex-col items-center gap-5 rounded-card bg-band px-8 py-12 text-center text-on-band focus:outline-none"
      >
        <span
          aria-hidden
          className="flex size-[4.75rem] items-center justify-center rounded-pill bg-orange text-ink"
        >
          <LineIcon name="check" size={34} strokeWidth={2.5} />
        </span>
        <Heading className="font-heading text-[1.75rem] leading-[1.2] font-extrabold md:text-[2rem]">
          Thank you — we’ve got it.
        </Heading>
        <p className="max-w-[30rem] text-[1.0625rem] leading-[1.55]">
          We’ll be in touch soon at the email you gave us. If you asked for an adjustment, we’ll use
          it.
        </p>
        <Link
          prefetch={false}
          href="/"
          className="mt-1 rounded-pill bg-on-band px-7 py-4 font-heading leading-5 font-bold text-band hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    )
  }

  const errors = state.status === 'error' ? (state.errors ?? {}) : {}
  const values = state.status === 'error' ? (state.values ?? {}) : {}
  const f = (name: string) => ({ name, error: errors[name], defaultValue: values[name] })

  return (
    <form
      action={action}
      noValidate
      aria-labelledby={`${form}-title`}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-3">
        <Heading
          id={`${form}-title`}
          className="font-heading text-[1.75rem] leading-[1.15] font-bold md:text-[2rem]"
        >
          {meta.title}
        </Heading>
        {meta.intro && <p className="text-[1.0625rem] leading-[1.5]">{meta.intro}</p>}
      </div>

      {state.status === 'error' && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 rounded-control border-[1.5px] border-tone-terracotta bg-surface px-4 py-3.5 text-[1.0625rem] leading-[1.45] font-semibold text-tone-terracotta focus:outline-none"
        >
          <LineIcon name="alert" size={20} className="mt-0.5 shrink-0" />
          {state.message}
        </div>
      )}

      {form === 'book-conversation' && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
            <TextField
              form={form}
              {...f('name')}
              label="Name"
              placeholder="Your name"
              autoComplete="name"
            />
            <TextField
              form={form}
              {...f('email')}
              type="email"
              label="Email"
              placeholder="you@organisation.org"
              autoComplete="email"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
            <TextField
              form={form}
              {...f('organisation')}
              label="Organisation"
              placeholder="Organisation name"
              autoComplete="organization"
            />
            <TextField
              form={form}
              {...f('role')}
              label="Role"
              placeholder="Your role"
              autoComplete="organization-title"
            />
          </div>
          <Select
            form={form}
            {...f('sector')}
            label="Sector"
            placeholder="Choose a sector"
            options={sectorOptions}
          />
          <TextArea
            form={form}
            {...f('topic')}
            label="What you’d like to discuss"
            placeholder="Tell us what you’re working on"
          />
          <TextArea
            form={form}
            {...f('adjustments')}
            optional
            label="Any adjustments that would help"
            placeholder="For example, a call instead of email, extra time or written questions in advance"
          />
          <Checkbox
            form={form}
            {...f('consent')}
            label="I agree to FigCit storing my details to reply to me. We store data in the UK or EU and never ask for a diagnosis or health details."
          />
        </>
      )}

      {form === 'partner' && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
            <TextField
              form={form}
              {...f('name')}
              label="Name"
              placeholder="Your name"
              autoComplete="name"
            />
            <TextField
              form={form}
              {...f('email')}
              type="email"
              label="Email"
              placeholder="you@organisation.org"
              autoComplete="email"
            />
          </div>
          <TextField
            form={form}
            {...f('organisation')}
            label="Organisation"
            placeholder="Organisation name"
            autoComplete="organization"
          />
          <Select
            form={form}
            {...f('partnershipType')}
            label="Type of partnership"
            placeholder="Choose a type"
            options={partnershipOptions}
          />
          <TextArea
            form={form}
            {...f('message')}
            label="Message"
            placeholder="Tell us about your programme"
          />
          <Checkbox
            form={form}
            {...f('consent')}
            label="I agree to FigCit storing my details to reply to me."
          />
        </>
      )}

      {form === 'early-access' && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
            <TextField
              form={form}
              {...f('firstName')}
              label="First name"
              placeholder="Your first name"
              autoComplete="given-name"
            />
            <TextField
              form={form}
              {...f('email')}
              type="email"
              label="Email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <RadioPills
            form={form}
            {...f('iAmA')}
            label="I am a…"
            options={iAmOptions.map((value) => ({ value, label: iAmLabels[value] }))}
          />
          <Checkbox form={form} {...f('ageConfirmed')} label="I confirm I am 16 or over." />
          <Checkbox
            form={form}
            {...f('consent')}
            label="I agree to FigCit storing my details to contact me about early access."
          />
        </>
      )}

      {form === 'hub-interest' && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
            <TextField
              form={form}
              {...f('firstName')}
              label="First name"
              placeholder="Your first name"
              autoComplete="given-name"
            />
            <TextField
              form={form}
              {...f('email')}
              type="email"
              label="Email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <TextField
            form={form}
            {...f('townCity')}
            label="Town or city"
            placeholder="e.g. Reading"
            autoComplete="address-level2"
          />
          <TextArea
            form={form}
            {...f('hubUse')}
            optional
            label="How you might use the Hub"
            placeholder="Rest, co-working, community…"
          />
          <Checkbox
            form={form}
            {...f('consent')}
            label="I agree to FigCit storing my details to contact me about the Hub."
          />
        </>
      )}

      {/* Honeypot: hidden from people and assistive technology; bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <Turnstile />

      <button
        type="submit"
        disabled={pending}
        className={`inline-flex items-center gap-2.5 self-start rounded-pill px-7 py-[1.0625rem] font-heading leading-5 font-bold transition-calm transition-opacity hover:opacity-90 disabled:cursor-progress disabled:opacity-70 ${
          form === 'hub-interest' ? 'bg-disc-teal text-white' : 'bg-primary text-on-primary'
        }`}
      >
        {pending ? 'Sending…' : submitLabel[form]}
        {!pending && <ArrowIcon className="shrink-0" />}
      </button>
    </form>
  )
}
