/**
 * Server-side product data access facade.
 *
 * Architecture boundary: Pages and components consume product data through this facade
 * or directly from '@/lib/server', remaining decoupled from underlying CMS implementations.
 */
import 'server-only';

export {
  getAllProducts,
  getProductBySlug,
  getAllProductSlugs,
  getFeaturedProducts,
} from './server/data/products';
export type { NormalizedProduct } from './server/models';
