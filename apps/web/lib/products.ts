/**
 * Server-side product data fetching.
 *
 * This is the ONLY place in apps/web that fetches product data.
 * Pages import from here — not from @prixtara/cms directly.
 *
 * Architecture rule: No page or component fetches data directly.
 * All data access goes through lib/ (server) or hooks/ (client).
 *
 * TODO(cms): Add React cache() wrapper for request deduplication:
 *   export const getProductBySlug = cache(async (slug) => { ... });
 */
import 'server-only';

import {
  getAllProducts as _getAllProducts,
  getProductBySlug as _getProductBySlug,
} from '@prixtara/cms';
import type { CmsProduct } from '@prixtara/cms';
import type { ProductSlug } from '@prixtara/types';

export type { CmsProduct };

/**
 * Fetch all products for the /products listing page.
 * Returns an empty array if CMS is not yet configured.
 */
export async function getAllProducts(): Promise<CmsProduct[]> {
  // TODO(cms): Add React cache() and Next.js fetch tags for ISR:
  // return cache(async () => _getAllProducts())();
  return _getAllProducts();
}

/**
 * Fetch a single product by URL slug.
 * Returns null if the product does not exist (triggers notFound()).
 */
export async function getProductBySlug(slug: ProductSlug): Promise<CmsProduct | null> {
  return _getProductBySlug(slug);
}
