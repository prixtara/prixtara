/**
 * URL and route parameter helpers.
 */

/**
 * Builds a fully-qualified canonical URL for a given route path.
 */
export function buildCanonicalUrl(path: string, baseUrl?: string): string {
  const base = baseUrl ?? process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com';
  const cleanBase = base.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath === '/' ? '' : cleanPath}`;
}

/**
 * Normalizes an arbitrary text string into a URL-friendly slug.
 */
export function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
