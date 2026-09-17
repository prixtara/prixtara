/**
 * @prixtara/seo
 *
 * SEO utilities using the Next.js Metadata API.
 *
 * Architecture rules:
 *   - All metadata generation must go through this package
 *   - Pages call buildMetadata() and spread into their Metadata export
 *   - Structured data helpers return plain objects — rendering is done in layout
 */
export { defaultMetadata, buildMetadata } from './metadata';
export type { BuildMetadataOptions } from './metadata';

export {
  getOrganizationSchema,
  getWebsiteSchema,
  getProductSchema,
  getJobPostingSchema,
  formatJsonLd,
} from './structured-data';

export type {
  OrganizationSchema,
  WebsiteSchema,
  ProductSchema,
  ProductSchemaOptions,
  JobPostingSchema,
  JobPostingSchemaOptions,
} from './structured-data';
