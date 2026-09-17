import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/server';
import { buildPageMetadata } from '@/lib/server/seo';
import { VisionPage } from '@/components/pages';

/**
 * Vision route — /vision
 *
 * Architecture:
 *   - Fetches marketing copy through PageRepository.
 *   - Caching: Static generation (SSG).
 *   - Visual freeze: Delegates rendering to VisionPage architectural component.
 */
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('vision');
  return buildPageMetadata(page, 'vision');
}

export default async function Route() {
  const page = await getPageBySlug('vision');

  return <VisionPage page={page} />;
}
