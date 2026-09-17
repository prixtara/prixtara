/**
 * Sanity CMS document types derived from schema definitions.
 *
 * These types represent the shape of data returned from GROQ queries.
 * They are separate from the base types in @prixtara/types which are
 * CMS-agnostic.
 *
 * TODO(cms): Generate these automatically from Sanity schema using
 *            'sanity typegen generate' when content model is finalised.
 * TODO(cms): Use next-sanity's defineQuery helper for type-safe GROQ.
 */
import type { SanityDocument, SanitySlug, SanityImage } from '@prixtara/types';
import type { ProductSlug, ProductCategory } from '@prixtara/types';

/** CMS-backed product document */
export interface CmsProduct extends SanityDocument {
  _type: 'product';
  name: string;
  slug: SanitySlug;
  productSlug: ProductSlug;
  tagline: string;
  category: ProductCategory;
  // TODO(cms): Add: description (PortableText), heroImage, gallery, specs
}

/** CMS-backed job opening document */
export interface CmsJobOpening extends SanityDocument {
  _type: 'jobOpening';
  title: string;
  slug: SanitySlug;
  department: string;
  location: string;
  isRemote: boolean;
  employmentType: string;
  summary: string;
  isActive: boolean;
  publishedAt: string;
  // TODO(cms): Add: description (PortableText), requirements, applicationUrl
}

/** CMS-backed page document (for Vision, About, etc.) */
export interface CmsPage extends SanityDocument {
  _type: 'page';
  title: string;
  slug: SanitySlug;
  heroImage?: SanityImage;
  // TODO(cms): Add: body (PortableText), seoTitle, seoDescription, ogImage
}
