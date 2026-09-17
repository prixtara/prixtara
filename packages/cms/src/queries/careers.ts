import 'server-only';

import { sanityClient, isSanityConfigured, createNextFetchOptions } from '../client/sanityClient';
import { CACHE_TAGS } from '../constants/cache-tags';
import type { CmsJobOpening } from '../types';
import type { SanityClient } from '@sanity/client';

/**
 * GROQ query for Careers overview singleton page.
 * Excludes unpublished drafts.
 */
export const careerPageQuery = `*[_type == "careerPage" && !(_id in path("drafts.**"))][0] {
  _id,
  _type,
  title,
  introHeadline,
  pageContent,
  cultureContent {
    headline,
    description,
    coreValues[] {
      title,
      description
    }
  },
  benefits[] {
    title,
    description,
    category,
    iconName
  },
  cta {
    headline,
    description,
    buttonLabel,
    applicationEmail
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

/**
 * GROQ query for active published job openings.
 * Excludes unpublished drafts.
 */
export const activeJobOpeningsQuery = `*[_type == "jobPosting" && !(_id in path("drafts.**")) && published == true] | order(publishedAt desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  department,
  location,
  isRemote,
  employmentType,
  summary,
  published,
  publishedAt
}`;

/**
 * GROQ query for a single job opening by its slug.
 * Excludes unpublished drafts.
 */
export const jobOpeningBySlugQuery = `*[_type == "jobPosting" && !(_id in path("drafts.**")) && published == true && slug.current == $slug][0] {
  _id,
  _type,
  title,
  "slug": slug.current,
  department,
  location,
  isRemote,
  employmentType,
  summary,
  description,
  responsibilities,
  requirements,
  optionalRequirements,
  published,
  publishedAt,
  applicationCta {
    type,
    destination,
    buttonText,
    instructions
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

/**
 * Lightweight query for job opening slugs for generateStaticParams.
 * Excludes unpublished drafts.
 */
export const allJobOpeningSlugsQuery = `*[_type == "jobPosting" && !(_id in path("drafts.**")) && published == true && defined(slug.current)][].slug.current`;

export async function getCareerPage(
  client: SanityClient = sanityClient,
): Promise<Record<string, unknown> | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    return await client.fetch(careerPageQuery, {}, createNextFetchOptions([CACHE_TAGS.careers]));
  } catch (error) {
    console.warn('[getCareerPage] CMS fetch failed:', error);
    return null;
  }
}

export async function getActiveJobOpenings(
  client: SanityClient = sanityClient,
): Promise<CmsJobOpening[]> {
  if (!isSanityConfigured()) {
    return [];
  }
  try {
    const openings = await client.fetch<CmsJobOpening[]>(
      activeJobOpeningsQuery,
      {},
      createNextFetchOptions([CACHE_TAGS.jobs, CACHE_TAGS.careers]),
    );
    return openings || [];
  } catch (error) {
    console.warn('[getActiveJobOpenings] CMS fetch failed:', error);
    return [];
  }
}

export async function getJobOpeningBySlug(
  slug: string,
  client: SanityClient = sanityClient,
): Promise<CmsJobOpening | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    return await client.fetch<CmsJobOpening | null>(
      jobOpeningBySlugQuery,
      { slug },
      createNextFetchOptions([CACHE_TAGS.jobs, CACHE_TAGS.job(slug)]),
    );
  } catch (error) {
    console.warn(`[getJobOpeningBySlug] CMS fetch failed for slug "${slug}":`, error);
    return null;
  }
}

export async function getAllJobOpeningSlugs(
  client: SanityClient = sanityClient,
): Promise<string[]> {
  if (!isSanityConfigured()) {
    return [];
  }
  try {
    const slugs = await client.fetch<string[]>(
      allJobOpeningSlugsQuery,
      {},
      createNextFetchOptions([CACHE_TAGS.jobs]),
    );
    return slugs || [];
  } catch (error) {
    console.warn('[getAllJobOpeningSlugs] CMS fetch failed:', error);
    return [];
  }
}
