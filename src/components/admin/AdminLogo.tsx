import { FigCitMark } from '@/components/brand/FigCitMark'

// Login and account screens (Payload admin.components.graphics.Logo).
export function AdminLogo() {
  return (
    <div className="fc-admin-logo">
      <FigCitMark fill="var(--fc-admin-mark)" className="fc-admin-logo__mark" />
      <div>
        <p className="fc-admin-logo__name">FigCit</p>
        <p className="fc-admin-logo__tagline">Website admin</p>
      </div>
    </div>
  )
}
