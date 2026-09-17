import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug } from '@/lib/products';
import { PRODUCT_SLUGS, type ProductSlug } from '@prixtara/types';

/**
 * Individual product page — /products/[slug]
 *
 * Architecture:
 *   - generateStaticParams: pre-generates pages for all known product slugs
 *   - generateMetadata: per-product SEO metadata
 *   - Data fetching via lib/products.ts (never directly in this file)
 *
 * TODO(cms): Enable real CMS data when Sanity is integrated.
 * TODO(seo): Add OG image per product.
 * TODO(design): Implement product hero, feature grid, and CTA.
 * TODO(analytics): Track product_viewed event.
 */

// In Next.js 15, params is a Promise
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Static generation: pre-build pages for all known product slugs.
 * TODO(cms): Replace with GROQ-based generateStaticParams once CMS is live.
 */
export function generateStaticParams(): Array<{ slug: string }> {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug as ProductSlug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug as ProductSlug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.tagline}</p>
      {/* TODO(design): Hero image */}
      {/* TODO(design): Feature sections */}
      {/* TODO(design): Technical specifications */}
      {/* TODO(design): Contact / enquiry CTA */}
    </main>
  );
}
