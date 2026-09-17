import { describe, it, expect } from 'vitest';
import {
  routes,
  ROUTES,
  getRouteDefinition,
  isRouteActive,
  isProductRoute,
  isCareerRoute,
  isValidSlug,
  extractSlugFromPath,
  buildCanonicalUrl,
  sanitizeSlug,
} from '@/lib/routes';

describe('Centralized Routing — paths and builders', () => {
  it('generates exact static paths', () => {
    expect(routes.home()).toBe('/');
    expect(routes.products()).toBe('/products');
    expect(routes.vision()).toBe('/vision');
    expect(routes.career()).toBe('/career');
    expect(routes.about()).toBe('/about');
    expect(routes.apiHealth()).toBe('/api/health');
  });

  it('generates parameterized product paths with URL encoding', () => {
    expect(routes.product('ai-vision-defect-detection')).toBe(
      '/products/ai-vision-defect-detection',
    );
    expect(routes.product('special product & feature')).toBe(
      '/products/special%20product%20%26%20feature',
    );
  });

  it('generates parameterized career paths with URL encoding', () => {
    expect(routes.careerDetail('senior-ai-engineer')).toBe('/career/senior-ai-engineer');
    expect(routes.careerDetail('lead/researcher')).toBe('/career/lead%2Fresearcher');
  });

  it('retrieves route metadata from registry', () => {
    const productDef = getRouteDefinition('productDetail');
    expect(productDef.path).toBe('/products/[slug]');
    expect(productDef.renderingStrategy).toBe('isr');

    const healthDef = getRouteDefinition('apiHealth');
    expect(healthDef.renderingStrategy).toBe('dynamic');

    const visionDef = getRouteDefinition('vision');
    expect(visionDef.renderingStrategy).toBe('ssg');
  });
});

describe('Route Matchers — isRouteActive, isProductRoute, isCareerRoute', () => {
  it('matches root path exactly when exact=true or target is /', () => {
    expect(isRouteActive('/', '/', true)).toBe(true);
    expect(isRouteActive('/products', '/', true)).toBe(false);
    expect(isRouteActive('/products', '/', false)).toBe(false);
  });

  it('matches nested routes hierarchically', () => {
    expect(isRouteActive('/products', '/products')).toBe(true);
    expect(isRouteActive('/products/ai-vision-defect-detection', '/products')).toBe(true);
    expect(isRouteActive('/about', '/products')).toBe(false);
  });

  it('correctly classifies product routes', () => {
    expect(isProductRoute('/products')).toBe(true);
    expect(isProductRoute('/products/existential-ai')).toBe(true);
    expect(isProductRoute('/career')).toBe(false);
  });

  it('correctly classifies career routes', () => {
    expect(isCareerRoute('/career')).toBe(true);
    expect(isCareerRoute('/career/senior-engineer')).toBe(true);
    expect(isCareerRoute('/vision')).toBe(false);
  });
});

describe('Slug Utilities — validation, extraction, and sanitization', () => {
  it('validates safe URL slugs', () => {
    expect(isValidSlug('ai-vision')).toBe(true);
    expect(isValidSlug('sambhashi-123')).toBe(true);
    expect(isValidSlug('existential-ai-core')).toBe(true);

    // Invalid slugs
    expect(isValidSlug('')).toBe(false);
    expect(isValidSlug(null)).toBe(false);
    expect(isValidSlug(undefined)).toBe(false);
    expect(isValidSlug('AI-Vision')).toBe(false); // Uppercase
    expect(isValidSlug('has spaces')).toBe(false);
    expect(isValidSlug('slug_with_underscores')).toBe(false);
    expect(isValidSlug('-leading-hyphen')).toBe(false);
    expect(isValidSlug('trailing-hyphen-')).toBe(false);
  });

  it('extracts slugs from nested paths', () => {
    expect(extractSlugFromPath('/products/ai-vision', '/products')).toBe('ai-vision');
    expect(extractSlugFromPath('/career/senior-dev', '/career')).toBe('senior-dev');
    expect(extractSlugFromPath('/products', '/products')).toBeNull();
    expect(extractSlugFromPath('/other/slug', '/products')).toBeNull();
  });

  it('sanitizes strings into URL-safe slugs', () => {
    expect(sanitizeSlug('AI-Vision Defect Detection!')).toBe('ai-vision-defect-detection');
    expect(sanitizeSlug('  Sambhashi: Multilingual   AI ')).toBe('sambhashi-multilingual-ai');
  });

  it('builds canonical URLs with base domain', () => {
    expect(buildCanonicalUrl('/products', 'https://prixtara.com')).toBe(
      'https://prixtara.com/products',
    );
    expect(buildCanonicalUrl('career', 'https://prixtara.com/')).toBe(
      'https://prixtara.com/career',
    );
    expect(buildCanonicalUrl('/', 'https://prixtara.com')).toBe('https://prixtara.com');
  });
});
