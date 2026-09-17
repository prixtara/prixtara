import type {
  CropCoordinates,
  FetchPriority,
  HotspotCoordinates,
  ImageFit,
  ImageFormat,
  ImageMimeType,
  LoadingStrategy,
  MediaSourceType,
} from './common';

/**
 * Flexible input accepted by image resolution and normalization functions.
 */
export type ImageSourceInput =
  | string
  | {
      src?: string;
      url?: string;
      asset?: {
        _ref?: string;
        url?: string;
        _id?: string;
      };
      alt?: string;
      altText?: string;
      caption?: string;
      credit?: string;
      hotspot?: HotspotCoordinates;
      crop?: CropCoordinates;
      width?: number;
      height?: number;
    }
  | null
  | undefined;

/**
 * Options for transforming or resizing images.
 */
export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: ImageFormat;
  fit?: ImageFit;
  hotspot?: HotspotCoordinates;
  crop?: CropCoordinates;
  dpr?: number;
  priority?: boolean;
  loading?: LoadingStrategy;
  sizes?: string;
  widths?: number[];
  fallbackAlt?: string;
}

/**
 * Normalized Image object decoupled from underlying storage or CMS provider.
 * Presentation components consume this uniform contract.
 */
export interface NormalizedImage {
  /** Canonical, optimized image URL */
  src: string;
  /** Intrinsic or target display width in pixels */
  width: number;
  /** Intrinsic or target display height in pixels */
  height: number;
  /** Width / Height ratio */
  aspectRatio: number;
  /** Mandatory accessible alternative description (never empty) */
  alt: string;
  /** Optional editorial caption */
  caption?: string;
  /** Optional photographer / source attribution */
  credit?: string;
  /** Responsive srcSet string (e.g. "image-640.webp 640w, image-1024.webp 1024w") */
  srcSet: string;
  /** Standard responsive sizes attribute (e.g. "(max-width: 768px) 100vw, 50vw") */
  sizes: string;
  /** Focal point coordinates for smart cropping */
  hotspot?: HotspotCoordinates;
  /** CSS object-position string derived from hotspot (e.g. "45% 60%") */
  objectPosition?: string;
  /** Browser loading strategy */
  loading: LoadingStrategy;
  /** Indicates high-priority above-the-fold image */
  priority: boolean;
  /** Image MIME type if known */
  mimeType?: ImageMimeType;
  /** Identified origin of the asset */
  sourceType: MediaSourceType;
  /** Original asset reference or ID if derived from CMS/storage */
  originalRef?: string;
}

/**
 * Properties required to generate responsive image descriptors.
 */
export interface ResponsiveImageOptions {
  widths?: number[];
  sizes?: string;
  quality?: number;
  format?: ImageFormat;
}

/**
 * Clean headless image properties ready for standard HTML <img> or Next.js Image.
 */
export interface HeadlessImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  srcSet?: string;
  sizes?: string;
  loading?: LoadingStrategy;
  fetchPriority?: FetchPriority;
  decoding?: 'async' | 'auto' | 'sync';
  style?: {
    objectPosition?: string;
    aspectRatio?: string;
  };
}
