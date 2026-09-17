import type { Metadata, Viewport } from 'next';
import './globals.css';

/**
 * Root layout — wraps the entire application.
 *
 * Architecture decisions:
 *   - Server Component by default (no 'use client')
 *   - Fonts loaded here for global availability
 *   - Provider components (analytics, etc.) mounted here
 *
 * TODO(design): Add Google Fonts via next/font (during design phase).
 * TODO(analytics): Mount <AnalyticsProvider> from @prixtara/analytics.
 * TODO(monitoring): Mount Sentry error boundary from @sentry/nextjs.
 * TODO(design): Apply base CSS classes for background, text colour, font.
 */

export const metadata: Metadata = {
  title: {
    template: '%s | Prixtara Technologies',
    default: 'Prixtara Technologies — Deep-Tech Solutions',
  },
  description:
    'Prixtara Technologies builds advanced deep-tech solutions: AI-Vision Defect Detection, Existential AI, and Sambhashi multilingual / ISL technology.',
  metadataBase: new URL(process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com'),
  robots: {
    index: true,
    follow: true,
  },
  // TODO(seo): Add Twitter card metadata
  // TODO(seo): Add OG default image
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* TODO(analytics): <AnalyticsProvider /> */}
        {/* TODO(monitoring): <SentryErrorBoundary /> */}
        {/* TODO(design): Add scroll container for Lenis smooth scroll */}
        {children}
      </body>
    </html>
  );
}
