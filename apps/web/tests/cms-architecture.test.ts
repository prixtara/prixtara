import { describe, it, expect } from 'vitest';
import {
  normalizeCmsProduct,
  normalizeCmsJobOpening,
  normalizeCmsAboutPage,
  normalizeCmsVisionPage,
  normalizeCmsNavigation,
  normalizeCmsSiteSettings,
  validateCmsProduct,
  SEED_FALLBACK_PRODUCTS,
  SEED_FALLBACK_JOB_OPENINGS,
  SEED_FALLBACK_PAGES,
  isValidPreviewSecret,
  sanitizePreviewRedirectPath,
  type CmsProduct,
  type CmsJobOpening,
  type CmsNavigation,
  type CmsSiteSettings,
} from '@prixtara/cms';
import { productSlugSchema, productSlugRegex } from '@prixtara/validation';

describe('CMS Architecture — Data-Driven Products', () => {
  it('supports arbitrary products (Product A through E) without schema or code changes', () => {
    const productsToTest = ['product-a', 'product-b', 'product-c', 'product-d', 'product-e'];

    for (const slug of productsToTest) {
      expect(productSlugRegex.test(slug)).toBe(true);

      const rawCmsProduct: CmsProduct = {
        _id: `doc-${slug}`,
        _type: 'product',
        _createdAt: '2025-01-01T00:00:00.000Z',
        _updatedAt: '2025-01-01T00:00:00.000Z',
        _rev: 'rev1',
        title: `Product ${slug.slice(-1).toUpperCase()}`,
        name: `Product ${slug.slice(-1).toUpperCase()}`,
        slug: { _type: 'slug', current: slug },
        productCategory: 'autonomous-systems',
        category: 'autonomous-systems',
        shortDescription: `Data-driven description for ${slug}.`,
        tagline: `Data-driven tagline for ${slug}.`,
        metrics: [
          { value: '99.9%', label: 'Reliability' },
          { value: '10', unit: 'ms', label: 'Response Time' },
        ],
      };

      const normalized = normalizeCmsProduct(rawCmsProduct);
      expect(normalized.slug).toBe(slug);
      expect(normalized.name).toBe(`Product ${slug.slice(-1).toUpperCase()}`);
      expect(normalized.metrics?.length).toBe(2);
    }
  });

  it('validates product slugs correctly with Zod', () => {
    expect(productSlugSchema.safeParse('ai-vision-defect-detection').success).toBe(true);
    expect(productSlugSchema.safeParse('product-123-x').success).toBe(true);
    expect(productSlugSchema.safeParse('product-e').success).toBe(true);

    // Invalid slug formats
    expect(productSlugSchema.safeParse('Product With Spaces').success).toBe(false);
    expect(productSlugSchema.safeParse('product_with_underscore').success).toBe(false);
    expect(productSlugSchema.safeParse('').success).toBe(false);
  });

  it('validates product data with boundary validator', () => {
    const valid = validateCmsProduct({
      id: 'prod-1',
      slug: 'neural-fabric',
      name: 'Neural Fabric',
      tagline: 'Edge fabric for distributed intelligence.',
      category: 'edge-computing',
    });
    expect(valid).not.toBeNull();
    expect(valid?.slug).toBe('neural-fabric');

    const invalid = validateCmsProduct({
      id: 'prod-2',
      // missing name and slug
    });
    expect(invalid).toBeNull();
  });
});

