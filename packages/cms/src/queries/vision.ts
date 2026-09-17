import 'server-only';

import { sanityClient, isSanityConfigured, createNextFetchOptions } from '../client/sanityClient';

/**
 * GROQ query for Vision page singleton document.
 */
export const visionPageQuery = `*[_type == "visionPage"][0] {
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

export async function getVisionPage(): Promise<Record<string, unknown> | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    return await sanityClient.fetch(visionPageQuery, {}, createNextFetchOptions(['vision']));
  } catch (error) {
    console.warn('[getVisionPage] CMS fetch failed:', error);
    return null;
  }
}
