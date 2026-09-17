/**
 * Pure string and date formatting utilities.
 *
 * These functions have no side effects and no external dependencies.
 * All use the Intl API for locale-aware formatting.
 */

/**
 * Format a date string or Date object for display.
 *
 * @example
 * formatDate('2024-01-15') → 'January 15, 2024'
 * formatDate(new Date(), 'short') → 'Jan 15, 2024'
 */
export function formatDate(
  date: string | Date,
  style: 'long' | 'short' = 'long',
  locale = 'en-IN',
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
  }).format(d);
}

/**
 * Convert a string to a URL-safe slug.
 *
 * @example
 * slugify('AI Vision Defect Detection') → 'ai-vision-defect-detection'
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate a string to a maximum length, appending an ellipsis.
 *
 * @example
 * truncate('A long description...', 20) → 'A long description...'
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Assert that a value is never reached (exhaustive type checking).
 * Useful for ensuring switch/if chains handle all enum variants.
 *
 * @example
 * switch (productSlug) {
 *   case 'ai-vision-defect-detection': ...
 *   case 'existential-ai': ...
 *   case 'sambhashi': ...
 *   default: assertNever(productSlug);
 * }
 */
export function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
}
