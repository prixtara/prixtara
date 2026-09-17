import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

/**
 * Sanity Studio configuration.
 *
 * Environment variables:
 *   SANITY_STUDIO_PROJECT_ID — Sanity project ID (required for builds)
 *   SANITY_STUDIO_DATASET    — Dataset name (defaults to 'production')
 *
 * These are separate from NEXT_PUBLIC_SANITY_* vars in apps/web.
 * Sanity Studio uses its own env var prefix (SANITY_STUDIO_*).
 *
 * TODO(cms): Configure API version to match @prixtara/validation env schema.
 * TODO(cms): Add media plugin for image/video asset management.
 * TODO(cms): Add @sanity/scheduled-publishing when content workflow is defined.
 */
export default defineConfig({
  name: 'prixtara-studio',
  title: 'Prixtara Studio',

  projectId: process.env['SANITY_STUDIO_PROJECT_ID'] ?? 'placeholder',
  dataset: process.env['SANITY_STUDIO_DATASET'] ?? 'production',
  apiVersion: '2024-01-01',

  plugins: [
    structureTool({ structure }),
    visionTool({
      defaultApiVersion: '2024-01-01',
      defaultDataset: process.env['SANITY_STUDIO_DATASET'] ?? 'production',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
