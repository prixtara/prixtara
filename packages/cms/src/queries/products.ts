/**
 * GROQ queries for product data.
 *
 * Architecture rule: ALL GROQ queries must live in this package.
 * No component, page, or lib file should contain GROQ query strings.
 *
 * TODO(cms): Implement these queries when Sanity schema is defined.
 * TODO(cms): Use next-sanity's defineQuery for type inference from GROQ.
 * TODO(cms): Add caching strategy (Next.js fetch cache / next-sanity's sanityFetch).
 */
import 'server-only';

import { sanityClient } from '../client';
import type { CmsProduct } from '../types';

/**
 * Fetch all products ordered by a manual ordering field.
 *
 * TODO(cms): Implement GROQ query when schema is ready.
 * @returns Promise<CmsProduct[]>
 */
export async function getAllProducts(): Promise<CmsProduct[]> {
  // TODO(cms): Replace stub with:
  // return sanityClient.fetch<CmsProduct[]>(
  //   `*[_type == "product"] | order(order asc) {
  //     _id, _type, _rev, _createdAt, _updatedAt,
  //     name, slug, productSlug, tagline, category
  //   }`,
  //   {},
  //   { next: { tags: ['products'] } }
  // );
  void sanityClient; // Prevent unused import error
  return [];
}

/**
 * Fetch a single product by its URL slug.
 *
 * TODO(cms): Implement GROQ query when schema is ready.
 */
export async function getProductBySlug(slug: string): Promise<CmsProduct | null> {
  // TODO(cms): Replace stub with:
  // return sanityClient.fetch<CmsProduct | null>(
  //   `*[_type == "product" && slug.current == $slug][0] { ... }`,
  //   { slug },
  //   { next: { tags: [`product:${slug}`] } }
  // );
  void slug;
  return null;
}
