import { defineType, defineField } from 'sanity';

/**
 * Reusable SEO schema object for documents and pages.
 */
export const seoType = defineType({
  name: 'seo',
  title: 'Search Engine Optimization',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description:
        'Page title displayed in search engines and browser tabs (recommended: 50-60 characters).',
      validation: (Rule) =>
        Rule.max(70).warning(
          'Titles longer than 70 characters may be truncated by search engines.',
        ),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Summary of the page for search snippets (recommended: 120-160 characters).',
      validation: (Rule) =>
        Rule.max(160).warning(
          'Descriptions longer than 160 characters may be truncated by search engines.',
        ),
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL Override',
      type: 'url',
      description:
        'Leave blank to use the default canonical URL constructed from the site domain and route.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph / Social Sharing Image',
      type: 'image',
      description: 'Image displayed when shared on social media (recommended: 1200x630px).',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Descriptive alternative text for screen readers and search engines.',
        }),
      ],
    }),
    defineField({
      name: 'noindex',
      title: 'Disallow Search Indexing (noindex)',
      type: 'boolean',
      description: 'If enabled, search engines will be instructed not to index this page.',
      initialValue: false,
    }),
    defineField({
      name: 'structuredData',
      title: 'Structured Data (JSON-LD Configuration)',
      type: 'object',
      description: 'Optional custom schema markup or overrides.',
      fields: [
        defineField({
          name: 'schemaType',
          title: 'Schema Type',
          type: 'string',
          description: 'e.g. Organization, Product, JobPosting, TechArticle',
        }),
        defineField({
          name: 'jsonLdRaw',
          title: 'Raw JSON-LD Override',
          type: 'text',
          rows: 4,
          description: 'Optional valid JSON string for deep structured data overrides.',
        }),
      ],
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
});
