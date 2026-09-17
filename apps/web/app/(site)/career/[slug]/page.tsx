import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getJobOpeningBySlug, getAllJobOpeningSlugs } from '@/lib/server';
import { buildCareerMetadata } from '@/lib/server/seo';

/**
 * Individual career / job posting page — /career/[slug]
 *
 * Architecture:
 *   - CMS-driven dynamic route supporting arbitrary future job postings.
 *   - dynamicParams = true: allows on-demand ISR rendering for newly published postings.
 *   - generateStaticParams: pre-builds existing positions at build time.
 *   - Visual freeze: semantic HTML placeholder shell only.
 */

export const dynamicParams = true;

interface CareerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await getAllJobOpeningSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CareerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug);

  if (!job) {
    return { title: 'Position Not Found' };
  }

  return buildCareerMetadata(job);
}

export default async function CareerDetailPage({ params }: CareerPageProps) {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <main>
      <article>
        <header>
          <h1>{job.title}</h1>
          <p>
            {job.department} · {job.location} · {job.employmentType}
            {job.isRemote && ' (Remote Eligible)'}
          </p>
        </header>

        <section aria-label="Role Summary">
          <h2>Summary</h2>
          <p>{job.summary}</p>
        </section>

        {job.description && (
          <section aria-label="Job Description">
            <h2>About the Role</h2>
            <p>{job.description}</p>
          </section>
        )}
      </article>
    </main>
  );
}
