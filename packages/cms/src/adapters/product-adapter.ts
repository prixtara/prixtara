import type { Product } from '@prixtara/types';
import { productSchema, type ValidatedProduct } from '@prixtara/validation';
import type { CmsProduct } from '../types';

/**
 * Authentic Seed Fallback Products grounded directly in Prixtara source materials.
 * Used during local development or when the CMS is unseeded / unreachable.
 */
export const SEED_FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'seed-product-ai-vision',
    slug: 'ai-vision-defect-detection',
    title: 'AI-Vision Defect Detection',
    name: 'AI-Vision Defect Detection',
    category: 'computer-vision',
    shortDescription: 'High-speed industrial vision for precision quality inspection.',
    tagline: 'High-speed industrial vision for precision quality inspection.',
    longDescription:
      'Autonomous visual defect detection system delivering micro-millimeter precision for manufacturing inspection pipelines. Features a compact inspection node, controlled conveyor, programmable LED illumination, high-speed cameras, and vision algorithms detecting defects down to 0.1 mm with 98%+ accuracy at up to 300 parts per minute.',
    problemStatement:
      'Conventional industrial vision systems demand weeks of specialist integration before a single part is inspected, creating prohibitive engineering downtime and recurring costs for manufacturing lines.',
    solution:
      'Prixtara compact inspection node flips the traditional integration model: shop-floor operators can train the system on a new product variant in under 30 minutes without code, engineers, or downtime.',
    capabilities: [
      {
        title: 'Controlled Conveyor Presentation',
        description:
          'Presents each part at a consistent inspection position for reliable, repeatable image capture.',
        badge: 'Hardware Node',
      },
      {
        title: 'Programmable LED Lighting',
        description:
          'Exposes surface and shape defects clearly under multi-spectrum optimized illumination conditions.',
        badge: 'Illumination',
      },
      {
        title: 'High-Speed Optical Capture',
        description:
          'Captures images at up to 300 parts/minute with zero slowdown to the continuous production line.',
        badge: 'Throughput',
        metricsSummary: '300 parts/min',
      },
      {
        title: 'Neural Vision Algorithms',
        description:
          'Detects micro-defects down to 0.1 mm with 98%+ accuracy across varied part geometries.',
        badge: 'Accuracy',
        metricsSummary: '0.1 mm precision',
      },
      {
        title: 'Automatic Sorting & Routing',
        description:
          'Routes OK, reject, and rework parts to dedicated bins automatically with no manual handling.',
        badge: 'Automation',
      },
    ],
    technicalDetails: [
      {
        category: 'Optical & Hardware Specifications',
        items: [
          {
            label: 'Capture Throughput',
            value: '300 parts/minute',
            description: 'Synchronized with continuous conveyor movement',
          },
          {
            label: 'Detection Resolution',
            value: '0.1 mm',
            description: 'Surface scratches, porosity, and dimensional variance',
          },
          {
            label: 'Classification Accuracy',
            value: '98%+',
            description: 'Benchmarked across industrial production lines',
          },
          {
            label: 'Form Factor',
            value: 'Compact inspection node',
            description: 'Modular drop-in for existing assembly conveyors',
          },
        ],
      },
      {
        category: 'Software & Usability',
        items: [
          {
            label: 'Setup Time',
            value: '< 30 minutes',
            description: 'No-code operator training workflow on new parts',
          },
          {
            label: 'Variant Switching',
            value: 'Instant',
            description: 'Pre-calibrated profiles for quick changeovers',
          },
          {
            label: 'Inference Latency',
            value: '< 5 ms',
            description: 'Real-time deterministic edge classification',
          },
        ],
      },
    ],
    metrics: [
      { value: '300', unit: 'parts/min', label: 'Capture Speed', highlight: true },
      { value: '0.1', unit: 'mm', label: 'Defect Precision', highlight: true },
      { value: '98%+', label: 'Detection Accuracy', highlight: true },
      { value: '30', unit: 'min', label: 'No-Code Setup', highlight: true },
    ],
    features: [
      {
        title: 'No-Code Shopfloor Setup',
        description: 'Train new parts in under 30 minutes without external engineers.',
        badge: 'Differentiator',
      },
      {
        title: 'Pneumatic 3-Way Sorting',
        description: 'Automated pneumatic ejection into OK, Reject, and Rework bins.',
      },
      {
        title: 'Edge Hardware Processing',
        description: 'Zero cloud dependency for millisecond deterministic sorting.',
      },
    ],
    useCases: [
      {
        title: 'Automotive Precision Stamping',
        targetAudience: 'Tier-1 Automotive Suppliers',
        scenario:
          'Continuous sheet metal stamping with instant burr, crack, and perforation inspection.',
        impact: 'Zero defective shipments escaped to final vehicle assembly.',
      },
      {
        title: 'Pharmaceutical Blister & Vial Packaging',
        targetAudience: 'Pharma Packaging Plants',
        scenario:
          'High-speed sealing and integrity verification on 300+ units per minute packaging lines.',
        impact: '100% compliance with sterile packaging mandates.',
      },
    ],
    applications: [
      {
        industry: 'Automotive Manufacturing',
        title: 'Precision Component Inspection',
        description: 'Detecting micro-cracks in machined components.',
      },
      {
        industry: 'Electronics Assembly',
        title: 'PCB Surface Inspection',
        description: 'Solder bridge and component misalignment detection.',
      },
    ],
    process: [
      {
        stepNumber: 1,
        title: 'Conveyor Presentation',
        description: 'Part is guided by controlled conveyor into the optical capture chamber.',
      },
      {
        stepNumber: 2,
        title: 'Multi-Spectrum Optical Flash',
        description: 'Programmable LED strobe illuminates part surface and profile geometry.',
      },
      {
        stepNumber: 3,
        title: 'Real-Time Inference (<5ms)',
        description: 'Neural algorithms score surface and shape against 0.1mm tolerance.',
      },
      {
        stepNumber: 4,
        title: 'Automated Pneumatic Routing',
        description: 'Part is sorted into OK, Reject, or Rework bins automatically.',
      },
    ],
    cta: {
      headline: 'Deploy Automated Quality Inspection to Your Line',
      description:
        'Schedule an on-site demonstration or send sample parts for feasibility benchmarking.',
      buttonLabel: 'Request Demonstration',
      buttonUrl: '/contact',
    },
    seo: {
      metaTitle: 'AI-Vision Defect Detection | Prixtara Technologies',
      metaDescription:
        'High-speed industrial vision for precision quality inspection. Detects defects down to 0.1mm at 300 parts/minute with 98%+ accuracy.',
    },
  },
  {
    id: 'seed-product-existential-ai',
    slug: 'existential-ai',
    title: 'Existential AI',
    name: 'Existential AI',
    category: 'artificial-intelligence',
    shortDescription:
      'Safe, on-premises emotional support and cognitive reasoning for mission-critical environments.',
    tagline: 'Safe, on-premises cognitive reasoning systems for mission-critical environments.',
    longDescription:
      'Existential AI is an autonomous, on-device cognitive architecture engineered for the moments when professional help is unavailable and cloud chatbots feel unsafe. Operating 100% offline on a dedicated 25cm desktop node with edge AI processing, 6 far-field microphones, hardware privacy indicator LED, and crisis detection algorithms.',
    problemStatement:
      'The moment when professional help is closed and cloud chatbots feel unsafe: users fear data harvesting, non-deterministic hallucinations, and lack of privacy for deeply sensitive thoughts.',
    solution:
      'Your thoughts. Your device. Your control. Prixtara engineered an entirely on-premises cognitive reasoning architecture with local databases, zero cloud dependencies, conversational memory, emotional context awareness, and safety monitoring.',
    capabilities: [
      {
        title: '100% On-Device Edge Processing',
        description:
          'Zero audio or text leaves the physical node. Complete cryptographic containment.',
        badge: 'Privacy',
      },
      {
        title: 'Conversational Memory & Emotional Context',
        description:
          'Tracks nuanced dialogue context and emotional trajectories over long interactions.',
        badge: 'Context',
      },
      {
        title: 'Safety Monitoring & Crisis Detection',
        description: 'Deterministic crisis detection and human-in-the-loop escalation frameworks.',
        badge: 'Safety',
      },
      {
        title: 'Physical Privacy Indicator LED',
        description:
          'Hardware-level LED visually confirms sensor activation and processing states.',
        badge: 'Hardware',
      },
    ],
    technicalDetails: [
      {
        category: 'Hardware & Acoustic Architecture',
        items: [
          {
            label: 'Form Factor',
            value: '25 cm desktop node',
            description: 'Self-contained edge enclosure with battery module',
          },
          {
            label: 'Acoustic Array',
            value: '6 far-field microphones',
            description: 'Beamforming audio isolation with hardware mute',
          },
          {
            label: 'Connectivity',
            value: 'Air-gapped / Offline',
            description: 'Zero outbound telemetry or cloud dependencies',
          },
          {
            label: 'Local Storage',
            value: 'Secure encrypted storage',
            description: 'Hardware-backed user memory partition',
          },
        ],
      },
      {
        category: 'Inference & Safety',
        items: [
          {
            label: 'Inference Engine',
            value: 'Edge neural runtime',
            description: 'Optimized quantized models running on localized accelerator',
          },
          {
            label: 'Safety Layer',
            value: 'Crisis detection filter',
            description: 'Deterministic safety boundary preventing harmful outputs',
          },
        ],
      },
    ],
    metrics: [
      { value: '100%', label: 'On-Device / Offline', highlight: true },
      { value: '0', unit: 'cloud calls', label: 'Data Exposure', highlight: true },
      { value: '25', unit: 'cm', label: 'Node Form Factor', highlight: true },
      { value: '6', label: 'Far-Field Microphones', highlight: true },
    ],
    features: [
      {
        title: 'Air-Gapped Privacy',
        description: 'Zero cloud dependencies ensures thoughts never leave the device.',
        badge: 'Core',
      },
      {
        title: 'Crisis Safety Monitoring',
        description: 'Built-in escalation protocols grounded in counselling frameworks.',
      },
      {
        title: 'Context-Aware Dialogue',
        description:
          'Understands nuance and emotional context without storing unencrypted history.',
      },
    ],
    useCases: [
      {
        title: 'Institutional Care Facilities',
        targetAudience: 'Health & Wellness Enclaves',
        scenario: 'Providing private, confidential, after-hours companion reasoning for residents.',
        impact: 'Continuous support availability with strict HIPAA/DPDP data privacy compliance.',
      },
      {
        title: 'Mission-Critical Isolated Teams',
        targetAudience: 'Defense & Deep Field Personnel',
        scenario:
          'Cognitive check-ins and operational stress reflection in completely offline deployments.',
        impact: 'High-fidelity mental resilience in connectivity-denied environments.',
      },
    ],
    applications: [
      {
        industry: 'Healthcare & Wellness',
        title: 'Confidential Patient Support',
        description: 'Private, non-judgmental conversational reflection.',
      },
      {
        industry: 'Defense & Offshore Operations',
        title: 'Isolated Edge Deployment',
        description: 'Air-gapped mental wellness support for personnel.',
      },
    ],
    process: [
      {
        stepNumber: 1,
        title: 'Physical Activation',
        description: 'User initiates conversation; hardware LED indicates local active state.',
      },
      {
        stepNumber: 2,
        title: 'Beamformed Acoustic Capture',
        description: '6-microphone array isolates voice without cloud streaming.',
      },
      {
        stepNumber: 3,
        title: 'Edge Neural Dialogue',
        description: 'On-premises model synthesizes context-aware, empathetic response.',
      },
      {
        stepNumber: 4,
        title: 'Encrypted Local Containment',
        description: 'Session data is encrypted locally; nothing is uploaded.',
      },
    ],
    cta: {
      headline: 'Experience Private, On-Device Cognitive AI',
      description:
        'Discuss institutional deployments or review our privacy architecture whitepaper.',
      buttonLabel: 'Inquire About Deployment',
      buttonUrl: '/contact',
    },
    seo: {
      metaTitle: 'Existential AI | Prixtara Technologies',
      metaDescription:
        'Safe, on-premises cognitive reasoning systems. 100% offline, on-device AI for mission-critical emotional support and privacy.',
    },
  },
  {
    id: 'seed-product-sambhashi',
    slug: 'sambhashi',
    title: 'Sambhashi',
    name: 'Sambhashi',
    category: 'language-technology',
    shortDescription:
      'Multilingual conversational AI and real-time Indian Sign Language (ISL) synthesis for inclusive public services.',
    tagline: 'Multilingual conversational AI and real-time Indian Sign Language (ISL) synthesis.',
    longDescription:
      "Sambhashi is a landmark communication system enabling inclusive interactions at India's bank counters and public service windows. The first-ever integration bridging Indian Sign Language (ISL) with 12 Indian languages in real time, supporting Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Odia, Punjabi, Assamese, and Urdu via Bhashini STT/TTS models.",
    problemStatement:
      'Over 18 million Deaf citizens and diverse linguistic communities encounter severe barriers at bank tellers, post offices, and civic windows, leading to loss of financial independence, privacy, and dignity.',
    solution:
      'Sambhashi combines computer vision sign-language recognition, edge AI processing, and real-time speech/avatar synthesis to create bidirectional communication between bank staff and citizens.',
    capabilities: [
      {
        title: 'Bidirectional ISL ↔ 12 Languages',
        description: 'Bridges Indian Sign Language with 12 constitutional Indian languages.',
        badge: 'Landmark',
      },
      {
        title: 'Edge Computer Vision Processing',
        description:
          'Recognizes continuous hand gestures and facial expressions locally in real time.',
        badge: 'Real-Time',
      },
      {
        title: 'Bhashini STT / TTS Integration',
        description: 'High-accuracy speech-to-text and text-to-speech across regional dialects.',
        badge: 'Speech',
      },
      {
        title: 'Bank Counter Form Factor',
        description:
          'Compact teller counter terminal designed for high-throughput public transactions.',
        badge: 'Deployment',
      },
    ],
    technicalDetails: [
      {
        category: 'Linguistic Coverage & Speech Models',
        items: [
          {
            label: 'Supported Languages',
            value: 'ISL + 12 Languages',
            description:
              'Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Odia, Punjabi, Assamese, Urdu',
          },
          {
            label: 'Speech Architecture',
            value: 'Bhashini STT / TTS',
            description: 'Localized speech synthesis and transcription models',
          },
          {
            label: 'Translation Latency',
            value: '< 200 ms',
            description: 'Real-time conversational turn-taking',
          },
        ],
      },
      {
        category: 'Vision & Counter Deployment',
        items: [
          {
            label: 'Sign Recognition',
            value: 'Continuous ISL gesture tracking',
            description: 'Spatio-temporal neural tracking of hands and facial markers',
          },
          {
            label: 'Operating Mode',
            value: 'Edge On-Premises',
            description: 'Offline secure processing for sensitive financial transactions',
          },
        ],
      },
    ],
    metrics: [
      { value: '12', label: 'Indian Languages', highlight: true },
      { value: '1st', label: 'ISL ↔ Speech Integration', highlight: true },
      { value: '100%', label: 'Offline Counter Ready', highlight: true },
      { value: '< 200', unit: 'ms', label: 'Sign Synthesis Latency', highlight: true },
    ],
    features: [
      {
        title: 'Sign-to-Speech Translation',
        description:
          'Translates ISL signing directly into spoken regional language for bank tellers.',
      },
      {
        title: 'Speech-to-Sign Avatar',
        description:
          'Converts teller instructions into clear, animated ISL gestures on counter display.',
      },
      {
        title: 'Offline Banking Mode',
        description: 'Operates independently of cloud network drops for guaranteed counter uptime.',
      },
    ],
    useCases: [
      {
        title: 'Banking & Financial Inclusion',
        targetAudience: 'Public Sector Banks & NBFCs',
        scenario:
          'Passbook updates, cash withdrawals, and KYC verification handled autonomously by Deaf customers.',
        impact: 'Empowers millions of citizens with dignity and financial autonomy.',
      },
      {
        title: 'Civic Service Counters',
        targetAudience: 'Government Windows & Transport Hubs',
        scenario: 'Railway ticket booking, civil registration, and emergency assistance windows.',
        impact: 'Universal accessibility across linguistic and physical barriers.',
      },
    ],
    applications: [
      {
        industry: 'Banking & Financial Services',
        title: 'Bank Teller Assistant',
        description: 'Real-time sign language translation at bank counter windows.',
      },
      {
        industry: 'Civic Infrastructure',
        title: 'Public Service Terminals',
        description: 'Transit, post office, and administrative window integration.',
      },
    ],
    process: [
      {
        stepNumber: 1,
        title: 'Sign Input Capture',
        description: 'Counter camera captures customer ISL hand and facial gestures.',
      },
      {
        stepNumber: 2,
        title: 'Edge Neural Processing',
        description: 'On-device vision model translates gestures into target dialect.',
      },
      {
        stepNumber: 3,
        title: 'Teller Speech Output',
        description:
          'Clear synthetic speech plays to the teller in their chosen regional language.',
      },
      {
        stepNumber: 4,
        title: 'Reverse Avatar Synthesis',
        description: 'Teller speech response is converted back into 3D ISL avatar signing.',
      },
    ],
    cta: {
      headline: 'Enable Inclusive Accessibility at Your Counters',
      description: 'Partner with Prixtara to pilot Sambhashi at branch service counters.',
      buttonLabel: 'Partner on Accessibility',
      buttonUrl: '/contact',
    },
    seo: {
      metaTitle: 'Sambhashi | Prixtara Technologies',
      metaDescription:
        'Multilingual conversational AI and real-time Indian Sign Language (ISL) synthesis across 12 Indian languages for inclusive banking and public services.',
    },
  },
];

