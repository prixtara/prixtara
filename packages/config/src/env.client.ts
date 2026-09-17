/**
 * Client-safe (NEXT_PUBLIC_*) environment variables.
 *
 * ✅ Safe to import anywhere — Server Components, Client Components, API routes.
 * ❌ NEVER put secrets or API tokens here.
 *
 * This file validates only the variables that are safe to expose to the browser.
 * If you need a server-side variable, use '@prixtara/config/server' instead.
 *
 * IMPORTANT: Next.js replaces NEXT_PUBLIC_* at BUILD TIME, not runtime.
 * Values are baked into the JavaScript bundle. Plan deployments accordingly.
 */
import { clientEnvSchema } from '@prixtara/validation';

const parsed = clientEnvSchema.safeParse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env['NEXT_PUBLIC_SANITY_PROJECT_ID'],
  NEXT_PUBLIC_SANITY_DATASET: process.env['NEXT_PUBLIC_SANITY_DATASET'],
  NEXT_PUBLIC_SANITY_API_VERSION: process.env['NEXT_PUBLIC_SANITY_API_VERSION'],
  NEXT_PUBLIC_SITE_URL: process.env['NEXT_PUBLIC_SITE_URL'],
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'],
  NEXT_PUBLIC_SENTRY_DSN: process.env['NEXT_PUBLIC_SENTRY_DSN'],
});

if (!parsed.success) {
  throw new Error(
    `❌ [config] Invalid client environment variables:\n${JSON.stringify(parsed.error.format(), null, 2)}\n\nFix the values in your .env.local file. See .env.example for documentation.`,
  );
}

/**
 * Validated client-safe environment variables.
 *
 * @example
 * import { clientEnv } from '@prixtara/config/client';
 * const projectId = clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID;
 */
export const clientEnv = parsed.data;
