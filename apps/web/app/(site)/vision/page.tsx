import type { Metadata } from 'next';

/**
 * Vision page — /vision
 *
 * Prixtara's mission, philosophy, and technology vision.
 *
 * TODO(cms): Fetch vision page content from Sanity page document.
 * TODO(design): Implement full vision page layout.
 * TODO(seo): Add metadata with vision-specific copy.
 */
export const metadata: Metadata = {
  title: 'Our Vision',
  description: 'The technology vision and mission behind Prixtara Technologies.',
};

export default async function VisionPage() {
  // TODO(cms): const page = await getPageBySlug('vision');

  return (
    <main>
      <h1>Our Vision</h1>
      <p>Architecture placeholder — vision content coming from CMS.</p>
      {/* TODO(design): Vision hero */}
      {/* TODO(design): Mission statement */}
      {/* TODO(design): Technology pillars */}
      {/* TODO(design): Team / leadership section */}
    </main>
  );
}
