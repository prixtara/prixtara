# Prixtara — Media Architecture & Asset Strategy

## 1. Executive Summary

Prixtara's media pipeline establishes a strict abstraction layer between media origins (local disk, Sanity CMS, object storage, and dedicated video streaming CDNs) and UI components:

```
┌─────────────────────────────────────────────────────────────┐
│                 Content & Source Origins                    │
│  - Sanity CMS (document refs, hotspots, uploaded files)     │
│  - Local dev filesystem (grounded seed assets in ignore)    │
│  - External Video CDN / Provider (Mux / Dedicated Video CDN)│
│  - Cloud Object Storage (Cloudflare R2 / AWS S3 / GCS)      │
└──────────────────────────────┬──────────────────────────────┘
                               │ Media Reference / Source Input
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             @prixtara/media Abstraction Layer               │
│                                                             │
│   ┌─────────────────────┐       ┌───────────────────────┐   │
│   │    ImageProvider    │       │     VideoProvider     │   │
│   ├─────────────────────┤       ├───────────────────────┤   │
│   │ - LocalImageProvider│       │ - LocalVideoProvider  │   │
│   │ - SanityImageProvider       │ - SanityVideoProvider │   │
│   │ - CustomCDNProvider │       │ - ExternalVideoProvider   │
│   └─────────────────────┘       │   (Mux / Video CDN)   │   │
│                                 └───────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                 MediaService / Registry             │   │
│   │   - URL Normalization & Ref Parsing                 │   │
│   │   - Responsive srcSet & sizes calculation           │   │
│   │   - Hotspot / Focal point to objectPosition         │   │
│   │   - Autoplay policy & intent enforcement            │   │
│   └─────────────────────────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────┘
                               │ Normalized Media Objects
                               │ (NormalizedImage / NormalizedVideo)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Page / UI Presentation                    │
│   - Semantic Server & Client Components                     │
│   - Headless image / video props consumers                  │
│   - ZERO hardcoded file paths                               │
└─────────────────────────────────────────────────────────────┘
```

### Architectural Mandate

Components **must never hardcode local asset paths or direct CDN URLs** (e.g., `src="/prixtara-hero-video.mp4"` or `src="https://..."`). Instead, components consume type-safe, normalized media contracts (`NormalizedImage`, `NormalizedVideo`) resolved by `@prixtara/media`.

---

## 2. Large Binary Strategy & Git Independence

### 2.1 The Anti-Pattern: Binary Bloat in Git

Committing large binary assets (such as high-bitrate 1080p/4K MP4 videos, 6MB uncompressed PNGs, RAW camera files, and multi-megabyte presentation decks) directly into Git creates severe architectural debt:

1. **Permanent History Bloat**: Git stores entire snapshots of modified binaries across history. Once committed, a 50MB asset remains permanently in the repository's `.git/objects/pack` chain for all developers and CI runners forever, even after deletion.
2. **CI/CD Latency & Cost**: Build containers download hundreds of megabytes of redundant history on every pull request.
3. **Sub-optimal Delivery**: Serving raw MP4 files from a web server or Git origin lacks adaptive bitrate streaming (HLS/DASH), device-aware transcoding, and edge CDN cache optimization.

### 2.2 Prixtara's Storage Strategy

Prixtara enforces a multi-tier asset lifecycle:

| Layer                          | Location                                          | Git Status                 | Primary Delivery Purpose                                                                                         |
| :----------------------------- | :------------------------------------------------ | :------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| **Local Source Materials**     | `source-of-info/`                                 | **Ignored** (`.gitignore`) | Read-only brand source, raw presentation slides, uncompressed assets for local development. Never pushed to Git. |
| **CMS Editorial Assets**       | Sanity CDN (`cdn.sanity.io`)                      | Decoupled                  | Product galleries, editorial imagery, team photos, diagram assets. Referenced by lightweight JSON metadata IDs.  |
| **Production Video Streaming** | Dedicated Video CDN (e.g. Mux, Cloudflare Stream) | Decoupled                  | Adaptive HLS streams (`.m3u8`), poster thumbnails, animated previews, and progressive MP4 fallbacks.             |
| **Static Edge Assets**         | Object Storage (R2 / S3) + CDN                    | Decoupled                  | Favicons, vectors, high-volume brand collateral served with immutable cache headers.                             |

### 2.3 Local Development Continuity

To ensure developer machines operate smoothly without requiring live cloud credentials:

