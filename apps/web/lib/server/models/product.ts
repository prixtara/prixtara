import type {
  ProductCapability,
  ProductTechnicalDetail,
  ProductMetric,
  ProductFeature,
  ProductUseCase,
  ProductApplication,
  ProductProcessStep,
  ProductCta,
} from '@prixtara/types';

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
  mediaAssetId?: string;
  gallery?: string[];
  video?: string;
  relatedProductSlugs?: string[];
  publishedAt?: string;
  seo?: {
    title?: string;
    description?: string;
  };
}

export type ProductSummary = Pick<
  NormalizedProduct,
  'id' | 'slug' | 'name' | 'tagline' | 'category' | 'mediaAssetId'
>;
