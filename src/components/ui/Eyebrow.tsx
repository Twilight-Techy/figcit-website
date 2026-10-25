// Section label with the orange dot (Figma: Ellipse 10px + 14px bold caps). The dot is
// decoration, so low-stimulation mode removes it.
export function Eyebrow({
  children,
  onDark = false,
  as: Tag = 'p',
  className = '',
}: {
  children: React.ReactNode
  onDark?: boolean
  // "span" when the eyebrow is itself the section heading's text.
  as?: 'p' | 'span'
  className?: string
}) {
  return (
    <Tag
      className={`flex items-center gap-2 font-heading text-(length:--fc-text-eyebrow) leading-[1.15] font-bold tracking-(--fc-tracking-eyebrow) uppercase md:gap-2.5 ${
        onDark ? 'text-on-band' : 'text-eyebrow'
      } ${className}`}
    >
      <span aria-hidden className="decorative size-2 shrink-0 rounded-pill bg-orange md:size-2.5" />
      {children}
    </Tag>
  )
}
