import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Reusable Hero Section schema.
 */
export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Primary Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Eyebrow',
      type: 'string',
      description: 'Small text above or below headline.',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary Call to Action',
      type: 'cta',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Call to Action',
      type: 'cta',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video Asset',
      type: 'videoMedia',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image / Fallback',
      type: 'captionedImage',
    }),
    defineField({
      name: 'badges',
      title: 'Trust Badges / Technology Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
    },
    prepare({ title, subtitle }) {
      return {
        title: `Hero: ${title || 'Untitled'}`,
        subtitle,
      };
    },
  },
});
