/**
 * @prixtara/utils
 *
 * Shared pure utility functions.
 *
 * Architecture rules:
 *   - Functions here must be pure (no side effects)
 *   - No business logic — only generic helpers
 *   - No direct dependency on CMS, config, or analytics
 */
export { cn } from './cn';
export { assertNever, formatDate, slugify, truncate } from './format';