describe('CMS Architecture — Authentic Grounded Seed Data', () => {
  it('includes AI-Vision Defect Detection with verified slide metrics', () => {
    const aiVision = SEED_FALLBACK_PRODUCTS.find((p) => p.slug === 'ai-vision-defect-detection');
    expect(aiVision).toBeDefined();

    const speedMetric = aiVision?.metrics?.find((m) => m.label.includes('Speed'));
    expect(speedMetric?.value).toBe('300');
    expect(speedMetric?.unit).toBe('parts/min');

    const precisionMetric = aiVision?.metrics?.find((m) => m.label.includes('Precision'));
    expect(precisionMetric?.value).toBe('0.1');
    expect(precisionMetric?.unit).toBe('mm');

    const accuracyMetric = aiVision?.metrics?.find((m) => m.label.includes('Accuracy'));
    expect(accuracyMetric?.value).toBe('98%+');
  });

  it('includes Existential AI with verified hardware and acoustic metrics', () => {
    const existential = SEED_FALLBACK_PRODUCTS.find((p) => p.slug === 'existential-ai');
    expect(existential).toBeDefined();

    const offlineMetric = existential?.metrics?.find((m) => m.label.includes('Offline'));
    expect(offlineMetric?.value).toBe('100%');

    const formFactor = existential?.technicalDetails
      ?.find((g) => g.category.includes('Hardware'))
      ?.items.find((i) => i.label === 'Form Factor');
    expect(formFactor?.value).toContain('25 cm');

    const microphones = existential?.technicalDetails
      ?.find((g) => g.category.includes('Hardware'))
      ?.items.find((i) => i.label === 'Acoustic Array');
    expect(microphones?.value).toContain('6 far-field microphones');
  });

  it('includes Sambhashi with verified 12-language and Bhashini specifications', () => {
    const sambhashi = SEED_FALLBACK_PRODUCTS.find((p) => p.slug === 'sambhashi');
    expect(sambhashi).toBeDefined();

    const langMetric = sambhashi?.metrics?.find((m) => m.label.includes('Languages'));
    expect(langMetric?.value).toBe('12');

    const techSpec = sambhashi?.technicalDetails
      ?.find((g) => g.category.includes('Linguistic'))
      ?.items.find((i) => i.label === 'Supported Languages');
    expect(techSpec?.description).toContain('Hindi');
    expect(techSpec?.description).toContain('Bengali');
    expect(techSpec?.description).toContain('Tamil');
    expect(techSpec?.description).toContain('Telugu');
  });
});

describe('CMS Architecture — Job Postings & Pages', () => {
  it('normalizes job postings correctly', () => {
    const rawJob: CmsJobOpening = {
      _id: 'job-1',
      _type: 'jobPosting',
      _createdAt: '2025-01-01T00:00:00.000Z',
      _updatedAt: '2025-01-01T00:00:00.000Z',
      _rev: 'rev1',
      title: 'Robotics Software Engineer',
      slug: { _type: 'slug', current: 'robotics-software-engineer' },
      department: 'computer-vision',
      location: 'Bengaluru, India',
      isRemote: false,
      employmentType: 'full-time',
      summary: 'Build high-speed robotic integration pipelines.',
      responsibilities: ['Develop ROS2 drivers', 'Integrate sorting pneumatics'],
      requirements: ['C++ proficiency', 'Real-time Linux'],
      published: true,
      publishedAt: '2025-01-01T00:00:00.000Z',
    };

    const normalized = normalizeCmsJobOpening(rawJob);
    expect(normalized.slug).toBe('robotics-software-engineer');
    expect(normalized.responsibilities.length).toBe(2);
    expect(normalized.published).toBe(true);
  });

  it('provides verified seed job openings', () => {
    expect(SEED_FALLBACK_JOB_OPENINGS.length).toBeGreaterThanOrEqual(2);
    const cvRole = SEED_FALLBACK_JOB_OPENINGS.find(
      (j) => j.slug === 'senior-computer-vision-engineer',
    );
    expect(cvRole).toBeDefined();
    expect(cvRole?.department).toContain('Computer Vision');
  });

  it('provides verified seed marketing pages (About and Vision)', () => {
    expect(SEED_FALLBACK_PAGES['about']).toBeDefined();
    expect(SEED_FALLBACK_PAGES['vision']).toBeDefined();
    expect(SEED_FALLBACK_PAGES['about']?.data['milestones']).toBeDefined();
    expect(SEED_FALLBACK_PAGES['vision']?.data['principles']).toBeDefined();
  });
});

describe('CMS Architecture — Preview and Draft Security', () => {
  it('validates preview secrets safely', () => {
    expect(isValidPreviewSecret(null)).toBe(false);
    expect(isValidPreviewSecret(undefined)).toBe(false);
    expect(isValidPreviewSecret('')).toBe(false);
  });

  it('prevents open redirect vulnerabilities in preview redirect paths', () => {
    expect(sanitizePreviewRedirectPath('/products/ai-vision')).toBe('/products/ai-vision');
    expect(sanitizePreviewRedirectPath('/career')).toBe('/career');

    // Malicious open redirect attempts must be neutralized to '/'
    expect(sanitizePreviewRedirectPath('https://malicious-site.com')).toBe('/');
    expect(sanitizePreviewRedirectPath('//malicious-site.com')).toBe('/');
    expect(sanitizePreviewRedirectPath('')).toBe('/');
    expect(sanitizePreviewRedirectPath(null)).toBe('/');
  });
});
