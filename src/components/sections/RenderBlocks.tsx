import { CardGrid } from '@/components/sections/CardGrid'
import { ContentSection } from '@/components/sections/ContentSection'
import { CtaBand } from '@/components/sections/CtaBand'
import { FeatureSplit } from '@/components/sections/FeatureSplit'
import { Hero } from '@/components/sections/Hero'
import { PathCards } from '@/components/sections/PathCards'
import { Stats } from '@/components/sections/Stats'
import { StickyMenu } from '@/components/sections/StickyMenu'
import { StoryTimeline } from '@/components/sections/StoryTimeline'
import { Values } from '@/components/sections/Values'
import type { Page } from '@/payload-types'

// Maps each Payload block to its section component, in page order.
export function RenderBlocks({ blocks }: { blocks: Page['layout'] }) {
  return blocks.map((block, index) => {
    const key = block.id ?? index
    switch (block.blockType) {
      case 'hero':
        return <Hero key={key} block={block} />
      case 'cardGrid':
        return <CardGrid key={key} block={block} index={index} />
      case 'pathCards':
        return <PathCards key={key} block={block} index={index} />
      case 'storyTimeline':
        return <StoryTimeline key={key} block={block} index={index} />
      case 'stats':
        return <Stats key={key} block={block} index={index} />
      case 'featureSplit':
        return <FeatureSplit key={key} block={block} index={index} />
      case 'values':
        return <Values key={key} block={block} index={index} />
      case 'ctaBand':
        return <CtaBand key={key} block={block} index={index} />
      case 'section':
        return <ContentSection key={key} block={block} index={index} />
      case 'stickyMenu':
        return <StickyMenu key={key} block={block} />
    }
  })
}
