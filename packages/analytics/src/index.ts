/**
 * @prixtara/analytics
 *
 * Analytics abstraction layer.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  TODO(analytics): Implement this package                        │
 * │                                                                 │
 * │  Integration points:                                            │
 * │    1. Choose analytics provider (GA4, Plausible, PostHog, etc.) │
 * │    2. Install provider SDK in this package                      │
 * │    3. Implement track(), identify(), page() here                │
 * │    4. Export an <AnalyticsProvider> component                   │
 * │    5. Mount <AnalyticsProvider> in apps/web/app/layout.tsx      │
 * │    6. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local           │
 * │                                                                 │
 * │  Architecture rule:                                             │
 * │    - All analytics calls go through this package                │
 * │    - No component may import analytics provider SDKs directly   │
 * └─────────────────────────────────────────────────────────────────┘
 */

/** Event names — extend as features are built */
export type AnalyticsEvent =
  'page_view' | 'product_viewed' | 'career_viewed' | 'contact_form_submitted';

/**
 * Track an analytics event.
 *
 * TODO(analytics): Replace stub with provider implementation.
 */
export function track(event: AnalyticsEvent, properties?: Record<string, unknown>): void {
  // TODO(analytics): Implement with selected provider
  if (process.env['NODE_ENV'] === 'development') {
    console.debug(`[analytics] ${event}`, properties);
  }
}

/**
 * Record a page view.
 *
 * TODO(analytics): Hook into Next.js router events in the Providers component.
 */
export function pageView(url: string): void {
  track('page_view', { url });
}
