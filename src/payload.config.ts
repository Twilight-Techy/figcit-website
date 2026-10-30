import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { FormSubmissions } from './collections/FormSubmissions'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'
import { env } from './lib/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const allowedOrigins = [env.NEXT_PUBLIC_SITE_URL]

export default buildConfig({
  serverURL: env.NEXT_PUBLIC_SITE_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · FigCit admin',
    },
  },
  collections: [Pages, Media, FormSubmissions, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  // Smaller attack surface: we only use the Local API and REST (rules §6).
  graphQL: {
    disable: true,
  },
  cors: allowedOrigins,
  csrf: allowedOrigins,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
    // Schema changes go through committed migrations, never push (rules §5).
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    // Media in object storage, never the server's temporary disk (rules §5).
    vercelBlobStorage({
      enabled: Boolean(env.BLOB_READ_WRITE_TOKEN),
      token: env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      alwaysInsertFields: true,
      // Files keep their own names. With a random suffix the plugin has to write the new
      // name back after uploading, and that write-back was lost for most seeded photos.
      addRandomSuffix: false,
    }),
  ],
})
