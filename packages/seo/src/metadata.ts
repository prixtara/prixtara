import type { Metadata } from 'next';

const DEFAULT_SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com';

/**
 * Site-wide metadata defaults.
 * Override per-page with generateMetadata() on each route.
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(DEFAULT_SITE_URL),
  title: {
    template: '%s | Prixtara Technologies',
    default: 'Prixtara Technologies — Deep-Tech Solutions',
  },
  description:
    'Prixtara Technologies builds advanced deep-tech solutions: AI-Vision Defect Detection, Existential AI, and Sambhashi multilingual / ISL technology.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Prixtara Technologies — Deep-Tech Solutions',
    description:
      'Prixtara Technologies builds advanced deep-tech solutions: AI-Vision Defect Detection, Existential AI, and Sambhashi multilingual / ISL technology.',
    url: DEFAULT_SITE_URL,
    siteName: 'Prixtara Technologies',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${DEFAULT_SITE_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: 'Prixtara Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prixtara Technologies — Deep-Tech Solutions',
    description:
      'Prixtara Technologies builds advanced deep-tech solutions: AI-Vision Defect Detection, Existential AI, and Sambhashi multilingual / ISL technology.',
    images: [`${DEFAULT_SITE_URL}/og-default.png`],
  },
};

export interface BuildMetadataOptions {
  title: string;
  description: string;
  slug?: string;
  /** Override the base URL. Defaults to NEXT_PUBLIC_SITE_URL */
  baseUrl?: string;
  /** Custom OpenGraph / Twitter preview image URL */
  ogImage?: string;
  /** Whether to disallow search engine indexing */
  noIndex?: boolean;
}

/**
 * Build a fully-formed Metadata object for a specific page.
 *
 * Usage in a page.tsx:
 *   export const metadata = buildMetadata({
 *     title: 'AI-Vision Defect Detection',
 *     description: 'Industrial quality control powered by computer vision.',
 *     slug: 'products/ai-vision-defect-detection',
 *   });
 */
export function buildMetadata({
  title,
  description,
  slug,
  baseUrl,
  ogImage,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const siteUrl = baseUrl ?? process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com';
  // Normalize leading slash if present
  const cleanSlug = slug ? slug.replace(/^\/+/, '') : '';
  const canonicalUrl = cleanSlug ? `${siteUrl}/${cleanSlug}` : siteUrl;
  const imageUrl = ogImage ?? `${siteUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Prixtara Technologies',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
