import { Page, Section, Content } from '@prixtara/ui';
import type { NormalizedJobOpening } from '@/lib/server';

export interface JobDetailPageProps {
  job: NormalizedJobOpening;
}

/**
 * JobDetailPage — Semantic & Architectural Scaffolding.
 *
 * CRITICAL VISUAL FREEZE: Plain compositional sections only. Zero visual styling.
 */
export function JobDetailPage({ job }: JobDetailPageProps) {
  return (
    <Page id="main-content" tabIndex={-1}>
      <article>
        <Section aria-label="Role Header">
          <Content label="job-header">
            <header>
              <h1>{job.title}</h1>
              <p>
                {job.department} · {job.location} · {job.employmentType}
                {job.isRemote && ' (Remote Eligible)'}
              </p>
            </header>
          </Content>
        </Section>

        <Section aria-label="Role Summary">
          <Content label="job-summary">
            <h2>Summary</h2>
            <p>{job.summary}</p>
          </Content>
        </Section>

        {job.description && (
          <Section aria-label="Job Description">
            <Content label="job-description">
              <h2>About the Role</h2>
              <p>{job.description}</p>
            </Content>
          </Section>
        )}

        {job.responsibilities && job.responsibilities.length > 0 && (
          <Section aria-label="Key Responsibilities">
            <Content label="job-responsibilities">
              <h2>Key Responsibilities</h2>
              <ul>
                {job.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Content>
          </Section>
        )}

        {job.requirements && job.requirements.length > 0 && (
          <Section aria-label="Qualifications & Requirements">
            <Content label="job-requirements">
              <h2>Requirements</h2>
              <ul>
                {job.requirements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Content>
          </Section>
        )}

        {job.optionalRequirements && job.optionalRequirements.length > 0 && (
          <Section aria-label="Preferred Qualifications">
            <Content label="job-preferred">
              <h2>Preferred Qualifications</h2>
              <ul>
                {job.optionalRequirements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Content>
          </Section>
        )}

        <Section aria-label="Application CTA">
          <Content label="job-application">
            <h2>How to Apply</h2>
            {job.applicationCta ? (
              <div>
                <p>
                  To apply for this role, send your resume and engineering portfolio to{' '}
                  <a href={`mailto:${job.applicationCta.destination}`}>
                    {job.applicationCta.destination}
                  </a>
                  .
                </p>
                {job.applicationCta.instructions && <p>{job.applicationCta.instructions}</p>}
                <a href={`mailto:${job.applicationCta.destination}`}>
                  {job.applicationCta.buttonText}
                </a>
              </div>
            ) : (
              <p>
                Please email your CV and portfolio to{' '}
                <a href="mailto:careers@prixtara.com">careers@prixtara.com</a> mentioning the role
                title in the subject line.
              </p>
            )}
          </Content>
        </Section>
      </article>
    </Page>
  );
}
