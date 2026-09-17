/**
 * Caching and Incremental Static Regeneration (ISR) configuration.
 *
 * Centralizes cache tags and revalidation TTLs used across data fetching layers
 * and webhook revalidation endpoints.
 */

export const CACHE_TAGS = {
  products: 'products',
  product: (slug: string) => `product:${slug}`,
  careers: 'careers',
  career: (slug: string) => `career:${slug}`,
  pages: 'pages',
  page: (slug: string) => `page:${slug}`,
  navigation: 'navigation',
} as const;

export const REVALIDATE_INTERVALS = {
  /** Static immutable routes (e.g. static error pages) - false means no revalidation */
  NEVER: false as const,
  /** Fast ISR refresh: 60 seconds */
  FAST: 60,
  /** Default ISR refresh: 1 hour (3600 seconds) */
  DEFAULT: 3600,
  /** Long ISR refresh: 1 day (86400 seconds) */
  LONG: 86400,
} as const;

/**
 * Route-specific caching and rendering policy.
 */
export const ROUTE_RENDERING_POLICY = {
  '/': {
    strategy: 'ssg',
    description: 'Static generation at build time; revalidated on demand via CMS webhook.',
  },
  '/about': {
    strategy: 'ssg',
    description: 'Static generation at build time.',
  },
  '/vision': {
    strategy: 'ssg',
    description: 'Static generation at build time.',
  },
  '/products': {
    strategy: 'isr',
    revalidate: REVALIDATE_INTERVALS.DEFAULT,
    tag: CACHE_TAGS.products,
    description: 'ISR with 1-hour fallback or instant webhook tag invalidation.',
  },
  '/products/[slug]': {
    strategy: 'isr',
    revalidate: REVALIDATE_INTERVALS.DEFAULT,
    tag: (slug: string) => CACHE_TAGS.product(slug),
    description: 'Pre-rendered at build time for known slugs; on-demand ISR for new slugs.',
  },
  '/career': {
    strategy: 'isr',
    revalidate: REVALIDATE_INTERVALS.DEFAULT,
    tag: CACHE_TAGS.careers,
    description: 'ISR with 1-hour fallback or instant webhook tag invalidation.',
  },
  '/career/[slug]': {
    strategy: 'isr',
    revalidate: REVALIDATE_INTERVALS.DEFAULT,
    tag: (slug: string) => CACHE_TAGS.career(slug),
    description: 'Pre-rendered at build time; on-demand ISR for new postings.',
  },
  '/api/health': {
    strategy: 'dynamic',
    revalidate: 0,
    description: 'Always dynamic with no-store cache headers for real-time uptime monitoring.',
  },
} as const;
