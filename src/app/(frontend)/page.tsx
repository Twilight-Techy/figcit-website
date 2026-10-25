import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/sections/RenderBlocks'
import { pageMetadata } from '@/lib/pageMetadata'
import { getPage } from '@/lib/pages'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('home')
  return page ? pageMetadata(page) : {}
}

export default async function HomePage() {
  const page = await getPage('home')
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout} path="/" />
}
