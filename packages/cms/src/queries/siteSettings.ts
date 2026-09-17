import 'server-only';

import { sanityClient, isSanityConfigured, createNextFetchOptions } from '../client/sanityClient';
import { CACHE_TAGS } from '../constants/cache-tags';
import type { CmsSiteSettings } from '../types';
import type { SanityClient } from '@sanity/client';

/**
 * GROQ query for Site Settings document.
 * Excludes unpublished drafts.
 */
export const siteSettingsQuery = `*[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
  _id,
  _type,
  companyName,
  logo {
    asset-> { _id, url, metadata { dimensions } },
    altText,
    caption,
    credit
  },
  logoDark {
    asset-> { _id, url, metadata { dimensions } },
    altText,
    caption,
    credit
  },
  favicon {
    asset-> { _id, url }
  },
  primaryContact,
  socialLinks[] {
    platform,
    label,
    url
  },
  defaultSeo {
    metaTitle,
    metaDescription,
    canonicalUrl,
    ogImage {
      asset-> { _id, url, metadata { dimensions } },
      alt
    },
    noindex,
    structuredData
  },
  defaultOgImage {
    asset-> { _id, url, metadata { dimensions } },
    altText,
    caption,
    credit
  },
  footer {
    copyrightText,
    tagline,
    disclaimer,
    legalLinks[] {
      label,
      href,
      isExternal
    }
  }
}`;

/**
 * Fetch global Site Settings document from Sanity.
 */
export async function getSiteSettings(
  client: SanityClient = sanityClient,
): Promise<CmsSiteSettings | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    const settings = await client.fetch<CmsSiteSettings | null>(
      siteSettingsQuery,
      {},
      createNextFetchOptions([CACHE_TAGS.siteSettings]),
    );
    return settings ?? null;
  } catch (error) {
    console.warn('[getSiteSettings] CMS fetch failed:', error);
    return null;
  }
}
