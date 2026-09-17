import 'server-only';

import {
  getAllProducts as cmsGetAllProducts,
  getProductBySlug as cmsGetProductBySlug,
  normalizeCmsProduct,
  SEED_FALLBACK_PRODUCTS,
} from '@prixtara/cms';
import { PRODUCT_SLUGS, PRODUCT_CATEGORY_LABELS, type Product } from '@prixtara/types';
import type { NormalizedProduct } from '../models';
import type { ProductRepository } from './interfaces';

function toNormalizedProduct(p: Product): NormalizedProduct {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name || p.title,
    tagline: p.tagline || p.shortDescription,
    category: PRODUCT_CATEGORY_LABELS[p.category] || p.category,
    description: p.longDescription || p.shortDescription,
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
 * CMS-backed Product repository implementation.
 * Queries @prixtara/cms and normalizes data into domain models.
 */
export class CmsProductRepository implements ProductRepository {
  async getAllProducts(): Promise<NormalizedProduct[]> {
    try {
      const cmsProducts = await cmsGetAllProducts();
      if (cmsProducts && cmsProducts.length > 0) {
        return cmsProducts.map(normalizeCmsProduct).map(toNormalizedProduct);
      }
    } catch (error) {
      console.warn(
        '[CmsProductRepository] Failed to fetch products from CMS, using fallback',
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
    } catch (error) {
      console.warn(`[CmsProductRepository] Failed to fetch product "${slug}" from CMS`, error);
    }

    // Fallback match during dev/offline
    const fallback = FALLBACK_NORMALIZED_PRODUCTS.find((p) => p.slug === slug);
    return fallback ?? null;
  }

  async getAllProductSlugs(): Promise<string[]> {
    try {
      const products = await this.getAllProducts();
      const slugs = products.map((p) => p.slug);
      if (slugs.length > 0) {
        return slugs;
      }
    } catch {
      // ignore
    }
    return Array.from(PRODUCT_SLUGS);
  }

  async getFeaturedProducts(): Promise<NormalizedProduct[]> {
    const all = await this.getAllProducts();
    return all.slice(0, 3);
  }
}
