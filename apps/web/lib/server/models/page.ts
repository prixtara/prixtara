/**
 * Normalized Static / Marketing Page domain model.
 */

export interface NormalizedPage {
  id: string;
  slug: string;
  title: string;
  description?: string;
  body?: string;
  seo?: {
    title?: string;
    description?: string;
  };
}
