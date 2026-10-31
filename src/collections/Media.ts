import { APIError, type CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  labels: { singular: 'Photo', plural: 'Media library' },
  admin: {
    group: 'Website',
    description: 'Photos used on the website. Every photo needs a description for screen readers.',
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  fields: [
    {
      name: 'alt',
      label: 'Description',
      type: 'text',
      required: true,
      admin: {
        description:
          'Describe the photo for screen readers, for example "A student resting on a sofa with a cup of tea".',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    focalPoint: true,
    // Re-encoding strips EXIF (including location) and caps the stored original (rules §5).
    resizeOptions: { width: 2400, withoutEnlargement: true },
    formatOptions: { format: 'webp', options: { quality: 80 } },
    // Sizes used by the Figma layouts.
    imageSizes: [
      { name: 'card', width: 640, formatOptions: { format: 'webp', options: { quality: 78 } } },
      { name: 'hero', width: 1280, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'full', width: 1920, formatOptions: { format: 'webp', options: { quality: 80 } } },
    ],
  },
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          if (req.file.size > MAX_UPLOAD_BYTES) {
            throw new APIError('Images must be 5 MB or smaller', 413)
          }
        }
      },
    ],
  },
}
