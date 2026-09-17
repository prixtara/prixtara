/**
 * @prixtara/cms
 *
 * Sanity CMS access layer.
 *
 * ⚠️  ARCHITECTURAL BOUNDARY — server-only package.
 * This package may ONLY be imported in:
 *   - Server Components
 *   - API Route Handlers
 *   - Server Actions
 *   - Other server-only packages
 *
 * Architecture rules:
 *   - ALL GROQ queries must live in this package
 *   - No component or page may import from '@sanity/client' directly
 *   - No raw Sanity data escapes this package — always validate/transform
 *   - Use the query functions in src/queries/ rather than the client directly
 */
export { sanityClient } from './client';
export type { CmsProduct, CmsJobOpening, CmsPage } from './types';
export { getAllProducts, getProductBySlug } from './queries/products';
export { getActiveJobOpenings, getJobOpeningBySlug } from './queries/careers';
