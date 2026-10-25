import Link from 'next/link'

export const metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <section className="container-site py-section">
      <h1 className="font-heading text-h2 font-extrabold text-primary">We can’t find that page</h1>
      <p className="mt-6 max-w-[38.75rem] text-lead">
        It may have moved, or the link may be wrong. You can go back to the{' '}
        <Link href="/" className="font-bold text-primary underline underline-offset-[0.2em]">
          home page
        </Link>{' '}
        or{' '}
        <Link href="/contact" className="font-bold text-primary underline underline-offset-[0.2em]">
          contact us
        </Link>
        .
      </p>
    </section>
  )
}
