import 'server-only';

import { sanityClient, isSanityConfigured, createNextFetchOptions } from '../client/sanityClient';
import { CACHE_TAGS } from '../constants/cache-tags';
import type { CmsVisionPage } from '../types';
import type { SanityClient } from '@sanity/client';

/**
 * GROQ query for Vision page singleton document.
 * Excludes unpublished drafts.
 */
export const visionPageQuery = `*[_type == "visionPage" && !(_id in path("drafts.**"))][0] {
  _id,
  _type,
  title,
  introduction,
  contentSections[] {
    heading,
    subheading,
    body,
    media {
      asset-> { _id, url, metadata { dimensions } },
      altText,
      caption,
      credit
    }
  },
  principles[] {
    number,
    title,
    description,
    impact
  },
  technologyThemes[] {
    title,
    description,
    category,
    tags
  },
  media {
    asset-> { _id, url, metadata { dimensions } },
    altText,
    caption,
    credit
  },
  seo {
    metaTitle,
    metaDescription,
    canonicalUrl,
    ogImage { asset-> { _id, url }, alt },
    noindex,
    structuredData
  }
}`;

export async function getVisionPage(
  client: SanityClient = sanityClient,
): Promise<CmsVisionPage | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    return await client.fetch<CmsVisionPage | null>(
      visionPageQuery,
      {},
      createNextFetchOptions([CACHE_TAGS.vision]),
    );
  } catch (error) {
    console.warn('[getVisionPage] CMS fetch failed:', error);
    return null;
  }
}
