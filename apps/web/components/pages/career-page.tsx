import Link from 'next/link';
import { Page, Section, Content } from '@prixtara/ui';
import { routes } from '@/lib/routes';
import type { NormalizedJobOpening, NormalizedPage } from '@/lib/server';

export interface CareerPageProps {
  jobs: NormalizedJobOpening[];
  page?: NormalizedPage | null;
}

/**
 * CareerPage — Semantic & Architectural Scaffolding.
 *
 * CRITICAL VISUAL FREEZE: Plain compositional sections only. Zero visual styling.
 */
export function CareerPage({ jobs, page }: CareerPageProps) {
  return (
    <Page id="main-content" tabIndex={-1}>
      <Section aria-label="Careers Introduction">
        <Content label="career-header">
          <h1>Careers at Prixtara</h1>
          <p>
            {page?.description ??
              'Build foundational AI architectures and computer vision systems.'}
          </p>
        </Content>
      </Section>

      <Section aria-label="Open positions">
        <Content label="open-positions-list">
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
                    {job.isRemote && ' (Remote Eligible)'}
                  </p>
                  <p>{job.summary}</p>
                </li>
              ))}
            </ul>
          )}
        </Content>
      </Section>

      <Section aria-label="Engineering Culture">
        <Content label="culture-principles">
          <h2>Engineering Principles</h2>
          <ul>
            <li>
              <h3>Hardware-Adjacent Neural Optimization</h3>
              <p>
                We design algorithms with direct sympathy for physical silicon, sensor timing, and
                strobe illumination.
              </p>
            </li>
            <li>
              <h3>Edge Autonomy Over Cloud Reliance</h3>
              <p>
                Our systems operate offline and air-gapped without external telemetry latency or
                fragility.
              </p>
            </li>
            <li>
              <h3>Inclusive Impact</h3>
              <p>
                Engineering technologies that empower citizens with dignity through sign language
                and localized intelligence.
              </p>
            </li>
          </ul>
        </Content>
      </Section>
    </Page>
  );
}
