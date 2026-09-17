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
export const SEED_PRODUCT_SLUGS = [
  'ai-vision-defect-detection',
  'existential-ai',
  'sambhashi',
] as const;

/** Backwards-compatible alias for initial seed slugs */
export const PRODUCT_SLUGS = SEED_PRODUCT_SLUGS;

/**
 * ProductSlug is data-driven. Products can be created dynamically in the CMS
 * without requiring code changes or additions to a static union.
 */
export type ProductSlug = string;

/**
 * Standard product categories, while permitting custom CMS categories.
 */
export type StandardProductCategory =
  | 'computer-vision'
  | 'artificial-intelligence'
  | 'language-technology'
  | 'edge-computing'
  | 'autonomous-systems';

export type ProductCategory = StandardProductCategory | (string & {});

export const PRODUCT_CATEGORY_LABELS: Record<string, string> = {
  'computer-vision': 'Computer Vision',
  'artificial-intelligence': 'Artificial Intelligence',
  'language-technology': 'Language Technology',
  'edge-computing': 'Edge Computing',
  'autonomous-systems': 'Autonomous Systems',
};

/**
 * Technical specification or metric item
 */
export interface ProductMetric {
  value: string;
  unit?: string;
  label: string;
  context?: string;
  highlight?: boolean;
}

export interface ProductCapability {
  title: string;
  description: string;
  badge?: string;
  metricsSummary?: string;
}

export interface ProductTechnicalDetail {
  category: string;
  items: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
}

export interface ProductFeature {
  title: string;
  description: string;
  badge?: string;
  iconName?: string;
}

export interface ProductUseCase {
  title: string;
  targetAudience?: string;
  scenario: string;
  impact: string;
}

export interface ProductApplication {
  industry: string;
  title: string;
  description: string;
  deploymentType?: string;
}

export interface ProductProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  duration?: string;
}

export interface ProductCta {
  headline: string;
  description?: string;
  buttonLabel: string;
  buttonUrl: string;
}

/**
 * Full domain Product shape used across the monorepo.
 */
export interface Product {
  id: string;
  slug: ProductSlug;
  title: string;
  name: string; // alias for title
  category: ProductCategory;
  shortDescription: string;
  tagline: string; // alias for shortDescription
  longDescription?: string;
  problemStatement?: string;
  solution?: string;
  capabilities?: ProductCapability[];
  technicalDetails?: ProductTechnicalDetail[];
  metrics?: ProductMetric[];
  features?: ProductFeature[];
  useCases?: ProductUseCase[];
  applications?: ProductApplication[];
  process?: ProductProcessStep[];
  cta?: ProductCta;
  relatedProductSlugs?: string[];
  publishedAt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    ogImageUrl?: string;
    noindex?: boolean;
  };
}
