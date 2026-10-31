import type { ServerProps } from 'payload'

import { pathForSlug } from '@/hooks/revalidate'

const formNames: Record<string, string> = {
  'book-conversation': 'Book a conversation',
  partner: 'Partner with us',
  'early-access': 'Get early access',
  'hub-interest': 'Hub interest',
}

const date = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

// Welcome panel above the collection cards (Payload admin.components.beforeDashboard):
// shortcuts to the common jobs, new form messages and recently edited pages.
export async function Dashboard({ payload, user }: ServerProps) {
  const admin = payload.config.routes.admin
  const query = { user, overrideAccess: false, depth: 0 } as const

  const [home, recent, inbox] = await Promise.all([
    payload.find({
      ...query,
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
      select: { slug: true },
    }),
    payload.find({
      ...query,
      collection: 'pages',
      sort: '-updatedAt',
      limit: 5,
      draft: true,
      select: { title: true, slug: true, _status: true, updatedAt: true },
    }),
    payload.find({
      ...query,
      collection: 'form-submissions',
      where: { status: { equals: 'new' } },
      sort: '-createdAt',
      limit: 5,
      select: { form: true, email: true, createdAt: true },
    }),
  ])

  const homeId = home.docs[0]?.id
  const actions = [
    {
      title: 'Edit the home page',
      text: 'Change the words and photos people see first.',
      href: homeId ? `${admin}/collections/pages/${homeId}` : `${admin}/collections/pages`,
    },
    {
      title: 'Add a page',
      text: 'Start a new page from the section blocks.',
      href: `${admin}/collections/pages/create`,
    },
    {
      title: 'Upload a photo',
      text: 'Add an image to the media library with its description.',
      href: `${admin}/collections/media/create`,
    },
    {
      title: 'View the website',
      text: 'Opens the live site in a new tab.',
      href: '/',
      external: true,
    },
  ]

  return (
    <div className="fc-dashboard">
      <header className="fc-dashboard__welcome">
        <p className="fc-dashboard__eyebrow">FigCit website</p>
        <h1 className="fc-dashboard__title">Welcome back</h1>
        <p className="fc-dashboard__lead">
          Edit a page, then press <strong>Publish changes</strong> to put it live. Until then your
          edits are saved as a draft that only signed-in editors can see.
        </p>
      </header>

      <ul className="fc-dashboard__actions">
        {actions.map((action) => (
          <li key={action.title}>
            <a
              className="fc-dashboard__action"
              href={action.href}
              {...(action.external ? { target: '_blank', rel: 'noopener' } : {})}
            >
              <span className="fc-dashboard__action-title">
                {action.title}
                {action.external && <span aria-hidden> ↗</span>}
              </span>
              <span className="fc-dashboard__action-text">{action.text}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="fc-dashboard__panels">
        <section className="fc-dashboard__panel" aria-labelledby="fc-inbox-title">
          <div className="fc-dashboard__panel-head">
            <h2 id="fc-inbox-title">New messages</h2>
            <span className="fc-dashboard__count">{inbox.totalDocs}</span>
          </div>
          {inbox.docs.length ? (
            <ul className="fc-dashboard__list">
              {inbox.docs.map((doc) => (
                <li key={doc.id}>
                  <a href={`${admin}/collections/form-submissions/${doc.id}`}>
                    <span>{formNames[doc.form] ?? doc.form}</span>
                    <span className="fc-dashboard__meta">
                      {doc.email} · {date.format(new Date(doc.createdAt))}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="fc-dashboard__empty">No new messages. You’re all caught up.</p>
          )}
          <a
            className="fc-dashboard__more"
            href={`${admin}/collections/form-submissions?where[status][equals]=new`}
          >
            All new messages
          </a>
        </section>

        <section className="fc-dashboard__panel" aria-labelledby="fc-recent-title">
          <div className="fc-dashboard__panel-head">
            <h2 id="fc-recent-title">Recently edited pages</h2>
          </div>
          <ul className="fc-dashboard__list">
            {recent.docs.map((doc) => (
              <li key={doc.id}>
                <a href={`${admin}/collections/pages/${doc.id}`}>
                  <span>
                    {doc.title}
                    <span
                      className={`fc-dashboard__status fc-dashboard__status--${doc._status ?? 'draft'}`}
                    >
                      {doc._status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </span>
                  <span className="fc-dashboard__meta">
                    {pathForSlug(doc.slug)} · {date.format(new Date(doc.updatedAt))}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a className="fc-dashboard__more" href={`${admin}/collections/pages`}>
            All pages
          </a>
        </section>
      </div>
    </div>
  )
}
