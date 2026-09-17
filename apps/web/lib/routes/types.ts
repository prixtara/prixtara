/**
 * Route type definitions and parameter schemas.
 *
 * Provides compile-time safety for all route definitions, path parameters,
 * and navigation targets across the application.
 */

export type RouteKey =
  | 'home'
  | 'products'
  | 'productDetail'
  | 'vision'
  | 'career'
  | 'careerDetail'
  | 'about'
  | 'apiHealth';

export type RenderingStrategy = 'ssg' | 'isr' | 'dynamic';

export interface RouteDefinition {
  /** Canonical path template (e.g. /products/[slug]) */
  path: string;
  /** Human-readable identifier for debugging and breadcrumbs */
  name: string;
  /** Caching / rendering classification */
  renderingStrategy: RenderingStrategy;
  /** ISR revalidation period in seconds (if applicable) */
  revalidateSeconds?: number;
}

export interface ProductRouteParams {
  slug: string;
}

export interface CareerRouteParams {
  slug: string;
}

export type RouteParamsMap = {
  home: undefined;
  products: undefined;
  productDetail: ProductRouteParams;
  vision: undefined;
  career: undefined;
  careerDetail: CareerRouteParams;
  about: undefined;
  apiHealth: undefined;
};
