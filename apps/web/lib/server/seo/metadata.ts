import 'server-only';
import type { Metadata } from 'next';
import { buildMetadata } from '@prixtara/seo';
import type { NormalizedProduct, NormalizedJobOpening, NormalizedPage } from '../models';

/**
 * Generate Next.js Metadata for a normalized product.
 */
export function buildProductMetadata(product: NormalizedProduct | null): Metadata {
  if (!product) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: false },
    };
  }

  return buildMetadata({
    title: product.seo?.title ?? product.name,
    description: product.seo?.description ?? product.tagline,
    slug: `products/${product.slug}`,
  });
}

/**
 * Generate Next.js Metadata for a normalized job opening.
 */
export function buildCareerMetadata(job: NormalizedJobOpening | null): Metadata {
  if (!job) {
    return {
      title: 'Position Not Found',
      robots: { index: false, follow: false },
    };
  }

  return buildMetadata({
    title: job.seo?.title ?? `${job.title} — Careers`,
    description: job.seo?.description ?? job.summary,
    slug: `career/${job.slug}`,
  });
}

/**
 * Generate Next.js Metadata for a static page.
 */
export function buildPageMetadata(page: NormalizedPage | null, fallbackSlug: string): Metadata {
  if (!page) {
    return buildMetadata({
      title: 'Page',
      description: 'Prixtara Technologies',
      slug: fallbackSlug,
    });
  }

  return buildMetadata({
    title: page.seo?.title ?? page.title,
    description: page.seo?.description ?? page.description ?? '',
    slug: page.slug,
  });
}
