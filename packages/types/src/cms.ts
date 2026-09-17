/**
 * Shared Sanity CMS base types.
 *
 * These are the building blocks for all CMS document types.
 * Full document types live in @prixtara/cms and apps/studio.
 *
 * TODO(cms): Add portable text types when content model is finalised.
 */

/** Base fields present on all Sanity documents */
export interface SanityDocument {
  _id: string;
  _type: string;
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
}

/** Sanity slug field */
export interface SanitySlug {
  _type: 'slug';
  current: string;
}

/** Sanity image asset reference */
export interface SanityImageAsset {
  _type: 'reference';
  _ref: string;
}

export interface SanityImage {
  _type: 'image';
  asset: SanityImageAsset;
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

/** Sanity file asset reference */
export interface SanityFile {
  _type: 'file';
  asset: {
    _type: 'reference';
    _ref: string;
  };
}

/** Sanity block content (Portable Text) — minimal representation */
export interface SanityBlock {
  _type: 'block';
  _key: string;
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks: string[];
  }>;
  markDefs: Array<{ _key: string; _type: string }>;
  style: string;
}

/** Union type for Portable Text content */
export type PortableTextContent = SanityBlock | SanityImage;
