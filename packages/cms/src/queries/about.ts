import 'server-only';

import { sanityClient, isSanityConfigured, createNextFetchOptions } from '../client/sanityClient';
import { CACHE_TAGS } from '../constants/cache-tags';
import type { CmsAboutPage } from '../types';
import type { SanityClient } from '@sanity/client';

/**
 * GROQ query for About Page singleton document.
 * Excludes unpublished drafts.
 */
export const aboutPageQuery = `*[_type == "aboutPage" && !(_id in path("drafts.**"))][0] {
  _id,
  _type,
  title,
  tagline,
  companyStory,
  mission,
  vision,
  leadership[] {
    name,
    role,
    bio,
    image {
      asset-> { _id, url, metadata { dimensions } },
      altText,
      caption
    },
    socialLinks[] {
      platform,
      url,
      label
    }
  },
  values[] {
    title,
    description,
    iconName
  },
  milestones[] {
    year,
    title,
    description
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

export async function getAboutPage(
  client: SanityClient = sanityClient,
): Promise<CmsAboutPage | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    return await client.fetch<CmsAboutPage | null>(
      aboutPageQuery,
      {},
      createNextFetchOptions([CACHE_TAGS.about]),
    );
  } catch (error) {
    console.warn('[getAboutPage] CMS fetch failed:', error);
    return null;
  }
}
