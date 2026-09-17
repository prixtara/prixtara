/**
 * ============================================================
 * SERVER-ONLY ENVIRONMENT VARIABLES
 * ============================================================
 *
 * ⚠️  CRITICAL SECURITY RULE:
 * This module imports 'server-only'. Importing it from a Client
 * Component will cause a build-time error. This is intentional —
 * it is the compile-time enforcement of the secret isolation rule.
 *
 * ✅ Usage in Server Components, API Routes, server actions:
 *   import { serverEnv } from '@prixtara/config/server';
 *
 * ❌ NEVER import this in files that also export 'use client':
 *   import { serverEnv } from '@prixtara/config/server'; // BUILD ERROR
 *
 * If validation fails at startup, the process exits immediately.
 * Secrets should never reach the browser, so we fail loudly.
 * ============================================================
 */
import 'server-only';

import { serverEnvSchema } from '@prixtara/validation';

const parsed = serverEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    '\n❌ [config] Invalid server environment variables:\n',
    JSON.stringify(parsed.error.format(), null, 2),
    '\n',
    'Fix the values in your .env.local file.\n',
    'See .env.example for documentation.\n',
  );
  // Fail loudly at startup rather than silently leaking invalid state
  throw new Error('Invalid server environment variables — check console output above');
}

/**
 * Validated server-side environment variables.
 *
 * All fields are typed according to the Zod schema in @prixtara/validation.
 * This object is safe to use in any server context.
 *
 * @example
 * import { serverEnv } from '@prixtara/config/server';
 * const client = createSanityClient({ token: serverEnv.SANITY_API_TOKEN });
 */
export const serverEnv = parsed.data;
