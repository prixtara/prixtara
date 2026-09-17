import Link from 'next/link';
import { Page, Section, Content } from '@prixtara/ui';
import { routes } from '@/lib/routes';
import { resolveVideo } from '@prixtara/media';
import type { NormalizedProduct } from '@/lib/server';

export interface HomePageProps {
  featuredProducts: NormalizedProduct[];
}

/**
 * HomePage — Semantic & Architectural Scaffolding.
 *
 * CRITICAL VISUAL FREEZE: Plain compositional sections only. Zero visual styling.
 */
export function HomePage({ featuredProducts }: HomePageProps) {
  const heroVideo = resolveVideo('prixtara-hero-video');

  return (
    <Page id="main-content" tabIndex={-1}>
      <Section aria-label="Hero">
        <Content label="hero-intro">
          <h1>Prixtara Technologies</h1>
          <p>Deep-tech solutions for a smarter world.</p>
          <nav aria-label="Quick links">
            <Link href={routes.products()}>Explore Products</Link>
            <Link href={routes.vision()}>Our Vision</Link>
          </nav>
        </Content>
        <Content label="hero-media-placeholder">
          <video
            aria-label={heroVideo.title}
            controls={heroVideo.intent.controls}
            preload={heroVideo.intent.preload}
          >
            <source src={heroVideo.src} type={heroVideo.mimeType} />
            <p>Your browser does not support the video tag.</p>
          </video>
        </Content>
      </Section>

      <Section aria-label="Featured Products">
        <Content label="featured-products-catalog">
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
        </Content>
      </Section>

      <Section aria-label="Technology Pillars">
        <Content label="technology-themes">
          <h2>Core Technology Domains</h2>
          <ul>
            <li>
              <h3>Edge Computer Vision & High-Speed Optics</h3>
              <p>Sub-millimeter industrial quality inspection on active manufacturing lines.</p>
            </li>
            <li>
              <h3>On-Device Cognitive AI</h3>
              <p>Air-gapped acoustic node with local neural reasoning and physical privacy.</p>
            </li>
            <li>
              <h3>Spatial Gesture & Multilingual Translation</h3>
              <p>Bidirectional Indian Sign Language synthesis across 12 Indian languages.</p>
            </li>
          </ul>
        </Content>
      </Section>

      <Section aria-label="Careers Teaser">
        <Content label="career-opportunities">
          <h2>Join the Engineering Team</h2>
          <p>We are expanding our core computer vision and deep-tech teams in Bengaluru.</p>
          <Link href={routes.career()}>View Open Positions</Link>
        </Content>
      </Section>
    </Page>
  );
}
