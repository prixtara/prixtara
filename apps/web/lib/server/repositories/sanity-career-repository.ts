import 'server-only';

import {
  getActiveJobOpenings as cmsGetActiveJobOpenings,
  getJobOpeningBySlug as cmsGetJobOpeningBySlug,
  getAllJobOpeningSlugs as cmsGetAllJobOpeningSlugs,
  normalizeCmsJobOpening,
  SEED_FALLBACK_JOB_OPENINGS,
  isSanityConfigured,
  type NormalizedJobPosting,
} from '@prixtara/cms';
import type { NormalizedJobOpening } from '../models';
import type { CareerRepository } from './interfaces';

function toWebJobOpening(j: NormalizedJobPosting): NormalizedJobOpening {
  return {
    id: j.id,
    slug: j.slug,
    title: j.title,
    department: j.department,
    location: j.location,
    isRemote: j.isRemote,
    employmentType: j.employmentType,
    summary: j.summary,
    description: j.description,
    responsibilities: j.responsibilities,
    requirements: j.requirements,
    optionalRequirements: j.optionalRequirements,
    applicationCta: j.applicationCta,
    isActive: j.published,
    publishedAt: j.publishedAt,
    seo: {
      title: `${j.title} | Careers at Prixtara`,
      description: j.summary,
    },
  };
}

const FALLBACK_JOB_OPENINGS: NormalizedJobOpening[] =
  SEED_FALLBACK_JOB_OPENINGS.map(toWebJobOpening);

/**
 * Sanity-backed Career repository implementation.
 * Queries Sanity Content Lake for published job postings.
 */
export class SanityCareerRepository implements CareerRepository {
  async getActiveJobOpenings(): Promise<NormalizedJobOpening[]> {
    try {
      const cmsJobs = await cmsGetActiveJobOpenings();
      if (cmsJobs && cmsJobs.length > 0) {
        return cmsJobs.map(normalizeCmsJobOpening).map(toWebJobOpening);
      }
    } catch (error) {
      console.warn('[SanityCareerRepository] Failed to fetch jobs from CMS:', error);
    }
    return FALLBACK_JOB_OPENINGS;
  }

  async getJobOpeningBySlug(slug: string): Promise<NormalizedJobOpening | null> {
    try {
      const raw = await cmsGetJobOpeningBySlug(slug);
      if (raw) {
        return toWebJobOpening(normalizeCmsJobOpening(raw));
      }
      // If Sanity is configured and returns null, role is unpublished or deleted
      if (isSanityConfigured()) {
        return null;
      }
    } catch (error) {
      console.warn(`[SanityCareerRepository] Failed to fetch job "${slug}" from CMS:`, error);
    }

    const fallback = FALLBACK_JOB_OPENINGS.find((j) => j.slug === slug);
    return fallback ?? null;
  }

  async getAllJobOpeningSlugs(): Promise<string[]> {
    try {
      const slugs = await cmsGetAllJobOpeningSlugs();
      if (slugs && slugs.length > 0) {
        return slugs;
      }
    } catch (error) {
      console.warn('[SanityCareerRepository] Failed to fetch job slugs from CMS:', error);
    }
    return FALLBACK_JOB_OPENINGS.map((j) => j.slug);
  }
}

/** Backward compatibility alias */
export { SanityCareerRepository as CmsCareerRepository };
