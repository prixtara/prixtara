import { describe, it, expect } from 'vitest';
import {
  SanityProductRepository,
  SanityCareerRepository,
  SanityPageRepository,
  SanityNavigationRepository,
  getProductRepository,
  getCareerRepository,
  getPageRepository,
  getNavigationRepository,
} from '@/lib/server/repositories';

describe('SanityProductRepository', () => {
  const repo = new SanityProductRepository();

  it('is the default repository registered in the DI factory', () => {
    expect(getProductRepository()).toBeInstanceOf(SanityProductRepository);
  });

  it('retrieves normalized products', async () => {
    const products = await repo.getAllProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThanOrEqual(3);

    for (const p of products) {
      expect(p.id).toBeDefined();
      expect(p.slug).toBeDefined();
      expect(p.name).toBeDefined();
      expect(p.category).toBeDefined();
    }
  });

  it('retrieves product by slug', async () => {
    const product = await repo.getProductBySlug('ai-vision-defect-detection');
    expect(product).not.toBeNull();
    expect(product?.slug).toBe('ai-vision-defect-detection');
  });

  it('returns null for missing product slug', async () => {
    const missing = await repo.getProductBySlug('nonexistent-product-12345');
    expect(missing).toBeNull();
  });

  it('retrieves all product slugs for generateStaticParams', async () => {
    const slugs = await repo.getAllProductSlugs();
    expect(slugs).toContain('ai-vision-defect-detection');
    expect(slugs).toContain('existential-ai');
    expect(slugs).toContain('sambhashi');
  });

  it('retrieves featured products', async () => {
    const featured = await repo.getFeaturedProducts();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.length).toBeLessThanOrEqual(3);
  });
});

describe('SanityCareerRepository', () => {
  const repo = new SanityCareerRepository();

  it('is the default repository registered in the DI factory', () => {
    expect(getCareerRepository()).toBeInstanceOf(SanityCareerRepository);
  });

  it('retrieves active job openings', async () => {
    const jobs = await repo.getActiveJobOpenings();
    expect(Array.isArray(jobs)).toBe(true);
    expect(jobs.length).toBeGreaterThanOrEqual(2);
  });

  it('retrieves job opening by slug', async () => {
    const job = await repo.getJobOpeningBySlug('senior-computer-vision-engineer');
    expect(job).not.toBeNull();
    expect(job?.slug).toBe('senior-computer-vision-engineer');
  });

  it('returns null for unknown job opening slug', async () => {
    const missing = await repo.getJobOpeningBySlug('unknown-job-slug');
    expect(missing).toBeNull();
  });

  it('retrieves all job slugs for static generation', async () => {
    const slugs = await repo.getAllJobOpeningSlugs();
    expect(slugs).toContain('senior-computer-vision-engineer');
  });
});

describe('SanityPageRepository', () => {
  const repo = new SanityPageRepository();

  it('is the default repository registered in the DI factory', () => {
    expect(getPageRepository()).toBeInstanceOf(SanityPageRepository);
  });

  it('retrieves about page', async () => {
    const page = await repo.getPageBySlug('about');
    expect(page).not.toBeNull();
    expect(page?.slug).toBe('about');
  });

  it('retrieves vision page', async () => {
    const page = await repo.getPageBySlug('vision');
    expect(page).not.toBeNull();
    expect(page?.slug).toBe('vision');
  });

  it('returns null for unknown page', async () => {
    const missing = await repo.getPageBySlug('nonexistent-page');
    expect(missing).toBeNull();
  });

  it('retrieves all known page slugs', async () => {
    const slugs = await repo.getAllPageSlugs();
    expect(slugs).toContain('about');
    expect(slugs).toContain('vision');
  });
});

describe('SanityNavigationRepository', () => {
  const repo = new SanityNavigationRepository();

  it('is the default repository registered in the DI factory', () => {
    expect(getNavigationRepository()).toBeInstanceOf(SanityNavigationRepository);
  });

  it('retrieves header navigation', async () => {
    const header = await repo.getHeaderNavigation();
    expect(header.length).toBeGreaterThan(0);
    expect(header.some((i) => i.href === '/products')).toBe(true);
    expect(header.some((i) => i.href === '/vision')).toBe(true);
  });

  it('retrieves footer navigation', async () => {
    const footer = await repo.getFooterNavigation();
    expect(footer.length).toBeGreaterThanOrEqual(2);
    expect(footer[0]?.items.length).toBeGreaterThan(0);
  });
});
