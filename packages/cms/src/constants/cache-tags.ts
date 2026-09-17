/**
 * Canonical Next.js Cache Tags for Prixtara CMS Content.
 *
 * Used for targeted on-demand revalidation via revalidateTag(tag).
 */
export const CACHE_TAGS = {
  /** Global site metadata, logos, contacts, and footers */
  siteSettings: 'site-settings',

  /** Header and footer navigation menus */
  navigation: 'navigation',

  /** Modular homepage document */
  homepage: 'homepage',

  /** Entire product catalog and collection pages */
  products: 'products',

  /** Specific product document by slug (e.g. product:ai-vision-defect-detection) */
  product: (slug: string) => `product:${slug}`,

  /** Vision marketing page */
  vision: 'vision',

  /** About marketing page */
  about: 'about',

  /** Career overview page */
  careers: 'careers',

  /** All active job postings */
  jobs: 'jobs',

  /** Specific job posting by slug (e.g. job:senior-computer-vision-engineer) */
  job: (slug: string) => `job:${slug}`,
} as const;

export type CacheTag =
  | 'site-settings'
  | 'navigation'
  | 'homepage'
  | 'products'
  | `product:${string}`
  | 'vision'
  | 'about'
  | 'careers'
  | 'jobs'
  | `job:${string}`;
