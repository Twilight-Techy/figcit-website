import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/sections/RenderBlocks'
import { pageMetadata } from '@/lib/pageMetadata'
import { getPage, getPublishedSlugs } from '@/lib/pages'

type Props = { params: Promise<{ slug: string[] }> }

// Every published page is built ahead of time and refreshed on publish (rules §3).
// Unknown URLs render the not-found page inside the site layout.
export async function generateStaticParams() {
  const slugs = await getPublishedSlugs()
  return slugs.filter((s) => s !== 'home').map((s) => ({ slug: s.split('/') }))
}

async function load(params: Props['params']) {
  const { slug } = await params
  const path = slug.join('/')
  // /home would duplicate the home page.
  return path === 'home' ? null : getPage(path)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await load(params)
  return page ? pageMetadata(page) : {}
}

export default async function Page({ params }: Props) {
  const page = await load(params)
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout} />
}
