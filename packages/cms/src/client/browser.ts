import { createClient, type SanityClient } from '@sanity/client';
import { clientEnv } from '@prixtara/config/client';

/**
 * Browser-safe Sanity client instance.
 *
 * ⚠️ ARCHITECTURAL RULE:
 * This client is safe to import and use in browser environments.
 * It NEVER imports 'server-only' and NEVER accesses server-only tokens.
 * Only public configuration (NEXT_PUBLIC_*) is consumed here.
 *
 * Reads are strictly scoped to the 'published' perspective with CDN enabled.
 */
export const browserSanityClient: SanityClient = createClient({
  projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder',
  dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: clientEnv.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
  perspective: 'published',
});

/**
 * Factory for creating a browser-safe Sanity client.
 */
export function getSanityBrowserClient(): SanityClient {
  return browserSanityClient;
}
