import imageUrlBuilder from '@sanity/image-url';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import type { FitMode } from '@sanity/image-url/lib/types/types';
import { DEFAULT_IMAGE_BREAKPOINTS } from '../constants';
import { extractAltText, extractCaption, extractCredit, extractHotspot } from '../image/helpers';
import { inferImageMimeType, normalizeHotspot, parseSanityAssetRef } from '../image/normalize';
import { buildSrcSet, calculateAspectRatio, getDefaultSizes } from '../image/responsive';
import type {
  ImageFit,
  ImageSourceInput,
  ImageTransformOptions,
  NormalizedImage,
  NormalizedVideo,
  VideoIntent,
  VideoSourceInput,
} from '../types';
import { createVideoIntent } from '../video/helpers';
import { calculateVideoDimensions } from '../video/metadata';
import { detectStreamingProtocol, inferVideoMimeType } from '../video/normalize';
import { BaseImageProvider, BaseVideoProvider } from './base';

export interface SanityProviderConfig {
  projectId?: string;
  dataset?: string;
}

function toSanityFitMode(fit?: ImageFit): FitMode {
  switch (fit) {
    case 'cover':
    case 'crop':
      return 'crop';
    case 'contain':
    case 'inside':
      return 'max';
    case 'fill':
      return 'fill';
    case 'outside':
      return 'scale';
    case 'max':
      return 'max';
    default:
      return 'max';
  }
}

/**
 * Sanity Image Provider.
 * Generates CDN URLs via @sanity/image-url, parses intrinsic dimensions from asset IDs,
 * maps focal points into objectPosition, and generates responsive srcSets.
 */
export class SanityImageProvider extends BaseImageProvider {
  readonly name = 'sanity-image';
  readonly supportedSourceTypes = ['sanity'] as const;

  private builder: ImageUrlBuilder;

  constructor(config: SanityProviderConfig = {}) {
    super();
    this.builder = imageUrlBuilder({
      projectId: config.projectId || 'placeholder',
      dataset: config.dataset || 'production',
    });
  }

  canHandle(source: ImageSourceInput): boolean {
    if (!source) return false;

    if (typeof source === 'string') {
      const clean = source.trim();
      if (clean.includes('cdn.sanity.io')) return true;
      if (clean.startsWith('image-')) return true;
    }

    if (typeof source === 'object') {
      const type = (source as { _type?: string })._type;
      if (type === 'image' || type === 'captionedImage') return true;
      if (
        source.asset &&
        typeof source.asset._ref === 'string' &&
        source.asset._ref.startsWith('image-')
      ) {
        return true;
      }
      if (source.url && source.url.includes('cdn.sanity.io')) return true;
      if (source.src && source.src.includes('cdn.sanity.io')) return true;
    }

    return false;
  }

  private extractRef(source: ImageSourceInput): string | null {
    if (typeof source === 'string') {
      if (source.startsWith('image-')) return source;
      return null;
    }
    if (source && typeof source === 'object' && source.asset && source.asset._ref) {
      return source.asset._ref;
    }
    return null;
  }

  getImageUrl(source: ImageSourceInput, options?: ImageTransformOptions): string {
    if (!source) return '';

    try {
      let b = this.builder
        .image(source as unknown as Parameters<ImageUrlBuilder['image']>[0])
        .auto('format');

      if (options?.width) {
        b = b.width(options.width);
      }
      if (options?.height) {
        b = b.height(options.height);
      }
      if (options?.quality) {
        b = b.quality(options.quality);
      }
      if (options?.fit) {
        b = b.fit(toSanityFitMode(options.fit));
      }

      return b.url();
    } catch {
      // Fallback if @sanity/image-url cannot parse source directly
      if (typeof source === 'string') return source;
      if (source && typeof source === 'object') {
        return source.url || source.src || (source.asset && source.asset.url) || '';
      }
      return '';
    }
  }

  override getSrcSet(
    source: ImageSourceInput,
    widths = DEFAULT_IMAGE_BREAKPOINTS as readonly number[],
    options?: ImageTransformOptions,
  ): string {
    if (!source) return '';

    return buildSrcSet((w) => {
      try {
        let b = this.builder
          .image(source as unknown as Parameters<ImageUrlBuilder['image']>[0])
          .auto('format')
          .width(w);
        if (options?.quality) {
          b = b.quality(options.quality);
        }
        if (options?.fit) {
          b = b.fit(toSanityFitMode(options.fit));
        }
        return b.url();
      } catch {
        return '';
      }
    }, widths);
  }

