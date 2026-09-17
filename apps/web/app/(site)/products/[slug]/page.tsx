import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, getAllProductSlugs } from '@/lib/server';
import { buildProductMetadata } from '@/lib/server/seo';

/**
 * Individual scalable product page — /products/[slug]
 *
 * Architecture:
 *   - Scalable single [slug] architecture supporting arbitrarily many CMS products.
 *   - Zero hardcoded product names in components or route declarations.
 *   - generateStaticParams: pre-generates paths from ProductRepository at build time.
 *   - dynamicParams = true: on-demand ISR for newly published products without redeploying.
 *   - Data fetching decoupled via ProductRepository.
 *   - Visual freeze: semantic HTML placeholder shell only.
 */

export const dynamicParams = true;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return buildProductMetadata(product);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <article>
        <header>
          <p>{product.category}</p>
          <h1>{product.name}</h1>
          <p>{product.tagline}</p>
        </header>
        {product.description && (
          <section aria-label="Product Description">
            <p>{product.description}</p>
          </section>
        )}
      </article>
    </main>
  );
}
