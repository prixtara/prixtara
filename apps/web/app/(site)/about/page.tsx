import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/server';
import { buildPageMetadata } from '@/lib/server/seo';

/**
 * About page — /about
 *
 * Architecture:
 *   - Fetches corporate and mission copy through PageRepository.
 *   - Caching: Static generation (SSG).
 *   - Visual freeze: semantic HTML placeholder shell only.
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about');
  return buildPageMetadata(page, 'about');
}

export default async function AboutPage() {
  const page = await getPageBySlug('about');

  return (
    <main>
      <h1>{page?.title ?? 'About Prixtara'}</h1>
      <p>
        {page?.description ??
          'Prixtara Technologies develops pioneering deep-tech software solutions.'}
      </p>
      {page?.body && <p>{page.body}</p>}
    </main>
  );
}
