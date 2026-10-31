import type { Block } from 'payload'

const humanise = (slug: string) => {
  const words = slug.replace(/([A-Z])/g, ' $1').toLowerCase()
  return words.charAt(0).toUpperCase() + words.slice(1)
}

// Shows "02 · Card grid · How we create a better fit" on each section in the page editor,
// instead of Payload's editable "Untitled" block name.
export const withRowLabel = (block: Block): Block => ({
  ...block,
  admin: {
    ...block.admin,
    disableBlockName: true,
    components: {
      ...block.admin?.components,
      Label: {
        path: '/components/admin/BlockLabel#BlockLabel',
        clientProps: {
          blockLabel:
            typeof block.labels?.singular === 'string'
              ? block.labels.singular
              : humanise(block.slug),
        },
      },
    },
  },
})
