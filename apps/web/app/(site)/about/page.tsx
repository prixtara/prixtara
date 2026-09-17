import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/server';
import { buildPageMetadata } from '@/lib/server/seo';
import { AboutPage } from '@/components/pages';

/**
 * About route — /about
 *
 * Architecture:
 *   - Fetches corporate and mission copy through PageRepository.
 *   - Caching: Static generation (SSG).
 *   - Visual freeze: Delegates rendering to AboutPage architectural component.
 */
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about');
  return buildPageMetadata(page, 'about');
}

export default async function Route() {
  const page = await getPageBySlug('about');

  return <AboutPage page={page} />;
}
