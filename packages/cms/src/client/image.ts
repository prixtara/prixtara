import imageUrlBuilder from '@sanity/image-url';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { clientEnv } from '@prixtara/config/client';
import type { SanityImage } from '@prixtara/types';

// Instantiate Sanity image URL builder using client configuration
const builder = imageUrlBuilder({
  projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
});

/**
 * Returns a configured Sanity image URL builder for generating optimized image URLs.
 * Supports width, height, quality, auto format (webp/avif), and focal-point cropping.
 *
 * @param source - Sanity image object or asset reference
 * @returns ImageUrlBuilder or null if source is invalid
 */
export function urlForImage(
  source: SanityImage | Record<string, unknown> | string | null | undefined,
): ImageUrlBuilder | null {
  if (!source) {
    return null;
  }

  try {
    return builder.image(source).auto('format').fit('max');
  } catch {
    return null;
  }
}
