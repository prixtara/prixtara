import 'server-only';

import {
  getActiveJobOpenings as cmsGetActiveJobOpenings,
  getJobOpeningBySlug as cmsGetJobOpeningBySlug,
  normalizeCmsJobOpening,
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
    isActive: j.published,
    publishedAt: j.publishedAt,
    seo: {
      title: `${j.title} | Careers at Prixtara`,
      description: j.summary,
    },
  };
}

export class CmsCareerRepository implements CareerRepository {
  async getActiveJobOpenings(): Promise<NormalizedJobOpening[]> {
    try {
      const cmsJobs = await cmsGetActiveJobOpenings();
      if (cmsJobs && cmsJobs.length > 0) {
        return cmsJobs.map(normalizeCmsJobOpening).map(toWebJobOpening);
      }
    } catch (error) {
      console.warn('[CmsCareerRepository] Failed to fetch jobs from CMS', error);
    }
    return [];
  }

  async getJobOpeningBySlug(slug: string): Promise<NormalizedJobOpening | null> {
    try {
      const raw = await cmsGetJobOpeningBySlug(slug);
      if (raw) {
        return toWebJobOpening(normalizeCmsJobOpening(raw));
      }
    } catch (error) {
      console.warn(`[CmsCareerRepository] Failed to fetch job "${slug}" from CMS`, error);
    }
    return null;
  }

  async getAllJobOpeningSlugs(): Promise<string[]> {
    try {
      const jobs = await this.getActiveJobOpenings();
      return jobs.map((job) => job.slug);
    } catch {
      return [];
    }
  }
}
