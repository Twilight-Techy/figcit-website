import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// The app is live: page buttons that said "Get early access" now say "Get the app" and open
// the download page. Content only; the early access form on Contact stays. Covers the
// published pages and their saved versions, so a later publish doesn't bring the old button back.
const TABLES = [
  'pages_blocks_hero_actions',
  'pages_blocks_cta_band_actions',
  'pages_blocks_actions_actions',
  'pages_blocks_promise_actions',
  '_pages_v_blocks_hero_actions',
  '_pages_v_blocks_cta_band_actions',
  '_pages_v_blocks_actions_actions',
  '_pages_v_blocks_promise_actions',
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of TABLES)
    await db.execute(
      sql`UPDATE ${sql.identifier(table)} SET "label" = 'Get the app', "href" = '/download'
          WHERE "href" = '/contact#get-early-access' AND "label" = 'Get early access'`,
    )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const table of TABLES)
    await db.execute(
      sql`UPDATE ${sql.identifier(table)} SET "label" = 'Get early access', "href" = '/contact#get-early-access'
          WHERE "href" = '/download' AND "label" = 'Get the app'`,
    )
}
