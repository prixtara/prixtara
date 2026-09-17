import type {
  NormalizedImage,
  NormalizedVideo,
  VideoIntent,
  VideoRendition,
  VideoSourceInput,
} from '../types';
import { createVideoIntent } from '../video/helpers';
import { calculateVideoDimensions } from '../video/metadata';
import {
  detectStreamingProtocol,
  inferVideoMimeType,
  parseMuxPlaybackId,
} from '../video/normalize';
import { BaseVideoProvider } from './base';

export interface ExternalVideoProviderOptions {
  streamBaseUrl?: string;
  imageBaseUrl?: string;
  name?: string;
}

/**
 * Production Video Provider ready for Mux, Cloudflare Stream, or dedicated video CDNs.
 * Implements HLS manifest generation, adaptive bitrate renditions, and poster thumbnailing.
 */
export class ExternalVideoProvider extends BaseVideoProvider {
  readonly name: string;
  readonly supportedSourceTypes = ['mux', 'cdn', 'external'] as const;

  private streamBaseUrl: string;
  private imageBaseUrl: string;

  constructor(options: ExternalVideoProviderOptions = {}) {
    super();
    this.name = options.name ?? 'external-video';
    this.streamBaseUrl = options.streamBaseUrl?.replace(/\/+$/, '') ?? 'https://stream.mux.com';
    this.imageBaseUrl = options.imageBaseUrl?.replace(/\/+$/, '') ?? 'https://image.mux.com';
  }

  canHandle(source: VideoSourceInput): boolean {
    if (!source) return false;

    if (typeof source === 'string') {
      const clean = source.trim();
      if (clean.startsWith('mux://')) return true;
      if (clean.includes('stream.mux.com')) return true;
      if (clean.includes('cloudflarestream.com')) return true;
      if (clean.endsWith('.m3u8') || clean.endsWith('.mpd')) return true;
      if (parseMuxPlaybackId(clean) !== null) return true;
    }

    if (typeof source === 'object') {
      if (source.provider === 'mux' || source.provider === 'stream') return true;
      if (typeof source.playbackId === 'string' && source.playbackId.length > 0) {
        return true;
      }
      if (source.url && (source.url.includes('mux.com') || source.url.endsWith('.m3u8'))) {
        return true;
      }
      if (
        source.externalUrl &&
        (source.externalUrl.includes('mux.com') || source.externalUrl.endsWith('.m3u8'))
      ) {
        return true;
      }
    }

    return false;
  }

  private extractPlaybackId(source: VideoSourceInput): string | null {
    if (typeof source === 'string') {
      return parseMuxPlaybackId(source);
    }
    if (source && typeof source === 'object') {
      if (source.playbackId) return source.playbackId;
      if (source.url) return parseMuxPlaybackId(source.url);
      if (source.externalUrl) return parseMuxPlaybackId(source.externalUrl);
    }
    return null;
  }

  getPlaybackUrl(source: VideoSourceInput): string {
    const playbackId = this.extractPlaybackId(source);
    if (playbackId) {
      return `${this.streamBaseUrl}/${playbackId}.m3u8`;
    }

    if (typeof source === 'string') {
      return source.trim();
    }

    if (source && typeof source === 'object') {
      return source.url || source.externalUrl || source.src || '';
    }

    return '';
  }

  override getPosterUrl(source: VideoSourceInput): string | null {
    const playbackId = this.extractPlaybackId(source);
    if (playbackId) {
      return `${this.imageBaseUrl}/${playbackId}/thumbnail.webp?time=0&width=1920`;
    }

    if (source && typeof source === 'object') {
      if (typeof source.poster === 'string') return source.poster;
      if (typeof source.posterImage === 'string') return source.posterImage;
    }

    return null;
  }

  resolveVideo(source: VideoSourceInput, intent?: Partial<VideoIntent>): NormalizedVideo {
    const playbackId = this.extractPlaybackId(source);
    const playbackUrl = this.getPlaybackUrl(source);
    const posterUrl = this.getPosterUrl(source);

    const protocol = detectStreamingProtocol(playbackUrl);
    const mimeType = inferVideoMimeType(playbackUrl);

    const sources: VideoRendition[] = [
      {
        src: playbackUrl,
        mimeType,
        quality: 'adaptive-hls',
      },
    ];

    // If Mux playback ID is available, provide progressive MP4 fallbacks
    if (playbackId) {
      sources.push(
        {
          src: `${this.streamBaseUrl}/${playbackId}/high.mp4`,
          mimeType: 'video/mp4',
          quality: 'high',
        },
        {
          src: `${this.streamBaseUrl}/${playbackId}/medium.mp4`,
          mimeType: 'video/mp4',
          quality: 'medium',
        },
      );
    }

    const poster: NormalizedImage | undefined = posterUrl
      ? {
          src: posterUrl,
          width: 1920,
          height: 1080,
          aspectRatio: 16 / 9,
          alt: `${typeof source === 'object' ? (source?.title ?? 'Video') : 'Video'} preview frame`,
          srcSet: `${posterUrl} 1920w`,
          sizes: '100vw',
          loading: 'lazy',
          priority: false,
          mimeType: 'image/webp',
          sourceType: playbackId ? 'mux' : 'cdn',
        }
      : undefined;

    const dimensions = calculateVideoDimensions(
      typeof source === 'object' ? source?.width : undefined,
      typeof source === 'object' ? source?.height : undefined,
    );

    const resolvedIntent = createVideoIntent(intent);

    return {
      src: playbackUrl,
      mimeType,
      poster,
      duration: typeof source === 'object' ? source?.duration : undefined,
      dimensions,
      sources,
      intent: resolvedIntent,
      sourceType: playbackId ? 'mux' : 'cdn',
      streamingProtocol: protocol,
      providerId: playbackId ?? undefined,
      streamingUrl: playbackUrl,
      downloadUrl: playbackId ? `${this.streamBaseUrl}/${playbackId}/high.mp4` : undefined,
      title: typeof source === 'object' ? source?.title : undefined,
    };
  }
}
