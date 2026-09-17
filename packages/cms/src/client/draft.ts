import 'server-only';

import { serverEnv } from '@prixtara/config/server';

/**
 * Validates the draft preview secret provided by Sanity Studio or editor preview links.
 *
 * @param secret - The query parameter passed in the preview request
 */
export function isValidPreviewSecret(secret: string | null | undefined): boolean {
  if (!secret) {
    return false;
  }

  const expectedSecret = serverEnv.SANITY_PREVIEW_SECRET ?? serverEnv.SANITY_API_TOKEN;

  // In development without configured secrets, allow preview if secret matches a standard fallback
  if (process.env['NODE_ENV'] === 'development' && !expectedSecret) {
    return secret === 'prixtara-dev-preview';
  }

  return Boolean(expectedSecret && secret === expectedSecret);
}

/**
 * Sanitizes and validates a redirect path for preview mode to prevent open redirect vulnerabilities.
 */
export function sanitizePreviewRedirectPath(path: string | null | undefined): string {
  if (!path || !path.startsWith('/') || path.startsWith('//')) {
    return '/';
  }

  // Ensure path is a relative path within our site
  return path;
}
