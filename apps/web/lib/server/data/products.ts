import 'server-only';
import { cache } from 'react';
import { getProductRepository } from '../repositories';
import type { NormalizedProduct } from '../models';

/**
 * Cached server data fetcher for all products.
 * Uses React cache() for request memoization within a single render pass.
 */
export const getAllProducts = cache(async (): Promise<NormalizedProduct[]> => {
  return getProductRepository().getAllProducts();
});

/**
 * Cached server data fetcher for a single product by slug.
 */
export const getProductBySlug = cache(async (slug: string): Promise<NormalizedProduct | null> => {
  return getProductRepository().getProductBySlug(slug);
});

/**
 * Retrieve all product slugs for static generation.
 */
export async function getAllProductSlugs(): Promise<string[]> {
  return getProductRepository().getAllProductSlugs();
}

/**
 * Retrieve featured products.
 */
export const getFeaturedProducts = cache(async (): Promise<NormalizedProduct[]> => {
  return getProductRepository().getFeaturedProducts();
});
