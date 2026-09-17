import { describe, it, expect } from 'vitest';
import {
  buildMetadata,
  defaultMetadata,
  getOrganizationSchema,
  getWebsiteSchema,
  getProductSchema,
  getJobPostingSchema,
  formatJsonLd,
} from '@prixtara/seo';

describe('@prixtara/seo', () => {
  describe('defaultMetadata', () => {
    it('provides site-wide fallback metadata', () => {
      expect(defaultMetadata.title).toBeDefined();
      expect(defaultMetadata.description).toContain('Prixtara Technologies');
      expect(defaultMetadata.robots).toBeDefined();
      expect(defaultMetadata.openGraph).toBeDefined();
      expect(defaultMetadata.twitter).toBeDefined();
    });
  });

  describe('buildMetadata', () => {
    it('generates fully formed metadata with canonical URL', () => {
      const meta = buildMetadata({
        title: 'Industrial Computer Vision',
        description: 'Micro-defect classification at 300 parts per minute.',
        slug: 'products/ai-vision-defect-detection',
        baseUrl: 'https://prixtara.com',
      });

      expect(meta.title).toBe('Industrial Computer Vision');
      expect(meta.description).toBe('Micro-defect classification at 300 parts per minute.');
      expect(meta.alternates?.canonical).toBe(
        'https://prixtara.com/products/ai-vision-defect-detection',
      );
      expect(meta.openGraph?.url).toBe('https://prixtara.com/products/ai-vision-defect-detection');
      expect(meta.openGraph?.title).toBe('Industrial Computer Vision');
      expect((meta.twitter as { card?: string })?.card).toBe('summary_large_image');
    });

    it('handles root or empty slug correctly', () => {
      const meta = buildMetadata({
        title: 'Home',
        description: 'Home page description',
        slug: '',
        baseUrl: 'https://prixtara.com',
      });

      expect(meta.alternates?.canonical).toBe('https://prixtara.com');
      expect(meta.openGraph?.url).toBe('https://prixtara.com');
    });

    it('sets noIndex when requested', () => {
      const meta = buildMetadata({
        title: 'Secret Page',
        description: 'Do not index',
        noIndex: true,
      });

      expect(meta.robots).toEqual({ index: false, follow: false });
    });
  });

  describe('Structured Data (JSON-LD)', () => {
    it('generates Organization schema', () => {
      const schema = getOrganizationSchema('https://prixtara.com');
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe('Prixtara Technologies');
      expect(schema.url).toBe('https://prixtara.com');
      expect(schema.sameAs).toContain('https://github.com/prixtara');
    });

    it('generates WebSite schema', () => {
      const schema = getWebsiteSchema('https://prixtara.com');
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebSite');
      expect(schema.name).toBe('Prixtara Technologies');
      expect(schema.url).toBe('https://prixtara.com');
    });

    it('generates Product schema', () => {
      const schema = getProductSchema({
        name: 'AI-Vision Defect Detection',
        description: 'Automated defect detection',
        category: 'Computer Vision',
        slug: 'ai-vision-defect-detection',
        baseUrl: 'https://prixtara.com',
      });

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Product');
      expect(schema.name).toBe('AI-Vision Defect Detection');
      expect(schema.category).toBe('Computer Vision');
      expect(schema.url).toBe('https://prixtara.com/products/ai-vision-defect-detection');
      expect(schema.brand.name).toBe('Prixtara Technologies');
    });

    it('generates JobPosting schema', () => {
      const schema = getJobPostingSchema({
        title: 'Computer Vision Engineer',
        description: 'Develop edge AI models',
        department: 'Engineering',
        location: 'Bengaluru',
        isRemote: true,
        employmentType: 'full-time',
        publishedAt: '2025-01-15T00:00:00.000Z',
        slug: 'computer-vision-engineer',
        baseUrl: 'https://prixtara.com',
      });

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('JobPosting');
      expect(schema.title).toBe('Computer Vision Engineer');
      expect(schema.url).toBe('https://prixtara.com/career/computer-vision-engineer');
      expect(schema.jobLocationType).toBe('TELECOMMUTE');
      expect(schema.employmentType).toBe('FULL-TIME');
      expect(schema.hiringOrganization.name).toBe('Prixtara Technologies');
    });

    it('sanitizes and formats JSON-LD output without unescaped tags', () => {
      const schema = {
        '@context': 'https://schema.org',
        test: '</script><script>alert("xss")</script>',
      };
      const formatted = formatJsonLd(schema);
      expect(formatted).not.toContain('</script>');
      expect(formatted).toContain('\\u003c/script>');
    });
  });
});
