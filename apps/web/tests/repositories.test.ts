import { describe, it, expect } from 'vitest';
import {
  getProductRepository,
  getCareerRepository,
  getPageRepository,
  getNavigationRepository,
  CmsProductRepository,
  CmsCareerRepository,
  CmsPageRepository,
  StaticNavigationRepository,
} from '@/lib/server/repositories';

describe('ProductRepository', () => {
  const repo = getProductRepository();

  it('provides a valid repository instance', () => {
    expect(repo).toBeInstanceOf(CmsProductRepository);
  });

  it('retrieves normalized product catalog', async () => {
    const products = await repo.getAllProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThanOrEqual(3);

    const first = products[0];
    expect(first).toBeDefined();
    expect(first?.id).toBeDefined();
    expect(first?.slug).toBeDefined();
    expect(first?.name).toBeDefined();
    expect(first?.tagline).toBeDefined();
    expect(first?.category).toBeDefined();
  });

  it('retrieves a single product by slug', async () => {
    const product = await repo.getProductBySlug('ai-vision-defect-detection');
    expect(product).not.toBeNull();
    expect(product?.slug).toBe('ai-vision-defect-detection');
    expect(product?.name).toContain('AI-Vision');
  });

  it('returns null for nonexistent product slug', async () => {
    const missing = await repo.getProductBySlug('nonexistent-product-slug');
    expect(missing).toBeNull();
  });

  it('returns a list of product slugs for static generation', async () => {
    const slugs = await repo.getAllProductSlugs();
    expect(slugs).toContain('ai-vision-defect-detection');
    expect(slugs).toContain('existential-ai');
    expect(slugs).toContain('sambhashi');
  });

  it('retrieves featured products', async () => {
    const featured = await repo.getFeaturedProducts();
    expect(featured.length).toBeLessThanOrEqual(3);
    expect(featured.length).toBeGreaterThan(0);
  });
});

describe('CareerRepository', () => {
  const repo = getCareerRepository();

  it('provides a valid repository instance', () => {
    expect(repo).toBeInstanceOf(CmsCareerRepository);
  });

  it('returns active job openings list', async () => {
    const openings = await repo.getActiveJobOpenings();
    expect(Array.isArray(openings)).toBe(true);
  });

  it('returns null for nonexistent job opening slug', async () => {
    const missing = await repo.getJobOpeningBySlug('nonexistent-role');
    expect(missing).toBeNull();
  });

  it('retrieves career slugs for static generation', async () => {
    const slugs = await repo.getAllJobOpeningSlugs();
    expect(Array.isArray(slugs)).toBe(true);
  });
});

describe('PageRepository', () => {
  const repo = getPageRepository();

  it('provides a valid repository instance', () => {
    expect(repo).toBeInstanceOf(CmsPageRepository);
  });

  it('retrieves about page copy', async () => {
    const page = await repo.getPageBySlug('about');
    expect(page).not.toBeNull();
    expect(page?.slug).toBe('about');
    expect(page?.title).toContain('About');
  });

  it('retrieves vision page copy', async () => {
    const page = await repo.getPageBySlug('vision');
    expect(page).not.toBeNull();
    expect(page?.slug).toBe('vision');
    expect(page?.title).toContain('Vision');
  });

  it('returns null for unknown marketing page', async () => {
    const missing = await repo.getPageBySlug('unknown-page');
    expect(missing).toBeNull();
  });

  it('retrieves all known page slugs', async () => {
    const slugs = await repo.getAllPageSlugs();
    expect(slugs).toContain('about');
    expect(slugs).toContain('vision');
  });
});

describe('NavigationRepository', () => {
  const repo = getNavigationRepository();

  it('provides a valid repository instance', () => {
    expect(repo).toBeInstanceOf(StaticNavigationRepository);
  });

  it('returns header navigation items', async () => {
    const headerItems = await repo.getHeaderNavigation();
    expect(headerItems.length).toBeGreaterThan(0);
    expect(headerItems.map((i) => i.href)).toContain('/products');
    expect(headerItems.map((i) => i.href)).toContain('/vision');
    expect(headerItems.map((i) => i.href)).toContain('/career');
    expect(headerItems.map((i) => i.href)).toContain('/about');
  });

  it('returns footer navigation sections', async () => {
    const footerSections = await repo.getFooterNavigation();
    expect(footerSections.length).toBeGreaterThanOrEqual(2);
    expect(footerSections[0]?.items.length).toBeGreaterThan(0);
  });
});
