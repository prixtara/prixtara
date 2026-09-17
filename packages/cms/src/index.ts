/**
 * @prixtara/cms
 *
 * Sanity CMS content management, query, normalization, and typing architecture.
 *
 * Architectural layers:
 *   - /client: Sanity client, draft mode helper, image builder
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
  createWriteClient,
  urlForImage,
  isValidPreviewSecret,
  sanitizePreviewRedirectPath,
} from './client';

// Queries Layer
export * from './queries';

// Adapters Layer
export * from './adapters';

// Types Layer
export * from './types';

// Schemas Layer
export { schemaTypes } from './schemas';
