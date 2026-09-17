/**
 * Global site configuration and brand metadata constants.
 */

export const siteConfig = {
  name: 'Prixtara Technologies',
  shortName: 'Prixtara',
  description:
    'Prixtara Technologies builds advanced deep-tech solutions: AI-Vision Defect Detection, Existential AI, and Sambhashi multilingual / ISL technology.',
  url: process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com',
  locale: 'en_IN',
  links: {
    contactEmail: 'contact@prixtara.com',
    github: 'https://github.com/prixtara',
    linkedin: 'https://linkedin.com/company/prixtara',
  },
} as const;

export type SiteConfig = typeof siteConfig;
