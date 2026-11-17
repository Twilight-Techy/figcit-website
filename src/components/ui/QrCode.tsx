import { qrModules } from '@/lib/qr'

// A scannable QR code drawn as one SVG path. It draws in `currentColor` and has no quiet
// zone of its own: put it on a light tile with padding (CtaBand uses 16px, about 2 to 4
// modules, which phone cameras read fine).
export function QrCode({
  value,
  label,
  className = '',
}: {
  /** What a scan opens: the full address, with https://. */
  value: string
  /** Read by screen readers, which cannot scan it. */
  label: string
  className?: string
}) {
  const { size, path } = qrModules(value)
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={label}
      fill="currentColor"
      shapeRendering="crispEdges"
      className={className}
    >
      <path d={path} />
    </svg>
  )
}
