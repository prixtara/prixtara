/**
 * Common media primitives and shared value types.
 */

export type MediaSourceType = 'local' | 'sanity' | 'mux' | 'cdn' | 'storage' | 'external';

export type ImageMimeType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/webp'
  | 'image/avif'
  | 'image/svg+xml'
  | 'image/gif'
  | 'image/x-icon';

export type VideoMimeType =
  'video/mp4' | 'video/webm' | 'video/quicktime' | 'application/x-mpegURL' | 'application/dash+xml';

export type MediaMimeType = ImageMimeType | VideoMimeType | (string & {});

export interface MediaDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

export interface HotspotCoordinates {
  /** Normalized X focal point between 0 and 1 (left to right) */
  x: number;
  /** Normalized Y focal point between 0 and 1 (top to bottom) */
  y: number;
  /** Optional hotspot area height (0 to 1) */
  height?: number;
  /** Optional hotspot area width (0 to 1) */
  width?: number;
}

export interface CropCoordinates {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export type LoadingStrategy = 'lazy' | 'eager';

export type FetchPriority = 'high' | 'low' | 'auto';

export type ImageFit = 'cover' | 'contain' | 'fill' | 'inside' | 'outside' | 'crop' | 'max';

export type ImageFormat = 'auto' | 'webp' | 'avif' | 'jpg' | 'png';

export type StreamingProtocol = 'hls' | 'dash' | 'progressive';

export interface MediaResolution {
  width: number;
  height: number;
}
