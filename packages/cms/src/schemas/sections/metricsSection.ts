import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Reusable Metrics / Key Achievements Section schema.
 */
export const metricsSectionType = defineType({
  name: 'metricsSection',
  title: 'Metrics & Achievements Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Engineered for Performance',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [defineArrayMember({ type: 'metricItem' })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
    },
    prepare({ title }) {
      return {
        title: `Metrics: ${title || 'Metrics Section'}`,
      };
    },
  },
});
