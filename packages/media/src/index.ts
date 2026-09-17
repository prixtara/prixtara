/**
 * @prixtara/media
 *
 * Media pipeline utilities and provider-agnostic abstraction layer.
 * Decouples presentation components from underlying storage, CMS, and video CDNs:
 *
 * CMS / Storage
 *   → media reference
 *   → media abstraction (@prixtara/media)
 *   → page / component
 *
 * Components consume normalized media objects rather than hardcoded file paths.
 */

import { mediaService } from './providers/registry';
import type {
  ImageSourceInput,
  ImageTransformOptions,
  NormalizedImage,
  NormalizedVideo,
  VideoIntent,
  VideoSourceInput,
} from './types';

// Re-export all submodules
export * from './types';
export * from './constants';
export * from './image';
export * from './video';
export * from './providers';

/**
 * Top-level convenience facade to resolve an image source input into a NormalizedImage.
 */
export function resolveImage(
  source: ImageSourceInput,
  options?: ImageTransformOptions,
): NormalizedImage {
  return mediaService.resolveImage(source, options);
}

/**
 * Top-level convenience facade to resolve a video source input into a NormalizedVideo.
 */
export function resolveVideo(
  source: VideoSourceInput,
  intent?: Partial<VideoIntent>,
): NormalizedVideo {
  return mediaService.resolveVideo(source, intent);
}

/**
 * Top-level convenience facade to obtain a direct image URL.
 */
export function getImageUrl(source: ImageSourceInput, options?: ImageTransformOptions): string {
  return mediaService.getImageUrl(source, options);
}

/**
 * Top-level convenience facade to obtain a video playback URL.
 */
export function getVideoPlaybackUrl(source: VideoSourceInput): string {
  return mediaService.getVideoPlaybackUrl(source);
}

/**
 * Backwards-compatible helper for Sanity image URL generation.
 */
export function getSanityImageUrl(ref: string, width?: number): string {
  if (!ref) return '';
  const sanityProvider = mediaService.getImageProvider('sanity-image');
  return sanityProvider.getImageUrl(ref, width ? { width } : undefined);
}

/**
 * Backwards-compatible helper for video poster URL resolution.
 */
export function getVideoPosterUrl(videoRef: string): string {
  if (!videoRef) return '';
  const videoProvider = mediaService.getVideoProvider();
  return videoProvider.getPosterUrl?.(videoRef) ?? '';
}
