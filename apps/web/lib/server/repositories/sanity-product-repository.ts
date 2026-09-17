import 'server-only';

import {
  getAllProducts as cmsGetAllProducts,
  getProductBySlug as cmsGetProductBySlug,
  getAllProductSlugs as cmsGetAllProductSlugs,
  normalizeCmsProduct,
  SEED_FALLBACK_PRODUCTS,
  isSanityConfigured,
} from '@prixtara/cms';
import { PRODUCT_SLUGS, PRODUCT_CATEGORY_LABELS, type Product } from '@prixtara/types';
import type { NormalizedProduct } from '../models';
import type { ProductRepository } from './interfaces';

/**
 * Maps a domain Product object to the web application's NormalizedProduct representation.
 */
function toNormalizedProduct(p: Product): NormalizedProduct {
  const mediaAssetId =
    p.slug === 'ai-vision-defect-detection'
      ? 'product-1'
      : p.slug === 'existential-ai'
        ? 'product-2'
        : p.slug === 'sambhashi'
          ? 'product-3'
          : undefined;

  return {
    id: p.id,
    slug: p.slug,
    name: p.name || p.title,
    tagline: p.tagline || p.shortDescription,
    category: PRODUCT_CATEGORY_LABELS[p.category] || p.category,
    description: p.longDescription || p.shortDescription,
    problemStatement: p.problemStatement,
    solution: p.solution,
    capabilities: p.capabilities,
    technicalDetails: p.technicalDetails,
    metrics: p.metrics,
    features: p.features,
    useCases: p.useCases,
    applications: p.applications,
    process: p.process,
    cta: p.cta,
    mediaAssetId,
    relatedProductSlugs: p.relatedProductSlugs,
    publishedAt: p.publishedAt,
    seo: {
      title: p.seo?.metaTitle || `${p.name} | Prixtara Technologies`,
      description: p.seo?.metaDescription || p.tagline,
    },
  };
}

const FALLBACK_NORMALIZED_PRODUCTS: NormalizedProduct[] =
  SEED_FALLBACK_PRODUCTS.map(toNormalizedProduct);

/**
 * Sanity-backed Product repository implementation.
 *
 * Encapsulates all Sanity CMS interactions for products, normalizes raw GROQ responses
 * into clean domain models, and isolates the UI layer from CMS details.
 */
export class SanityProductRepository implements ProductRepository {
  async getAllProducts(): Promise<NormalizedProduct[]> {
    try {
      const cmsProducts = await cmsGetAllProducts();
      if (cmsProducts && cmsProducts.length > 0) {
        return cmsProducts.map(normalizeCmsProduct).map(toNormalizedProduct);
      }
    } catch (error) {
      console.warn(
        '[SanityProductRepository] Failed to fetch products from CMS, using fallback:',
        error,
      );
    }
    return FALLBACK_NORMALIZED_PRODUCTS;
  }

  async getProductBySlug(slug: string): Promise<NormalizedProduct | null> {
    try {
      const raw = await cmsGetProductBySlug(slug);
      if (raw) {
        return toNormalizedProduct(normalizeCmsProduct(raw));
      }
      // If Sanity is configured and explicitly returns null, the document is either deleted or unpublished.
      if (isSanityConfigured()) {
        return null;
      }
    } catch (error) {
      console.warn(`[SanityProductRepository] Failed to fetch product "${slug}" from CMS:`, error);
    }

    // Fallback match during dev/offline when Sanity is not yet configured
    const fallback = FALLBACK_NORMALIZED_PRODUCTS.find((p) => p.slug === slug);
    return fallback ?? null;
  }

  async getAllProductSlugs(): Promise<string[]> {
    try {
      const slugs = await cmsGetAllProductSlugs();
      if (slugs && slugs.length > 0) {
        return slugs;
      }
    } catch (error) {
      console.warn('[SanityProductRepository] Failed to fetch product slugs from CMS:', error);
    }
    return Array.from(PRODUCT_SLUGS);
  }

  async getFeaturedProducts(): Promise<NormalizedProduct[]> {
    const all = await this.getAllProducts();
    return all.slice(0, 3);
  }
}

/** Backward compatibility alias */
export { SanityProductRepository as CmsProductRepository };
