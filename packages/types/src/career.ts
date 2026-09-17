/**
 * Career / Job opening types.
 *
 * TODO(careers): Expand with application form fields, requirements,
 * and benefits when the careers feature is implemented.
 * TODO(cms): Align with Sanity schema when content model is finalised.
 */

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship';

export type Department =
  'engineering' | 'design' | 'product' | 'research' | 'operations' | 'sales' | 'marketing';

export interface JobOpening {
  /** Sanity document _id */
  id: string;

  /** URL-safe slug */
  slug: string;

  /** Job title */
  title: string;

  /** Team / function */
  department: Department;

  /** Work location or "Remote" */
  location: string;

  /** Whether this is a remote position */
  isRemote: boolean;

  /** Employment type */
  type: EmploymentType;

  /** Short description for listing cards */
  summary: string;

  /** Whether this position is currently accepting applications */
  isActive: boolean;

  /** ISO date string of when the listing was published */
  publishedAt: string;

  /**
   * TODO(careers): Add full job description (rich text from CMS)
   * TODO(careers): Add required qualifications array
   * TODO(careers): Add application URL or embedded form reference
   */
}
