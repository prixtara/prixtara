import type {
  ImageProvider,
  ImageSourceInput,
  ImageTransformOptions,
  NormalizedImage,
  NormalizedVideo,
  VideoIntent,
  VideoProvider,
  VideoSourceInput,
} from '../types';
import { ExternalVideoProvider } from './external-video';
import { LocalImageProvider, LocalVideoProvider } from './local';
import { SanityImageProvider, SanityVideoProvider } from './sanity';

/**
 * Pluggable Media Service / Provider Registry.
 * Manages swappable image and video providers, automatically routing
 * media requests to the appropriate provider or active default.
 */
export class MediaRegistry {
  private imageProviders: Map<string, ImageProvider> = new Map();
  private videoProviders: Map<string, VideoProvider> = new Map();

  private activeImageProviderName?: string;
  private activeVideoProviderName?: string;

  constructor() {
    this.registerDefaults();
  }

  /**
   * Registers default out-of-the-box providers.
   */
  private registerDefaults(): void {
    const localImage = new LocalImageProvider();
    const sanityImage = new SanityImageProvider();
    const localVideo = new LocalVideoProvider();
    const sanityVideo = new SanityVideoProvider();
    const externalVideo = new ExternalVideoProvider();

    this.registerImageProvider(localImage);
    this.registerImageProvider(sanityImage);

    this.registerVideoProvider(localVideo);
    this.registerVideoProvider(sanityVideo);
    this.registerVideoProvider(externalVideo);

    // Default to local development providers
    this.activeImageProviderName = localImage.name;
    this.activeVideoProviderName = localVideo.name;
  }

  registerImageProvider(provider: ImageProvider, setAsDefault = false): void {
    this.imageProviders.set(provider.name, provider);
    if (setAsDefault || !this.activeImageProviderName) {
      this.activeImageProviderName = provider.name;
    }
  }

  registerVideoProvider(provider: VideoProvider, setAsDefault = false): void {
    this.videoProviders.set(provider.name, provider);
    if (setAsDefault || !this.activeVideoProviderName) {
      this.activeVideoProviderName = provider.name;
    }
  }

  setImageProvider(name: string): void {
    if (!this.imageProviders.has(name)) {
      throw new Error(
        `ImageProvider '${name}' is not registered. Available: ${Array.from(this.imageProviders.keys()).join(', ')}`,
      );
    }
    this.activeImageProviderName = name;
  }

  setVideoProvider(name: string): void {
    if (!this.videoProviders.has(name)) {
      throw new Error(
        `VideoProvider '${name}' is not registered. Available: ${Array.from(this.videoProviders.keys()).join(', ')}`,
      );
    }
    this.activeVideoProviderName = name;
  }

  getImageProvider(name?: string): ImageProvider {
    const targetName = name ?? this.activeImageProviderName;
    if (targetName && this.imageProviders.has(targetName)) {
      return this.imageProviders.get(targetName)!;
    }

    // Fallback to first available provider
    const first = this.imageProviders.values().next().value;
    if (!first) {
      throw new Error('No ImageProvider is registered in MediaRegistry.');
    }
    return first;
  }

  getVideoProvider(name?: string): VideoProvider {
    const targetName = name ?? this.activeVideoProviderName;
    if (targetName && this.videoProviders.has(targetName)) {
      return this.videoProviders.get(targetName)!;
    }

    // Fallback to first available provider
    const first = this.videoProviders.values().next().value;
    if (!first) {
      throw new Error('No VideoProvider is registered in MediaRegistry.');
    }
    return first;
  }

  /**
   * Finds the best provider to handle the given image source,
   * falling back to the active default provider.
   */
  findImageProviderFor(source: ImageSourceInput): ImageProvider {
    for (const provider of this.imageProviders.values()) {
      if (provider.canHandle(source)) {
        return provider;
      }
    }
    return this.getImageProvider();
  }

  /**
   * Finds the best provider to handle the given video source,
   * falling back to the active default provider.
   */
  findVideoProviderFor(source: VideoSourceInput): VideoProvider {
    for (const provider of this.videoProviders.values()) {
      if (provider.canHandle(source)) {
        return provider;
      }
    }
    return this.getVideoProvider();
  }

  /**
   * Resolves an image source into a NormalizedImage.
   */
  resolveImage(source: ImageSourceInput, options?: ImageTransformOptions): NormalizedImage {
    const provider = this.findImageProviderFor(source);
    return provider.resolveImage(source, options);
  }

  /**
   * Resolves a video source into a NormalizedVideo.
   */
  resolveVideo(source: VideoSourceInput, intent?: Partial<VideoIntent>): NormalizedVideo {
    const provider = this.findVideoProviderFor(source);
    return provider.resolveVideo(source, intent);
  }

  /**
   * Returns a direct image URL.
   */
  getImageUrl(source: ImageSourceInput, options?: ImageTransformOptions): string {
    const provider = this.findImageProviderFor(source);
    return provider.getImageUrl(source, options);
  }

  /**
   * Returns a playback URL for video.
   */
  getVideoPlaybackUrl(source: VideoSourceInput): string {
    const provider = this.findVideoProviderFor(source);
    return provider.getPlaybackUrl(source);
  }

  /**
   * Resets registry to default configuration.
   */
  reset(): void {
    this.imageProviders.clear();
    this.videoProviders.clear();
    this.registerDefaults();
  }
}

/**
 * Singleton instance of MediaRegistry used across the application.
 */
export const mediaService = new MediaRegistry();
