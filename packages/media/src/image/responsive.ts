import { DEFAULT_IMAGE_BREAKPOINTS, DEFAULT_IMAGE_SIZES } from '../constants';

/**
 * Builds a standard responsive srcset string from an array of target widths.
 * Format: "url-640.webp 640w, url-768.webp 768w, ..."
 */
export function buildSrcSet(
  urlGenerator: (width: number) => string,
  widths: readonly number[] | number[] = DEFAULT_IMAGE_BREAKPOINTS,
): string {
  if (!widths || widths.length === 0) {
    return '';
  }

  const uniqueSorted = Array.from(new Set(widths)).sort((a, b) => a - b);

  return uniqueSorted
    .map((w) => {
      const url = urlGenerator(w);
      return url ? `${url} ${w}w` : null;
    })
    .filter((entry): entry is string => entry !== null && entry.length > 0)
    .join(', ');
}

/**
 * Safely computes the float aspect ratio (width / height).
 * Returns 16/9 (~1.777) as standard fallback if dimensions are absent or zero.
 */
export function calculateAspectRatio(width?: number, height?: number): number {
  if (!width || !height || width <= 0 || height <= 0) {
    return 16 / 9;
  }
  return Number((width / height).toFixed(4));
}

/**
 * Returns a fallback sizes query or passes through a valid custom string.
 */
export function getDefaultSizes(customSizes?: string): string {
  if (customSizes && customSizes.trim().length > 0) {
    return customSizes.trim();
  }
  return DEFAULT_IMAGE_SIZES;
}
