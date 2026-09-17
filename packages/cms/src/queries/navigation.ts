import 'server-only';

import { sanityClient, isSanityConfigured, createNextFetchOptions } from '../client/sanityClient';
import { CACHE_TAGS } from '../constants/cache-tags';
import type { CmsNavigation } from '../types';
import type { SanityClient } from '@sanity/client';

/**
 * GROQ query for Site Navigation document.
 * Excludes unpublished drafts.
 */
export const navigationQuery = `*[_type == "navigation" && !(_id in path("drafts.**"))][0] {
  _id,
  _type,
  title,
  primaryNavigation[] {
    label,
    description,
    linkType,
    internalPath,
    externalUrl,
    openInNewTab,
    badge,
    children[] {
      label,
      description,
      path,
      isExternal
    }
  },
  cta {
    label,
    linkType,
    internalPath,
    externalUrl,
    variant,
    openInNewTab
  },
  footerNavigation[] {
    columnTitle,
    links[] {
      label,
      href,
      isExternal,
      badge
    }
  },
  externalLinks[] {
    label,
    url,
    description,
    openInNewTab
  }
}`;

/**
 * Fetch Navigation document from Sanity.
 */
export async function getNavigation(
  client: SanityClient = sanityClient,
): Promise<CmsNavigation | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    const nav = await client.fetch<CmsNavigation | null>(
      navigationQuery,
      {},
      createNextFetchOptions([CACHE_TAGS.navigation]),
    );
    return nav ?? null;
  } catch (error) {
    console.warn('[getNavigation] CMS fetch failed:', error);
    return null;
  }
}
