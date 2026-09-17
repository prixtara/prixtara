import 'server-only';

import { sanityClient, isSanityConfigured, createNextFetchOptions } from '../client/sanityClient';

/**
 * GROQ query for About Page singleton document.
 */
export const aboutPageQuery = `*[_type == "aboutPage"][0] {
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

export async function getAboutPage(): Promise<Record<string, unknown> | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    return await sanityClient.fetch(aboutPageQuery, {}, createNextFetchOptions(['about']));
  } catch (error) {
    console.warn('[getAboutPage] CMS fetch failed:', error);
    return null;
  }
}
