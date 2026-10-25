import { LineIcon, type LineIconName } from '@/components/icons/line'
import { PhoneIcon } from '@/components/icons'
import { site } from '@/content/site'
import { getSiteSettings } from '@/lib/pages'

// Contact details on Fig Purple (Figma 38:604, hero). Values come from Site settings.
export async function ContactCard() {
  const s = await getSiteSettings()
  const email = s.email || site.email
  const phone = s.phone || site.phone
  const place = `${s.locality || site.locality}, ${s.region || site.region}, UK`
  const rows: { icon: LineIconName | 'phone'; label: string; value: string; href?: string }[] = [
    { icon: 'mail', label: 'Email', value: email, href: `mailto:${email}` },
    { icon: 'phone', label: 'Phone', value: phone, href: `tel:${phone.replace(/\s+/g, '')}` },
    { icon: 'pin', label: 'Based in', value: place },
  ]
  return (
    <ul className="on-dark order-1 flex w-full flex-col gap-5 rounded-card bg-band p-7 text-on-band lg:order-2 lg:max-w-[27.5rem] lg:p-8">
      {rows.map((r) => (
        <li key={r.label} className="flex items-center gap-4">
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-pill bg-on-band/12 text-[#f0b26a]"
          >
            {r.icon === 'phone' ? <PhoneIcon size={20} /> : <LineIcon name={r.icon} size={20} />}
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-sm text-on-band/80">{r.label}</span>
            {r.href ? (
              <a
                href={r.href}
                className="font-heading text-lg leading-[1.3] font-bold break-words hover:underline"
              >
                {r.value}
              </a>
            ) : (
              <span className="font-heading text-lg leading-[1.3] font-bold">{r.value}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}
