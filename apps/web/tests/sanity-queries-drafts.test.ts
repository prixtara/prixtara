import { describe, it, expect } from 'vitest';
import {
  allProductsQuery,
  productBySlugQuery,
  allProductSlugsQuery,
  activeJobOpeningsQuery,
  jobOpeningBySlugQuery,
  allJobOpeningSlugsQuery,
  careerPageQuery,
  visionPageQuery,
  aboutPageQuery,
  siteSettingsQuery,
  navigationQuery,
  homepageQuery,
  CACHE_TAGS,
} from '@prixtara/cms';

describe('Sanity GROQ Query Layer — Draft Exclusion Security', () => {
  const queriesToTest = [
    { name: 'allProductsQuery', query: allProductsQuery },
    { name: 'productBySlugQuery', query: productBySlugQuery },
    { name: 'allProductSlugsQuery', query: allProductSlugsQuery },
    { name: 'activeJobOpeningsQuery', query: activeJobOpeningsQuery },
    { name: 'jobOpeningBySlugQuery', query: jobOpeningBySlugQuery },
    { name: 'allJobOpeningSlugsQuery', query: allJobOpeningSlugsQuery },
    { name: 'careerPageQuery', query: careerPageQuery },
    { name: 'visionPageQuery', query: visionPageQuery },
    { name: 'aboutPageQuery', query: aboutPageQuery },
    { name: 'siteSettingsQuery', query: siteSettingsQuery },
    { name: 'navigationQuery', query: navigationQuery },
    { name: 'homepageQuery', query: homepageQuery },
  ];

  for (const { name, query } of queriesToTest) {
    it(`guarantees draft exclusion in ${name}`, () => {
      expect(query).toContain('!(_id in path("drafts.**"))');
    });
  }
});

describe('Sanity Cache Tags Canonical Registry', () => {
  it('exposes all required canonical cache tags', () => {
    expect(CACHE_TAGS.siteSettings).toBe('site-settings');
    expect(CACHE_TAGS.navigation).toBe('navigation');
    expect(CACHE_TAGS.homepage).toBe('homepage');
    expect(CACHE_TAGS.products).toBe('products');
    expect(CACHE_TAGS.product('ai-vision')).toBe('product:ai-vision');
    expect(CACHE_TAGS.vision).toBe('vision');
    expect(CACHE_TAGS.about).toBe('about');
    expect(CACHE_TAGS.careers).toBe('careers');
    expect(CACHE_TAGS.jobs).toBe('jobs');
    expect(CACHE_TAGS.job('cv-engineer')).toBe('job:cv-engineer');
  });
});
