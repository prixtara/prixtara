import 'server-only';

import {
  getAboutPage,
  getVisionPage,
  normalizeCmsAboutPage,
  normalizeCmsVisionPage,
  SEED_FALLBACK_PAGES,
  isSanityConfigured,
  type CmsAboutPage,
  type CmsVisionPage,
} from '@prixtara/cms';
import type { NormalizedPage } from '../models';
import type { PageRepository } from './interfaces';

/**
 * Sanity-backed Page repository implementation.
 * Handles marketing pages such as /about and /vision.
 */
export class SanityPageRepository implements PageRepository {
  async getPageBySlug(slug: string): Promise<NormalizedPage | null> {
    try {
      if (slug === 'about') {
        const raw = await getAboutPage();
        if (raw) {
          const normalized = normalizeCmsAboutPage(raw as unknown as CmsAboutPage);
          return {
            id: normalized.id,
            slug: normalized.slug,
            title: normalized.title,
            description: normalized.description,
            body:
              typeof normalized.data['companyStory'] === 'string'
                ? normalized.data['companyStory']
                : undefined,
            data: normalized.data,
            seo: normalized.seo
              ? {
                  title: normalized.seo.metaTitle,
                  description: normalized.seo.metaDescription,
                }
              : undefined,
          };
        }
        if (isSanityConfigured()) {
          return null;
        }
      }

      if (slug === 'vision') {
        const raw = await getVisionPage();
        if (raw) {
          const normalized = normalizeCmsVisionPage(raw as unknown as CmsVisionPage);
          return {
            id: normalized.id,
            slug: normalized.slug,
            title: normalized.title,
            description: normalized.description,
            body: normalized.description,
            data: normalized.data,
            seo: normalized.seo
              ? {
                  title: normalized.seo.metaTitle,
                  description: normalized.seo.metaDescription,
                }
              : undefined,
          };
        }
        if (isSanityConfigured()) {
          return null;
        }
      }
    } catch (error) {
      console.warn(`[SanityPageRepository] Failed to fetch page "${slug}" from CMS:`, error);
    }

    const fallback = SEED_FALLBACK_PAGES[slug];
    if (fallback) {
      return {
        id: fallback.id,
        slug: fallback.slug,
        title: fallback.title,
        description: fallback.description,
        body: fallback.description,
        data: fallback.data,
        seo: fallback.seo
          ? {
              title: fallback.seo.metaTitle,
              description: fallback.seo.metaDescription,
            }
          : undefined,
      };
    }

    return null;
  }

  async getAllPageSlugs(): Promise<string[]> {
    return Object.keys(SEED_FALLBACK_PAGES);
  }
}

/** Backward compatibility alias */
export { SanityPageRepository as CmsPageRepository };