- Source assets reside in `source-of-info/` (`prixtara-hero-video.mp4`, `product-1.png`, `product-2.png`, `product-3.png`, `inspiration.png`, `favicon`).
- `LocalImageProvider` and `LocalVideoProvider` maintain a grounded registry mapping asset IDs (`'product-1'`, `'prixtara-hero-video'`) to local paths with grounded dimensions and technical accessibility descriptions.
- `source-of-info/` is strictly listed in `.gitignore` to prevent accidental commits of large binaries.

---

## 3. Provider Architecture & Swappability

`@prixtara/media` implements a provider model with uniform contracts:

### 3.1 `ImageProvider` Interface

```typescript
export interface ImageProvider {
  readonly name: string;
  readonly supportedSourceTypes: readonly MediaSourceType[];
  canHandle(source: ImageSourceInput): boolean;
  resolveImage(source: ImageSourceInput, options?: ImageTransformOptions): NormalizedImage;
  getImageUrl(source: ImageSourceInput, options?: ImageTransformOptions): string;
  getSrcSet?(source: ImageSourceInput, widths?: number[], options?: ImageTransformOptions): string;
}
```

### 3.2 `VideoProvider` Interface

```typescript
export interface VideoProvider {
  readonly name: string;
  readonly supportedSourceTypes: readonly MediaSourceType[];
  canHandle(source: VideoSourceInput): boolean;
  resolveVideo(source: VideoSourceInput, intent?: Partial<VideoIntent>): NormalizedVideo;
  getPlaybackUrl(source: VideoSourceInput): string;
  getPosterUrl?(source: VideoSourceInput): string | null;
}
```

### 3.3 Implemented Providers

1. **`LocalImageProvider` & `LocalVideoProvider`**:
   - Handles local development assets from the Prixtara registry.
   - Supplies grounded dimensions (e.g., 1920x1080 for deep-tech product visuals).
   - Enforces accessible alt descriptions grounded in Prixtara's technical specifications.

2. **`SanityImageProvider` & `SanityVideoProvider`**:
   - Generates optimized URLs via `@sanity/image-url`.
   - Automatically decodes intrinsic dimensions from Sanity asset IDs (`image-{assetId}-{width}x{height}-{ext}`) **without requiring network round-trips**.
   - Translates CMS hotspot coordinates into CSS `objectPosition`.
   - Generates responsive `srcSet` strings using Sanity's on-the-fly image transform CDN.

3. **`ExternalVideoProvider` (Mux / Dedicated Video CDN Ready)**:
   - Built to integrate external streaming providers without UI refactoring.
   - Accepts playback IDs (e.g. `mux://abc123xyz` or `{ provider: 'mux', playbackId: 'abc123xyz' }`).
   - Automatically resolves:
     - Primary HLS stream: `https://stream.mux.com/{playbackId}.m3u8`
     - Poster frame: `https://image.mux.com/{playbackId}/thumbnail.webp?time=0&width=1920`
     - Progressive MP4 fallbacks: `https://stream.mux.com/{playbackId}/high.mp4`, `medium.mp4`
   - Configurable for alternative video CDNs (Cloudflare Stream, AWS Elemental, Fastly/CloudFront).

### 3.4 Runtime Swappability (`mediaService`)

The `mediaService` registry automatically routes requests to the most appropriate provider based on source type, or allows explicit provider overrides:

```typescript
import { mediaService, ExternalVideoProvider } from '@prixtara/media';

// Register custom video provider for staging / production
mediaService.registerVideoProvider(
  new ExternalVideoProvider({
    name: 'production-video-cdn',
    streamBaseUrl: 'https://stream.mux.com',
    imageBaseUrl: 'https://image.mux.com',
  }),
  true, // set as default active provider
);
```

---

## 4. Image Pipeline & Responsive Mechanics

### 4.1 Normalized Image Contract

Every resolved image adheres to the `NormalizedImage` schema:

| Field            | Type                  | Description                                           |
| :--------------- | :-------------------- | :---------------------------------------------------- |
| `src`            | `string`              | Canonical, optimized asset URL                        |
| `width`          | `number`              | Intrinsic or target display width in pixels           |
| `height`         | `number`              | Intrinsic or target display height in pixels          |
| `aspectRatio`    | `number`              | Width / Height ratio (e.g., 1.7778 for 16:9)          |
| `alt`            | `string`              | **Mandatory** non-empty accessibility description     |
| `caption`        | `string?`             | Optional editorial caption                            |
| `credit`         | `string?`             | Optional photographer or source attribution           |
| `srcSet`         | `string`              | Standard responsive `srcSet` (width descriptors)      |
| `sizes`          | `string`              | Responsive viewport sizes query                       |
| `hotspot`        | `HotspotCoordinates?` | Focal point coordinates (`x: 0..1, y: 0..1`)          |
| `objectPosition` | `string?`             | Computed CSS `object-position` (e.g. `"48.2% 35.0%"`) |
| `loading`        | `'lazy' \| 'eager'`   | Browser loading strategy                              |
| `priority`       | `boolean`             | High-priority fetch flag for above-the-fold assets    |
| `sourceType`     | `MediaSourceType`     | Origin identifier (`local`, `sanity`, `mux`, `cdn`)   |

