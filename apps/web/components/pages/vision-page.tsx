import { Page, Section, Content } from '@prixtara/ui';
import type { NormalizedPage } from '@/lib/server';

export interface VisionPageProps {
  page: NormalizedPage | null;
}

interface VisionPrinciple {
  number?: string;
  title: string;
  description: string;
  impact?: string;
}

interface TechnologyTheme {
  title: string;
  description: string;
  category?: string;
  tags?: string[];
}

/**
 * VisionPage — Semantic & Architectural Scaffolding.
 *
 * CRITICAL VISUAL FREEZE: Plain compositional sections only. Zero visual styling.
 */
export function VisionPage({ page }: VisionPageProps) {
  const principles = (page?.data?.['principles'] as VisionPrinciple[]) ?? [
    {
      number: '01',
      title: 'Privacy by Physical Architecture',
      description:
        'Zero cloud dependency. What is spoken or inspected on device stays on device forever.',
      impact: 'Eliminates cloud vulnerability vectors and surveillance exposure.',
    },
    {
      number: '02',
      title: 'Deterministic Real-Time Execution',
      description:
        'Sub-5ms inference budgets for physical inspection; immediate conversational turn-taking.',
      impact: 'Guarantees reliable line speed and human naturalness.',
    },
    {
      number: '03',
      title: 'Radical Accessibility & Dignity',
      description:
        'Bridging 12 Indian languages with sign language to ensure no citizen is left unheard.',
      impact: 'Universal financial and civic empowerment.',
    },
  ];

  const technologyThemes = (page?.data?.['technologyThemes'] as TechnologyTheme[]) ?? [
    {
      title: 'Edge Computer Vision & High-Speed Optics',
      description:
        'Compact sensor nodes with multi-strobe illumination for microscopic manufacturing inspection.',
      category: 'Physical Computing',
      tags: ['Optics', 'Edge AI', 'Industrial Automation'],
    },
    {
      title: 'On-Device Cognitive Reasoning',
      description:
        'Air-gapped acoustic node with local neural speech processing and hardware privacy state indicators.',
      category: 'Autonomous Intelligence',
      tags: ['Acoustic Array', 'Local LLM', 'Privacy'],
    },
    {
      title: 'Spatial Gesture & Multilingual Translation',
      description:
        'Real-time continuous Indian Sign Language (ISL) recognition and 12-language speech synthesis.',
      category: 'Language Technology',
      tags: ['ISL', 'Bhashini', 'Accessibility'],
    },
  ];

  const introduction =
    (page?.data?.['introduction'] as string) ??
    page?.description ??
    'Prixtara is founded on the conviction that the most vital intelligent systems must exist at the edge.';

  return (
    <Page id="main-content" tabIndex={-1}>
      <Section aria-label="Vision Introduction">
        <Content label="vision-header">
          <h1>{page?.title ?? 'Our Vision'}</h1>
          <p>{introduction}</p>
        </Content>
      </Section>

      <Section aria-label="Core Principles">
        <Content label="vision-principles">
          <h2>Core Architectural Principles</h2>
          <ol>
            {principles.map((principle, idx) => (
              <li key={idx}>
                {principle.number && <span>{principle.number} </span>}
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
                {principle.impact && <p>Impact: {principle.impact}</p>}
              </li>
            ))}
          </ol>
        </Content>
      </Section>

      <Section aria-label="Technology Domains">
        <Content label="technology-themes">
          <h2>Technology Focus Areas</h2>
          <ul>
            {technologyThemes.map((theme, idx) => (
              <li key={idx}>
                <h3>{theme.title}</h3>
                {theme.category && <p>Domain: {theme.category}</p>}
                <p>{theme.description}</p>
                {theme.tags && theme.tags.length > 0 && (
                  <p>Specializations: {theme.tags.join(', ')}</p>
                )}
              </li>
            ))}
          </ul>
        </Content>
      </Section>
    </Page>
  );
}
