import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getJobOpeningBySlug, getAllJobOpeningSlugs } from '@/lib/server';
import { buildCareerMetadata } from '@/lib/server/seo';
import { getJobPostingSchema, formatJsonLd } from '@prixtara/seo';
import { JobDetailPage } from '@/components/pages';

/**
 * Individual career / job posting route — /career/[slug]
 *
 * Architecture:
 *   - CMS-driven dynamic route supporting arbitrary future job postings.
 *   - dynamicParams = true: allows on-demand ISR rendering for newly published postings.
 *   - generateStaticParams: pre-builds existing positions at build time.
 *   - Visual freeze: Delegates rendering to JobDetailPage architectural component.
 */

export const dynamicParams = true;
export const revalidate = 3600;

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
    return {
      title: 'Position Not Found',
      robots: { index: false, follow: false },
    };
  }

  return buildCareerMetadata(job);
}

export default async function Route({ params }: CareerPageProps) {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug);

  if (!job) {
    notFound();
  }

  const jobSchema = getJobPostingSchema({
    title: job.title,
    description: job.description || job.summary,
    department: job.department,
    location: job.location,
    isRemote: job.isRemote,
    employmentType: job.employmentType,
    publishedAt: job.publishedAt,
    slug: job.slug,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: formatJsonLd(jobSchema) }}
      />
      <JobDetailPage job={job} />
    </>
  );
}
