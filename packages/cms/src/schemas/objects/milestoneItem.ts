import { defineType, defineField } from 'sanity';

/**
 * Reusable Company Milestone schema (for About page timeline).
 */
export const milestoneItemType = defineType({
  name: 'milestoneItem',
  title: 'Milestone Item',
  type: 'object',
  fields: [
    defineField({
      name: 'yearOrDate',
      title: 'Year or Date',
      type: 'string',
      description: 'e.g. "2024", "Q3 2024", "March 2025"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Milestone Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight Milestone',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      yearOrDate: 'yearOrDate',
      title: 'title',
    },
    prepare({ yearOrDate, title }) {
      return {
        title: `${yearOrDate}: ${title}`,
      };
    },
  },
});
