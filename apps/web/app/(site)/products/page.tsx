import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/server';
import { buildMetadata } from '@prixtara/seo';
import { ProductIndexPage } from '@/components/pages';

/**
 * Products listing route — /products
 *
 * Architecture:
 *   - Content retrieved through ProductRepository data layer.
 *   - Scalable listing: dynamically renders all products returned by CMS.
 *   - Visual freeze: Delegates rendering to ProductIndexPage architectural component.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Our Products',
  description:
    'Explore Prixtara deep-tech solutions: AI-Vision Defect Detection, Existential AI, and Sambhashi language technology.',
  slug: 'products',
});

export const revalidate = 3600;

export default async function Route() {
  const products = await getAllProducts();

  return <ProductIndexPage products={products} />;
}
