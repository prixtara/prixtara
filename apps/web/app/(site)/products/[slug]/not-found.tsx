import Link from 'next/link';
import { routes } from '@/lib/routes';

/**
 * Product detail not-found page shell.
 *
 * Rendered when a product slug is not found in repository/CMS.
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
export default function ProductNotFound() {
  return (
    <main>
      <h1>Product Not Found</h1>
      <p>The product you are looking for does not exist or has been removed.</p>
      <Link href={routes.products()}>Browse all products</Link>
    </main>
  );
}
