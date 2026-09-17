import {
  DEFAULT_BACKGROUND_VIDEO_INTENT,
  DEFAULT_IMAGE_BREAKPOINTS,
  LOCAL_IMAGE_REGISTRY,
  LOCAL_VIDEO_REGISTRY,
} from '../constants';
import { extractAltText, extractCaption, extractCredit, extractHotspot } from '../image/helpers';
import { normalizeImageUrl, normalizeHotspot } from '../image/normalize';
import { buildSrcSet, calculateAspectRatio, getDefaultSizes } from '../image/responsive';
import type {
  ImageSourceInput,
  ImageTransformOptions,
  MediaDimensions,
  NormalizedImage,
  NormalizedVideo,
  VideoIntent,
  VideoSourceInput,
} from '../types';
import { createVideoIntent } from '../video/helpers';
import { calculateVideoDimensions } from '../video/metadata';
import { normalizeVideoUrl } from '../video/normalize';
import { BaseImageProvider, BaseVideoProvider } from './base';

export interface LocalProviderOptions {
  basePath?: string;
  videoBasePath?: string;
}

/**
 * Local Development Image Provider.
 * Serves grounded development assets from source-of-info/ and local static paths.
 */
export class LocalImageProvider extends BaseImageProvider {
  readonly name = 'local-image';
  readonly supportedSourceTypes = ['local'] as const;

  private basePath: string;

  constructor(options: LocalProviderOptions = {}) {
    super();
    this.basePath = options.basePath ?? '/media';
  }

  canHandle(source: ImageSourceInput): boolean {
    if (!source) return false;

    if (typeof source === 'string') {
      const clean = source.trim().toLowerCase();
      if (clean in LOCAL_IMAGE_REGISTRY) return true;
      if (Object.values(LOCAL_IMAGE_REGISTRY).some((r) => r.filename === clean)) return true;
      if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
        return (
          clean.endsWith('.png') ||
          clean.endsWith('.jpg') ||
          clean.endsWith('.jpeg') ||
          clean.endsWith('.webp') ||
          clean.endsWith('.ico')
        );
      }
    }

    if (typeof source === 'object') {
      if ('src' in source && typeof source.src === 'string' && !/^https?:\/\//i.test(source.src)) {
        return true;
      }
      if ('url' in source && typeof source.url === 'string' && !/^https?:\/\//i.test(source.url)) {
        return true;
      }
    }

    return false;
  }

  private findRegistryRecord(input: ImageSourceInput) {
    if (typeof input === 'string') {
      const key = input.trim().toLowerCase();
      if (LOCAL_IMAGE_REGISTRY[key]) {
        return LOCAL_IMAGE_REGISTRY[key];
      }
      const record = Object.values(LOCAL_IMAGE_REGISTRY).find(
        (r) => r.filename.toLowerCase() === key,
      );
      if (record) return record;
    }
    return null;
  }

  getImageUrl(source: ImageSourceInput, _options?: ImageTransformOptions): string {
    const record = this.findRegistryRecord(source);
    if (record) {
      return normalizeImageUrl(record.filename, this.basePath);
    }

    if (typeof source === 'string') {
      return normalizeImageUrl(source, this.basePath);
    }

    if (source && typeof source === 'object') {
      const path = source.src || source.url || '';
      return normalizeImageUrl(path, this.basePath);
    }

    return '';
  }

  override getSrcSet(
    source: ImageSourceInput,
    widths = DEFAULT_IMAGE_BREAKPOINTS as readonly number[],
    options?: ImageTransformOptions,
  ): string {
    const baseUrl = this.getImageUrl(source, options);
    if (!baseUrl) return '';

    return buildSrcSet((w) => `${baseUrl}?w=${w}`, widths);
  }

  resolveImage(source: ImageSourceInput, options?: ImageTransformOptions): NormalizedImage {
    const record = this.findRegistryRecord(source);
    const src = this.getImageUrl(source, options);

    const width = options?.width ?? record?.width ?? 1920;
    const height = options?.height ?? record?.height ?? 1080;
    const aspectRatio = calculateAspectRatio(width, height);

    const alt =
      options?.fallbackAlt ?? extractAltText(source, record?.alt ?? 'Prixtara technical asset');
    const caption = extractCaption(source) ?? record?.caption;
    const credit = extractCredit(source);
    const hotspot = extractHotspot(source) ?? record?.hotspot;
    const { objectPosition } = normalizeHotspot(hotspot);

    const sizes = getDefaultSizes(options?.sizes);
    const srcSet = this.getSrcSet(source, options?.widths, options);

    return {
      src,
      width,
      height,
      aspectRatio,
      alt,
      caption,
      credit,
      srcSet,
      sizes,
      hotspot,
      objectPosition,
      loading: options?.loading ?? 'lazy',
      priority: Boolean(options?.priority),
      mimeType: record?.mimeType ?? 'image/png',
      sourceType: 'local',
      originalRef: record?.id,
    };
  }
}

