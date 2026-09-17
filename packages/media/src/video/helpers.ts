import type { HeadlessVideoProps, NormalizedVideo, VideoIntent } from '../types';

/**
 * Creates a validated VideoIntent object.
 *
 * CRITICAL BROWSER COMPLIANCE:
 * Modern web browsers (Chrome, Safari, Firefox, Edge) will strictly REJECT and abort
 * programmatic or automatic video playback if `autoplay` is enabled while `muted` is false.
 * Therefore, whenever `autoplay` is requested as true, this helper automatically enforces `muted: true`.
 */
export function createVideoIntent(partial?: Partial<VideoIntent>): VideoIntent {
  const isAutoplay = Boolean(partial?.autoplay);
  // Enforce muted if autoplay is true
  const isMuted = isAutoplay ? true : Boolean(partial?.muted);

  return {
    autoplay: isAutoplay,
    muted: isMuted,
    loop: Boolean(partial?.loop),
    playsInline: partial?.playsInline ?? true,
    preload: partial?.preload ?? 'metadata',
    controls: partial?.controls ?? !isAutoplay,
  };
}

/**
 * Converts a NormalizedVideo model into headless HTML5 <video> attributes.
 * Contains ZERO visual styling, layout, or animation code.
 */
export function toHeadlessVideoProps(video: NormalizedVideo): HeadlessVideoProps {
  const posterUrl = typeof video.poster === 'string' ? video.poster : video.poster?.src;

  return {
    src: video.src,
    poster: posterUrl,
    autoPlay: video.intent.autoplay,
    muted: video.intent.muted,
    loop: video.intent.loop,
    playsInline: video.intent.playsInline,
    preload: video.intent.preload,
    controls: video.intent.controls,
    title: video.title,
    style: video.dimensions
      ? {
          aspectRatio: `${video.dimensions.width} / ${video.dimensions.height}`,
        }
      : undefined,
  };
}
