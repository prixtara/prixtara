import type { MetadataRoute } from 'next';

/**
 * Dynamic sitemap — /sitemap.xml
 *
 * Next.js generates this file at build time.
 *
 * TODO(cms): Fetch all product slugs and career slugs from Sanity
 *            and include them as additional sitemap entries.
 * TODO(seo): Add lastModified from CMS _updatedAt fields.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com';
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/vision`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/career`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // TODO(cms): Dynamically add product pages:
    // ...products.map((p) => ({ url: `${siteUrl}/products/${p.slug}`, ... }))
    // TODO(cms): Dynamically add career pages:
    // ...jobs.map((j) => ({ url: `${siteUrl}/career/${j.slug}`, ... }))
  ];
}
