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
  labels: { singular: 'Page', plural: 'Pages' },
  defaultSort: 'slug',
  admin: {
    group: 'Website',
    description:
      'Every page on the website. Edit a page, then press Publish changes to put it live.',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    pagination: { defaultLimit: 50 },
    listSearchableFields: ['title', 'slug'],
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
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'The page’s name in the admin and the browser tab fallback.' },
    },
    {
      name: 'slug',
      label: 'Page address',
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
      label: 'Search engines (SEO)',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'title',
          label: 'SEO title',
          type: 'text',
          admin: { description: 'Shown in the browser tab and in Google. Under 60 characters.' },
        },
        {
          name: 'description',
          label: 'Search description',
          type: 'textarea',
          maxLength: 300,
          admin: {
            description:
              'Search result summary. Aim for about 160 characters; longer text is cut off.',
          },
        },
      ],
    },
    {
      name: 'layout',
      label: 'Page sections',
      labels: { singular: 'Section', plural: 'Sections' },
      type: 'blocks',
      blocks: pageBlocks,
      required: true,
      admin: { initCollapsed: true },
    },
  ],
}
