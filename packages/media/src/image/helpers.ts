import type {
  HeadlessImageProps,
  HotspotCoordinates,
  ImageSourceInput,
  NormalizedImage,
} from '../types';
import { normalizeHotspot } from './normalize';

/**
 * Returns a React style object with the CSS `objectPosition` computed from focal point coordinates.
 */
export function getFocalPointStyle(hotspot?: HotspotCoordinates): { objectPosition: string } {
  const { objectPosition } = normalizeHotspot(hotspot);
  return { objectPosition };
}

/**
 * Extracts alt text safely from a variety of source inputs.
 * Guarantees a non-empty string to maintain accessibility compliance.
 */
export function extractAltText(
  source: ImageSourceInput,
  fallback = 'Prixtara technology visual representation',
): string {
  if (!source) return fallback;

  if (typeof source === 'object') {
    if (source.alt && source.alt.trim().length > 0) {
      return source.alt.trim();
    }
    if (source.altText && source.altText.trim().length > 0) {
      return source.altText.trim();
    }
    if (source.caption && source.caption.trim().length > 0) {
      return source.caption.trim();
    }
  }

  return fallback;
}

/**
 * Extracts caption if present on the source object.
 */
export function extractCaption(source: ImageSourceInput): string | undefined {
  if (source && typeof source === 'object' && source.caption) {
    const trimmed = source.caption.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  return undefined;
}

/**
 * Extracts photographer / creator credit if present on the source object.
 */
export function extractCredit(source: ImageSourceInput): string | undefined {
  if (source && typeof source === 'object' && source.credit) {
    const trimmed = source.credit.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  return undefined;
}

/**
 * Extracts hotspot coordinates if present on the source object.
 */
export function extractHotspot(source: ImageSourceInput): HotspotCoordinates | undefined {
  if (source && typeof source === 'object' && source.hotspot) {
    return source.hotspot;
  }
  return undefined;
}

/**
 * Converts a NormalizedImage into clean HTML5 / Next.js compatible element props.
 * Completely headless: contains zero CSS classes, animations, or styling assumptions.
 */
export function toHeadlessImageProps(image: NormalizedImage): HeadlessImageProps {
  return {
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    srcSet: image.srcSet || undefined,
    sizes: image.sizes || undefined,
    loading: image.loading,
    fetchPriority: image.priority ? 'high' : 'auto',
    decoding: 'async',
    style: {
      objectPosition: image.objectPosition,
      aspectRatio: `${image.width} / ${image.height}`,
    },
  };
}
