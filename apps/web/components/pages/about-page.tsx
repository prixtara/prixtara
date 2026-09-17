import { Page, Section, Content } from '@prixtara/ui';
import type { NormalizedPage } from '@/lib/server';

export interface AboutPageProps {
  page: NormalizedPage | null;
}

interface Milestone {
  yearOrDate: string;
  title: string;
  description: string;
  highlight?: boolean;
}

/**
 * AboutPage — Semantic & Architectural Scaffolding.
 *
 * CRITICAL VISUAL FREEZE: Plain compositional sections only. Zero visual styling.
 */
export function AboutPage({ page }: AboutPageProps) {
  const mission =
    (page?.data?.['mission'] as string) ??
    'To engineer deterministic, edge-native intelligence systems that solve critical physical inspection and cognitive accessibility challenges without compromising user privacy or operational velocity.';

  const vision =
    (page?.data?.['vision'] as string) ??
    'A future where mission-critical systems operate with micro-millimeter physical precision and inclusive cognitive empathy, completely on-device and air-gapped from cloud vulnerabilities.';

  const milestones = (page?.data?.['milestones'] as Milestone[]) ?? [
    {
      yearOrDate: '2024',
      title: 'Foundational Computer Vision Prototype',
      description:
        'Demonstrated 300 parts/min defect classification with sub-0.1mm optical accuracy.',
      highlight: true,
    },
    {
      yearOrDate: '2024',
      title: 'Sambhashi ISL Integration',
      description:
        'Achieved first-ever bidirectional ISL translation across 12 Indian languages using Bhashini STT/TTS.',
      highlight: true,
    },
    {
      yearOrDate: '2025',
      title: 'Existential AI Hardware Node',
      description:
        'Completed 25cm edge node with 6-microphone array and air-gapped on-device conversational memory.',
      highlight: true,
    },
  ];

  return (
    <Page id="main-content" tabIndex={-1}>
      <Section aria-label="About Overview">
        <Content label="about-header">
          <h1>{page?.title ?? 'About Prixtara'}</h1>
          <p>
            {page?.description ??
              'Pioneering Deep-Tech Architectures for Industrial Autonomy & Inclusive Intelligence.'}
          </p>
          {page?.body && page.body !== page.description && <p>{page.body}</p>}
        </Content>
      </Section>

      <Section aria-label="Mission & Vision">
        <Content label="mission-vision">
          <div>
            <h2>Our Mission</h2>
            <p>{mission}</p>
          </div>
          <div>
            <h2>Our Vision</h2>
            <p>{vision}</p>
          </div>
        </Content>
      </Section>

      <Section aria-label="Engineering Milestones">
        <Content label="milestones-timeline">
          <h2>Engineering Milestones</h2>
          <ul>
            {milestones.map((milestone, idx) => (
              <li key={idx}>
                <h3>
                  <span>{milestone.yearOrDate}</span> — {milestone.title}
                </h3>
                <p>{milestone.description}</p>
              </li>
            ))}
          </ul>
        </Content>
      </Section>
    </Page>
  );
}
