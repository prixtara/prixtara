import type { Metadata } from 'next';
import { getActiveJobOpenings, getPageBySlug } from '@/lib/server';
import { buildMetadata } from '@prixtara/seo';
import { CareerPage } from '@/components/pages';

/**
 * Careers listing route — /career
 *
 * Architecture:
 *   - Fetches active job openings through CareerRepository.
 *   - Dynamic listing scales as new positions are published in CMS.
 *   - Visual freeze: Delegates rendering to CareerPage architectural component.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Careers',
  description:
    'Join Prixtara Technologies — engineering open positions in deep-tech AI and language intelligence.',
  slug: 'career',
});

export const revalidate = 3600;

export default async function Route() {
  const [jobs, page] = await Promise.all([
    getActiveJobOpenings(),
    getPageBySlug('career'),
  ]);

  return <CareerPage jobs={jobs} page={page} />;
}
