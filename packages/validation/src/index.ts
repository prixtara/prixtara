/**
 * @prixtara/validation
 *
 * Zod validation schemas for all external data boundaries.
 *
 * Architecture rules:
 *   - Validate at EVERY external boundary (CMS, API, form, env vars)
 *   - Never trust raw data from external sources inside the app layer
 *   - Schemas here are the single source of truth for data shapes
 *
 * Usage:
 *   import { productSchema, serverEnvSchema } from '@prixtara/validation';
 */

export * from './env';
export * from './career';
export * from './product';
