import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  ExternalVideoProvider,
  LocalImageProvider,
  LocalVideoProvider,
  SanityImageProvider,
  SanityVideoProvider,
  buildSrcSet,
  calculateAspectRatio,
  createVideoIntent,
  detectStreamingProtocol,
  formatDuration,
  getImageUrl,
  getVideoPlaybackUrl,
  mediaService,
  normalizeHotspot,
  normalizeImageUrl,
  normalizeVideoUrl,
  parseMuxPlaybackId,
  parseSanityAssetRef,
  resolveImage,
  resolveVideo,
  toHeadlessImageProps,
  toHeadlessVideoProps,
  type NormalizedImage,
} from '@prixtara/media';

describe('Prixtara Media Architecture', () => {
  describe('Source Assets Protection (Read-Only Verification)', () => {
    it('verifies all expected local source assets exist on disk and are accessible', () => {
      const candidates = [
        resolve(process.cwd(), '../../source-of-info'),
        resolve(process.cwd(), 'source-of-info'),
        resolve(__dirname, '../../../source-of-info'),
        resolve(__dirname, '../../source-of-info'),
      ];
      const sourceDir = candidates.find((c) => existsSync(c));
      expect(sourceDir).toBeDefined();

      const requiredAssets = [
        'prixtara-hero-video.mp4',
        'product-1.png',
        'product-2.png',
        'product-3.png',
        'source-of-info2.jpeg',
        'source-of-info2.1.jpeg',
      ];

      for (const asset of requiredAssets) {
        const fullPath = resolve(sourceDir!, asset);
        expect(existsSync(fullPath)).toBe(true);
      }
    });
  });

  describe('Local Image Provider & Grounded Registry', () => {
    const provider = new LocalImageProvider();

    it('identifies and resolves grounded Product 1 (AI-Vision)', () => {
      expect(provider.canHandle('product-1')).toBe(true);
      expect(provider.canHandle('product-1.png')).toBe(true);

      const normalized = provider.resolveImage('product-1');
      expect(normalized.src).toBe('/media/product-1.png');
      expect(normalized.width).toBe(1920);
      expect(normalized.height).toBe(1080);
      expect(normalized.aspectRatio).toBeCloseTo(1.7778, 3);
      expect(normalized.alt).toContain('AI-Vision Defect Detection');
      expect(normalized.caption).toContain('300 parts/min');
      expect(normalized.mimeType).toBe('image/png');
      expect(normalized.sourceType).toBe('local');
    });

    it('identifies and resolves grounded Product 2 (Existential AI)', () => {
      const normalized = provider.resolveImage('product-2');
      expect(normalized.src).toBe('/media/product-2.png');
      expect(normalized.alt).toContain('Existential AI');
      expect(normalized.sourceType).toBe('local');
    });

    it('identifies and resolves grounded Product 3 (Sambhashi)', () => {
      const normalized = provider.resolveImage('product-3');
      expect(normalized.src).toBe('/media/product-3.png');
      expect(normalized.alt).toContain('Sambhashi');
      expect(normalized.alt).toContain('Indian Sign Language');
    });

    it('generates responsive srcSet with standard width descriptors', () => {
      const normalized = provider.resolveImage('product-1');
      expect(normalized.srcSet).toContain('/media/product-1.png?w=640 640w');
      expect(normalized.srcSet).toContain('/media/product-1.png?w=1920 1920w');
    });

    it('supports custom base path', () => {
      const customProvider = new LocalImageProvider({ basePath: '/cdn/assets' });
      expect(customProvider.getImageUrl('product-1')).toBe('/cdn/assets/product-1.png');
    });
  });

  describe('Local Video Provider & Hero Video', () => {
    const provider = new LocalVideoProvider();

    it('identifies and resolves prixtara-hero-video.mp4', () => {
      expect(provider.canHandle('prixtara-hero-video')).toBe(true);
      expect(provider.canHandle('prixtara-hero-video.mp4')).toBe(true);

      const normalized = provider.resolveVideo('prixtara-hero-video');
      expect(normalized.src).toBe('/media/videos/prixtara-hero-video.mp4');
      expect(normalized.mimeType).toBe('video/mp4');
      expect(normalized.duration).toBe(15.0);
      expect(normalized.dimensions?.width).toBe(1920);
      expect(normalized.dimensions?.height).toBe(1080);
      expect(normalized.streamingProtocol).toBe('progressive');
      expect(normalized.sourceType).toBe('local');
      expect(normalized.poster).toBeDefined();
    });

    it('enforces browser autoplay-muted safety rule', () => {
      // Even if user requests autoplay=true and muted=false, muted MUST be true
      const normalized = provider.resolveVideo('prixtara-hero-video', {
        autoplay: true,
        muted: false,
      });

      expect(normalized.intent.autoplay).toBe(true);
      expect(normalized.intent.muted).toBe(true);
    });
  });

  describe('Sanity Image Provider & Ref Parsing', () => {
    const provider = new SanityImageProvider({
      projectId: 'testproject',
      dataset: 'production',
    });

    it('parses intrinsic dimensions and format from Sanity asset IDs without network requests', () => {
      const parsed = parseSanityAssetRef('image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg');
      expect(parsed).not.toBeNull();
      expect(parsed?.id).toBe('Tb9Ew8CXIwaY6R1kjMvI0uRR');
      expect(parsed?.width).toBe(2000);
      expect(parsed?.height).toBe(3000);
      expect(parsed?.format).toBe('jpg');
    });

    it('resolves Sanity image object and extracts focal point coordinates', () => {
      const sanityObj = {
        _type: 'image',
        asset: {
          _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-1600x900-png',
        },
        hotspot: {
          x: 0.35,
          y: 0.65,
        },
        alt: 'Industrial assembly line diagram',
      };

      expect(provider.canHandle(sanityObj)).toBe(true);

      const normalized = provider.resolveImage(sanityObj);
      expect(normalized.sourceType).toBe('sanity');
      expect(normalized.width).toBe(1600);
      expect(normalized.height).toBe(900);
      expect(normalized.aspectRatio).toBeCloseTo(16 / 9, 3);
      expect(normalized.objectPosition).toBe('35.0% 65.0%');
      expect(normalized.alt).toBe('Industrial assembly line diagram');
      expect(normalized.src).toContain('cdn.sanity.io');
    });
  });

  describe('Sanity Video Provider', () => {
    const provider = new SanityVideoProvider();

    it('resolves Sanity videoMedia object with file asset', () => {
      const videoMediaDoc = {
        _type: 'videoMedia',
        title: 'Optical Inspection Demo',
        videoFile: {
          asset: {
            url: 'https://cdn.sanity.io/files/project/production/inspection-demo.mp4',
          },
        },
        autoPlay: true,
        loop: true,
      };

      expect(provider.canHandle(videoMediaDoc)).toBe(true);

      const normalized = provider.resolveVideo(videoMediaDoc);
      expect(normalized.src).toBe(
        'https://cdn.sanity.io/files/project/production/inspection-demo.mp4',
      );
      expect(normalized.sourceType).toBe('sanity');
      expect(normalized.title).toBe('Optical Inspection Demo');
      expect(normalized.intent.autoplay).toBe(true);
      expect(normalized.intent.muted).toBe(true); // Enforced for autoplay
    });
  });

  describe('External Video Provider (Mux & Dedicated Video CDN)', () => {
    const provider = new ExternalVideoProvider();

    it('parses Mux playback IDs across diverse input formats', () => {
      expect(parseMuxPlaybackId('v69RbdDuSmALCDQJfDHgUa2G01ke01ch2')).toBe(
        'v69RbdDuSmALCDQJfDHgUa2G01ke01ch2',
      );
      expect(parseMuxPlaybackId('mux://v69RbdDuSmALCDQJfDHgUa2G01ke01ch2')).toBe(
        'v69RbdDuSmALCDQJfDHgUa2G01ke01ch2',
      );
      expect(
        parseMuxPlaybackId('https://stream.mux.com/v69RbdDuSmALCDQJfDHgUa2G01ke01ch2.m3u8'),
      ).toBe('v69RbdDuSmALCDQJfDHgUa2G01ke01ch2');
    });

    it('resolves Mux playback ID into adaptive HLS stream and poster thumbnail', () => {
      const muxInput = {
        provider: 'mux' as const,
        playbackId: 'v69RbdDuSmALCDQJfDHgUa2G01ke01ch2',
        title: 'Prixtara Deep-Tech Hero Video',
      };

      expect(provider.canHandle(muxInput)).toBe(true);

      const normalized = provider.resolveVideo(muxInput);
      expect(normalized.src).toBe('https://stream.mux.com/v69RbdDuSmALCDQJfDHgUa2G01ke01ch2.m3u8');
      expect(normalized.streamingProtocol).toBe('hls');
      expect(normalized.mimeType).toBe('application/x-mpegURL');
      expect(normalized.sourceType).toBe('mux');
      expect(normalized.downloadUrl).toBe(
        'https://stream.mux.com/v69RbdDuSmALCDQJfDHgUa2G01ke01ch2/high.mp4',
      );

      // Verify poster frame
      expect(typeof normalized.poster).toBe('object');
      const poster = normalized.poster as NormalizedImage;
      expect(poster.src).toContain(
        'image.mux.com/v69RbdDuSmALCDQJfDHgUa2G01ke01ch2/thumbnail.webp',
      );

      // Verify progressive MP4 fallbacks are generated alongside HLS
      expect(normalized.sources.length).toBeGreaterThanOrEqual(3);
      expect(normalized.sources[0]?.mimeType).toBe('application/x-mpegURL');
      expect(normalized.sources[1]?.src).toContain('/high.mp4');
      expect(normalized.sources[2]?.src).toContain('/medium.mp4');
    });
  });

  describe('Video Intent & Browser Autoplay Compliance', () => {
    it('forces muted=true when autoplay=true to prevent browser playback failure', () => {
      const intent = createVideoIntent({ autoplay: true, muted: false });
      expect(intent.autoplay).toBe(true);
      expect(intent.muted).toBe(true);
    });

    it('preserves muted=false when autoplay=false', () => {
      const intent = createVideoIntent({ autoplay: false, muted: false });
      expect(intent.autoplay).toBe(false);
      expect(intent.muted).toBe(false);
    });

    it('defaults playsInline to true for mobile video support', () => {
      const intent = createVideoIntent({});
      expect(intent.playsInline).toBe(true);
    });
  });

  describe('URL Normalization & Utilities', () => {
    it('normalizes image URLs and removes redundant slashes', () => {
      expect(normalizeImageUrl('product-1.png', '/media/')).toBe('/media/product-1.png');
      expect(normalizeImageUrl('/product-1.png', '/media/')).toBe('/media/product-1.png');
      expect(normalizeImageUrl('https://cdn.example.com/image.png')).toBe(
        'https://cdn.example.com/image.png',
      );
    });

    it('normalizes video URLs and removes redundant slashes', () => {
      expect(normalizeVideoUrl('hero.mp4', '/videos/')).toBe('/videos/hero.mp4');
      expect(normalizeVideoUrl('https://example.com/stream.m3u8')).toBe(
        'https://example.com/stream.m3u8',
      );
    });

    it('detects streaming protocols correctly', () => {
      expect(detectStreamingProtocol('https://example.com/live/master.m3u8')).toBe('hls');
      expect(detectStreamingProtocol('https://example.com/live/manifest.mpd')).toBe('dash');
      expect(detectStreamingProtocol('https://example.com/video.mp4')).toBe('progressive');
    });

    it('formats duration in seconds to standard mm:ss', () => {
      expect(formatDuration(15)).toBe('0:15');
      expect(formatDuration(65)).toBe('1:05');
      expect(formatDuration(3665)).toBe('1:01:05');
      expect(formatDuration(undefined)).toBe('0:00');
    });

    it('calculates aspect ratio accurately', () => {
      expect(calculateAspectRatio(1920, 1080)).toBeCloseTo(1.7778, 3);
      expect(calculateAspectRatio(1000, 1000)).toBe(1);
    });

    it('normalizes hotspot into CSS objectPosition', () => {
      expect(normalizeHotspot({ x: 0.5, y: 0.5 }).objectPosition).toBe('50.0% 50.0%');
      expect(normalizeHotspot({ x: 0.2, y: 0.8 }).objectPosition).toBe('20.0% 80.0%');
      expect(normalizeHotspot(undefined).objectPosition).toBe('50% 50%');
    });
  });

  describe('Headless Props Conversion', () => {
    it('converts NormalizedImage into clean HTML <img> props without styling assumptions', () => {
      const image = resolveImage('product-1', { loading: 'eager', priority: true });
      const props = toHeadlessImageProps(image);

      expect(props.src).toBe('/media/product-1.png');
      expect(props.alt).toContain('AI-Vision');
      expect(props.width).toBe(1920);
      expect(props.height).toBe(1080);
      expect(props.loading).toBe('eager');
      expect(props.fetchPriority).toBe('high');
      expect(props.style?.objectPosition).toBe('50.0% 50.0%');
    });

    it('converts NormalizedVideo into clean HTML <video> props without styling assumptions', () => {
      const video = resolveVideo('prixtara-hero-video', { autoplay: true, loop: true });
      const props = toHeadlessVideoProps(video);

      expect(props.src).toBe('/media/videos/prixtara-hero-video.mp4');
      expect(props.autoPlay).toBe(true);
      expect(props.muted).toBe(true);
      expect(props.loop).toBe(true);
      expect(props.playsInline).toBe(true);
      expect(props.controls).toBe(false);
      expect(props.poster).toBeDefined();
    });
  });

  describe('MediaRegistry & Provider Swappability', () => {
    it('resolves images and videos seamlessly via top-level facades', () => {
      const img = resolveImage('product-2');
      expect(img.alt).toContain('Existential AI');

      const vid = resolveVideo('prixtara-hero-video');
      expect(vid.duration).toBe(15.0);

      expect(getImageUrl('product-3')).toBe('/media/product-3.png');
      expect(getVideoPlaybackUrl('prixtara-hero-video')).toBe(
        '/media/videos/prixtara-hero-video.mp4',
      );
    });

    it('allows swapping active video provider dynamically', () => {
      const customCdn = new ExternalVideoProvider({
        name: 'custom-streaming-cdn',
        streamBaseUrl: 'https://custom-stream.prixtara.com',
      });

      mediaService.registerVideoProvider(customCdn);
      mediaService.setVideoProvider('custom-streaming-cdn');

      expect(mediaService.getVideoProvider().name).toBe('custom-streaming-cdn');

      // Reset registry after test
      mediaService.reset();
      expect(mediaService.getVideoProvider().name).toBe('local-video');
    });
  });
});
