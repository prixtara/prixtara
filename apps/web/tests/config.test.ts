import { describe, it, expect } from 'vitest';
import {
  siteConfig,
  CACHE_TAGS,
  REVALIDATE_INTERVALS,
  ROUTE_RENDERING_POLICY,
  HEADER_NAVIGATION,
  FOOTER_NAVIGATION,
} from '@/lib/config';

describe('Site Configuration', () => {
  it('defines core site attributes', () => {
    expect(siteConfig.name).toBe('Prixtara Technologies');
    expect(siteConfig.shortName).toBe('Prixtara');
    expect(siteConfig.url).toBeDefined();
    expect(siteConfig.locale).toBe('en_IN');
  });

  it('defines valid external social links', () => {
    expect(siteConfig.links.github).toContain('github.com');
    expect(siteConfig.links.linkedin).toContain('linkedin.com');
  });
});

describe('Caching and ISR Configuration', () => {
  it('generates predictable cache tags', () => {
    expect(CACHE_TAGS.products).toBe('products');
    expect(CACHE_TAGS.product('my-slug')).toBe('product:my-slug');
    expect(CACHE_TAGS.careers).toBe('careers');
    expect(CACHE_TAGS.career('job-123')).toBe('career:job-123');
    expect(CACHE_TAGS.page('about')).toBe('page:about');
  });

  it('defines standardized revalidation intervals', () => {
    expect(REVALIDATE_INTERVALS.FAST).toBe(60);
    expect(REVALIDATE_INTERVALS.DEFAULT).toBe(3600);
    expect(REVALIDATE_INTERVALS.LONG).toBe(86400);
    expect(REVALIDATE_INTERVALS.NEVER).toBe(false);
  });

  it('classifies routes with appropriate rendering strategies', () => {
    expect(ROUTE_RENDERING_POLICY['/about'].strategy).toBe('ssg');
    expect(ROUTE_RENDERING_POLICY['/vision'].strategy).toBe('ssg');
    expect(ROUTE_RENDERING_POLICY['/products'].strategy).toBe('isr');
    expect(ROUTE_RENDERING_POLICY['/products/[slug]'].strategy).toBe('isr');
    expect(ROUTE_RENDERING_POLICY['/career'].strategy).toBe('isr');
    expect(ROUTE_RENDERING_POLICY['/career/[slug]'].strategy).toBe('isr');
    expect(ROUTE_RENDERING_POLICY['/api/health'].strategy).toBe('dynamic');
  });
});

describe('Navigation Structure Configuration', () => {
  it('includes all primary site sections in header navigation', () => {
    const paths = HEADER_NAVIGATION.map((item) => item.href);
    expect(paths).toContain('/products');
    expect(paths).toContain('/vision');
    expect(paths).toContain('/career');
    expect(paths).toContain('/about');
  });

  it('defines structured footer navigation', () => {
    expect(FOOTER_NAVIGATION.length).toBeGreaterThanOrEqual(2);
    for (const section of FOOTER_NAVIGATION) {
      expect(section.title).toBeDefined();
      expect(section.items.length).toBeGreaterThan(0);
    }
  });
});
