import type { CmsHomepage, CmsVisionPage, CmsAboutPage } from '../types';

export interface NormalizedPageData {
  id: string;
  slug: string;
  title: string;
  description?: string;
  body?: string;
  data: Record<string, unknown>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  };
}

export const SEED_FALLBACK_PAGES: Record<string, NormalizedPageData> = {
  about: {
    id: 'seed-page-about',
    slug: 'about',
    title: 'About Prixtara',
    description:
      'Pioneering Deep-Tech Architectures for Industrial Autonomy & Inclusive Intelligence.',
    data: {
      mission:
        'To engineer deterministic, edge-native intelligence systems that solve critical physical inspection and cognitive accessibility challenges without compromising user privacy or operational velocity.',
      vision:
        'A future where mission-critical systems operate with micro-millimeter physical precision and inclusive cognitive empathy, completely on-device and air-gapped from cloud vulnerabilities.',
      milestones: [
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
      ],
    },
    seo: {
      metaTitle: 'About Us | Prixtara Technologies',
      metaDescription:
        'Discover Prixtara Technologies: Deep-tech engineering across computer vision, on-device cognitive AI, and multilingual sign language technology.',
    },
  },
  vision: {
    id: 'seed-page-vision',
    slug: 'vision',
    title: 'Our Vision',
    description: 'Deep-Tech Foundations for Autonomous, Inclusive, and Air-Gapped Intelligence.',
    data: {
      introduction:
        'Prixtara is founded on the conviction that the most vital intelligent systems must exist at the edge—where physical parts are forged, where human emotions require uncompromising confidentiality, and where language must never be a barrier to civic dignity.',
      principles: [
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
      ],
      technologyThemes: [
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
            'Quantized neural models with emotional trajectory tracking and deterministic crisis safety monitoring.',
          category: 'Cognitive Science',
          tags: ['Privacy', 'Edge Reasoning', 'Safety Monitoring'],
        },
        {
          title: 'Multilingual Multimodal Language Models',
          description:
            'Neural gesture recognition synchronized with regional speech models (Bhashini STT/TTS).',
          category: 'Language Technology',
          tags: ['ISL', 'Speech Synthesis', 'Inclusion'],
        },
      ],
    },
    seo: {
      metaTitle: 'Our Vision | Prixtara Technologies',
      metaDescription:
        'Deep-tech engineering foundations for autonomous, inclusive, and privacy-first intelligence.',
    },
  },
};

export function normalizeCmsHomepage(raw: CmsHomepage): Record<string, unknown> {
  return {
    id: raw._id,
    title: raw.title,
    sections: raw.sections || [],
    seo: raw.seo,
  };
}

export function normalizeCmsVisionPage(raw: CmsVisionPage): NormalizedPageData {
  return {
    id: raw._id,
    slug: 'vision',
    title: raw.title,
    description: raw.introduction,
    data: {
      introduction: raw.introduction,
      contentSections: raw.contentSections || [],
      principles: raw.principles || [],
      technologyThemes: raw.technologyThemes || [],
    },
    seo: raw.seo
      ? {
          metaTitle: raw.seo.metaTitle,
          metaDescription: raw.seo.metaDescription,
          canonicalUrl: raw.seo.canonicalUrl,
        }
      : undefined,
  };
}

export function normalizeCmsAboutPage(raw: CmsAboutPage): NormalizedPageData {
  return {
    id: raw._id,
    slug: 'about',
    title: raw.title,
    description: raw.tagline,
    data: {
      tagline: raw.tagline,
      companyStory: raw.companyStory,
      mission: raw.mission,
      vision: raw.vision,
      leadership: raw.leadership || [],
      milestones: raw.milestones || [],
    },
    seo: raw.seo
      ? {
          metaTitle: raw.seo.metaTitle,
          metaDescription: raw.seo.metaDescription,
          canonicalUrl: raw.seo.canonicalUrl,
        }
      : undefined,
  };
}
