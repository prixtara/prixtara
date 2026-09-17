import { defineType, defineField } from 'sanity';

/**
 * Reusable CTA Section schema.
 */
export const ctaSectionType = defineType({
  name: 'ctaSection',
  title: 'Call to Action Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'cta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'cta',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
    },
    prepare({ title }) {
      return {
        title: `CTA Section: ${title || 'Untitled'}`,
      };
    },
  },
});
