// Placeholder photos from the Figma file, with alt text. The founder replaces these
// with final photography in T29; editors can swap them in the Media library.
export const seedImages = {
  'rest-at-home': 'A young woman wrapped in a blanket, writing in a notebook on a window seat',
  'hub-space': 'Two people resting in a calm lounge with bean bags, plants and soft lighting',
  amira: 'A nursing student in scrubs smiling at her phone on a bench outside a hospital',
  'care-team': 'A group of care workers in teal uniforms laughing together in a staff room',
  'partners-meeting': 'Colleagues around an office table in a planning meeting',
  'lived-experience': 'Three young people talking around a table covered in notes',
} as const

export type ImageKey = keyof typeof seedImages
export type ImageIds = Record<ImageKey, number>
