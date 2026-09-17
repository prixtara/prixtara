import type { Metadata } from 'next';
import { getFeaturedProducts } from '@/lib/server';
import { buildMetadata } from '@prixtara/seo';
import { HomePage } from '@/components/pages';

/**
 * Homepage Route — /
 *
 * Architecture: Server Component.
 * Data flow: ProductRepository via @/lib/server.
 * Visual freeze: Delegates rendering to HomePage architectural component.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Prixtara Technologies — Deep-Tech Solutions',
  description:
    'Prixtara Technologies builds advanced deep-tech solutions: AI-Vision Defect Detection, Existential AI, and Sambhashi multilingual / ISL technology.',
  slug: '',
});

export const revalidate = 3600;

export default async function Route() {
  const featuredProducts = await getFeaturedProducts();

  return <HomePage featuredProducts={featuredProducts} />;
}
