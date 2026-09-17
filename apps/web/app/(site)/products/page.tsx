import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts } from '@/lib/server';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@prixtara/seo';

/**
 * Products listing page — /products
 *
 * Architecture:
 *   - Content retrieved through ProductRepository data layer.
 *   - Scalable listing: dynamically renders all products returned by CMS.
 *   - Visual freeze: semantic HTML placeholder shell only.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Our Products',
  description:
    'Explore Prixtara deep-tech solutions: AI-Vision Defect Detection, Existential AI, and Sambhashi language technology.',
  slug: 'products',
});

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main>
      <h1>Our Products</h1>
      <p>Pioneering deep-tech architectures engineered for industrial scale.</p>

      {products.length === 0 ? (
        <p>Products coming soon.</p>
      ) : (
        <nav aria-label="Products directory">
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <Link href={routes.product(product.slug)}>
                  <h2>{product.name}</h2>
                </Link>
                <p>{product.category}</p>
                <p>{product.tagline}</p>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </main>
  );
}
