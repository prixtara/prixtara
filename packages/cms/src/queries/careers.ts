/**
 * GROQ queries for career / job opening data.
 *
 * TODO(cms): Implement these queries when Sanity schema is defined.
 * TODO(careers): Add pagination support for large job listing pages.
 */
import 'server-only';

import { sanityClient } from '../client';
import type { CmsJobOpening } from '../types';

/**
 * Fetch all active job openings.
 *
 * TODO(cms): Implement GROQ query when schema is ready.
 */
export async function getActiveJobOpenings(): Promise<CmsJobOpening[]> {
  // TODO(cms): Replace stub with:
  // return sanityClient.fetch<CmsJobOpening[]>(
  //   `*[_type == "jobOpening" && isActive == true] | order(publishedAt desc) {
  //     _id, _type, _rev, _createdAt, _updatedAt,
  //     title, slug, department, location, isRemote,
  //     employmentType, summary, isActive, publishedAt
  //   }`,
  //   {},
  //   { next: { tags: ['careers'] } }
  // );
  void sanityClient;
  return [];
}

/**
 * Fetch a single job opening by its URL slug.
 *
 * TODO(cms): Implement GROQ query when schema is ready.
 * TODO(careers): Include full job description (PortableText).
 */
export async function getJobOpeningBySlug(slug: string): Promise<CmsJobOpening | null> {
  void slug;
  return null;
}