  resolveImage(source: ImageSourceInput, options?: ImageTransformOptions): NormalizedImage {
    const ref = this.extractRef(source);
    const parsedRef = ref ? parseSanityAssetRef(ref) : null;

    const intrinsicWidth =
      parsedRef?.width ?? (typeof source === 'object' ? source?.width : undefined) ?? 1920;
    const intrinsicHeight =
      parsedRef?.height ?? (typeof source === 'object' ? source?.height : undefined) ?? 1080;

    const targetWidth = options?.width ?? intrinsicWidth;
    const targetHeight = options?.height ?? intrinsicHeight;
    const aspectRatio = calculateAspectRatio(targetWidth, targetHeight);

    const src = this.getImageUrl(source, options);
    const alt =
      options?.fallbackAlt ?? extractAltText(source, 'Prixtara technical visual representation');
    const caption = extractCaption(source);
    const credit = extractCredit(source);

    const hotspot = extractHotspot(source);
    const { objectPosition } = normalizeHotspot(hotspot);

    const sizes = getDefaultSizes(options?.sizes);
    const srcSet = this.getSrcSet(source, options?.widths, options);

    return {
      src,
      width: targetWidth,
      height: targetHeight,
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
      mimeType: inferImageMimeType(parsedRef?.format ?? 'webp'),
      sourceType: 'sanity',
      originalRef: ref ?? undefined,
    };
  }
}

/**
 * Sanity Video Provider.
 * Resolves videoMedia schema objects or Sanity file assets.
 */
export class SanityVideoProvider extends BaseVideoProvider {
  readonly name = 'sanity-video';
  readonly supportedSourceTypes = ['sanity'] as const;

  private imageProvider: SanityImageProvider;

  constructor(config: SanityProviderConfig = {}) {
    super();
    this.imageProvider = new SanityImageProvider(config);
  }

  canHandle(source: VideoSourceInput): boolean {
    if (!source) return false;

    if (typeof source === 'string') {
      const clean = source.trim();
      return clean.includes('cdn.sanity.io/files');
    }

    if (typeof source === 'object') {
      const type = (source as { _type?: string })._type;
      if (type === 'videoMedia') return true;
      if (source.videoFile && source.videoFile.asset) return true;
      if (source.externalUrl && source.externalUrl.includes('sanity')) return true;
    }

    return false;
  }

  getPlaybackUrl(source: VideoSourceInput): string {
    if (typeof source === 'string') {
      return source.trim();
    }

    if (source && typeof source === 'object') {
      if (source.videoFile && source.videoFile.asset && source.videoFile.asset.url) {
        return source.videoFile.asset.url;
      }
      if (source.externalUrl) {
        return source.externalUrl;
      }
      if (source.src || source.url) {
        return source.src || source.url || '';
      }
    }

    return '';
  }

  override getPosterUrl(source: VideoSourceInput): string | null {
    if (source && typeof source === 'object') {
      if (source.posterImage) {
        return this.imageProvider.getImageUrl(source.posterImage);
      }
      if (source.poster) {
        return typeof source.poster === 'string'
          ? source.poster
          : this.imageProvider.getImageUrl(source.poster);
      }
    }
    return null;
  }

  resolveVideo(source: VideoSourceInput, intent?: Partial<VideoIntent>): NormalizedVideo {
    const src = this.getPlaybackUrl(source);
    const posterUrl = this.getPosterUrl(source);
    const poster = posterUrl
      ? this.imageProvider.resolveImage(posterUrl, { fallbackAlt: 'Video preview frame' })
      : undefined;

    const protocol = detectStreamingProtocol(src);
    const mimeType = inferVideoMimeType(src);

    const isCmsAutoPlay =
      typeof source === 'object' && source !== null && 'autoPlay' in source
        ? Boolean((source as { autoPlay?: boolean }).autoPlay)
        : undefined;

    const isCmsLoop =
      typeof source === 'object' && source !== null && 'loop' in source
        ? Boolean((source as { loop?: boolean }).loop)
        : undefined;

    const mergedIntent: Partial<VideoIntent> = {
      autoplay: intent?.autoplay ?? isCmsAutoPlay ?? false,
      loop: intent?.loop ?? isCmsLoop ?? false,
      ...intent,
    };

    const resolvedIntent = createVideoIntent(mergedIntent);
    const dimensions = calculateVideoDimensions(
      typeof source === 'object' ? source?.width : undefined,
      typeof source === 'object' ? source?.height : undefined,
    );

    return {
      src,
      mimeType,
      poster,
      duration: typeof source === 'object' ? source?.duration : undefined,
      dimensions,
      sources: [
        {
          src,
          mimeType,
          quality: 'master',
        },
      ],
      intent: resolvedIntent,
      sourceType: 'sanity',
      streamingProtocol: protocol,
      title: typeof source === 'object' ? source?.title : undefined,
    };
  }
}
