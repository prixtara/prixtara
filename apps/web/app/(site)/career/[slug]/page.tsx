import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getJobOpeningBySlug } from '@/lib/careers';

/**
 * Individual career/job page — /career/[slug]
 *
 * TODO(cms): Fetch full job description (PortableText) from Sanity.
 * TODO(careers): Implement application form or link.
 * TODO(design): Job posting layout with requirements and benefits.
 * TODO(careers): Add job application storage backend.
 */
interface CareerPageProps {
  params: Promise<{ slug: string }>;
}

// TODO(cms): generateStaticParams when CMS has real data
export function generateStaticParams(): Array<{ slug: string }> {
  return [];
}

export async function generateMetadata({ params }: CareerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug);

  if (!job) {
    return { title: 'Position Not Found' };
  }

  return {
    title: job.title,
    description: job.summary,
  };
}

export default async function CareerPage({ params }: CareerPageProps) {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <main>
      <h1>{job.title}</h1>
      <p>
        {job.department} · {job.location}
      </p>
      <p>{job.summary}</p>

      {/* TODO(design): Full job description from PortableText */}
      {/* TODO(careers): Application form or link */}
    </main>
  );
}
