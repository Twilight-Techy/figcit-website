import { comfortInitScript } from '@/lib/comfortInit'

// The second allowed dangerouslySetInnerHTML (rules §6): a fixed script from source
// code, needed before first paint, with no user or CMS content in it.
export function ComfortInit() {
  return <script dangerouslySetInnerHTML={{ __html: comfortInitScript }} />
}
