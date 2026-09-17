import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import {
  defaultMetadata,
  getOrganizationSchema,
  getWebsiteSchema,
  formatJsonLd,
} from '@prixtara/seo';
import './globals.css';

/**
 * Optimized font loading via next/font.
 * Self-hosts the font files at build time; zero external network requests.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: formatJsonLd(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: formatJsonLd(websiteSchema) }}
        />
      </head>
      <body>
        {/* WCAG 2.1 AA Skip Navigation Link */}
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
