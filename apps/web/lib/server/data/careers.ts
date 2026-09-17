import 'server-only';
import { cache } from 'react';
import { getCareerRepository } from '../repositories';
import type { NormalizedJobOpening } from '../models';

/**
 * Cached server data fetcher for all active job openings.
 */
export const getActiveJobOpenings = cache(async (): Promise<NormalizedJobOpening[]> => {
  return getCareerRepository().getActiveJobOpenings();
});

/**
 * Cached server data fetcher for a single job opening by slug.
 */
export const getJobOpeningBySlug = cache(
  async (slug: string): Promise<NormalizedJobOpening | null> => {
    return getCareerRepository().getJobOpeningBySlug(slug);
  },
);

/**
 * Retrieve all job opening slugs for static generation.
 */
export async function getAllJobOpeningSlugs(): Promise<string[]> {
  return getCareerRepository().getAllJobOpeningSlugs();
}
