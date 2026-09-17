/**
 * Normalized Career / Job Opening domain model.
 *
 * CMS-agnostic data representation used by career listing and job posting pages.
 */

export interface NormalizedJobOpening {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  isRemote: boolean;
  employmentType: string;
  summary: string;
  description?: string;
  isActive: boolean;
  publishedAt: string;
  seo?: {
    title?: string;
    description?: string;
  };
}

export type JobOpeningSummary = Pick<
  NormalizedJobOpening,
  'id' | 'slug' | 'title' | 'department' | 'location' | 'isRemote' | 'employmentType' | 'summary'
>;
