import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
} from 'payload'

import { authenticated, publishedOrAuthenticated } from '@/access'
import { pageBlocks } from '@/blocks/config'
import { pathForSlug, safeRevalidate } from '@/hooks/revalidate'
import type { Page } from '@/payload-types'

const revalidateChange: CollectionAfterChangeHook<Page> = ({ doc, previousDoc, context }) => {
  if (doc.slug && (doc._status === 'published' || previousDoc?._status === 'published')) {
    safeRevalidate(pathForSlug(doc.slug), undefined, context)
  }
  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    safeRevalidate(pathForSlug(previousDoc.slug), undefined, context)
  }
  safeRevalidate('/sitemap.xml', undefined, context)
  return doc
}

const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, context }) => {
  if (doc?.slug) safeRevalidate(pathForSlug(doc.slug), undefined, context)
  return doc
}

// Website pages built from section blocks. Drafts let editors prepare changes; the
// public only sees published versions (rules §10).
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    preview: (doc) =>
      typeof doc?.slug === 'string'
        ? `/preview?path=${encodeURIComponent(pathForSlug(doc.slug))}`
        : null,
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  hooks: {
    afterChange: [revalidateChange],
    afterDelete: [revalidateDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: '"home" for the home page; otherwise the URL path, for example about/team.',
      },
      validate: (value: string | null | undefined) =>
        (typeof value === 'string' && /^[a-z0-9-]+(\/[a-z0-9-]+)*$/.test(value)) ||
        'Lower-case words separated by hyphens, with / between levels',
    },
    {
      name: 'meta',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'title', type: 'text', admin: { description: 'Browser and search title.' } },
        {
          name: 'description',
          type: 'textarea',
          maxLength: 170,
          admin: { description: 'Search result summary, up to 160 characters.' },
        },
      ],
    },
    { name: 'layout', type: 'blocks', blocks: pageBlocks, required: true },
  ],
}
