import type { Metadata } from 'next';
import Link from 'next/link';
import { getActiveJobOpenings } from '@/lib/server';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@prixtara/seo';

/**
 * Careers listing page — /career
 *
 * Architecture:
 *   - Fetches active job openings through CareerRepository.
 *   - Dynamic listing scales as new positions are published in CMS.
 *   - Visual freeze: semantic HTML placeholder shell only.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Careers',
  description:
    'Join Prixtara Technologies — engineering open positions in deep-tech AI and language intelligence.',
  slug: 'career',
});

export default async function CareersPage() {
  const jobs = await getActiveJobOpenings();

  return (
    <main>
      <h1>Careers at Prixtara</h1>
      <p>Build foundational AI architectures and computer vision systems.</p>

      <section aria-label="Open positions">
        <h2>Open Positions</h2>
        {jobs.length === 0 ? (
          <p>No open positions at this time. Check back soon.</p>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>
                <Link href={routes.careerDetail(job.slug)}>
                  <h3>{job.title}</h3>
                </Link>
                <p>
                  {job.department} · {job.location} · {job.employmentType}
                </p>
                <p>{job.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
