import type { StreamingProtocol, VideoMimeType } from '../types';

/**
 * Detects whether a video URL represents an HLS stream (.m3u8),
 * a DASH stream (.mpd), or progressive media (.mp4, .webm).
 */
export function detectStreamingProtocol(url: string): StreamingProtocol {
  if (!url || typeof url !== 'string') {
    return 'progressive';
  }

  const clean = (url.toLowerCase().split('?')[0] ?? '').trim();

  if (clean.endsWith('.m3u8')) {
    return 'hls';
  }
  if (clean.endsWith('.mpd')) {
    return 'dash';
  }

  return 'progressive';
}

/**
 * Infers the video MIME type based on URL extension or streaming protocol.
 */
export function inferVideoMimeType(url: string): VideoMimeType {
  const clean = (url.toLowerCase().split('?')[0] ?? '').trim();

  if (clean.endsWith('.m3u8')) {
    return 'application/x-mpegURL';
  }
  if (clean.endsWith('.mpd')) {
    return 'application/dash+xml';
  }
  if (clean.endsWith('.webm')) {
    return 'video/webm';
  }
  if (clean.endsWith('.mov')) {
    return 'video/quicktime';
  }

  return 'video/mp4';
}

/**
 * Extracts a Mux playback ID from a string, supporting raw playback IDs,
 * "mux://{playbackId}" URIs, or Mux stream URLs ("https://stream.mux.com/{playbackId}.m3u8").
 */
export function parseMuxPlaybackId(input: string): string | null {
  if (!input || typeof input !== 'string') {
    return null;
  }

  const trimmed = input.trim();

  // Pattern: mux://abc123xyz
  if (trimmed.startsWith('mux://')) {
    const afterMux = trimmed.replace(/^mux:\/\//, '');
    const firstPart = afterMux.split(/[?#]/)[0];
    return firstPart ?? null;
  }

  // Pattern: https://stream.mux.com/abc123xyz.m3u8
  const streamMatch = trimmed.match(/stream\.mux\.com\/([a-zA-Z0-9_-]+)(?:\.m3u8)?/);
  if (streamMatch && streamMatch[1]) {
    return streamMatch[1];
  }

  // Pattern: alphanumeric Mux ID (standard Mux playback IDs are ~20-30 characters alphanumeric)
  if (/^[a-zA-Z0-9]{10,35}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Normalizes video source URLs.
 */
export function normalizeVideoUrl(url: string, basePath = ''): string {
  if (!url || typeof url !== 'string') {
    return '';
  }

  const trimmed = url.trim();

  if (trimmed.startsWith('blob:') || trimmed.startsWith('data:')) {
    return trimmed;
  }

  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const cleanBase = basePath.replace(/\/+$/, '');
  const cleanPath = trimmed.replace(/^\/+/, '');

  if (!cleanBase) {
    return `/${cleanPath}`;
  }

  return `${cleanBase}/${cleanPath}`;
}
