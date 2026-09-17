/**
 * @prixtara/media
 *
 * Media pipeline utilities.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  TODO(media): Implement this package                            │
 * │                                                                 │
 * │  Planned capabilities:                                          │
 * │    1. Sanity image URL builder (@sanity/image-url)              │
 * │       - Responsive srcSet generation                            │
 * │       - Hotspot-aware cropping                                  │
 * │       - WebP / AVIF format negotiation                          │
 * │    2. Next.js Image component wrapper                           │
 * │       - Enforces alt text                                       │
 * │       - Standardises sizes prop                                 │
 * │    3. Video asset utilities                                     │
 * │       - Hero video optimisation (for prixtara-hero-video.mp4)  │
 * │       - Poster frame generation                                 │
 * │    4. OG image generation (via @vercel/og)                     │
 * │                                                                 │
 * │  Source assets are in: source-of-info/                         │
 * │    - prixtara-hero-video.mp4                                    │
 * │    - product-1.png (AI-Vision)                                  │
 * │    - product-2.png (Existential AI)                             │
 * │    - product-3.png (Sambhashi)                                  │
 * └─────────────────────────────────────────────────────────────────┘
 */

/**
 * Placeholder for future Sanity image URL builder.
 *
 * TODO(media): Replace with @sanity/image-url builder.
 */
export function getSanityImageUrl(_ref: string, _width?: number): string {
  // TODO(media): Implement with @sanity/image-url
  return '';
}

/**
 * Placeholder for video poster URL.
 *
 * TODO(media): Implement video poster extraction/generation.
 */
export function getVideoPosterUrl(_videoRef: string): string {
  // TODO(media): Implement poster frame generation
  return '';
}
