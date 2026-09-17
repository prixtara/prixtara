/**
 * Normalized Static / Marketing Page domain model.
 */

export interface NormalizedPage {
  id: string;
  slug: string;
  title: string;
  description?: string;
  body?: string;
  data?: Record<string, unknown>;
  seo?: {
    title?: string;
    description?: string;
  };
}
