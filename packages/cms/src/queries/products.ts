import 'server-only';

import { sanityClient, isSanityConfigured, createNextFetchOptions } from '../client/sanityClient';
import { CACHE_TAGS } from '../constants/cache-tags';
import type { CmsProduct } from '../types';
import type { SanityClient } from '@sanity/client';

/**
 * GROQ query to retrieve all published products for listing and catalog pages.
 * Excludes unpublished drafts.
 */
export const allProductsQuery = `*[_type == "product" && !(_id in path("drafts.**"))] | order(_createdAt asc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  "name": title,
  "slug": slug.current,
  productCategory,
  "category": productCategory,
  shortDescription,
  "tagline": shortDescription,
  thumbnail {
    asset-> { _id, url, metadata { dimensions } },
    altText,
    caption
  },
  metrics[] {
    value,
    unit,
    label,
    context,
    highlight
  },
  features[] {
    title,
    description,
    badge,
    iconName
  }
}`;

/**
 * GROQ query to retrieve full product details for individual /products/[slug] pages.
 */
export const productBySlugQuery = `*[_type == "product" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  "name": title,
  "slug": slug.current,
  productCategory,
  "category": productCategory,
  shortDescription,
  "tagline": shortDescription,
  longDescription,
  thumbnail {
    asset-> { _id, url, metadata { dimensions } },
    altText,
    caption
  },
  heroMedia {
    mediaType,
    image {
      asset-> { _id, url, metadata { dimensions } },
      altText,
      caption,
      credit
    },
    video {
      title,
      videoFile { asset-> { _id, url } },
      externalUrl,
      posterImage { asset-> { _id, url }, altText },
      autoPlay,
      loop
    }
  },
  gallery[] {
    asset-> { _id, url, metadata { dimensions } },
    altText,
    caption,
    credit
  },
  video {
    title,
    videoFile { asset-> { _id, url } },
    externalUrl,
    posterImage { asset-> { _id, url }, altText }
  },
  problemStatement,
  solution,
  capabilities[] {
    title,
    description,
    badge,
    metricsSummary
  },
  technicalDetails[] {
    category,
    items[] {
      label,
      value,
      description
    }
  },
  metrics[] {
    value,
    unit,
    label,
    context,
    highlight
  },
  features[] {
    title,
    description,
    badge,
    iconName
  },
  useCases[] {
    title,
    targetAudience,
    scenario,
    impact
  },
  applications[] {
    industry,
    title,
    description,
    deploymentType
  },
  process[] {
    stepNumber,
    title,
    description,
    duration
  },
  cta {
    headline,
    description,
    buttonLabel,
    buttonUrl
  },
  "relatedProducts": relatedProducts[]-> {
    _id,
    title,
    "slug": slug.current,
    productCategory,
    shortDescription,
    thumbnail { asset-> { _id, url }, altText }
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
 * Lightweight GROQ query for static path pre-generation.
 */
export const allProductSlugsQuery = `*[_type == "product" && !(_id in path("drafts.**")) && defined(slug.current)][].slug.current`;

/**
 * Fetch all products from Sanity.
 */
export async function getAllProducts(client: SanityClient = sanityClient): Promise<CmsProduct[]> {
  if (!isSanityConfigured()) {
    return [];
  }
  try {
    const products = await client.fetch<CmsProduct[]>(
      allProductsQuery,
      {},
      createNextFetchOptions([CACHE_TAGS.products]),
    );
    return products || [];
  } catch (error) {
    console.warn('[getAllProducts] CMS fetch failed, falling back to seed data:', error);
    return [];
  }
}

/**
 * Fetch a single product by slug from Sanity.
 */
export async function getProductBySlug(
  slug: string,
  client: SanityClient = sanityClient,
): Promise<CmsProduct | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    const product = await client.fetch<CmsProduct | null>(
      productBySlugQuery,
      { slug },
      createNextFetchOptions([CACHE_TAGS.products, CACHE_TAGS.product(slug)]),
    );
    return product;
  } catch (error) {
    console.warn(`[getProductBySlug] CMS fetch failed for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch all published product slugs for generateStaticParams.
 */
export async function getAllProductSlugs(client: SanityClient = sanityClient): Promise<string[]> {
  if (!isSanityConfigured()) {
    return [];
  }
  try {
    const slugs = await client.fetch<string[]>(
      allProductSlugsQuery,
      {},
      createNextFetchOptions([CACHE_TAGS.products]),
    );
    return slugs || [];
  } catch (error) {
    console.warn('[getAllProductSlugs] CMS slug fetch failed:', error);
    return [];
  }
}
