import type {
  NormalizedProduct,
  NormalizedJobOpening,
  NormalizedPage,
  NavigationItem,
  NavigationSection,
} from '../models';

/**
 * Architectural interface for Product data access.
 *
 * Decouples presentation components from CMS backend (Sanity, Contentful, database, etc.).
 */
export interface ProductRepository {
  /** Retrieve all published products */
  getAllProducts(): Promise<NormalizedProduct[]>;

  /** Retrieve a single product by its URL slug */
  getProductBySlug(slug: string): Promise<NormalizedProduct | null>;

  /** Retrieve all product slugs for static path generation (generateStaticParams) */
  getAllProductSlugs(): Promise<string[]>;

  /** Retrieve featured products for homepage or showcase sections */
  getFeaturedProducts(): Promise<NormalizedProduct[]>;
}

/**
 * Architectural interface for Static / Marketing Page content.
 */
export interface PageRepository {
  /** Retrieve page document content by slug (e.g. 'about', 'vision') */
  getPageBySlug(slug: string): Promise<NormalizedPage | null>;

  /** Retrieve all marketing page slugs */
  getAllPageSlugs(): Promise<string[]>;
}

/**
 * Architectural interface for Career / Job Opening data access.
 */
export interface CareerRepository {
  /** Retrieve all active/published job openings */
  getActiveJobOpenings(): Promise<NormalizedJobOpening[]>;

  /** Retrieve a single job opening by its URL slug */
  getJobOpeningBySlug(slug: string): Promise<NormalizedJobOpening | null>;

  /** Retrieve all job opening slugs for static path generation */
  getAllJobOpeningSlugs(): Promise<string[]>;
}

/**
 * Architectural interface for Site Navigation data access.
 */
export interface NavigationRepository {
  /** Retrieve header navigation items */
  getHeaderNavigation(): Promise<NavigationItem[]>;

  /** Retrieve footer navigation sections */
  getFooterNavigation(): Promise<NavigationSection[]>;
}
