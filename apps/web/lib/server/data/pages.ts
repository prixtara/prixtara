import 'server-only';
import { cache } from 'react';
import { getPageRepository } from '../repositories';
import type { NormalizedPage } from '../models';

/**
 * Cached server data fetcher for static/marketing pages.
 */
export const getPageBySlug = cache(async (slug: string): Promise<NormalizedPage | null> => {
  return getPageRepository().getPageBySlug(slug);
});

/**
 * Retrieve all page slugs for static path generation.
 */
export async function getAllPageSlugs(): Promise<string[]> {
  return getPageRepository().getAllPageSlugs();
}
