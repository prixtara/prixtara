import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, getAllProductSlugs } from '@/lib/server';
import { buildProductMetadata } from '@/lib/server/seo';
import { getProductSchema, formatJsonLd } from '@prixtara/seo';
import { ProductDetailPage } from '@/components/pages';

/**
 * Individual scalable product route — /products/[slug]
 *
 * Architecture:
 *   - Scalable single [slug] architecture supporting arbitrarily many CMS products.
 *   - Zero hardcoded product names in components or route declarations.
 *   - generateStaticParams: pre-generates paths from ProductRepository at build time.
 *   - dynamicParams = true: on-demand ISR for newly published products without redeploying.
 *   - Data fetching decoupled via ProductRepository.
 *   - Visual freeze: Delegates rendering to ProductDetailPage architectural component.
 */

export const dynamicParams = true;
export const revalidate = 3600;

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
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: false },
    };
  }

  return buildProductMetadata(product);
}

export default async function Route({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productSchema = getProductSchema({
    name: product.name,
    description: product.description,
    category: product.category,
    slug: product.slug,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: formatJsonLd(productSchema) }}
      />
      <ProductDetailPage product={product} />
    </>
  );
}
