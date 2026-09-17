import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/server';
import { buildPageMetadata } from '@/lib/server/seo';

/**
 * Vision page — /vision
 *
 * Architecture:
 *   - Fetches marketing copy through PageRepository.
 *   - Caching: Static generation (SSG).
 *   - Visual freeze: semantic HTML placeholder shell only.
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('vision');
  return buildPageMetadata(page, 'vision');
}

export default async function VisionPage() {
  const page = await getPageBySlug('vision');

  return (
    <main>
      <h1>{page?.title ?? 'Our Vision'}</h1>
      <p>
        {page?.description ??
          'Building foundational technologies that elevate industry and human communication.'}
      </p>
      {page?.body && <p>{page.body}</p>}
    </main>
  );
}
