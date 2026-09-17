import type { MediaSourceType } from './common';
import type { ImageSourceInput, ImageTransformOptions, NormalizedImage } from './image';
import type { NormalizedVideo, VideoIntent, VideoSourceInput } from './video';

/**
 * Pluggable Image Provider contract.
 * Enables zero-downtime swapping between Local, Sanity, and CDN/Storage image providers.
 */
export interface ImageProvider {
  /** Distinct identifier of this provider */
  readonly name: string;
  /** Supported origin types */
  readonly supportedSourceTypes: readonly MediaSourceType[];
  /** Determines if this provider can handle the given input */
  canHandle(source: ImageSourceInput): boolean;
  /** Resolves source input into a fully normalized image */
  resolveImage(source: ImageSourceInput, options?: ImageTransformOptions): NormalizedImage;
  /** Returns direct optimized URL */
  getImageUrl(source: ImageSourceInput, options?: ImageTransformOptions): string;
  /** Returns responsive srcSet string */
  getSrcSet?(source: ImageSourceInput, widths?: number[], options?: ImageTransformOptions): string;
}

/**
 * Pluggable Video Provider contract.
 * Decouples video delivery from local files and provides drop-in readiness for dedicated streaming CDNs (e.g. Mux).
 */
export interface VideoProvider {
  /** Distinct identifier of this provider */
  readonly name: string;
  /** Supported origin types */
  readonly supportedSourceTypes: readonly MediaSourceType[];
  /** Determines if this provider can handle the given input */
  canHandle(source: VideoSourceInput): boolean;
  /** Resolves source input into a fully normalized video structure */
  resolveVideo(source: VideoSourceInput, intent?: Partial<VideoIntent>): NormalizedVideo;
  /** Resolves primary streaming or playback URL */
  getPlaybackUrl(source: VideoSourceInput): string;
  /** Resolves poster image URL if available */
  getPosterUrl?(source: VideoSourceInput): string | null;
}

/**
 * Options for configuring media service and active providers.
 */
export interface MediaServiceConfig {
  defaultImageProvider?: string;
  defaultVideoProvider?: string;
  localAssetBasePath?: string;
  sanityProjectId?: string;
  sanityDataset?: string;
  externalVideoCdnHost?: string;
}
