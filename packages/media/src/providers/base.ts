import type {
  ImageProvider,
  ImageSourceInput,
  ImageTransformOptions,
  MediaSourceType,
  NormalizedImage,
  NormalizedVideo,
  VideoIntent,
  VideoProvider,
  VideoSourceInput,
} from '../types';

/**
 * Base abstract Image Provider with common utility helpers.
 */
export abstract class BaseImageProvider implements ImageProvider {
  abstract readonly name: string;
  abstract readonly supportedSourceTypes: readonly MediaSourceType[];

  abstract canHandle(source: ImageSourceInput): boolean;

  abstract resolveImage(source: ImageSourceInput, options?: ImageTransformOptions): NormalizedImage;

  abstract getImageUrl(source: ImageSourceInput, options?: ImageTransformOptions): string;

  getSrcSet(source: ImageSourceInput, _widths?: number[], options?: ImageTransformOptions): string {
    return this.getImageUrl(source, options);
  }
}

/**
 * Base abstract Video Provider with common utility helpers.
 */
export abstract class BaseVideoProvider implements VideoProvider {
  abstract readonly name: string;
  abstract readonly supportedSourceTypes: readonly MediaSourceType[];

  abstract canHandle(source: VideoSourceInput): boolean;

  abstract resolveVideo(source: VideoSourceInput, intent?: Partial<VideoIntent>): NormalizedVideo;

  abstract getPlaybackUrl(source: VideoSourceInput): string;

  getPosterUrl(_source: VideoSourceInput): string | null {
    return null;
  }
}
