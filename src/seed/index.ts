import config from '@payload-config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload, type Payload } from 'payload'

import { aboutPage, teamPage } from './pages/about'
import { contactPage } from './pages/contact'
import { faqsPage } from './pages/faqs'
import { legalPages } from './pages/legal'
import { forEducationPage, forEmployersPage, forYouPage, partnersPage } from './pages/audiences'
import { homePage } from './pages/home'
import { servicesPage } from './pages/services'
import { seedImages, type ImageKey, type ImageIds } from './images'

// Loads the Website Copy v2.0 pages and photos into Payload. Safe to run again: pages
// are matched by slug and images by file name, so it updates rather than duplicates.
// Run with: pnpm seed
//
// Deploys run `pnpm seed:if-empty` after migrating. It only seeds a database with no
// pages yet, so a new database gets the content and later edits in the admin are never
// overwritten by a deploy.
const dirname = path.dirname(fileURLToPath(import.meta.url))
const context = { disableRevalidate: true }

async function upsertImages(payload: Payload): Promise<ImageIds> {
  const ids = {} as ImageIds
  for (const [key, alt] of Object.entries(seedImages) as [ImageKey, string][]) {
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { like: key } },
      limit: 1,
      depth: 0,
    })
    if (existing.docs[0]) {
      ids[key] = existing.docs[0].id
      await payload.update({ collection: 'media', id: ids[key], data: { alt }, context })
      continue
    }
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      filePath: path.join(dirname, 'images', `${key}.webp`),
      context,
    })
    ids[key] = doc.id
  }
  return ids
}

async function main() {
  const payload = await getPayload({ config })
  if (process.env.SEED_IF_EMPTY === 'true') {
    const { totalDocs } = await payload.count({ collection: 'pages' })
    if (totalDocs > 0) {
      payload.logger.info(`Seed skipped: the database already has ${totalDocs} pages`)
      process.exit(0)
    }
  }
  const images = await upsertImages(payload)

  const pages = [
    homePage,
    servicesPage,
    forYouPage,
    forEmployersPage,
    forEducationPage,
    partnersPage,
    aboutPage,
    teamPage,
    contactPage,
    faqsPage,
  ]
    .map((build) => build(images))
    .concat(legalPages())

  for (const page of pages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      depth: 0,
      draft: true,
    })
    const data = { ...page, _status: 'published' as const }
    if (existing.docs[0]) {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context })
    } else {
      await payload.create({ collection: 'pages', data, context })
    }
    payload.logger.info(`Seeded /${page.slug === 'home' ? '' : page.slug}`)
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      legalName: 'Figcit Ltd',
      email: 'admin@figcit.co.uk',
      phone: '+447715897120',
      locality: 'Reading',
      region: 'Thames Valley',
    },
    context,
  })
  process.exit(0)
}

// `payload run` exits once the module has loaded, so the work happens at top level.
try {
  await main()
} catch (error: unknown) {
  console.error(error)
  process.exit(1)
}
