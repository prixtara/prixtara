/**
 * Normalized Product domain model.
 *
 * CMS-agnostic data representation used by page components and presentation layers.
 */

export interface NormalizedProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description?: string;
  publishedAt?: string;
  seo?: {
    title?: string;
    description?: string;
  };
}

export type ProductSummary = Pick<
  NormalizedProduct,
  'id' | 'slug' | 'name' | 'tagline' | 'category'
>;
