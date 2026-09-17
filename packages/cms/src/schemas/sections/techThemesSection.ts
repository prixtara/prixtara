import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Reusable Technology Themes Section schema.
 */
export const techThemesSectionType = defineType({
  name: 'techThemesSection',
  title: 'Technology Themes Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Pioneering Research Vectors',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'themes',
      title: 'Technology Themes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'techThemeItem',
          title: 'Theme Item',
          fields: [
            defineField({
              name: 'title',
              title: 'Theme Title',
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
              name: 'badge',
              title: 'Tag / Focus Area',
              type: 'string',
            }),
            defineField({
              name: 'iconName',
              title: 'Icon Identifier',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
    },
    prepare({ title }) {
      return {
        title: `Tech Themes: ${title || 'Themes Section'}`,
      };
    },
  },
});
