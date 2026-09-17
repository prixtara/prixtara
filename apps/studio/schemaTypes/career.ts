import { defineType, defineField } from 'sanity';

/**
 * Sanity job opening document schema.
 *
 * TODO(careers): Add body field (Portable Text) for full job description.
 * TODO(careers): Add requirements array field.
 * TODO(careers): Add benefits array field.
 * TODO(careers): Add applicationUrl string field.
 * TODO(careers): Add applicationDeadline date field.
 * TODO(cms): Add seoTitle and seoDescription overrides.
 */
export const careerType = defineType({
  name: 'jobOpening',
  title: 'Job Opening',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'engineering' },
          { title: 'Design', value: 'design' },
          { title: 'Product', value: 'product' },
          { title: 'Research', value: 'research' },
          { title: 'Operations', value: 'operations' },
          { title: 'Sales', value: 'sales' },
          { title: 'Marketing', value: 'marketing' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isRemote',
      title: 'Remote Position',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Short description for listing cards (max 500 chars)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(500),
    }),

    defineField({
      name: 'isActive',
      title: 'Accepting Applications',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    // TODO(careers): body (Portable Text) field
    // TODO(careers): requirements array field
    // TODO(careers): applicationUrl field
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'department',
    },
  },
});
