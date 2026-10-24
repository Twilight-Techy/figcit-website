// Organisation details from the website copy. [Bracketed] items in the copy, such as
// the company number, move into the Payload SiteSettings global in T11.
export const site = {
  name: 'Figcit',
  legalName: 'Figcit Ltd',
  url: 'https://www.figcit.co.uk',
  tagline: 'Fix the fit, thrive as you are.',
  defaultTitle: 'Figcit | Support that fits, every day',
  defaultDescription:
    'Figcit makes support part of everyday life for young people and adults with mental health conditions and neurodevelopmental differences.',
  email: 'admin@figcit.co.uk',
  phone: '+447715897120',
  locality: 'Reading',
  region: 'Thames Valley',
  country: 'GB',
} as const

// Public routes for the sitemap, with their launch phase. Pages move to Payload in T11.
export const publicRoutes = [
  '/',
  '/services',
  '/for-you',
  '/for-employers',
  '/for-education',
  '/partners',
  '/about',
  '/about/team',
  '/contact',
  '/faqs',
  '/privacy',
  '/cookies',
  '/accessibility',
  '/terms',
  '/safeguarding',
  '/complaints',
] as const
