import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Reusable Products Showcase Section schema.
 */
export const productsSectionType = defineType({
  name: 'productsSection',
  title: 'Products Showcase Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Technologies',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle / Eyebrow',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'displayMode',
      title: 'Display Mode',
      type: 'string',
      options: {
        list: [
          { title: 'All Published Products (Automatic)', value: 'all' },
          { title: 'Curated Products (Manual Selection)', value: 'manual' },
        ],
        layout: 'radio',
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'curatedProducts',
      title: 'Curated Product References',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'product' }],
        }),
      ],
      hidden: ({ parent }) => parent?.displayMode !== 'manual',
    }),
    defineField({
      name: 'viewAllCta',
      title: 'View All Products CTA',
      type: 'cta',
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'displayMode',
    },
    prepare({ title, subtitle }) {
      return {
        title: `Products Section: ${title || 'Products'}`,
        subtitle: `Mode: ${subtitle || 'all'}`,
      };
    },
  },
});
