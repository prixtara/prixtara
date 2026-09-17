import type { RouteDefinition, RouteKey } from './types';

/**
 * Route metadata and configuration registry.
 *
 * Centralizes route templates, names, and caching strategies.
 */
export const ROUTES: Record<RouteKey, RouteDefinition> = {
  home: {
    path: '/',
    name: 'Home',
    renderingStrategy: 'ssg',
  },
  products: {
    path: '/products',
    name: 'Our Products',
    renderingStrategy: 'isr',
    revalidateSeconds: 60,
  },
  productDetail: {
    path: '/products/[slug]',
    name: 'Product Details',
    renderingStrategy: 'isr',
    revalidateSeconds: 60,
  },
  vision: {
    path: '/vision',
    name: 'Our Vision',
    renderingStrategy: 'ssg',
  },
  career: {
    path: '/career',
    name: 'Careers',
    renderingStrategy: 'isr',
    revalidateSeconds: 60,
  },
  careerDetail: {
    path: '/career/[slug]',
    name: 'Job Opening',
    renderingStrategy: 'isr',
    revalidateSeconds: 60,
  },
  about: {
    path: '/about',
    name: 'About Us',
    renderingStrategy: 'ssg',
  },
  apiHealth: {
    path: '/api/health',
    name: 'Health Check',
    renderingStrategy: 'dynamic',
  },
} as const;

/**
 * Centralized typed routing helper.
 *
 * Provides typed, parameter-safe URL generation for all application routes.
 * Pages and components should always use these helpers instead of hardcoding URLs.
 */
export const routes = {
  home: () => '/',
  products: () => '/products',
  product: (slug: string) => `/products/${encodeURIComponent(slug)}`,
  vision: () => '/vision',
  career: () => '/career',
  careerDetail: (slug: string) => `/career/${encodeURIComponent(slug)}`,
  about: () => '/about',
  apiHealth: () => '/api/health',
} as const;

/**
 * Retrieve metadata definition for a given route key.
 */
export function getRouteDefinition(key: RouteKey): RouteDefinition {
  return ROUTES[key];
}
