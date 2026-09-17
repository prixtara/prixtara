import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Reusable Vision Highlights Section schema.
 */
export const visionSectionType = defineType({
  name: 'visionSection',
  title: 'Vision Highlights Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Our North Star',
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
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
      name: 'principles',
      title: 'Core Principles',
      type: 'array',
      of: [defineArrayMember({ type: 'principleItem' })],
    }),
    defineField({
      name: 'featuredMedia',
      title: 'Featured Media',
      type: 'captionedImage',
    }),
    defineField({
      name: 'cta',
      title: 'Explore Vision CTA',
      type: 'cta',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'eyebrow',
    },
    prepare({ title, subtitle }) {
      return {
        title: `Vision: ${title || 'Untitled'}`,
        subtitle,
      };
    },
  },
});
