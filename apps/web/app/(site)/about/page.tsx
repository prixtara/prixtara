import type { Metadata } from 'next';

/**
 * About page — /about
 *
 * Company story, team, and founding principles.
 *
 * TODO(cms): Fetch about page content from Sanity page document.
 * TODO(design): Implement about page layout with team section.
 */
export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Prixtara Technologies — our story, team, and mission.',
};

export default async function AboutPage() {
  // TODO(cms): const page = await getPageBySlug('about');

  return (
    <main>
      <h1>About Prixtara</h1>
      <p>Architecture placeholder — about content coming from CMS.</p>
      {/* TODO(design): Company story section */}
      {/* TODO(design): Team / founders section */}
      {/* TODO(design): Values and principles section */}
      {/* TODO(design): Contact information */}
    </main>
  );
}
