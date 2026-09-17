import 'server-only';

import { sanityClient, isSanityConfigured, createNextFetchOptions } from '../client/sanityClient';
import type { CmsJobOpening } from '../types';

/**
 * GROQ query for Careers overview singleton page.
 */
export const careerPageQuery = `*[_type == "careerPage"][0] {
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
 */
export const activeJobOpeningsQuery = `*[_type == "jobPosting" && published == true] | order(publishedAt desc) {
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
 */
export const jobOpeningBySlugQuery = `*[_type == "jobPosting" && slug.current == $slug][0] {
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
 */
export const allJobOpeningSlugsQuery = `*[_type == "jobPosting" && published == true && defined(slug.current)][].slug.current`;

export async function getCareerPage(): Promise<Record<string, unknown> | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    return await sanityClient.fetch(careerPageQuery, {}, createNextFetchOptions(['careers']));
  } catch (error) {
    console.warn('[getCareerPage] CMS fetch failed:', error);
    return null;
  }
}

export async function getActiveJobOpenings(): Promise<CmsJobOpening[]> {
  if (!isSanityConfigured()) {
    return [];
  }
  try {
    const openings = await sanityClient.fetch<CmsJobOpening[]>(
      activeJobOpeningsQuery,
      {},
      createNextFetchOptions(['careers', 'job-openings']),
    );
    return openings || [];
  } catch (error) {
    console.warn('[getActiveJobOpenings] CMS fetch failed:', error);
    return [];
  }
}

export async function getJobOpeningBySlug(slug: string): Promise<CmsJobOpening | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    return await sanityClient.fetch<CmsJobOpening | null>(
      jobOpeningBySlugQuery,
      { slug },
      createNextFetchOptions([`job-opening:${slug}`]),
    );
  } catch (error) {
    console.warn(`[getJobOpeningBySlug] CMS fetch failed for slug "${slug}":`, error);
    return null;
  }
}

export async function getAllJobOpeningSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) {
    return [];
  }
  try {
    const slugs = await sanityClient.fetch<string[]>(
      allJobOpeningSlugsQuery,
      {},
      createNextFetchOptions(['job-openings']),
    );
    return slugs || [];
  } catch (error) {
    console.warn('[getAllJobOpeningSlugs] CMS fetch failed:', error);
    return [];
  }
}
