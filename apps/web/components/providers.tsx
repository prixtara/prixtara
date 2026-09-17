'use client';

/**
 * Client-side provider tree.
 *
 * This Client Component wraps the application with all providers that
 * require browser APIs. It is mounted in the root layout.
 *
 * Architecture rules:
 *   - This file is intentionally marked 'use client'
 *   - Keep this file minimal — it only composes provider components
 *   - No business logic here — only provider mounting
 *
 * TODO(analytics): Mount analytics provider from @prixtara/analytics.
 * TODO(design): Mount Lenis smooth scroll provider.
 * TODO(monitoring): Mount Sentry error boundary.
 */
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Application provider tree.
 *
 * Add providers in this order (innermost to outermost):
 *   1. Theme / design system
 *   2. Smooth scroll (Lenis)
 *   3. Animation context (if needed)
 *   4. Analytics
 *   5. Error monitoring
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {/* TODO(design): <ThemeProvider> ... </ThemeProvider> */}
      {/* TODO(design): <LenisProvider> ... </LenisProvider> */}
      {/* TODO(analytics): <AnalyticsProvider> ... </AnalyticsProvider> */}
      {children}
    </>
  );
}
