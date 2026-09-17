/**
 * Route matching utilities and path predicates.
 */

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Validates whether a given string is a safe, URL-compatible slug.
 * Allows lowercase alphanumeric characters separated by single hyphens.
 */
export function isValidSlug(slug: unknown): slug is string {
  if (typeof slug !== 'string' || slug.trim().length === 0) {
    return false;
  }
  return SLUG_REGEX.test(slug);
}

/**
 * Determines whether a pathname matches a target path.
 *
 * @param currentPath - The active pathname from router
 * @param targetPath - The destination path to check
 * @param exact - Whether to match strictly (e.g. for root '/')
 */
export function isRouteActive(currentPath: string, targetPath: string, exact = false): boolean {
  const normalizedCurrent = currentPath.replace(/\/$/, '') || '/';
  const normalizedTarget = targetPath.replace(/\/$/, '') || '/';

  if (exact || normalizedTarget === '/') {
    return normalizedCurrent === normalizedTarget;
  }

  return (
    normalizedCurrent === normalizedTarget || normalizedCurrent.startsWith(`${normalizedTarget}/`)
  );
}

/**
 * Predicate to check if pathname belongs to the product hierarchy (/products or /products/*).
 */
export function isProductRoute(pathname: string): boolean {
  return isRouteActive(pathname, '/products');
}

/**
 * Predicate to check if pathname belongs to the career hierarchy (/career or /career/*).
 */
export function isCareerRoute(pathname: string): boolean {
  return isRouteActive(pathname, '/career');
}

/**
 * Extracts a dynamic slug segment following a route prefix.
 * E.g., extractSlugFromPath('/products/my-slug', '/products') -> 'my-slug'
 */
export function extractSlugFromPath(pathname: string, prefix: string): string | null {
  const cleanPrefix = prefix.replace(/\/$/, '');
  const pattern = new RegExp(`^${cleanPrefix}/([^/?#]+)`);
  const match = pathname.match(pattern);
  return match && match[1] ? decodeURIComponent(match[1]) : null;
}
