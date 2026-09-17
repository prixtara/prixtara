import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Reusable Process / Workflow Section schema.
 */
export const processSectionType = defineType({
  name: 'processSection',
  title: 'Process / Workflow Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'How It Works',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'steps',
      title: 'Workflow Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'processStep',
          title: 'Process Step',
          fields: [
            defineField({
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
              validation: (Rule) => Rule.required().positive().integer(),
            }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'duration',
              title: 'Duration / Timeframe',
              type: 'string',
              description: 'e.g. "< 30 minutes", "Real-time"',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
    },
    prepare({ title }) {
      return {
        title: `Process: ${title || 'Process Section'}`,
      };
    },
  },
});
