import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Vision Page document (Singleton).
 * Manages foundational principles, long-term engineering themes, and mission philosophy.
 */
export const visionPageType = defineType({
  name: 'visionPage',
  title: 'Vision Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Vision — Foundational AI for Physical & Cognitive Autonomy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction Statement',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentSections',
      title: 'Narrative Content Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'visionContentSection',
          title: 'Vision Content Section',
          fields: [
            defineField({
              name: 'heading',
              type: 'string',
              title: 'Section Heading',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'subheading', type: 'string', title: 'Subheading' }),
            defineField({ name: 'body', type: 'portableText', title: 'Body Content' }),
            defineField({ name: 'media', type: 'captionedImage', title: 'Supporting Media' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'principles',
      title: 'Foundational Principles',
      type: 'array',
      of: [defineArrayMember({ type: 'principleItem' })],
      description:
        'Guiding architectural and ethical tenets (e.g. Privacy First, Real-time Determinism).',
    }),
    defineField({
      name: 'technologyThemes',
      title: 'Long-Horizon Technology Themes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'visionTechTheme',
          title: 'Technology Theme',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Theme Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              rows: 3,
              title: 'Description',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'category', type: 'string', title: 'Scientific Vector' }),
            defineField({
              name: 'tags',
              type: 'array',
              of: [{ type: 'string' }],
              title: 'Research Tags',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'media',
      title: 'Hero / Featured Media',
      type: 'captionedImage',
    }),
    defineField({
      name: 'seo',
      title: 'Vision Page SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
