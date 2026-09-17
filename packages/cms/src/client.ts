/**
 * Sanity CMS client factory.
 *
 * ⚠️  This module imports 'server-only'.
 * It CANNOT be used in Client Components. This is intentional — all CMS
 * access is server-side only. Sanity API tokens stay server-side.
 *
 * Architecture rule: No component or page should import from '@sanity/client'
 * directly. All CMS access goes through this package.
 *
 * TODO(cms): Add next-sanity's sanityFetch helper for request deduplication
 *            and on-demand ISR (revalidation via webhooks).
 * TODO(cms): Add draft mode client for Sanity Live Preview.
 */
import 'server-only';

import { createClient, type SanityClient } from '@sanity/client';
import { clientEnv } from '@prixtara/config/client';

/**
 * The primary Sanity client for server-side CMS queries.
 *
 * - Uses CDN in production for read-through caching
 * - Bypasses CDN in development/preview for fresh data
 * - TODO(cms): Add token from serverEnv when authenticated queries are needed
 */
export const sanityClient: SanityClient = createClient({
  projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder',
  dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: clientEnv.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: process.env['NODE_ENV'] === 'production',
  perspective: 'published',
});

/**
 * A write-capable Sanity client for mutations.
 * Only used server-side for data migrations and webhooks.
 *
 * TODO(cms): Instantiate with serverEnv.SANITY_API_TOKEN when CMS is integrated.
 */
export function createWriteClient(): SanityClient {
  // TODO(cms): Uncomment and configure when server env is set up:
  // import { serverEnv } from '@prixtara/config/server';
  // return sanityClient.withConfig({ token: serverEnv.SANITY_API_TOKEN });
  throw new Error(
    'CMS write client is not yet configured. See TODO(cms) in packages/cms/src/client.ts',
  );
}
