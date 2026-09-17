import type { MetadataRoute } from 'next';
import { getAllProductSlugs, getAllJobOpeningSlugs } from '@/lib/server';

/**
 * Dynamic sitemap — /sitemap.xml
 *
 * Next.js generates this file at build time and on revalidation.
 * Automatically discovers all published products and career opportunities.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com';
  const now = new Date();

  const [productSlugs, jobSlugs] = await Promise.all([
    getAllProductSlugs(),
    getAllJobOpeningSlugs(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
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
  ];

  const productEntries: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${siteUrl}/products/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const jobEntries: MetadataRoute.Sitemap = jobSlugs.map((slug) => ({
    url: `${siteUrl}/career/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries, ...jobEntries];
}
