import type { HotspotCoordinates, ImageMimeType } from '../types';

/**
 * Normalizes an image URL by trimming whitespace, collapsing redundant slashes,
 * and handling protocol-relative URLs.
 */
export function normalizeImageUrl(url: string, basePath = ''): string {
  if (!url || typeof url !== 'string') {
    return '';
  }

  const trimmed = url.trim();

  // Handle data URIs or blob URLs
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  // Handle protocol-relative URLs
  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`;
  }

  // Handle absolute HTTP/HTTPS URLs
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // Handle relative or root-relative paths
  const cleanBase = basePath.replace(/\/+$/, '');
  const cleanPath = trimmed.replace(/^\/+/, '');

  if (!cleanBase) {
    return `/${cleanPath}`;
  }

  return `${cleanBase}/${cleanPath}`;
}

export interface ParsedSanityAssetRef {
  id: string;
  width?: number;
  height?: number;
  format?: string;
}

/**
 * Parses a Sanity image asset ID or reference string.
 * Sanity asset IDs follow the standard pattern:
 * image-{assetId}-{width}x{height}-{extension}
 * e.g. "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg"
 */
export function parseSanityAssetRef(ref: string): ParsedSanityAssetRef | null {
  if (!ref || typeof ref !== 'string') {
    return null;
  }

  const match = ref.match(/^image-([a-zA-Z0-9]+)-(\d+)x(\d+)-([a-zA-Z0-9]+)$/);
  if (!match) {
    // Might already be an asset ID without dimension suffixes
    if (ref.startsWith('image-')) {
      return { id: ref.replace(/^image-/, '') };
    }
    return null;
  }

  const id = match[1];
  const widthStr = match[2];
  const heightStr = match[3];
  const format = match[4];

  if (!id || !widthStr || !heightStr || !format) {
    return null;
  }

  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);

  return {
    id,
    width: Number.isNaN(width) ? undefined : width,
    height: Number.isNaN(height) ? undefined : height,
    format: format.toLowerCase(),
  };
}

/**
 * Normalizes focal point coordinates into clamped [0, 1] numbers and
 * standard CSS object-position string (e.g. "50% 50%").
 */
export function normalizeHotspot(hotspot?: HotspotCoordinates): {
  x: number;
  y: number;
  objectPosition: string;
} {
  if (!hotspot || typeof hotspot.x !== 'number' || typeof hotspot.y !== 'number') {
    return {
      x: 0.5,
      y: 0.5,
      objectPosition: '50% 50%',
    };
  }

  const clampedX = Math.max(0, Math.min(1, hotspot.x));
  const clampedY = Math.max(0, Math.min(1, hotspot.y));

  const pctX = (clampedX * 100).toFixed(1);
  const pctY = (clampedY * 100).toFixed(1);

  return {
    x: clampedX,
    y: clampedY,
    objectPosition: `${pctX}% ${pctY}%`,
  };
}

/**
 * Infers an image MIME type from a URL, extension, or format string.
 */
export function inferImageMimeType(urlOrFormat: string): ImageMimeType {
  const clean = (urlOrFormat.toLowerCase().split('?')[0] ?? '').trim();

  if (clean.endsWith('.webp') || clean === 'webp') return 'image/webp';
  if (clean.endsWith('.avif') || clean === 'avif') return 'image/avif';
  if (clean.endsWith('.png') || clean === 'png') return 'image/png';
  if (clean.endsWith('.jpg') || clean.endsWith('.jpeg') || clean === 'jpg' || clean === 'jpeg') {
    return 'image/jpeg';
  }
  if (clean.endsWith('.svg') || clean === 'svg') return 'image/svg+xml';
  if (clean.endsWith('.gif') || clean === 'gif') return 'image/gif';
  if (clean.endsWith('.ico') || clean === 'ico') return 'image/x-icon';

  return 'image/webp';
}
