import {
  Approach,
  MissionVision,
  PolicyLinks,
  Profile,
  Story,
  Team,
} from '@/components/sections/About'
import { CardGrid } from '@/components/sections/CardGrid'
import { ContactForms } from '@/components/sections/ContactForms'
import { ContentSection } from '@/components/sections/ContentSection'
import { CtaBand } from '@/components/sections/CtaBand'
import { FeatureSplit } from '@/components/sections/FeatureSplit'
import { Hero } from '@/components/sections/Hero'
import { NoteBand } from '@/components/sections/NoteBand'
import { PathCards } from '@/components/sections/PathCards'
import { PromiseBand } from '@/components/sections/PromiseBand'
import { Statement } from '@/components/sections/Statement'
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
      case 'promise':
        return <PromiseBand key={key} block={block} index={index} />
      case 'noteBand':
        return <NoteBand key={key} block={block} />
      case 'statement':
        return <Statement key={key} block={block} index={index} />
      case 'missionVision':
        return <MissionVision key={key} block={block} index={index} />
      case 'story':
        return <Story key={key} block={block} index={index} />
      case 'approach':
        return <Approach key={key} block={block} index={index} />
      case 'profile':
        return <Profile key={key} block={block} index={index} />
      case 'team':
        return <Team key={key} block={block} index={index} />
      case 'policyLinks':
        return <PolicyLinks key={key} block={block} index={index} />
      case 'contactForms':
        return <ContactForms key={key} block={block} />
    }
  })
}