/**
 * Local Development Video Provider.
 * Resolves local video files (e.g. prixtara-hero-video.mp4) with grounded metadata,
 * safe autoplay/muted browser defaults, and fallback posters.
 */
export class LocalVideoProvider extends BaseVideoProvider {
  readonly name = 'local-video';
  readonly supportedSourceTypes = ['local'] as const;

  private basePath: string;
  private imageProvider: LocalImageProvider;

  constructor(options: LocalProviderOptions = {}) {
    super();
    this.basePath = options.videoBasePath ?? options.basePath ?? '/media/videos';
    this.imageProvider = new LocalImageProvider(options);
  }

  canHandle(source: VideoSourceInput): boolean {
    if (!source) return false;

    if (typeof source === 'string') {
      const clean = source.trim().toLowerCase();
      if (clean in LOCAL_VIDEO_REGISTRY) return true;
      if (Object.values(LOCAL_VIDEO_REGISTRY).some((r) => r.filename === clean)) return true;
      if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
        return clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.mov');
      }
    }

    if (typeof source === 'object') {
      if (source.provider === 'local') return true;
      const path = source.src || source.url;
      if (typeof path === 'string' && !/^https?:\/\//i.test(path)) {
        return true;
      }
    }

    return false;
  }

  private findRegistryRecord(input: VideoSourceInput) {
    if (typeof input === 'string') {
      const key = input.trim().toLowerCase();
      if (LOCAL_VIDEO_REGISTRY[key]) {
        return LOCAL_VIDEO_REGISTRY[key];
      }
      const record = Object.values(LOCAL_VIDEO_REGISTRY).find(
        (r) => r.filename.toLowerCase() === key,
      );
      if (record) return record;
    }
    return null;
  }

  getPlaybackUrl(source: VideoSourceInput): string {
    const record = this.findRegistryRecord(source);
    if (record) {
      return normalizeVideoUrl(record.filename, this.basePath);
    }

    if (typeof source === 'string') {
      return normalizeVideoUrl(source, this.basePath);
    }

    if (source && typeof source === 'object') {
      const path = source.src || source.url || '';
      return normalizeVideoUrl(path, this.basePath);
    }

    return '';
  }

  override getPosterUrl(source: VideoSourceInput): string | null {
    const record = this.findRegistryRecord(source);
    if (record && record.posterId) {
      return this.imageProvider.getImageUrl(record.posterId);
    }

    if (source && typeof source === 'object') {
      if (source.poster) {
        return typeof source.poster === 'string'
          ? this.imageProvider.getImageUrl(source.poster)
          : (source.poster.src ?? null);
      }
      if (source.posterImage) {
        return typeof source.posterImage === 'string'
          ? this.imageProvider.getImageUrl(source.posterImage)
          : (source.posterImage.src ?? null);
      }
    }

    return null;
  }

  resolveVideo(source: VideoSourceInput, intent?: Partial<VideoIntent>): NormalizedVideo {
    const record = this.findRegistryRecord(source);
    const src = this.getPlaybackUrl(source);
    const posterUrl = this.getPosterUrl(source);

    const poster = posterUrl
      ? this.imageProvider.resolveImage(posterUrl, {
          fallbackAlt: `${record?.title ?? 'Video'} poster frame`,
        })
      : undefined;

    const dimensions: MediaDimensions = calculateVideoDimensions(record?.width, record?.height);

    const resolvedIntent = createVideoIntent(intent ?? DEFAULT_BACKGROUND_VIDEO_INTENT);

    return {
      src,
      mimeType: record?.mimeType ?? 'video/mp4',
      poster,
      duration: record?.duration ?? 15.0,
      dimensions,
      sources: [
        {
          src,
          mimeType: record?.mimeType ?? 'video/mp4',
          quality: 'master',
        },
      ],
      intent: resolvedIntent,
      sourceType: 'local',
      streamingProtocol: 'progressive',
      providerId: record?.id,
      title: record?.title ?? 'Prixtara video asset',
    };
  }
}
