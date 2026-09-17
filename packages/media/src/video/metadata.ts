import type { MediaDimensions } from '../types';

/**
 * Formats a duration in seconds into standard "mm:ss" or "hh:mm:ss".
 */
export function formatDuration(seconds?: number): string {
  if (typeof seconds !== 'number' || seconds < 0 || Number.isNaN(seconds)) {
    return '0:00';
  }

  const totalSecs = Math.floor(seconds);
  const hrs = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;

  const paddedSecs = secs.toString().padStart(2, '0');

  if (hrs > 0) {
    const paddedMins = mins.toString().padStart(2, '0');
    return `${hrs}:${paddedMins}:${paddedSecs}`;
  }

  return `${mins}:${paddedSecs}`;
}

/**
 * Computes standard MediaDimensions for a video.
 * Defaults to 1920x1080 (16:9 widescreen) if absent.
 */
export function calculateVideoDimensions(width?: number, height?: number): MediaDimensions {
  const w = width && width > 0 ? width : 1920;
  const h = height && height > 0 ? height : 1080;
  const aspectRatio = Number((w / h).toFixed(4));

  return {
    width: w,
    height: h,
    aspectRatio,
  };
}
