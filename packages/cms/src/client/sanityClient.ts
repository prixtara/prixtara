import 'server-only';

import { createClient, type SanityClient, type FilteredResponseQueryOptions } from '@sanity/client';
import { clientEnv } from '@prixtara/config/client';
import { serverEnv } from '@prixtara/config/server';

/**
 * Standard published client for public requests.
 * Uses CDN in production for edge-cached read performance.
 */
export const sanityClient: SanityClient = createClient({
  projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder',
  dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: clientEnv.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: process.env['NODE_ENV'] === 'production',
  perspective: 'published',
});

/**
 * Factory to obtain a Sanity client configured for either published or preview/drafts.
 *
 * @param options.preview - When true, bypasses CDN and uses previewDrafts perspective with server token.
 */
export function getSanityClient(options: { preview?: boolean } = {}): SanityClient {
  const { preview = false } = options;

  if (preview) {
    return sanityClient.withConfig({
      useCdn: false,
      perspective: 'previewDrafts',
      token: serverEnv.SANITY_API_TOKEN,
    });
  }

  return sanityClient;
}

/**
 * Checks whether a valid Sanity project ID is configured.
 * When false (e.g. initial dev or test runs), callers fall back to local seed data immediately
 * instead of incurring remote HTTP timeouts.
 */
export function isSanityConfigured(): boolean {
  const pid = clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return Boolean(pid && pid !== 'placeholder' && pid !== 'your_project_id');
}

/**
 * Write-capable Sanity client for mutations and content migrations.
 */
export function createWriteClient(): SanityClient {
  if (!serverEnv.SANITY_API_TOKEN) {
    throw new Error('Cannot create Sanity write client: SANITY_API_TOKEN is not configured.');
  }

  return sanityClient.withConfig({
    token: serverEnv.SANITY_API_TOKEN,
    useCdn: false,
  });
}

/**
 * Creates Sanity fetch options carrying Next.js cache revalidation tags.
 */
export function createNextFetchOptions(
  tags: string[],
  revalidate?: number | false,
): FilteredResponseQueryOptions {
  return {
    filterResponse: true,
    next: {
      tags,
      revalidate,
    },
  } as unknown as FilteredResponseQueryOptions;
}
