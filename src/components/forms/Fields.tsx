import { ChevronIcon } from '@/components/icons'
import { LineIcon } from '@/components/icons/line'

// Form controls from Figma page 11 (39:742). Errors are written in text with an icon,
// never colour alone, and are linked to their field for screen readers (rules §8).

type Common = {
  name: string
  label: string
  error?: string
  optional?: boolean
  defaultValue?: string
}

const control =
  'w-full rounded-control border-[1.5px] bg-surface px-4 text-[1.0625rem] text-ink placeholder:text-ink-muted transition-calm transition-[border-color,box-shadow] focus:border-primary focus:shadow-[0_0_0_3px_var(--fc-focus-halo)] focus:outline-none'

const border = (error?: string) =>
  error ? 'border-tone-terracotta' : 'border-line hover:border-ink/40'

function Label({
  htmlFor,
  label,
  optional,
}: {
  htmlFor: string
  label: string
  optional?: boolean
}) {
  return (
    <label htmlFor={htmlFor} className="font-heading text-[0.9375rem] leading-[1.2] font-bold">
      {label}
      {optional && (
        <span className="ml-1.5 font-body text-sm font-normal text-ink-muted">(optional)</span>
      )}
    </label>
  )
}

export function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <p
      id={id}
      className="flex items-start gap-1.5 text-[0.9375rem] leading-[1.4] font-semibold text-tone-terracotta"
    >
      <LineIcon name="alert" size={16} className="mt-0.5 shrink-0" />
      {error}
    </p>
  )
}

const ids = (form: string, name: string) => ({
  field: `${form}-${name}`,
  error: `${form}-${name}-error`,
})

export function TextField({
  form,
  type = 'text',
  placeholder,
  autoComplete,
  ...p
}: Common & {
  form: string
  type?: 'text' | 'email'
  placeholder?: string
  autoComplete?: string
}) {
  const id = ids(form, p.name)
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id.field} label={p.label} optional={p.optional} />
      <input
        id={id.field}
        name={p.name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={p.defaultValue}
        required={!p.optional}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={p.error ? id.error : undefined}
        className={`${control} ${border(p.error)} h-14`}
      />
      <ErrorText id={id.error} error={p.error} />
    </div>
  )
}

export function TextArea({
  form,
  placeholder,
  ...p
}: Common & { form: string; placeholder?: string }) {
  const id = ids(form, p.name)
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id.field} label={p.label} optional={p.optional} />
      <textarea
        id={id.field}
        name={p.name}
        rows={4}
        placeholder={placeholder}
        defaultValue={p.defaultValue}
        required={!p.optional}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={p.error ? id.error : undefined}
        className={`${control} ${border(p.error)} min-h-[7.5rem] resize-y py-3.5 leading-[1.5]`}
      />
      <ErrorText id={id.error} error={p.error} />
    </div>
  )
}

export function Select({
  form,
  placeholder,
  options,
  ...p
}: Common & { form: string; placeholder: string; options: readonly string[] }) {
  const id = ids(form, p.name)
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id.field} label={p.label} />
      <div className="relative">
        <select
          id={id.field}
          name={p.name}
          defaultValue={p.defaultValue ?? ''}
          required
          aria-invalid={p.error ? true : undefined}
          aria-describedby={p.error ? id.error : undefined}
          className={`${control} ${border(p.error)} h-14 appearance-none pr-12 invalid:text-ink-muted`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
        <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
      </div>
      <ErrorText id={id.error} error={p.error} />
    </div>
  )
}

// "I am a…" pills (Figma 39:742): real radio buttons styled as pills.
export function RadioPills({
  form,
  options,
  ...p
}: Common & { form: string; options: readonly { value: string; label: string }[] }) {
  const id = ids(form, p.name)
  return (
    <fieldset aria-describedby={p.error ? id.error : undefined} className="flex flex-col gap-2.5">
      <legend className="mb-2.5 font-heading text-[0.9375rem] leading-[1.2] font-bold">
        {p.label}
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex min-h-12 cursor-pointer items-center gap-2.5 rounded-pill border-[1.5px] border-line bg-surface px-4 text-[1.0625rem] has-checked:border-primary has-checked:bg-primary/8 has-focus-visible:shadow-[0_0_0_3px_var(--fc-focus-halo)]"
          >
            <input
              type="radio"
              name={p.name}
              value={o.value}
              defaultChecked={p.defaultValue === o.value}
              required
              className="size-[1.125rem] accent-(--fc-primary)"
            />
            {o.label}
          </label>
        ))}
      </div>
      <ErrorText id={id.error} error={p.error} />
    </fieldset>
  )
}

export function Checkbox({ form, ...p }: Common & { form: string }) {
  const id = ids(form, p.name)
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id.field}
        className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-[1.5]"
      >
        <input
          id={id.field}
          type="checkbox"
          name={p.name}
          defaultChecked={p.defaultValue === 'on'}
          required
          aria-invalid={p.error ? true : undefined}
          aria-describedby={p.error ? id.error : undefined}
          className="mt-0.5 size-[1.375rem] shrink-0 cursor-pointer accent-(--fc-primary)"
        />
        <span>{p.label}</span>
      </label>
      <ErrorText id={id.error} error={p.error} />
    </div>
  )
}
