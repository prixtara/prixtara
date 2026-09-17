import type { Metadata } from 'next';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/server';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@prixtara/seo';

/**
 * Homepage — /
 *
 * Architecture: Server Component.
 * Content flow:
 *   1. Data access through ProductRepository via @/lib/server.
 *   2. Decoupled from CMS implementation.
 *   3. Visual freeze: semantic HTML placeholder shell only.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Prixtara Technologies — Deep-Tech Solutions',
  description:
    'Prixtara Technologies builds advanced deep-tech solutions: AI-Vision Defect Detection, Existential AI, and Sambhashi multilingual / ISL technology.',
  slug: '',
});

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main>
      <section aria-label="Hero">
        <h1>Prixtara Technologies</h1>
        <p>Deep-tech solutions for a smarter world.</p>
        <nav aria-label="Quick links">
          <Link href={routes.products()}>Explore Products</Link>
          <Link href={routes.vision()}>Our Vision</Link>
        </nav>
      </section>

      <section aria-label="Featured Products">
        <h2>Featured Products</h2>
        {featuredProducts.length === 0 ? (
          <p>Product catalog in preparation.</p>
        ) : (
          <ul>
            {featuredProducts.map((product) => (
              <li key={product.id}>
                <Link href={routes.product(product.slug)}>
                  <h3>{product.name}</h3>
                </Link>
                <p>{product.tagline}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
