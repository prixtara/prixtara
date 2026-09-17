import { z } from 'zod';

/**
 * Server-side environment variable schema.
 *
 * ⚠️  ARCHITECTURAL RULE:
 * Variables in this schema MUST NEVER be prefixed with NEXT_PUBLIC_.
 * They are validated and consumed server-side only.
 *
 * To add a new server-side variable:
 *   1. Add it to .env.example with a comment
 *   2. Add the Zod field here
 *   3. Access it via `serverEnv` from @prixtara/config/server
 *
 * TODO(monitoring): Make SENTRY_DSN and related fields required in production.
 * TODO(cms): Make SANITY_API_TOKEN required in production when CMS is integrated.
 */
export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  // Sanity CMS — server token (NEVER expose to client)
  SANITY_API_TOKEN: z.string().optional(),
  SANITY_WEBHOOK_SECRET: z.string().optional(),
  SANITY_PREVIEW_SECRET: z.string().optional(),

  // Sentry — server-side error monitoring
  // TODO(monitoring): Mark required once Sentry project is created
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

/**
 * Client-safe (NEXT_PUBLIC_*) environment variable schema.
 *
 * ⚠️  ARCHITECTURAL RULE:
 * ALL variables in this schema MUST be prefixed with NEXT_PUBLIC_.
 * They are safe for the browser bundle.
 *
 * Never put secrets here. These values are visible in the browser's
 * network tab and JavaScript bundle.
 */
export const clientEnvSchema = z.object({
  // Sanity CMS — public configuration (safe for browser)
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default('production'),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().default('2024-01-01'),

  // Site
  NEXT_PUBLIC_SITE_URL: z.string().default('http://localhost:3000'),

  // Analytics — TODO(analytics): Make required once provider is selected
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),

  // Sentry — client-side error monitoring (public by design)
  // TODO(monitoring): Mark required once Sentry project is created
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;
