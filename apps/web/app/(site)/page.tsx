import type { Metadata } from 'next';

/**
 * Homepage — /
 *
 * Architecture: Server Component by default.
 *
 * Data flow:
 *   1. Server Component fetches data via lib/products.ts → @prixtara/cms
 *   2. Passes data as props to presentation components from @prixtara/ui
 *   3. No business logic inside this JSX
 *
 * TODO(cms): Fetch featured products from Sanity.
 * TODO(cms): Fetch homepage content from Sanity page document.
 * TODO(seo): Add OG image via generateImageMetadata.
 * TODO(design): Implement hero section with prixtara-hero-video.mp4.
 * TODO(design): Implement product showcase section.
 * TODO(design): Add GSAP / Motion scroll-triggered animations.
 * TODO(analytics): Fire 'page_view' event.
 */

export const metadata: Metadata = {
  title: 'Prixtara Technologies — Deep-Tech Solutions',
  description:
    'Prixtara Technologies builds advanced deep-tech solutions: AI-Vision Defect Detection, Existential AI, and Sambhashi multilingual / ISL technology.',
};

export default async function HomePage() {
  // TODO(cms): const products = await getFeaturedProducts();

  return (
    <main>
      {/* TODO(design): Hero section */}
      <section aria-label="Hero">
        <h1>Prixtara Technologies</h1>
        <p>Deep-tech solutions for a smarter world.</p>
      </section>

      {/* TODO(design): Products showcase section */}
      <section aria-label="Products">
        <h2>Our Products</h2>
        {/* TODO(cms): Map over products from CMS */}
      </section>

      {/* TODO(design): Vision teaser section */}
      {/* TODO(design): Call-to-action section */}
    </main>
  );
}
