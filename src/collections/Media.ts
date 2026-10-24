import type { CollectionConfig } from 'payload'

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Describe the photo for screen readers. Leave empty only for decorative images.',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    // Sizes used by the Figma layouts (rules §5). Object storage is added in T03.
    imageSizes: [
      { name: 'card', width: 640 },
      { name: 'hero', width: 1280 },
      { name: 'full', width: 1920 },
    ],
    formatOptions: { format: 'webp', options: { quality: 80 } },
  },
  hooks: {
    beforeValidate: [
      ({ req }) => {
        const size = req.file?.size ?? 0
        if (size > MAX_UPLOAD_BYTES) {
          throw new Error('Images must be 5 MB or smaller')
        }
      },
    ],
  },
}
