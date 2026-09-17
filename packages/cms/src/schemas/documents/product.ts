import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Product document schema (Collection).
 *
 * ⚠️  DATA-DRIVEN ARCHITECTURE RULE:
 * Products are 100% data-driven. Non-technical editors can publish Product A,
 * Product B, Product C, Product D, Product E arbitrarily. The Next.js frontend
 * renders all routes dynamically via `/products/[slug]` without any code changes.
 */
export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'general', title: 'General & Overview', default: true },
    { name: 'media', title: 'Media & Gallery' },
    { name: 'details', title: 'Problem & Solution' },
    { name: 'architecture', title: 'Capabilities & Technical Specs' },
    { name: 'applications', title: 'Use Cases & Process' },
    { name: 'conversion', title: 'CTA & Related' },
    { name: 'seo', title: 'SEO & Meta' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title / Name',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'general',
      description:
        'The URL route identifier for this product (e.g. /products/ai-vision-defect-detection). Generated from title.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productCategory',
      title: 'Product Category',
      type: 'string',
      group: 'general',
      description: 'Select a primary category or enter a custom one.',
      options: {
        list: [
          { title: 'Computer Vision', value: 'computer-vision' },
          { title: 'Artificial Intelligence', value: 'artificial-intelligence' },
          { title: 'Language Technology', value: 'language-technology' },
          { title: 'Edge Computing', value: 'edge-computing' },
          { title: 'Autonomous Systems', value: 'autonomous-systems' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description / Tagline',
      type: 'string',
      group: 'general',
      description:
        'One-line summary for cards, teasers, and search engine snippets (max 300 chars).',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description (Rich Content)',
      type: 'portableText',
      group: 'general',
      description: 'Comprehensive overview with rich formatting, headings, and images.',
    }),

    // Media Fields
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image (Cards & Lists)',
      type: 'captionedImage',
      group: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroMedia',
      title: 'Hero Media Asset (Featured Image/Video)',
      type: 'object',
      group: 'media',
      fields: [
        defineField({
          name: 'mediaType',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              { title: 'Image', value: 'image' },
              { title: 'Video', value: 'video' },
            ],
            layout: 'radio',
          },
          initialValue: 'image',
        }),
        defineField({
          name: 'image',
          title: 'Hero Image',
          type: 'captionedImage',
          hidden: ({ parent }) => parent?.mediaType !== 'image',
        }),
        defineField({
          name: 'video',
          title: 'Hero Video',
          type: 'videoMedia',
          hidden: ({ parent }) => parent?.mediaType !== 'video',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Product Imagery Gallery',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'captionedImage' })],
      description: 'Screenshots, hardware diagrams, and operational photographs.',
    }),
    defineField({
      name: 'video',
      title: 'Dedicated Product Video',
      type: 'videoMedia',
      group: 'media',
      description: 'Demonstration or walkthrough video for deep-dive sections.',
    }),

    // Problem & Solution
    defineField({
      name: 'problemStatement',
      title: 'Problem Statement',
      type: 'portableText',
      group: 'details',
      description: 'The industrial, technical, or societal challenge this product addresses.',
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'portableText',
      group: 'details',
      description: 'How Prixtara resolves this challenge with precision engineering.',
    }),

    // Capabilities & Technical Details
    defineField({
      name: 'capabilities',
      title: 'Core Capabilities',
      type: 'array',
      group: 'architecture',
      of: [defineArrayMember({ type: 'capabilityItem' })],
    }),
    defineField({
      name: 'technicalDetails',
      title: 'Technical Specifications & Architecture Groups',
      type: 'array',
      group: 'architecture',
      of: [defineArrayMember({ type: 'technicalSpecGroup' })],
    }),
    defineField({
      name: 'metrics',
      title: 'Quantifiable Metrics & Benchmarks',
      type: 'array',
      group: 'architecture',
      of: [defineArrayMember({ type: 'metricItem' })],
      description:
        'Key performance metrics (e.g. 300 parts/min, 0.1 mm precision, 98%+ accuracy, 30-min setup, 12 languages).',
    }),
    defineField({
      name: 'features',
      title: 'Key Product Features',
      type: 'array',
      group: 'architecture',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'productFeatureItem',
          title: 'Feature Item',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Feature Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              rows: 2,
              title: 'Description',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'badge', type: 'string', title: 'Badge / Highlight' }),
            defineField({ name: 'iconName', type: 'string', title: 'Icon Identifier' }),
          ],
        }),
      ],
    }),

    // Use Cases & Process
    defineField({
      name: 'useCases',
      title: 'Target Use Cases & Scenarios',
      type: 'array',
      group: 'applications',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'useCaseItem',
          title: 'Use Case',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Scenario Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'targetAudience',
              type: 'string',
              title: 'Target Audience / Industry',
            }),
            defineField({
              name: 'scenario',
              type: 'text',
              rows: 2,
              title: 'Operational Scenario',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'impact',
              type: 'string',
              title: 'Achieved Impact',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'applications',
      title: 'Industry Applications',
      type: 'array',
      group: 'applications',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'applicationItem',
          title: 'Application',
          fields: [
            defineField({
              name: 'industry',
              type: 'string',
              title: 'Industry (e.g. Manufacturing, Banking)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Application Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              rows: 2,
              title: 'Description',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'deploymentType',
              type: 'string',
              title: 'Deployment Form Factor (e.g. On-Premises Node, Edge Module)',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'process',
      title: 'Implementation & Operational Process',
      type: 'array',
      group: 'applications',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'productProcessStep',
          title: 'Process Step',
          fields: [
            defineField({
              name: 'stepNumber',
              type: 'number',
              title: 'Step Number',
              validation: (Rule) => Rule.required().positive().integer(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Step Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              rows: 2,
              title: 'Description',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'duration', type: 'string', title: 'Duration / Timeframe' }),
          ],
        }),
      ],
    }),

    // Conversion & Related
    defineField({
      name: 'cta',
      title: 'Product Conversion Call to Action',
      type: 'cta',
      group: 'conversion',
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products / Technologies',
      type: 'array',
      group: 'conversion',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'product' }],
        }),
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'Product SEO & Social Graph',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'thumbnail.asset',
    },
  },
});
