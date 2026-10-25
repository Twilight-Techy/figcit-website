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
// overwritten by a deploy. It also re-uploads any seeded photo whose file is missing
// from the Blob store.
const dirname = path.dirname(fileURLToPath(import.meta.url))
// A new object for every call: the storage plugin keeps the uploaded file on the request
// context, so a shared object made every upload after the first resend the first file.
const context = () => ({ disableRevalidate: true })

// Public address of a file in the Vercel Blob store, worked out from the token the same
// way the storage plugin does. Null when files are stored on disk (local development).
function blobUrl(filename: string): string | null {
  const storeId = process.env.BLOB_READ_WRITE_TOKEN?.match(
    /^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i,
  )?.[1]
  if (!storeId) return null
  const base =
    process.env.STORAGE_VERCEL_BLOB_BASE_URL ??
    `https://${storeId.toLowerCase()}.public.blob.vercel-storage.com`
  return `${base}/${encodeURIComponent(filename)}`
}

async function fileMissing(filename: string | null | undefined): Promise<boolean> {
  if (!filename) return true
  const url = blobUrl(filename)
  if (!url) return false
  const res = await fetch(url, { method: 'HEAD' })
  return res.status === 404
}

// The first seeds ran with the Blob plugin's random suffix, which saved the suffixed name
// for only one photo, so the others pointed at files that don't exist. Re-upload them.
async function repairImages(payload: Payload) {
  for (const key of Object.keys(seedImages) as ImageKey[]) {
    const { docs } = await payload.find({
      collection: 'media',
      where: { filename: { like: key } },
      limit: 1,
      depth: 0,
    })
    const doc = docs[0]
    if (!doc || !(await fileMissing(doc.filename))) continue
    await payload.update({
      collection: 'media',
      id: doc.id,
      data: {},
      filePath: path.join(dirname, 'images', `${key}.webp`),
      context: context(),
    })
    payload.logger.info(`Re-uploaded the missing file for ${key}`)
  }
}

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
      await payload.update({ collection: 'media', id: ids[key], data: { alt }, context: context() })
      continue
    }
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      filePath: path.join(dirname, 'images', `${key}.webp`),
      context: context(),
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
      await repairImages(payload)
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
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data,
        context: context(),
      })
    } else {
      await payload.create({ collection: 'pages', data, context: context() })
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
    context: context(),
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
