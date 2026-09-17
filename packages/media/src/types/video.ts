import type { MediaDimensions, MediaSourceType, StreamingProtocol, VideoMimeType } from './common';
import type { ImageSourceInput, NormalizedImage } from './image';

/**
 * Playback behavior and browser presentation preferences.
 */
export interface VideoIntent {
  /** Autoplay intent. Note: Browsers mandate muted=true for autoplay to succeed without interaction. */
  autoplay: boolean;
  /** Muted audio intent */
  muted: boolean;
  /** Continuous loop intent */
  loop: boolean;
  /** Inline mobile playback (avoids forced fullscreen on iOS) */
  playsInline: boolean;
  /** Browser asset preload strategy */
  preload: 'none' | 'metadata' | 'auto';
  /** Display native browser playback controls */
  controls: boolean;
}

/**
 * Alternative stream rendition or fallback file.
 */
export interface VideoRendition {
  src: string;
  mimeType: VideoMimeType;
  width?: number;
  height?: number;
  quality?: 'high' | 'medium' | 'low' | 'master' | string;
}

/**
 * Subtitle, closed-caption, or description track.
 */
export interface VideoTrack {
  src: string;
  kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters';
  label: string;
  srcLang: string;
  default?: boolean;
}

/**
 * Intrinsic technical metadata of the video asset.
 */
export interface VideoMetadata {
  duration?: number;
  width?: number;
  height?: number;
  aspectRatio?: number;
  mimeType: VideoMimeType;
  title?: string;
  description?: string;
  fps?: number;
  bitrateKbps?: number;
  streamingProtocol: StreamingProtocol;
}

/**
 * Raw input passed to video resolution functions.
 */
export type VideoSourceInput =
  | string
  | {
      src?: string;
      url?: string;
      externalUrl?: string;
      videoFile?: {
        asset?: {
          url?: string;
          _ref?: string;
          _id?: string;
        };
      };
      provider?: 'mux' | 'stream' | 'sanity' | 'local' | 'external';
      playbackId?: string;
      title?: string;
      poster?: ImageSourceInput;
      posterImage?: ImageSourceInput;
      duration?: number;
      mimeType?: VideoMimeType;
      width?: number;
      height?: number;
      autoPlay?: boolean;
      loop?: boolean;
      muted?: boolean;
    }
  | null
  | undefined;

/**
 * Normalized Video model consumed by UI components.
 * Completely isolates the player from whether media is hosted locally, on Sanity, or streaming via Mux/CDN.
 */
export interface NormalizedVideo {
  /** Primary playback or manifest URL */
  src: string;
  /** Primary MIME type */
  mimeType: VideoMimeType;
  /** Resolved poster frame */
  poster?: NormalizedImage | string;
  /** Duration in seconds if known */
  duration?: number;
  /** Intrinsic dimensions */
  dimensions?: MediaDimensions;
  /** Renditions and progressive fallbacks */
  sources: VideoRendition[];
  /** Enforced browser playback intents */
  intent: VideoIntent;
  /** Source provider origin */
  sourceType: MediaSourceType;
  /** Streaming delivery protocol */
  streamingProtocol: StreamingProtocol;
  /** Provider-specific identifier (e.g. Mux playback ID) */
  providerId?: string;
  /** HLS adaptive bitrate manifest (.m3u8) if available */
  streamingUrl?: string;
  /** Direct downloadable progressive video file */
  downloadUrl?: string;
  /** Video title for accessibility and SEO */
  title?: string;
  /** Text tracks */
  tracks?: VideoTrack[];
}

/**
 * Headless HTML <video> attributes.
 */
export interface HeadlessVideoProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  controls?: boolean;
  title?: string;
  style?: {
    aspectRatio?: string;
    objectFit?: 'cover' | 'contain' | 'fill';
  };
}
