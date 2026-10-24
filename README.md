# Figcit website

The company website for Figcit Ltd at [www.figcit.co.uk](https://www.figcit.co.uk), built with Next.js and Payload CMS.

- **Rules every change follows:** [docs/PROJECT_RULES.md](docs/PROJECT_RULES.md)
- **Tasks from start to launch:** [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md)

## Stack

Next.js (App Router) · Payload 3 (CMS at `/admin`) · Neon Postgres (UK or EU) · Tailwind CSS v4 · Resend · Vercel (London functions) · pnpm.

## Getting started

Requirements: Node 22 (see `.nvmrc`), pnpm 10 and Docker for the local database.

```bash
cp .env.example .env              # then set PAYLOAD_SECRET: openssl rand -hex 32
docker compose up -d              # local Postgres
pnpm install
pnpm payload migrate              # create the database tables
pnpm dev                          # http://localhost:3000, admin at /admin
```

Create the first admin user at `/admin` on first run.

## Scripts

| Command                                              | What it does                                      |
| ---------------------------------------------------- | ------------------------------------------------- |
| `pnpm dev`                                           | Start the dev server                              |
| `pnpm build` / `pnpm start`                          | Production build and server                       |
| `pnpm lint` / `pnpm typecheck` / `pnpm format:check` | Code quality checks (CI fails on warnings)        |
| `pnpm test:unit`                                     | Unit tests, no database needed                    |
| `pnpm test:int`                                      | Integration tests against the database            |
| `pnpm test:e2e`                                      | Playwright end-to-end and axe accessibility tests |
| `pnpm payload migrate:create <name>`                 | Create a migration after changing collections     |
| `pnpm generate:types`                                | Regenerate `src/payload-types.ts`                 |

## Folder structure

```
src/
  app/(frontend)/   public pages, one folder per URL
  app/(payload)/    Payload admin and REST API (generated)
  blocks/           Payload block configs for page sections
  collections/      Payload collections
  globals/          Payload globals (Header, Footer, SiteSettings)
  components/       layout, sections and UI components
  lib/              server-only helpers (env, Payload client, SEO)
  migrations/       committed database migrations
  styles/           design tokens and global CSS
tests/              unit, int and e2e tests
docs/               project rules and implementation plan
```

## Deployment

Every pull request gets a Vercel preview. Merging to `main` deploys to production after CI passes. Database changes ship as migrations.
