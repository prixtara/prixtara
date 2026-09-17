import Link from 'next/link';
import Image from 'next/image';
import { Page, Section, Content } from '@prixtara/ui';
import { routes } from '@/lib/routes';
import { resolveImage } from '@prixtara/media';
import type { NormalizedProduct } from '@/lib/server';

export interface ProductIndexPageProps {
  products: NormalizedProduct[];
}

/**
 * ProductIndexPage — Semantic & Architectural Scaffolding.
 *
 * CRITICAL VISUAL FREEZE: Plain compositional sections only. Zero visual styling.
 */
export function ProductIndexPage({ products }: ProductIndexPageProps) {
  return (
    <Page id="main-content" tabIndex={-1}>
      <Section aria-label="Products Catalog Header">
        <Content label="catalog-header">
          <h1>Our Products</h1>
          <p>Pioneering deep-tech architectures engineered for industrial scale.</p>
        </Content>
      </Section>

      <Section aria-label="Products Catalog Directory">
        <Content label="catalog-listing">
          {products.length === 0 ? (
            <p>Products coming soon.</p>
          ) : (
            <nav aria-label="Products directory">
              <ul>
                {products.map((product) => {
                  const media = product.mediaAssetId ? resolveImage(product.mediaAssetId) : null;

                  return (
                    <li key={product.id}>
                      <Link href={routes.product(product.slug)}>
                        <h2>{product.name}</h2>
                      </Link>
                      <p>{product.category}</p>
                      <p>{product.tagline}</p>
                      {media && (
                        <Image
                          src={media.src}
                          alt={media.alt}
                          width={media.width}
                          height={media.height}
                          loading="lazy"
                          unoptimized
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </Content>
      </Section>
    </Page>
  );
}