/**
 * Normalizes a raw CMS product document into the domain Product shape.
 * Performs validation at the boundary.
 */
export function normalizeCmsProduct(raw: CmsProduct): Product {
  const slug = typeof raw.slug === 'object' && raw.slug ? raw.slug.current : String(raw.slug || '');
  const title = raw.title || raw.name;
  const shortDesc = raw.shortDescription || raw.tagline || '';
  const category = raw.productCategory || raw.category || 'autonomous-systems';

  return {
    id: raw._id,
    slug,
    title,
    name: title,
    category,
    shortDescription: shortDesc,
    tagline: shortDesc,
    longDescription: typeof raw.longDescription === 'string' ? raw.longDescription : undefined,
    problemStatement: typeof raw.problemStatement === 'string' ? raw.problemStatement : undefined,
    solution: typeof raw.solution === 'string' ? raw.solution : undefined,
    capabilities: raw.capabilities,
    technicalDetails: raw.technicalDetails,
    metrics: raw.metrics,
    features: raw.features,
    useCases: raw.useCases,
    applications: raw.applications,
    process: raw.process,
    cta: raw.cta,
    relatedProductSlugs: raw.relatedProducts?.map((p) => p.slug),
    publishedAt: raw._createdAt,
    seo: raw.seo
      ? {
          metaTitle: raw.seo.metaTitle,
          metaDescription: raw.seo.metaDescription,
          canonicalUrl: raw.seo.canonicalUrl,
          noindex: raw.seo.noindex,
        }
      : undefined,
  };
}

/**
 * Validates external CMS product data using Zod.
 */
export function validateCmsProduct(data: unknown): ValidatedProduct | null {
  const result = productSchema.safeParse(data);
  if (!result.success) {
    console.warn('[validateCmsProduct] Validation failed:', result.error.format());
    return null;
  }
  return result.data;
}
