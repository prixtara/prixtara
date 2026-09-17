import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Page, Section, Content } from '@prixtara/ui';
import {
  HomePage,
  ProductIndexPage,
  ProductDetailPage,
  VisionPage,
  CareerPage,
  JobDetailPage,
  AboutPage,
} from '@/components/pages';
import type { NormalizedProduct, NormalizedJobOpening, NormalizedPage } from '@/lib/server';

describe('Semantic & Architectural Page Scaffolding (Visual Freeze)', () => {
  describe('Compositional Primitives (@prixtara/ui)', () => {
    it('renders Page as a semantic main element with accessibility attributes', () => {
      const html = renderToStaticMarkup(
        <Page id="main-content" tabIndex={-1}>
          <h1>Title</h1>
        </Page>,
      );
      expect(html).toContain('<main id="main-content" tabindex="-1">');
      expect(html).toContain('<h1>Title</h1>');
      expect(html).toContain('</main>');
    });

    it('renders Section as a semantic section element with aria-label', () => {
      const html = renderToStaticMarkup(
        <Section aria-label="Inspection Section">
          <p>Inspection details</p>
        </Section>,
      );
      expect(html).toContain('<section aria-label="Inspection Section">');
      expect(html).toContain('<p>Inspection details</p>');
      expect(html).toContain('</section>');
    });

    it('renders Content as a boundary container with data-content-block attribute', () => {
      const html = renderToStaticMarkup(
        <Content label="sensor-specs">
          <p>Sensor Specs</p>
        </Content>,
      );
      expect(html).toContain('<div data-content-block="sensor-specs">');
      expect(html).toContain('<p>Sensor Specs</p>');
      expect(html).toContain('</div>');
    });

    it('nests compositionally <Page><Section><Content /></Section></Page>', () => {
      const html = renderToStaticMarkup(
        <Page>
          <Section aria-label="Test Section">
            <Content label="test-content">
              <p>Composed content</p>
            </Content>
          </Section>
        </Page>,
      );
      expect(html).toContain('<main id="main-content" tabindex="-1">');
      expect(html).toContain('<section aria-label="Test Section">');
      expect(html).toContain('<div data-content-block="test-content">');
      expect(html).toContain('Composed content');
    });
  });

  describe('HomePage Scaffolding', () => {
    const mockFeatured: NormalizedProduct[] = [
      {
        id: 'p1',
        slug: 'ai-vision-defect-detection',
        name: 'AI-Vision Defect Detection',
        tagline: 'High-speed industrial vision for precision quality inspection.',
        category: 'Computer Vision',
        mediaAssetId: 'product-1',
      },
    ];

    it('renders semantic hero with title, quick links, and video element from media abstraction', () => {
      const html = renderToStaticMarkup(<HomePage featuredProducts={mockFeatured} />);
      expect(html).toContain('<h1>Prixtara Technologies</h1>');
      expect(html).toContain('<nav aria-label="Quick links">');
      expect(html).toContain('href="/products"');
      expect(html).toContain('href="/vision"');
      expect(html).toContain('<video');
      expect(html).toContain('/media/videos/prixtara-hero-video.mp4');
      expect(html).toContain('Featured Products</h2>');
      expect(html).toContain('AI-Vision Defect Detection</h3>');
      expect(html).toContain('href="/career"');
    });
  });

  describe('ProductIndexPage Scaffolding', () => {
    const mockProducts: NormalizedProduct[] = [
      {
        id: 'prod-1',
        slug: 'ai-vision-defect-detection',
        name: 'AI-Vision Defect Detection',
        tagline: 'High-speed industrial vision for precision quality inspection.',
        category: 'Computer Vision',
        mediaAssetId: 'product-1',
      },
      {
        id: 'prod-2',
        slug: 'existential-ai',
        name: 'Existential AI',
        tagline: 'Autonomous on-device neural reasoning node.',
        category: 'Artificial Intelligence',
        mediaAssetId: 'product-2',
      },
      {
        id: 'prod-3',
        slug: 'sambhashi',
        name: 'Sambhashi',
        tagline: 'Multilingual and Indian Sign Language engine.',
        category: 'Language Technology',
        mediaAssetId: 'product-3',
      },
    ];

    it('renders catalog header and iterates over products with media abstraction', () => {
      const html = renderToStaticMarkup(<ProductIndexPage products={mockProducts} />);
      expect(html).toContain('<h1>Our Products</h1>');
      expect(html).toContain('<nav aria-label="Products directory">');
      expect(html).toContain('href="/products/ai-vision-defect-detection"');
      expect(html).toContain('href="/products/existential-ai"');
      expect(html).toContain('href="/products/sambhashi"');
      // Media resolved through @prixtara/media
      expect(html).toContain('product-1.png');
      expect(html).toContain('product-2.png');
      expect(html).toContain('product-3.png');
    });

    it('renders coming soon fallback when product list is empty', () => {
      const html = renderToStaticMarkup(<ProductIndexPage products={[]} />);
      expect(html).toContain('Products coming soon.');
    });
  });

  describe('ProductDetailPage — Dynamic CMS Section Architecture', () => {
    const aiVisionProduct: NormalizedProduct = {
      id: 'ai-vision',
      slug: 'ai-vision-defect-detection',
      name: 'AI-Vision Defect Detection',
      tagline: 'High-speed industrial vision for precision quality inspection.',
      category: 'Computer Vision',
      description: 'Autonomous visual defect detection system delivering micro-millimeter precision.',
      problemStatement: 'Conventional industrial vision systems demand weeks of specialist integration.',
      solution: 'Prixtara compact inspection node flips the traditional integration model in under 30 minutes.',
      capabilities: [
        {
          title: 'High-Speed Optical Capture',
          description: 'Captures images at up to 300 parts/minute with zero slowdown.',
          badge: 'Throughput',
          metricsSummary: '300 parts/min',
        },
      ],
      technicalDetails: [
        {
          category: 'Optical & Hardware Specifications',
          items: [
            { label: 'Capture Throughput', value: '300 parts/minute' },
            { label: 'Detection Resolution', value: '0.1 mm' },
          ],
        },
      ],
      metrics: [
        { value: '300', unit: 'parts/min', label: 'Capture Speed' },
        { value: '0.1', unit: 'mm', label: 'Defect Precision' },
      ],
      features: [
        { title: 'No-Code Shopfloor Setup', description: 'Train new parts in under 30 minutes.' },
      ],
      applications: [
        {
          industry: 'Automotive',
          title: 'Powertrain Defect Inspection',
          description: 'Micro-scratch analysis on machined engine components.',
        },
      ],
      process: [
        {
          stepNumber: 1,
          title: 'Optical Part Ingestion',
          description: 'Part arrives via conveyor.',
        },
      ],
      cta: {
        headline: 'Deploy Industrial Vision On Your Line',
        buttonLabel: 'Request Technical Consultation',
        buttonUrl: '/contact',
      },
      mediaAssetId: 'product-1',
    };

    it('renders all CMS-defined sections for AI-Vision without hardcoded slug branches', () => {
      const html = renderToStaticMarkup(<ProductDetailPage product={aiVisionProduct} />);
      expect(html).toContain('<h1>AI-Vision Defect Detection</h1>');
      expect(html).toContain('The Challenge</h2>');
      expect(html).toContain('Conventional industrial vision systems');
      expect(html).toContain('Our Solution</h2>');
      expect(html).toContain('High-Speed Optical Capture</h3>');
      expect(html).toContain('300 parts/min');
      expect(html).toContain('Optical &amp; Hardware Specifications</h3>');
      expect(html).toContain('0.1 mm');
      expect(html).toContain('No-Code Shopfloor Setup</h3>');
      expect(html).toContain('Automotive');
      expect(html).toContain('Optical Part Ingestion</h3>');
      expect(html).toContain('Deploy Industrial Vision On Your Line</h2>');
      expect(html).toContain('href="/contact"');
    });

    it('renders a completely novel future product with only custom CMS sections without route changes', () => {
      const futureProduct: NormalizedProduct = {
        id: 'future-quantum-node',
        slug: 'quantum-edge-processor',
        name: 'Quantum Edge Node',
        tagline: 'Sub-kelvin topological neural computing for edge cryogenic telemetry.',
        category: 'Quantum Computing',
        metrics: [
          { value: '15', unit: 'mK', label: 'Operating Base Temperature' },
          { value: '1000x', label: 'Speedup on Combinatorial Optimization' },
        ],
        useCases: [
          {
            title: 'Cryogenic Aerospace Telemetry',
            scenario: 'Real-time telemetry decoding inside orbital liquid propellant tanks.',
            impact: 'Zero transmission wire parasitics.',
          },
        ],
        cta: {
          headline: 'Inquire About Quantum Pilot Access',
          buttonLabel: 'Request Briefing',
          buttonUrl: '/contact',
        },
      };

      const html = renderToStaticMarkup(<ProductDetailPage product={futureProduct} />);
      expect(html).toContain('<h1>Quantum Edge Node</h1>');
      expect(html).toContain('Performance Benchmarks</h2>');
      expect(html).toContain('15');
      expect(html).toContain('mK');
      expect(html).toContain('Cryogenic Aerospace Telemetry</h3>');
      expect(html).toContain('Inquire About Quantum Pilot Access</h2>');
      // Sections not in CMS data are omitted dynamically
      expect(html).not.toContain('The Challenge</h2>');
      expect(html).not.toContain('Core Capabilities</h2>');
    });
  });

  describe('VisionPage Scaffolding', () => {
    const mockPage: NormalizedPage = {
      id: 'vision',
      slug: 'vision',
      title: 'Our Vision',
      description: 'Deep-Tech Foundations for Autonomous, Inclusive, and Air-Gapped Intelligence.',
      data: {
        introduction: 'Custom introduction from CMS.',
        principles: [
          {
            number: '01',
            title: 'Privacy by Physical Architecture',
            description: 'Zero cloud dependency.',
          },
        ],
      },
    };

    it('renders vision title, introduction, and principles', () => {
      const html = renderToStaticMarkup(<VisionPage page={mockPage} />);
      expect(html).toContain('<h1>Our Vision</h1>');
      expect(html).toContain('Custom introduction from CMS.');
      expect(html).toContain('Privacy by Physical Architecture</h3>');
    });
  });

  describe('CareerPage & JobDetailPage Scaffolding', () => {
    const mockJob: NormalizedJobOpening = {
      id: 'cv-eng',
      slug: 'senior-computer-vision-engineer',
      title: 'Senior Computer Vision Engineer',
      department: 'Computer Vision & Robotics',
      location: 'Bengaluru, Karnataka',
      isRemote: false,
      employmentType: 'full-time',
      summary: 'Architect real-time defect classification pipelines.',
      description: 'Lead deep learning model optimization.',
      responsibilities: ['Train low-latency CNNs.', 'Calibrate camera strobes.'],
      requirements: ['3+ years PyTorch.', 'Industrial defect experience.'],
      applicationCta: {
        type: 'email',
        destination: 'careers@prixtara.com',
        buttonText: 'Apply via Email',
      },
      isActive: true,
      publishedAt: '2025-01-15T09:00:00.000Z',
    };

    it('renders CareerPage with active listings', () => {
      const html = renderToStaticMarkup(<CareerPage jobs={[mockJob]} />);
      expect(html).toContain('<h1>Careers at Prixtara</h1>');
      expect(html).toContain('Senior Computer Vision Engineer</h3>');
      expect(html).toContain('Bengaluru, Karnataka');
    });

    it('renders JobDetailPage with responsibilities and application instructions', () => {
      const html = renderToStaticMarkup(<JobDetailPage job={mockJob} />);
      expect(html).toContain('<h1>Senior Computer Vision Engineer</h1>');
      expect(html).toContain('Architect real-time defect classification pipelines.');
      expect(html).toContain('Train low-latency CNNs.</li>');
      expect(html).toContain('3+ years PyTorch.</li>');
      expect(html).toContain('href="mailto:careers@prixtara.com"');
    });
  });

  describe('AboutPage Scaffolding', () => {
    const mockAbout: NormalizedPage = {
      id: 'about',
      slug: 'about',
      title: 'About Prixtara',
      description: 'Pioneering Deep-Tech Architectures for Industrial Autonomy & Inclusive Intelligence.',
      data: {
        mission: 'To engineer deterministic edge intelligence systems.',
        vision: 'A future where mission-critical systems operate with physical precision.',
        milestones: [
          {
            yearOrDate: '2024',
            title: 'Foundational Computer Vision Prototype',
            description: '300 parts/min with sub-0.1mm optical accuracy.',
          },
        ],
      },
    };

    it('renders AboutPage with mission, vision, and milestones', () => {
      const html = renderToStaticMarkup(<AboutPage page={mockAbout} />);
      expect(html).toContain('<h1>About Prixtara</h1>');
      expect(html).toContain('To engineer deterministic edge intelligence systems.</p>');
      expect(html).toContain('Foundational Computer Vision Prototype</h3>');
      expect(html).toContain('2024');
    });
  });
});
