import type { MetadataRoute } from 'next';

/**
 * robots.txt — /robots.txt
 *
 * Controls search engine crawling behaviour.
 *
 * TODO(seo): Review crawl rules before production launch.
 *            Consider disallowing API routes, preview routes, etc.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          // TODO(seo): Disallow draft/preview routes when implemented
          // '/draft-mode/',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
