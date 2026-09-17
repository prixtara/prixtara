import type { Metadata } from 'next';

/**
 * Site-wide metadata defaults.
 * Override per-page with generateMetadata() on each route.
 *
 * TODO(seo): Populate with final brand copy, OG images, and Twitter card.
 */
export const defaultMetadata: Metadata = {
  title: {
    template: '%s | Prixtara Technologies',
    default: 'Prixtara Technologies — Deep-Tech Solutions',
  },
  description:
    'Prixtara Technologies builds advanced deep-tech solutions: AI-Vision Defect Detection, Existential AI, and Sambhashi multilingual / ISL technology.',
  robots: {
    index: true,
    follow: true,
  },
  // TODO(seo): Add metadataBase with NEXT_PUBLIC_SITE_URL
  // TODO(seo): Add Twitter card metadata
  // TODO(seo): Add OG image metadata
};

interface BuildMetadataOptions {
  title: string;
  description: string;
  slug?: string;
  /** Override the base URL. Defaults to NEXT_PUBLIC_SITE_URL */
  baseUrl?: string;
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
 *
 * TODO(seo): Add OG image generation via @vercel/og.
 * TODO(seo): Add structured data injection helper.
 */
export function buildMetadata({
  title,
  description,
  slug,
  baseUrl,
}: BuildMetadataOptions): Metadata {
  const siteUrl = baseUrl ?? process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com';
  const canonicalUrl = slug ? `${siteUrl}/${slug}` : siteUrl;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Prixtara Technologies',
      locale: 'en_IN',
      type: 'website',
      // TODO(seo): images: [{ url: `${siteUrl}/og?title=${encodeURIComponent(title)}` }]
    },
    // TODO(seo): twitter: { card: 'summary_large_image', ... }
  };
}
