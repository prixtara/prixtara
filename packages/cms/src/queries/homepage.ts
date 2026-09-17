import 'server-only';

import { sanityClient, isSanityConfigured, createNextFetchOptions } from '../client/sanityClient';
import { CACHE_TAGS } from '../constants/cache-tags';
import type { CmsHomepage } from '../types';
import type { SanityClient } from '@sanity/client';

/**
 * GROQ query for Homepage document with expanded polymorphic sections.
 * Excludes unpublished drafts.
 */
export const homepageQuery = `*[_type == "homepage" && !(_id in path("drafts.**"))][0] {
  _id,
  _type,
  title,
  sections[] {
    _key,
    _type,
    _type == "heroSection" => {
      headline,
      subheadline,
      tagline,
      primaryCta { label, linkType, internalPath, externalUrl, variant },
      secondaryCta { label, linkType, internalPath, externalUrl, variant },
      backgroundVideo {
        title,
        videoFile { asset-> { _id, url } },
        externalUrl,
        posterImage { asset-> { _id, url }, altText },
        autoPlay,
        loop
      },
      backgroundImage { asset-> { _id, url }, altText, caption, credit },
      badges
    },
    _type == "productsSection" => {
      sectionTitle,
      sectionSubtitle,
      displayMode,
      displayMode == "manual" => {
        curatedProducts[]-> {
          _id,
          title,
          "slug": slug.current,
          productCategory,
          shortDescription,
          thumbnail { asset-> { _id, url }, altText, caption },
          metrics[] { value, unit, label, highlight }
        }
      },
      displayMode == "all" => {
        "allProducts": *[_type == "product" && !(_id in path("drafts.**"))] | order(_createdAt asc) {
          _id,
          title,
          "slug": slug.current,
          productCategory,
          shortDescription,
          thumbnail { asset-> { _id, url }, altText, caption },
          metrics[] { value, unit, label, highlight }
        }
      },
      viewAllCta { label, linkType, internalPath, externalUrl, variant }
    },
    _type == "visionSection" => {
      eyebrow,
      headline,
      description,
      principles[] { number, title, description, impact },
      featuredMedia { asset-> { _id, url }, altText, caption, credit },
      cta { label, linkType, internalPath, externalUrl, variant }
    },
    _type == "metricsSection" => {
      sectionTitle,
      sectionSubtitle,
      metrics[] { value, unit, label, context, highlight }
    },
    _type == "techThemesSection" => {
      sectionTitle,
      sectionDescription,
      themes[] { title, description, badge, iconName }
    },
    _type == "processSection" => {
      sectionTitle,
      sectionDescription,
      steps[] { stepNumber, title, description, duration }
    },
    _type == "ctaSection" => {
      headline,
      description,
      primaryCta { label, linkType, internalPath, externalUrl, variant },
      secondaryCta { label, linkType, internalPath, externalUrl, variant }
    },
    _type == "testimonialsSection" => {
      sectionTitle,
      quotes[] {
        quote,
        author,
        role,
        organization,
        avatar { asset-> { _id, url }, altText }
      }
    }
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
 * Fetch Homepage document from Sanity.
 */
export async function getHomepage(
  client: SanityClient = sanityClient,
): Promise<CmsHomepage | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    const homepage = await client.fetch<CmsHomepage | null>(
      homepageQuery,
      {},
      createNextFetchOptions([CACHE_TAGS.homepage]),
    );
    return homepage ?? null;
  } catch (error) {
    console.warn('[getHomepage] CMS fetch failed:', error);
    return null;
  }
}
