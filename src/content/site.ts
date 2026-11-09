// Organisation details from the website copy. Editable values (company number, email,
// phone, address) live in the Payload Site settings global; these are the fallbacks.
export const site = {
  name: 'FigCit',
  // "Ltd" only once FigCit Ltd is incorporated (UK company naming law).
  legalName: 'FigCit',
  url: 'https://www.figcit.co.uk',
  tagline: 'Fix the fit, thrive as you are.',
  defaultTitle: 'FigCit | Fix the fit, thrive as you are',
  defaultDescription:
    'FigCit creates a better fit between people and the systems around them: an app for everyday life, consulting and training for organisations, and a sensory-conscious Hub. No diagnosis needed.',
  email: 'admin@figcit.co.uk',
  phone: '+447715897120',
  locality: 'Reading',
  region: 'Thames Valley',
  country: 'GB',
} as const
