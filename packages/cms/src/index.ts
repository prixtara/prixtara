/**
 * @prixtara/cms
 *
 * Sanity CMS content management, query, normalization, and typing architecture.
 *
 * Architectural layers:
 *   - /client: Sanity client (server & browser), draft mode helper, image builder, webhook verification
 *   - /constants: Cache tags and revalidation constants
 *   - /queries: All GROQ queries and data-fetching routines
 *   - /schemas: Sanity schema definitions (documents, objects, sections)
 *   - /adapters: Data normalizers and domain transformers with boundary validation
 *   - /types: Generated and hand-crafted CMS document types
 *   - /type-generation: Sanity typegen integration
 */

// Client Layer
export {
  sanityClient,
  getSanityClient,
  isSanityConfigured,
  createWriteClient,
  createNextFetchOptions,
  browserSanityClient,
  getSanityBrowserClient,
  urlForImage,
  isValidPreviewSecret,
  sanitizePreviewRedirectPath,
  verifySanityWebhookSignature,
  verifyWebhookSecret,
} from './client';

// Constants Layer
export * from './constants';

// Queries Layer
export * from './queries';

// Adapters Layer
export * from './adapters';

// Types Layer
export * from './types';

// Schemas Layer
export { schemaTypes } from './schemas';
