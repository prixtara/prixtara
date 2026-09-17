import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Reusable Team Member schema (for About and Leadership sections).
 */
export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Title / Role',
      type: 'string',
      description: 'e.g. Co-Founder & Chief Scientist',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Portrait Photo',
      type: 'captionedImage',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social / Professional Links',
      type: 'array',
      of: [defineArrayMember({ type: 'socialLink' })],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image.asset',
    },
  },
});
