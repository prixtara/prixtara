import type { ImageMimeType, VideoIntent, VideoMimeType } from '../types';

/**
 * Standard responsive image breakpoints (in physical pixels).
 */
export const DEFAULT_IMAGE_BREAKPOINTS = [640, 768, 1024, 1280, 1536, 1920] as const;

/**
 * Standard sizes string covering multi-column layouts across mobile, tablet, and desktop.
 */
export const DEFAULT_IMAGE_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

/**
 * Sizes string for full-bleed hero visuals.
 */
export const HERO_IMAGE_SIZES = '100vw';

/**
 * Default browser playback intent for background ambient / hero loops.
 * Note: Browsers mandate muted=true for autoplay without user gesture.
 */
export const DEFAULT_BACKGROUND_VIDEO_INTENT: VideoIntent = {
  autoplay: true,
  muted: true,
  loop: true,
  playsInline: true,
  preload: 'metadata',
  controls: false,
};

/**
 * Default browser playback intent for interactive videos (e.g. product demos).
 */
export const DEFAULT_INTERACTIVE_VIDEO_INTENT: VideoIntent = {
  autoplay: false,
  muted: false,
  loop: false,
  playsInline: true,
  preload: 'metadata',
  controls: true,
};

/**
 * Grounded technical metadata for known Prixtara development assets.
 * These correspond to source assets in source-of-info/ and provide fallback
 * dimensions and accessibility descriptions without hardcoding local paths in UI components.
 */
export interface LocalAssetRecord {
  id: string;
  filename: string;
  alt: string;
  width: number;
  height: number;
  mimeType: ImageMimeType;
  caption?: string;
  hotspot?: { x: number; y: number };
}

export interface LocalVideoRecord {
  id: string;
  filename: string;
  title: string;
  width: number;
  height: number;
  duration: number;
  mimeType: VideoMimeType;
  posterId: string;
}

export const LOCAL_IMAGE_REGISTRY: Record<string, LocalAssetRecord> = {
  'product-1': {
    id: 'product-1',
    filename: 'product-1.png',
    alt: 'Prixtara AI-Vision Defect Detection continuous conveyor inspection system with multi-spectrum optical capture',
    width: 1920,
    height: 1080,
    mimeType: 'image/png',
    caption: 'High-speed optical inspection on industrial conveyor at 300 parts/min.',
    hotspot: { x: 0.5, y: 0.5 },
  },
  'product-2': {
    id: 'product-2',
    filename: 'product-2.png',
    alt: 'Prixtara Existential AI autonomous reasoning desktop node with acoustic sensor array',
    width: 1920,
    height: 1080,
    mimeType: 'image/png',
    caption: 'On-device offline neural computation unit with physical hardware privacy indicators.',
    hotspot: { x: 0.5, y: 0.5 },
  },
  'product-3': {
    id: 'product-3',
    filename: 'product-3.png',
    alt: 'Prixtara Sambhashi multilingual and Indian Sign Language spatial gesture translation engine',
    width: 1920,
    height: 1080,
    mimeType: 'image/png',
    caption: 'Real-time bidirectional Indian Sign Language and multilingual synthesis interface.',
    hotspot: { x: 0.5, y: 0.5 },
  },
  'source-of-info2': {
    id: 'source-of-info2',
    filename: 'source-of-info2.jpeg',
    alt: 'Prixtara core hardware and sensor architecture diagram',
    width: 1920,
    height: 1080,
    mimeType: 'image/jpeg',
    caption: 'Hardware architecture and sensor processing topology.',
    hotspot: { x: 0.5, y: 0.5 },
  },
  'source-of-info2.1': {
    id: 'source-of-info2.1',
    filename: 'source-of-info2.1.jpeg',
    alt: 'Prixtara neural processing and optical inspection schematics',
    width: 1920,
    height: 1080,
    mimeType: 'image/jpeg',
    caption: 'Neural edge processing schematics and pipeline flow.',
    hotspot: { x: 0.5, y: 0.5 },
  },
  inspiration: {
    id: 'inspiration',
    filename: 'inspiration.png',
    alt: 'Prixtara laboratory engineering and architectural design inspiration',
    width: 1920,
    height: 1080,
    mimeType: 'image/png',
    caption: 'Deep-tech laboratory design and industrial aesthetic inspiration.',
    hotspot: { x: 0.5, y: 0.5 },
  },
  favicon: {
    id: 'favicon',
    filename: 'favicon.ico',
    alt: 'Prixtara Technologies Brand Icon',
    width: 48,
    height: 48,
    mimeType: 'image/x-icon',
  },
};

export const LOCAL_VIDEO_REGISTRY: Record<string, LocalVideoRecord> = {
  'prixtara-hero-video': {
    id: 'prixtara-hero-video',
    filename: 'prixtara-hero-video.mp4',
    title: 'Prixtara Technologies Autonomous Systems & Deep-Tech Overview',
    width: 1920,
    height: 1080,
    duration: 15.0,
    mimeType: 'video/mp4',
    posterId: 'product-1',
  },
};
