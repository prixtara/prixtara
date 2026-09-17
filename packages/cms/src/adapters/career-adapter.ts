import type { CmsJobOpening } from '../types';

export interface NormalizedJobPosting {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  isRemote: boolean;
  employmentType: string;
  summary: string;
  description?: string;
  responsibilities: string[];
  requirements: string[];
  optionalRequirements?: string[];
  published: boolean;
  publishedAt: string;
  applicationCta?: {
    type: 'email' | 'url';
    destination: string;
    buttonText: string;
    instructions?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export const SEED_FALLBACK_JOB_OPENINGS: NormalizedJobPosting[] = [
  {
    id: 'seed-job-cv-engineer',
    slug: 'senior-computer-vision-engineer',
    title: 'Senior Computer Vision Engineer',
    department: 'Computer Vision & Robotics',
    location: 'Bengaluru, Karnataka',
    isRemote: false,
    employmentType: 'full-time',
    summary:
      'Architect real-time sub-millimeter defect classification pipelines for high-speed industrial manufacturing lines running at 300 parts/minute.',
    responsibilities: [
      'Design, train, and deploy low-latency convolutional and transformer models for micro-defect classification (<0.1mm).',
      'Optimize neural models for deterministic edge hardware execution with sub-5ms inference budgets.',
      'Collaborate with optical and hardware engineers to calibrate programmable strobe illumination and camera triggers.',
    ],
    requirements: [
      '3+ years experience with production computer vision pipelines (PyTorch, TensorRT, OpenCV).',
      'Proven expertise with industrial defect detection, surface inspection, or edge deployment.',
      'Strong proficiency in modern C++ and Python.',
    ],
    optionalRequirements: [
      'Experience with hardware-accelerated embedded platforms (NVIDIA Jetson, FPGA, Hailo).',
    ],
    published: true,
    publishedAt: '2025-01-15T09:00:00.000Z',
    applicationCta: {
      type: 'email',
      destination: 'careers@prixtara.com',
      buttonText: 'Apply via Email',
      instructions:
        'Please email your CV and GitHub/paper links with subject [CV-ENG] Senior Computer Vision Engineer.',
    },
    seo: {
      metaTitle: 'Senior Computer Vision Engineer | Prixtara Careers',
      metaDescription: 'Build real-time micro-defect detection vision systems at Prixtara.',
    },
  },
  {
    id: 'seed-job-edge-ai-architect',
    slug: 'edge-ai-systems-architect',
    title: 'Edge AI Systems Architect',
    department: 'Artificial Intelligence & Reasoning',
    location: 'Bengaluru, Karnataka',
    isRemote: false,
    employmentType: 'full-time',
    summary:
      'Design air-gapped, privacy-preserving edge architectures for on-device reasoning and conversational cognitive agents.',
    responsibilities: [
      'Architect on-premises inference pipelines with complete zero-cloud containment.',
      'Implement deterministic crisis detection and emotional trajectory tracking algorithms.',
      'Build localized encrypted databases and memory recall systems on edge nodes.',
    ],
    requirements: [
      '4+ years building high-reliability embedded AI systems or edge runtimes.',
      'Deep understanding of model quantization, pruning, and memory-constrained inference.',
      'Experience designing deterministic safety and monitoring boundaries for AI agents.',
    ],
    published: true,
    publishedAt: '2025-01-20T10:00:00.000Z',
    applicationCta: {
      type: 'email',
      destination: 'careers@prixtara.com',
      buttonText: 'Apply via Email',
      instructions: 'Send your resume and architecture portfolio to careers@prixtara.com.',
    },
    seo: {
      metaTitle: 'Edge AI Systems Architect | Prixtara Careers',
      metaDescription: 'Design air-gapped on-premises cognitive AI systems at Prixtara.',
    },
  },
];

export function normalizeCmsJobOpening(raw: CmsJobOpening): NormalizedJobPosting {
  const slug = typeof raw.slug === 'object' && raw.slug ? raw.slug.current : String(raw.slug || '');

  return {
    id: raw._id,
    slug,
    title: raw.title,
    department: raw.department,
    location: raw.location,
    isRemote: Boolean(raw.isRemote),
    employmentType: raw.employmentType,
    summary: raw.summary,
    description: typeof raw.description === 'string' ? raw.description : undefined,
    responsibilities: Array.isArray(raw.responsibilities) ? raw.responsibilities : [],
    requirements: Array.isArray(raw.requirements) ? raw.requirements : [],
    optionalRequirements: Array.isArray(raw.optionalRequirements) ? raw.optionalRequirements : [],
    published: Boolean(raw.published),
    publishedAt: raw.publishedAt || raw._createdAt,
    applicationCta: raw.applicationCta,
    seo: raw.seo
      ? {
          metaTitle: raw.seo.metaTitle,
          metaDescription: raw.seo.metaDescription,
        }
      : undefined,
  };
}
