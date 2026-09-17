import { defineCliConfig } from 'sanity/cli';

/**
 * Sanity CLI configuration for Prixtara Studio.
 * Used for typegen, schema extraction, and studio deployments.
 */
export default defineCliConfig({
  api: {
    projectId: process.env['SANITY_STUDIO_PROJECT_ID'] || 'placeholder',
    dataset: process.env['SANITY_STUDIO_DATASET'] || 'production',
  },
});
