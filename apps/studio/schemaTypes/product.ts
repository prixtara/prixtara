import { defineType, defineField } from 'sanity';
import { PRODUCT_SLUGS } from '@prixtara/types';

/**
 * Sanity product document schema.
 *
 * Architecture note: The productSlug field maps to the ProductSlug union type
 * in @prixtara/types. When adding/removing products, update BOTH places:
 *   1. packages/types/src/product.ts — PRODUCT_SLUGS tuple
 *   2. This schema — options.list
 *
 * TODO(cms): Add body field (Portable Text) for rich product descriptions.
 * TODO(cms): Add heroImage field for product hero imagery.
 * TODO(cms): Add gallery array for product screenshot grid.
 * TODO(cms): Add technicalSpecs object for key-value spec pairs.
 * TODO(cms): Add ordering field for manual curation on /products page.
 * TODO(cms): Add seoTitle and seoDescription overrides.
 * TODO(cms): Add relatedProducts array reference.
 */
export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: 'productSlug',
      title: 'Product Identifier',
      description:
        'The canonical identifier used in URLs and analytics. Must match a known product slug.',
      type: 'string',
      options: {
        list: PRODUCT_SLUGS.map((slug) => ({ title: slug, value: slug })),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'One-line description for cards and meta descriptions (max 300 chars)',
      type: 'string',
      validation: (Rule) => Rule.required().max(300),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Computer Vision', value: 'computer-vision' },
          { title: 'Artificial Intelligence', value: 'artificial-intelligence' },
          { title: 'Language Technology', value: 'language-technology' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // TODO(cms): heroImage field
    // TODO(cms): body (Portable Text) field
    // TODO(cms): gallery field
    // TODO(cms): technicalSpecs field
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
    },
  },
});
