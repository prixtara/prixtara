/**
 * @prixtara/types
 *
 * Shared TypeScript type definitions for the Prixtara monorepo.
 *
 * ⚠️  This package contains TYPE DEFINITIONS ONLY — no runtime code.
 * All exports are types/interfaces/const objects with no side effects.
 *
 * Architecture rule:
 *   - Types defined here must be CMS-agnostic (no Sanity-specific shapes)
 *   - CMS document types live in @prixtara/cms
 *   - Zod validation schemas live in @prixtara/validation
 */

export type * from './career';
export type * from './cms';
export * from './product';
