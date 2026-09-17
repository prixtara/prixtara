import { describe, it, expect } from 'vitest';
import {
  productSchema,
  productSlugSchema,
  productMetricSchema,
  productCapabilitySchema,
  jobOpeningSchema,
  serverEnvSchema,
  clientEnvSchema,
} from '@prixtara/validation';

describe('Validation Schemas', () => {
  describe('productSlugSchema', () => {
    it('accepts valid lowercase alphanumeric and hyphenated slugs', () => {
      expect(productSlugSchema.parse('ai-vision')).toBe('ai-vision');
      expect(productSlugSchema.parse('existential-ai-2025')).toBe('existential-ai-2025');
      expect(productSlugSchema.parse('sambhashi')).toBe('sambhashi');
    });

    it('rejects uppercase, spaces, or special characters in slugs', () => {
      expect(() => productSlugSchema.parse('AI-Vision')).toThrow();
      expect(() => productSlugSchema.parse('ai vision')).toThrow();
      expect(() => productSlugSchema.parse('product_slug')).toThrow();
      expect(() => productSlugSchema.parse('product/slug')).toThrow();
      expect(() => productSlugSchema.parse('')).toThrow();
    });
  });

  describe('productSchema', () => {
    const validProduct = {
      id: 'prod-001',
      slug: 'ai-vision-defect-detection',
      name: 'AI-Vision Defect Detection',
      tagline: 'High-speed industrial optical defect detection',
      category: 'computer-vision',
      metrics: [
        {
          value: '99.98',
          unit: '%',
          label: 'Defect Accuracy',
        },
      ],
      capabilities: [
        {
          title: 'Sub-millimeter Inspection',
          description: 'Detects microscopic surface anomalies down to 50 microns.',
        },
      ],
    };

    it('validates a complete product model', () => {
      const parsed = productSchema.parse(validProduct);
      expect(parsed.name).toBe('AI-Vision Defect Detection');
      expect(parsed.metrics?.[0]?.value).toBe('99.98');
    });

    it('fails when mandatory fields are missing', () => {
      expect(() => productSchema.parse({ name: 'Incomplete' })).toThrow();
      expect(() => productSchema.parse({ ...validProduct, slug: undefined })).toThrow();
      expect(() => productSchema.parse({ ...validProduct, name: '' })).toThrow();
      expect(() => productSchema.parse({ ...validProduct, tagline: '' })).toThrow();
    });

    it('validates product metrics', () => {
      const metric = { value: '500', unit: 'fps', label: 'Throughput', highlight: true };
      expect(productMetricSchema.parse(metric)).toEqual(metric);
      expect(() => productMetricSchema.parse({ label: 'Missing value' })).toThrow();
    });

    it('validates product capabilities', () => {
      const cap = { title: 'Edge AI', description: 'Zero cloud latency', badge: 'Ultra-low power' };
      expect(productCapabilitySchema.parse(cap)).toEqual(cap);
      expect(() => productCapabilitySchema.parse({ title: '' })).toThrow();
    });
  });

  describe('jobOpeningSchema', () => {
    const validJob = {
      id: 'job-101',
      slug: 'senior-cv-engineer',
      title: 'Senior Computer Vision Engineer',
      department: 'engineering' as const,
      location: 'Bengaluru, India',
      isRemote: false,
      type: 'full-time' as const,
      summary: 'Design and deploy deep learning models for defect inspection.',
      isActive: true,
      publishedAt: '2025-01-15T09:00:00.000Z',
    };

    it('validates a correct job opening data structure', () => {
      const parsed = jobOpeningSchema.parse(validJob);
      expect(parsed.slug).toBe('senior-cv-engineer');
      expect(parsed.department).toBe('engineering');
      expect(parsed.type).toBe('full-time');
    });

    it('rejects invalid department or employment type', () => {
      expect(() =>
        jobOpeningSchema.parse({
          ...validJob,
          department: 'accounting',
        }),
      ).toThrow();

      expect(() =>
        jobOpeningSchema.parse({
          ...validJob,
          type: 'volunteer',
        }),
      ).toThrow();
    });

    it('validates datetime format for publishedAt', () => {
      expect(() =>
        jobOpeningSchema.parse({
          ...validJob,
          publishedAt: 'invalid-date-string',
        }),
      ).toThrow();
    });
  });

  describe('Environment Schemas', () => {
    describe('serverEnvSchema', () => {
      it('parses valid server environments with defaults', () => {
        const parsed = serverEnvSchema.parse({
          NODE_ENV: 'test',
          SANITY_API_TOKEN: 'secret_token_123',
        });
        expect(parsed.NODE_ENV).toBe('test');
        expect(parsed.SANITY_API_TOKEN).toBe('secret_token_123');
      });

      it('defaults NODE_ENV to development if omitted', () => {
        const parsed = serverEnvSchema.parse({});
        expect(parsed.NODE_ENV).toBe('development');
      });

      it('validates URLs for Sentry if provided', () => {
        expect(() =>
          serverEnvSchema.parse({
            SENTRY_DSN: 'not-a-url',
          }),
        ).toThrow();

        const parsed = serverEnvSchema.parse({
          SENTRY_DSN: 'https://key@o12345.ingest.sentry.io/12345',
        });
        expect(parsed.SENTRY_DSN).toBe('https://key@o12345.ingest.sentry.io/12345');
      });
    });

    describe('clientEnvSchema', () => {
      it('validates client environment defaults', () => {
        const parsed = clientEnvSchema.parse({});
        expect(parsed.NEXT_PUBLIC_SANITY_DATASET).toBe('production');
        expect(parsed.NEXT_PUBLIC_SITE_URL).toBe('http://localhost:3000');
      });

      it('accepts valid custom client env overrides', () => {
        const parsed = clientEnvSchema.parse({
          NEXT_PUBLIC_SITE_URL: 'https://prixtara.com',
          NEXT_PUBLIC_SANITY_PROJECT_ID: 'abc12345',
        });
        expect(parsed.NEXT_PUBLIC_SITE_URL).toBe('https://prixtara.com');
        expect(parsed.NEXT_PUBLIC_SANITY_PROJECT_ID).toBe('abc12345');
      });
    });
  });
});
