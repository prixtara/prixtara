/**
 * Server-side career data fetching.
 *
 * TODO(careers): Add caching and revalidation strategy.
 * TODO(careers): Add pagination for large job listing pages.
 */
import 'server-only';

import {
  getActiveJobOpenings as _getActiveJobOpenings,
  getJobOpeningBySlug as _getJobOpeningBySlug,
} from '@prixtara/cms';
import type { CmsJobOpening } from '@prixtara/cms';

export type { CmsJobOpening };

/**
 * Fetch all active job openings for the /career listing page.
 */
export async function getActiveJobOpenings(): Promise<CmsJobOpening[]> {
  return _getActiveJobOpenings();
}

/**
 * Fetch a single job opening by URL slug.
 */
export async function getJobOpeningBySlug(slug: string): Promise<CmsJobOpening | null> {
  return _getJobOpeningBySlug(slug);
}
