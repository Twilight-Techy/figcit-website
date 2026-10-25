import { notFound } from 'next/navigation'

// Unknown URLs render the not-found page inside the site layout, so the header, footer
// and crisis notice are still there. T11 replaces this with Payload page lookups.
export default function CatchAllPage() {
  notFound()
}
