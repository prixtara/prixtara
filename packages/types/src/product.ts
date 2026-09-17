/**
 * Prixtara product identifiers.
 *
 * These slugs are the canonical identifiers used across:
 * - URL routes: /products/[slug]
 * - CMS document slugs
 * - Analytics event names
 *
 * TODO(cms): Align with Sanity schema product slugs when content model is finalised.
 */
export const PRODUCT_SLUGS = ['ai-vision-defect-detection', 'existential-ai', 'sambhashi'] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

/**
 * Minimal product shape used across the monorepo.
 * The full CMS-backed type lives in @prixtara/cms.
 *
 * TODO(cms): Extend with rich content fields (body, gallery, specs)
 * when content model is finalised.
 */
export interface Product {
  /** Sanity document _id */
  id: string;

  /** URL-safe slug, must be one of PRODUCT_SLUGS */
  slug: ProductSlug;

  /** Display name */
  name: string;

  /** One-line tagline for cards and meta descriptions */
  tagline: string;

  /** Product category for filtering/grouping */
  category: ProductCategory;
}

export type ProductCategory = 'computer-vision' | 'artificial-intelligence' | 'language-technology';

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  'computer-vision': 'Computer Vision',
  'artificial-intelligence': 'Artificial Intelligence',
  'language-technology': 'Language Technology',
};