### 4.2 Focal Point / Hotspot Cropping

When content editors specify a focal point in Sanity Studio, `normalizeHotspot()` translates normalized coordinates (`x: 0.72, y: 0.35`) into standard CSS:

```css
object-position: 72% 35%;
```

This ensures responsive art direction retains critical visual elements across extreme screen aspect ratios without hardcoded CSS rules.

### 4.3 Responsive Breakpoints & Sizes

`@prixtara/media` defaults to modern physical pixel breakpoints:

```typescript
export const DEFAULT_IMAGE_BREAKPOINTS = [640, 768, 1024, 1280, 1536, 1920];
export const DEFAULT_IMAGE_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
```

---

## 5. Video Streaming Architecture & Intent Enforcement

### 5.1 Browser Autoplay Policy Compliance

Modern web browsers (Chrome, Safari, Firefox, Edge) enforce strict autoplay policies: **unmuted programmatic autoplay is unconditionally blocked** without preceding user interaction.

`@prixtara/media` enforces browser compliance at the type and helper level through `createVideoIntent()`:

```typescript
export function createVideoIntent(partial?: Partial<VideoIntent>): VideoIntent {
  const isAutoplay = Boolean(partial?.autoplay);
  // Browsers require muted=true for autoplay to succeed
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
```

### 5.2 Preloading Strategies

- **Hero Ambient Backgrounds**: `preload: 'metadata'` — loads container dimensions and initial frame without buffering the entire stream.
- **Interactive Product Demos**: `preload: 'none'` — conserves user bandwidth until the user explicitly initiates playback.

### 5.3 Streaming Protocol Negotiation

- **HLS (`.m3u8`)**: Delivered for adaptive bitrate streaming, dynamically adjusting video quality to bandwidth.
- **Progressive MP4 Fallbacks**: Generated automatically for legacy browsers or environments without HLS support.

---

## 6. Integration Guide (Zero Visual Pollution)

### 6.1 Server Component Data Flow

Pages and server repositories resolve media via `@prixtara/media` before passing props to presentation components:

```typescript
import {
  resolveImage,
  resolveVideo,
  toHeadlessImageProps,
  toHeadlessVideoProps,
} from '@prixtara/media';
import type { NormalizedProduct } from '@/lib/server/models';

// In Server Component or Data Access Layer:
export function getProductMediaProps(product: NormalizedProduct) {
  // Resolves media reference through abstraction layer
  const heroImage = resolveImage(product.slug, {
    loading: 'eager',
    priority: true,
  });

  const heroVideo = resolveVideo('prixtara-hero-video', {
    autoplay: true,
    loop: true,
  });

  return {
    imageProps: toHeadlessImageProps(heroImage),
    videoProps: toHeadlessVideoProps(heroVideo),
  };
}
```

### 6.2 Component Rendering (Headless Contract)

Components consume standard HTML attributes with zero CSS framework or animation dependencies:

```tsx
// Pure semantic rendering:
export function SemanticMediaDemo({ imageProps, videoProps }) {
  return (
    <div>
      <img {...imageProps} />
      <video {...videoProps} />
    </div>
  );
}
```

---

## 7. Migration Roadmap to Production Video Streaming

```
[Phase 1: Current Architecture]
Local development assets in source-of-info/ + LocalProvider
Sanity CMS media objects + SanityProvider
ExternalVideoProvider (ready for Mux / Video CDN)

[Phase 2: Video Asset Ingestion]
Upload prixtara-hero-video.mp4 to Mux / Cloudflare Stream
Obtain production playback IDs
Configure CMS videoMedia documents with playback IDs

[Phase 3: Production Activation]
Set NEXT_PUBLIC_MEDIA_VIDEO_PROVIDER=external-video
Video streams effortlessly transition from local dev MP4 to global HLS edge streaming
ZERO UI changes required
```
