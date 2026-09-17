import Link from 'next/link';
import Image from 'next/image';
import { Page, Section, Content } from '@prixtara/ui';
import { routes } from '@/lib/routes';
import { resolveImage } from '@prixtara/media';
import type { NormalizedProduct } from '@/lib/server';

export interface ProductDetailPageProps {
  product: NormalizedProduct;
}

/**
 * ProductDetailPage — Semantic & Architectural Scaffolding.
 *
 * CRITICAL VISUAL FREEZE: Plain compositional sections only. Zero visual styling.
 *
 * Architecture:
 * - Capable of rendering CMS-defined sections rather than a fixed Product 1/2/3 layout.
 * - Dynamic data-driven section dispatching supports AI-Vision, Existential AI, Sambhashi,
 *   and all future products without route or component modifications.
 * - Local media is resolved via @prixtara/media abstraction, never hardcoded in JSX.
 */
export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const media = product.mediaAssetId ? resolveImage(product.mediaAssetId) : null;

  return (
    <Page id="main-content" tabIndex={-1}>
      <article>
        {/* Section 1: Hero / Overview */}
        <Section aria-label="Product Overview">
          <Content label="product-hero">
            <header>
              <p>{product.category}</p>
              <h1>{product.name}</h1>
              <p>{product.tagline}</p>
            </header>
            {media && (
              <Content label="product-hero-media">
                <Image
                  src={media.src}
                  alt={media.alt}
                  width={media.width}
                  height={media.height}
                  loading="eager"
                  unoptimized
                />
                {media.caption && <p>{media.caption}</p>}
              </Content>
            )}
          </Content>
        </Section>

        {/* Section 2: Long Description */}
        {product.description && (
          <Section aria-label="Product Description">
            <Content label="product-description">
              <h2>Overview</h2>
              <p>{product.description}</p>
            </Content>
          </Section>
        )}

        {/* Section 3: Problem & Solution (CMS-driven) */}
        {(product.problemStatement || product.solution) && (
          <Section aria-label="Problem and Solution">
            <Content label="product-challenge">
              {product.problemStatement && (
                <div>
                  <h2>The Challenge</h2>
                  <p>{product.problemStatement}</p>
                </div>
              )}
              {product.solution && (
                <div>
                  <h2>Our Solution</h2>
                  <p>{product.solution}</p>
                </div>
              )}
            </Content>
          </Section>
        )}

        {/* Section 4: Capabilities (CMS-driven) */}
        {product.capabilities && product.capabilities.length > 0 && (
          <Section aria-label="Capabilities">
            <Content label="product-capabilities">
              <h2>Core Capabilities</h2>
              <ul>
                {product.capabilities.map((cap, index) => (
                  <li key={index}>
                    <h3>{cap.title}</h3>
                    {cap.badge && <span>{cap.badge}</span>}
                    <p>{cap.description}</p>
                    {cap.metricsSummary && <p>{cap.metricsSummary}</p>}
                  </li>
                ))}
              </ul>
            </Content>
          </Section>
        )}

        {/* Section 5: Technical Specifications (CMS-driven) */}
        {product.technicalDetails && product.technicalDetails.length > 0 && (
          <Section aria-label="Technical Specifications">
            <Content label="product-specs">
              <h2>Technical Specifications</h2>
              {product.technicalDetails.map((group, groupIdx) => (
                <div key={groupIdx}>
                  <h3>{group.category}</h3>
                  <dl>
                    {group.items.map((item, itemIdx) => (
                      <div key={itemIdx}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                        {item.description && <dd>{item.description}</dd>}
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </Content>
          </Section>
        )}

        {/* Section 6: Key Metrics & Benchmarks (CMS-driven) */}
        {product.metrics && product.metrics.length > 0 && (
          <Section aria-label="Key Metrics">
            <Content label="product-metrics">
              <h2>Performance Benchmarks</h2>
              <ul>
                {product.metrics.map((metric, metricIdx) => (
                  <li key={metricIdx}>
                    <p>
                      <strong>{metric.value}</strong>
                      {metric.unit && <span> {metric.unit}</span>}
                    </p>
                    <p>{metric.label}</p>
                    {metric.context && <p>{metric.context}</p>}
                  </li>
                ))}
              </ul>
            </Content>
          </Section>
        )}

        {/* Section 7: Key Features (CMS-driven) */}
        {product.features && product.features.length > 0 && (
          <Section aria-label="Key Features">
            <Content label="product-features">
              <h2>Features</h2>
              <ul>
                {product.features.map((feat, featIdx) => (
                  <li key={featIdx}>
                    <h3>{feat.title}</h3>
                    {feat.badge && <span>{feat.badge}</span>}
                    <p>{feat.description}</p>
                  </li>
                ))}
              </ul>
            </Content>
          </Section>
        )}

        {/* Section 8: Target Use Cases (CMS-driven) */}
        {product.useCases && product.useCases.length > 0 && (
          <Section aria-label="Use Cases">
            <Content label="product-use-cases">
              <h2>Target Use Cases</h2>
              <ul>
                {product.useCases.map((uc, ucIdx) => (
                  <li key={ucIdx}>
                    <h3>{uc.title}</h3>
                    {uc.targetAudience && <p>Audience: {uc.targetAudience}</p>}
                    <p>{uc.scenario}</p>
                    <p>Impact: {uc.impact}</p>
                  </li>
                ))}
              </ul>
            </Content>
          </Section>
        )}

        {/* Section 9: Industry Applications (CMS-driven) */}
        {product.applications && product.applications.length > 0 && (
          <Section aria-label="Industry Applications">
            <Content label="product-applications">
              <h2>Industry Applications</h2>
              <ul>
                {product.applications.map((app, appIdx) => (
                  <li key={appIdx}>
                    <h3>{app.title}</h3>
                    <p>Industry: {app.industry}</p>
                    <p>{app.description}</p>
                    {app.deploymentType && <p>Deployment: {app.deploymentType}</p>}
                  </li>
                ))}
              </ul>
            </Content>
          </Section>
        )}

        {/* Section 10: Implementation & Operational Process (CMS-driven) */}
        {product.process && product.process.length > 0 && (
          <Section aria-label="Implementation Process">
            <Content label="product-process">
              <h2>Implementation Process</h2>
              <ol>
                {product.process.map((step, stepIdx) => (
                  <li key={stepIdx}>
                    <h3>
                      Step {step.stepNumber}: {step.title}
                    </h3>
                    <p>{step.description}</p>
                    {step.duration && <p>Timeframe: {step.duration}</p>}
                  </li>
                ))}
              </ol>
            </Content>
          </Section>
        )}

        {/* Section 11: Call to Action (CMS-driven) */}
        {product.cta && (
          <Section aria-label="Call to Action">
            <Content label="product-cta">
              <h2>{product.cta.headline}</h2>
              {product.cta.description && <p>{product.cta.description}</p>}
              <Link href={product.cta.buttonUrl || routes.products()}>
                {product.cta.buttonLabel}
              </Link>
            </Content>
          </Section>
        )}

        {/* Section 12: Related Products */}
        {product.relatedProductSlugs && product.relatedProductSlugs.length > 0 && (
          <Section aria-label="Related Technologies">
            <Content label="related-products">
              <h2>Related Technologies</h2>
              <ul>
                {product.relatedProductSlugs.map((slug) => (
                  <li key={slug}>
                    <Link href={routes.product(slug)}>View {slug}</Link>
                  </li>
                ))}
              </ul>
            </Content>
          </Section>
        )}
      </article>
    </Page>
  );
}
