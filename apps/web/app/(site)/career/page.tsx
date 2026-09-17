import type { Metadata } from 'next';
import Link from 'next/link';
import { getActiveJobOpenings } from '@/lib/careers';

/**
 * Careers listing page — /career
 *
 * TODO(cms): Fetch job openings from Sanity.
 * TODO(careers): Implement job listing cards with department filters.
 * TODO(design): Implement careers page layout.
 * TODO(careers): Add application form or link to application platform.
 */
export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Prixtara Technologies — open positions in deep-tech AI and language technology.',
};

export default async function CareersPage() {
  const jobs = await getActiveJobOpenings();

  return (
    <main>
      <h1>Careers at Prixtara</h1>

      {/* TODO(design): Careers hero / culture section */}

      <section aria-label="Open positions">
        <h2>Open Positions</h2>
        {jobs.length === 0 ? (
          <p>No open positions at this time. Check back soon.</p>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job._id}>
                <Link href={`/career/${job.slug.current}`}>{job.title}</Link>
                <span> — {job.department}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* TODO(design): General application / speculative CV section */}
    </main>
  );
}
