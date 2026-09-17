import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts } from '@/lib/products';

/**
 * Products listing page — /products
 *
 * TODO(cms): Implement full product listing with imagery.
 * TODO(seo): Generate per-product metadata.
 * TODO(design): Implement product card grid.
 */
export const metadata: Metadata = {
  title: 'Our Products',
  description:
    'Explore Prixtara products: AI-Vision Defect Detection, Existential AI, and Sambhashi multilingual technology.',
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main>
      <h1>Our Products</h1>

      {products.length === 0 ? (
        <p>Products coming soon.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <Link href={`/products/${product.slug.current}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
